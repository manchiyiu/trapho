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

          <md-button type="submit" class="md-primary md-raised" :disabled="isNotFilled || isEmailInvalid || isNotSame">Submit</md-button>

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
    errorMessage: '',
    isEmailInvalid: true,
  }),
  computed: {
    isNotFilled: function () { return this.username.length <= 0 || this.password.length <= 0; },
    isNotSame: function () {return this.password != this.passwordAgain;}
  },
  watch: {
    email: function() {
      let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(this.email)) {
        this.isEmailInvalid = false;
      }
      else {
        this.isEmailInvalid = true;
      }
    }
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
      //   this.$store.commit('userLogin', {
      //   username: this.username,
      //   id: user.id,
      //   token
      // });
      // this.$router.push('feed');
    }
  }
}
</script>