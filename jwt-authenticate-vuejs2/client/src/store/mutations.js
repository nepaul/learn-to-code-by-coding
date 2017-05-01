/* eslint no-param-reassign: ["error", { "props": false }] */
import * as types from './mutation-types';


export default {
  [types.LOGIN_SUCCESS](state, { token }) {
    state.isAuthenticated = true;
    state.token = token;
    localStorage.token = token;
  },
  [types.LOGOUT](state) {
    state.isAuthenticate = false;
    state.token = null;
    state.user = null;
  },
  [types.FETCH_PROFILE](state, { user }) {
    state.user = user;
  },
};
