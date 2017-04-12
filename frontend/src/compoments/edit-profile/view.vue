<name>edit-view</name>

<template>
  <div style="padding: 16px">
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

            <md-button class="md-primary md-raised" :disabled="!isFilled" @click.native="submit">Submit</md-button>
            
          </form>
        </md-card-content>
      </md-card>
      <md-snackbar md-position="bottom center" ref="snackbar" :md-duration="4000">
        <span>{{ errorMessage }}</span>
      </md-snackbar>
    </div>
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
import { loginTest, patch } from '../../utils';

export default {
  data: () => ({
    password: '',
    newpassword: '',
    newpassword2: '',
    errorMessage: '',
    email: '',
    isEmailInvalid: true
  }),
  computed: {
    isFilled: function () { return this.password.length > 0 && ((this.newpassword == this.newpassword2 && this.newpassword.length > 0) || (this.email.length > 0 && !this.isEmailInvalid)); },
    userId: function () { return this.$store.state.User.info.id; },
    username: function () { return this.$store.state.User.info.username; }
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
      let { error, token, user } = await loginTest(this.$router, {
        username: this.username,
        password: this.password,
      });
      if (error) {
        switch (error) {
          case 'invalidUser':
            this.errorMessage = 'User does not exist. Please try again.';
            break;
          case 'wrongPassword':
            this.errorMessage = 'Wrong password. Please try again.';
            this.password = '';
            break;
          default:
            this.errorMessage = error;
        }
        this.$refs.snackbar.open();
        return;
      }

      let error2 = '';

      if (this.newpassword == '') {
        let { error2, id } = await patch(this.$router, `auth/id/${this.userId}`, { userId: this.userId, email: this.email });
      } else if (this.email == '') {
        let { error2, id } = await patch(this.$router, `auth/id/${this.userId}`, { userId: this.userId, password: this.newpassword });
      } else {
        let { error2, id } = await patch(this.$router, `auth/id/${this.userId}`, { userId: this.userId, password: this.newpassword, email: this.email });
      }

      if (error2) {
          switch (error2) {
            case 'userNotExist':
              this.errorMessage = 'User does not exist. Please try again.';
              break;
            default:
              this.errorMessage = error;
          }
          this.$refs.snackbar.open();
          return;
        } else {
          this.errorMessage = 'Personal information has been changed.';
          this.password = '';
          this.newpassword = '';
          this.newpassword2 = '';
          this.email = '';
          this.$refs.snackbar.open();
        }
      
      
    }
  }
}
</script>