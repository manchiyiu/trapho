import Vue from 'vue';
import VueMaterial from 'vue-material';

Vue.use(VueMaterial);

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