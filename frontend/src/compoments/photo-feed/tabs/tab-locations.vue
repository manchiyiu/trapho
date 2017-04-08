<!--
FUNCTION PHOTO_FEED_LOCATION - Function for user to browse by location
PROGRAMMER: Yiu Man CHi
CALLING SEQUENCE: Will automatically direct to when user choose location from the bar after login
VERSION: 1
PURPOSE: User could browse the photo by location
DATA STRUCTURES:  MAP - library link to the goole map
ALGORITHM:  Allow user to choose any place;
            Hence retrive the photo for the related locaton by using the tag;
-->

<name>photo-feed-tab-locations</name>

<template>
  <md-layout md-gutter>
    <md-layout
      md-flex-xsmall="100"
      md-flex-small="100"
      md-flex-medium="40"
      md-flex-large="40"
      md-flex-xlarge="40"
      md-align="center">
      <md-card md-with-hover>
        <md-card-header>
          <div style="font-weight: bolder;">Select location</div>
        </md-card-header>
        <common-map :onChange="onMapChange" :active="active"></common-map>
      </md-card>
    </md-layout>
    <md-layout
      md-flex-xsmall="100"
      md-flex-small="100"
      md-flex-medium="60"
      md-flex-large="60"
      md-flex-xlarge="60"
      md-align="center">
      <common-content-card-list
        style="padding-left: 10px; padding-right: 10px;"
        v-if="selectedLocation"
        :photos="photos">
      </common-content-card-list>
    </md-layout>
  </md-layout>
</template>

<style scoped>
.md-card {
  width: 100%;
  overflow: hidden;
  margin-bottom: 20px;
}
</style>

<script>
import Vue from 'vue';

export default {
  props: ['active'],
  data: () => ({
    selectedLocation: null,
    photos: {}
  }),
  methods: {
    onMapChange: function(location) {
      this.selectedLocation = location;
    }
  }
};
</script>