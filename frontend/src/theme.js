import Vue from 'vue';
import VueMaterial from 'vue-material';

Vue.use(VueMaterial);

Vue.material.registerTheme('default', {
  primary: {
    color: 'grey',
    hue: 'A200'
  },
  accent: 'red',
  warn: 'red',
  background: {
    color: 'grey',
    hue: 50
  }
})