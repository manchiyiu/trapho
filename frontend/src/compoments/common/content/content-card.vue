<!-- this component is for rendering a photo item in a photo feed -->
<name>common-content-card</name>

<template>

  <lazy-component style="width: 100%" v-if="!isDeleted">

    <md-card md-with-hover>

      <!-- the header row for showing author information -->
      <md-card-header>
        <md-card-header-text>
          <!-- author avatar -->
          <md-avatar>
            <img :src="`https://api.adorable.io/avatars/285/${userId}@adorable.png`"></img>
          </md-avatar>
          <!-- user name -->
          <div class="md-title" @click="gotoProfile(userId)">{{username}}</div>
          <!-- location info -->
          <div
            class="md-subhead"
            style="height: 20px; overflow: hidden; text-overflow: ellipsis;"
            @click="gotoLocation(locationId)">
            <md-icon>location_on</md-icon>{{locationName}}
          </div>
        </md-card-header-text>
        <!-- if the photo is created by the current user, this will be shown -->
        <!-- this menu allows user to edit/delete the photo -->
        <md-menu md-size="4" md-direction="bottom left" v-if="currentUserId == userId">
          <md-button class="md-icon-button" md-menu-trigger><md-icon>more_vert</md-icon></md-button>
          <md-menu-content>
            <md-menu-item @click.native="onEditPost">
              <span>Edit</span>
              <md-icon>mode_edit</md-icon>
            </md-menu-item>
            <md-menu-item @click.native="deletePost">
              <span>Delete</span>
              <md-icon>delete</md-icon>
            </md-menu-item>
          </md-menu-content>
        </md-menu>
      </md-card-header>

      <md-card-content>
        <!-- image description -->
        {{description}}
        <!-- image creation time information -->
        <i style="color: #aaa; margin-left: 10px;">
          {{toHumanTime(timestamp)}}
        </i>
        <!-- list of location tags -->
        <md-divider style="margin-top: 10px;"></md-divider>
        <div style="color: #aaa; margin-top: 10px;" v-if="tags.length > 0">
          <b style="color: #888;">Location tags:</b>
          <i v-for="tag in tags" @click="onLocationTagClicked(tag)">#{{tag}} </i>
        </div>
        <!-- list of photo tags -->
        <div style="color: #aaa; margin-top: 5px;" v-if="photoTags.length > 0">
          <b style="color: #888;">Photos tags:</b>
          <i v-for="tag in photoTags" @click="onPhotoTagClicked(tag)">#{{tag}} </i>
        </div>
      </md-card-content>

      <!-- the image itself, loaded progressively for better user experience -->
      <md-card-media>
        <progressive-img :src="actualPhotoUrl"></progressive-img>
      </md-card-media>

      <!-- comment associated with the photo -->
      <md-card-content>
        <p class="md-subheading">
          Comments
          <a @click="openDialog('comment_box')" href="javascript: void(0);">(+)</a>
        </p>
        <md-divider style="margin-bottom: 10px;"></md-divider>
        <div style="padding-left: 15px">
          <!-- this will be shown if there is no comment -->
          <div v-if="comments.length <= 0"><i>Be the first to leave a comment!</i></div>
          <!-- the list of comments -->
          <div v-for="comment in comments">
            <div>
              <!-- clicking the username will redirect user to user profile page -->
              <b @click="gotoProfile(comment.userId)">{{comment.username + ' '}}</b>
              {{comment.content}}
              <i style="color: #aaa; margin-left: 10px;">
                {{toHumanTimeFromUnix(comment.timestamp)}}
              </i>
            </div>
          </div>
        </div>
      </md-card-content>

      <!-- like button -->
      <div>
        <md-button class="content-card-button" @click.native="onLike">
          <md-icon :class="{'liked': this.liked}">favorite</md-icon>
          <b :class="{'liked': this.liked}">{{likesCount + extraCount}}</b>
        </md-button>
      </div>

      <!-- dialog for adding new comment -->
      <md-dialog-prompt
        v-model="commentValue"
        md-title="Leave your comment"
        md-ok-text="Submit"
        md-cancel-text="Cancel"
        @close="onCommentClose"
        ref="comment_box">
      </md-dialog-prompt>

      <!-- dialog for editing photo description -->
      <md-dialog ref="edit_box">
        <md-dialog-title>Edit photo description</md-dialog-title>
        <md-dialog-content>
          <md-input-container>
            <label>Description</label>
            <md-textarea v-model="descriptionValue"></md-textarea>
          </md-input-container>
        </md-dialog-content>
        <md-dialog-actions>
          <md-button class="md-primary" @click.native="closeDialog('edit_box')">Cancel</md-button>
          <md-button class="md-primary" @click.native="editPost">Edit</md-button>
        </md-dialog-actions>
      </md-dialog>

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

import { getPhotoUrl, get, post, del, patch } from '../../../utils.js';

export default {
  props: [ // the following props should be obvious enough for what they represents
    'photoId',
    'photoTags',
    'username',
    'userId',
    'locationId',
    'locationName',
    'timestamp', // photo creation time
    'likesCount',
    'photoUrl',
    'description',
    'comments'
  ],
  methods: {
    openDialog: function (ref) { // function for opening a new dialog according to the dialog id
      this.$refs[ref].open();
    },
    closeDialog: function (ref) { // function for closing a new dialog according to the dialog id
      this.$refs[ref].close();
    },
    gotoProfile: function (userId) { // function for redirection to user profile page
      this.$router.push(`/profile/${userId}`);
    },
    gotoLocation: function (locationId) {  // function for redirection to location page
      this.$router.push(`/location/${locationId}`);
    },
    onCommentClose: async function (state) { // triggered when a comment dialog has been closed
      if (state === 'ok') { // the user clicked "OK" to close the dialog
        // submit comments
        try {
          await post(this.$router, `comments`, { // send the comment to backend
            photoId: this.photoId,
            timestamp: new Date().getTime(),
            content: this.commentValue
          });
          this.comments.push({ // add the new comments to the local comment lists for display
            username: this.currentUsername,
            content: this.commentValue,
            timestamp: new Date()
          });
        } catch (e) {
          console.error(e);
        }
      }
      this.commentValue = ''; // clear the comment dialog input value
    },
    onLike: async function () { // triggered when user likes a photo
      if (this.liked) { // if the image is initially liked
        // unlike
        try {
          await del(this.$router, `likes`, { photoId: this.photoId }); // tell backend to delete the like record
        } catch (e) {
          console.error(e);
        }
        this.liked = false; // set the local like state to false
        if (this.extraCount == 1) {
          this.extraCount = 0;
        } else {
          this.extraCount = -1; // deduct the like count by 1
        }
      } else { // this image is initally not liked
        // like
        try {
          var result = await post(this.$router, `likes`, { photoId: this.photoId }); // tell backend to like the photo
        } catch (e) {
          if (result.error !== 'likeExist') { throw e; }
        }
        this.liked = true;
        if (this.extraCount == -1) {
          this.extraCount = 0;
        } else {
          this.extraCount = 1; // add the like count by 1
        }
      }
    },
    toHumanTimeFromUnix: function (timestamp) { // convert UNIX time to human relative time
      return moment.unix(timestamp / 1000).fromNow();
    },
    toHumanTime: function (timestamp) { // convert JS time to human relative time
      return moment(timestamp).fromNow();
    },
    onEditPost: function () { // triggered when user click "edit post"
      this.descriptionValue = this.description; // copy the current description value to the dialog input value
      this.openDialog('edit_box'); // open the edit dialog
    },
    editPost: async function () { // triggered when user submit an "edit post" dialog
      try {
        await patch(this.$router, `photos/id/${this.photoId}`, { // tell backend to update the description
          description: this.descriptionValue
         });
        this.description = this.descriptionValue;
        this.descriptionValue = ''; // reset the description dialog value
        this.closeDialog('edit_box'); // close the dialog
      } catch (e) {
        console.error(e);
      }
    },
    deletePost: async function () { // triggered when user click "delete post"
      try {
        await del(this.$router, `photos/id/${this.photoId}`); // tell backend to delete post
        this.isDeleted = true;
      } catch (e) {
        console.error(e);
      }
    },
    loadTags: async function (locationId = this.locationId) { // to retrieve the list of location tags from backend
      try {
        let { tags } = await get(this.$router, `locations/id/${locationId}`, { locationId });
        this.tags = tags;
      } catch (e) {
        console.error(e);
      }
    },
    onLocationTagClicked: function (tag) { // triggered when location tags clicked
      this.$emit('onLocationTagClicked', tag); // emit events for parent compoent to catch
    },
    onPhotoTagClicked: function (tag) { // triggered when photo tags clicked
      this.$emit('onPhotoTagClicked', tag); // emit events for parent compoent to catch
    }
  },
  data: () => ({
    liked: false, // whether the user has liked the photo
    extraCount: 0, // the delta of like count due to user's like actions on the photo after page load
    commentValue: '', // dialog value for create comment dialog
    descriptionValue: '', // dialog value for edit description dialog
    isDeleted: false, // whether the image has been deleted
    tags: {} // list of location tags
  }),
  beforeMount: async function () { // before the component has mounted, load the list of location tags and whether user has liked the photo
    await this.loadTags(); // load list of location tags
    try {
      var { liked } = await get(
        this.$router,
        `likes/users/${this.currentUserId}/photos/${this.photoId}` // load whether user has liked the photo
      );
      this.liked = liked;

    } catch (e) {
      this.liked = false; // in case of any error, just assume user has not liked the photo
    }
  },
  computed: {
    actualPhotoUrl: function () { // the actual url of the photo calculated from the photoURL from backend
      return getPhotoUrl(this.photoUrl);
    },
    currentUserId: function () { // id of current user
      return this.$store.state.User.info.id;
    },
    currentUsername: function () { // username of current user
      return this.$store.state.User.info.username;
    }
  }
};
</script>