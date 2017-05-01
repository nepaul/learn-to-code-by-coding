// TODO: move to services dir
import axios from 'axios';

export default {
  login(reqParams) {
    return axios.post('/auth/sessions', reqParams);
  },
  signup(reqParams) {
    return axios.post('/auth/users', reqParams);
  },
  fetchProfile() {
    return axios.get('/users');
  },
};
