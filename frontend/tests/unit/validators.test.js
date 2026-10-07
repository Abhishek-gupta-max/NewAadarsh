/**
 * frontend/tests/unit/validators.test.js
 *
 * Frontend unit test scaffold for utility validators (src/utils/validators.js).
 *
 * NOTE: No existing code is modified. This is a NEW file.
 *
 * Recommended test runner: Vitest (matches the Vite build tool already in use).
 * Install: npm install -D vitest
 * Run: npx vitest run tests/unit/
 */

import { describe, it, expect } from 'vitest';
// Import from the EXISTING validators.js — path must not change.
import * as validators from '../../src/utils/validators';

describe('Frontend validators (src/utils/validators.js)', () => {
  it('should be importable (module loads without errors)', () => {
    expect(validators).toBeDefined();
  });

  /**
   * Add specific tests below as the validators.js API is confirmed.
   * Example structure (uncomment when validators are documented):
   */

  // describe('isValidEmail()', () => {
  //   it('accepts a valid email', () => {
  //     expect(validators.isValidEmail('user@example.com')).toBe(true);
  //   });
  //   it('rejects an invalid email', () => {
  //     expect(validators.isValidEmail('not-an-email')).toBe(false);
  //   });
  // });
});
