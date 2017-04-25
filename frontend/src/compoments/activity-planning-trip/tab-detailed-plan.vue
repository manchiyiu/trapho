<!-- a component for user to conduct timetable planning for trip -->
<name>activity-planning-trip-tab-detailed-plan</name>

<template>
  <div class="tab-detailed-plan-container" id="edit-container">

    <!-- message to be shown if basic info are still uncommitted -->
    <md-card-content v-if="!hasCommitted && !createdId">
      <p>Please confirm the basic information before proceeding to this step.</p>
    </md-card-content>

    <!-- this will be shown if basic info committed and form not submitted -->
    <div v-if="hasCommitted && !createdId">
      <!-- a map showing the list of selected location -->
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

      <!-- a component to allow user to do timetable planning, for detail, see the <commin-plan-edit> component -->
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

    <!-- this will be shown when the trip has been created -->
    <md-card-content v-if="createdId">
      <div style="text-align: center; font-size: 20px;">
        <div style="margin-bottom: 20px;">
          <md-icon class="md-size-4x">check</md-icon>
        </div>
        Congrats. Trip created.
        <div style="margin-top: 10px">
          <!-- upon clicking this link, user will be redirected to the trip page -->
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

// load the Google Map component
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAoH1TSHe7EpvUrTY51p15d0hndY7ZRGEQ',
    v: '3.27',
    libraries: 'places'
  }
});

export default {
  props: ['hasCommitted'], // whether user has committed the basic info or not
  data: () => ({
    mapTheme, // custom theme for Google Map
    coordinates: { lat: 22.4213, lng: 114.2071 }, // the center of the map, initially set to the coordinate of CUHK
    dates: [], // a list of date object, each representing a date in the trip
    chips: [], // a list of drag-and-droppable location items
    tripName: '', // the value of the user inputted trip name
    createdId: null // the tripId (if the user has submitted this form)
  }),
  watch: {
    hasCommitted: function () { // will be invoked on each hasCommitted change
      if (this.hasCommitted === true) { // if user has just commited the basic info
        this.updateRange(); // update this.dates and this.chips to reflect the change
      }
    }
  },
  computed: {
    startDate: function () { // start date of the trip
      return this.$store.state.ActivityPlanning.startDate;
    },
    endDate: function () { // end date of the trip
      return this.$store.state.ActivityPlanning.endDate;
    },
    selected: function () { // list of selected locations
      return this.$store.state.ActivityPlanning.selected;
    }
  },
  methods: {
    updateChip: function (chips) { // to update this.chip, for drag-and-drop component
      this.chips = chips;
    },
    updateTripName: function (tripName) { // to update trip name, for trip name input element
      this.tripName = tripName;
    },
    updateRange: function () { // update this.date and this.chip according the start and end date and selected locations
      this.chips = [];

      let i = 0;

      // push selected locations into this.chips
      _.forEach(this.selected, location => {
        Vue.set(this.chips, i, {
          id: location.id,
          label: location.name, // label for the item
          subLabel: location.comment, // description for the item
          date: null, // this will store the date at which this location will be visited
          comment: '', // custom user comment
          startTime: { HH: null, mm: null }, // start time (HH: hour, mm: minute)
          endTime: { HH: null, mm: null } // end time
        });
        i++;
      });

      let startDate = moment(this.startDate); // start date
      let endDate = moment(this.endDate); // end date

      let j = 1;
      // iterate from the startDate until the endDate, increment by one date each time
      for(let date = moment(this.startDate); date.diff(this.endDate) < 0; date.add(1, 'day')) {
        Vue.set(this.chips, i, { // push a new date header object into this.chips
          id: `day_${j}`,
          label: `Day ${j} (${this.toHumanDate(date)})`, // generate a human readable label to denote each date
          date: date.toDate().toString(),
          isIndicator: true // to denote that this is not a location item, therefore should not be draggable
        });
        i++;
        j++;
      }

      Vue.set(this.chips, i, { // push the end date header object into this.chips
        id: `day_${j}`,
        label: `Day ${j} (${this.toHumanDate(this.endDate)})`,
        date: this.endDate.toDate().toString(),
        isIndicator: true
      });
      i++;
    },
    toHumanDate: function (date) { // convert a JavaScript date into human readable format
      return moment(date).format('ll');
    },
    submit: async function () { // submit the form
      const locations = this.chips
        .filter(item => !item.isIndicator && item.date) // filter all items that are not location items
        .map(location => { // transform our internal format into backend readable format
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
          if (_.isString(location.comment) && location.comment.trim().length > 0) { // if there is comments for the location
            payload.comment = location.comment; // add the comment into the object
          }
          return payload;
        })
      try {
        let { id } = await post(this.$router, 'trips', { // send the trip info to backend to create a new trip
          name: this.tripName.trim(), // trip name
          timestamp: moment().toISOString(), // time when this trip is created
          startDate: this.startDate.toISOString(), // trip start date
          endDate: this.endDate.toISOString(), // trip end date
          locations // location items
        });
        this.createdId = id; // store the newly created trip ID
        this.$store.commit('activityPlanningClear'); // clear all the activity planning data in the vuex store
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>