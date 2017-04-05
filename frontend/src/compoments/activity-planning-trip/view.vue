<name>activity-planning-trip-view</name>

<template>
  <md-layout md-gutter>
    <md-tabs md-centered class="main-tab md-transparent">
      <md-tab id="basic-info" md-label="Basic Information">
        <activity-planning-trip-tab-basic-info />
      </md-tab>
    </md-tabs>
  </md-layout>
</template>

<style>
.activity-planning-trip-sidecard {
  background-color: rgba(255, 255, 255, 1);
  padding: 20px;
  width: 100%;
}
</style>

<script>
import Vue from 'vue';

export default {};
</script>