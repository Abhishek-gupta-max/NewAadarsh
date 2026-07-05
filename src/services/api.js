import axios from 'axios';
import { storage } from '../utils/storage';

// Base API URL can be configured via environment variables or default to /api relative path
// For local Node backend, you can change VITE_API_URL in .env (e.g., http://localhost:8000/api)
const VITE_API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: VITE_API_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
});

// Interceptor to attach JWT/token to request headers
api.interceptors.request.use(
  (config) => {
    const token = storage.get('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor to handle authentication errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear storage and redirect to login if unauthorized
      storage.remove('auth_token');
      storage.remove('auth_user');
      
      // Only redirect if we are inside the admin portal
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
