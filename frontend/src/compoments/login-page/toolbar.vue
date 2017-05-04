<!-- the tab selector for the login page -->
<name>login-page-toolbar</name>

<template>
  <md-tabs md-centered class="md-transparent">
    <!-- Login tab -->
    <md-tab md-label="Login" md-icon="person_pin">
      <login-page-login-form></login-page-login-form>
    </md-tab>
    <!-- Signup form -->
    <md-tab md-label="Sign up" md-icon="supervisor_account">
      <login-page-signup-form></login-page-signup-form>
    </md-tab>
  </md-tabs>
</template>