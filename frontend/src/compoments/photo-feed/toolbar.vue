<name>photo-feed-toolbar</name>

<template>
  <div>
    <md-tabs md-centered class="main-tab md-transparent" @change="onChange">
      <md-tab id="photos" md-label="Photo">
        <photo-feed-tab-feed :active="this.currentTab === 0"></photo-feed-tab-feed>
      </md-tab>
      <!--<md-tab id="locations" md-label="Locations">
        <photo-feed-tab-locations :active="this.currentTab === 1"></photo-feed-tab-locations>
      </md-tab>-->
      <md-tab id="upload" md-icon="add">
        <photo-feed-tab-upload :active="this.currentTab === 1"></photo-feed-tab-upload>
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