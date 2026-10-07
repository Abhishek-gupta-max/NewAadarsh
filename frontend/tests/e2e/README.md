/**
 * frontend/tests/e2e/README.md
 *
 * Frontend E2E test guide using Playwright.
 *
 * The project already has puppeteer-core as a dependency.
 * Playwright is recommended as a more modern/maintained alternative.
 *
 * Install:
 *   npm install -D @playwright/test
 *   npx playwright install
 *
 * Create playwright.config.js in frontend/ directory.
 *
 * Test scenarios: see backend/tests/e2e/README.md for the full list.
 * Frontend E2E focuses on user-facing flows:
 *
 *   1. Homepage loads with navigation
 *   2. Jobs page lists jobs from backend
 *   3. Job detail page opens from job card
 *   4. Apply form submission flow (happy path + validation)
 *   5. Contact form submission flow
 *   6. Admin login → dashboard → logout
 *   7. Admin CRUD operations on job requirements
 *   8. Admin application status updates
 *   9. Responsive layout on mobile viewport
 *  10. 404 redirect to homepage
 */
