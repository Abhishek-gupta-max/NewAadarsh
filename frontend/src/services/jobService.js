import api from './api';

export const jobService = {
  // Public APIs
  getJobs: async () => {
    const response = await api.get('/jobs');
    return response.data;
  },
  
  getJobDetail: async (slug) => {
    const response = await api.get(`/jobs?slug=${slug}`);
    return response.data;
  },

  // Admin CRUD APIs
  adminGetJobs: async () => {
    const response = await api.get('/admin/requirements');
    return response.data;
  },
  
  adminGetJobDetail: async (id) => {
    const response = await api.get(`/admin/requirements?id=${id}`);
    return response.data;
  },
  
  adminAddJob: async (jobData) => {
    const response = await api.post('/admin/requirements', jobData);
    return response.data;
  },
  
  adminUpdateJob: async (jobData) => {
    const response = await api.put('/admin/requirements', jobData);
    return response.data;
  },
  
  adminDeleteJob: async (id) => {
    const response = await api.delete(`/admin/requirements?id=${id}`);
    return response.data;
  }
};

export default jobService;
