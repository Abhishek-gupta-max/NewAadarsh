/**
 * NotFoundError.js — Not Found error (404).
 *
 * NOTE: Part of the new architecture layer.
 * Mirrors the existing fail(404, message) responses from utils/http.js.
 */
import { AppError } from './AppError.js';

export class NotFoundError extends AppError {
  /**
   * @param {string} [resource] Human-readable resource name, e.g. 'Job' or 'Application'
   */
  constructor(resource = 'Resource') {
    super(`${resource} not found`, 404, 'NOT_FOUND');
    this.name = 'NotFoundError';
  }
}

export default NotFoundError;
