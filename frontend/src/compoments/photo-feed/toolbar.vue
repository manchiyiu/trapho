<name>photo-feed-toolbar</name>

<template>
  <div>
    <!-- tabs -->
    <md-tabs md-centered class="md-transparent">
      <md-tab id="photos" md-icon="photo" md-label="Photo">
        <photo-feed-tab-feed></photo-feed-tab-feed>
      </md-tab>
      <md-tab id="locations" md-icon="place" md-label="Locations">
        <photo-feed-tab-locations></photo-feed-tab-locations>
      </md-tab>
    </md-tabs>
  </div>
</template>

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