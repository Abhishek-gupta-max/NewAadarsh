/**
 * AuthorizationError.js — Authorization error (403 Forbidden).
 *
 * NOTE: Part of the new architecture layer.
 */
import { AppError } from './AppError.js';

export class AuthorizationError extends AppError {
  constructor(message = 'You do not have permission to perform this action.') {
    super(message, 403, 'AUTHORIZATION_ERROR');
    this.name = 'AuthorizationError';
  }
}

export default AuthorizationError;
