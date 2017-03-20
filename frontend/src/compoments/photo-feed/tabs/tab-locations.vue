<name>photo-feed-tab-locations</name>

<template>
  <div class="tab-locations-container">
    <div class="tab-locations-main">
      <md-card>
        <md-card-content style="padding: 0px;">
          <common-map :onChange="onMapChange"></common-map>
        </md-card-content>
      </md-card>
      {{selectedLocation}}
    </div>
  </div>
</template>

<style>
.tab-locations-container {
  display: flex;
  justify-content: center;
}
.tab-locations-main {
  max-width: 500px;
  width: 100%
}
</style>

<script>
import Vue from 'vue';

export default {
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