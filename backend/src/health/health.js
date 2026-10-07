/**
 * health.js — Health check endpoint handler.
 *
 * NOTE: Part of the new architecture layer.
 * This file does NOT register a new route — it provides a handler function
 * that CAN be wired to a route in the future (e.g. GET /health).
 *
 * The existing backend (Next.js) does not expose a /health endpoint.
 * A GET /api/health or GET /health route should be added to the Next.js
 * app/api directory when ready, using this handler.
 *
 * This handler is intentionally safe to import — it makes NO side effects on load.
 */

import { getPool } from '../../lib/db.js';

/**
 * Run a lightweight database connectivity check.
 * @returns {Promise<{ connected: boolean, latencyMs: number, error?: string }>}
 */
async function checkDatabase() {
  const start = Date.now();
  try {
    const pool = getPool();
    await pool.query('SELECT 1');
    return { connected: true, latencyMs: Date.now() - start };
  } catch (err) {
    return { connected: false, latencyMs: Date.now() - start, error: err.message };
  }
}

/**
 * Health check handler.
 * Returns a JSON response suitable for a GET /health route.
 * Status 200 = healthy, 503 = degraded.
 *
 * @returns {Promise<Response>}
 */
export async function healthHandler() {
  const db = await checkDatabase();

  const healthy = db.connected;

  const body = {
    status:  healthy ? 'ok' : 'degraded',
    uptime:  Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    checks: {
      database: db,
    },
  };

  return Response.json(body, { status: healthy ? 200 : 503 });
}

export default healthHandler;
