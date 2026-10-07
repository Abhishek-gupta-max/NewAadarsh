/**
 * frontend/src/types/index.js
 *
 * Shared frontend type definitions using JSDoc.
 * The project uses JavaScript (not TypeScript). These definitions serve as
 * documentation and can be used with VS Code's IntelliSense.
 *
 * NOTE: Part of the new architecture layer. No existing code is changed.
 */

// ─── Job Types ────────────────────────────────────────────────────────────────

/**
 * @typedef {Object} Job
 * @property {number} id
 * @property {string} title
 * @property {string} description
 * @property {string} requirements
 * @property {string} experience
 * @property {string} salary
 * @property {string} job_location
 * @property {string} company_name
 * @property {string} category
 * @property {string} vacancies
 * @property {'active'|'inactive'} status
 * @property {string} created_at
 * @property {string} slug
 */

// ─── Application Types ────────────────────────────────────────────────────────

/**
 * @typedef {Object} Application
 * @property {number} id
 * @property {string} name
 * @property {string} email
 * @property {string} phone
 * @property {string} job_position
 * @property {string} experience
 * @property {string} resume_file
 * @property {string} file_path
 * @property {string} message
 * @property {'pending'|'approved'|'rejected'} status
 * @property {string} created_at
 */

/**
 * @typedef {Object} ApplicationFormData
 * @property {string} name
 * @property {string} email
 * @property {string} phone
 * @property {string} job_position
 * @property {string} experience
 * @property {string} message
 * @property {File}   resume
 */

// ─── Contact Types ────────────────────────────────────────────────────────────

/**
 * @typedef {Object} ContactMessage
 * @property {string} name
 * @property {string} email
 * @property {string} phone
 * @property {string} subject
 * @property {string} message
 */

// ─── Auth Types ───────────────────────────────────────────────────────────────

/**
 * @typedef {Object} AuthState
 * @property {string|null} user           — admin username
 * @property {boolean}     isAuthenticated
 * @property {boolean}     loading
 * @property {Function}    login
 * @property {Function}    logout
 */

/**
 * @typedef {Object} LoginResult
 * @property {boolean} success
 * @property {string}  [token]
 * @property {string}  [username]
 * @property {string}  [error]
 */

// ─── API Types ────────────────────────────────────────────────────────────────

/**
 * @typedef {Object} ApiResponse
 * @property {boolean} success
 * @property {string}  [message]
 * @property {string}  [error]
 */

/**
 * @typedef {Object} DashboardStats
 * @property {number} total_apps
 * @property {number} pending_apps
 * @property {number} approved_apps
 * @property {number} rejected_apps
 */

export {};
