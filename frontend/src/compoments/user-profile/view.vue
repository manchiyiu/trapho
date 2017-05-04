<!-- component for showing user profile page -->
<name>user-profile-view</name>

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
            <!-- user avatar (not implemented) -->
            <md-avatar>
              <img :src="`https://api.adorable.io/avatars/285/${userId}@adorable.png`"></img>
            </md-avatar>
            <div class="md-title">{{username}} <router-link :to="`/edit`" v-if="currentUserId == userId">(edit)</router-link></div>
            <div class="md-subhead">{{userEmail}}</div>
          </md-card-header>
        </md-card>
        <md-card md-with-hover style="margin-bottom: 20px">
          <!-- list of user created trips -->
          <md-card-header>
            <div class="md-title">Created trips</div>
          </md-card-header>
          <md-card-content>
            <!-- show spinner if no trips has been created -->
            <div v-if="!trips" style="margin-left: 30px;">
              <md-spinner md-indeterminate></md-spinner>
            </div>
            <!-- trip list -->
            <ul v-if="trips && trips.length > 0">
              <li v-for="trip in trips">
                <router-link :to="`/trip/${trip.id}`">{{trip.name}}</router-link>
              </li>
            </ul>
            <!-- placeholder if no trip has been created -->
            <p style="margin-left: 30px;" v-if="trips && trips.length <= 0">No created trip for this user. SAD.</p>
          </md-card-content>
        </md-card>
      </div>
    </md-layout>
    <!-- list of photos uplaoded by that user -->
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

import { get, getPhotoUrl } from '../../utils.js';

export default {
  props: ['userId'], // retrieve the userId from the parent component
  data: () => ({
    currentIndex: 0, // index of the last loaded photo
    username: '', // user name of the user with id = userId
    userEmail: '', // user email of the user with id = userId
    photos: {}, // list of photos uploaded by the
    trips: null, // trip information
    hasEnded: false // whether or not the feed loading has reached the end
  }),
  // before component is loaded, load user data + photos
  beforeMount: async function () {
    await this.load();
  },
  computed: {
    // id of the current user
    currentUserId: function () {
      return this.$store.state.User.info.id;
    }
  },
  watch: {
    // on route change, reload everything
    $route: function() {
      this.load();
    }
  },
  methods: {
    // method to load user info + photos
    load: async function () {
      this.photos = {};
      await this.loadPosts(0);
      // retrieve user information from backend
      try {
        this.username = (await get(this.$router, `auth/id/${this.userId}`)).username;
        this.trips = (await get(this.$router, `trips/users/${this.userId}`)).trips;
        this.userEmail = (await get(this.$router, `auth/id/${this.userId}`)).email;
      } catch (e) {
        console.error(e);
      }
    },
    // method to retrieve posts from the server
    loadPosts: async function (skip = 0, userId = this.userId, count = 5) {
      try {
        let { photos } = await get(this.$router, 'photos/stream', { count, skip, userId: this.userId });
        photos.forEach((photo, index) => {
          const result = _.merge(photo, { index: skip + index });
          Vue.set(this.photos, skip + index, result);
        });
        this.currrentIndex = skip + photos.length; // remember the index of the photo last loaded
        if (photos.length < count) {
          this.hasEnded = true;
        }
      } catch (e) {
        console.error(e);
      }
    },
    // method to load more post
    loadMore: async function () {
      await this.loadPosts(this.currrentIndex);
    }
  }
};
</script>