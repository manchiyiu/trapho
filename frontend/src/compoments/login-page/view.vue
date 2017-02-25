<name>login-page-view</name>

<template>
  <div>
    <login-page-logo></login-page-logo>
    <md-layout md-gutter>
      <login-page-toolbar></login-page-toolbar>
    </md-layout>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  beforeMount: function() {
    if (localStorage.token) { /* if the user has logged in */
      this.$router.push('feed');
    }
  }
};
</script>