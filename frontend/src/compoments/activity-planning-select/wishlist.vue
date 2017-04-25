<!-- this component represents one location item in the wishlist -->
<name>activity-planning-wishlist</name>

<template>
  <div style="padding-bottom: 100px;">
    <div class="wishlist-card" v-for="location in locations" :key="location.id">
      <!-- checkbox to allow user to select whether or not to select this location -->
      <md-checkbox :value="!!selected[location.id]" @change="toggleSelected(location)">
      </md-checkbox>
      <!-- location name -->
      <p class="title">{{location.name}}</p>
      <!-- location description -->
      <p><i>{{location.description}}</i></p>
      <!-- location tags -->
      <span class="wishlist-tag" v-for="(tag, index) in location.tags" :key="index">
        #{{tag}}
      </span>
    </div>
  </div>
</template>

<style lang="scss">
.wishlist-card {
  background-color: #fafafa;
  border: 1px #ddd solid;
  margin: 10px;
  padding: 10px;
  p.title {
    color: #333;
    font-size: medium;
    font-weight: bolder;
  }
}
.wishlist-tag {
  margin-right: 5px;
  font-weight: bolder;
  color: #aaa;
}
</style>

<script>
import Vue from 'vue';

export default {
  props: ['locations', 'toggleSelected'], // locations is the list of locations in wishlist, toggleSelected is a function for toggling the selected state for each location item
  computed: {
    selected: function () { // whether or not the user has any location in his/her wishlist
      return this.$store.state.ActivityPlanning.selected;
    }
  }
};
</script>