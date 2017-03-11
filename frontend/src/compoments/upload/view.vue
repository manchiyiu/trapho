<name>upload-view</name>

<template>
  <md-layout md-gutter>
    <!--Left Sidebar-->
    <md-layout md-flex="20" md-align="center">
      <!--Card 1-->
      <md-card class="md-with-hover sidebarPhoto">
        <md-card-media @click.native="selectImage">
          <img :src="src" alt="Photo 1">
        </md-card-media>
        <md-card-header>
          <div class="md-title">Photo 1</div>
        </md-card-header>
      </md-card>      
      <!--Card 2-->
      <md-card class="md-with-hover sidebarPhoto">
        <md-card-media @click.native="loadImage">
          <img :src="src" alt="Photo 2">
        </md-card-media>
        <md-card-header>
          <div class="md-title">Photo 2</div>
        </md-card-header>
      </md-card>
    </md-layout>

    <md-layout md-column md-gutter>
      <md-layout md-flex="20">
        <md-input-container>
          <label>Upload your photos here!</label>
          <md-file v-model="multiple" multiple></md-file>
        </md-input-container>
        <md-button class="md-fab">
          <md-icon>done</md-icon>
        </md-button>
      </md-layout>

      <md-layout>
        <md-layout md-gutter>
          <md-layout>
            <!--Selected Photo-->
            <md-image :md-src="selected"></md-image>
          </md-layout>
          <md-layout>
            <!-- Input Form-->
            <form novalidate @submit.stop.prevent="submit">
              <md-input-container>
                <label>Location</label>
                <md-input></md-input>
              </md-input-container>

              <md-input-container>
                <label>Description</label>
                <md-textarea></md-textarea>
              </md-input-container>
            </form>
          </md-layout>
        </md-layout>
        </md-layout>  
    </md-layout>
  </md-layout>
</template>

<style>
  .sidebarPhoto {
    width: 80%
  }
</style>

<script>
import Vue from 'vue';

export default {
  data: () => ({
    src: 'https://avatars1.githubusercontent.com/u/2025246?v=3&s=460',
    selected: null
  }),
  methods: {
    loadImage() {
      let options = [
        'https://avatars1.githubusercontent.com/u/2025246?v=3&s=460',
        'https://avatars2.githubusercontent.com/u/22546757?v=3&s=460'
      ];

      this.selected = options[Math.floor(Math.random() * 2)];
    },
    selectImage() {
      this.selected = this.src
    }
  },
  beforeMount: function() {
    // if (localStorage.token) { /* if the user has logged in */
    //   this.$router.push('feed');
    // }
  }
};
</script>