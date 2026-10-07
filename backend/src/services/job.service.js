/**
 * job.service.js — Business logic for job listings and requirements.
 *
 * NOTE: Part of the new architecture layer.
 * Existing routes continue to call lib/db.js directly.
 */

import jobRepository from '../repositories/job.repository.js';

/** Slug from a job title — mirrors the logic in app/api/jobs/route.js */
function jobSlug(title) {
  return String(title).replace(/[^A-Za-z0-9-]+/g, '-').trim().toLowerCase();
}

/** Map a raw DB row to the shape the frontend expects (mirrors mapJobRow in jobs/route.js) */
function mapRow(row) {
  const has = (k) => row[k] !== undefined && row[k] !== null;
  return {
    id:           has('id')              ? Number(row.id)                : 0,
    title:        has('position_title')  ? row.position_title            : has('title') ? row.title : '',
    description:  has('description')     ? row.description               : '',
    requirements: has('requirements')    ? row.requirements              : '',
    experience:   has('experience_needed') ? row.experience_needed       : has('experience') ? row.experience : '',
    salary:       has('salary_range')    ? row.salary_range              : has('salary') ? row.salary : '',
    job_location: has('location')        ? row.location                  : has('job_location') ? row.job_location : '',
    company_name: has('company_name')    ? row.company_name              : 'NEW ADARSH MANPOWER CONSULTANT PRIVATE LIMITED',
    category:     has('category')        ? row.category                  : 'Manpower',
    vacancies:    has('vacancies')       ? row.vacancies                 : 'Openings',
    status:       has('status')          ? row.status                    : 'active',
    created_at:   has('created_at')      ? row.created_at                : '',
    slug:         has('slug')            ? row.slug                      : has('position_title') ? jobSlug(row.position_title) : '',
  };
}

export const jobService = {
  /** All active jobs mapped to the frontend shape. */
  getActiveJobs: async () => {
    const rows = await jobRepository.findAllActive();
    return rows.map(mapRow);
  },

  /** Single job by id. */
  getById: async (id) => {
    const row = await jobRepository.findById(id);
    if (!row) throw Object.assign(new Error('Job not found'), { statusCode: 404 });
    return mapRow(row);
  },

  /** Single job by slug. */
  getBySlug: async (slug) => {
    const rows = await jobRepository.findAllActive();
    const found = rows.map(mapRow).find((j) => j.slug === slug);
    if (!found) throw Object.assign(new Error(`Job not found by slug: ${slug}`), { statusCode: 404 });
    return found;
  },

  /** All positions (admin view). */
  getAllAdmin: () => jobRepository.findAllAdmin(),

  /** Single position by id (admin view). */
  getByIdAdmin: async (id) => {
    const row = await jobRepository.findByIdAdmin(id);
    if (!row) throw Object.assign(new Error('Position not found'), { statusCode: 404 });
    return row;
  },

  create:   (data) => jobRepository.create(data),
  update:   (data) => jobRepository.update(data),
  delete:   (id)   => jobRepository.deleteById(id),
  count:    ()     => jobRepository.countActive(),
};

export default jobService;
