/**
 * contact.validator.js — Input validation for contact form submissions.
 *
 * NOTE: Part of the new architecture layer.
 * Existing validation in app/api/contact/route.js is NOT changed.
 */

const EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

/**
 * @param {{ name, email, phone, subject, message }} data
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateContactMessage({ name, email, phone, message }) {
  const errors = [];
  if (!name?.trim())    errors.push('Name is required.');
  if (!email?.trim())   errors.push('Email is required.');
  else if (!EMAIL_PATTERN.test(email.toLowerCase())) errors.push('Please enter a valid email address.');
  if (!phone?.trim())   errors.push('Phone number is required.');
  if (!message?.trim()) errors.push('Message is required.');
  return { valid: errors.length === 0, errors };
}

export default { validateContactMessage };
