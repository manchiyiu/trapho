<name>main-header</name>

<template>
  <div>
    <div>
      <md-toolbar class="main-toolbar">
        <md-button class="md-icon-button" @click.native="toggleSidenav">
          <md-icon class="menu-icon">menu</md-icon>
        </md-button>
        <div class="logo">
          <img :src="logopath" class="logo-img"></img>
        </div>
        <md-layout md-align="end">
          <md-button id="fab-file-upload" class="md-fab md-mini" @click.native="toggleUpload">
            <md-icon>file_upload</md-icon>
          </md-button>
        </md-layout>
      </md-toolbar>
    </div>
    <md-sidenav class="md-left" ref="sidenav">
      <md-toolbar class="md-large">
        <div class="md-toolbar-container">
        </div>
      </md-toolbar>
      <md-list>
        <md-list-item><md-icon>flight_takeoff</md-icon><span>Plan My Trip</span></md-list-item>
        <md-list-item><md-icon>edit</md-icon><span>Edit My Profile</span></md-list-item>
        <md-list-item @click.native="logout"><md-icon>exit_to_app</md-icon><span>Logout</span></md-list-item>
      </md-list>
    </md-sidenav>
    <common-modal-upload :active="uploadActive" :toggleUpload="toggleUpload"></common-modal-upload>
  </div>
</template>

<style>
.main-toolbar {
  background-color: white !important;
}
.logo-img {
  margin: 0px 10px 0px 5px;
}
.menu-icon {
  color: black;
}
</style>

<script>
  import Vue from 'vue';
  import * as _ from 'lodash';
  import logopath from '../../static/logo.png';

  export default {
    data: () => ({
      logopath,
      uploadActive: false
    }),
    methods: {
      toggleSidenav: function() {
        this.$refs.sidenav.toggle();
      },
      toggleUpload: function(value) {
        this.uploadActive = _.isBoolean(value) ? value : true;
      },
      logout: function() {
        delete localStorage.token; // remove the token
        this.$router.push('/');
        this.$refs.sidenav.close();
      },
    }
  };
</script>