import * as _ from 'lodash';
import Vue from 'vue';

// initial state for the activity planning module
const initialState = {
  selected: {}, // the list of selected location
  startDate: null, // the start date of the trip
  endDate: null, // the end date of the trip
  hasCommitted: false // whether or not the user has confirmed the list of selected location
};

/* reducer */
const mutations = {
  // this mutation, when triggered, will change the list of selected locations
  activityPlanningSetSelected: function (state, payload) {
    Vue.set(state, 'selected', payload);
  },
  // change the trip start date
  activityPlanningSetTripStartDate: function (state, payload) {
    Vue.set(state, 'startDate', payload);
  },
  // change the trip end date
  activityPlanningSetTripEndDate: function (state, payload) {
    Vue.set(state, 'endDate', payload);
  },
  // change the hasCommited
  activityPlanningSetCommitted: function (state, payload) {
    Vue.set(state, 'hasCommitted', payload);
  },
  // reset all state to the initial state
  activityPlanningClear: function (state) {
    Vue.set(state, 'selected', {});
    Vue.set(state, 'startDate', null);
    Vue.set(state, 'endDate', null);
    Vue.set(state, 'hasCommitted', false);
  }
};

export default {
  state: initialState,
  mutations
};