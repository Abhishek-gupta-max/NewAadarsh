/**
 * job.validator.js — Input validation for job requirement management.
 *
 * NOTE: Part of the new architecture layer.
 * Existing validation in app/api/admin/requirements/route.js is NOT changed.
 */

const VALID_STATUSES = ['active', 'inactive'];

/**
 * Validate fields for creating/updating a job requirement.
 * @param {{ position_title, description, requirements, experience_needed, salary_range, location, status }} data
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateJobRequirement(data) {
  const errors = [];
  if (!data?.position_title?.trim()) {
    errors.push('Position title is required.');
  }
  if (data.status !== undefined && !VALID_STATUSES.includes(data.status)) {
    errors.push(`Status must be one of: ${VALID_STATUSES.join(', ')}.`);
  }
  return { valid: errors.length === 0, errors };
}

/**
 * Validate the id field for update/delete operations.
 * @param {number|string} id
 * @returns {{ valid: boolean, errors: string[] }}
 */
export function validateId(id) {
  const parsed = parseInt(id, 10);
  if (isNaN(parsed) || parsed <= 0) {
    return { valid: false, errors: ['A valid positive integer ID is required.'] };
  }
  return { valid: true, errors: [] };
}

export default { validateJobRequirement, validateId };
