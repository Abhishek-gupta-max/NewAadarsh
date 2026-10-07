/**
 * job.repository.js — Data access layer for the `job_requirements` (and legacy `jobs`) table.
 *
 * NOTE: Part of the new architecture layer.
 * This file does NOT replace the existing queries in app/api/jobs/route.js or
 * app/api/admin/requirements/route.js.
 *
 * The backend auto-detects which table to use (job_requirements vs jobs) at runtime.
 * This repository wraps those same queries for future use in the service layer.
 */

import { query, tableExists } from '../../lib/db.js';

/** Resolve the correct table to query (job_requirements preferred, falls back to jobs). */
async function resolveTable() {
  if (await tableExists('job_requirements')) return 'job_requirements';
  if (await tableExists('jobs'))             return 'jobs';
  return null;
}

export const jobRepository = {
  /** Return all active jobs. */
  findAllActive: async () => {
    const table = await resolveTable();
    if (!table) return [];
    const rows = await query(`SELECT * FROM ${table} WHERE status = 'active' ORDER BY id DESC`);
    // Fallback: if job_requirements is empty, try jobs table
    if (rows.length === 0 && table === 'job_requirements' && await tableExists('jobs')) {
      return query("SELECT * FROM jobs WHERE status = 'active' ORDER BY id DESC");
    }
    return rows;
  },

  /** Find a job by primary key. */
  findById: async (id) => {
    const table = await resolveTable();
    if (!table) return null;
    const rows = await query(`SELECT * FROM ${table} WHERE id = ?`, [id]);
    return rows[0] || null;
  },

  /** Find all positions (admin view — all statuses). Requires job_requirements table. */
  findAllAdmin: async () => {
    return query('SELECT * FROM job_requirements ORDER BY created_at DESC');
  },

  /** Find one position by id (admin view). */
  findByIdAdmin: async (id) => {
    const rows = await query('SELECT * FROM job_requirements WHERE id = ?', [id]);
    return rows[0] || null;
  },

  /** Create a new job requirement. */
  create: async ({ position_title, description, requirements, experience_needed, salary_range, location }) => {
    return query(
      `INSERT INTO job_requirements (position_title, description, requirements, experience_needed, salary_range, location)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [position_title, description, requirements, experience_needed, salary_range, location]
    );
  },

  /** Update an existing job requirement. */
  update: async ({ id, position_title, description, requirements, experience_needed, salary_range, location, status }) => {
    return query(
      `UPDATE job_requirements SET
         position_title = ?, description = ?, requirements = ?,
         experience_needed = ?, salary_range = ?, location = ?, status = ?
       WHERE id = ?`,
      [position_title, description, requirements, experience_needed, salary_range, location, status, id]
    );
  },

  /** Delete a job requirement. */
  deleteById: async (id) => {
    return query('DELETE FROM job_requirements WHERE id = ?', [id]);
  },

  /** Count of active positions. */
  countActive: async () => {
    const table = await resolveTable();
    if (!table) return 0;
    const rows = await query(`SELECT COUNT(*) AS count FROM ${table}`);
    return Number(rows[0]?.count ?? 0);
  },
};

export default jobRepository;
