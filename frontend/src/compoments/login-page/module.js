import Vue from 'vue';

import Logo from './logo.vue';
import Toolbar from './toolbar.vue';
import LoginForm from './login-form.vue';
import SignupForm from './signup-form.vue';
import SignupForm2 from './signup2-form.vue';
import wishlist from './wish-list.vue';

Vue.component('login-page-logo', Logo);
Vue.component('login-page-toolbar', Toolbar);
Vue.component('login-page-login-form', LoginForm);
Vue.component('login-page-signup-form', SignupForm);
Vue.component('login-page2-signup-form', SignupForm2);
Vue.component('wish-list', wishlist);