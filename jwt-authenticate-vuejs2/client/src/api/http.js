/* eslint no-param-reassign: ["error", { "props": false }] */
import axios from 'axios';

export default (store) => {
  axios.defaults.baseURL = '/api/v1';

  axios.interceptors.request.use(
    (config) => {
      if (store.state.token) {
        config.headers.Authorization = `Bearer ${store.state.token}`;
      }
      return config;
    },
    err => Promise.reject(err),
  );
  axios.interceptors.response.use(
    response => response,
    (err) => {
      if (err.response) {
        switch (err.response.status) {
          case 401:
            {
              store.dispatch('logout');
              break;
            }
          default:
            {
              break;
            }
        }
      }
      return Promise.reject(err.response.data);
    },
  );

  return axios;
};
