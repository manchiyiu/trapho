<name>photo-feed-view</name>

<template>
  <div>
    <md-layout md-gutter>
      <md-layout md-column md-flex="15">
        <side-menu></side-menu>
      </md-layout>
      <md-layout md-column md-flex>
        <photo-feed-toolbar></photo-feed-toolbar>
      </md-layout>
    </md-layout>
  </div>
</template>

<script>
import Vue from 'vue';
import { get } from '../../utils.js';

export default {
  beforeMount: async function() {
    // let result = await get(this.$router, 'test');
  }
};

</script>