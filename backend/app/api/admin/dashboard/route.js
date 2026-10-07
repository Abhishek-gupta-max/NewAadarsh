import { requireAdminAuth } from '../../../../lib/auth';
import { query } from '../../../../lib/db';
import { intval, json, serverError, methodNotAllowed } from '../../../../utils/http';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function count(sql) {
  const rows = await query(sql);
  return intval(rows[0]?.count);
}

/** GET /api/admin/dashboard */
export async function GET(request) {
  const unauthorized = requireAdminAuth(request);
  if (unauthorized) return unauthorized;

  try {
    const stats = {
      total_apps: await count('SELECT COUNT(*) AS count FROM applications'),
      pending_apps: await count("SELECT COUNT(*) AS count FROM applications WHERE status='pending'"),
      approved_apps: await count("SELECT COUNT(*) AS count FROM applications WHERE status='approved'"),
      rejected_apps: await count("SELECT COUNT(*) AS count FROM applications WHERE status='rejected'"),
    };

    const latest = await query('SELECT * FROM applications ORDER BY created_at DESC LIMIT 5');

    return json({
      stats,
      latest_applications: latest.map((row) => ({
        id: intval(row.id),
        name: row.name,
        email: row.email,
        phone: row.phone,
        job_position: row.job_position,
        status: row.status,
        created_at: row.created_at,
      })),
    });
  } catch (err) {
    return serverError('admin/dashboard', err, 'Unable to load dashboard.');
  }
}

export const POST = methodNotAllowed;
export const PUT = methodNotAllowed;
export const DELETE = methodNotAllowed;
