const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'newaadarsh_secure_salt_987123';

/**
 * Middleware: verify Bearer JWT token from Authorization header.
 * Mirrors PHP requireAdminAuth() from auth_check.php.
 */
function requireAdminAuth(req, res, next) {
  const authHeader = req.headers['authorization'] || '';
  const match = authHeader.match(/^Bearer\s+(\S+)$/i);

  if (!match) {
    return res.status(401).json({ error: 'Unauthorized access. Invalid or missing token.' });
  }

  const token = match[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.admin = decoded; // { username, iat, exp }
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Unauthorized access. Token expired or invalid.' });
  }
}

module.exports = { requireAdminAuth };
