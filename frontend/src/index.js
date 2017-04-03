import Vue from 'vue';
import VueRouter from 'vue-router';
import VueLazyload from 'vue-lazyload';
import InfiniteScroll from 'vue-infinite-scroll';
import VueProgressiveImage from 'vue-progressive-image';

import './theme';
import './compoments/edit-profile/module';
import './compoments/login-page/module';
import './compoments/photo-feed/module';
import './compoments/common/module';
import './compoments/activity-planning-select/module';
import './compoments/user-profile/module';

import store from './vuex/store';

import App from './app.vue';

import LoginPageView from './compoments/login-page/view.vue';
import EditView from './compoments/edit-profile/view.vue';
import PhotoFeedView from './compoments/photo-feed/view.vue';
import ActivityPlanningSelect from './compoments/activity-planning-select/view.vue';
import ActivityPlanningTrip from './compoments/activity-planning-trip/view.vue';
import Profile from './compoments/user-profile/view.vue';

Vue.use(VueLazyload, {
  lazyComponent: true,
  preLoad: 5
});
Vue.use(VueRouter);
Vue.use(InfiniteScroll);
Vue.use(VueProgressiveImage);

const routes = [
  {
    path: '/',
    component: LoginPageView
  },
  {
    path: '/feed',
    component: PhotoFeedView
  },
  {
    path: '/edit',
    component: EditView
  },
  {
    path: '/plan-select',
    component: ActivityPlanningSelect
  },
  {
    path: '/plan-trip',
    component: ActivityPlanningTrip
  },
  {
    path: '/profile/:userId',
    components: { default: Profile },
    props: { default: true }
  }
];

const router = new VueRouter({ routes });

new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
});