<name>photo-feed-view</name>

<template>
  <div>
    <div class="container">
      <photo-feed-toolbar></photo-feed-toolbar>
    </div>
  </div>
</template>

<style lang="scss">
.container {
  min-height: 100%;
  display: flex;
  flex-flow: column nowrap;
  flex: 1;
}
</style>

<script>
import Vue from 'vue';
import { get } from '../../utils.js';

export default {
  beforeMount: async function() {
    // let result = await get(this.$router, 'test');
  }
};

</script>