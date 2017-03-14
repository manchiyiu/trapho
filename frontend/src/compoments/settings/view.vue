<name>login-page2-login-form</name>

<template>
  <div class="main">
    <md-card class="signup2-form">
        
      <md-card-content>
        <form novalidate @submit.stop.prevent="submit">
          
            

<md-layout :md-gutter="8">
  <md-layout>
    <span><md-checkbox id="my-test2" name="my-test2" v-model="checkbox" class="md-warn"><md-icon>person</md-icon>Swimming</md-checkbox></span>
  </md-layout>

  <md-layout>
    <span><md-checkbox id="my-test3" name="my-test3" v-model="checkbox" class="md-warn"><md-icon>person</md-icon>Basketball</md-checkbox></span>
  </md-layout>

  <md-layout>
    <span><md-checkbox id="my-test2" name="my-test2" v-model="checkbox" class="md-warn"><md-icon>person</md-icon>Table Tennis</md-checkbox></span>
  </md-layout>

  <md-layout>
    <span><md-checkbox id="my-test3" name="my-test3" v-model="checkbox" class="md-warn"><md-icon>person</md-icon>Singing</md-checkbox></span>
  </md-layout>

</md-layout>

<md-layout :md-gutter="8">
    <md-layout>
    <span><md-checkbox id="my-test2" name="my-test2" v-model="checkbox" class="md-warn"><md-icon>person</md-icon>Car</md-checkbox></span>
  </md-layout>

  <md-layout>
    <span><md-checkbox id="my-test3" name="my-test3" v-model="checkbox" class="md-warn"><md-icon>person</md-icon>Cdr</md-checkbox></span>
  </md-layout>

  <md-layout>
    <span><md-checkbox id="my-test2" name="my-test2" v-model="checkbox" class="md-warn"><md-icon>person</md-icon>Jgirl</md-checkbox></span>
  </md-layout>

  <md-layout>
    <span><md-checkbox id="my-test3" name="my-test3" v-model="checkbox" class="md-warn"><md-icon>person</md-icon>Jumping</md-checkbox></span>
  </md-layout>
</md-layout>


            
            <p></p>
            
          <md-button class="md-primary md-raised" :disabled="isFilled" @click.native="submit" >Submit</md-button>
          
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
  .signup2-form {
      width: 50vw;
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