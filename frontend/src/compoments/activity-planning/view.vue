<name>activity-planning-view</name>

<template>
  <md-layout md-gutter>
    <md-layout md-flex="30" md-flex-medium="100" md-flex-small="100">
      <md-card class="activity-planning-view-card">
        <md-subheader>Wishlist</md-subheader>
        <activity-planning-wishlist></activity-planning-wishlist>
      </md-card>
    </md-layout>
  </md-layout>
</template>

<style>
.activity-planning-view-card {
  width: 100%;
}
</style>

<script>
import Vue from 'vue';

export default {

};
</script>