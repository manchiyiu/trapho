<name>side-bar-form</name>

<template>

</template>

<style>

</style>

<script>
import Vue from 'vue';
import { login } from '../../utils';

export default {
  data: () => ({
    username: '',
    password: '',
    errorMessage: ''
  }),
  computed: {

  },
  methods: {
    submit: async function () {
      let { error, token } = await login(this.$router, {
        username: this.username,
        password: this.password
      });
      if (error) {
        switch (error) {
          case 'invalidUser':
            this.errorMessage = 'User does not exist. Please try again.';
            break;
          case 'wrongPassword':
            this.errorMessage = 'Wrong password. Please try again.';
            break;
          default:
            this.errorMessage = error;
        }
        this.$refs.snackbar.open();
      } else {
        this.$router.push('feed');
      }
    }
  }
}
</script>