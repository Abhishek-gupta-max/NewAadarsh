/**
 * backend/tests/unit/auth.service.test.js
 *
 * Unit test scaffold for auth.service.js.
 * Tests are illustrative and intentionally do NOT run against a real database
 * or real environment variables — all dependencies are mocked.
 *
 * Run with: npm test (once a test runner such as Jest or Vitest is configured)
 *
 * NOTE: No existing code is modified. This is a NEW file.
 */

// ─── Mocks ───────────────────────────────────────────────────────────────────
// Mock lib/auth.js so no real JWT_SECRET or environment variables are required
const mockCheckCredentials = jest.fn();
const mockGenerateToken    = jest.fn();

jest.mock('../../lib/auth.js', () => ({
  checkCredentials: mockCheckCredentials,
  generateToken:    mockGenerateToken,
  requireAdminAuth: jest.fn(),
}));

// ─── Subject under test ───────────────────────────────────────────────────────
const { authService } = require('../../src/services/auth.service.js');

// ─── Tests ───────────────────────────────────────────────────────────────────
describe('authService.login()', () => {
  beforeEach(() => jest.clearAllMocks());

  it('returns success with token on valid credentials', () => {
    mockCheckCredentials.mockReturnValue(true);
    mockGenerateToken.mockReturnValue('mock-token-123');

    const result = authService.login('admin', 'correctpassword');

    expect(result.success).toBe(true);
    expect(result.token).toBe('mock-token-123');
    expect(result.username).toBe('admin');
  });

  it('returns failure on invalid credentials', () => {
    mockCheckCredentials.mockReturnValue(false);

    const result = authService.login('admin', 'wrongpassword');

    expect(result.success).toBe(false);
    expect(result.error).toMatch(/invalid/i);
    expect(result.token).toBeUndefined();
  });
});
