import { requireAdminAuth } from '../../../../lib/auth';
import { query } from '../../../../lib/db';
import { fail, intval, json, readBody, serverError, str } from '../../../../utils/http';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function positionFields(body) {
  return {
    position_title: str(body.position_title),
    description: str(body.description),
    requirements: str(body.requirements),
    experience_needed: str(body.experience_needed),
    salary_range: str(body.salary_range),
    location: str(body.location),
  };
}

/**
 * GET /api/admin/requirements
 *   ?id=N → single position, otherwise all positions
 */
export async function GET(request) {
  const unauthorized = requireAdminAuth(request);
  if (unauthorized) return unauthorized;

  const id = intval(request.nextUrl.searchParams.get('id'));

  try {
    if (id > 0) {
      const rows = await query('SELECT * FROM job_requirements WHERE id = ?', [id]);
      if (rows.length === 0) return fail(404, 'Position not found');
      return json(rows[0]);
    }
    return json(await query('SELECT * FROM job_requirements ORDER BY created_at DESC'));
  } catch (err) {
    return serverError('admin/requirements:get', err, 'Unable to load positions.');
  }
}

/** POST /api/admin/requirements — add a position */
export async function POST(request) {
  const unauthorized = requireAdminAuth(request);
  if (unauthorized) return unauthorized;

  const f = positionFields(await readBody(request));
  if (!f.position_title) {
    return fail(400, 'Position title is required!');
  }

  try {
    const result = await query(
      `INSERT INTO job_requirements (position_title, description, requirements, experience_needed, salary_range, location)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [f.position_title, f.description, f.requirements, f.experience_needed, f.salary_range, f.location]
    );
    return json({ success: true, id: result.insertId, message: 'Position added successfully!' });
  } catch (err) {
    return serverError('admin/requirements:post', err, 'Unable to add position.');
  }
}

/** PUT /api/admin/requirements — update a position */
export async function PUT(request) {
  const unauthorized = requireAdminAuth(request);
  if (unauthorized) return unauthorized;

  const body = await readBody(request);
  const id = intval(body.id);
  const f = positionFields(body);
  const status = body.status !== undefined && body.status !== null ? str(body.status) : 'active';

  if (id <= 0 || !f.position_title) {
    return fail(400, 'Valid ID and Position Title are required!');
  }

  try {
    await query(
      `UPDATE job_requirements SET
         position_title = ?, description = ?, requirements = ?,
         experience_needed = ?, salary_range = ?, location = ?, status = ?
       WHERE id = ?`,
      [f.position_title, f.description, f.requirements, f.experience_needed, f.salary_range, f.location, status, id]
    );
    return json({ success: true, message: 'Position updated successfully!' });
  } catch (err) {
    return serverError('admin/requirements:put', err, 'Unable to update position.');
  }
}

/** DELETE /api/admin/requirements?id=N — admin action: removes a position */
export async function DELETE(request) {
  const unauthorized = requireAdminAuth(request);
  if (unauthorized) return unauthorized;

  const id = intval(request.nextUrl.searchParams.get('id'));
  if (id <= 0) {
    return fail(400, 'Invalid ID provided!');
  }

  try {
    await query('DELETE FROM job_requirements WHERE id = ?', [id]);
    return json({ success: true, message: 'Position deleted successfully!' });
  } catch (err) {
    return serverError('admin/requirements:delete', err, 'Unable to delete position.');
  }
}
