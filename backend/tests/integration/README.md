/**
 * backend/tests/integration/README.md
 *
 * Integration test guide for the backend API.
 * Integration tests call actual API endpoints against a real (test) database.
 *
 * Prerequisites:
 *   1. A local MySQL instance with a dedicated test database.
 *   2. A .env.test file (copy .env.example, point to test DB).
 *   3. Test DB pre-loaded with the schema from database/schemas/.
 *
 * Recommended tool: Vitest + supertest (or node:test + undici for Node.js 20+).
 *
 * Run: npm run test:integration (script to be added to package.json)
 *
 * Test scenarios to cover:
 *
 * [POST /api/admin/login]
 *   - Returns 200 + token with correct credentials
 *   - Returns 401 with wrong password
 *   - Returns 400 with missing fields
 *
 * [GET /api/jobs]
 *   - Returns 200 + array of active jobs
 *   - Returns 200 + single job when ?id=N is valid
 *   - Returns 404 when ?id=N does not exist
 *   - Returns 200 + single job when ?slug=X is valid
 *
 * [POST /api/apply]
 *   - Returns 200 on valid multipart form with PDF resume
 *   - Returns 400 on missing required fields
 *   - Returns 400 on invalid email
 *   - Returns 400 on oversized file
 *   - Returns 400 on invalid file type
 *
 * [POST /api/contact]
 *   - Returns 200 on valid body
 *   - Returns 400 on missing fields
 *
 * [GET /api/admin/dashboard]
 *   - Returns 200 + stats when authenticated
 *   - Returns 401 when not authenticated
 *
 * [GET /api/admin/applications]
 *   - Returns 200 + array when authenticated
 *   - Returns 401 when not authenticated
 *   - Returns 200 filtered results when ?search=X
 *
 * [POST /api/admin/applications] (update_status)
 *   - Returns 200 on valid status update
 *   - Returns 400 on invalid status value
 *
 * [DELETE /api/admin/applications?id=N]
 *   - Returns 200 when application exists
 *   - Returns 400 with invalid id
 *
 * [GET/POST/PUT/DELETE /api/admin/requirements]
 *   - Full CRUD operations on job_requirements table
 *   - Validates authentication on all operations
 *
 * [GET /api/admin/settings]
 *   - Returns system info and statistics when authenticated
 */
