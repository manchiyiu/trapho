<name>app</name>

<template>
  <div>
    <common-header></common-header>
    <router-view style="height: calc(100vh - 64px);"></router-view>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  mounted: function() {
    if (localStorage.token) { /* if the user has logged in */
      this.$store.commit('userLogin', { token: localStorage.token });
    }
  }
};
</script>