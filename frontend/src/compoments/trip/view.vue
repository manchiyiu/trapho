<name>trip-view</name>

<template>
  <div class="trip-container">
    <div style="margin: 20px;">
      <!-- header -->
      <div class="trip-row">
        <md-input-container style="width: 50%">
          <label>Trip name</label>
          <md-input disabled v-model="name"></md-input>
        </md-input-container>
      </div>
      <!-- trip content -->
      <div v-for="(day, index) in days" :key="index">
        <div class="trip-item trip-day-header">{{day.label}}</div>
        <p class="trip-row" v-if="day.locations.length <= 0">
          <b><i>No plan for this day?</i></b>
        <p>
        <div class="trip-row" v-for="location in day.locations">
          <md-card  class="trip-item" md-with-hover>
            <md-card-content>
              <div class="md-title">{{location.name}}</div>
              <div class="md-subtitle">{{location.description}}</div>
              <md-divider style="margin-top: 10px; margin-bottom: 10px;"></md-divider>
              <!-- show time -->
              <div>
                <b style="margin-right: 20px;">From</b>
                <span>{{toHumanTime(location.startTime)}}</span>
              </div>
              <div>
                <b style="margin-right: 20px;">To&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</b>
                <span>{{toHumanTime(location.endTime)}}</span>
              </div>
            </md-card-content>
          </md-card>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.trip-container {
  background-color: #fafafa !important;
  height: 100vh;
  padding: 20px;
  padding-bottom: 200px;
  overflow-y: scroll;
}
.trip-title {
  font-size: 30px;
}
.trip-row {
  display: flex;
  width: 100vw;
  justify-content: center;
}
.trip-item {
  width: 500px;
  max-width: 100vw;
  margin-top: 10px;
  margin-bottom: 10px;
}
.trip-day-header {
  border-top: 1px solid #ddd;
  padding-top: 10px;
  font-weight: bolder;
  font-size: 16px;
  color: #aaa;
  text-align: center;
  min-width: 100vw;
}
</style>

<script>
import Vue from 'vue';
import moment from 'moment';

import { get } from '../../utils.js';

export default {
  props: ['tripId'],
  data: () => ({
    name: '',
    trip: null,
    days: {}
  }),
  beforeMount: async function () {
    try {
      const trip = await get(this.$router, `trips/id/${this.tripId}`);
      this.name = trip.name;
      this.deserializeTrip(trip);
    } catch (e) {
      console.error(e);
    }
  },
  methods: {
    deserializeTrip: async function(trip) {
      const minTime = trip.locations.reduce(
        (a, b) => moment(a.startTime).isBefore(b.startTime) ? a : b
      ).startTime;
      const maxTime = trip.locations.reduce(
        (a, b) => moment(a.endTime).isAfter(b.endTime) ? a: b
      ).endTime;

      let startDate = moment(minTime);
      let endDate = moment(maxTime);

      let i = 0;
      for(let date = moment(startDate); date.diff(endDate) < 0; date.add('days', 1)) {
        Vue.set(this.days, i, {
          label: `Day ${i + 1} (${this.toHumanDate(date)})`,
          date: date.toDate().toString(),
          locations: []
        });
        i++;
      }

      trip.locations.forEach(location => {
         const diff = moment(location.startTime).diff(startDate, 'days');
         Vue.set(this.days[diff].locations, this.days[diff].locations.length, location);
      });

      let locationResults = await _.map(this.days, async (day, index) => {
        let results = await Promise.all(
          day.locations.map(location => get(this.$router, `locations/id/${location.id}`))
        );
        results.forEach((result, i) => {
          Vue.set(
            this.days[index].locations,
            i,
            _.merge(result, this.days[index].locations[i])
          );
        });
      });

    },
    toHumanDate: function (date) {
      return moment(date).format('ll');
    },
    toHumanTime: function (time) {
      return moment(time).format('LLL');
    }
  }
};
</script>