<name>main-header</name>

<template>
  <md-toolbar class="main-toolbar">
    <md-button class="md-icon-button">
      <md-icon class="menu-icon">menu</md-icon>
    </md-button>
    <div class="logo">
      <img :src="logopath" class="logo-img"></img>
    </div>
    </md-layout>
  </md-toolbar>
</template>

<style>
.main-toolbar {
  background-color: white !important;
  z-index: 99 !important;
}
.logo-img {
  margin: 20px 20px 20px 0px;
}
.menu-icon {
  color: black;
}
</style>

<script>
  import Vue from 'vue';
  import logopath from '../../static/logo.png';

  export default {
    data: () => ({
      logopath
    })
  };
</script>