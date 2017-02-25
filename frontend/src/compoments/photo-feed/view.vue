<name>photo-feed-view</name>

<template>
  <div>
    <photo-feed-toolbar></photo-feed-toolbar>
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