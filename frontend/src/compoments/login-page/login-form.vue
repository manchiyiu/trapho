<name>login-page-login-form</name>

<template>
  <div class="main">
    <md-card class="card">
      <md-card-content>
        <form novalidate @submit.stop.prevent="submit">
          <md-input-container class="input-container">
            <label>Username</label>
            <md-input required></md-input>
          </md-input-container>
          <md-input-container class="input-container">
            <label>Password</label>
            <md-input required></md-input>
          </md-input-container>
          <md-button class="md-primary md-raised">Submit</md-button>
        </form>
      </md-card-content>
    </md-card>
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