/* initial state */

const state = {
  user: {}
};

/* reducer */

const mutations = {
  userLogin: function(state, payload) {
    state.user.username = payload.username;
    state.user.userId = payload.userId;
  },
  userLogout: function(state, payload) {
    state.user = {};
  }
};

export default {
  state,
  mutations
};