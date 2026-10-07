/**
 * frontend/tests/integration/README.md
 *
 * Frontend integration test guide.
 *
 * Integration tests render React components and verify they interact
 * correctly with mock API responses.
 *
 * Recommended tools:
 *   - Vitest + React Testing Library (@testing-library/react)
 *   - MSW (Mock Service Worker) to intercept /api calls
 *
 * Install:
 *   npm install -D @testing-library/react @testing-library/user-event msw
 *
 * Test scenarios to cover:
 *
 * [AuthContext + Login page]
 *   - Renders login form
 *   - Shows error on wrong credentials (mocked 401)
 *   - Stores token on success (mocked 200 + token)
 *   - Redirects to /admin/dashboard after successful login
 *
 * [Jobs page]
 *   - Shows loading state while fetching
 *   - Renders job cards when API responds with jobs
 *   - Shows empty state when no jobs returned
 *   - Shows error state when API fails
 *
 * [Apply form]
 *   - Shows validation errors on submit with missing fields
 *   - Submits form data correctly (multipart/form-data)
 *   - Shows success message on 200 response
 *
 * [Admin Dashboard]
 *   - Redirects unauthenticated users to login
 *   - Shows stats from mocked /api/admin/dashboard response
 *
 * [Protected routes]
 *   - Unauthenticated access to /admin/* redirects to /admin-login
 *   - Authenticated access renders the protected page
 */
