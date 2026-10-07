/**
 * auth.js — Authentication configuration.
 *
 * NOTE: This is a configuration reference file for the new architecture layer.
 * The ACTUAL authentication logic lives in ../../lib/auth.js — do NOT change it.
 *
 * JWT-based admin authentication:
 *   - Credentials validated against ADMIN_USERNAME / ADMIN_PASSWORD env vars.
 *   - Access token signed with JWT_SECRET, expires in JWT_EXPIRES_IN (default 24h).
 *   - No refresh tokens in current implementation.
 *   - Token transmitted via Authorization: Bearer <token> header.
 */

const authConfig = {
  /** Strategy used: credential-based JWT (single admin user, no database table) */
  strategy: 'jwt-credential',

  jwt: {
    /** Secret key for signing/verifying tokens — MUST be set in environment */
    secret: () => {
      const s = process.env.JWT_SECRET;
      if (!s) throw new Error('JWT_SECRET env var is required');
      return s;
    },
    /** Token expiry — matches lib/auth.js */
    expiresIn: process.env.JWT_EXPIRES_IN || '24h',
    /** Algorithm used by jsonwebtoken default */
    algorithm: 'HS256',
  },

  /** Admin credentials come exclusively from environment variables */
  admin: {
    usernameEnvVar: 'ADMIN_USERNAME',
    passwordEnvVar: 'ADMIN_PASSWORD',
  },

  /**
   * Protected API routes (all require Authorization: Bearer <token>):
   *   GET  /api/admin/dashboard
   *   GET/POST/DELETE /api/admin/applications
   *   GET/POST/PUT/DELETE /api/admin/requirements
   *   GET  /api/admin/settings
   *
   * Public routes (no token required):
   *   POST /api/admin/login
   *   GET  /api/jobs
   *   POST /api/apply
   *   POST /api/contact
   */
  publicRoutes: [
    '/api/admin/login',
    '/api/jobs',
    '/api/apply',
    '/api/contact',
  ],
};

export default authConfig;
