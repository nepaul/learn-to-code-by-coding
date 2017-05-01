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
  login_success({ commit }, { token }) {
    commit(types.LOGIN_SUCCESS, { token });
    API.fetchProfile()
      .then((res) => {
        console.log(res);
        commit(types.FETCH_PROFILE, res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  logout({ commit }) {
    commit(types.LOGOUT);
  },
};
