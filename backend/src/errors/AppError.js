/**
 * AppError.js — Base application error class.
 *
 * NOTE: Part of the new architecture layer.
 * Existing API error responses (via utils/http.js → fail()) are NOT changed.
 * Use these classes in NEW code or when gradually migrating existing routes.
 */

export class AppError extends Error {
  /**
   * @param {string} message   Human-readable error message
   * @param {number} statusCode HTTP status code
   * @param {string} [code]    Machine-readable error code
   */
  constructor(message, statusCode = 500, code = 'INTERNAL_ERROR') {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true; // Expected, safe-to-expose errors
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      success: false,
      error:   this.message,
      message: this.message,
      code:    this.code,
    };
  }
}

export default AppError;
