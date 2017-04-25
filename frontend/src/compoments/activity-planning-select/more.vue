<!-- a component within the location select page to allow user to select locations that are not on the list -->
<name>activity-planning-more</name>

<template>
  <div>
    <form novalidate @submit.stop.prevent="search">
      <!-- input for user to enter location name -->
      <md-input-container class="input-container">
        <label>Location Name</label>
        <md-input v-model="locationName"></md-input>
      </md-input-container>
      <!-- input for user to enter location tags -->
      <md-chips class="input-container" v-model="tags" md-input-placeholder="Location tags">
        <template scope="chip">{{chip.value}}</template>
      </md-chips>
      <!-- when clicked, it will trigger a search -->
      <md-button type="submit" class="md-raised md-primary" :disabled="!isFilled" @click.native="search">Search</md-button>
      <md-divider style="margin-top: 10px;margin-bottom: 10px;"></md-divider>
    </form>
    <!-- this will be displayed if no matching location are found -->
    <b
      class="input-container"
      style="margin-top: 50px;"
      v-if="targetLocations && targetLocations.length <= 0">
      No matching location.
    </b>
    <!-- the list of matching location will be displayed if any -->
    <activity-planning-wishlist
      v-if="targetLocations && targetLocations.length > 0"
      :toggleSelected="toggleSelected"
      :locations="targetLocations" />
  </div>
</template>

<script>
import Vue from 'vue';

import { post } from '../../utils.js';

export default {
  props: ['toggleSelected'], // to denote whether this component is currently visible on the screen
  data: () => ({
    targetLocations: null, // list of matching location (if any)
    locationName: '', // user input for location name filter
    tags: [] // user input for location tags filter
  }),
  computed: {
    isFilled: function () { // the submit button is enabled if and only if either location name is inputed or tags are inputed
      return this.locationName.length > 0 || this.tags.length > 0;
    }
  },
  methods: {
    search: async function () { // to start search by sending request to the backend
      let query = {};
      if (this.locationName.trim().length > 0) { // location name
        query.name = this.locationName.trim(); // remove all unwanted whitespace before/after the inputted name
      }
      if (this.tags.length > 0) {
        query.tags = this.tags; // location tags
      }
      let { locations } = await post(this.$router, 'locations/query', { query }); // call the backend
      this.targetLocations = locations; // store the result
    }
  }
};
</script>