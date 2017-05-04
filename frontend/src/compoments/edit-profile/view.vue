<!-- the main edit user profile page component -->
<name>edit-view</name>

<template>
  <div style="padding: 16px">
    <div class="main">
      <md-card class="card">
        <md-card-content>
          <form novalidate @submit.stop.prevent="submit">
            <!-- field for inputting password -->
            <md-input-container class="input-container">
              <md-icon>vpn_key</md-icon>
              <label>Original Password</label>
              <md-input required v-model="password" type="password"></md-input>
            </md-input-container>
            <!-- field for inputting new password -->
            <md-input-container class="input-container">
              <md-icon>vpn_key</md-icon>
              <label>New Password</label>
              <md-input v-model="newpassword" type="password"></md-input>
            </md-input-container>
            <!-- field for inputting new password twice -->
            <md-input-container class="input-container">
              <md-icon>vpn_key</md-icon>
              <label>Re-enter New Password</label>
              <md-input v-model="newpassword2" type="password"></md-input>
            </md-input-container>
            <!-- field for inputting email -->
            <md-input-container class="input-container">
              <md-icon>email</md-icon>
              <label>Email</label>
              <md-input v-model="email"></md-input>
            </md-input-container>
            <!-- submit button, enabled only if all fields are inputted -->
            <md-button class="md-primary md-raised" :disabled="!isFilled" @click.native="submit">Submit</md-button>
          </form>
        </md-card-content>
      </md-card>
      <!-- display the error message if any at the bottom of the page -->
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
    password: '', // value for storing the user's old password
    newpassword: '', // user's new password
    newpassword2: '', // user's new password (the second input)
    errorMessage: '', // error message string (if any)
    email: '', // user new email
    isEmailInvalid: true // boolean indicating whether or not email is invalid
  }),
  computed: {
    // whether or not all input field are filled
    isFilled: function () { return this.password.length > 0 && ((this.newpassword == this.newpassword2 && this.newpassword.length > 0) || (this.email.length > 0 && !this.isEmailInvalid)); },
    // user id of the current user
    userId: function () { return this.$store.state.User.info.id; },
    // user name of current user
    username: function () { return this.$store.state.User.info.username; }
  },
  watch: {
    email: function() {
      // a regular expression for checking if email is valid
      let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (re.test(this.email)) { // test the user input against the regular expression
        this.isEmailInvalid = false; // set email as invalid
      }
      else {
        this.isEmailInvalid = true; // set email as valid
      }
    }
  },
  methods: {
    // method for submitting the form
    submit: async function () {
      // test if the old password is really the user's old password, if not, reject
      let { error, token, user } = await loginTest(this.$router, {
        username: this.username,
        password: this.password,
      });
      if (error) {
        switch (error) {
          case 'invalidUser': // should not happen, since the user has already login
            this.errorMessage = 'User does not exist. Please try again.';
            break;
          case 'wrongPassword': // the user's old password is wrong
            this.errorMessage = 'Wrong password. Please try again.';
            this.password = '';
            break;
          default:
            this.errorMessage = error;
        }
        this.$refs.snackbar.open(); // display the error message
        return;
      }

      let error2 = '';

      // bundle all edited fields and send to backend
      if (this.newpassword == '') {
        let { error2, id } = await patch(this.$router, `auth/id/${this.userId}`, { userId: this.userId, email: this.email });
      } else if (this.email == '') {
        let { error2, id } = await patch(this.$router, `auth/id/${this.userId}`, { userId: this.userId, password: this.newpassword });
      } else {
        let { error2, id } = await patch(this.$router, `auth/id/${this.userId}`, { userId: this.userId, password: this.newpassword, email: this.email });
      }

      if (error2) {
          switch (error2) {
            case 'userNotExist': // should not happen, since the user has already login
              this.errorMessage = 'User does not exist. Please try again.';
              break;
            default:
              this.errorMessage = error;
          }
          this.$refs.snackbar.open();
          return;
        } else {
          this.errorMessage = 'Personal information has been changed.';
          // reset all form fields
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