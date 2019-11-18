import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { ipcRenderer } from 'electron';

import ViewerPane from '@/components/ViewerPane.vue';
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
