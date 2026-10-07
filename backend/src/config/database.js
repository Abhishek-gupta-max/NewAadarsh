/**
 * database.js — Database configuration reference.
 *
 * NOTE: This is an architectural documentation/configuration file.
 * The ACTUAL database connection is implemented in ../../lib/db.js
 * which continues to be used by all existing API routes — do NOT change it.
 *
 * This file exposes a typed configuration object that future services/
 * repositories can import when the codebase is gradually migrated to the
 * new layered architecture.
 *
 * Database: MySQL / MariaDB (hosted on Hostinger)
 * Library:  mysql2/promise  (connection pool, parameterized queries)
 * Pool:     globalThis.__newaadarshPool (singleton, hot-reload safe)
 */

/** Supported environment variable names (in priority order). */
const env = process.env;

const databaseConfig = {
  /** Database technology */
  technology: 'MySQL / MariaDB',

  /** mysql2 pool configuration — mirrors lib/db.js exactly */
  connection: {
    host:     env.DB_HOST     || env.MYSQL_HOST,
    port:     parseInt(env.DB_PORT || env.MYSQL_PORT || '3306', 10),
    user:     env.DB_USER     || env.MYSQL_USER,
    password: env.DB_PASSWORD ?? env.MYSQL_PASSWORD ?? '',
    database: env.DB_NAME     || env.MYSQL_DATABASE,
    charset:  'utf8mb4',
    /** Return DATETIME/TIMESTAMP as strings — existing frontend depends on this */
    dateStrings:        true,
    waitForConnections: true,
    connectionLimit:    10,
    queueLimit:         0,
  },

  /**
   * Tables actively used by the backend (do NOT modify or drop these):
   *   - applications
   *   - contact_messages
   *   - job_requirements
   *   - jobs  (legacy, read-only fallback)
   *
   * Tables that exist in the DB but are NOT used by the backend:
   *   - company_info, contacts, recruitment_area, website_visitors
   */
  tables: {
    applications:    'applications',
    contactMessages: 'contact_messages',
    jobRequirements: 'job_requirements',
    jobsLegacy:      'jobs',
  },

  /**
   * Migration strategy: NONE — the backend never creates, alters, or drops
   * tables.  Schema changes must be applied manually via the Hostinger hPanel
   * database tool or a DBA-approved migration script kept in database/migrations/.
   */
  migrationStrategy: 'manual',
};

export default databaseConfig;
