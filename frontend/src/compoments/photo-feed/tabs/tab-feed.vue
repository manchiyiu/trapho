<name>photo-feed-tab-feed</name>

<template>
  <md-layout
    v-infinite-scroll="loadMore"
    md-align="center"
    md-gutter="64">
    <photo-feed-content-card-list v-if="active" :photos="photos"></photo-feed-content-card-list>
  </md-layout>
</template>

<script>
import Vue from 'vue';
import _ from 'lodash';

import { get } from '../../../utils.js';

export default {
  props: ['active'],
  data: () => ({
    currrentIndex: 0
  }),
  beforeMount: async function () {
    this.loadPosts(0);
  },
  computed: {
    photos: {
      get: function () {
        return this.$store.state.Photos;
      },
      set: function (photos) {
        return this.$store.state.commit('photosUpdate', { photos });
      }
    }
  },
  methods: {
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