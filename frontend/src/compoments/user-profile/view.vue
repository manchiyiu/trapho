<!--
FUNCTION USER-PROFILE - Function for user edit their personal infomation
PROGRAMMER: Wong Man Yung / Yiu Man CHi
CALLING SEQUENCE: Will automatically direct to when user choose Edit during the photo feed
VERSION: 1
PURPOSE: User could edit the personal information inside the setting
DATA STRUCTURES:  change username - string
                  change password - string
ALGORITHM:  Allow user to change their username and password;
            Then check the validation for the input with information retrive from database;
            if username already exit, alert the user; else change successfully.
-->
<name>user-profile-view</name>

<template>
  <div style="padding: 10px">
  <md-layout md-gutter="64">
    <md-layout
      md-flex-xsmall="100"
      md-flex-small="100"
      md-flex-medium="40"
      md-flex-large="40"
      md-flex-xlarge="40"
      md-align="center">
        <div style="width: 100%; padding-left: 10px; padding-right: 10px;">
          <md-card md-with-hover style="margin-bottom: 20px">
            <md-card-content>
            <md-layout md-gutter>
              <md-layout md-flex="30"><md-icon class="md-size-4x">photo</md-icon></md-layout>
              <md-layout><h1>{{userId}}</h1></md-layout>
            </md-layout>


            </md-card-content>
          </md-card>
          <!--VR-->
        <md-card md-with-hover style="margin-bottom: 20px;">
          <md-card-header>
            <div style="font-weight: bolder;">VR Discovery</div>
            <div style="margin-top: 20px;">
              <i>Powered by WebVR technologies, explore the world through a Virtual Reality headset like HTC Vive, Oculus Rift, HTC Vive, Playstation VR or Google Cardboard/Daydream. Don't have access to a VR device? You can try to play with it on your own computer or mobile devices. Exapnd this card to try.</i>
            </div>
          </md-card-header>
          <md-card-expand>
            <md-card-actions>
              <md-button class="md-icon-button" md-expand-trigger @click.native="vrExpanded = !vrExpanded">
                <md-icon>keyboard_arrow_down</md-icon>
              </md-button>
            </md-card-actions>
            <md-card-content>
              <a-scene id="aframe-scene" embedded class="tab-vr-scene" v-if="vrExpanded">
                <a-sky :src="currentPhoto"></a-sky>
              </a-scene>
              <div style="display: flex; justify-content: center;">
                <md-button @click.native="onLastPhoto" :disabled="currentIndex <= 0">
                  <md-icon>keyboard_arrow_left</md-icon>
                </md-button>
                <md-button @click.native="onNextPhoto" :disabled="currentIndex == totalCount">
                  <md-icon>keyboard_arrow_right</md-icon>
                </md-button>
              </div>
            </md-card-content>
          </md-card-expand>
        </md-card>
        </div>
    </md-layout>
    <md-layout
      md-flex-xsmall="100"
      md-flex-small="100"
      md-flex-medium="60"
      md-flex-large="60"
      md-flex-xlarge="60"
      md-align="center"
      v-infinite-scroll="loadMore">
      <common-content-card-list
        style="padding-left: 10px; padding-right: 10px;"
        :hasEnded="hasEnded"
        :photos="photos">
      </common-content-card-list>
    </md-layout>
  </md-layout>
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
  height: 50vh;
  width: 100%;
}
a-scene {
  display: block; width: 50%;
}
</style>

<script>
import Vue from 'vue';
import _ from 'lodash';

import { get, getPhotoUrl } from '../../utils.js';

export default {
  props: ['active', 'userId'],
  beforeMount: async function () {
    this.loadPosts(0);
  },
  data: () => ({
    currentIndex: 0,
    vrExpanded: false,
    photos: {},
    hasEnded: false // whether or not the feed loading has reached the end
  }),
  watch: {
    active: function () {
      if (this.active) {
        // reload
        this.resetFeed();
        this.loadMore();
      } else {
        // clear all photos
        this.resetFeed();
      }
    }
  },
  computed: {
    totalCount: function () {
      return Object.keys(this.photos).length - 1;
    },
    currentPhoto: function () {
      return getPhotoUrl(_.get(this.photos, `${this.currentIndex}.url`, ''));
    }
  },
  methods: {
    loadPosts: async function (skip, username = this.userId, count = 5) {
      let { photos } = await get(this.$router, 'photos/stream', { count, skip, username });
      photos.forEach((photo, index) => {
        const result = _.merge(photo, { index: skip + index });
        Vue.set(this.photos, skip + index, result);
      });
      this.currrentIndex = skip + count;
      if (photos.length == 0) {
        this.hasEnded = true;
      }
    },
    loadMore: async function () {
      await this.loadPosts(this.currrentIndex);
    },
    onLastPhoto: function () {
      this.currentIndex--;
    },
    onNextPhoto: function () {
      this.currentIndex++;
      if (this.currentIndex == this.totalCount - 1) {
        this.loadMore();
      }
    },
    resetFeed: function () {
      this.photos = {};
      this.hasEnded = false;
      this.currrentIndex = 0;
    }
  }
};
</script>