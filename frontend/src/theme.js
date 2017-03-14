import Vue from 'vue';
import VueMaterial from 'vue-material';

Vue.use(VueMaterial);

Vue.material.registerTheme('default', {
  primary: {
    color: 'blue',
    hue: 'A200'
  },
  accent: 'yellow',
  warn: 'red',
  background: 'white'
})