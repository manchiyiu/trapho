<name>photo-feed-tab-feed</name>

<template>
  <md-layout
    v-infinite-scroll="loadMore"
    md-align="center"
    md-gutter="64">
    <md-card>
      <md-card-header class="search-bar">
        <md-card-expand>
        <md-card-actions>
          <div class="md-title">Filter</div>
          <span style="flex: 1"></span>
          <md-button class="md-icon-button" md-expand-trigger>
            <md-icon>keyboard_arrow_down</md-icon>
          </md-button>
        </md-card-actions>

        <md-card-content>
          <form novalidate @submit.stop.prevent="submit">

            <md-input-container>
              <md-icon>person</md-icon>
              <label>Username</label>
              <md-input v-model="username"></md-input>
            </md-input-container>

            <md-input-container>
              <md-icon>location_on</md-icon>
              <label>Location</label>
              <md-input v-model="location"></md-input>
            </md-input-container>

            <md-input-container>
              <md-icon>date_range</md-icon>
              <label>Date</label>
              <md-input v-model="date"></md-input>
            </md-input-container>

            <md-card-actions>
              <md-button class="md-raised md-primary" :disabled="isFilled" @click.native="submit">Submit</md-button>
            </md-card-actions>
          </form>
        </md-card-content>
      </md-card-expand>
      </md-card-header>
    </md-card>
    <!--<search-bar></search-bar>-->
    <photo-feed-content-card-list :photos="photos"></photo-feed-content-card-list>
  </md-layout>
</template>

<script>
import Vue from 'vue';
import _ from 'lodash';

import { get } from '../../../utils.js';

export default {
  data: () => ({
    photos: {},
    currrentIndex: 0,
    username: '',
    location: '',
    date: ''
  }),
  beforeMount: async function () {
    this.loadPosts(0);
  },
  computed: {
    isFilled: function () { return this.username.length <= 0 && this.location.length <= 0 && this.date.length <= 0; }
  },
  methods: {
    openDialog(ref) {
      this.$refs[ref].open();
    },
    closeDialog(ref) {
      this.$refs[ref].close();
    },
    onOpen() {
      console.log('Opened');
    },
    onClose(type) {
      console.log('Closed', type);
    },
    async loadPosts(skip, count = 5) {
      let { photos } = await get(this.$router, 'photos/stream', { count, skip });
      photos.forEach((photo, index) => {
        const result = _.merge(photo, { index: skip + index });
        Vue.set(this.photos, skip + index, result);
      });
      this.currrentIndex = skip + count;
    },
    async loadMore() {
      await this.loadPosts(this.currrentIndex);
    },
    submit: async function () {
      window.alert("Submit!");
    }
  }
};
</script>