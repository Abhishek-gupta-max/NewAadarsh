/**
 * README.md — Backend middleware documentation.
 *
 * This file documents all middleware used by the existing backend and
 * provides scaffolding for future middleware additions.
 *
 * The existing backend uses Next.js App Router — middleware in this project
 * is handled differently from Express.js (no app.use() pattern).
 */

# Backend Middleware

## Existing Middleware

### CORS — `proxy.js`
- Handles all `OPTIONS` preflight requests for `/api/*` routes.
- Allowed origins: `CORS_ORIGINS` env var (comma-separated) + hardcoded production domains.
- In development, `http://localhost:5173` and `http://localhost:4173` are automatically allowed.

### Authentication — `lib/auth.js`
- `requireAdminAuth(request)` — called at the top of every protected route handler.
- Validates the `Authorization: Bearer <token>` header using `JWT_SECRET`.
- Returns a 401 Response if invalid; `null` if valid.

### Request Body Parsing — `utils/http.js → readBody()`
- Supports `application/json` and `multipart/form-data`.
- Gracefully handles malformed bodies (returns empty object).

### Error Handling — `utils/http.js`
- `fail(status, message)` — structured error response.
- `serverError(context, err, message)` — logs to console.error + returns 500.
- `methodNotAllowed()` — 405 response for unsupported HTTP verbs.

## Future Middleware (Architecture Layer — Not Yet Active)

### Rate Limiting
- Recommended: `express-rate-limit` (if migrating to Express) or a custom
  Next.js middleware using an in-memory or Redis store.
- Target endpoints: `POST /api/apply`, `POST /api/contact`, `POST /api/admin/login`.

### Request Logging
- Recommended: Log every incoming `/api/*` request with method, path, status, duration.
- See `src/config/logger.js` for the structured logger interface.

### Security Headers
- Recommended: `Helmet.js` (if migrating to Express) or manual header setting in Next.js
  middleware (`proxy.js` can be extended).
- Headers to add: `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`.

### Input Sanitization
- Existing: parameterized queries prevent SQL injection.
- Future: HTML sanitization for stored text fields displayed back to users.

### Validation Middleware
- See `src/validators/` for validation functions.
- Future: wrap validators as middleware that runs before controller methods.
