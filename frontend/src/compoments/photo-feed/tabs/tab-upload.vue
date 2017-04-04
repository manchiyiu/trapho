<!--
FUNCTION PHOTO_FEED_UPLOAD - Function for user to upload photo
PROGRAMMER: Yiu Man CHi
CALLING SEQUENCE: Will automatically direct to when user choose upload from the bar after login
VERSION: 1
PURPOSE: User could upload the photo
DATA STRUCTURES:  input - library link to the photo database
ALGORITHM:  Allow user to upload any photos;
            Hence store the photo, grading and comments for different locaton by using the tag;
-->
<name>photo-feed-tab-upload</name>

<template>
  <div class="tab-upload-contaier">
    <div class="tab-upload-main">
      <!-- select file -->
      <div>
        <div class="photo-upload-header">Select file</div>
        <div id="upload-dropzone" class="dropzone"></div>
      </div>
      <!-- info -->
      <div v-if="active && uploadedFiles.length > 0">
        <!-- description -->
        <md-divider></md-divider>
        <div class="photo-upload-header">Description (click image to add caption)</div>
        <waterfall
          :line-gap="300"
          :watch="uploadedFiles">
          <waterfall-slot
            v-for="(file, index) in uploadedFiles"
            class="upload-photo-preview"
            move-class="item-move"
            :width="file.width"
            :height="file.height + 100"
            :order="index"
            :key="index">
            <md-card md-with-hover class="upload-photo-preview" @click.native="openDescriptionModal(index)">
              <md-image :md-src="getPhotoUrl(file.url)"></md-image>
              <md-tooltip v-if="file.description" md-direction="top">
                {{file.description}}
              </md-tooltip>
            </md-card>
          </waterfall-slot>
        </waterfall>
        <!-- location -->
        <md-divider></md-divider>
        <div class="photo-upload-header">Location</div>
        <md-card>
          <md-card-content style="padding: 0px;">
            <common-map :onChange="onMapChange"></common-map>
          </md-card-content>
        </md-card>
      </div>
      <md-button class="md-raised md-primary submit-button" :disabled="!isCompleted" @click.native="submit">Submit</md-button>
      <!-- description dialog -->
      <md-dialog ref="dialog">
        <md-dialog-title>Add photo description</md-dialog-title>
        <md-dialog-content>
          <md-input-container>
            <label>Caption</label>
            <md-textarea v-model="dialogDescription"></md-textarea>
          </md-input-container>
        </md-dialog-content>
        <md-dialog-actions>
          <md-button class="md-primary" @click.native="closeDescriptionModal">Add</md-button>
        </md-dialog-actions>
      </md-dialog>
      <!-- snackbar -->
      <md-snackbar ref="snackbar" :md-duration="2000">
        <span>Upload successful.</span>
      </md-snackbar>
    </div>
  </div>
</template>

<style>
.tab-upload-contaier {
  display: flex;
  justify-content: center;
}
.submit-button {
  margin-top: 10px;
}
.tab-upload-main {
  max-width: 800px;
  width: 100%;
}
.photo-upload-header {
  margin-top: 20px;
  margin-bottom: 10px;
  font-weight: bolder;
  color: white;
}
.item-move {
  transition: all .5s cubic-bezier(.55,0,.1,1);
  -webkit-transition: all .5s cubic-bezier(.55,0,.1,1);
}
.upload-photo-preview {
  margin: 10px;
}
#upload-dropzone {
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #eee;
  margin-bottom: 20px;
}
.dz-default {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: lighter;
  font-size: 22px;
  color: #aaa;
}
</style>

<script>
import Vue from 'vue';
import Dropzone from 'dropzone';
import Waterfall from 'vue-waterfall/lib/waterfall';
import WaterfallSlot from 'vue-waterfall/lib/waterfall-slot';

import { UPLOAD_PATH, getPhotoUrl, post } from '../../../utils.js';

Dropzone.autoDiscover = false;

export default {
  props: [
    'active',
    'toggleUpload'
  ],
  components: {
    Waterfall,
    WaterfallSlot
  },
  data: () => ({
    uploadedFiles: [],
    dialogCurrentIndex: null,
    dialogDescription: '',
    selectedLocation: null,
    dropzone: null
  }),
  computed: {
    isCompleted: function() {
      return this.uploadedFiles.length > 0 && !!this.selectedLocation;
    }
  },
  mounted: function() {
    this.dropzone = new Dropzone('#upload-dropzone', {
      url: UPLOAD_PATH,
      acceptedFiles: 'image/*',
      paramName: 'files',
      headers: {
        'Authorization': `Bearer ${localStorage.token}`
      }
    });
    this.dropzone.on('success', (file, res, test) => {
      const { width, height } = file;
      res.width = width;
      res.height = height;
      this.uploadedFiles.push(res);
    });
    this.clear();
  },
  methods: {
    getPhotoUrl,
    clear: function() {
      this.selectedLocation = null;
      this.uploadedFiles = [];
      this.dropzone.removeAllFiles();
    },
    openDescriptionModal: function(index) {
      this.dialogDescription = this.uploadedFiles[index].description;
      this.dialogCurrentIndex = index;
      this.$refs.dialog.open();
    },
    closeDescriptionModal: function() {
      Vue.set(this.uploadedFiles[this.dialogCurrentIndex], 'description', this.dialogDescription);
      this.dialogCurrentIndex = null;
      this.$refs.dialog.close();
    },
    onMapChange: function(location) {
      this.selectedLocation = location;
    },
    submit: async function() {
      const locationId = this.selectedLocation.id;
      const payloads = this.uploadedFiles.map(({ url, height, width, description }) => ({
        url, description, locationId
      }));
      try {
        await Promise.all(payloads.map(
          payload => post(this.$router, 'photos', payload)
        ));
        this.$refs.snackbar.open();
        this.clear();
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>