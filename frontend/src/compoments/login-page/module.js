import Vue from 'vue';

import Toolbar from './toolbar.vue';
import LoginForm from './login-form.vue';
import SignupForm from './signup-form.vue';

// register all the components within this module
Vue.component('login-page-toolbar', Toolbar);
Vue.component('login-page-login-form', LoginForm);
Vue.component('login-page-signup-form', SignupForm);
