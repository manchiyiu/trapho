<name>user-profile-view</name>

<template>
  <div>
    <h1>
      user id is {{userId}}
    </h1>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  props: ['userId']
};
</script>