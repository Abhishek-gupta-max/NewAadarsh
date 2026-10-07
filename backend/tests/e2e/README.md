/**
 * backend/tests/e2e/README.md
 *
 * End-to-End test guide.
 * E2E tests exercise the full stack — frontend + backend + database.
 *
 * Recommended tools:
 *   - Playwright (already a transitive dependency via puppeteer-core in the frontend)
 *   - Cypress
 *
 * Test scenarios to cover:
 *
 * [Public website]
 *   - Home page loads without errors
 *   - Jobs listing page shows active jobs
 *   - Job detail page opens from jobs list
 *   - Apply form submits successfully with valid data
 *   - Apply form shows validation errors on bad input
 *   - Contact form submits successfully
 *
 * [Admin portal]
 *   - /admin-login shows login form
 *   - Login with wrong credentials shows error
 *   - Login with correct credentials redirects to /admin/dashboard
 *   - Dashboard shows stats (applications count etc.)
 *   - Applications list loads, search works
 *   - Application status can be changed
 *   - Application can be deleted
 *   - Job requirements list loads
 *   - New requirement can be added
 *   - Requirement can be edited
 *   - Requirement can be deleted
 *   - Navigating to /admin without token redirects to login
 *
 * [Logout]
 *   - Logout clears token and redirects to login
 */
