<name>activity-planning-trip-tab-detailed-plan</name>

<template>
  <div class="tab-detailed-plan-container">
    <!-- uncommitted -->
    <md-card-content v-if="!hasCommitted">
      <p>Please confirm the basic information before proceeding to this step.</p>
    </md-card-content>

    <!-- committed -->
    <md-card-content v-if="hasCommitted">
      <!-- selected element -->
      <!--
      <md-input-container>
        <label for="date">Date</label>
        <md-select v-model="selectedDate">
          <md-option :key="index" :value="index" v-for="(date, index) in dates">
            Day {{index + 1}} ({{toHumanDate(date)}})
          </md-option>
        </md-select>
      </md-input-container>
      -->

      <!-- timetable -->
      <div class="timetable-container">
        <div class="timetable-row">
          <div class="timetable-item timetable-indicator">
            Backlog
          </div>
        </div>
        <draggable v-model="chips" :options="{ filter: '.timetable-indicator' }">
          <div class="timetable-row" v-for="(chip, index) in chips" :key="index">
            <!-- is actual trip item -->
            <md-card v-if="!chip.isIndicator" class="timetable-item" md-with-hover>
              <md-card-content>
                <div class="md-title">{{chip.label}}</div>
                <div class="md-subtitle">{{chip.subLabel}}</div>
                <md-divider style="margin-top: 10px;"></md-divider>
                <md-layout md-gutter>
                  <md-layout md-flex="50" style="display: flex; align-items: center;">
                    <b style="margin-top: 10px; height: inherit; margin-right: 5px;">From:</b>
                    <vue-timepicker></vue-timepicker>
                  </md-layout>
                  <md-layout md-flex="50" style="display: flex; align-items: center;">
                    <b style="margin-top: 10px; height: inherit; margin-right: 5px;">To:</b>
                    <vue-timepicker></vue-timepicker>
                  </md-layout>
                </md-layout>
              </md-card-content>
            </md-card>
            <!-- is indicator item -->
            <div v-if="chip.isIndicator" class="timetable-item timetable-indicator">
              {{chip.label}}
            </div>
          </div>
        </draggable>
      </div>

      <div class="tab-detailed-plan-submit">
        <md-button class="md-raised md-fab md-primary">
          <md-icon>check</md-icon>
        </md-button>
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
.timetable-container {
}
.timetable-row {
  display: flex;
  width: 100%;
  justify-content: center;
}
.timetable-item {
  width: 500px;
  max-width: 100vw;
  margin-top: 10px;
  margin-bottom: 10px;
}
.timetable-indicator {
  border-top: 1px solid #ddd;
  padding-top: 10px;
  font-weight: bolder;
  font-size: 16px;
  color: #aaa;
  text-align: center;
}
.tab-detailed-plan-submit {
  border-top: 1px solid #ddd;
  padding-top: 20px;
  display: flex;
  margin-top: 30px;
  justify-content: center;
}
.time-picker {
  margin-top: 10px;
}
.time-picker input {
  border-bottom: 1px solid #ddd;
  border-radius: 5px;
}
.time-picker .dropdown {
  position: static !important;
}
</style>

<script>
import Vue from 'vue';
import moment from 'moment';
import _ from 'lodash';
import draggable from 'vuedraggable';
import VueTimepicker from 'vue2-timepicker';

export default {
  props: ['hasCommitted'],
  data: () => ({
    dates: [],
    chips: [],
    selectedDate: 0,
  }),
  components: {
    draggable,
    VueTimepicker
  },
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
    },
    selected: function () {
      return this.$store.state.ActivityPlanning.selected;
    }
  },
  methods: {
    updateRange: function () {
      this.dates = [];
      this.chips = [];

      // push selected locations
      _.forEach(this.selected, location => {
        this.chips.push({
          label: location.name,
          subLabel: location.description
        });
      });

      let startDate = moment(this.startDate);
      let endDate = moment(this.endDate);
      let i = 1;
      for(let date = moment(this.startDate); date.diff(this.endDate) < 0; date.add('days', 1)) {
        this.dates.push(date.toDate().toString());
        this.chips.push({ label: `Day ${i}`, isIndicator: true });
        i++;
      }
      this.dates.push(moment(this.endDate).toDate().toString());
      this.chips.push({ label: `Day ${i}`, isIndicator: true });
    },
    toHumanDate: function (date) {
      return moment(date).format('ll');
    }
  }
};
</script>