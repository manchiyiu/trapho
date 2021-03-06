<!-- component for showing trip information -->
<name>trip-view</name>

<template>
  <div class="trip-container">
    <div style="margin-top: 20px; margin-bottom: 20px;">
      <!-- header -->
      <div class="trip-row">
        <md-input-container style="width: 90vw; max-width: 500px;">
          <label>Trip name</label>
          <md-input disabled v-model="name"></md-input>
        </md-input-container>
      </div>
      <div style="display: flex; justify-content: center; width: 100vw;">
        <md-button class="md-icon-button" v-if="trip && trip.userId === currentUserId" @click.native="remove"><md-icon>delete</md-icon></md-button>
        <md-button class="md-icon-button" v-if="trip && trip.userId === currentUserId"><router-link :to="`/edit-trip/${trip.id}`"><md-icon>create</md-icon></router-link></md-button>
        <md-button class="md-icon-button" @click.native="print"><md-icon>print</md-icon></md-button>
      </div>

      <!-- map -->
      <div class="trip-row" style="margin-top: 30px; margin-bottom: 30px;">
        <gmap-map
          :center="coordinates"
          :options="{styles: mapTheme}"
          :zoom="15"
          style="margin-bottom: 20px; width: 100vw; max-width: 500px; height: 200px; box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24); transition: all 0.3s cubic-bezier(.25,.8,.25,1);">
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

      <!-- trip content -->
      <div id="print-element">
        <div v-for="(day, index) in days" :key="index" style="page-break-before: always;">
          <div class="trip-item trip-day-header">{{day.label}}</div>
          <p class="trip-row" v-if="day.locations.length <= 0">
            <b><i>No plan for this day?</i></b>
          <p>
          <div class="trip-row" v-for="location in day.locations">
            <md-card class="trip-item" md-with-hover>
              <md-card-content>
                <div class="md-title">
                  <router-link :to="`/location/${location.id}`">
                    {{location.name}}
                  </router-link>
                </div>
                <div class="md-subtitle">{{location.description}}</div>
                <md-divider style="margin-top: 10px; margin-bottom: 10px;"></md-divider>
                {{location.comment}}
                <md-divider style="margin-top: 10px; margin-bottom: 10px;"></md-divider>
                <!-- show time -->
                <div>
                  <b style="margin-right: 20px;">From</b>
                  <span>{{toHumanTime(location.startTime)}}</span>
                </div>
                <div>
                  <b style="margin-right: 20px;">To&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>
                  <span>{{toHumanTime(location.endTime)}}</span>
                </div>
              </md-card-content>
            </md-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.trip-container {
  background-color: #fafafa !important;
  height: 100vh;
  width: 100vw;
  padding-bottom: 200px;
  overflow-y: scroll;
}
.trip-title {
  font-size: 30px;
}
.trip-row {
  display: flex;
  width: 100vw;
  justify-content: center;
}
.trip-item {
  max-width: 500px;
  width: 100vw;
  margin-top: 10px;
  margin-bottom: 10px;
}
.trip-day-header {
  border-top: 1px solid #ddd;
  padding-top: 10px;
  font-weight: bolder;
  font-size: 16px;
  color: #aaa;
  text-align: center;
  min-width: 100vw;
}
</style>

<script>
import Vue from 'vue';
import moment from 'moment';
import { printElement } from 'print-html-element';
import * as VueGoogleMaps from 'vue2-google-maps';

import mapTheme from '../common/config/map-theme.js';
import { get, del } from '../../utils.js';

// initialize the Google Map
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAoH1TSHe7EpvUrTY51p15d0hndY7ZRGEQ',
    v: '3.27',
    libraries: 'places'
  }
});

export default {
  props: ['tripId'], // retrieve tripId from parent
  data: () => ({
    name: '', // trip name
    trip: null, // trip object
    days: {}, // breakdown of the trip object by day
    mapTheme, // custom theme for Google Map
    locations: [], // list of selected locations
    coordinates: { lat: 22.4213, lng: 114.2071 } // center of the map, defaulted to CUHK
  }),
  // trigger trip information load before rendering the component
  beforeMount: async function () {
    await this.loadTrip();
  },
  computed: {
    // user id of the current user
    currentUserId: function () {
      return this.$store.state.User.info.id;
    }
  },
  watch: {
    // monitor the $route, if changed, reload trip
    $route: async function () {
      await this.loadTrip();
    }
  },
  methods: {
    // method to load trip information
    loadTrip: async function () {
      try {
        // retrieve trip info from backend by tripId
        this.trip = await get(this.$router, `trips/id/${this.tripId}`);
        this.name = this.trip.name;
        this.deserializeTrip(this.trip);
      } catch (e) {
        console.error(e);
      }
    },
    // method to extract the trip start date, end date, list of locations and draggable items
    deserializeTrip: async function(trip) {

      // extract date
      let startDate = moment(new Date(trip.startDate));
      let endDate = moment(new Date(trip.endDate));

      this.locations = [];

      // push the day header to list of draggable items
      let i = 0;
      for(let date = moment(startDate); date.diff(endDate) <= 0; date.add(1, 'day')) {
        Vue.set(this.days, i, {
          label: `Day ${i + 1} (${this.toHumanDate(date)})`,
          date: date.toDate().toString(),
          locations: []
        });
        i++;
      }

      trip.locations.forEach(location => {
         const diff = moment(location.startTime).diff(startDate, 'days');
         Vue.set(this.days[diff].locations, this.days[diff].locations.length, location);
      });

      // push the list of locations to draggable item list
      let locationResults = await _.map(this.days, async (day, index) => {
        let results = await Promise.all(
          day.locations.map(location => get(this.$router, `locations/id/${location.id}`))
        );
        results.forEach((result, i) => {
          this.locations.push(result);
          Vue.set(
            this.days[index].locations,
            i,
            _.merge(result, this.days[index].locations[i])
          );
        });
      });
    },
    // method to convert JavaScript date to human readable date
    toHumanDate: function (date) {
      return moment(date).format('ll');
    },
    // method to convert JavaScript time to human readable time
    toHumanTime: function (time) {
      return moment(time).format('LLL');
    },
    // method to trigger browser print dialog
    print: async function () {
      printElement(document.getElementById('print-element'));
    },
    // method to delete trip
    remove: async function () {
      try {
        // ask backend to delete the trip
        await del(this.$router, `trips/id/${this.tripId}`);
        // redirect the user to photo feed page
        this.$router.push('/feed');
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>