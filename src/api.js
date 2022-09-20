import axios from 'axios';

const api = axios.create({
    baseURL: 'https://smart-ear-trainer-api.herokuapp.com/'
});

api.interceptors.request.use(
    config => {
    //   const { origin } = new URL("http://localhost:5000/"+config.url);
    //   const allowedOrigins = ["http://localhost:5000/"];
        const token = localStorage.getItem('token');
        config.headers.Authorization = token;
        return config;
    },
    error => {
      return Promise.reject(error);
    }
);

export default api;

