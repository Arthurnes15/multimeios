import Axios from 'axios';

const axiosClient = Axios.create({
    baseURL: process.env.REACT_APP_URL
});

axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = token;
        }
        return config;
    }, 
    (error) => console.log(error)
);

export default axiosClient;