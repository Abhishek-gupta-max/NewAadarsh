/**
 * constants.js — Shared backend constants.
 *
 * NOTE: Part of the new architecture layer.
 * Values here mirror constants already used in existing code — do NOT change
 * the values without also updating the corresponding API route files.
 */

/** Application-level statuses for job applications — used by admin/applications */
export const APPLICATION_STATUSES = Object.freeze({
  PENDING:  'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
});

/** Job posting statuses — used by admin/requirements and GET /api/jobs */
export const JOB_STATUSES = Object.freeze({
  ACTIVE:   'active',
  INACTIVE: 'inactive',
});

/** Maximum resume upload size in bytes (must match app/api/apply/route.js MAX_SIZE) */
export const RESUME_MAX_BYTES = 5 * 1024 * 1024; // 5 MB

/** Allowed resume file extensions (must match app/api/apply/route.js ALLOWED_EXT) */
export const RESUME_ALLOWED_EXTENSIONS = Object.freeze(['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png']);

/** Default company name used when job rows have no company_name column */
export const DEFAULT_COMPANY_NAME = 'NEW ADARSH MANPOWER CONSULTANT PRIVATE LIMITED';

/** Default JWT expiry if JWT_EXPIRES_IN env var is not set */
export const DEFAULT_JWT_EXPIRES_IN = '24h';

/** Database connection limit (must match lib/db.js connectionLimit) */
export const DB_CONNECTION_LIMIT = 10;

/** Pagination — default number of records per page for future list endpoints */
export const DEFAULT_PAGE_SIZE = 20;

/** HTTP verbs used in the project */
export const HTTP_METHODS = Object.freeze({
  GET:    'GET',
  POST:   'POST',
  PUT:    'PUT',
  DELETE: 'DELETE',
  OPTIONS: 'OPTIONS',
});
