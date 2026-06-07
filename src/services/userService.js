import api from './api';

export const userService = {
  // Public submissions
  submitApplication: async (formData) => {
    // Requires multipart/form-data for file uploads
    const response = await api.post('/apply.php', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },
  
  submitContactForm: async (contactData) => {
    const response = await api.post('/contact.php', contactData);
    return response.data;
  },

  // Admin application management
  adminGetApplications: async (search = '') => {
    const response = await api.get(`/admin/applications.php?search=${encodeURIComponent(search)}`);
    return response.data;
  },
  
  adminGetApplicationDetail: async (id) => {
    const response = await api.get(`/admin/applications.php?id=${id}`);
    return response.data;
  },
  
  adminUpdateApplicationStatus: async (id, status) => {
    const response = await api.post('/admin/applications.php', {
      action: 'update_status',
      id,
      status
    });
    return response.data;
  },
  
  adminDeleteApplication: async (id) => {
    const response = await api.delete(`/admin/applications.php?id=${id}`);
    return response.data;
  },

  adminGetSettings: async () => {
    const response = await api.get('/admin/settings.php');
    return response.data;
  }
};

export default userService;
