import Vue from 'vue';
import Vuex from 'vuex';

/* modules */
import User from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    User
  }
})