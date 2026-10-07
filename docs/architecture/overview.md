# System Architecture Overview

## Application Summary

**New Adarsh Manpower** is a job portal / manpower consultancy website for New Adarsh Manpower Consultant Private Limited.

It allows:
- Public users to browse job listings, apply for jobs, and contact the company.
- Admin users to manage applications, job requirements, and view dashboard statistics.

---

## Architecture Diagram

```
Browser (React SPA)
        │
        │  /api/*  (HTTP/JSON)
        ▼
Next.js Backend (Node.js 22)
  ├── app/api/jobs/route.js
  ├── app/api/apply/route.js
  ├── app/api/contact/route.js
  └── app/api/admin/*/route.js
        │
        │  mysql2/promise (parameterized queries)
        ▼
MySQL / MariaDB (Hostinger)
  ├── applications
  ├── contact_messages
  ├── job_requirements
  └── jobs (legacy, read-only)
```

## Technology Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend | React + React Router + Axios | 19.x / 7.x / 1.x |
| Build tool | Vite | 8.x |
| Backend | Next.js (App Router) | 16.x |
| Runtime | Node.js | ≥ 20.9 (22 recommended) |
| Database | MySQL / MariaDB | 8.x (Hostinger) |
| ORM/Query | mysql2/promise | 3.x |
| Auth | JWT (jsonwebtoken) | 9.x |
| Deployment | Hostinger Node.js app | — |
| State management | React Context API | built-in |

## Repository Structure

```
newaadarsh/                  ← project root
├── frontend/                ← React SPA (Vite)
│   └── src/
│       ├── components/      ← reusable UI components
│       ├── pages/           ← page-level components
│       ├── layouts/         ← MainLayout, AdminLayout
│       ├── routes/          ← AppRoutes.jsx
│       ├── services/        ← API clients (axios)
│       ├── hooks/           ← custom React hooks
│       ├── context/         ← AuthContext, AppContext
│       ├── utils/           ← helpers, validators, storage
│       ├── constants/       ← app constants (new)
│       ├── types/           ← JSDoc type definitions (new)
│       ├── features/        ← feature-based structure (future)
│       ├── store/           ← global state (future)
│       └── app/             ← app bootstrap (future)
│
├── backend/                 ← Next.js backend (API + static serving)
│   ├── app/api/             ← existing route handlers (DO NOT MOVE)
│   ├── lib/                 ← db.js, auth.js (DO NOT CHANGE)
│   ├── utils/               ← http.js, uploads.js (DO NOT CHANGE)
│   ├── proxy.js             ← CORS middleware (DO NOT CHANGE)
│   ├── server.js            ← production entry point (DO NOT CHANGE)
│   └── src/                 ← NEW architecture layer
│       ├── config/          ← app, database, auth, logger configs
│       ├── controllers/     ← HTTP request handlers
│       ├── services/        ← business logic
│       ├── repositories/    ← data access layer
│       ├── validators/      ← input validation
│       ├── errors/          ← typed error classes
│       ├── health/          ← health check handler
│       ├── constants/       ← shared constants
│       ├── middleware/       ← middleware docs
│       └── routes/          ← route docs
│
├── database/                ← DB documentation and scripts
│   ├── schemas/             ← schema.sql (documentation)
│   ├── migrations/          ← manual migration scripts
│   ├── seeds/               ← dev/staging seed data
│   └── scripts/             ← utility scripts (check-connection.mjs)
│
├── docker/                  ← Docker configuration
├── docs/                    ← architecture documentation
└── scripts/                 ← root-level build scripts
```

## Security Architecture

| Concern | Implementation |
|---------|---------------|
| SQL Injection | mysql2 parameterized queries (all queries) |
| Auth (Admin) | JWT Bearer token, env-based credentials |
| CORS | Allowlist-based (proxy.js) |
| File Upload | Extension + MIME + magic bytes validation |
| Sensitive config | Environment variables only, never in code |
| Path traversal | resolveUploadPath() bounds check |

## Data Flow

### Public Job Application
```
User → POST /api/apply (multipart form)
  → validate fields + file (apply/route.js)
  → save file to UPLOADS_DIR/resumes/
  → INSERT INTO applications
  → JSON 200 { success: true }
```

### Admin Login
```
Admin → POST /api/admin/login { username, password }
  → checkCredentials() → env ADMIN_USERNAME / ADMIN_PASSWORD
  → generateToken() → JWT signed with JWT_SECRET
  → JSON 200 { success, token, username }
```

### Protected Admin Request
```
Admin → GET /api/admin/dashboard
  → requireAdminAuth() → verify JWT → null (pass) or 401 Response
  → query database → JSON 200 { stats, latest_applications }
```
