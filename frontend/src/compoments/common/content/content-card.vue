<name>common-content-card</name>

<template>

  <lazy-component style="width: 100%">

    <md-card md-with-hover>

      <md-card-header>
        <md-card-header-text>
          <md-avatar class="md-avatar-icon">
            <md-icon>photo</md-icon>
          </md-avatar>
          <div class="md-title" @click="gotoProfile">{{username}}</div>
          <div
            class="md-subhead"
            style="height: 20px; overflow: hidden; text-overflow: ellipsis;">
            <md-icon>location_on</md-icon>{{locationName}}
          </div>
        </md-card-header-text>
        <!--
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
        </md-menu>-->
      </md-card-header>

      <md-card-content>
        {{description}}
        <i style="color: #aaa; margin-left: 10px;">
          {{toHumanTime(timestamp)}}
        </i>
      </md-card-content>

      <md-card-media>
        <progressive-img :src="actualPhotoUrl"></progressive-img>
      </md-card-media>

      <md-card-content>
        <p class="md-subheading">
          Comments
          <a @click="openDialog('comment_box')" href="javascript: void(0);">(+)</a>
        </p>
        <md-divider style="margin-bottom: 10px;"></md-divider>
        <div style="padding-left: 15px">
          <div v-if="comments.length <= 0"><i>Be the first to leave a comment!</i></div>
          <div v-for="comment in comments">
            <div>
              <b>{{comment.username + ' '}}</b>
              {{comment.content}}
              <i style="color: #aaa; margin-left: 10px;">
                {{toHumanTimeFromUnix(comment.timestamp)}}
              </i>
            </div>
          </div>
        </div>
      </md-card-content>

      <div>
        <md-button class="content-card-button" @click.native="onLike">
          <md-icon :class="{'liked': this.liked}">favorite</md-icon>
          <b :class="{'liked': this.liked}">{{likesCount + extraCount}}</b>
        </md-button>
        <md-dialog-prompt
          v-model="commentValue"
          md-title="Leave your comment"
          md-ok-text="Submit"
          md-cancel-text="Cancel"
          @close="onCommentClose"
          ref="comment_box">
        </md-dialog-prompt>
      </div>

    </md-card>

  </lazy-component>

</template>

<style scoped>
.md-card .md-card-media img {
  width: 100%;
}
.md-card {
  width: 100%;
  overflow: hidden;
  margin-bottom: 20px;
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
.content-card-button {
  margin: 2px;
}
</style>

<script>
import Vue from 'vue';
import moment from 'moment';

import { getPhotoUrl, get, post, del } from '../../../utils.js';

export default {
  props: [
    'photoId',
    'username',
    'userId',
    'locationName',
    'timestamp',
    'likesCount',
    'photoUrl',
    'description',
    'comments'
  ],
  methods: {
    openDialog: function (ref) {
      this.$refs[ref].open();
    },
    closeDialog: function (ref) {
      this.$refs[ref].close();
    },
    gotoProfile: function () {
      this.$router.push(`/profile/${this.userId}`);
    },
    onCommentClose: async function (state) {
      if (state === 'ok') {
        // submit comments
        try {
          await post(this.$router, `comments`, {
            photoId: this.photoId,
            timestamp: new Date().getTime(),
            content: this.commentValue
          });
          this.comments.push({
            username: this.username,
            content: this.commentValue
          });
        } catch (e) {
          console.error(e);
        }
      }
      this.commentValue = '';
    },
    onLike: async function () {
      if (this.liked) {
        // unlike
        try {
          await del(this.$router, `likes`, { photoId: this.photoId });
        } catch (e) {
          console.error(e);
        }
        this.liked = false;
        if (this.extraCount == 1) {
          this.extraCount = 0;
        } else {
          this.extraCount = -1;
        }
      } else {
        // like
        try {
          var result = await post(this.$router, `likes`, { photoId: this.photoId });
        } catch (e) {
          if (result.error !== 'likeExist') { throw e; }
        }
        this.liked = true;
        if (this.extraCount == -1) {
          this.extraCount = 0;
        } else {
          this.extraCount = 1;
        }
      }
    },
    toHumanTimeFromUnix: function (timestamp) {
      return moment.unix(timestamp / 1000).fromNow();
    },
    toHumanTime: function (timestamp) {
      return moment(timestamp).fromNow();
    }
  },
  data: () => ({
    liked: false,
    extraCount: 0,
    commentValue: ''
  }),
  beforeMount: async function () {
    try {
      var { liked } = await get(
        this.$router,
        `likes/users/${this.userId}/photos/${this.photoId}`
      );
      this.liked = liked;
    } catch (e) {
      this.liked = false;
    }
  },
  computed: {
    actualPhotoUrl: function () {
      return getPhotoUrl(this.photoUrl);
    },
    userId: function () {
      return this.$store.state.User.info.id;
    },
    username: function () {
      return this.$store.state.User.info.username;
    }
  }
};
</script>