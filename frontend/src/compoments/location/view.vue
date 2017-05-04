<!-- main component for the location page -->
<name>location-page</name>

<template>
  <div style="padding: 10px">
    <md-layout md-gutter="64">
      <md-layout
        md-flex-xsmall="100"
        md-flex-small="100"
        md-flex-medium="40"
        md-flex-large="40"
        md-flex-xlarge="40"
        md-align="center">
        <div style="width: 100%; padding-left: 10px; padding-right: 10px;">
          <md-card md-with-hover style="margin-bottom: 20px">
            <md-card-header>
              <!-- location info -->
              <div class="md-title">{{locationName}}</div>
              <div
                class="md-subhead"
                style="height: 20px; overflow: hidden; text-overflow: ellipsis;"
                >
                Rating: <span v-if="!rating">No Ratings Yet</span><span v-else>{{rating}}
                <md-icon class="md-warn">star</md-icon></span>
              </div>
              <div class="md-subhead" style="margin-top: 20px">
                <span v-for="tag in tags">#{{tag}} </span>
              </div>
            </md-card-header>
          </md-card>
          <!-- display the location in a google map -->
          <gmap-map
            :center="coordinates"
            :options="{styles: mapTheme}"
            :zoom="15"
            style="height: 500px; box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24); transition: all 0.3s cubic-bezier(.25,.8,.25,1);">
            <gmap-cluster :gridSize="100">
              <gmap-marker
                :position="coordinates"
                :clickable="true"
                :draggable="false"
                :label="locationName"
                @click="onClick(location)">
              </gmap-marker>
            </gmap-cluster>
          </gmap-map>
        </div>
      </md-layout>
      <!-- list of photos associated with that location -->
      <md-layout
        md-flex-xsmall="100"
        md-flex-small="100"
        md-flex-medium="60"
        md-flex-large="60"
        md-flex-xlarge="60"
        md-align="center"
        v-infinite-scroll="loadMore">
        <common-content-card-list
          style="padding-left: 10px; padding-right: 10px;"
          :hasEnded="hasEnded"
          :photos="photos">
        </common-content-card-list>
      </md-layout>
    </md-layout>
  </div>
</template>

<script>
import Vue from 'vue';
import _ from 'lodash';
import * as VueGoogleMaps from 'vue2-google-maps';

import mapTheme from '../common/config/map-theme.js';
import { get, getPhotoUrl } from '../../utils.js';

// initialize the google map
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAoH1TSHe7EpvUrTY51p15d0hndY7ZRGEQ',
    v: '3.27',
    libraries: 'places'
  }
});

export default {
  props: ['locationId'], // obtain the locationId from parent
  data: () => ({
    mapTheme, // custom google map theme
    currentIndex: 0, // current index of the image last loaded
    photos: {}, // object containing all the loaded photos
    locationName: '', // name of location
    tags: {}, // location tags list
    rating: null, // rating of location
    trips: null, // list of trips associated with the location
    coordinates: { lat: 22.4213, lng: 114.2071 }, // default the map coordinate to CUHK
    hasEnded: false // whether or not the feed loading has reached the end
  }),
  // before component is loaded, load location information
  beforeMount: async function () {
    await this.load();
  },
  watch: {
    // trigger a reload whenever this.locationId has changed
    locationId: async function () {
      await this.load();
    }
  },
  methods: {
    // method to load photos, locations, rating
    load: async function () {
      await this.loadPosts(0);
      await this.loadLocation();
      await this.loadRating();
    },
    // method to load all photos
    loadPosts: async function (skip = 0, locationId = this.locationId, count = 5) {
      try {
        // retrieve {{count}} photos associated with the location, starting at index {{skip}}
        let { photos } = await get(this.$router, 'photos/stream', { count, skip, locationId });
        photos.forEach((photo, index) => {
          const result = _.merge(photo, { index: skip + index });
          Vue.set(this.photos, skip + index, result);
        });
        this.currrentIndex = skip + photos.length; // set currentIndex to index of image last laoded
        if (photos.length == 0) {
          this.hasEnded = true;
        }
      } catch (e) {
        console.error(e);
      }
    },
    // method to load location information
    loadLocation: async function (locationId = this.locationId) {
      try {
        // retrieve location name, tags and coordinate from backend
        let { name, tags, coordinates } = await get(this.$router, `locations/id/${locationId}`, { locationId });
        this.locationName = name;
        this.tags = tags;
        this.coordinates = coordinates
      } catch (e) {
        console.error(e);
      }
    },
    // method to load location rating
    loadRating: async function (locationId = this.locationId) {
      try {
        // retrieve location rating
        let { rating } = await get(this.$router, `ratings/locations/${locationId}`, { locationId });
        this.rating = rating;
      } catch (e) {
        console.error(e);
      }
    },
    // method to load more photos (starting at {{currentIndex}}, a total of {{count = 5}} photos)
    loadMore: async function () {
      await this.loadPosts(this.currrentIndex);
    }
  }
};
</script>