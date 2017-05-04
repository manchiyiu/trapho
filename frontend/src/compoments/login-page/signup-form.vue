<!-- component for signup form -->
<name>login-page-signup-form</name>

<template>
  <div class="main">
    <md-card class="card">
      <md-card-content>
        <form novalidate @submit.stop.prevent="submit">
          <!-- user name -->
          <md-input-container class="input-container">
            <md-icon>person</md-icon>
            <label>Username</label>
            <md-input required v-model="username"></md-input>
          </md-input-container>
          <!-- password -->
          <md-input-container class="input-container">
            <md-icon>vpn_key</md-icon>
            <label>Password</label>
            <md-input required v-model="password" type="password"></md-input>
          </md-input-container>
          <!-- password (second input) -->
          <md-input-container class="input-container">
            <md-icon>vpn_key</md-icon>
            <label>Re-enter Password</label>
            <md-input required v-model="passwordAgain" type="password"></md-input>
          </md-input-container>
          <!-- email -->
          <md-input-container class="input-container">
            <md-icon>email</md-icon>
            <label>Email</label>
            <md-input required v-model="email"></md-input>
          </md-input-container>

          <!-- submit button, only valid if all input are filled, email are valid and two password input matches -->
          <md-button type="submit" class="md-primary md-raised" :disabled="isNotFilled || isEmailInvalid || isNotSame">Submit</md-button>

        </form>
      </md-card-content>
    </md-card>
    <!-- error message -->
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
import { post, login } from '../../utils';

export default {
  data: () => ({
    username: '', // input field for username
    password: '', // input field for password
    passwordAgain: '', // re-entry for password
    email: '', // email field
    errorMessage: '', // error message string, if any
    isEmailInvalid: true // whether or not the email is valid
  }),
  computed: {
    // all input field are filled
    isNotFilled: function () { return this.username.length <= 0 || this.password.length <= 0; },
    // the two password field matches
    isNotSame: function () { return this.password != this.passwordAgain; }
  },
  watch: {
    email: function() {
      // regular expression to check if email is valid
      let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(this.email)) { // test user email against email
        this.isEmailInvalid = false;
      } else {
        this.isEmailInvalid = true;
      }
    }
  },

  methods: {
    // method to submit the signup form
    submit: async function () {
      // the two password doesn't match => error
      if (this.password !== this.passwordAgain) {
        this.errorMessage = 'Your two password entry does not match. Please try again.';
        this.$refs.snackbar.open();
        return;
      }

      // submit the user information to backend
      let { status, error } = await post(this.$router, 'auth/signup', {
        username: this.username,
        password: this.password,
        email: this.email,
        nickname: '' // nickname not implemented, just serve an empty string
      });
      if (error) {
        switch (error) {
          case 'alreadyExist': // user already exist
            this.errorMessage = 'User already exists. Please try again.';
            break;
          default: // directly display all unknown error messasge
            this.errorMessage = error;
        }
        this.$refs.snackbar.open(); // display error
        return;
      }

      // use the user information to login
      let { err, user, token } = await login(this.$router, {
        username: this.username,
        password: this.password,
      });
      if (err) {
        switch (err) {
          default:
            this.errorMessage = err;
        }
        this.$refs.snackbar.open();
        return
      }

      // store username, user id, token to Vuex store
      this.$store.commit('userLogin', {
        username: this.username,
        id: user.id,
        token
      });

      // redirect user to photo feed page
      this.$router.push('feed');

    }
  }
}
</script>