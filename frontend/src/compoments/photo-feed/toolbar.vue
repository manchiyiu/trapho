<name>photo-feed-toolbar</name>

<template>
  <md-tabs md-centered class="main-tab md-transparent">
    <md-tab id="photos" md-label="Photo">
      <photo-feed-tab-feed></photo-feed-tab-feed>
    </md-tab>
    <md-tab id="locations" md-label="Locations">
      <photo-feed-tab-locations></photo-feed-tab-locations>
    </md-tab>
    <md-tab id="upload" md-label="Upload">
      <photo-feed-tab-upload></photo-feed-tab-upload>
    </md-tab>
  </md-tabs>
</template>

<style>
.md-tabs-navigation {
  background-color: white !important;
  border-bottom: 1px solid #eee !important;
  box-shadow: 0 3px 6px rgba(0,0,0,0.04), 0 3px 6px rgba(0,0,0,0.08);
}
</style>

<script>
  import Vue from 'vue';

  export default {
    methods: {
      logout: function () {
        delete localStorage.token; // remove the token
        this.$router.push('/');
      }
    }
  };
</script>