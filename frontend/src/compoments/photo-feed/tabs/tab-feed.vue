<name>photo-feed-tab-feed</name>

<template>
  <md-layout md-align="center" md-gutter="64">
    <photo-feed-content-card-list></photo-feed-content-card-list>
  </md-layout>
</template>

<style>
.md-card .md-card-media img {
  width: 500px;
}
.md-card {
  margin-bottom: 15px;
}
</style>

<script>
export default {
  data: () => ({
    prompt: {
      title: 'Leave your comment',
      ok: 'Submit',
      cancel: 'Cancel',
      id: 'comment',
      name: 'comment',
      placeholder: 'Type your comment here...',
      maxlength: 50,
      value: ''
    }
  }),
  methods: {
    openDialog(ref) {
      this.$refs[ref].open();
    },
    closeDialog(ref) {
      this.$refs[ref].close();
    },
    onOpen() {
      console.log('Opened');
    },
    onClose(type) {
      console.log('Closed', type);
    }
  }
};
</script>