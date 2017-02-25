<name>photo-feed-view</name>

<template>
  <div>
    <h1>Testing</h1>
    <md-button @click.native="logout">Logout</md-button>
  </div>
</template>

<script>
import Vue from 'vue';
import { get } from '../../utils.js';

export default {
  beforeMount: async function() {
    let result = await get(this.$router, 'test');
  },
  methods: {
    logout: function() {
      delete localStorage.token; // remove the token
      this.$router.push('/');
    }
  }
};

</script>