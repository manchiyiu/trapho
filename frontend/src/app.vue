<name>app</name>

<template>
  <div>
    <md-toolbar class="main-toolbar">
      <div class="logo">
        <img :src="logopath"></img>
      </div>
    </md-toolbar>
    <router-view></router-view>
  </div>
</template>

<style>
.main-toolbar {
  background-color: white !important;
}
.logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-top: 10px;
}
</style>

<script>
  import Vue from 'vue';
  import logopath from './static/logo.png';

  export default {
    data: () => ({
      logopath
    })
  };
</script>