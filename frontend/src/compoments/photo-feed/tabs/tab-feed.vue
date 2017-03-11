<name>photo-feed-tab-feed</name>

<template>
  <div>
    <!--Card 1-->
    <md-layout md-align="center" md-gutter="64">
      <md-card md-with-hover>
        <md-card-header>
          <md-avatar><img src="https://avatars1.githubusercontent.com/u/2025246?v=3&s=460" alt="People"></md-avatar>
          <div class="md-title">handsome_isaac</div>
          <div class="md-subhead"><md-icon>location_on</md-icon>Hong Kong</div>
        </md-card-header>
        
        <md-card-media>
          <img src="https://avatars1.githubusercontent.com/u/2025246?v=3&s=460" alt="People">
        </md-card-media>

        <md-card-content>
          I guess it is a dog, an IT dog!
        </md-card-content>

        <md-card-actions>
          <md-button class="md-icon-button"><md-icon>mode_comment</md-icon></md-button>
          <md-button class="md-icon-button"><md-icon>favorite</md-icon></md-button>
          <md-button class="md-icon-button"><md-icon>share</md-icon></md-button>
        </md-card-actions>
      </md-card>
    </md-layout>

    <md-layout><span>_</span></md-layout>
    <!--Card 2-->
    <md-layout md-align="center" md-gutter="64">
      <md-card md-with-hover>
          <md-card-header>
            <md-avatar><img src="http://www.cpr.cuhk.edu.hk/resources/press/photo/5667cc8b9067f.jpg" alt="People"></md-avatar>
            <div class="md-title">funny_michael</div>
            <div class="md-subhead"><md-icon>location_on</md-icon>Taiwan</div>
          </md-card-header>
          
          <md-card-media>
            <img src="https://www.cpr.cuhk.edu.hk/resources/press/photo/4d5392b8d8c3a.jpg" alt="People">
          </md-card-media>

          <md-card-content>
            I really love TY Wong Hall!
          </md-card-content>

          <md-card-actions>
            <md-button class="md-icon-button"><md-icon>mode_comment</md-icon></md-button>
            <md-button class="md-icon-button"><md-icon>favorite</md-icon></md-button>
            <md-button class="md-icon-button"><md-icon>share</md-icon></md-button>
          </md-card-actions>
        </md-card>
      </md-layout>
    </md-layout>
  </div>
</template>

<style>
.md-card .md-card-media img {
  width: 500px
}
</style>