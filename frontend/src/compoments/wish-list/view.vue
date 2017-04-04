<name>wish-list</name>

<template>
  <div class="main">
    <md-card class="wishlist">

      <md-card-content>
        <form >


   <div>
  <md-list>

    <md-subheader>
        <font size="5">My Wish List</font>

<md-layout md-align="end" md-gutter="16">
  <md-layout md-flex="20">
    <span><md-button class="md-raised md-accent">Plan</md-button></span>
  </md-layout>
</md-layout>

        </md-subheader>


<md-divider></md-divider>


<md-layout md-gutter>
  <md-layout md-column md-flex="20">
    <md-layout>
        <md-list-item>
      <md-icon>menu</md-icon> <span>Filter</span>
    </md-list-item>
    </md-layout>
    <md-layout>
    <md-list-item>
      <md-icon>move_to_inbox</md-icon> <span>Date</span>
    </md-list-item>
    </md-layout>
    <md-layout>
    <md-list-item>
      <md-icon>send</md-icon> <span>Location</span>
    </md-list-item>
    </md-layout>
    <md-layout>
    <md-list-item>
      <md-icon>delete</md-icon> <span>Croutry</span>
    </md-list-item>
    </md-layout>
  <md-layout>
      <md-layout>
    <md-list-item>
      <md-icon>error</md-icon> <span>Time</span>
    </md-list-item>
    </md-layout>

    </md-layout>
  </md-layout>



<md-layout>

      <md-layout md-align="center">
        <span>
      <md-card class="photo">
        <md-card-media>
          <img src="assets/card-image-1.jpg" alt="People">
        </md-card-media>
        <md-card-actions>
          <md-button class="md-icon-button">
      <md-icon>favorite</md-icon>
    </md-button>
    <md-button class="md-icon-button">
      <md-icon>delete</md-icon>
    </md-button>
        </md-card-actions>
      </md-card></span>
      </md-layout>


      <md-layout md-align="center">
        <span>
      <md-card class="photo">
        <md-card-media>
          <img src="assets/card-image-1.jpg" alt="People">
        </md-card-media>
        <md-card-actions>
          <md-button class="md-icon-button">
      <md-icon>favorite</md-icon>
    </md-button>
    <md-button class="md-icon-button">
      <md-icon>delete</md-icon>
    </md-button>
        </md-card-actions>
      </md-card></span>
      </md-layout>


      <md-layout md-align="center">
        <span>
      <md-card class="photo">
        <md-card-media>
          <img src="assets/card-image-1.jpg" alt="People">
        </md-card-media>
        <md-card-actions>
          <md-button class="md-icon-button">
      <md-icon>favorite</md-icon>
    </md-button>
    <md-button class="md-icon-button">
      <md-icon>delete</md-icon>
    </md-button>
        </md-card-actions>
      </md-card>
        </span>
      </md-layout>

</md-layout>









</md-layout>


  </md-list>
</div>





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
  .photo {
    display: flex;
    width: 135px;
    height: 135px;

  }
  .card {
    width: 400px;
  }
  .input-container {
    margin-left: 5px;
    width: 95%;
  }
  .wishlist {
      width: 60vw;
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