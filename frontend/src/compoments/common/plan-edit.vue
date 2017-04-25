<!-- this component allows user to edit the timetable of a trip -->
<name>common-plan-edit</name>

<template>
  <div style="width: 100%;">
  <!-- committed -->
    <md-card-content v-if="!hasSubmitted">

      <!-- timetable -->
      <div>

        <div class="timetable-row">
          <md-input-container style="width: 50%">
            <label>Trip name</label>
            <md-input v-model="tripName"></md-input>
          </md-input-container>
        </div>

        <div class="timetable-row">
          <div class="timetable-item timetable-indicator">
            Backlog
          </div>
        </div>

        <draggable
          v-model="chips"
          :options="sortableOptions"
          @change="onMoved">
          <div class="timetable-row" v-for="(chip, index) in chips" :key="chip.id">
            <!-- is actual trip item, a location item -->
            <md-card
              v-if="!chip.isIndicator"
              class="timetable-item"
              :class="{ 'isInvalid': chip.isInvalid, 'isValid': !chip.isInvalid }"
              md-with-hover>
              <md-card-content>
                <div class="md-title timetable-item-handle">
                  <span>::</span>
                  <!-- location name -->
                  {{chip.label}}
                </div>
                <div class="md-subtitle">{{chip.subLabel}}</div>
                <a :href="`#/location/${chip.id}`"target="_blank">(View)</a>
                <md-divider style="margin-top: 10px;"></md-divider>
                <!-- location item comment -->
                <md-input-container md-inline>
                  <label>Comment</label>
                  <md-textarea v-model="chip.comment"></md-textarea>
                </md-input-container>
                <!-- start time and end time picker -->
                <md-layout md-gutter v-if="chip.date">
                  <md-layout md-flex="50" style="display: flex; align-items: center;">
                    <b style="margin-top: 10px; height: inherit; margin-right: 5px;">From:</b>
                    <vue-timepicker
                      v-model="chip.startTime"
                      format="HH:mm"
                      :minute-interval="15"
                      :ref="`start_${index}`"
                      hide-clear-button
                      @change="onTimeUpdate"
                      v-on-clickaway="() => toggleTimepicker(index)" />
                  </md-layout>
                  <md-layout md-flex="50" style="display: flex; align-items: center;">
                    <b style="margin-top: 10px; height: inherit; margin-right: 5px;">To:</b>
                    <vue-timepicker
                      v-model="chip.endTime"
                      format="HH:mm"
                      :minute-interval="15"
                      :ref="`end_${index}`"
                      hide-clear-button
                      @change="onTimeUpdate"
                      v-on-clickaway="() => toggleTimepicker(index)" />
                  </md-layout>
                </md-layout>
              </md-card-content>
            </md-card>
            <!-- is indicator item, i.e. not a location item -->
            <div v-if="chip.isIndicator" class="timetable-item timetable-indicator">
              {{chip.label}}
            </div>
          </div>
        </draggable>
      </div>

      <!-- button to submit all changes -->
      <div class="tab-detailed-plan-submit">
        <md-divider></md-divider>
        <md-button @click.native="submit" :disabled="!hasCompleted" class="md-raised md-fab md-primary">
          <md-icon>check</md-icon>
        </md-button>
      </div>

    </md-card-content>

  </div>

</template>

<style>
.timetable-row {
  display: flex;
  width: 100%;
  justify-content: center;
}
.timetable-item {
  background-color: #fafafa !important;
  user-select: none;
  width: 100vw;
  max-width: 500px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.timetable-item.isValid {
  box-shadow: none;
  border: 1px solid rgba(200, 200, 200, 0.5);
  border-radius: 5px;
}
.timetable-item.isInvalid {
  box-shadow: none;
  border: 1px solid rgba(227, 27, 37, 0.3);
  border-radius: 5px;
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
  props: [
    'data', // trip data
    'updateData', // method to tell parent to update trip data
    'dataTripName', // new trip name
    'updateTripName', // method to tell parent to update new trip name
    'hasCommitted', // whether user has commited the location list
    'createdId' // if trip created, this will be the tripId
  ],
  data: () => ({
    hasSubmitted: false // whether the user has submitted the form
  }),
  directives: {
    onClickaway // a directive for checking if user clicked outside the element
  },
  components: {
    draggable, // drag and drop component
    VueTimepicker // time picker component
  },
  computed: {
    chips: { // this.chips is synced with the parent's data
      get: function () {
        return this.data;
      },
      set: function (data) {
        this.updateData(data);
      }
    },
    tripName: { // this.tripName is synced with the parent's data
      get: function () {
        return this.dataTripName;
      },
      set: function (tripName) {
        this.updateTripName(tripName);
      }
    },
    hasCompleted: function () { // check if the form has been completed, if:
      return this.tripName.trim().length > 0 && _.every( // trip name is not empty
        this.chips.map(chip => { // every location item has a proper start time and end time
          if (chip.isIndicator) {
            return true;
          }
          return chip.startTime.HH
            && chip.startTime.mm
            && chip.endTime.HH
            && chip.endTime.mm
            && !chip.isInvalid;
        })
      );
    },
    sortableOptions: function() { // config for the drag and drop component
      return {
        filter: '.timetable-indicator', // only location item can be dragged
        handle: '.timetable-item-handle', // a drag can only started by dragging the location name
        dragClass: '.timetable-row',
        scroll: true, // enable auto scroll
        scrollSpeed: 10,
        scrollSensitivity: 100,
        scrollFn: (offsetX, offsetY) => {
          document.getElementById('edit-container').scrollTop += offsetY; // auto scroll when the dragged item is at the edge of the screen
        }
      };
    },
  },
  watch: {
    hasCommitted: function () { // when hasCommitted has changed
      this.onTimeUpdate(); // to do a validation to see if any location item value are currently invalid
    },
    chips: function () {
      this.onTimeUpdate(); // to do a validation to see if any location item value are currently invalid
    }
  },
  beforeMount: function () {
    this.onTimeUpdate();
  },
  methods: {
    onMoved: function (change) { // on a location item moved
      const { newIndex } = change.moved;
      for (let i = newIndex - 1; i >= 0; i--) {
        // do a reverse search and find an indicator element so as to locate the date
        if (this.chips[i].isIndicator === true) { // found
          this.chips[newIndex].date = this.chips[i].date;
          break;
        }
      }
      this.onTimeUpdate(); // to do a validation to see if any location item value are currently invalid
    },
    getTimeValue: function (time) { // get the serialized time value from a time object for comparing time
      return parseInt(time.HH) * 60 + parseInt(time.mm);
    },
    onTimeUpdate: function () { // to do a validation to see if any location item value are currently invalid
      if (!this.chips) {
        return;
      }

      this.chips.filter(chip => !chip.isIndicator).forEach(chip => { // filter all non-location-item, and iterate through them
        if (!chip.startTime.HH || !chip.startTime.mm || !chip.endTime.HH || !chip.endTime.mm) {
          Vue.set(chip, 'isInvalid', true);
          return;
        }

        // check if startTime < endTime
        if (this.getTimeValue(chip.startTime) >= this.getTimeValue(chip.endTime)) {
          Vue.set(chip, 'isInvalid', true);
          return;
        }

        const dateHeaderIndex = _.findIndex(this.chips, item => item.date == chip.date);

        // iterate through all the location items within the same date, check if any time conflict
        let isInvalid = false;
        const sameDateLocation = this.chips
          .filter(item =>
            !item.isIndicator &&
            item.date === chip.date &&
            item.id !== chip.id &&
            item.startTime && item.startTime.HH && item.startTime.mm &&
            item.endTime && item.endTime.HH && item.endTime.mm
          );
        sameDateLocation.forEach(other => {
          const otherStartTime = this.getTimeValue(other.startTime);
          const otherEndTime = this.getTimeValue(other.endTime);
          const myStartTime = this.getTimeValue(chip.startTime);
          const myEndTime = this.getTimeValue(chip.endTime);
          if (myStartTime < otherEndTime && otherStartTime < myEndTime) {
            isInvalid = true;
          }
        });

        Vue.set(chip, 'isInvalid', isInvalid); // flag the location item as invalid if it is invalid
      });
    },
    toggleTimepicker: function (index) { // close the time picker component
      this.$refs[`start_${index}`][0].showDropdown = false;
      this.$refs[`end_${index}`][0].showDropdown = false;
    },
    submit: function () { // on user clicking submit
      this.$emit('submit'); // emit a submit event for parent to catch
      this.hasSubmitted = true;
    }
  }
};
</script>