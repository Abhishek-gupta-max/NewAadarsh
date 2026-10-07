import crypto from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { query } from '../../../lib/db';
import { fail, json, serverError, str, methodNotAllowed } from '../../../utils/http';
import { RESUMES_DIR } from '../../../utils/uploads';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ALLOWED_EXT = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png'];
const ALLOWED_MIME = {
  pdf: 'application/pdf',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
};
const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function hasValidSignature(buffer, ext) {
  if (ext === 'pdf') return buffer.subarray(0, 5).toString() === '%PDF-';
  if (ext === 'jpg' || ext === 'jpeg') return buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff;
  if (ext === 'png') return buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]));
  if (ext === 'doc') return buffer.subarray(0, 8).equals(Buffer.from([0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]));
  return ext === 'docx' && buffer.subarray(0, 4).toString() === 'PK\u0003\u0004';
}

async function ensureApplicationsTable() {
  try {
    await query(`
      CREATE TABLE IF NOT EXISTS \`applications\` (
        \`id\`           INT           NOT NULL AUTO_INCREMENT,
        \`name\`         VARCHAR(100)  NOT NULL,
        \`email\`        VARCHAR(100)  NOT NULL,
        \`phone\`        VARCHAR(20)   NOT NULL,
        \`job_position\` VARCHAR(100)  NOT NULL,
        \`experience\`   VARCHAR(100)  NOT NULL,
        \`resume_file\`  VARCHAR(255)  DEFAULT NULL,
        \`file_path\`    VARCHAR(255)  DEFAULT NULL,
        \`message\`      LONGTEXT      DEFAULT NULL,
        \`created_at\`   TIMESTAMP     NOT NULL DEFAULT CURRENT_TIMESTAMP,
        \`status\`       VARCHAR(50)   NOT NULL DEFAULT 'pending',
        PRIMARY KEY (\`id\`)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `);
  } catch (err) {
    console.warn('[apply:tableCheck]', err.message || err);
  }
}

/**
 * POST /api/apply
 * multipart/form-data: name, email, phone, job_position, experience, message, resume
 */
export async function POST(request) {
  let form;
  try {
    form = await request.formData();
  } catch {
    return fail(400, 'Invalid form submission!');
  }

  const name = str(form.get('name'));
  const email = str(form.get('email'));
  const phone = str(form.get('phone'));
  const job_position = str(form.get('job_position'));
  const experience = str(form.get('experience'));
  const message = str(form.get('message'));

  if (!name || !email || !phone || !job_position || !experience) {
    return fail(400, 'All required fields (name, email, phone, position, experience) must be provided!');
  }
  if (!EMAIL_PATTERN.test(email.toLowerCase())) {
    return fail(400, 'Please enter a valid email address!');
  }
  if (phone.replace(/[^0-9+]/g, '').length < 10) {
    return fail(400, 'Please enter a valid phone number!');
  }

  const resume = form.get('resume');
  if (!resume || typeof resume === 'string' || resume.size === 0) {
    return fail(400, 'Resume file is required!');
  }

  const ext = path.extname(resume.name || '').slice(1).toLowerCase();
  if (!ALLOWED_EXT.includes(ext)) {
    return fail(400, 'Only PDF, DOC, DOCX, JPG, JPEG, PNG files are allowed!');
  }
  if (resume.type !== ALLOWED_MIME[ext]) {
    return fail(400, 'The uploaded file type does not match its file extension!');
  }
  if (resume.size > MAX_SIZE) {
    return fail(400, 'File size must be less than 5MB!');
  }

  const contents = Buffer.from(await resume.arrayBuffer());
  if (!hasValidSignature(contents, ext)) {
    return fail(400, 'The uploaded file is invalid or does not match its file type!');
  }

  // File name: resume_<unix time>_<8 hex chars>.<ext>
  const resumeFile = `resume_${Math.floor(Date.now() / 1000)}_${crypto.randomBytes(4).toString('hex')}.${ext}`;
  const destination = path.join(RESUMES_DIR, resumeFile);
  const filePath = `uploads/resumes/${resumeFile}`;

  try {
    await fs.mkdir(RESUMES_DIR, { recursive: true });
    await fs.writeFile(destination, contents);
  } catch (err) {
    return serverError('apply:upload', err, 'Failed to upload file to target directory!');
  }

  try {
    await ensureApplicationsTable();
    await query(
      `INSERT INTO applications (name, email, phone, job_position, experience, resume_file, file_path, message, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [name, email, phone, job_position, experience, resumeFile, filePath, message]
    );
  } catch (err) {
    // Don't leave an orphaned file from this request behind
    await fs.unlink(destination).catch(() => {});
    return serverError('apply:db', err, 'Unable to submit application. Please try again.');
  }

  return json({ success: true, message: 'Application submitted successfully!' });
}


export const GET = methodNotAllowed;
export const PUT = methodNotAllowed;
export const DELETE = methodNotAllowed;
