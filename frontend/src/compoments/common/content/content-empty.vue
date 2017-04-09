<name>common-content-empty</name>

<template>

  <md-card md-with-hover>
    <md-card-content class="empty-main">
      <md-icon>warning</md-icon>
      <div class="empty-text">
        Oops. Nothing to see here.<br>It seems what you are looking for does not exist.
      </div>
    </md-card-content>
  </md-card>


</template>

<style scoped>
.md-card {
  width: 100%;
  overflow: hidden;
  margin-bottom: 20px;
}
.empty-main {
  margin-top: 20px;
  margin-left: 40px;
  margin-bottom: 20px;
}
.empty-text {
  font-size: 20px;
  font-weight: bolder;
  color: #555;
}
</style>
