<name>trip-view</name>

<template>
  <div>
    <md-card style="margin: 20px;">
      <md-card-content>
        {{trip}}
      </md-card-content>
    </md-card>
  </div>
</template>

<script>
import Vue from 'vue';

import { get } from '../../utils.js';

export default {
  props: ['tripId'],
  data: () => ({
    trip: null
  }),
  beforeMount: async function () {
    try {
      this.trip = await get(this.$router, `trips/id/${this.tripId}`);
    } catch (e) {
      console.error(e);
    }
  }
};
</script>