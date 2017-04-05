<name>activity-planning-trip-tab-basic-info</name>

<template>
  <md-card>
    <md-card-content>
      <!-- trip info -->
      <div>
        <b>Trip Information</b>
        <md-divider></md-divider>
        <div style="margin-top: 20px; border-left: 1px solid #ccc; padding-left: 15px;">
          <i>When will you have the trip? Select a start date and end date so you can start planning your trip.</i>
          <div style="margin-top: 20px;">
            <div style="margin-right: 24px; font-weight: bolder;">Start Date</div>
            <input class="date-input" type="text" id="start-picker">
          </div>
          <div style="margin-top: 10px;">
            <div style="margin-right: 30px; font-weight: bolder;">End Date</div>
            <input class="date-input" type="text" id="end-picker">
          </div>
        </div>
      </div>

      <!-- trip info -->
      <div style="margin-top: 30px;">
        <b>Time Planning</b>
        <md-divider></md-divider>
        <div style="margin-top: 20px; border-left: 1px solid #ccc; padding-left: 15px;">
          <div style="margin-top: 20px;">
            <md-chip v-for="location in selected" key="location.id" class="activity-planning-trip-chip">
              {{location.name}}
            </md-chip>
          </div>
        </div>
      </div>

    </md-card-content>
  </md-card>

</template>

<style>
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
</style>

<script>
import Vue from 'vue';
import pikaday from 'pikaday';
import _ from 'lodash';

export default {
  data: () => ({
    startPickerElm: null,
    endPickerElm: null,
    startDate: new Date(),
    endDate: new Date()
  }),
  watch: {
    startDate: function () {
      console.log('updated', this.startDate);
      this.endPickerElm.setMinDate(this.startDate.toDate());
    }
  },
  mounted: function () {
    const self = this;
    this.startPickerElm = new pikaday({
      bound: true,
      field: document.getElementById('start-picker'),
      onSelect: function () { self.startDate = this.getMoment(); }
    });
    this.endPickerElm = new pikaday({
      field: document.getElementById('end-picker'),
      onSelect: function () { self.endDate = this.getMoment(); }
    });
  },
  computed: {
    selected: function () {
      return this.$store.state.ActivityPlanning.selected;
    }
  }
};
</script>