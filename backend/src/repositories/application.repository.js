/**
 * application.repository.js — Data access layer for the `applications` table.
 *
 * NOTE: Part of the new architecture layer.
 * This file does NOT replace the existing database queries in
 * app/api/admin/applications/route.js or app/api/apply/route.js.
 * Those routes continue to call lib/db.js directly.
 *
 * This repository is intended for use in NEW code or when gradually migrating
 * existing route logic into the Controller → Service → Repository pattern.
 *
 * All queries use parameterized statements (mysql2 placeholder '?').
 * No raw string interpolation of user input is permitted.
 */

import { query } from '../../lib/db.js';

const TABLE = 'applications';

export const applicationRepository = {
  /**
   * Find all applications, optionally filtered by a search term.
   * @param {string} [search] — filters name, email, phone, job_position
   * @returns {Promise<Array>}
   */
  findAll: async (search = '') => {
    if (search) {
      const like = `%${search}%`;
      return query(
        `SELECT * FROM ${TABLE}
         WHERE name LIKE ? OR email LIKE ? OR phone LIKE ? OR job_position LIKE ?
         ORDER BY created_at DESC`,
        [like, like, like, like]
      );
    }
    return query(`SELECT * FROM ${TABLE} ORDER BY created_at DESC`);
  },

  /**
   * Find a single application by primary key.
   * @param {number} id
   * @returns {Promise<Object|null>}
   */
  findById: async (id) => {
    const rows = await query(`SELECT * FROM ${TABLE} WHERE id = ?`, [id]);
    return rows[0] || null;
  },

  /**
   * Insert a new application row.
   * @param {{ name, email, phone, job_position, experience, resume_file, file_path, message }} data
   * @returns {Promise<{ insertId: number }>}
   */
  create: async ({ name, email, phone, job_position, experience, resume_file, file_path, message }) => {
    return query(
      `INSERT INTO ${TABLE} (name, email, phone, job_position, experience, resume_file, file_path, message)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, email, phone, job_position, experience, resume_file, file_path, message]
    );
  },

  /**
   * Update the status of an application.
   * @param {number} id
   * @param {'pending'|'approved'|'rejected'} status
   * @returns {Promise<Object>} mysql2 result header
   */
  updateStatus: async (id, status) => {
    return query(`UPDATE ${TABLE} SET status = ? WHERE id = ?`, [status, id]);
  },

  /**
   * Delete an application by id.
   * @param {number} id
   */
  deleteById: async (id) => {
    return query(`DELETE FROM ${TABLE} WHERE id = ?`, [id]);
  },

  /** Dashboard aggregate counts */
  getCounts: async () => {
    const [total, pending, approved, rejected] = await Promise.all([
      query(`SELECT COUNT(*) AS count FROM ${TABLE}`),
      query(`SELECT COUNT(*) AS count FROM ${TABLE} WHERE status='pending'`),
      query(`SELECT COUNT(*) AS count FROM ${TABLE} WHERE status='approved'`),
      query(`SELECT COUNT(*) AS count FROM ${TABLE} WHERE status='rejected'`),
    ]);
    return {
      total:    Number(total[0]?.count ?? 0),
      pending:  Number(pending[0]?.count ?? 0),
      approved: Number(approved[0]?.count ?? 0),
      rejected: Number(rejected[0]?.count ?? 0),
    };
  },

  /** Retrieve the N most recent applications */
  getLatest: async (limit = 5) => {
    return query(`SELECT * FROM ${TABLE} ORDER BY created_at DESC LIMIT ?`, [limit]);
  },
};

export default applicationRepository;
