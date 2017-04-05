<name>activity-planning-trip-tab-detailed-plan</name>

<template>
  <md-card>
    <!-- uncommitted -->
    <md-card-content v-if="!hasCommitted">
      <p>Please confirm the basic information before proceeding to this step.</p>
    </md-card-content>
    <!-- committed -->
    <md-card-content v-if="hasCommitted">
      <md-input-container>
        <label for="date">Date</label>
        <md-select v-model="selectedDate">
          <md-option
            :key="index"
            :value="index"
            v-for="(date, index) in dates">
            Day {{index + 1}} ({{toHumanDate(date)}})
          </md-option>
        </md-select>
      </md-input-container>
    </md-card-content>
  </md-card>
</template>

<script>
import Vue from 'vue';
import moment from 'moment';

export default {
  props: ['hasCommitted'],
  data: () => ({
    dates: [],
    selectedDate: 0
  }),
  mounted: function () {
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
    }
  },
  methods: {
    updateRange: function () {
      this.dates = [];

      let startDate = moment(this.startDate);
      let endDate = moment(this.endDate);
      for(let date = moment(this.startDate); date.diff(this.endDate) < 0; date.add('days', 1)) {
        this.dates.push(date.toDate());
      }
      this.dates.push(moment(this.endDate).toDate());
    },
    toHumanDate: function (date) {
      return moment(date).format('ll');
    }
  }
};
</script>