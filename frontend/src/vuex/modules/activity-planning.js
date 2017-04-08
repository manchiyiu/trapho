import * as _ from 'lodash';
import Vue from 'vue';

/* initial state */

const initialState = {
  selected: {},
  startDate: null,
  endDate: null,
  hasCommitted: false
};

/* reducer */

const mutations = {
  activityPlanningSetSelected: function (state, payload) {
    Vue.set(state, 'selected', payload);
  },
  activityPlanningSetTripStartDate: function (state, payload) {
    Vue.set(state, 'startDate', payload);
  },
  activityPlanningSetTripEndDate: function (state, payload) {
    Vue.set(state, 'endDate', payload);
  },
  activityPlanningSetCommitted: function (state, payload) {
    Vue.set(state, 'hasCommitted', payload);
  }
};

export default {
  state: initialState,
  mutations
}