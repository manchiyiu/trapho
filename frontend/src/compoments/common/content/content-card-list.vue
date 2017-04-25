<!-- this component is for displaying a list of photo in the photo feed -->
<name>common-content-card-list</name>

<template>
  <md-layout md-gutter class="content-card-main">
    <md-layout md-column>
      <common-content-empty v-if="hasEnded && !hasContent" />
      <!-- the list of photos -->
      <div v-for="photo in photos" class="content-card-list">
        <common-content-card
          @onLocationTagClicked="onLocationTagClicked"
          @onPhotoTagClicked="onPhotoTagClicked"
          :photoId="photo.id"
          :username="photo.username"
          :userId="photo.userId"
          :timestamp="photo.timestamp"
          :locationId="photo.locationId"
          :locationName="photo.locationName"
          :likesCount="photo.likesCount"
          :photoUrl="photo.url"
          :photoTags="photo.photoTags"
          :description="photo.description"
          :comments="photo.comments">
        </common-content-card>
      </div>
      <md-layout md-align="center">
        <!-- a spinner to be shown if the data has not yet been loaded -->
        <md-spinner v-if="!hasEnded" style="margin-top: 10px;" md-indeterminate class="md-accent"></md-spinner>
      </md-layout>
    </md-layout>
  </md-layout>
</template>

<style scoped>
.content-card-list {
  width: 100%;
  display: flex;
  justify-content: center;
}
.content-card-main {
  margin-bottom: 300px;
  width: 100%;
}
</style>

<script>
import Vue from 'vue';
import * as _ from 'lodash';

export default {
  props: ['photos', 'hasEnded'], // photos: list of photos in the list, hasEnded: whether or not all photos has been loaded
  computed: {
    hasContent: function () { // whether or not there are any photo items in the list
      return Object.keys(this.photos).length > 0;
    }
  },
  methods: {
    onLocationTagClicked: function (tag) { // on location tag clicked, emit a onLocationTagClicked event for parent component to catch
      this.$emit('onLocationTagClicked', tag);
    },
    onPhotoTagClicked: function (tag) { // on photo tag clicked, emit a onPhotoTagClicked event for parent component to catch
      this.$emit('onPhotoTagClicked', tag);
    }
  }
};
</script>