<name>search-bar</name>

<template>
  <div style="margin-bottom: 20px;">
    <md-card>
      <md-card-header class="search-bar">
        <md-card-expand>
        <md-card-actions>
          <div class="md-title">Filter</div>
          <span style="flex: 1"></span>
          <md-button class="md-icon-button" md-expand-trigger>
            <md-icon>keyboard_arrow_down</md-icon>
          </md-button>
        </md-card-actions>

        <md-card-content>
          <form novalidate @submit.stop.prevent="submit">

            <md-input-container>
              <md-icon>person</md-icon>
              <label>Username</label>
              <md-input v-model="username"></md-input>
            </md-input-container>

            <md-input-container>
              <md-icon>location_on</md-icon>
              <label>Location</label>
              <md-input v-model="location"></md-input>
            </md-input-container>

            <md-input-container>
              <md-icon>date_range</md-icon>
              <label>Date</label>
              <md-input v-model="date"></md-input>
            </md-input-container>

            <md-card-actions>
              <md-button class="md-raised md-primary" :disabled="isFilled" @click.native="submit">Submit</md-button>
            </md-card-actions>
          </form>
        </md-card-content>
      </md-card-expand>
      </md-card-header>
    </md-card>
  </div>
</template>

<style>
.search-bar {
  margin-bottom: 0px;
}
</style>

<script>
import Vue from 'vue';
import { post } from '../../utils';

export default {
  data: () => ({
    username: '',
    location: '',
    date: '',
    errorMessage: ''
  }),
  computed: {
    isFilled: function () { return this.username.length <= 0 && this.location.length <= 0 && this.date.length <= 0; }
  },
  methods: {
    submit: async function () {
      window.alert("Hello");
      // let { status, error, token } = await get(this.$router, 'photos/users/', {
      //   userid: 
      // });
      // if (error) {
      //   switch (error) {
      //     case 'alreadyExist':
      //       this.errorMessage = 'User already exists. Please try again';
      //       break;
      //     default:
      //       this.errorMessage = error;
      //   }
      //   this.$refs.snackbar.open();
      //   return;
      // }
    }
  }
}
</script>