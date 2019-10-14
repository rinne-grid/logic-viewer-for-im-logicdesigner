import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { ipcRenderer } from 'electron';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

// background.ts: メイン
// main.ts: レンダラープロセス?
ipcRenderer.on('open_file', (event, msg) => {
  console.log(msg);
});
