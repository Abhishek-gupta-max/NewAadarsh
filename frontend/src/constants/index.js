/**
 * frontend/src/constants/index.js
 *
 * Shared frontend constants.
 *
 * NOTE: Part of the new architecture layer.
 * The existing constants in utils/constants.js remain unchanged.
 * This file lives in the new src/constants/ directory.
 * During migration, these can gradually replace the spread in utils/constants.js.
 */

/** Application metadata */
export const APP = Object.freeze({
  NAME:        'New Adarsh Manpower',
  TAGLINE:     'Your Trusted Manpower Consultant',
  WEBSITE_URL: 'https://newadarshmanpower.com',
  SUPPORT_EMAIL: 'info@newadarshmanpower.com',
});

/** Navigation routes — must match AppRoutes.jsx */
export const ROUTES = Object.freeze({
  HOME:          '/',
  ABOUT:         '/about',
  SERVICES:      '/services',
  PROCESS:       '/process',
  WHY_US:        '/why-us',
  REQUIREMENTS:  '/requirements',
  CONTACT:       '/contact',
  JOBS:          '/jobs',
  JOB_DETAIL:    '/jobs/:slug',
  APPLY:         '/apply',
  REGISTER:      '/register',
  // Auth
  ADMIN_LOGIN:   '/admin-login',
  // Admin (protected)
  ADMIN:         '/admin',
  ADMIN_DASHBOARD:    '/admin/dashboard',
  ADMIN_APPLICATIONS: '/admin/applications',
  ADMIN_REQUIREMENTS: '/admin/requirements',
  ADMIN_SETTINGS:     '/admin/settings',
});

/** API endpoint paths (relative to /api base URL) */
export const API_ENDPOINTS = Object.freeze({
  JOBS:                  '/jobs',
  APPLY:                 '/apply',
  CONTACT:               '/contact',
  ADMIN_LOGIN:           '/admin/login',
  ADMIN_DASHBOARD:       '/admin/dashboard',
  ADMIN_APPLICATIONS:    '/admin/applications',
  ADMIN_REQUIREMENTS:    '/admin/requirements',
  ADMIN_SETTINGS:        '/admin/settings',
});

/** Local storage keys — must match utils/storage.js usage */
export const STORAGE_KEYS = Object.freeze({
  AUTH_TOKEN: 'auth_token',
  AUTH_USER:  'auth_user',
});

/** Application status values — must match backend constants */
export const APPLICATION_STATUSES = Object.freeze({
  PENDING:  'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
});

/** Job status values */
export const JOB_STATUSES = Object.freeze({
  ACTIVE:   'active',
  INACTIVE: 'inactive',
});

/** Pagination */
export const PAGINATION = Object.freeze({
  DEFAULT_PAGE_SIZE: 10,
});

/** File upload constraints — must match backend limits */
export const UPLOAD = Object.freeze({
  MAX_SIZE_MB:         5,
  ALLOWED_EXTENSIONS:  ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png'],
  ALLOWED_MIME_TYPES:  [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'image/jpeg',
    'image/png',
  ],
});
