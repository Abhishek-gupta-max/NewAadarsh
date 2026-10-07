/**
 * index.js — Central barrel export for all error classes.
 *
 * NOTE: Part of the new architecture layer.
 *
 * Usage:
 *   import { AppError, ValidationError, NotFoundError } from '../errors/index.js';
 */

export { AppError, default as AppErrorDefault }           from './AppError.js';
export { ValidationError, default as ValidationErrorDefault } from './ValidationError.js';
export { AuthenticationError, default as AuthenticationErrorDefault } from './AuthenticationError.js';
export { AuthorizationError, default as AuthorizationErrorDefault }  from './AuthorizationError.js';
export { NotFoundError, default as NotFoundErrorDefault } from './NotFoundError.js';
