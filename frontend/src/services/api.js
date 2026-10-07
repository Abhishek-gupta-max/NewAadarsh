import axios from 'axios';
import { storage } from '../utils/storage';

// Backend (Next.js) address. Empty = same domain as the website (relative /api, /uploads).
// Set VITE_API_BASE_URL (e.g. https://api.newadarshmanpower.com) when the backend runs on another domain.
export const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/+$/, '');

const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
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
