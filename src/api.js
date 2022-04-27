import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/'
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

