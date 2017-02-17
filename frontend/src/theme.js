import Vue from 'vue';
import VueMaterial from 'vue-material';

Vue.use(VueMaterial);

Vue.material.registerTheme('default', {
  accent: 'green',
  primary: 'blue',
  warn: 'red',
  background: 'white'
});