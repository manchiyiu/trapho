import * as _ from 'lodash';
import Vue from 'vue';

/* initial state */

const initialState = {
  info: {
    token: null,
    id: null,
    username: null
  }
};

/* reducer */

const mutations = {
  userLogin: function(state, payload) {
    Vue.set(state.info, 'token', payload.token);
    Vue.set(state.info, 'id', payload.id);
    Vue.set(state.info, 'username', payload.username)
  },
  userLogout: function(state, payload) {
    Vue.set(state.info, 'token', null);
    Vue.set(state.info, 'id', null);
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