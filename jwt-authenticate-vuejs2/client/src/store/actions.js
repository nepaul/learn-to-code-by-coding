import * as types from './mutation-types';
import API from '../api';


export default {
  login({ commit }, payload) {
    return new Promise((resolve, reject) => {
      API.login(payload)
        .then((res) => {
          commit(types.LOGIN_SUCCESS, { token: res.data.token });
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  signup({ commit }, payload) {
    return new Promise((resolve, reject) => {
      API.signup(payload)
        .then((res) => {
          // commit(types.LOGIN_SUCCESS, { token: res.data });
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  fetchProfile({ commit }) {
    API.fetchProfile()
      .then((res) => {
        commit(types.FETCH_PROFILE, { user: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  logout({ commit }) {
    commit(types.LOGOUT);
  },
};
