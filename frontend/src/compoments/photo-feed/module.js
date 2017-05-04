import Vue from 'vue';

import Toolbar from './toolbar.vue';

/* tabs */
import TabFeed from './tabs/tab-feed.vue';
import TabUpload from './tabs/tab-upload.vue';

// register all the components within this module
Vue.component('photo-feed-toolbar', Toolbar);

Vue.component('photo-feed-tab-feed', TabFeed);
Vue.component('photo-feed-tab-upload', TabUpload);