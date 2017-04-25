<!-- this page compoent is for the timetable-planning page for trip planning -->
<name>activity-planning-trip-view</name>

<template>
  <md-layout md-gutter>
    <md-tabs md-centered class="main-tab md-transparent">
      <!-- this tab element allows user to change the basic info of the trip -->
      <md-tab id="basic-info" md-label="Basic Info">
        <activity-planning-trip-tab-basic-info :hasCommitted="hasCommitted" />
      </md-tab>
      <!-- this tab element allows user to do timetable planning -->
      <md-tab id="detail-plan" md-label="Detailed Plan">
        <activity-planning-trip-tab-detailed-plan :hasCommitted="hasCommitted" />
      </md-tab>
    </md-tabs>
  </md-layout>
</template>

<script>
import Vue from 'vue';

export default {
  computed: {
    hasCommitted: function() { // whether or not the user has commited the basic info
      return this.$store.state.ActivityPlanning.hasCommitted;
    }
  }
};
</script>