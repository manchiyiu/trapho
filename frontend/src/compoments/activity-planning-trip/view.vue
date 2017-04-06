<name>activity-planning-trip-view</name>

<template>
  <md-layout md-gutter>
    <md-tabs md-centered class="main-tab md-transparent">
      <md-tab id="basic-info" md-label="Step 1">
        <activity-planning-trip-tab-basic-info :hasCommitted="hasCommitted" />
      </md-tab>
      <md-tab id="detail-plan" md-label="Step 2">
        <activity-planning-trip-tab-detailed-plan :hasCommitted="hasCommitted" />
      </md-tab>
    </md-tabs>
  </md-layout>
</template>

<script>
import Vue from 'vue';

export default {
  computed: {
    hasCommitted: function() {
      return this.$store.state.ActivityPlanning.hasCommitted;
    }
  }
};
</script>