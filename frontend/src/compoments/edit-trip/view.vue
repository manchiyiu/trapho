<name>edit-trip-view</name>

<template>
  <div class="edit-trip-container" id="edit-container">
    <div v-if="hasLoaded && !hasSubmitted">
      <div class="edit-trip-row">
        <gmap-map
          :center="coordinates"
          :options="{styles: mapTheme}"
          :zoom="15"
          style="margin-bottom: 20px; height: 200px; width: 100vw; max-width: 500px; box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24); transition: all 0.3s cubic-bezier(.25,.8,.25,1);">
          <gmap-cluster :gridSize="100">
            <gmap-marker
              :key="location.id"
              v-for="location in locations"
              :position="location.coordinates"
              :clickable="false"
              :draggable="false"
              :label="location.name">
            </gmap-marker>
          </gmap-cluster>
        </gmap-map>
      </div>
      <div class="edit-trip-row">
        <common-plan-edit
          :createdId="createdId"
          :hasCommitted="true"
          :data="chips"
          :updateData="updateChip"
          :dataTripName="tripName"
          :updateTripName="updateTripName"
          @submit="submit" />
      </div>
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
.edit-trip-row {
  display: flex;
  width: 100vw;
  justify-content: center;
}
</style>

<script>
import Vue from 'vue';
import moment from 'moment';
import _ from 'lodash';
import * as VueGoogleMaps from 'vue2-google-maps';

import { get, patch } from '../../utils.js';
import mapTheme from '../common/config/map-theme.js';

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAoH1TSHe7EpvUrTY51p15d0hndY7ZRGEQ',
    v: '3.27',
    libraries: 'places'
  }
});

export default {
  props: ['tripId'],
  data: () => ({
    mapTheme,
    trip: null,
    tripName: '',
    chips: [],
    coordinates: { lat: 22.4213, lng: 114.2071 },
    createdId: null,
    startDate: null,
    endDate: null,
    hasLoaded: false,
    hasSubmitted: false,
    locations: []
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

      this.locations = await Promise.all(
        trip.locations.map(async location => {
          const { id } = location;
          return get(this.$router, `locations/id/${id}`);
        }));

      let locations = _.keyBy(this.locations, 'id');

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
        await patch(this.$router, `trips/id/${this.trip.id}`, {
          name: this.tripName,
          locations: this.trip.locations
        });
        this.hasSubmitted = true;
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>