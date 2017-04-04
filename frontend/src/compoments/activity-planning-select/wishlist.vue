<!--
FUNCTION WISHLIST - Function for user edit their wishlist
PROGRAMMER: Wong Man Yung / Yiu Man CHi
CALLING SEQUENCE: Will automatically direct to when user choose manage their wishlist
VERSION: 1
PURPOSE: User could edit their wishlist by different filter, for which photo is the liked photo during photo feed
DATA STRUCTURES:  like - integer
                  comment - string
                  share - string copied
ALGORITHM:  Allow user to manage their wishlst with different filter, photos are retrived from the database;
            Allow user to like or comment or share theri liked photo;
            User could also choose PLAN; hence direct to the planning page.
-->

<name>activity-planning-wishlist</name>

<template>
  <div style="padding-bottom: 100px;">
    <div class="wishlist-card" v-for="location in locations" :key="location.id">
      <md-checkbox :value="!!selected[location.id]" @change="toggleSelected(location)">
      </md-checkbox>
      <p class="title">{{location.name}}</p>
      <p><i>{{location.description}}</i></p>
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
  props: ['locations', 'toggleSelected'],
  computed: {
    selected: function () {
      return this.$store.state.ActivityPlanning.selected;
    }
  }
};
</script>