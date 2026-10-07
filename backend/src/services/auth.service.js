/**
 * auth.service.js — Business logic for admin authentication.
 *
 * NOTE: Part of the new architecture layer.
 * The existing logic lives in lib/auth.js — do NOT change it.
 * This service wraps lib/auth.js so that future controllers can
 * use a clean service interface without importing lib/ directly.
 */

import {
  checkCredentials,
  generateToken,
  requireAdminAuth,
} from '../../lib/auth.js';

export const authService = {
  /**
   * Validate admin credentials and return a JWT on success.
   * @param {string} username
   * @param {string} password
   * @returns {{ success: boolean, token?: string, username?: string, error?: string }}
   */
  login: (username, password) => {
    if (!checkCredentials(username, password)) {
      return { success: false, error: 'Invalid username or password!' };
    }
    return {
      success:  true,
      token:    generateToken(username),
      username,
    };
  },

  /**
   * Verify a Next.js Request object carries a valid admin Bearer token.
   * Returns null if valid, or a 401 Response if not.
   * @param {Request} request
   * @returns {Response|null}
   */
  requireAuth: (request) => requireAdminAuth(request),
};

export default authService;
