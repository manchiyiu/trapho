import Vue from 'vue';
import Vuex from 'vuex';

/* modules */
import User from './modules/user';
import ActivityPlanning from './modules/activity-planning';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    User,
    ActivityPlanning
  }
})