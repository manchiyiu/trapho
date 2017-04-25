import Vue from 'vue';

import Header from './header.vue';
import Map from './map.vue';
import PlanEdit from './plan-edit.vue';

/* content */
import ContentCard from './content/content-card.vue';
import ContentCardList from './content/content-card-list.vue';
import ContentEmpty from './content/content-empty.vue';

// register all the components within this module
Vue.component('common-content-card', ContentCard);
Vue.component('common-content-card-list', ContentCardList);
Vue.component('common-content-empty', ContentEmpty);

Vue.component('common-header', Header);
Vue.component('common-map', Map);

Vue.component('common-plan-edit', PlanEdit);