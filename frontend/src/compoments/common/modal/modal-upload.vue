<name>common-modal-upload</name>

<template>
  <md-dialog md-title="Upload new photos" md-open-from="#fab-file-upload" ref="dialog" @close="onClose">
    <md-dialog-title>Upload Photos</md-dialog-title>
    <md-dialog-content>
      To be added.
    </md-dialog-content>
    <md-dialog-actions>
      <md-button class="md-primary" @click.native="close">Done</md-button>
    </md-dialog-actions>
  </md-dialog>
</template>

<script>
import Vue from 'vue';

export default {
  props: [
    'active',
    'toggleUpload'
  ],
  data: () => ({
    htmlContent: '<h1>test</h1>'
  }),
  watch: {
    active: function() {
      console.log(this.active);
      if (this.active) {
        this.$refs.dialog.open();
      }
    }
  },
  methods: {
    close: function() {
      this.$refs.dialog.close();
    },
    onClose: function() {
      this.toggleUpload(false); // reset the state flag
    }
  }
};
</script>