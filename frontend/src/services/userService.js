import api from './api';

export const userService = {
  // Public submissions
  submitApplication: async (formData) => {
    // Requires multipart/form-data for file uploads
    const response = await api.post('/apply', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },
  
  submitContactForm: async (contactData) => {
    const response = await api.post('/contact', contactData);
    return response.data;
  },

  // Admin application management
  adminGetApplications: async (search = '') => {
    const response = await api.get(`/admin/applications?search=${encodeURIComponent(search)}`);
    return response.data;
  },
  
  adminGetApplicationDetail: async (id) => {
    const response = await api.get(`/admin/applications?id=${id}`);
    return response.data;
  },
  
  adminUpdateApplicationStatus: async (id, status) => {
    const response = await api.post('/admin/applications', {
      action: 'update_status',
      id,
      status
    });
    return response.data;
  },
  
  adminDeleteApplication: async (id) => {
    const response = await api.delete(`/admin/applications?id=${id}`);
    return response.data;
  },

  adminGetSettings: async () => {
    const response = await api.get('/admin/settings');
    return response.data;
  }
};

export default userService;
