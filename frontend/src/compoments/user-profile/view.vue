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
            <div class="md-subhead">User Profile</div>
          </md-card-header>
          <md-card-content>
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
    photos: {},
    hasEnded: false // whether or not the feed loading has reached the end
  }),
  beforeMount: async function () {
    await this.loadPosts(0);
    this.username = (await get(this.$router, `auth/id/${this.userId}`)).username;
  },
  methods: {
    loadPosts: async function (skip = 0, userId = this.userId, count = 5) {
      let { photos } = await get(this.$router, 'photos/stream', { count, skip, userId });
      photos.forEach((photo, index) => {
        const result = _.merge(photo, { index: skip + index });
        Vue.set(this.photos, skip + index, result);
      });
      this.currrentIndex = skip + photos.length;
      if (photos.length == 0) {
        this.hasEnded = true;
      }
    },
    loadMore: async function () {
      await this.loadPosts(this.currrentIndex);
    }
  }
};
</script>