import Vue from 'vue';

import Logo from './logo.vue';
import Toolbar from './toolbar.vue';
import LoginForm from './login-form.vue';

import View from './view.vue';

Vue.component('login-page-logo', Logo);
Vue.component('login-page-toolbar', Toolbar);
Vue.component('login-page-login-form', LoginForm);

Vue.component('login-page-view', View);
