<name>photo-feed-tab-feed</name>

<template>
  <md-layout md-align="center" md-gutter="64">
    <photo-feed-content-card-list :photos="photos"></photo-feed-content-card-list>
  </md-layout>
</template>

<style>
.md-card .md-card-media img {
  width: 500px;
}
.md-card {
  margin-bottom: 15px;
}
</style>

<script>
import Vue from 'vue';
import _ from 'lodash';

import { get } from '../../../utils.js';

export default {
  data: () => ({
    photos: {}
  }),
  beforeMount: async function () {
    let { photos } = await get(this.$router, 'photos/stream');
    this.photos = _.keyBy(photos, 'id');
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
    }
  }
};
</script>