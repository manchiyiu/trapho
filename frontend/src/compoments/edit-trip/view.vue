<!-- the main page component for editing existing trip -->
<name>edit-trip-view</name>

<template>
  <div class="edit-trip-container" id="edit-container">
    <!-- only display if the trip is loaded and form not subbmitted -->
    <div v-if="hasLoaded && !hasSubmitted">
      <div class="edit-trip-row">
        <!-- map component showing the list of locations in the trip -->
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
        <!-- edit trip component -->
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

    <!-- if not loaded, show a spinner -->
    <div v-if="!hasLoaded" style="display: flex; justify-content: center;">
      <md-spinner md-indeterminate></md-spinner>
    </div>

    <!-- if user has submitted -->
    <md-card-content v-if="hasSubmitted && hasLoaded">
      <div style="text-align: center; font-size: 20px;">
        <div style="margin-bottom: 20px;">
          <md-icon class="md-size-4x">check</md-icon>
        </div>
        Congrats. Trip edited.
        <div style="margin-top: 10px">
          <!-- link to the trip page -->
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
  width: 100%;
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

// initialize the google map API
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAoH1TSHe7EpvUrTY51p15d0hndY7ZRGEQ',
    v: '3.27',
    libraries: 'places'
  }
});

export default {
  props: ['tripId'], // retrieve id of the trip from parent component
  data: () => ({
    mapTheme, // custom theme of google map
    trip: null, // the trip object
    tripName: '', // trip name
    chips: [], // array storing all draggable items
    coordinates: { lat: 22.4213, lng: 114.2071 }, // default to CUHK coordinate
    createdId: null, // will equal trip id if submitted, else null
    startDate: null, // start date of the trip
    endDate: null, // end date of the trip
    hasLoaded: false, // the trip info has been loaded
    hasSubmitted: false, // the trip edit has been submitted
    locations: [] // the list of selected locations
  }),
  watch: {
    // on page enter, load trip info
    $route: async function() {
      await this.load();
    }
  },
  // before component is rendered, load trip info
  beforeMount: async function() {
    await this.load();
  },
  methods: {
    // method to load trip info
    load: async function() {
      this.trip = await get(this.$router, `trips/id/${this.tripId}`); // retrieve trip by id from backend
      this.tripName = this.trip.name;
      this.deserializeTrip(this.trip); // extract list of locations, start and end date, and draggable items from trip object
    },
    // method to update chip
    updateChip: function (chips) {
      this.chips = chips;
    },
    // method to update trip name
    updateTripName: function (tripName) {
      this.tripName = tripName;
    },
    // method to convert javscript date into human-readable format
    toHumanDate: function (date) {
      return moment(date).format('ll');
    },
    // method to extract list of locations, start and end date, and draggable items from trip object
    deserializeTrip: async function(trip) {
      this.hasLoaded = false;

      // extract date
      this.startDate = moment(new Date(trip.startDate));
      this.endDate = moment(new Date(trip.endDate));

      // extract list of locations
      this.locations = await Promise.all(
        trip.locations.map(async location => {
          const { id } = location;
          return get(this.$router, `locations/id/${id}`);
        }));

      let locations = _.keyBy(this.locations, 'id');

      // extract draggable items

      let i = 0;
      let j = 1;

      for(let date = this.startDate; date.diff(this.endDate) < 0; date.add(1, 'day')) {

        // push the date header in
        Vue.set(this.chips, i, {
          id: `day_${j}`,
          label: `Day ${j} (${this.toHumanDate(date)})`,
          date: date.toDate().toString(),
          isIndicator: true
        });

        i++;
        j++;

        // push the location items in
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

      // push the location items in
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
    // method to submit the form
    submit: async function () {
      // convert the list of draggable items to list of locations (with start and end time, comment, locationId)
      this.trip.locations = this.chips
        .filter(item => !item.isIndicator && item.date)
        .map(location => ({
          id: location.id,
          comment: location.comment,
          startTime: moment(location.date)
            .hour(location.startTime.HH)
            .minute(location.startTime.mm)
            .toISOString(), // convert Javascript date into ISO format
          endTime: moment(location.date)
            .hour(location.endTime.HH)
            .minute(location.endTime.mm)
            .toISOString() // convert Javascript date into ISO format
        }));

      // sort the locations by start date
      this.trip.locations.sort((a, b) => moment(a.startDate).isBefore(b.startDate));

      // submit the resulting trip location to the backend
      try {
        await patch(this.$router, `trips/id/${this.trip.id}`, {
          name: this.tripName,
          locations: this.trip.locations
        });
        this.hasSubmitted = true; // submit successful
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>