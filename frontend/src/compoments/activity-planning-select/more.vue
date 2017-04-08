<name>activity-planning-more</name>

<template>
  <div>
    <form novalidate @submit.stop.prevent="search">
      <md-input-container class="input-container">
        <md-icon>search</md-icon>
        <label>Location Name</label>
        <md-input v-model="locationName"></md-input>
      </md-input-container>
      <md-input-container class="input-container">
        <md-icon>search</md-icon>
        <label>Tags</label>
        <md-input v-model="tags"></md-input>
      </md-input-container>
      <md-button type="submit" class="md-raised md-primary" :disabled="!isFilled" @click.native="search">Search</md-button>
      <md-divider style="margin-top: 10px;margin-bottom: 10px;"></md-divider>
    </form>
    <activity-planning-wishlist
      :toggleSelected="toggleSelected"
      :locations="targetLocations" />
  </div>
</template>

<script>
import Vue from 'vue';

import { post } from '../../utils.js';

export default {
  props: ['toggleSelected'],
  data: () => ({
    targetLocations: [],
    locationName: '',
    tags: ''
  }),
  computed: {
    isFilled: function () {
      return this.locationName.length > 0 || this.tags.length > 0;
    }
  },
  methods: {
    search: async function () {
      let { locations } = await post(this.$router, 'locations/query', {
        query: { name: this.locationName, tags: [this.tags] } 
      });
      this.targetLocations = locations;
    }
  }
};
</script>