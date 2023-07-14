import axios from 'axios';
import {urlBase} from "../constants/contsant";

// Create an instance of axios with custom configuration
const api = axios.create({
    // Your base URL and other configuration options
    baseURL: urlBase,

});

// Add a request interceptor to include the JWT token in headers
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Add a response interceptor to handle token expiration errors
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            // If the token is expired or invalid, redirect to the login page
            localStorage.removeItem('token');
            window.location.href = '/loginForm';
        }
        return Promise.reject(error);
    }
);

export default api;