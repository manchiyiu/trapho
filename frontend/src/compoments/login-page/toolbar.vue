<name>login-page-toolbar</name>

<template>
  <md-tabs md-centered class="md-transparent">
    <md-tab md-label="Login" md-icon="person_pin">
      <login-page-login-form></login-page-login-form>
    </md-tab>
    <md-tab md-label="Sign up" md-icon="supervisor_account">
      <login-page-signup-form></login-page-signup-form>
    </md-tab>
     <md-tab md-label="More" md-icon="contacts">
      <login-page2-signup-form></login-page2-signup-form>
    </md-tab>
    <md-tab md-label="Wish List" md-icon="contacts">
      <wish-list></wish-list>
    </md-tab>
  </md-tabs>
</template>