<!-- component for the tab view of the photo feed page -->
<name>photo-feed-toolbar</name>

<template>
  <div>
    <md-tabs md-centered class="main-tab md-transparent" @change="onChange">
      <!-- photo feed tab -->
      <md-tab id="photos" md-label="Photo">
        <photo-feed-tab-feed :active="this.currentTab === 0"></photo-feed-tab-feed>
      </md-tab>
      <!-- upload tab -->
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
      // method to logout
      logout: function () {
        delete localStorage.token; // remove the token
        this.$router.push('/');
      },
      // method triggered when the selected tab changed
      onChange: function (index) {
        this.currentTab = index; // remember the selected tab
      }
    },
    data: () => ({
      currentTab: 0
    })
  };
</script>