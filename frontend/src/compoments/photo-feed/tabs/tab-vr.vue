<name>tab-vr</name>

<template>
  <div class="tab-vr-main">
    <md-card>
      <a-scene id="aframe-scene" embedded class="tab-vr-scene">
        <a-sky :src="currentPhoto"></a-sky>
      </a-scene>
      <md-card-actions>
        <md-button @click.native="onLastPhoto" :disabled="currentIndex <= 0">
          <md-icon>keyboard_arrow_left</md-icon>
        </md-button>
        <md-button @click.native="onNextPhoto" :disabled="currentIndex == totalCount">
          <md-icon>keyboard_arrow_right</md-icon>
        </md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<style>
.tab-vr-main {
  display: flex;
  margin-left: -50px;
  margin-right: -50px;
  justify-content: center;
}
.tab-vr-scene {
  height: 60vh;
  width: 100%;
}
a-scene { display: block; width: 50%; }
</style>

<script>
import Vue from 'vue';

import { getPhotoUrl } from '../../../utils.js';

export default {
  props: ['active'],
  computed: {
    photos: function () {
      return this.$store.state.Photos;
    },
    totalCount: function () {
      return Object.keys(this.photos).length - 1;
    },
    currentPhoto: function () {
      return getPhotoUrl(_.get(this.photos, `${this.currentIndex}.url`, ''));
    }
  },
  methods: {
    onLastPhoto: function () {
      this.currentIndex--;
    },
    onNextPhoto: function () {
      this.currentIndex++;
    }
  },
  data: () => ({
    currentIndex: 0
  })
};
</script>