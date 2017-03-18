<name>common-modal-upload</name>

<template>
  <md-dialog-alert
    md-title="Upload new photos"
    :md-content-html="htmlContent"
    ref="dialog">
  </md-dialog-alert>
</template>

<script>
import Vue from 'vue';

export default {
  props: [
    'active'
  ],
  data: () => ({
    htmlContent: '<h1>test</h1>'
  }),
  watch: {
    active: function() {
      alert('updated');
    }
  }
};
</script>