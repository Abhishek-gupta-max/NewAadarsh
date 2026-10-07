/**
 * auth.controller.js — HTTP controller for authentication endpoints.
 *
 * NOTE: Part of the new architecture layer.
 * The existing route handler app/api/admin/login/route.js is NOT changed.
 *
 * Controllers are thin — they handle HTTP in/out only, delegating business
 * logic to the service layer.  Use these during migration of existing routes.
 */

import authService from '../services/auth.service.js';
import { validateAdminLogin } from '../validators/auth.validator.js';
import { fail, json, readBody, str } from '../../utils/http.js';

export const authController = {
  /**
   * POST /api/admin/login
   * Body: { username, password }
   */
  login: async (request) => {
    const body     = await readBody(request);
    const username = str(body.username);
    const password = str(body.password);

    const { valid, errors } = validateAdminLogin({ username, password });
    if (!valid) return fail(400, errors[0]);

    try {
      const result = authService.login(username, password);
      if (!result.success) return fail(401, result.error);
      return json({ success: true, token: result.token, username: result.username, message: 'Logged in successfully!' });
    } catch (err) {
      console.error('[auth.controller:login]', err);
      return fail(500, 'Unable to log in right now.');
    }
  },
};

export default authController;
