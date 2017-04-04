<!--
FUNCTION USER-PROFILE - Function for user edit their personal infomation
PROGRAMMER: Wong Man Yung / Yiu Man CHi
CALLING SEQUENCE: Will automatically direct to when user choose Edit during the photo feed
VERSION: 1
PURPOSE: User could edit the personal information inside the setting
DATA STRUCTURES:  change username - string
                  change password - string
ALGORITHM:  Allow user to change their username and password;
            Then check the validation for the input with information retrive from database;
            if username already exit, alert the user; else change successfully.
-->
<name>user-profile-view</name>

<template>
  <div>
    <h1>
      user id is {{userId}}
    </h1>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  props: ['userId']
};
</script>