import api from './api';

export const jobService = {
  // Public APIs
  getJobs: async () => {
    const response = await api.get('/jobs.php');
    return response.data;
  },
  
  getJobDetail: async (slug) => {
    const response = await api.get(`/jobs.php?slug=${slug}`);
    return response.data;
  },

  // Admin CRUD APIs
  adminGetJobs: async () => {
    const response = await api.get('/admin/requirements.php');
    return response.data;
  },
  
  adminGetJobDetail: async (id) => {
    const response = await api.get(`/admin/requirements.php?id=${id}`);
    return response.data;
  },
  
  adminAddJob: async (jobData) => {
    const response = await api.post('/admin/requirements.php', jobData);
    return response.data;
  },
  
  adminUpdateJob: async (jobData) => {
    const response = await api.put('/admin/requirements.php', jobData);
    return response.data;
  },
  
  adminDeleteJob: async (id) => {
    const response = await api.delete(`/admin/requirements.php?id=${id}`);
    return response.data;
  }
};

export default jobService;
