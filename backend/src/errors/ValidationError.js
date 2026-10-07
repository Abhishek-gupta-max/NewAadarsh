/**
 * ValidationError.js — Validation error (400 Bad Request).
 *
 * NOTE: Part of the new architecture layer.
 * Mirrors the existing fail(400, message) responses from utils/http.js.
 */
import { AppError } from './AppError.js';

export class ValidationError extends AppError {
  /**
   * @param {string} message
   * @param {Object} [fields] Field-level validation errors: { fieldName: 'error message' }
   */
  constructor(message = 'Validation failed', fields = {}) {
    super(message, 400, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
    this.fields = fields;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      fields: this.fields,
    };
  }
}

export default ValidationError;
