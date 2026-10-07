import fs from 'node:fs/promises';
import { requireAdminAuth } from '../../../../lib/auth';
import { query } from '../../../../lib/db';
import { fail, intval, json, readBody, serverError, str, methodNotAllowed } from '../../../../utils/http';
import { resolveUploadPath } from '../../../../utils/uploads';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const VALID_STATUSES = ['pending', 'approved', 'rejected'];

/**
 * GET /api/admin/applications
 *   ?id=N     → single application
 *   ?search=X → filter by name/email/phone/job_position
 */
export async function GET(request) {
  const unauthorized = requireAdminAuth(request);
  if (unauthorized) return unauthorized;

  const params = request.nextUrl.searchParams;
  const id = intval(params.get('id'));
  const search = params.get('search') || '';

  try {
    if (id > 0) {
      const rows = await query('SELECT * FROM applications WHERE id = ?', [id]);
      if (rows.length === 0) return fail(404, 'Application not found');
      return json(rows[0]);
    }

    let sql = 'SELECT * FROM applications';
    let values = [];
    if (search) {
      const like = `%${search}%`;
      sql += ' WHERE name LIKE ? OR email LIKE ? OR phone LIKE ? OR job_position LIKE ?';
      values = [like, like, like, like];
    }
    sql += ' ORDER BY created_at DESC';

    return json(await query(sql, values));
  } catch (err) {
    return serverError('admin/applications:get', err, 'Unable to load applications.');
  }
}

/** POST /api/admin/applications — { action: 'update_status', id, status } */
export async function POST(request) {
  const unauthorized = requireAdminAuth(request);
  if (unauthorized) return unauthorized;

  const body = await readBody(request);
  if (body.action !== 'update_status') {
    return fail(400, 'Invalid action!');
  }

  const id = intval(body.id);
  const status = str(body.status);
  if (id <= 0 || !VALID_STATUSES.includes(status)) {
    return fail(400, 'Invalid ID or status value!');
  }

  try {
    await query('UPDATE applications SET status = ? WHERE id = ?', [status, id]);
    return json({ success: true, message: 'Status updated successfully!' });
  } catch (err) {
    return serverError('admin/applications:post', err, 'Unable to update status.');
  }
}

/** DELETE /api/admin/applications?id=N — admin action: removes the application and its resume file */
export async function DELETE(request) {
  const unauthorized = requireAdminAuth(request);
  if (unauthorized) return unauthorized;

  const id = intval(request.nextUrl.searchParams.get('id'));
  if (id <= 0) {
    return fail(400, 'Invalid ID provided!');
  }

  try {
    const rows = await query('SELECT file_path FROM applications WHERE id = ?', [id]);
    const fullPath = rows[0]?.file_path ? resolveUploadPath(rows[0].file_path) : null;
    if (fullPath) {
      await fs.unlink(fullPath).catch(() => {});
    }

    await query('DELETE FROM applications WHERE id = ?', [id]);
    return json({ success: true, message: 'Application deleted successfully!' });
  } catch (err) {
    return serverError('admin/applications:delete', err, 'Unable to delete application.');
  }
}

export const PUT = methodNotAllowed;
