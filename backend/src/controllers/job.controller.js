/**
 * job.controller.js — HTTP controller for job listing/requirements endpoints.
 *
 * NOTE: Part of the new architecture layer.
 * Existing routes in app/api/jobs/ and app/api/admin/requirements/ are NOT changed.
 */

import jobService from '../services/job.service.js';
import { fail, json, intval, str } from '../../utils/http.js';

export const jobController = {
  /** GET /api/jobs[?id=N|?slug=X] — public */
  getJobs: async (request) => {
    const params = new URL(request.url).searchParams;
    const id     = intval(params.get('id'));
    const slug   = params.get('slug') || '';
    try {
      if (id > 0)  return json(await jobService.getById(id));
      if (slug)    return json(await jobService.getBySlug(slug));
      return json(await jobService.getActiveJobs());
    } catch (err) {
      return fail(err.statusCode || 500, err.message || 'Unable to load jobs.');
    }
  },

  /** GET /api/admin/requirements[?id=N] — admin */
  getRequirements: async (request) => {
    const id = intval(new URL(request.url).searchParams.get('id'));
    try {
      if (id > 0) return json(await jobService.getByIdAdmin(id));
      return json(await jobService.getAllAdmin());
    } catch (err) {
      return fail(err.statusCode || 500, err.message || 'Unable to load positions.');
    }
  },

  /** POST /api/admin/requirements — create */
  create: async (request) => {
    const body = await request.json();
    if (!str(body.position_title)) return fail(400, 'Position title is required!');
    try {
      const result = await jobService.create(body);
      return json({ success: true, id: result.insertId, message: 'Position added successfully!' });
    } catch (err) {
      return fail(err.statusCode || 500, err.message || 'Unable to add position.');
    }
  },

  /** PUT /api/admin/requirements — update */
  update: async (request) => {
    const body = await request.json();
    const id   = intval(body.id);
    if (id <= 0 || !str(body.position_title)) return fail(400, 'Valid ID and Position Title are required!');
    try {
      await jobService.update({ ...body, id, status: body.status || 'active' });
      return json({ success: true, message: 'Position updated successfully!' });
    } catch (err) {
      return fail(err.statusCode || 500, err.message || 'Unable to update position.');
    }
  },

  /** DELETE /api/admin/requirements?id=N */
  delete: async (request) => {
    const id = intval(new URL(request.url).searchParams.get('id'));
    if (id <= 0) return fail(400, 'Invalid ID provided!');
    try {
      await jobService.delete(id);
      return json({ success: true, message: 'Position deleted successfully!' });
    } catch (err) {
      return fail(err.statusCode || 500, err.message || 'Unable to delete position.');
    }
  },
};

export default jobController;
