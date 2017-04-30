import * as types from './mutation-types';
import API from '../api';


export default {
  login({ commit }, payload) {
    API.login(payload)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        this.$message.error(err.error);
        console.log(err);
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
