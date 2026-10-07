#!/usr/bin/env node
/**
 * database/scripts/check-connection.mjs
 *
 * Quick connectivity check — verifies that the DB environment variables are
 * set correctly and the database is reachable.
 *
 * Usage:
 *   cd backend
 *   node ../database/scripts/check-connection.mjs
 *
 * Requires: backend/.env.local (or environment variables already set)
 * NOTE: This script is read-only — it does NOT modify any tables or data.
 */

import { createRequire } from 'module';
import { existsSync }    from 'fs';
import { resolve }       from 'path';

// Load .env.local from the backend directory if present
const envFile = resolve(import.meta.dirname, '../../backend/.env.local');
if (existsSync(envFile)) {
  const { config } = await import('dotenv');
  config({ path: envFile });
  console.log(`✓  Loaded environment from ${envFile}`);
} else {
  console.log('ℹ  No backend/.env.local found — using existing environment variables.');
}

const require = createRequire(import.meta.url);
let mysql;
try {
  mysql = require('mysql2/promise');
} catch {
  console.error('✗  mysql2 is not installed. Run: cd backend && npm install');
  process.exit(1);
}

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

if (!DB_HOST || !DB_USER || !DB_NAME) {
  console.error('✗  Missing required environment variables: DB_HOST, DB_USER, DB_NAME');
  process.exit(1);
}

console.log(`\nConnecting to MySQL: ${DB_USER}@${DB_HOST}:${DB_PORT || 3306}/${DB_NAME} …`);

const pool = mysql.createPool({
  host:     DB_HOST,
  port:     parseInt(DB_PORT || '3306', 10),
  user:     DB_USER,
  password: DB_PASSWORD || '',
  database: DB_NAME,
  connectionLimit: 1,
});

try {
  const start = Date.now();
  const [rows] = await pool.query('SELECT 1 AS connected, VERSION() AS version');
  const ms = Date.now() - start;
  console.log(`✓  Connected successfully (${ms} ms)`);
  console.log(`   MySQL version: ${rows[0].version}`);

  // Check tables
  const tables = ['applications', 'contact_messages', 'job_requirements'];
  for (const table of tables) {
    const [r] = await pool.query('SHOW TABLES LIKE ?', [table]);
    const found = r.length > 0 ? '✓' : '✗  MISSING';
    console.log(`   Table ${table}: ${found}`);
  }
} catch (err) {
  console.error('✗  Connection failed:', err.message);
  process.exit(1);
} finally {
  await pool.end();
}

console.log('\nDatabase check complete.\n');
