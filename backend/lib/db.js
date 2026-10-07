import mysql from 'mysql2/promise';

// Single shared pool for the existing MySQL database.
// Cached on globalThis so dev hot-reloads don't open a new pool each time.
function createPoolOptions(hostOverride) {
  // DB_* variables take priority; the older MYSQL_* names are still accepted as a fallback
  const env = process.env;
  const host = hostOverride || env.DB_HOST || env.MYSQL_HOST || 'localhost';
  const port = env.DB_PORT || env.MYSQL_PORT || '3306';
  const user = env.DB_USER || env.MYSQL_USER;
  const password = env.DB_PASSWORD ?? env.MYSQL_PASSWORD ?? '';
  const database = env.DB_NAME || env.MYSQL_DATABASE;

  if (!user || !database) {
    throw new Error('MySQL is not configured: set DB_HOST, DB_USER, DB_PASSWORD and DB_NAME');
  }

  const sslOption = env.DB_SSL === 'true' || env.DB_SSL === '1' ? { rejectUnauthorized: false } : undefined;

  return mysql.createPool({
    host,
    port: parseInt(port, 10),
    user,
    password,
    database,
    charset: 'utf8mb4',
    // Return DATETIME/TIMESTAMP as 'YYYY-MM-DD HH:MM:SS' strings (the format the frontend expects)
    dateStrings: true,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 10000,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    ssl: sslOption,
  });
}

export function getPool(hostOverride) {
  if (hostOverride) {
    globalThis.__newaadarshPool = createPoolOptions(hostOverride);
  } else if (!globalThis.__newaadarshPool) {
    globalThis.__newaadarshPool = createPoolOptions();
  }
  return globalThis.__newaadarshPool;
}

/** Run a parameterized query and return the rows (or the result header for writes). */
export async function query(sql, params = []) {
  try {
    const [rows] = await getPool().query(sql, params);
    return rows;
  } catch (err) {
    const primaryHost = process.env.DB_HOST || process.env.MYSQL_HOST;
    if (
      primaryHost &&
      primaryHost !== 'localhost' &&
      primaryHost !== '127.0.0.1' &&
      (err.code === 'ER_ACCESS_DENIED_ERROR' || err.code === 'ECONNREFUSED' || err.code === 'ETIMEDOUT' || err.code === 'ENOTFOUND')
    ) {
      console.warn(`[db] Primary host (${primaryHost}) failed with ${err.code}. Falling back to localhost...`);
      const [rows] = await getPool('localhost').query(sql, params);
      return rows;
    }
    throw err;
  }
}

/** True if a table exists in the current database (read-only check). */
export async function tableExists(name) {
  const rows = await query('SHOW TABLES LIKE ?', [name]);
  return rows.length > 0;
}

