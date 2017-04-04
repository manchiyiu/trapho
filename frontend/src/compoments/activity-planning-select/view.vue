<name>activity-planning-view</name>

<template>
  <md-layout md-gutter style="height: 100%; width: 100vw; overflow: none;">
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
        <gmap-cluster :gridSize="100">
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
          <md-tab md-label="Wishlist">
            <activity-planning-wishlist
              :toggleSelected="toggleSelected"
              :locations="locations" />
          </md-tab>
          <md-tab md-label="More">
            <activity-planning-more
              :toggleSelected="toggleSelected" />
          </md-tab>
          <md-tab md-label="Selected">
            <activity-planning-wishlist
              :toggleSelected="toggleSelected"
              :locations="selected" />
          </md-tab>
        </md-tabs>
      </md-whiteframe>
    </md-layout>
    <md-button class="md-fab plan-next-fab" :disabled="!hasSelected" @click.native="nextStep">
      <md-icon>navigate_next</md-icon>
    </md-button>
  </md-layout>
</template>

<style>
.activity-planning-view-map {
  z-index: 0;
  min-height: 500px;
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
    mapTheme,
    center: {
      lat: 22.4213,
      lng: 114.2071
    },
    locations: []
  }),
  computed: {
    selected: {
      get: function () {
        return this.$store.state.ActivityPlanning.selected;
      },
      set: function (value) {
        this.$store.state.commit('activityPlanningSetSelected', value);
      }
    },
    hasSelected: function () {
      return Object.keys(this.selected).length > 0;
    }
  },
  mounted: function () {
    this.load();
  },
  methods: {
    load: async function () {
      let { locations } = await get(this.$router, `locations/wishlist`);
      this.locations = locations;
    },
    toggleSelected: function(location) {
      if (!this.selected[location.id]) {
        Vue.set(this.selected, location.id, location);
      } else {
        Vue.delete(this.selected, location.id);
      }
    },
    nextStep: function () {
      this.$router.push('/plan-trip');
    }
  }
};
</script>