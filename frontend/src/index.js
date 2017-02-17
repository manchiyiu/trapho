import Vue from 'vue';

import './theme';
import './compoments/login-page/module';

import App from './app.vue';

new Vue({
  el: '#app',
  render: h => h(App)
});