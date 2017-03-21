import Vue from 'vue';
import VueRouter from 'vue-router';

import './theme';
import './compoments/login-page/module';
import './compoments/photo-feed/module';
<<<<<<< HEAD
import './compoments/wish-list/module';
=======
import './compoments/common/module';

import store from './vuex/store';
>>>>>>> 3e296d703842696ad5731646ddccac8ac8c8d846

import App from './app.vue';

import LoginPageView from './compoments/login-page/view.vue';
import PhotoFeedView from './compoments/photo-feed/view.vue';
import WishListView from './compoments/wish-list/view.vue';

Vue.use(VueRouter);

const routes = [
  { path: '/', component: LoginPageView },
  { path: '/feed', component: PhotoFeedView },
  { path: '/wishlist', component: WishListView }
];

const router = new VueRouter({ routes });

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
});