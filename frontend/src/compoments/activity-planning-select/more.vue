<name>activity-planning-more</name>

<template>
  <div>
    <form novalidate @submit.stop.prevent="search">
      <md-input-container class="input-container">
        <label>Location Name</label>
        <md-input v-model="locationName"></md-input>
      </md-input-container>
      <md-chips class="input-container" v-model="tags" md-input-placeholder="Location tags">
        <template scope="chip">{{chip.value}}</template>
      </md-chips>
      <md-button type="submit" class="md-raised md-primary" :disabled="!isFilled" @click.native="search">Search</md-button>
      <md-divider style="margin-top: 10px;margin-bottom: 10px;"></md-divider>
    </form>
    <b
      class="input-container"
      style="margin-top: 50px;"
      v-if="targetLocations && targetLocations.length <= 0">
      No matching location.
    </b>
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
  props: ['toggleSelected'],
  data: () => ({
    targetLocations: null,
    locationName: '',
    tags: []
  }),
  computed: {
    isFilled: function () {
      return this.locationName.length > 0 || this.tags.length > 0;
    }
  },
  methods: {
    search: async function () {
      let query = {};
      if (this.locationName.trim().length > 0) {
        query.name = this.locationName.trim();
      }
      if (this.tags.length > 0) {
        query.tags = this.tags;
      }
      let { locations } = await post(this.$router, 'locations/query', { query });
      this.targetLocations = locations;
    }
  }
};
</script>