// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Promise from 'bluebird';
import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';

import App from './App';
import initStore from './store';
import initRouter from './router';
import initAxios from './api/http';


window.Promise = Promise;
Vue.config.productionTip = false;

const store = initStore();
const router = initRouter(store);
sync(store, router);

const axios = initAxios(store);
Vue.prototype.$http = axios;
Vue.axios = axios;
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});

const token = localStorage.getItem('token');
if (token) {
  store.commit('auth/LOGIN_SUCCESS', { token });
}
