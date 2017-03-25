import * as _ from 'lodash';
import Vue from 'vue';

/* initial state */

const initialState = {
  selected: {}
};

/* reducer */

const mutations = {
  activityPlanningSetSelected: function (state, payload) {
    Vue.set(state, 'selected', payload.selected);
  }
};

export default {
  state: initialState,
  mutations
}