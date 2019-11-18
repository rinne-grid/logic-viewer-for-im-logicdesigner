import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { ipcRenderer } from 'electron';

import ViewerPane from '@/components/ViewerPane.vue';
Vue.config.productionTip = false;

let globalVue = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

console.log(globalVue);
// ipcRenderer.on('open_ld_file_by_context', (event) => {
//   globalVue.$attrs.
// });
