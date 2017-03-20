<name>common-map</name>

<template>
  <div>
    <gmap-map :center="center" :zoom="10" style="height: 500px">
      <gmap-cluster :gridSize="20">
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

import { post } from '../../utils.js';

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAoH1TSHe7EpvUrTY51p15d0hndY7ZRGEQ',
    v: '3.27',
    libraries: 'places'
  }
});

export default {
  props: ['onChange'],
  data: () => ({
    center: {
      lat: 22.4213,
      lng: 114.2071
    },
    locations: null,
    selectedLocation: null
  }),
  beforeMount: async function() {
    let { locations } = await post(this.$router, 'locations/query', { query: {} });
    this.locations = locations;
  },
  methods: {
    onClick: function(location) {
      this.center = location.coordinates;
      this.selectedLocation = location;
    }
  },
  watch: {
    selectedLocation: function() {
      if (this.selectedLocation != null) {
        this.onChange(this.selectedLocation);
      }
    }
  }
};

</script>