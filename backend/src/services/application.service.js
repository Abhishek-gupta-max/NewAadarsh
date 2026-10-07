/**
 * application.service.js — Business logic for job applications.
 *
 * NOTE: Part of the new architecture layer.
 * The existing logic is in app/api/apply/route.js and
 * app/api/admin/applications/route.js — do NOT change them.
 *
 * This service is intended for use in NEW code or migration.
 */

import applicationRepository from '../repositories/application.repository.js';

export const applicationService = {
  /** Get all applications, optionally filtered by search term. */
  getAll: (search = '') => applicationRepository.findAll(search),

  /** Get a single application by id. Throws if not found. */
  getById: async (id) => {
    const app = await applicationRepository.findById(id);
    if (!app) throw Object.assign(new Error('Application not found'), { statusCode: 404 });
    return app;
  },

  /** Submit a new job application (text fields + resume metadata). */
  submit: (data) => applicationRepository.create(data),

  /** Update application status. */
  updateStatus: async (id, status) => {
    const valid = ['pending', 'approved', 'rejected'];
    if (!valid.includes(status)) {
      throw Object.assign(new Error('Invalid status value'), { statusCode: 400 });
    }
    await applicationRepository.updateStatus(id, status);
  },

  /** Delete an application by id. */
  delete: (id) => applicationRepository.deleteById(id),

  /** Dashboard summary stats. */
  getDashboardStats: () => applicationRepository.getCounts(),

  /** Most recent N applications. */
  getLatest: (limit = 5) => applicationRepository.getLatest(limit),
};

export default applicationService;
