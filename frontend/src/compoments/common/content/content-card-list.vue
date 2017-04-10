<name>common-content-card-list</name>

<template>
  <md-layout md-gutter class="content-card-main">
    <md-layout md-column>
      <common-content-empty v-if="hasEnded && !hasContent" />
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
  props: ['photos', 'hasEnded'],
  computed: {
    hasContent: function () {
      return Object.keys(this.photos).length > 0;
    }
  },
  methods: {
    onLocationTagClicked: function (tag) {
      this.$emit('onLocationTagClicked', tag);
    },
    onPhotoTagClicked: function (tag) {
      this.$emit('onPhotoTagClicked', tag);
    }
  }
};
</script>