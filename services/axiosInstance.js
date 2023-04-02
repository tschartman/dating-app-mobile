import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

const axiosInstance = axios.create({
  baseURL: 'https://dating-app-868.herokuapp.com/api',
});

// Request interceptor for adding the authentication header
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await SecureStore.getItemAsync('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors (optional)
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log(error)
    // Handle errors, e.g., show a notification or log the error
    return Promise.reject(error);
  }
);

export default axiosInstance;