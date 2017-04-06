<name>activity-planning-trip-tab-detailed-plan</name>

<template>
  <div class="tab-detailed-plan-container">
    <!-- uncommitted -->
    <md-card-content v-if="!hasCommitted">
      <p>Please confirm the basic information before proceeding to this step.</p>
    </md-card-content>

    <!-- committed -->
    <md-card-content v-if="hasCommitted">

      <!-- timetable -->
      <div class="timetable-container">
        <div class="timetable-row">
          <div class="timetable-item timetable-indicator">
            Backlog
          </div>
        </div>
        <draggable
          v-model="chips"
          :options="{ filter: '.timetable-indicator' }"
          @change="onMoved">
          <div class="timetable-row" v-for="(chip, index) in chips" :key="chip.id">
            <!-- is actual trip item -->
            <md-card
              v-if="!chip.isIndicator"
              class="timetable-item"
              md-with-hover>
              <md-card-content>
                <div class="md-title">{{chip.label}}</div>
                <div class="md-subtitle">{{chip.subLabel}}</div>
                <md-divider style="margin-top: 10px;"></md-divider>
                <md-layout md-gutter>
                  <md-layout md-flex="50" style="display: flex; align-items: center;">
                    <b style="margin-top: 10px; height: inherit; margin-right: 5px;">From:</b>
                    <vue-timepicker
                      v-model="chip.startTime"
                      format="HH:mm"
                      :minute-interval="15"
                      :ref="`start_${index}`"
                      v-on-clickaway="() => toggleTimepicker(index)" />
                  </md-layout>
                  <md-layout md-flex="50" style="display: flex; align-items: center;">
                    <b style="margin-top: 10px; height: inherit; margin-right: 5px;">To:</b>
                    <vue-timepicker
                      v-model="chip.endTime"
                      format="HH:mm"
                      :minute-interval="15"
                      :ref="`end_${index}`"
                      v-on-clickaway="() => toggleTimepicker(index)" />
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
        <md-button :disabled="!hasCompleted" class="md-raised md-fab md-primary">
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
.time-picker-overlay {
  display: none;
}
.timetable-invalid {
  border: 5px solid rgba(255, 100, 100, 0.3) !important;
  border-style: inset;
  border-radius: 3px;
}
.time-picker input {
  border-bottom: 1px solid rgba(200, 200, 200, 0.3);
  border-radius: 2px;
  background-color: rgba(255, 255, 255, 0.3);
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
import { directive as onClickaway } from 'vue-clickaway';

export default {
  props: ['hasCommitted'],
  data: () => ({
    dates: [],
    chips: [],
    selectedDate: 0
  }),
  directives: {
    onClickaway
  },
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
    },
    hasCompleted: function () {
      return _.every(
        this.chips.map(chip => {
          if (chip.isIndicator) {
            return true;
          }
          return chip.startTime && chip.endTime;
        })
      );
    }
  },
  methods: {
    onMoved: function (change) {
      const { newIndex } = change.moved;
      for (let i = newIndex - 1; i >= 0; i--) {
        // do a reverse search and find an indicator element so as to locate the date
        if (this.chips[i].isIndicator === true) { // found
          this.chips[newIndex].date = this.chips[i].date;
          console.log('location moved to', this.chips[i].date);
          break;
        }
      }
      console.log(this.chips);
    },
    toggleTimepicker: function (index) {
      this.$refs[`start_${index}`][0].showDropdown = false;
      this.$refs[`end_${index}`][0].showDropdown = false;
    },
    updateRange: function () {
      this.dates = [];
      this.chips = [];

      // push selected locations
      _.forEach(this.selected, location => {
        this.chips.push({
          id: location.id,
          label: location.name,
          subLabel: location.description,
          date: null,
          startTime: null,
          endTime: null
        });
      });

      let startDate = moment(this.startDate);
      let endDate = moment(this.endDate);
      let i = 1;
      for(let date = moment(this.startDate); date.diff(this.endDate) < 0; date.add('days', 1)) {
        this.dates.push(date.toDate().toString());
        this.chips.push({
          id: `day_${i}`,
          label: `Day ${i} (${this.toHumanDate(date)})`,
          date: date.toDate().toString(),
          isIndicator: true
        });
        i++;
      }
      this.dates.push(moment(this.endDate).toDate().toString());
      this.chips.push({
        id: `day_${i}`,
        label: `Day ${i} (${this.toHumanDate(this.endDate)})`,
        date: this.endDate.toString(),
        isIndicator: true
       });
    },
    toHumanDate: function (date) {
      return moment(date).format('ll');
    }
  }
};
</script>