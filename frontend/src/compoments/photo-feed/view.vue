<!-- main component for the photo feed page -->
<name>photo-feed-view</name>

<template>
  <div>
    <!-- tab component -->
    <photo-feed-toolbar></photo-feed-toolbar>
    <!-- create new trip button -->
    <md-button class="md-fab plan-fab" @click.native="gotoPlan">
      <md-icon>edit</md-icon>
    </md-button>
  </div>
</template>

<style>
.plan-fab {
  position: fixed;
  bottom: 20px;
  right: 20px;
}
</style>

<script>
import Vue from 'vue';

export default {
  methods: {
    // method to redirect to new trip page when invoked
    gotoPlan: function() {
      this.$router.push('plan-select');
    }
  }
};
</script>