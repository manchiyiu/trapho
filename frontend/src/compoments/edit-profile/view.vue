<name>edit-view</name>

<template>
  <div class="main">
    <md-card class="card">
      <md-card-content>
        <form novalidate @submit.stop.prevent="submit">

         
          <md-input-container class="input-container">
            <md-icon>vpn_key</md-icon>
            <label>Original Password</label>
            <md-input required v-model="password" type="password"></md-input>
          </md-input-container>

          
          <md-input-container class="input-container">
            <md-icon>vpn_key</md-icon>
            <label>New Password</label>
            <md-input v-model="newpassword" type="password"></md-input>
          </md-input-container>

          <md-input-container class="input-container">
            <md-icon>vpn_key</md-icon>
            <label>Re-enter New Password</label>
            <md-input v-model="newpassword2" type="password"></md-input>
          </md-input-container>

          <md-input-container class="input-container">
            <md-icon>email</md-icon>
            <label>Email</label>
            <md-input v-model="email"></md-input>
          </md-input-container>

          <md-button class="md-primary md-raised" :disabled="isFilled" @click.native="submit">Submit</md-button>
          
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
import { patch } from '../../utils';

export default {
  data: () => ({
    password: '',
    newpassword: '',
    newpassword2: '',
    errorMessage: ''
  }),
  computed: {
    isFilled: function () { return this.password.length <= 0 || this.newpassword != this.newpassword2 || this.newpassword.length <= 0 || this.email.length <= 0; },
    userId: function () { return this.$store.state.User.info.id; }
  },
  methods: {
    submit: async function (userId, password) {
      let { error, id } = await patch(this.$router, `auth/id/${this.userId}`, { userId: this.userId, password: this.newpassword });
      if (error) {
        switch (error) {
          case 'userNotExist':
            this.errorMessage = 'User does not exist. Please try again.';
            break;
          default:
            this.errorMessage = error;
        }
        this.$refs.snackbar.open();
        return;
      } else {
        this.errorMessage = 'Password has been changed.';
        this.$refs.snackbar.open();
      }
    }
  }
}
</script>