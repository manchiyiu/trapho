import * as _ from 'lodash';
import Vue from 'vue';

/* initial state */

const initialState = {
  token: null
};

/* reducer */

const mutations = {
  userLogin: function(state, payload) {
    Vue.set(state, 'info.token', payload.token);
  },
  userLogout: function(state, payload) {
    Vue.set(state, 'info.token', null);
  }
};

/* getters */

const getters = {
  userHasLogin: state => !!_.get(state, 'info.token')
}

export default {
  state: initialState,
  getters,
  mutations
};