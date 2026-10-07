/**
 * AuthenticationError.js — Authentication error (401 Unauthorized).
 *
 * NOTE: Part of the new architecture layer.
 * Mirrors the existing fail(401, message) responses from utils/http.js.
 */
import { AppError } from './AppError.js';

export class AuthenticationError extends AppError {
  constructor(message = 'Unauthorized access. Invalid or missing token.') {
    super(message, 401, 'AUTHENTICATION_ERROR');
    this.name = 'AuthenticationError';
  }
}

export default AuthenticationError;
