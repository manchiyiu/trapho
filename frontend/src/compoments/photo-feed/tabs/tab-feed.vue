<name>photo-feed-tab-feed</name>

<template>
  <div>
    <!--Card 1-->
    <md-layout md-align="center" md-gutter="64">
      <md-card md-with-hover>
        <md-card-header>
          <md-card-header-text>
            <md-avatar><img src="https://avatars1.githubusercontent.com/u/2025246?v=3&s=460" alt="People"></md-avatar>
            <div class="md-title">handsome_isaac</div>
            <div class="md-subhead"><md-icon>location_on</md-icon>Hong Kong</div>
          </md-card-header-text>

          <md-menu md-size="4" md-direction="bottom left">
          <span>10</span>
            <md-icon class="md-primary">star_rate</md-icon>
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

        <md-card-media>
          <img src="https://avatars1.githubusercontent.com/u/2025246?v=3&s=460" alt="People">
        </md-card-media>

        <md-card-content>
          <span><md-icon class="md-primary">favorite</md-icon>10 likes</span>
          <br>
          <span><b>handsome_isaac</b> I guess it is a dog, an IT dog!</span>
          <br>
          <span><b>warrenchan</b> I agree!</span>
        </md-card-content>

        <md-card-actions>
          <md-button class="md-icon-button" @click.native="openDialog('comment_box')"><md-icon>mode_comment</md-icon></md-button>
          <md-dialog-prompt :md-title="prompt.title" :md-ok-text="prompt.ok" :md-cancel-text="prompt.cancel" @open="onOpen" @close="onClose" ref="comment_box"></md-dialog-prompt>
          <md-button class="md-icon-button"><md-icon>favorite</md-icon></md-button>
          <md-button class="md-icon-button"><md-icon>share</md-icon></md-button>
        </md-card-actions>

      </md-card>
    </md-layout>
    <!--Card 2-->
    <md-layout md-align="center" md-gutter="64">
      <md-card md-with-hover>
        <md-card-header>
          <md-card-header-text>
            <md-avatar><img src="http://www.cpr.cuhk.edu.hk/resources/press/photo/5667cc8b9067f.jpg" alt="People"></md-avatar>
            <div class="md-title">funny_michael</div>
            <div class="md-subhead"><md-icon>location_on</md-icon>Taiwan</div>
          </md-card-header-text>

          <md-menu md-size="4" md-direction="bottom left">
          <span>10</span>
            <md-icon class="md-primary">star_rate</md-icon>
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

        <md-card-media>
          <img src="https://www.cpr.cuhk.edu.hk/resources/press/photo/4d5392b8d8c3a.jpg" alt="People">
        </md-card-media>

        <md-card-content>
          <span><md-icon class="md-primary">favorite</md-icon>10 likes</span>
          <br>
          <span><b>funny_michael</b> I really love TY Wong Hall!</span>
          <br>
          <span><b>handsome_isaac</b> Do you mean mole wong?</span>
        </md-card-content>

        <md-card-actions>
          <md-button class="md-icon-button" @click.native="openDialog('comment_box')"><md-icon>mode_comment</md-icon></md-button>
          <md-dialog-prompt :md-title="prompt.title" :md-ok-text="prompt.ok" :md-cancel-text="prompt.cancel" @open="onOpen" @close="onClose" ref="comment_box"></md-dialog-prompt>
          <md-button class="md-icon-button"><md-icon>favorite</md-icon></md-button>
          <md-button class="md-icon-button"><md-icon>share</md-icon></md-button>
        </md-card-actions>

      </md-card>
    </md-layout>
  </div>
</template>

<style>
.md-card .md-card-media img {
  width: 500px;
}
.md-card {
  margin-bottom: 15px;
}
</style>

<script>
export default {
  data: () => ({
    prompt: {
      title: 'Leave your comment',
      ok: 'Submit',
      cancel: 'Cancel',
      id: 'comment',
      name: 'comment',
      placeholder: 'Type your comment here...',
      maxlength: 50,
      value: ''
    }
  }),
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
    }
  }
};
</script>