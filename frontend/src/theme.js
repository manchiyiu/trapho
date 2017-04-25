import Vue from 'vue';
import VueMaterial from 'vue-material';

// import and ask Vue to register vue-material components
Vue.use(VueMaterial);

// config the main theme and color scheme for the website
Vue.material.registerTheme('default', {
  primary: {
    color: 'green',
    hue: 'A700'
  },
  accent: {
    color: 'brown',
    hue: 'A200'
  },
  warn: 'red',
  background: 'white'
});