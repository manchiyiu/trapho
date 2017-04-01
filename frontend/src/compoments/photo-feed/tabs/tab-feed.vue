<name>photo-feed-tab-feed</name>

<template>
  <md-layout
    v-infinite-scroll="loadMore"
    md-align="center"
    md-gutter="64">
    <search-bar></search-bar>
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
    currrentIndex: 0
  }),
  beforeMount: async function () {
    this.loadPosts(0);
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
    }
  }
};
</script>