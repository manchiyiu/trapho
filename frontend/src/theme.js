import Vue from 'vue';
import VueMaterial from 'vue-material';

Vue.use(VueMaterial);

Vue.material.registerTheme('default', {
  primary: {
    color: 'indigo',
    hue: 'A200'
  },
  accent: {
    color: 'yello',
    hue: '500'
  },
  warn: 'red',
  background: 'white'
});