import { query } from '../../../lib/db';
import { fail, json, readBody, serverError, str, methodNotAllowed } from '../../../utils/http';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

async function ensureContactTable() {
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS \`contact_messages\` (
        \`id\`         INT           NOT NULL AUTO_INCREMENT,
        \`name\`       VARCHAR(150)  NOT NULL,
        \`email\`      VARCHAR(150)  NOT NULL,
        \`phone\`      VARCHAR(50)   NOT NULL,
        \`subject\`    VARCHAR(255)  DEFAULT NULL,
        \`message\`    TEXT          NOT NULL,
        \`created_at\` TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
  } catch (err) {
    console.warn('[contact:tableCheck]', err.message || err);
  }
}

/**
 * POST /api/contact
 * JSON or form body: name, email, phone, subject, message
 */
export async function POST(request) {
  const body = await readBody(request);

  const name = str(body.name);
  const email = str(body.email);
  const phone = str(body.phone);
  const subject = str(body.subject);
  const message = str(body.message);

  if (!name || !email || !phone || !message) {
    return fail(400, 'All required fields must be provided!');
  }

  try {
    await ensureContactTable();
    await query(
      'INSERT INTO contact_messages (name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?)',
      [name, email, phone, subject, message]
    );
  } catch (err) {
    return serverError('contact', err, 'Unable to send message. Please try again.');
  }


  return json({
    success: true,
    message: 'Message sent successfully! Our team will contact you soon.',
  });
}

export const GET = methodNotAllowed;
export const PUT = methodNotAllowed;
export const DELETE = methodNotAllowed;
