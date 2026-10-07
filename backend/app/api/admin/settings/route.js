import { requireAdminAuth } from '../../../../lib/auth';
import { query, tableExists } from '../../../../lib/db';
import { intval, json, serverError, methodNotAllowed } from '../../../../utils/http';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function count(sql) {
  const rows = await query(sql);
  return intval(rows[0]?.count);
}

/** GET /api/admin/settings */
export async function GET(request) {
  const unauthorized = requireAdminAuth(request);
  if (unauthorized) return unauthorized;

  try {
    const requirementsTable = (await tableExists('job_requirements')) ? 'job_requirements' : 'jobs';

    return json({
      system_info: {
        // The admin Settings page displays `node_version`
        node_version: process.version,
        mysql_server: 'MySQL/MariaDB',
        server_time: new Date().toLocaleString('en-IN', {
          timeZone: 'Asia/Kolkata',
          dateStyle: 'long',
          timeStyle: 'short',
        }),
      },
      statistics: {
        total_applications: await count('SELECT COUNT(*) AS count FROM applications'),
        job_positions: await count(`SELECT COUNT(*) AS count FROM ${requirementsTable}`),
        pending: await count("SELECT COUNT(*) AS count FROM applications WHERE status='pending'"),
        approved: await count("SELECT COUNT(*) AS count FROM applications WHERE status='approved'"),
      },
    });
  } catch (err) {
    return serverError('admin/settings', err, 'Unable to load settings.');
  }
}

export const POST = methodNotAllowed;
export const PUT = methodNotAllowed;
export const DELETE = methodNotAllowed;
