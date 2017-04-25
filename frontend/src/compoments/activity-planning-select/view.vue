<!-- this page component is the page in which user will select a list of locations to go to -->
<name>activity-planning-view</name>

<template>
  <md-layout md-gutter style="height: 100%; width: 100vw; overflow: none;">
    <!-- the location map of the left showing the selected locations on a Google Map -->
    <md-layout
      class="activity-planning-view-map"
      md-flex-xsmall="100"
      md-flex-small="100"
      md-flex-medium="60"
      md-flex-large="60"
      md-flex-xlarge="70"
      md-align="center">
      <gmap-map
        :center="center"
        :options="{styles: mapTheme}"
        :zoom="12"
        style="height: 100%; width: 100%;">
        <gmap-cluster :gridSize="100"><!-- group the locations into a cluster if too many -->
          <gmap-marker
            v-for="(location, index) in selected"
            :key="index"
            :position="location.coordinates"
            :clickable="true"
            :draggable="false"
            :label="location.name"
            @click="onClick(location)">
          </gmap-marker>
        </gmap-cluster>
      </gmap-map>
    </md-layout>
    <!-- the location list on the right on which users can select the location to go to -->
    <md-layout
      md-flex-xsmall="100"
      md-flex-small="100"
      md-flex-medium="40"
      md-flex-large="40"
      md-flex-xlarge="30"
      md-align="center">
      <md-whiteframe class="activity-planning-view-card" md-elevation="10">
        <md-subheader><b><u>Step 1</u></b></md-subheader>
        <md-subheader>Select locations that you can to go to from your wishlist:</md-subheader>
        <md-tabs md-centered class="md-transparent">
          <md-tab md-label="Wishlist"><!-- this tab element shows the list of locations from user wishlist -->
            <activity-planning-wishlist
              :toggleSelected="toggleSelected"
              :locations="locations" />
          </md-tab>
          <md-tab md-label="More"><!-- this tab element allows user to add more location by name or location tags -->
            <activity-planning-more
              :toggleSelected="toggleSelected" />
          </md-tab>
          <md-tab md-label="Selected"><!-- this tab element shows the list of location that have been selected -->
            <activity-planning-wishlist
              :toggleSelected="toggleSelected"
              :locations="selected" />
          </md-tab>
        </md-tabs>
      </md-whiteframe>
    </md-layout>
    <!-- upon clicking the button, user will be redirected to the trip planning page -->
    <md-button class="md-fab plan-next-fab" :disabled="!hasSelected" @click.native="nextStep">
      <md-icon>navigate_next</md-icon>
    </md-button>
  </md-layout>
</template>

<style>
.activity-planning-view-map {
  z-index: 0;
}
@media (max-width: 600px) {
  .activity-planning-view-map {
    height: 50vh;
    max-height: 500px;
  }
}
@media (min-width: 600px) {
  .activity-planning-view-map {
    height: 100vh;
  }
}
.activity-planning-view-card {
  background-color: white !important;
  overflow-y: scroll;
  height: calc(100vh - 64px);
  width: 100%;
  z-index: 0;
}
.plan-next-fab {
  position: fixed;
  right: 25px;
  bottom: 20px;
  z-index: 99;
}
</style>

<script>
import Vue from 'vue';

import mapTheme from '../common/config/map-theme.js';
import { get } from '../../utils.js';

export default {
  data: () => ({
    mapTheme, // custom theme for the Google Map component
    center: { // initialize the map to centered at Chinese University
      lat: 22.4213,
      lng: 114.2071
    },
    locations: []
  }),
  computed: {
    selected: { // retrieve the list of selected location from the vuex store
      get: function () {
        return this.$store.state.ActivityPlanning.selected;
      },
      set: function (value) {
        this.$store.state.commit('activityPlanningSetSelected', value);
      }
    },
    hasSelected: function () { // a boolean denoting whether or not the user has selected any location
      return Object.keys(this.selected).length > 0;
    }
  },
  mounted: function () { // on component loaded, retrieve user's wishlist from backend
    this.load();
  },
  methods: {
    load: async function () { // retrieve user's wishlist from backend
      let { locations } = await get(this.$router, `locations/wishlist`);
      this.locations = locations; // store the list internally
    },
    toggleSelected: function(location) { // to toggle the this.selected boolean
      if (!this.selected[location.id]) {
        Vue.set(this.selected, location.id, location);
      } else {
        Vue.delete(this.selected, location.id);
      }
    },
    nextStep: function () { // go to the trip planning page
      this.$router.push('/plan-trip');
    }
  }
};
</script>