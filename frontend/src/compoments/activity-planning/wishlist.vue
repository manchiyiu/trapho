<name>activity-planning-wishlist</name>

<template>
  <div>
    <div class="wishlist-card" v-for="location in locations">
      <p class="title">Test</p>
      <md-chip class="common-map-tag" v-for="(tag, index) in location.tags" :key="index">{{tag}}</md-chip>
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
</style>

<script>
import Vue from 'vue';

export default {
  data: () => ({
    locations: [
      {
        "id": "58ccf9e3d914f3000f76f50c",
        "name": "Sha Tin Town Hall",
        "description": "1 Yuen Wo Road, Sha Tin",
        "tags": [
          "city hall",
          "movie theater",
          "local government office",
          "point of interest",
          "establishment"
        ],
        "coordinates": {
          "lng": 114.189895,
          "lat": 22.381263
        }
      },
      {
        "id": "58ccf9e3d914f3000f76f50d",
        "name": "Tsuen Wan Town Hall",
        "description": "72 Tai Ho Road, Tsuen Wan",
        "tags": [
          "city hall",
          "local government office",
          "point of interest",
          "establishment"
        ],
        "coordinates": {
          "lng": 114.1127584,
          "lat": 22.3708814
        }
      }
    ]
  })
};
</script>