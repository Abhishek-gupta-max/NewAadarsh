/**
 * application.validator.js — Input validation for job application submissions.
 *
 * NOTE: Part of the new architecture layer.
 * Existing validation in app/api/apply/route.js is NOT changed.
 */

const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const ALLOWED_EXTENSIONS = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png'];
const MAX_SIZE_BYTES = 5 * 1024 * 1024;

/**
 * Validate application form fields (text parts only — file validated separately).
 * @param {{ name, email, phone, job_position, experience, message }} data
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateApplicationFields({ name, email, phone, job_position, experience }) {
  const errors = [];
  if (!name?.trim())         errors.push('Name is required.');
  if (!email?.trim())        errors.push('Email is required.');
  else if (!EMAIL_PATTERN.test(email.toLowerCase())) errors.push('Please enter a valid email address.');
  if (!phone?.trim())        errors.push('Phone number is required.');
  else if (phone.replace(/[^0-9+]/g, '').length < 10) errors.push('Please enter a valid phone number.');
  if (!job_position?.trim()) errors.push('Job position is required.');
  if (!experience?.trim())   errors.push('Experience is required.');
  return { valid: errors.length === 0, errors };
}

/**
 * Validate an uploaded resume file (extension + size).
 * @param {{ name: string, size: number, type: string }} file
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateResumeFile(file) {
  const errors = [];
  if (!file || file.size === 0) {
    errors.push('Resume file is required.');
    return { valid: false, errors };
  }
  const ext = (file.name || '').split('.').pop().toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    errors.push(`Only ${ALLOWED_EXTENSIONS.join(', ')} files are allowed.`);
  }
  if (file.size > MAX_SIZE_BYTES) {
    errors.push('File size must be less than 5 MB.');
  }
  return { valid: errors.length === 0, errors };
}

export default { validateApplicationFields, validateResumeFile };
