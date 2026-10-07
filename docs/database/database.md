# Database Architecture

## Technology

**MySQL / MariaDB** hosted on Hostinger (database: `u624959623_newadarsh`)

## Connection

- Library: `mysql2/promise`
- Connection: pooled (limit: 10, queue: unlimited)
- Pool singleton: cached on `globalThis.__newaadarshPool` (hot-reload safe)
- Charset: `utf8mb4`
- Credentials: environment variables only (`DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`)

## Tables

See [database/schemas/schema.sql](../../database/schemas/schema.sql) for the full DDL.

| Table | Used By | Operations |
|-------|---------|-----------|
| `applications` | `/api/apply`, `/api/admin/applications` | SELECT, INSERT, UPDATE, DELETE |
| `contact_messages` | `/api/contact` | INSERT |
| `job_requirements` | `/api/jobs`, `/api/admin/requirements` | SELECT, INSERT, UPDATE, DELETE |
| `jobs` | `/api/jobs` (fallback) | SELECT (read-only) |
| `company_info` | Not used by backend | — |
| `contacts` | Not used by backend | — |
| `recruitment_area` | Not used by backend | — |
| `website_visitors` | Not used by backend | — |

## Key Design Decisions

1. **No ORM** — raw parameterized queries for simplicity and performance.
2. **No auto-migrations** — the backend never creates, alters, or drops tables.
3. **Dual-table support** — `job_requirements` is preferred; falls back to `jobs` for legacy compatibility.
4. **File storage** — resumes stored on disk (`UPLOADS_DIR/resumes/`), not in the database.
5. **Date strings** — `dateStrings: true` in mysql2 pool, so `DATETIME` values come back as strings.

## Security

- All queries use `?` placeholders — SQL injection is prevented at the library level.
- Database credentials are never committed to Git or exposed to the frontend.
- The `UPLOADS_DIR` path uses bounds checking (`resolveUploadPath()`) to prevent path traversal.

## Migration Strategy

Manual migrations only. See [database/migrations/README.md](../../database/migrations/README.md).

## Connection Health Check

See `backend/src/health/health.js` for the health check handler that verifies DB connectivity.
Wire it to `GET /api/health` in the Next.js app router when ready.
