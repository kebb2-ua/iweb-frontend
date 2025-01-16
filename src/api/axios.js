import { useAuthStore } from '@/stores/auth';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://iweb.kikisito.com/api/v1',
  headers: {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json'
  },
});

axiosInstance.interceptors.request.use((config) => {
  const authStore = useAuthStore();
  if(authStore.token) {
    config.headers.Authorization = `Bearer ${authStore.token}`;
  }
  return config;
}, (errorMessages) => {
  return Promise.reject(errorMessages);
});

axiosInstance.interceptors.response.use((response) => {
  const authStore = useAuthStore();

  const newToken = response.headers['Authorization'];
  if (newToken) {
    const token = newToken.startsWith('Bearer ') ? newToken.slice(7) : newToken;
    authStore.changeJwtToken(token);
  }

  return response
}, (error) => {
  return Promise.reject(error);
})

export default axiosInstance;
