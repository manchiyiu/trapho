<name>photo-content-card</name>

<template>

  <lazy-component>
    <md-card>

      <md-card-header>
        <md-card-header-text>
          <md-avatar class="md-avatar-icon">
            <md-icon>photo</md-icon>
          </md-avatar>
          <div class="md-title">{{username}}</div>
          <div
            class="md-subhead"
            style="height: 20px; overflow: hidden; text-overflow: ellipsis;">
            <md-icon>location_on</md-icon>{{locationName}}
          </div>
        </md-card-header-text>
        <span class="likes">
          {{likesCount}}&nbsp;
          <span v-if="likesCount <= 1">like</span>
          <span v-if="likesCount > 1">likes</span>
        </span>
        <md-menu md-size="4" md-direction="bottom left">
          <md-button class="md-icon-button" md-menu-trigger><md-icon>more_vert</md-icon></md-button>
          <md-menu-content>
            <md-menu-item>
              <span>Edit</span>
              <md-icon>mode_edit</md-icon>
            </md-menu-item>
            <md-menu-item>
              <span>Delete</span>
              <md-icon>delete</md-icon>
            </md-menu-item>
          </md-menu-content>
        </md-menu>
      </md-card-header>

      <md-card-content>
        {{description}}
      </md-card-content>

      <md-card-media>
        <progressive-img :src="actualPhotoUrl"></progressive-img>
      </md-card-media>

      <md-card-content v-if="comments.length > 0">
        <p class="md-subheading">Comments</p>
        <md-divider style="margin-bottom: 10px;"></md-divider>
        <div v-for="comment in comments">
          <div><b>{{comment.userName + ' '}}</b>{{comment.content}}</div>
        </div>
      </md-card-content>

      <md-card-actions>
        <md-button class="md-icon-button" @click.native="openDialog('comment_box')">
          <md-icon>mode_comment</md-icon>
        </md-button>
        <md-dialog-prompt
          :value="commentValue"
          md-title="Leave your comment"
          md-ok-text="Submit"
          md-cancel-text="Cancel"
          @open="onOpen"
          @close="onClose"
          ref="comment_box">
        </md-dialog-prompt>
        <md-button class="md-icon-button" @click.native="onLike">
          <md-icon :class="{'liked': this.liked}">favorite</md-icon>
        </md-button>
      </md-card-actions>

    </md-card>

  </lazy-component>

</template>

<style>
.md-card .md-card-media img {
  max-width: 90vw;
  width: 800px;
}
.md-card {
  max-width: 90vw;
  width: 800px;
  margin: 15px;
  overflow: hidden;
}
.likes {
  display: flex;
  align-items: center;
  font-weight: bolder;
  margin-right: 5px;
}
.liked {
  color: #f44336 !important;
}
</style>

<script>
import Vue from 'vue';
import { getPhotoUrl, get, post, del } from '../../../utils.js';

export default {
  props: [
    'photoId',
    'username',
    'locationName',
    'likesCount',
    'photoUrl',
    'description',
    'comments'
  ],
  methods: {
    openDialog(ref) {
      this.$refs[ref].open();
    },
    closeDialog(ref) {
      this.$refs[ref].close();
    },
    onOpen() {
      console.log('Opened');
    },
    onClose(type) {
      console.log('Closed', type);
    },
    onLike: async function () {
      if (this.liked) {
        // unlike
        try {
          var result = await del(this.$router, `likes`, { photoId: this.photoId });
        } catch (e) {
          // ???
        }
        this.liked = false;
      } else {
        // like
        try {
          var result = await post(this.$router, `likes`, { photoId: this.photoId });
        } catch (e) {
          if (result.error !== 'likeExist') { throw e; }
        }
        this.liked = true;
      }
    }
  },
  data: () => ({
    liked: false,
    commentValue: ''
  }),
  beforeMount: async function () {
    // try {
    //   var result = await get(
    //     this.$router,
    //     `likes/users/${this.userId}/photos/${this.photoId}`
    //   );
    //   this.liked = true;
    // } catch (e) {
    //   // if (result.error === 'likeNotExist') {
    //   //   this.liked = true;
    //   // }
    //   this.liked = false;
    // }
  },
  computed: {
    actualPhotoUrl: function () {
      return getPhotoUrl(this.photoUrl);
    },
    userId: function () {
      return this.$store.state.User.info.id;
    }
  }
};
</script>