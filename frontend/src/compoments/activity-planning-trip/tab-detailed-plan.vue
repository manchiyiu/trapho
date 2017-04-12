<name>activity-planning-trip-tab-detailed-plan</name>

<template>
  <div class="tab-detailed-plan-container" id="edit-container">
    <!-- uncommitted -->
    <md-card-content v-if="!hasCommitted && !createdId">
      <p>Please confirm the basic information before proceeding to this step.</p>
    </md-card-content>

    <div v-if="hasCommitted && !createdId">

      <div class="detailed-plan-row">
        <gmap-map
          :center="coordinates"
          :options="{styles: mapTheme}"
          :zoom="15"
          style="margin-bottom: 20px; width: 100vw; max-width: 500px; height: 200px; box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24); transition: all 0.3s cubic-bezier(.25,.8,.25,1);">
            <gmap-cluster :gridSize="100">
              <gmap-marker
                :key="location.id"
                v-for="location in selected"
                :position="location.coordinates"
                :clickable="false"
                :draggable="false"
                :label="location.name">
              </gmap-marker>
            </gmap-cluster>
        </gmap-map>
      </div>

      <div class="detailed-plan-row">
        <common-plan-edit
          :createdId="createdId"
          :hasCommitted="hasCommitted"
          :data="chips"
          :updateData="updateChip"
          :dataTripName="tripName"
          :updateTripName="updateTripName"
          @submit="submit" />
      </div>

    </div>

    <md-card-content v-if="createdId">
      <div style="text-align: center; font-size: 20px;">
        <div style="margin-bottom: 20px;">
          <md-icon class="md-size-4x">check</md-icon>
        </div>
        Congrats. Trip created.
        <div style="margin-top: 10px">
          <router-link :to="`trip/${this.createdId}`">View here</router-link>
        </div>
      </div>
    </md-card-content>

  </div>
</template>

<style>
.tab-detailed-plan-container {
  background-color: #fafafa !important;
  height: 100vh;
  margin: -16px;
  padding: 20px;
  padding-bottom: 200px;
  overflow-y: scroll;
}
.detailed-plan-row {
  display: flex;
  width: 100%;
  justify-content: center;
}
</style>

<script>
import Vue from 'vue';
import moment from 'moment';
import _ from 'lodash';
import * as VueGoogleMaps from 'vue2-google-maps';

import { post } from '../../utils.js';
import mapTheme from '../common/config/map-theme.js';

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAoH1TSHe7EpvUrTY51p15d0hndY7ZRGEQ',
    v: '3.27',
    libraries: 'places'
  }
});

export default {
  props: ['hasCommitted'],
  data: () => ({
    mapTheme,
    coordinates: { lat: 22.4213, lng: 114.2071 },
    dates: [],
    chips: [],
    selectedDate: 0,
    tripName: '',
    createdId: null
  }),
  watch: {
    hasCommitted: function () {
      if (this.hasCommitted === true) {
        this.updateRange();
      }
    }
  },
  computed: {
    startDate: function () {
      return this.$store.state.ActivityPlanning.startDate;
    },
    endDate: function () {
      return this.$store.state.ActivityPlanning.endDate;
    },
    selected: function () {
      return this.$store.state.ActivityPlanning.selected;
    }
  },
  methods: {
    updateChip: function (chips) {
      this.chips = chips;
    },
    updateTripName: function (tripName) {
      this.tripName = tripName;
    },
    updateRange: function () {
      this.chips = [];

      let i = 0;

      // push selected locations
      _.forEach(this.selected, location => {
        Vue.set(this.chips, i, {
          id: location.id,
          label: location.name,
          subLabel: location.comment,
          date: null,
          comment: '',
          startTime: { HH: null, mm: null },
          endTime: { HH: null, mm: null }
        });
        i++;
      });

      let startDate = moment(this.startDate);
      let endDate = moment(this.endDate);

      let j = 1;
      for(let date = moment(this.startDate); date.diff(this.endDate) < 0; date.add(1, 'day')) {
        Vue.set(this.chips, i, {
          id: `day_${j}`,
          label: `Day ${j} (${this.toHumanDate(date)})`,
          date: date.toDate().toString(),
          isIndicator: true
        });
        i++;
        j++;
      }

      Vue.set(this.chips, i, {
        id: `day_${j}`,
        label: `Day ${j} (${this.toHumanDate(this.endDate)})`,
        date: this.endDate.toDate().toString(),
        isIndicator: true
      });
      i++;
    },
    toHumanDate: function (date) {
      return moment(date).format('ll');
    },
    submit: async function () {
      const locations = this.chips
        .filter(item => !item.isIndicator && item.date)
        .map(location => {
          let payload = {
            id: location.id,
            startTime: moment(location.date)
              .hour(location.startTime.HH)
              .minute(location.startTime.mm)
              .toISOString(),
            endTime: moment(location.date)
              .hour(location.endTime.HH)
              .minute(location.endTime.mm)
              .toISOString()
          };
          if (_.isString(location.comment) && location.comment.trim().length > 0) {
            payload.comment = location.comment;
          }
          return payload;
        })
      try {
        let { id } = await post(this.$router, 'trips', {
          name: this.tripName.trim(),
          timestamp: moment().toISOString(),
          startDate: this.startDate.toISOString(),
          endDate: this.endDate.toISOString(),
          locations
        });
        this.createdId = id;
        this.$store.commit('activityPlanningClear');
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>