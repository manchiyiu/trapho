<name>photo-feed-toolbar</name>

<template>
  <div>
    <md-tabs md-centered class="main-tab md-transparent" @change="onChange">
      <md-tab id="photos" md-label="Photo">
        <photo-feed-tab-feed :active="this.currentTab === 0"></photo-feed-tab-feed>
      </md-tab>
      <md-tab id="locations" md-label="Locations">
        <photo-feed-tab-locations :active="this.currentTab === 1"></photo-feed-tab-locations>
      </md-tab>
      <md-tab id="upload" md-label="Upload">
        <photo-feed-tab-upload :active="this.currentTab === 2"></photo-feed-tab-upload>
      </md-tab>
      <md-tab id="vr" md-label="VR">
        <photo-feed-tab-vr :active="this.currentTab === 3"></photo-feed-tab-vr>
      </md-tab>
    </md-tabs>
  </div>
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
      },
      onChange: function (index) {
        this.currentTab = index;
      }
    },
    data: () => ({
      currentTab: 0
    })
  };
</script>