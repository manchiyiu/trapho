<name>app</name>

<template>
  <div>
    <common-header></common-header>
    <router-view style="height: calc(100vh - 64px);"></router-view>
  </div>
</template>

<script>
import Vue from 'vue';
import { post } from './utils.js';

export default {
  mounted: async function() {
    if (localStorage.token) { /* if the user has logged in */
      const { id } = await post(this.$router, 'auth/me');
      this.$store.commit('userLogin', { id, token: localStorage.token });
    }
  }
};
</script>