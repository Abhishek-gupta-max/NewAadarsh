/**
 * backend/tests/unit/validators.test.js
 *
 * Unit tests for the validators in src/validators/.
 * These tests are pure — they do not touch the database.
 *
 * NOTE: No existing code is modified. This is a NEW file.
 */

const { validateAdminLogin }       = require('../../src/validators/auth.validator.js');
const { validateApplicationFields } = require('../../src/validators/application.validator.js');
const { validateContactMessage }   = require('../../src/validators/contact.validator.js');
const { validateJobRequirement }   = require('../../src/validators/job.validator.js');

// ─── Auth validator ───────────────────────────────────────────────────────────
describe('validateAdminLogin()', () => {
  it('passes with valid username and password', () => {
    const { valid, errors } = validateAdminLogin({ username: 'admin', password: 'secret' });
    expect(valid).toBe(true);
    expect(errors).toHaveLength(0);
  });

  it('fails when username is missing', () => {
    const { valid, errors } = validateAdminLogin({ username: '', password: 'secret' });
    expect(valid).toBe(false);
    expect(errors.length).toBeGreaterThan(0);
  });

  it('fails when password is missing', () => {
    const { valid, errors } = validateAdminLogin({ username: 'admin', password: '' });
    expect(valid).toBe(false);
    expect(errors.length).toBeGreaterThan(0);
  });
});

// ─── Application validator ────────────────────────────────────────────────────
describe('validateApplicationFields()', () => {
  const valid = {
    name: 'John Doe', email: 'john@example.com', phone: '9876543210',
    job_position: 'Software Engineer', experience: '2 years',
  };

  it('passes with all valid fields', () => {
    expect(validateApplicationFields(valid).valid).toBe(true);
  });

  it('fails with invalid email', () => {
    const result = validateApplicationFields({ ...valid, email: 'not-an-email' });
    expect(result.valid).toBe(false);
  });

  it('fails with short phone number', () => {
    const result = validateApplicationFields({ ...valid, phone: '123' });
    expect(result.valid).toBe(false);
  });

  it('fails when name is missing', () => {
    const result = validateApplicationFields({ ...valid, name: '' });
    expect(result.valid).toBe(false);
  });
});

// ─── Contact validator ────────────────────────────────────────────────────────
describe('validateContactMessage()', () => {
  const valid = { name: 'Jane', email: 'jane@example.com', phone: '9876543210', message: 'Hello' };

  it('passes with all valid fields', () => {
    expect(validateContactMessage(valid).valid).toBe(true);
  });

  it('fails without message', () => {
    expect(validateContactMessage({ ...valid, message: '' }).valid).toBe(false);
  });
});

// ─── Job validator ────────────────────────────────────────────────────────────
describe('validateJobRequirement()', () => {
  it('passes with a position title', () => {
    expect(validateJobRequirement({ position_title: 'Engineer' }).valid).toBe(true);
  });

  it('fails without position title', () => {
    expect(validateJobRequirement({ position_title: '' }).valid).toBe(false);
  });

  it('fails with invalid status', () => {
    expect(validateJobRequirement({ position_title: 'Engineer', status: 'unknown' }).valid).toBe(false);
  });
});
