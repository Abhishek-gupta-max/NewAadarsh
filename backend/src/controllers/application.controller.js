/**
 * application.controller.js — HTTP controller for application endpoints.
 *
 * NOTE: Part of the new architecture layer.
 * Existing routes in app/api/apply/ and app/api/admin/applications/ are NOT changed.
 */

import applicationService from '../services/application.service.js';
import { fail, json, intval, str } from '../../utils/http.js';

export const applicationController = {
  /** GET /api/admin/applications[?id=N&search=X] */
  getAll: async (request) => {
    const params = new URL(request.url).searchParams;
    const id     = intval(params.get('id'));
    const search = params.get('search') || '';
    try {
      if (id > 0) return json(await applicationService.getById(id));
      return json(await applicationService.getAll(search));
    } catch (err) {
      return fail(err.statusCode || 500, err.message || 'Unable to load applications.');
    }
  },

  /** POST /api/admin/applications — update status */
  updateStatus: async (request) => {
    const body   = await request.json();
    const id     = intval(body.id);
    const status = str(body.status);
    try {
      await applicationService.updateStatus(id, status);
      return json({ success: true, message: 'Status updated successfully!' });
    } catch (err) {
      return fail(err.statusCode || 500, err.message || 'Unable to update status.');
    }
  },

  /** DELETE /api/admin/applications?id=N */
  delete: async (request) => {
    const id = intval(new URL(request.url).searchParams.get('id'));
    if (id <= 0) return fail(400, 'Invalid ID provided!');
    try {
      await applicationService.delete(id);
      return json({ success: true, message: 'Application deleted successfully!' });
    } catch (err) {
      return fail(err.statusCode || 500, err.message || 'Unable to delete application.');
    }
  },
};

export default applicationController;
