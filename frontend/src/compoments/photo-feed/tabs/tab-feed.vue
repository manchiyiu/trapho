<!-- component for the photo feed -->
<name>photo-feed-tab-feed</name>

<template>
  <md-layout md-gutter="64" v-if="active">
    <md-layout
      md-flex-xsmall="100"
      md-flex-small="100"
      md-flex-medium="40"
      md-flex-large="40"
      md-flex-xlarge="40"
      md-align="center">
      <div style="width: 100%; padding-left: 10px; padding-right: 10px;">

        <!-- search fitler location -->
        <md-card md-with-hover style="margin-bottom: 20px;">
          <md-card-header style="margin-bottom: 0px">
            <div style="font-weight: bolder;">Filter</div>
          </md-card-header>
          <md-card-content>
            <form novalidate @submit.stop.prevent="submitFilter">
              <!-- user name filter -->
              <md-input-container md-inline>
                <md-icon>person</md-icon>
                <label>Username</label>
                <md-input v-model="filter.username"></md-input>
              </md-input-container>
              <!-- location name filter -->
              <md-input-container md-inline>
                <md-icon>location_on</md-icon>
                <label>Location Name</label>
                <md-input v-model="filter.locationName"></md-input>
              </md-input-container>
              <!-- location tag filter -->
              <md-input-container>
                <md-icon>bookmark</md-icon>
                <label>Location tags</label>
                <md-input v-model="filter.tags"></md-input>
              </md-input-container>
              <!-- photo tag filter -->
              <md-input-container>
                <md-icon>bookmark</md-icon>
                <label>Photo tags</label>
                <md-input v-model="filter.photoTags"></md-input>
              </md-input-container>
              <!-- clear button -->
              <md-card-actions>
                <md-button class="md-primary" @click.native="clearFilter">Clear</md-button>
                <md-button type="submit" class="md-raised md-primary" :disabled="!isFilterFilled" @click.native="submitFilter">Submit</md-button>
              </md-card-actions>
            </form>
          </md-card-content>
        </md-card>
        <!-- VR component -->
        <md-card md-with-hover style="margin-bottom: 20px;">
          <md-card-header>
            <div style="font-weight: bolder;">VR Discovery</div>
            <div style="margin-top: 20px;">
              <i>Powered by WebVR technologies, explore the world through a Virtual Reality headset like HTC Vive, Oculus Rift, HTC Vive, Playstation VR or Google Cardboard/Daydream. Don't have access to a VR device? You can try to play with it on your own computer or mobile devices. Exapnd this card to try.</i>
            </div>
          </md-card-header>
          <md-card-expand>
            <md-card-actions>
              <md-button class="md-icon-button" md-expand-trigger @click.native="vrExpanded = !vrExpanded">
                <md-icon>keyboard_arrow_down</md-icon>
              </md-button>
            </md-card-actions>
            <md-card-content>
              <!-- component for a VR scene -->
              <a-scene id="aframe-scene" embedded class="tab-vr-scene" v-if="vrExpanded">
                <a-sky :src="currentPhoto"></a-sky>
              </a-scene>
              <div style="display: flex; justify-content: center;">
                <md-button @click.native="onLastPhoto" :disabled="currentIndex <= 0">
                  <md-icon>keyboard_arrow_left</md-icon>
                </md-button>
                <md-button @click.native="onNextPhoto" :disabled="currentIndex == totalCount">
                  <md-icon>keyboard_arrow_right</md-icon>
                </md-button>
              </div>
            </md-card-content>
          </md-card-expand>
        </md-card>
      </div>
    </md-layout>
    <!-- photo feed component -->
    <md-layout
      md-flex-xsmall="100"
      md-flex-small="100"
      md-flex-medium="60"
      md-flex-large="60"
      md-flex-xlarge="60"
      md-align="center"
      v-infinite-scroll="loadMore">
      <common-content-card-list
        @onLocationTagClicked="onLocationTagClicked"
        @onPhotoTagClicked="onPhotoTagClicked"
        style="padding-left: 10px; padding-right: 10px;"
        :hasEnded="hasEnded"
        :photos="photos">
      </common-content-card-list>
    </md-layout>
  </md-layout>
</template>

<style>
.tab-vr-main {
  display: flex;
  margin-left: -50px;
  margin-right: -50px;
  justify-content: center;
}
.tab-vr-scene {
  height: 50vh;
  width: 100%;
}
a-scene {
  display: block; width: 50%;
}
</style>

<script>
import Vue from 'vue';
import _ from 'lodash';

import { get, getPhotoUrl } from '../../../utils.js';

export default {
  props: ['active'], // whether or not the this page is visible to the user
  // before component is loaded, load the photos
  beforeMount: async function () {
    this.loadPosts(0);
  },
  data: () => ({
    currentIndex: 0, // index of the last photo loaded
    vrExpanded: false, // whether the VR component expanded
    photos: {}, // the object storing the photo objects
    filter: { // object storing all the user input value
      username: '',
      locationName: '',
      tags: '',
      photoTags: ''
    },
    hasEnded: false // whether or not the feed loading has reached the end
  }),
  watch: {
    // triggered when the compoent become visible
    active: function () {
      if (this.active) {
        // reload
        this.resetFeed();
        this.loadMore();
      } else {
        // clear all photos
        this.resetFeed();
      }
    }
  },
  computed: {
    // total number of photos loaded
    totalCount: function () {
      return Object.keys(this.photos).length - 1;
    },
    // URL of the photo currently selected in the VR component
    currentPhoto: function () {
      return getPhotoUrl(_.get(this.photos, `${this.currentIndex}.url`, ''));
    },
    // whether any one of the filter are inputted
    isFilterFilled: function () {
      return this.filter.username.length > 0 ||
        this.filter.locationName.length > 0 ||
        this.filter.tags.length > 0 ||
        this.filter.photoTags.length > 0;
    }
  },
  methods: {
    // method to load more posts
    loadPosts: async function (skip, username, locationName, tags, photoTags, count = 5) {
      let query = { count, skip };

      // put the username in payload if filled
      if (_.isString(username) && username.trim().length > 0) {
        query.username = username;
      }

      // put the locationName in payload if filled
      if (_.isString(locationName) && locationName.trim().length > 0) {
        query.locationName = locationName;
      }

      // put the location tags in payload if filled
      if (_.isString(tags) && tags.trim().length > 0) {
        query.tags = tags.trim();
      }

      // put the photo tags in payload if filled
      if (_.isString(photoTags) && photoTags.trim().length > 0) {
        query.photoTags = photoTags.trim();
      }

      // retrieve the list of photos by the filter
      let { photos } = await get(this.$router, 'photos/stream', query);
      photos.forEach((photo, index) => {
        const result = _.merge(photo, { index: skip + index });
        Vue.set(this.photos, skip + index, result);
      });
      if (photos.length == 0) {
        this.hasEnded = true;
      }

      // set currentIndex to the photo count of the last photo loaded
      this.currrentIndex = skip + photos.length;
    },
    // method to load more photos
    loadMore: async function () {
      await this.loadPosts(
        this.currrentIndex,
        this.filter.username,
        this.filter.locationName,
        this.filter.tags,
        this.filter.photoTags
      );
    },
    // method triggered when user select the last photo in VR component
    onLastPhoto: function () {
      this.currentIndex--;
    },
    // method triggered when user select the next photo in VR component
    onNextPhoto: function () {
      this.currentIndex++;
      // if the next photo is not loaded => load more photos
      if (this.currentIndex == this.totalCount - 1) {
        this.loadMore();
      }
    },
    // method triggered when user submit the filter form
    submitFilter: async function () {
      this.resetFeed();
      await this.loadPosts(
        this.currrentIndex,
        this.filter.username,
        this.filter.locationName,
        this.filter.tags,
        this.filter.photoTags
      );
    },
    // method to clear all existing filter
    clearFilter: async function () {
      this.filter.username = '';
      this.filter.locationName = '';
      this.filter.tags = '';
      this.filter.photoTags = '';
      this.resetFeed();
      await this.loadPosts(this.currrentIndex);
    },
    // method to reset the photo feed to initial state (nothing is loaded)
    resetFeed: function () {
      this.photos = {};
      this.hasEnded = false;
      this.currrentIndex = 0;
    },
    // triggered when any location tags on the images are clicked
    onLocationTagClicked: function (tag) {
      this.filter.tags = tag;
    },
    // triggered when any photo tags on the images are clicked
    onPhotoTagClicked: function (tag) {
      this.filter.photoTags = tag;
    }
  }
};
</script>