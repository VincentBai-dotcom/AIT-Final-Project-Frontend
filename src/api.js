import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/'
});

axios.interceptors.request.use(
    config => {
      const { origin } = new URL(config.url);
      const allowedOrigins = ["http://localhost:5000/"];
      const token = localStorage.getItem('token');
      if (allowedOrigins.includes(origin)) {
        config.headers.authorization = `JWT ${token}`;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
);

export default api;

