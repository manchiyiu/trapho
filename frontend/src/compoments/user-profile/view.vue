<!--
FUNCTION USER-PROFILE - Function for user edit their personal infomation
PROGRAMMER: Wong Man Yung / Yiu Man CHi
CALLING SEQUENCE: Will automatically direct to when user choose Edit during the photo feed
VERSION: 1
PURPOSE: User could edit the personal information inside the setting
DATA STRUCTURES:  change username - string
                  change password - string
ALGORITHM:  Allow user to change their username and password;
            Then check the validation for the input with information retrive from database;
            if username already exit, alert the user; else change successfully.
-->
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
            <md-avatar>
              <img :src="`https://api.adorable.io/avatars/285/${userId}@adorable.png`"></img>
            </md-avatar>
            <div class="md-title">{{username}}</div>
            <div class="md-subhead">{{userEmail}}</div>
          </md-card-header>
        </md-card>
        <md-card md-with-hover style="margin-bottom: 20px">
          <md-card-header>
            <div class="md-title">Created trips</div>
          </md-card-header>
          <md-card-content>
            <div v-if="!trips" style="margin-left: 30px;">
              <md-spinner md-indeterminate></md-spinner>
            </div>
            <ul v-if="trips && trips.length > 0">
              <li v-for="trip in trips">
                <router-link :to="`/trip/${trip.id}`">{{trip.name}}</router-link>
              </li>
            </ul>
            <p style="margin-left: 30px;" v-if="trips && trips.length <= 0">No created trip for this user. SAD.</p>
          </md-card-content>
        </md-card>
      </div>
    </md-layout>
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
  props: ['userId'],
  data: () => ({
    currentIndex: 0,
    username: '',
    userEmail: '',
    photos: {},
    trips: null,
    hasEnded: false // whether or not the feed loading has reached the end
  }),
  beforeMount: async function () {
    await this.load();
  },
  watch: {
    $route: function() {
      this.load();
    }
  },
  methods: {
    load: async function () {
      this.photos = {};
      await this.loadPosts(0);
      try {
        this.username = (await get(this.$router, `auth/id/${this.userId}`)).username;
        this.trips = (await get(this.$router, `trips/users/${this.userId}`)).trips;
        this.userEmail = (await get(this.$router, `auth/id/${this.userId}`)).email;
      } catch (e) {
        console.error(e);
      }
    },
    loadPosts: async function (skip = 0, userId = this.userId, count = 5) {
      try {
        let { photos } = await get(this.$router, 'photos/stream', { count, skip, userId: this.userId });
        photos.forEach((photo, index) => {
          const result = _.merge(photo, { index: skip + index });
          Vue.set(this.photos, skip + index, result);
        });
        this.currrentIndex = skip + photos.length;
        if (photos.length < count) {
          this.hasEnded = true;
        }
      } catch (e) {
        console.error(e);
      }
    },
    loadMore: async function () {
      await this.loadPosts(this.currrentIndex);
    }
  }
};
</script>