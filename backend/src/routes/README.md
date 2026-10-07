/**
 * README.md — Backend routes documentation.
 *
 * Documents all existing API routes and their location in the codebase.
 */

# Backend Routes

All routes use the Next.js App Router convention:
`backend/app/api/<path>/route.js`

DO NOT change existing route files. Future routes should follow the same convention.

## Existing Routes

| Method   | Path                          | File                                      | Auth Required |
|----------|-------------------------------|-------------------------------------------|:-------------:|
| GET      | /api/jobs                     | app/api/jobs/route.js                     | No            |
| POST     | /api/apply                    | app/api/apply/route.js                    | No            |
| POST     | /api/contact                  | app/api/contact/route.js                  | No            |
| POST     | /api/admin/login              | app/api/admin/login/route.js              | No            |
| GET      | /api/admin/dashboard          | app/api/admin/dashboard/route.js          | Yes (JWT)     |
| GET      | /api/admin/applications       | app/api/admin/applications/route.js       | Yes (JWT)     |
| POST     | /api/admin/applications       | app/api/admin/applications/route.js       | Yes (JWT)     |
| DELETE   | /api/admin/applications       | app/api/admin/applications/route.js       | Yes (JWT)     |
| GET      | /api/admin/requirements       | app/api/admin/requirements/route.js       | Yes (JWT)     |
| POST     | /api/admin/requirements       | app/api/admin/requirements/route.js       | Yes (JWT)     |
| PUT      | /api/admin/requirements       | app/api/admin/requirements/route.js       | Yes (JWT)     |
| DELETE   | /api/admin/requirements       | app/api/admin/requirements/route.js       | Yes (JWT)     |
| GET      | /api/admin/settings           | app/api/admin/settings/route.js           | Yes (JWT)     |
| GET/POST | /api/*                        | app/api/[...path]/route.js                | No (404)      |
| GET      | /uploads/*                    | app/uploads/[...path]/route.js            | No            |

## Planned Routes (Architecture Layer)

| Method | Path            | Notes                                  |
|--------|-----------------|----------------------------------------|
| GET    | /api/health     | Health check — see src/health/health.js |
| GET    | /api/health/db  | Database connectivity check            |

## Route Design Rules (for future development)

1. Routes define endpoints only — no business logic.
2. All business logic lives in `src/services/`.
3. All DB queries live in `src/repositories/`.
4. Input validation lives in `src/validators/`.
5. Authenticated routes call `requireAdminAuth()` from `lib/auth.js` first.
6. Always return structured JSON (use `utils/http.js` helpers).
7. Parameterize all database queries — NEVER interpolate user input.
