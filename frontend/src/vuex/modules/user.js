import * as _ from 'lodash';
import Vue from 'vue';

// initial state for the user module
const initialState = {
  info: {
    token: null, // user token
    id: null, // user id
    username: null // user name
  }
};

/* reducer */
const mutations = {
  // this mutation, when triggered, will change the token, user id, username in the store
  userLogin: function(state, payload) {
    Vue.set(state.info, 'token', payload.token);
    Vue.set(state.info, 'id', payload.id);
    Vue.set(state.info, 'username', payload.username)
  },
  // reset all state to the initial state
  userLogout: function(state, payload) {
    Vue.set(state.info, 'token', null);
    Vue.set(state.info, 'id', null);
    Vue.set(state.info, 'username', null);
  }
};

/* getters */

const getters = { // a getter to check if user has logined in or not
  userHasLogin: state => !!_.get(state, 'info.token') // a user has login if a token is in the store
}

export default {
  state: initialState,
  getters,
  mutations
};