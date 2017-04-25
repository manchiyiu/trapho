<!-- Google Map component for showing a list of locations -->
<name>common-map</name>

<template>
  <div>
    <!-- the map -->
    <gmap-map
      :center="center"
      :options="{styles: mapTheme}"
      :zoom="10"
      style="height: 500px">
      <gmap-cluster :gridSize="100">
        <gmap-marker
          v-for="(location, index) in locations"
          :key="index"
          :position="location.coordinates"
          :clickable="true"
          :draggable="false"
          :label="location.name"
          @click="onClick(location)">
        </gmap-marker>
      </gmap-cluster>
    </gmap-map>
    <!-- selected location info -->
    <div class="common-map-body" v-if="!!selectedLocation">
      <h2>{{selectedLocation.name}}</h2>
      <md-chip class="common-map-tag" v-for="(tag, index) in selectedLocation.tags" :key="index">{{tag}}</md-chip>
    </div>
  </div>
</template>

<style>
.common-map-body {
  padding: 20px;
}
.common-map-tag {
  margin-right: 5px;
  margin-bottom: 5px;
}
</style>

<script>
import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';

import mapTheme from '../common/config/map-theme.js';
import { post } from '../../utils.js';

// load Google Map compnoent
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAoH1TSHe7EpvUrTY51p15d0hndY7ZRGEQ',
    v: '3.27',
    libraries: 'places'
  }
});

export default {
  props: ['onChange', 'active'], // onChange: a method that will be called when user clicked on the map; active: whether the component is now visible on the screen
  data: () => ({
    mapTheme, // custom map theme for Google Map
    center: { // coordinate for the center of the map, initially that of CUHK
      lat: 22.4213,
      lng: 114.2071
    },
    locations: null, // list of locations to be displayed in map
    selectedLocation: null // selected location
  }),
  beforeMount: async function() { // before the component is loaded
    let { locations } = await post(this.$router, 'locations/query', { query: {} }); // retrieve a list of all locations from backend
    this.locations = locations;
  },
  methods: {
    onClick: function(location) { // on map marker clicked
      this.center = location.coordinates; // set the map center to the coordinate of the clicked location
      this.selectedLocation = location; // store the selected location
    }
  },
  watch: {
    selectedLocation: function() { // invoked on every selectedLocation variable change
      if (this.selectedLocation != null) { // a location has just been selected
        this.onChange(this.selectedLocation); // invoke this.onChange
      }
    }
  }
};

</script>