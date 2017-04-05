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
            <date-picker class="datepicker" :date="startTime" :option="datePickerOption"></date-picker>
          </div>
          <div style="margin-top: 10px;">
            <div style="margin-right: 30px; font-weight: bolder;">End Date</div>
            <date-picker :date="endTime" :option="datePickerOption" :limit="endTimeLimit"></date-picker>
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
.datepicker {
  cursor: pointer !important;
}
</style>

<script>
import Vue from 'vue';
import VueDatepicker from 'vue-datepicker';

export default {
  data: () => ({
    startTime: {
      time: ''
    },
    endTime: {
      time: ''
    },
    datePickerOption: {
      type: 'day',
      week: ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'],
      month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      format: 'YYYY-MM-DD',
      placeholder: 'Select date',
      inputStyle: {
        'display': 'inline-block',
        'padding': '5px',
        'line-height': '22px',
        'font-size': '16px',
        'border': '1px solid #ddd',
        'border-radius': '2px',
        'color': '#5F5F5F',
        'width': '100%'
      },
      color: {
        header: '#ccc',
        headerText: '#333'
      },
      buttons: {
        ok: 'Ok',
        cancel: 'Cancel'
      },
      overlayOpacity: 0.001,
      dismissible: true
    }
  }),
  components: {
    'date-picker': VueDatepicker
  },
  computed: {
    selected: function () {
      return this.$store.state.ActivityPlanning.selected;
    },
    endTimeLimit: function () {
      return [
        {
          type: 'fromto',
          from: this.startTime.time
        }
      ];
    }
  }
};
</script>