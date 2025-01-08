import axios from 'axios';

const { VITE_URL } = import.meta.env; 

export const axiosInstance = axios.create({ 
    baseURL: VITE_URL,
    withCredentials: true, 
});


axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('userToken'); 
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; 
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.error("API Error:", error.response.data);
        }
        return Promise.reject(error);
    }
);
