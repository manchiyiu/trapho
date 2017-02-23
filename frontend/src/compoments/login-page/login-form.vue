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
          <md-button class="md-primary md-raised" :disabled="isFilled" @click.native="submit">Submit</md-button>
        </form>
      </md-card-content>
    </md-card>
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
import { login } from '../../utils';

export default {
  data: () => ({
    username: '',
    password: ''
  }),
  computed: {
    isFilled: function () { return this.username.length <= 0 || this.password.length <= 0; }
  },
  methods: {
    submit: async function () {
      let { status, err, token } = await login({
        username: this.username,
        password: this.password
      });
      window._token = token;
    }
  }
}
</script>