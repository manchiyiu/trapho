<!-- main component for login view -->
<name>login-page-view</name>

<template>
  <div>
    <md-layout md-gutter>
      <!-- show the login page tab -->
      <login-page-toolbar></login-page-toolbar>
    </md-layout>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  // invoked before the component is rendered
  beforeMount: function() {
    // if user has already logined
    if (localStorage.token) {
      this.$router.push('feed'); // redirect user to the login page
    }
  }
};
</script>