import Vue from 'vue';
import VueRouter from 'vue-router';

import './theme';
import './compoments/login-page/module';
import './compoments/photo-feed/module';
import './compoments/common/module';

import App from './app.vue';

import LoginPageView from './compoments/login-page/view.vue';
import PhotoFeedView from './compoments/photo-feed/view.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: LoginPageView },
  { path: '/feed', component: PhotoFeedView }
];

const router = new VueRouter({ routes });

new Vue({
  router,
  el: '#app',
  render: h => h(App)
});