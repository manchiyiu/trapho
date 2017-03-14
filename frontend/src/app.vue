<name>app</name>

<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<style>
.logo {
  width: 120px;
  padding-left: 5px
}
</style>

<script>
  import Vue from 'vue';
  import logopath from './static/logo.png';

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
    },
    data: () => ({
      logopath
    })
  };
</script>