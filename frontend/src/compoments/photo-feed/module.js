import Vue from 'vue';

import Toolbar from './toolbar.vue';

/* search */
import SearchBar from './searchbar.vue';

/* tabs */
import TabFeed from './tabs/tab-feed.vue';
import TabLocations from './tabs/tab-locations.vue';
import TabUpload from './tabs/tab-upload.vue';
import TabVR from './tabs/tab-vr.vue';

/* content */
import ContentCard from './content/content-card.vue';
import ContentCardList from './content/content-card-list.vue';

Vue.component('photo-feed-toolbar', Toolbar);

Vue.component('search-bar', SearchBar);

Vue.component('photo-feed-tab-feed', TabFeed);
Vue.component('photo-feed-tab-locations', TabLocations);
Vue.component('photo-feed-tab-upload', TabUpload);
Vue.component('photo-feed-tab-vr', TabVR);

Vue.component('photo-feed-content-card', ContentCard);
Vue.component('photo-feed-content-card-list', ContentCardList);