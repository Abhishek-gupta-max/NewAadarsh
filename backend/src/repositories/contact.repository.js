/**
 * contact.repository.js — Data access layer for the `contact_messages` table.
 *
 * NOTE: Part of the new architecture layer.
 * The existing query in app/api/contact/route.js continues to work unchanged.
 */

import { query } from '../../lib/db.js';

const TABLE = 'contact_messages';

export const contactRepository = {
  /**
   * Insert a new contact message.
   * @param {{ name, email, phone, subject, message }} data
   */
  create: async ({ name, email, phone, subject, message }) => {
    return query(
      `INSERT INTO ${TABLE} (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)`,
      [name, email, phone, subject, message]
    );
  },

  /** Retrieve all contact messages (admin use). */
  findAll: async () => {
    return query(`SELECT * FROM ${TABLE} ORDER BY created_at DESC`);
  },

  /** Find a single message by id. */
  findById: async (id) => {
    const rows = await query(`SELECT * FROM ${TABLE} WHERE id = ?`, [id]);
    return rows[0] || null;
  },
};

export default contactRepository;
