import { query, tableExists } from '../../../lib/db';
import { fail, intval, json, serverError, methodNotAllowed } from '../../../utils/http';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const has = (row, key) => row[key] !== undefined && row[key] !== null;

// Slug from the job title (non-alphanumerics -> "-", lowercased); keeps existing job URLs working
function jobSlug(title) {
  return String(title).replace(/[^A-Za-z0-9-]+/g, '-').trim().toLowerCase();
}

/** Map job_requirements / jobs rows to the shape the frontend expects. */
function mapJobRow(row) {
  return {
    id: has(row, 'id') ? intval(row.id) : 0,
    title: has(row, 'position_title') ? row.position_title : has(row, 'title') ? row.title : '',
    description: has(row, 'description') ? row.description : '',
    requirements: has(row, 'requirements') ? row.requirements : '',
    experience: has(row, 'experience_needed') ? row.experience_needed : has(row, 'experience') ? row.experience : '',
    salary: has(row, 'salary_range') ? row.salary_range : has(row, 'salary') ? row.salary : '',
    job_location: has(row, 'location') ? row.location : has(row, 'job_location') ? row.job_location : '',
    company_name: has(row, 'company_name') ? row.company_name : 'NEW ADARSH MANPOWER CONSULTANT PRIVATE LIMITED',
    category: has(row, 'category') ? row.category : 'Manpower',
    vacancies: has(row, 'vacancies') ? row.vacancies : 'Openings',
    status: has(row, 'status') ? row.status : 'active',
    created_at: has(row, 'created_at') ? row.created_at : '',
    slug: has(row, 'slug') ? row.slug : has(row, 'position_title') ? jobSlug(row.position_title) : '',
  };
}

/**
 * GET /api/jobs
 *   ?id=N   → single job
 *   ?slug=X → single job by slug
 *   (none)  → all active jobs
 */
export async function GET(request) {
  const params = request.nextUrl.searchParams;
  const id = intval(params.get('id'));
  const slug = params.get('slug') || '';

  try {
    let table = 'job_requirements';
    if (!(await tableExists('job_requirements'))) {
      table = 'jobs';
      if (!(await tableExists('jobs'))) return json([]);
    }

    if (id > 0) {
      const rows = await query(`SELECT * FROM ${table} WHERE id = ?`, [id]);
      if (rows.length === 0) return fail(404, 'Job not found');
      return json(mapJobRow(rows[0]));
    }

    if (slug) {
      const rows = table === 'jobs'
        ? await query('SELECT * FROM jobs WHERE slug = ?', [slug])
        : await query('SELECT * FROM job_requirements');
      const found = rows.map(mapJobRow).find((job) => job.slug === slug);
      if (!found) return fail(404, `Job not found by slug: ${slug}`);
      return json(found);
    }

    let jobs = (await query(`SELECT * FROM ${table} WHERE status = 'active' ORDER BY id DESC`)).map(mapJobRow);

    // Fallback to the legacy jobs table if job_requirements is empty
    if (jobs.length === 0 && table === 'job_requirements' && (await tableExists('jobs'))) {
      jobs = (await query("SELECT * FROM jobs WHERE status = 'active' ORDER BY id DESC")).map(mapJobRow);
    }

    return json(jobs);
  } catch (err) {
    return serverError('jobs', err, 'Unable to load jobs.');
  }
}

export const POST = methodNotAllowed;
export const PUT = methodNotAllowed;
export const DELETE = methodNotAllowed;
