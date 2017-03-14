<name>photo-feed-toolbar</name>

<template>
  <div>
    <!-- tabs -->
    <md-tabs md-centered class="main-tab md-transparent">
      <md-tab id="photos" md-label="Photo">
        <photo-feed-tab-feed></photo-feed-tab-feed>
      </md-tab>
      <md-tab id="locations" md-label="Locations">
        <photo-feed-tab-locations></photo-feed-tab-locations>
      </md-tab>
    </md-tabs>
  </div>
</template>

<style>
.md-tabs-navigation {
  background-color: white !important;
  border-bottom: 1px solid #eee !important;
}
.md-tab-header {
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