<name>photo-feed-tab-locations</name>

<template>
  <div class="tab-locations-container">
    <div class="tab-locations-main">
      <common-map :onChange="onMapChange" :active="active"></common-map>
    </div>
  </div>
</template>

<style>
.tab-locations-container {
  display: flex;
  justify-content: center;
}
.tab-locations-main {
  width: 100vw;
  margin: -15px;
}
</style>

<script>
import Vue from 'vue';

export default {
  props: ['active'],
  data: () => ({
    selectedLocation: null
  }),
  methods: {
    onMapChange: function(location) {
      this.selectedLocation = location;
    }
  }
};
</script>