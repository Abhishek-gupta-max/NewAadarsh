import jwt from 'jsonwebtoken';
import { fail } from '../utils/http';

const DEFAULT_USERNAME = 'admin';
const DEFAULT_PASSWORD = 'admin@123987';
const DEFAULT_SECRET = 'newaadarsh_secure_salt_987123';

function getSecret() {
  return process.env.JWT_SECRET || DEFAULT_SECRET;
}

export function checkCredentials(username, password) {
  const adminUser = process.env.ADMIN_USERNAME || DEFAULT_USERNAME;
  const adminPass = process.env.ADMIN_PASSWORD || DEFAULT_PASSWORD;
  return username === adminUser && password === adminPass;
}

export function generateToken(username) {
  return jwt.sign({ username }, getSecret(), { expiresIn: process.env.JWT_EXPIRES_IN || '24h' });
}

/**
 * Returns null when the request carries a valid admin Bearer token,
 * otherwise the 401 response to send back.
 */
export function requireAdminAuth(request) {
  const header = request.headers.get('authorization') || '';
  const match = header.match(/Bearer\s(\S+)/);

  const adminUser = process.env.ADMIN_USERNAME || DEFAULT_USERNAME;

  if (match) {
    try {
      const decoded = jwt.verify(match[1], getSecret());
      if (decoded.username === adminUser) return null;
    } catch {
      // fall through to 401
    }
  }

  return fail(401, 'Unauthorized access. Invalid or missing token.');
}

