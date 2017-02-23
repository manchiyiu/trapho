import Vue from 'vue';
import VueRouter from 'vue-router';

import './theme';
import './compoments/login-page/module';

import App from './app.vue';
import LoginPageView from './compoments/login-page/view.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: LoginPageView }
];

const router = new VueRouter({ routes });

new Vue({
  router,
  el: '#app',
  render: h => h(App)
});