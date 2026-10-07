/**
 * auth.validator.js — Input validation for authentication endpoints.
 *
 * NOTE: Part of the new architecture layer.
 * Existing validation in app/api/admin/login/route.js is NOT changed.
 * Use these validators in NEW code or during migration.
 */

/** @returns {{ valid: boolean, errors: string[] }} */
export function validateAdminLogin({ username, password }) {
  const errors = [];
  if (!username || typeof username !== 'string' || username.trim() === '') {
    errors.push('Username is required.');
  }
  if (!password || typeof password !== 'string' || password.trim() === '') {
    errors.push('Password is required.');
  }
  return { valid: errors.length === 0, errors };
}

export default { validateAdminLogin };
