<name>edit-trip-view</name>

<template>
  <div class="edit-trip-container">
    <h1>Testing</h1>
    {{trip}}
  </div>
</template>

<style>
.edit-trip-container {
  background-color: #fafafa !important;
  height: 100vh;
  padding: 20px;
  padding-bottom: 200px;
  overflow-y: scroll;
}
</style>

<script>
import Vue from 'vue';

import { get } from '../../utils.js';

export default {
  props: ['tripId'],
  data: () => ({
    trip: null,
    name: ''
  }),
  watch: {
    $route: async function() {
      await this.load();
    }
  },
  mounted: async function() {
    await this.load();
  },
  methods: {
    load: async function() {
      this.trip = await get(this.$router, `trips/id/${this.tripId}`)
      this.name = this.trip.name;
    },
    deserializeTrip: function() {
    }
  }
};
</script>