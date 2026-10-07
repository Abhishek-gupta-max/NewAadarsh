/**
 * app.js — Centralized application configuration.
 *
 * NOTE: This file is part of the new production-ready architecture layer.
 * It does NOT replace or alter any existing backend files.
 * The existing backend (Next.js routes in app/api/) continues to work unchanged.
 *
 * Usage (future): import appConfig from './src/config/app.js'
 */

const appConfig = {
  /** Application display name */
  name: process.env.APP_NAME || 'New Adarsh Manpower',

  /** Runtime environment: 'development' | 'staging' | 'production' */
  env: process.env.NODE_ENV || 'development',

  /** Port the server listens on */
  port: parseInt(process.env.PORT || '3000', 10),

  /** Whether the app is running in production mode */
  isProduction: (process.env.NODE_ENV || 'development') === 'production',

  /** Whether the app is running in development mode */
  isDevelopment: (process.env.NODE_ENV || 'development') === 'development',

  /**
   * API version prefix — kept for reference only.
   * Current API routes are served under /api (no versioning prefix).
   * If versioning is introduced in future it must be backward-compatible.
   */
  apiPrefix: '/api',

  /**
   * Upload settings — mirrors the values used by utils/uploads.js
   * Do NOT change these; they are documentation of existing behaviour.
   */
  uploads: {
    maxFileSizeMb: 5,
    allowedExtensions: ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png'],
  },
};

export default appConfig;
