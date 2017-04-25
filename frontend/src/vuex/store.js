// Vuex store is a state management library for storing some application state so that all components
// in the page can rely on it and need not worry about communication with other component, the store
// can act as the single source of truth among all components.

import Vue from 'vue';
import Vuex from 'vuex';

/* modules */
import User from './modules/user';
import ActivityPlanning from './modules/activity-planning';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { // import the two modules into the vuex store
    User,
    ActivityPlanning
  }
})