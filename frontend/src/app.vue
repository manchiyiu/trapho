<name>app</name>

<template>
    <div>
    <!-- header -->
    <md-toolbar class="md-transparent">
      
      <md-image md-src="http://i.imgur.com/DLvfDJ3.png" class="logo"></md-image>
      <h2 class="md-title" style="flex: 1"></h2>
        <md-button class="md-icon-button md-primary" @click.native="upload">
          <md-icon>add</md-icon>
        </md-button>

        <md-button class="md-icon-button" @click.native="toggleRightSidenav">
        <md-icon>menu</md-icon>
      </md-button>
    </md-toolbar>
    <!--Sidebar-->
    <md-sidenav class="md-right" ref="rightSidenav" @open="open('Right')" @close="close('Right')">
      <md-toolbar>
        <div class="md-toolbar-container">
          <h3 class="md-title">Menu</h3>
        </div>
      </md-toolbar>
      <md-list>
        <md-list-item><md-icon>flight_takeoff</md-icon><span>Plan My Trip</span></md-list-item>
        <md-list-item><md-icon>edit</md-icon><span>Edit My Profile</span></md-list-item>
        <md-list-item @click.native="logout"><md-icon>exit_to_app</md-icon><span>Logout</span></md-list-item>
      </md-list>
    </md-sidenav>

    <router-view></router-view>
  </div>

</template>

<style>
.logo {
  height: 48px
}
</style>

<script>
  import Vue from 'vue';
  export default {
    methods: {
      toggleRightSidenav() {
        this.$refs.rightSidenav.toggle();
      },
      open(ref) {
        console.log('Opened: ' + ref);
      },
      close(ref) {
        console.log('Closed: ' + ref);
      },
      logout: function () {
        delete localStorage.token; // remove the token
        this.$router.push('/');
      },
      upload: function () {
        this.$router.push('/upload');
      }
    }
  };
</script>