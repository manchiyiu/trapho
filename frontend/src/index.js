import 'whatwg-fetch';

// import all the vue component dependency
import Vue from 'vue';
import VueRouter from 'vue-router';
import VueLazyload from 'vue-lazyload';
import InfiniteScroll from 'vue-infinite-scroll';
import VueProgressiveImage from 'vue-progressive-image';

// import Trapho custom component
import './theme';
import './compoments/edit-profile/module';
import './compoments/login-page/module';
import './compoments/photo-feed/module';
import './compoments/common/module';
import './compoments/activity-planning-select/module';
import './compoments/activity-planning-trip/module';
import './compoments/user-profile/module';
import './compoments/trip/module';
import './compoments/edit-profile/module';

import store from './vuex/store';

import App from './app.vue';

// import Trapho page component
import LoginPageView from './compoments/login-page/view.vue';
import EditView from './compoments/edit-profile/view.vue';
import PhotoFeedView from './compoments/photo-feed/view.vue';
import ActivityPlanningSelect from './compoments/activity-planning-select/view.vue';
import ActivityPlanningTrip from './compoments/activity-planning-trip/view.vue';
import Profile from './compoments/user-profile/view.vue';
import Location from './compoments/location/view.vue';
import Trip from './compoments/trip/view.vue';
import EditTrip from './compoments/edit-trip/view.vue';

// tell Vue to register all imported vue component
Vue.use(VueLazyload, {
  lazyComponent: true,
  preLoad: 5
});
Vue.use(VueRouter);
Vue.use(InfiniteScroll);
Vue.use(VueProgressiveImage);

// define which page component will be rendered for different URL pattern
const routes = [
  {
    path: '/', // login page
    component: LoginPageView
  },
  {
    path: '/feed', // photo feed page
    component: PhotoFeedView
  },
  {
    path: '/edit', // edit user profile page
    component: EditView
  },
  {
    path: '/plan-select', // create new trip: select location to go
    component: ActivityPlanningSelect
  },
  {
    path: '/plan-trip', // create new trip: planning timetable
    component: ActivityPlanningTrip
  },
  {
    path: '/profile/:userId', // user profile page
    components: { default: Profile },
    props: { default: true }
  },
  {
    path: '/location/:locationId', // location page
    components: { default: Location },
    props: { default: true }
  },
  {
    path: '/trip/:tripId', // trip page
    components: { default: Trip },
    props: { default: true }
  },
  {
    path: '/edit-trip/:tripId', // trip edit page
    components: { default: EditTrip },
    props: { default: true }
  }
];

const router = new VueRouter({ routes });

// kickstart the Vue instance on the HTML DOM
new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
});