<name>app</name>

<template>
  <div>
    <common-header></common-header>
    <router-view></router-view>
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