<!-- component for login form -->
<name>login-page-login-form</name>

<template>
  <div class="main">
    <md-card class="card">
      <md-card-content>
        <form novalidate @submit.stop.prevent="submit">
          <!-- username -->
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
          <!-- login button, enabled only when username and password are all filled -->
          <md-button type="submit" class="md-primary md-raised" :disabled="isFilled" @click.native="submit">Login</md-button>
        </form>
      </md-card-content>
    </md-card>
    <!-- error message, if any -->
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
import { login } from '../../utils';

export default {
  data: () => ({
    username: '',
    password: '',
    errorMessage: '' // set to the error message string (if any)
  }),
  computed: {
    // whether or not all fields has been filled
    isFilled: function () { return this.username.length <= 0 || this.password.length <= 0; },
  },
  methods: {
    // method to submit the login form
    submit: async function () {
      // submit the user login information to backend
      let { error, token, user } = await login(this.$router, {
        username: this.username,
        password: this.password,
      });
      if (error) {
        switch (error) {
          case 'invalidUser': // wrong user name
            this.errorMessage = 'User does not exist. Please try again.';
            break;
          case 'wrongPassword': // wrong password
            this.errorMessage = 'Wrong password. Please try again.';
            break;
          default:
            this.errorMessage = error; // delegate any unknown error message from backend directly
        }
        this.$refs.snackbar.open(); // display the error message
        return;
      }
      // store the user id, username and token to the Vuex store
      this.$store.commit('userLogin', {
        username: this.username,
        id: user.id,
        token
      });
      // redirect to photo feed page
      this.$router.push('feed');
    }
  }
}
</script>