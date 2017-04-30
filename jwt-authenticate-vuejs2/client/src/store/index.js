import Vue from 'vue';
import Vuex from 'vuex';

import state from './state';
import getters from './getters';
import mutations from './mutations';
import actions from './actions';
import * as modules from './modules';


export default () => {
  Vue.use(Vuex);

  const isDebug = process.env.NODE_ENV !== 'production';
  const store = new Vuex.Store({
    state,
    getters,
    actions,
    mutations,
    modules,
    strict: isDebug,
  });

  return store;
};
