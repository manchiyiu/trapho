<name>photo-feed-view</name>

<template>
  <div>
    <photo-feed-toolbar></photo-feed-toolbar>
    <md-button class="md-fab plan-fab" @click.native="goToPlan">
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
    goToPlan: function() {
      this.$router.push('plan-select');
    }
  }
};
</script>