<!--
FUNCTION SIGNUP - Function for user to signup if they dont have the accound
PROGRAMMER: Yiu Man CHi / Wong Man Yung
CALLING SEQUENCE: When signup is click in the first page, signup form appear
VERSION: 1
PURPOSE: User could signup for an account to use the trapho app
DATA STRUCTURES:  input USERNAME - string
                  input PASSWORD - string
ALGORITHM:  Ask user to input the username and password;
            Meanwhile double bind the input to the database for registration
            Then check the validation; if user already exit, alert the user;
            else signup success.
-->
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

          <md-input-container class="input-container">
            <md-icon>vpn_key</md-icon>
            <label>Password Again</label>
            <md-input required v-model="passwordAgain" type="password"></md-input>
          </md-input-container>

          <md-input-container class="input-container">
            <md-icon>email</md-icon>
            <label>Email</label>
            <md-input required v-model="email"></md-input>
          </md-input-container>

          <md-input-container class="input-container">
            <md-icon>Name</md-icon>
            <label>Nickname</label>
            <md-input required v-model="nickname"></md-input>
          </md-input-container>

          <md-button type="submit" class="md-primary md-raised" :disabled="isFilled" @click.native="submit">Submit</md-button>

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
    passwordAgain: '',
    email: '',
    nickname: '',
    errorMessage: ''
  }),
  computed: {
    isFilled: function () { return this.username.length <= 0 || this.password.length <= 0; }
  },
  methods: {
    submit: async function () {
      if (this.password !== this.passwordAgain) {
        this.errorMessage = 'Your two password entry does not match. Please try again.';
        this.$refs.snackbar.open();
        return;
      }

      let { status, error, token } = await post(this.$router, 'auth/signup', {
        username: this.username,
        password: this.password,
        email: this.email,
        nickname: this.nickname
      });
      if (error) {
        switch (error) {
          case 'alreadyExist':
            this.errorMessage = 'User already exists. Please try again.';
            break;
          default:
            this.errorMessage = error;
        }
        this.$refs.snackbar.open();
        return;
      }
    }
  }
}
</script>