<name>activity-planning-view</name>

<template>
  <div style="height: 100%; width: 100vw; overflow: none;">
    <gmap-map
      :center="center"
      :options="{styles: mapTheme}"
      :zoom="12"
      style="height: 100%; width: 100%;">
      <gmap-marker
        v-for="(location, index) in selectedLocations"
        :key="index"
        :position="location.coordinates"
        :clickable="true"
        :draggable="false"
        :label="location.name"
        @click="onClick(location)">
      </gmap-marker>
    </gmap-map>
    <md-whiteframe class="activity-planning-view-card" md-elevation="10">
      <md-subheader><b><u>Step 1</u></b></md-subheader>
      <md-subheader>Select locations that you can to go to from your wishlist:</md-subheader>
      <activity-planning-wishlist :locations="locations">
      </activity-planning-wishlist>
    </md-whiteframe>
    <md-button class="md-fab plan-next-fab">
      <md-icon>navigate_next</md-icon>
    </md-button>
  </div>
</template>

<style>
.activity-planning-view-card {
  padding: 10px;
  width: 300px;
  height: 500px;
  position: fixed;
  bottom: 25px;
  right: 80px;
  background-color: white;
  overflow-y: scroll;
}
.plan-next-fab {
  position: fixed;
  right: 45px;
  bottom: 40px;
  z-index: 99;
}
</style>

<script>
import Vue from 'vue';
import mapTheme from '../common/config/map-theme.js';

export default {
  data: () => ({
    mapTheme,
    center: {
      lat: 22.4213,
      lng: 114.2071
    },
    locations: [
      {
        "id": "58ccf9e3d914f3000f76f50c",
        "name": "Sha Tin Town Hall",
        "description": "1 Yuen Wo Road, Sha Tin",
        "tags": [
          "city hall",
          "movie theater",
          "local government office",
          "point of interest",
          "establishment"
        ],
        "coordinates": {
          "lng": 114.189895,
          "lat": 22.381263
        }
      },
      {
        "id": "58ccf9e3d914f3000f76f50d",
        "name": "Tsuen Wan Town Hall",
        "description": "72 Tai Ho Road, Tsuen Wan",
        "tags": [
          "city hall",
          "local government office",
          "point of interest",
          "establishment"
        ],
        "coordinates": {
          "lng": 114.1127584,
          "lat": 22.3708814
        }
      }
    ]
  }),
  computed: {
    selectedLocations: function () {
      return this.locations.filter(item => this.selected[item.id]);
    },
    selected: function () {
      return this.$store.state.ActivityPlanning.selected;
    }
  },
  methods: {
    toggleSelected: function(id) {
      if (this.selected[id]) {
        Vue.set(this.selected, id, false);
      } else {
        Vue.set(this.selected, id, true);
      }
    }
  }
};
</script>