<name>edit-trip-view</name>

<template>
  <div class="edit-trip-container">
    <div v-if="hasLoaded && !hasSubmitted">
      <common-plan-edit
        :createdId="createdId"
        :hasCommitted="true"
        :data="chips"
        :updateData="updateChip"
        :dataTripName="tripName"
        :updateTripName="updateTripName"
        @submit="submit" />
    </div>

    <div v-if="!hasLoaded" style="display: flex; justify-content: center;">
      <md-spinner md-indeterminate></md-spinner>
    </div>

    <md-card-content v-if="hasSubmitted && hasLoaded">
      <div style="text-align: center; font-size: 20px;">
        <div style="margin-bottom: 20px;">
          <md-icon class="md-size-4x">check</md-icon>
        </div>
        Congrats. Trip edited.
        <div style="margin-top: 10px">
          <router-link :to="`/trip/${this.trip.id}`">View here</router-link>
        </div>
      </div>
    </md-card-content>

  </div>
</template>

<style>
.edit-trip-container {
  background-color: #fafafa !important;
  height: 100vh;
  padding: 20px;
  padding-bottom: 200px;
  overflow-y: scroll;
}
</style>

<script>
import Vue from 'vue';
import moment from 'moment';
import _ from 'lodash';

import { get, patch } from '../../utils.js';

export default {
  props: ['tripId'],
  data: () => ({
    trip: null,
    tripName: '',
    chips: [],
    createdId: null,
    startDate: null,
    endDate: null,
    hasLoaded: false,
    hasSubmitted: false
  }),
  watch: {
    $route: async function() {
      await this.load();
    }
  },
  beforeMount: async function() {
    await this.load();
  },
  methods: {
    load: async function() {
      this.trip = await get(this.$router, `trips/id/${this.tripId}`)
      this.tripName = this.trip.name;
      this.deserializeTrip(this.trip);
    },
    updateChip: function (chips) {
      this.chips = chips;
    },
    updateTripName: function (tripName) {
      this.tripName = tripName;
    },
    toHumanDate: function (date) {
      return moment(date).format('ll');
    },
    deserializeTrip: async function(trip) {
      this.hasLoaded = false;

      this.startDate = moment(new Date(trip.startDate));
      this.endDate = moment(new Date(trip.endDate));

      let locations = _.keyBy(await Promise.all(
        trip.locations.map(async location => {
          const { id } = location;
          return get(this.$router, `locations/id/${id}`);
        })
      ), 'id');

      let i = 0;
      let j = 1;

      for(let date = this.startDate; date.diff(this.endDate) < 0; date.add(1, 'day')) {

        Vue.set(this.chips, i, {
          id: `day_${j}`,
          label: `Day ${j} (${this.toHumanDate(date)})`,
          date: date.toDate().toString(),
          isIndicator: true
        });

        i++;
        j++;


        /* push the location items in */
        this.trip.locations
          .filter(item => moment(item.startTime).isSame(date, 'day'))
          .forEach(location => {
            Vue.set(this.chips, i, {
              id: location.id,
              label: locations[location.id].name,
              subLabel: location.description,
              comment: location.comment,
              date: date.toDate().toString(),
              startTime: {
                HH: moment(location.startTime).hour() || '00',
                mm: moment(location.startTime).minute() || '00'
              },
              endTime: {
                HH: moment(location.endTime).hour() || '00',
                mm: moment(location.endTime).minute() || '00'
              }
            });
            i++;
          });
      }

      Vue.set(this.chips, i, {
        id: `day_${j}`,
        label: `Day ${j} (${this.toHumanDate(this.endDate)})`,
        date: this.endDate.toDate().toString(),
        isIndicator: true
      });
      i++;

      /* push the location items in */
      this.trip.locations
        .filter(item => moment(item.startTime).isSame(this.endDate, 'day'))
        .forEach(location => {
          Vue.set(this.chips, i, {
            id: location.id,
            label: locations[location.id].name,
            subLabel: location.description,
            date: this.endDate,
            comment: location.comment,
            startTime: {
              HH: moment(location.startTime).hour() || '00',
              mm: moment(location.startTime).minute() || '00'
            },
            endTime: {
              HH: moment(location.endTime).hour() || '00',
              mm: moment(location.endTime).minute() || '00'
            }
          });
          i++;
        });

      this.hasLoaded = true;
    },
    submit: async function () {
      this.trip.locations = this.chips
        .filter(item => !item.isIndicator && item.date)
        .map(location => ({
          id: location.id,
          comment: location.comment,
          startTime: moment(location.date)
            .hour(location.startTime.HH)
            .minute(location.startTime.mm)
            .toISOString(),
          endTime: moment(location.date)
            .hour(location.endTime.HH)
            .minute(location.endTime.mm)
            .toISOString()
        }));

      this.trip.locations.sort((a, b) => moment(a.startDate).isBefore(b.startDate));

      try {
        await patch(this.$router, `trips/id/${this.trip.id}`, { locations: this.trip.locations });
        this.hasSubmitted = true;
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>