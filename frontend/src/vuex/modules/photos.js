import * as _ from 'lodash';
import Vue from 'vue';

/* initial state */

const initialState = {};

/* reducer */

const mutations = {
  photosUpdate: function (state, payload) {
    Vue.set(state, 'photos', payload.photos);
  }
};

export default {
  state: initialState,
  mutations
}