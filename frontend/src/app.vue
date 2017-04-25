<!-- main component of the frontend -->
<name>app</name>

<template>
  <div>
    <div :style="styles.main"></div>
    <common-header></common-header><!-- the logo and menu will be visible in all pages -->
    <router-view style="height: calc(100vh - 64px);"></router-view><!-- this will be replaced with the page content by vue-router -->
  </div>
</template>

<script>
import Vue from 'vue';
import { post } from './utils.js';

import background from './static/bg.jpg'; // the website background

export default {
  // when the website is first loaded, check if the user has logined in before, if yes, directly redirect to photo feed page
  mounted: async function() {
    if (localStorage.token) { // if the user has logged in
      const { id, username } = await post(this.$router, 'auth/me'); // retrive user's name and id with the token through the backend
      this.$store.commit('userLogin', {
        id,
        username,
        token: localStorage.token
      });
    }
  },
  data: () => ({
    styles: {
      main: { // the style for the background div
        backgroundImage: `url(${background})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        position: 'fixed',
        width: '100vw',
        opacity: 0.6,
        height: '100vh',
        zIndex: -100
      }
    }
  })
};
</script>