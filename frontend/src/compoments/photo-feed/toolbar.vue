<name>photo-feed-toolbar</name>

<template>
  <div>
    <!-- header -->
    <md-toolbar class="md-transparent">
      <div class="md-toolbar-container">
        <h2 class="md-title" style="flex: 1;">Trapho</h2>
        <md-button class="md-icon-button" @click.native="logout">
          <md-tooltip md-direction="bottom">Logout</md-tooltip>
          <md-icon>exit_to_app</md-icon>
        </md-button>
      </div>
    </md-toolbar>
    <!-- tabs -->
    <md-tabs class="md-transparent">
      <md-tab id="photos" md-icon="photo">
        <photo-feed-tab-feed></photo-feed-tab-feed>
      </md-tab>
      <md-tab id="locations" md-icon="place">
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