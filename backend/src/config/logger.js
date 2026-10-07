/**
 * logger.js — Logger configuration.
 *
 * NOTE: This is a configuration reference/bootstrap file.
 * The project does not yet use a dedicated logging library.
 * The existing backend uses console.error via utils/http.js → serverError().
 *
 * This file defines recommended log levels and a lightweight logger factory
 * that wraps the existing console-based approach.  It is ready to be replaced
 * with a production library such as `pino` or `winston` in the future.
 *
 * NEVER log: passwords, JWT tokens, database passwords, API keys, PII.
 */

const LOG_LEVELS = {
  debug: 0,
  info:  1,
  warn:  2,
  error: 3,
};

const currentLevel = (() => {
  const envLevel = (process.env.LOG_LEVEL || '').toLowerCase();
  return LOG_LEVELS[envLevel] !== undefined
    ? LOG_LEVELS[envLevel]
    : process.env.NODE_ENV === 'production'
      ? LOG_LEVELS.warn
      : LOG_LEVELS.debug;
})();

/**
 * Minimal structured logger.
 * Replace the implementation with pino/winston while keeping this interface.
 */
const logger = {
  debug: (context, message, meta = {}) => {
    if (currentLevel <= LOG_LEVELS.debug) {
      console.debug(JSON.stringify({ level: 'debug', context, message, ...meta, ts: new Date().toISOString() }));
    }
  },
  info: (context, message, meta = {}) => {
    if (currentLevel <= LOG_LEVELS.info) {
      console.info(JSON.stringify({ level: 'info', context, message, ...meta, ts: new Date().toISOString() }));
    }
  },
  warn: (context, message, meta = {}) => {
    if (currentLevel <= LOG_LEVELS.warn) {
      console.warn(JSON.stringify({ level: 'warn', context, message, ...meta, ts: new Date().toISOString() }));
    }
  },
  error: (context, message, err = null, meta = {}) => {
    if (currentLevel <= LOG_LEVELS.error) {
      console.error(JSON.stringify({
        level: 'error',
        context,
        message,
        ...(err ? { errorMessage: err.message, stack: err.stack } : {}),
        ...meta,
        ts: new Date().toISOString(),
      }));
    }
  },
};

export const loggerConfig = {
  level: process.env.LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'warn' : 'debug'),
  format: 'json',
  /** Fields that MUST NEVER appear in log output */
  sensitiveFields: ['password', 'token', 'jwt', 'secret', 'authorization', 'DB_PASSWORD'],
};

export default logger;
