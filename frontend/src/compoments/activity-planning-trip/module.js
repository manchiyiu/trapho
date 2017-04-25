import Vue from 'vue';

import TabBasicInfo from './tab-basic-info.vue';
import TabDetailedPlan from './tab-detailed-plan.vue';

// register all the components within this module
Vue.component('activity-planning-trip-tab-basic-info', TabBasicInfo);
Vue.component('activity-planning-trip-tab-detailed-plan', TabDetailedPlan);