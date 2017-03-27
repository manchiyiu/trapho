<name>activity-planning-wishlist</name>

<template>
  <div>
    <div class="wishlist-card" v-for="location in locations">
      <md-checkbox v-model="selected[location.id]" @change="toggleSelected(location.id)"></md-checkbox>
      <p class="title">{{location.name}}</p>
      <p><i>{{location.description}}</i></p>
      <span class="wishlist-tag" v-for="(tag, index) in location.tags" :key="index">#{{tag}}</span>
    </div>
  </div>
</template>

<style lang="scss">
.wishlist-card {
  background-color: #fafafa;
  border: 1px #f0f0f0 solid;
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
  props: ['locations'],
  computed: {
    selected: function () {
      return this.$store.state.ActivityPlanning.selected;
    }
  },
  methods: {
    toggleSelected: function (locationId) {
      const selected = _.clone(this.selected);
      Vue.set(selected, locationId, !selected[locationId]);
      this.$store.commit('activityPlanningSetSelected', { selected });
    }
  }
};
</script>