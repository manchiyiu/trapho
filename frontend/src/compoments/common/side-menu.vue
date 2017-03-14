<name>side-menu</name>

<template>
  <!--Sidebar-->
  <md-whiteframe md-elevation="2">
    <div class="md-left md-fixed sidebar" ref="sidebar">
      <img :src="logopath" class="logo"></img>
      <md-list>
        <md-list-item @click.native="logout">
          <md-icon>beenhere</md-icon>
          <span>My Wishlist</span>
        </md-list-item>
        <md-list-item @click.native="logout">
          <md-icon>flight_takeoff</md-icon>
          <span>Plan My Trip</span>
        </md-list-item>
        <md-list-item @click.native="logout">
          <md-icon>people</md-icon>
          <span>Edit My Profile</span>
        </md-list-item>
        <md-list-item @click.native="logout">
          <md-icon>settings</md-icon>
          <span>Settings</span>
        </md-list-item>
        <md-list-item @click.native="logout">
          <md-icon>exit_to_app</md-icon>
          <span>Logout</span>
        </md-list-item>
      </md-list>
    </div>
  </md-whiteframe>
</template>

<style>
.sidebar {
  height: 100vh;
  background-color: #fff;
  margin: 0;
}
.logo {
  margin: 20px 10px 10px 10px;
}
</style>

<script>
import Vue from 'vue';
import logopath from '../../static/logo.png';

export default {
  mounted: function() {
    this.$refs.sidebar.toggle();
  },
  data: () => ({
    logopath
  })
};
</script>