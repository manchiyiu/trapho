<name>activity-planning-trip-tab-detailed-plan</name>

<template>
  <div class="tab-detailed-plan-container">
    <!-- uncommitted -->
    <md-card-content v-if="!hasCommitted">
      <p>Please confirm the basic information before proceeding to this step.</p>
    </md-card-content>

    <common-plan-edit
      v-if="hasCommitted && !hasSubmitted"
      :createdId="createdId"
      :hasCommitted="hasCommitted"
      :data="chips"
      :updateData="updateChip"
      :dataTripName="tripName"
      :updateTripName="updateTripName"
      @submit="submit" />

    <md-card-content v-if="hasCommitted && createdId">
      <div style="text-align: center; font-size: 20px;">
        <div style="margin-bottom: 20px;">
          <md-icon class="md-size-4x">check</md-icon>
        </div>
        Congrats. Trip created.
        <div style="margin-top: 10px">
          <router-link :to="`trip/${this.createdId}`">View here</router-link>
        </div>
      </div>
    </md-card-content>

  </div>
</template>

<style>
.tab-detailed-plan-container {
  background-color: #fafafa !important;
  height: 100vh;
  margin: -16px;
  padding: 20px;
  padding-bottom: 200px;
  overflow-y: scroll;
}
</style>

<script>
import Vue from 'vue';
import moment from 'moment';
import _ from 'lodash';

import { post } from '../../utils.js';

export default {
  props: ['hasCommitted'],
  data: () => ({
    dates: [],
    chips: [],
    selectedDate: 0,
    tripName: '',
    createdId: null
  }),
  beforeMount: function () {
    this.updateRange();
  },
  watch: {
    hasCommitted: function () {
      this.updateRange();
    }
  },
  computed: {
    startDate: function () {
      return this.$store.state.ActivityPlanning.startDate;
    },
    endDate: function () {
      return this.$store.state.ActivityPlanning.endDate;
    },
    selected: function () {
      return this.$store.state.ActivityPlanning.selected;
    }
  },
  methods: {
    updateChip: function (chips) {
      this.chips = chips;
    },
    updateTripName: function (tripName) {
      this.tripName = tripName;
    },
    updateRange: function () {
      this.chips = [];

      let i = 0;

      // push selected locations
      _.forEach(this.selected, location => {
        Vue.set(this.chips, i, {
          id: location.id,
          label: location.name,
          subLabel: location.description,
          date: null,
          startTime: { HH: null, mm: null },
          endTime: { HH: null, mm: null }
        });
        i++;
      });

      let startDate = moment(this.startDate);
      let endDate = moment(this.endDate);

      let j = 1;
      for(let date = moment(this.startDate); date.diff(this.endDate) < 0; date.add('days', 1)) {
        Vue.set(this.chips, i, {
          id: `day_${j}`,
          label: `Day ${j} (${this.toHumanDate(date)})`,
          date: date.toDate().toString(),
          isIndicator: true
        });
        i++;
        j++;
      }

      Vue.set(this.chips, i, {
        id: `day_${j}`,
        label: `Day ${j} (${this.toHumanDate(this.endDate)})`,
        date: this.endDate.toDate().toString(),
        isIndicator: true
      });
      i++;
    },
    toHumanDate: function (date) {
      return moment(date).format('ll');
    },
    submit: async function () {
      const locations = this.chips
        .filter(item => !item.isIndicator && item.date)
        .map(location => ({
          id: location.id,
          startTime: moment(location.date)
            .hour(location.startTime.HH)
            .minute(location.startTime.mm)
            .toISOString(),
          endTime: moment(location.date)
            .hour(location.endTime.HH)
            .minute(location.endTime.mm)
            .toISOString()
        }));
      try {
        let { id } = await post(this.$router, 'trips', {
          name: this.tripName.trim(),
          timestamp: moment().toISOString(),
          locations
        });
        this.createdId = id;
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>