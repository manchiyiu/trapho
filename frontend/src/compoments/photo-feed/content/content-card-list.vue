<name>photo-feed-content-card-list</name>

<template>
  <md-layout md-gutter>
    <md-layout md-column>
      <div v-for="photo in photos" class="content-card-main">
        <photo-feed-content-card
          :photoId="photo.id"
          :userName="photo.userName"
          :locationName="photo.locationName"
          :likesCount="photo.likesCount"
          :photoUrl="photo.url"
          :description="photo.description"
          :comments="photo.comments">
        </photo-feed-content-card>
      </div>
    </md-layout>
  </md-layout>
</template>

<style scoped>
.content-card-main {
  width: 100vw;
  display: flex;
  justify-content: center;
}
</style>

<script>
import Vue from 'vue';
import * as _ from 'lodash';

export default {
  data: () => ({
    grow: [3, 2],
    photos: {
      'p01': {
        'id': 'p01',
        'userName': 'handsome_isaac',
        'locationName': 'Hong Kong',
        'timestamp': '2017-03-02T16:39:27+00:00',
        'url': 'https://avatars1.githubusercontent.com/u/2025246?v=3&s=460',
        'description': 'Wow. This is amazing.',
        'likesCount': 10,
        'comments': [
          { 'userName': 'funny_warren', 'body': 'this is fun' }
        ]
      },
      'p02': {
        'id': 'p02',
        'userName': 'funny_warren',
        'locationName': 'Mainland China',
        'timestamp': '2017-03-02T16:39:27+00:00',
        'url': 'http://cdn2.i-scmp.com/sites/default/files/styles/980x551/public/images/methode/2016/05/26/93f484f4-2280-11e6-80b1-a87df553e801_1280x720.JPG?itok=w5hPrrWW',
        'description': 'Wow. This is actually fine.',
        'likesCount': 1,
        'comments': [
          { 'userName': 'really_funny_warren', 'body': 'this is funny' }
        ]
      },
      'p03': {
        'id': 'p02',
        'userName': 'funny_warren',
        'locationName': 'Mainland China',
        'timestamp': '2017-03-02T16:39:27+00:00',
        'url': 'http://cdn2.i-scmp.com/sites/default/files/styles/980x551/public/images/methode/2016/05/26/93f484f4-2280-11e6-80b1-a87df553e801_1280x720.JPG?itok=w5hPrrWW',
        'description': 'Wow. This is actually fine.',
        'likesCount': 1,
        'comments': [
          { 'userName': 'really_funny_warren', 'body': 'this is funny' }
        ]
      },
      'p04': {
        'id': 'p02',
        'userName': 'funny_warren',
        'locationName': 'Mainland China',
        'timestamp': '2017-03-02T16:39:27+00:00',
        'url': 'http://cdn2.i-scmp.com/sites/default/files/styles/980x551/public/images/methode/2016/05/26/93f484f4-2280-11e6-80b1-a87df553e801_1280x720.JPG?itok=w5hPrrWW',
        'description': 'Wow. This is actually fine.',
        'likesCount': 1,
        'comments': [
          { 'userName': 'really_funny_warren', 'body': 'this is funny' }
        ]
      }
    }
  })
};
</script>