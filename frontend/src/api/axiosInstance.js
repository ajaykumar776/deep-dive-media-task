import axios from 'axios';

const API_URL = 'http://localhost:8001/api'; // Replace with your Laravel API URL

// Create an Axios instance with default configuration
const axiosInstance = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Function to get the token from localStorage
const getToken = () => localStorage.getItem('token');

// Add a request interceptor to include the token conditionally
axiosInstance.interceptors.request.use(
    config => {
        // Include token only if the request requires authentication
        const authRequired = !['/login', '/register'].includes(config.url);
        if (authRequired) {
            const token = getToken();
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        }
        return config;
    },
    error => Promise.reject(error)
);

export default axiosInstance;
