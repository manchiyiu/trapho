<name>main-header</name>

<template>
  <div>
    <md-whiteframe md-elevation="2">
      <md-toolbar class="main-toolbar">
        <md-button class="md-icon-button" v-if="userHasLogin" @click.native="toggleSidenav">
          <md-icon class="menu-icon">menu</md-icon>
        </md-button>
        <div class="logo">
          <img :src="logopath" class="logo-img"></img>
        </div>
      </md-toolbar>
    </md-whiteframe>
    <md-sidenav v-if="userHasLogin" class="md-left" ref="sidenav">
      <md-toolbar class="md-large">
        <div class="md-toolbar-container">
        </div>
      </md-toolbar>
      <md-list>
        <md-list-item @click.native="goToPhotoFeed">
          <md-icon>photo_library</md-icon>
          <span>Photo Feed</span>
        </md-list-item>
        <md-list-item @click.native="goToPlan">
          <md-icon>flight_takeoff</md-icon>
          <span>Plan My Trip</span>
        </md-list-item>
        <md-list-item @click.native="goToEdit">
          <md-icon>edit</md-icon>
          <span>Edit My Profile</span>
        </md-list-item>
        <md-list-item @click.native="logout">
          <md-icon>exit_to_app</md-icon>
          <span>Logout</span>
        </md-list-item>
      </md-list>
    </md-sidenav>
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
  import { mapGetters } from 'vuex';

  import logopath from '../../static/logo.png';

  export default {
    data: () => ({
      logopath
    }),
    computed: {
      ...mapGetters([
        'userHasLogin'
      ])
    },
    methods: {
      toggleSidenav: function() {
        this.$refs.sidenav.toggle();
      },
      // menu item functions
      goToPhotoFeed: function () {
        this.$router.push('/feed');
        this.$refs.sidenav.close();
      },
      goToPlan: function () {
        this.$router.push('/plan-select');
        this.$refs.sidenav.close();
      },
      goToEdit: function () {
        this.$router.push('/edit');
        this.$refs.sidenav.close();
      },
      logout: function () {
        delete localStorage.token; // remove the token
        this.$store.commit('userLogout');
        this.$router.push('/');
        this.$refs.sidenav.close();
      },
    }
  };
</script>