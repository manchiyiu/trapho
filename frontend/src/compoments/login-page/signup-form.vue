<name>login-page-login-form</name>

<template>
  <div class="main">
    <md-card class="card">
      <md-card-content>
        <form novalidate @submit.stop.prevent="submit">
          <md-input-container class="input-container">
            <md-icon>person</md-icon>
            <label>Username</label>
            <md-input required v-model="username"></md-input>
          </md-input-container>
          <md-input-container class="input-container">
            <md-icon>vpn_key</md-icon>
            <label>Password</label>
            <md-input required v-model="password" type="password"></md-input>
          </md-input-container>
          <md-button class="md-primary md-raised" :disabled="isFilled" @click.native="submit">Sign Up</md-button>
        </form>
      </md-card-content>
    </md-card>
    <md-snackbar md-position="bottom center" ref="snackbar" :md-duration="4000">
      <span>{{ errorMessage }}</span>
    </md-snackbar>
  </div>
</template>

<style>
  .main {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .card {
    width: 400px;
  }
  .input-container {
    margin-left: 5px;
    width: 95%;
  }
</style>

<script>
import Vue from 'vue';
import { post } from '../../utils';

export default {
  data: () => ({
    username: '',
    password: '',
    errorMessage: ''
  }),
  computed: {
    isFilled: function () { return this.username.length <= 0 || this.password.length <= 0; }
  },
  methods: {
    submit: async function () {
      let { status, error, token } = await post(this.$router, 'auth/signup', {
        username: this.username,
        password: this.password
      });
      if (error) {
        switch (error) {
          case 'alreadyExist':
            this.errorMessage = 'User already exists. Please try again';
            break;
          default:
            this.errorMessage = error;
        }
        this.$refs.snackbar.open();
      } else {
        window._token = token;
      }
    }
  }
}
</script>