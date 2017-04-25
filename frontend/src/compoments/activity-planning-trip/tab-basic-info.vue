<!-- this component allows user to edit the basic info of the trip that he/she is creating -->
<name>activity-planning-trip-tab-basic-info</name>

<template>
  <md-card class="tab-basic-info-container">
    <md-card-content>

      <p style="margin-bottom: 20px;">
        <i>Please fill in the follow information to start trip planning. Note that once submitted this cannot be changed anymore.</i>
      </p>

      <!-- trip info -->
      <div>
        <b>Trip Information</b>
        <md-divider></md-divider>
        <div style="margin-top: 20px; border-left: 1px solid #ccc; padding-left: 15px;">
          <i>When will you have the trip? Select a start date and end date so you can start planning your trip.</i>
          <!-- start date picker -->
          <div style="margin-top: 20px;">
            <div style="margin-right: 24px; font-weight: bolder;">Start Date</div>
            <input :disabled="hasCommitted" class="date-input" type="text" id="start-picker">
          </div>
          <!-- end date picker -->
          <div style="margin-top: 10px;">
            <div style="margin-right: 30px; font-weight: bolder;">End Date</div>
            <input :disabled="hasCommitted" class="date-input" type="text" id="end-picker">
          </div>
        </div>
      </div>

      <!-- trip info -->
      <div style="margin-top: 30px;">
        <b>Time Planning</b>
        <md-divider></md-divider>
        <div style="margin-top: 20px; border-left: 1px solid #ccc; padding-left: 15px;">
          <i v-if="hasSelected">
            Below is the list of location that you have selected for the trip. Click <u><router-link to="/plan-select">here</router-link></u> to modify.
          </i>
          <!-- will be displayed if user has not selected any location in the previous step -->
          <i v-if="!hasSelected">
            It seems that you have not selected any location. Click <u><router-link to="/plan-select">here</router-link></u> to add.
          </i>
          <!-- a list of locations that the users has selected -->
          <div style="margin-top: 20px; margin-bottom: 20px;">
            <md-chip v-for="location in selected" key="location.id" class="activity-planning-trip-chip">
              <div style="overflow: hidden; width: 100%;">
                <b style="margin-right: 2px;">{{location.name}}</b>
                <i>{{location.description}}</i>
              </div>
            </md-chip>
          </div>
        </div>
      </div>

      <form @submit.prevent="submit">
        <div class="tab-basic-info-submit">
          <!-- button to allow user to commit the basic info so he/she can start timetable planning -->
          <md-button type="submit" :disabled="hasCommitted || !hasCompleted" class="md-raised md-fab md-primary">
            <md-icon>check</md-icon>
          </md-button>
          <!-- button to reset the entire basic info form to its initial state -->
          <md-button @click.native="reset" :disabled="!hasCommitted" class="md-raised md-fab md-accent">
            <md-icon>refresh</md-icon>
          </md-button>
        </div>
      </form>

    </md-card-content>
  </md-card>

</template>

<style>
.tab-basic-info-container {
  height: 100vh;
  margin: -16px;
  padding: 20px;
  padding-bottom: 200px;
  overflow-y: scroll;
}
.activity-planning-trip-chip {
  margin-top: 5px;
  width: 100%;
}
.date-input {
  padding: 7px;
  font-size: 13px;
  border: 1px solid #ddd;
  border-radius: 2px;
}
.tab-basic-info-submit {
  border-top: 1px solid #ddd;
  padding-top: 20px;
  display: flex;
  margin-top: 30px;
  justify-content: center;
}
</style>

<script>
import Vue from 'vue';
import pikaday from 'pikaday';
import _ from 'lodash';
import moment from 'moment';

export default {
  props: ['hasCommitted'], // whether user has commited the basic info or not
  data: () => ({
    startPickerElm: null, // the DOM element reference to the start date picker
    endPickerElm: null // the DOM element reference to the end date picker
  }),
  mounted: function () {
    const self = this;

    this.startPickerElm = new pikaday({ // initialize a new date picker
      field: document.getElementById('start-picker'),
      yearRange: 1,
      onSelect: function () { self.startDate = this.getMoment(); }
    });

    this.endPickerElm = new pikaday({ // initialize a new date picker
      field: document.getElementById('end-picker'),
      yearRange: 1,
      onSelect: function () { self.endDate = this.getMoment(); }
    });

    if (this.startDate != null) {
      this.startPickerElm.setDate(this.startDate.toDate()); // set the value of start date picker to the current stored value (if any)
    } else {
      this.startPickerElm.setDate(new Date()); // else, set the value of start date picker to today
    }

    if (this.endDate != null) {
      this.endPickerElm.setDate(this.endDate.toDate()); // set the value of end date picker to the current stored value (if any)
    } else {
      this.endPickerElm.setDate(new Date()); // else, set the value of end date picker to today
    }
  },
  watch: {
    startDate: function () { // invoke every time the start date value is changed
      if (this.startDate) {
        this.endPickerElm.setMinDate(this.startDate.toDate()); // change the first date selectable in the end date picker to the start date
      }
    },
    endDate: function () {
      if (this.endDate) {
        this.startPickerElm.setMaxDate(this.endDate.toDate());  // change the last date selectable in the start date picker to the end date
      }
    }
  },
  computed: {
    selected: function () { // whether user has selected any location at all
      return this.$store.state.ActivityPlanning.selected;
    },
    hasSelected: function () { // whether user has selected any location at all
      return Object.keys(this.selected).length > 0;
    },
    hasCompleted: function () { // whether user has completed the basic info form
      return this.hasSelected && this.startDate && this.endDate;
    },
    startDate: { // the start date value is synced with the vuex store
      get: function () {
        return this.$store.state.ActivityPlanning.startDate;
      },
      set: function (value) {
        this.$store.commit('activityPlanningSetTripStartDate', value);
      }
    },
    endDate: { // the end date value is synced with the vuex store
      get: function () {
        return this.$store.state.ActivityPlanning.endDate;
      },
      set: function (value) {
        this.$store.commit('activityPlanningSetTripEndDate', value);
      }
    }
  },
  methods: {
    submit: function () { // commit the form
      this.$store.commit('activityPlanningSetCommitted', true);
    },
    reset: function () { // reset the form to the initial state
      this.$store.commit('activityPlanningSetCommitted', false);
      this.startDate = null;
      this.endDate = null;
      this.startPickerElm.setDate(new Date()); // set to today
      this.endPickerElm.setDate(new Date()); // set to today
    }
  }
};
</script>