import api from './api';
import { storage } from '../utils/storage';

export const authService = {
  login: async (username, password) => {
    try {
      const response = await api.post('/admin/login.php', { username, password });
      const { token, success } = response.data;
      
      if (success && token) {
        storage.set('auth_token', token);
        storage.set('auth_user', username);
        return { success: true, username };
      }
      return { success: false, error: 'Login failed' };
    } catch (error) {
      const msg = error.response?.data?.error || 'Invalid credentials!';
      return { success: false, error: msg };
    }
  },
  
  logout: () => {
    storage.remove('auth_token');
    storage.remove('auth_user');
    return true;
  },
  
  getCurrentUser: () => {
    return storage.get('auth_user');
  },
  
  getToken: () => {
    return storage.get('auth_token');
  },
  
  isAuthenticated: () => {
    return !!storage.get('auth_token');
  }
};
export default authService;
