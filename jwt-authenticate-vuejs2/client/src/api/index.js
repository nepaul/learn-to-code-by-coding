import axios from 'axios';

export default {
  login(reqParams) {
    return axios.post('/auth/sessions', reqParams);
  },
  fetchProfile() {
    return axios.get('/users');
  },
};
