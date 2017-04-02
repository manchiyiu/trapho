<name>app</name>

<template>
  <div>
    <div :style="styles.main"></div>
    <common-header></common-header>
    <router-view style="height: calc(100vh - 64px);"></router-view>
  </div>
</template>

<script>
import Vue from 'vue';
import { post } from './utils.js';

import background from './static/bg.jpg';

export default {
  mounted: async function() {
    if (localStorage.token) { /* if the user has logged in */
      const { id } = await post(this.$router, 'auth/me');
      this.$store.commit('userLogin', { id, token: localStorage.token });
    }
  },
  data: () => ({
    styles: {
      main: {
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        position: 'fixed',
        width: '100vw',
        opacity: 0.6,
        height: '100vh',
        zIndex: -1
      }
    }
  })
};
</script>