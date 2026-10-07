# New Adarsh Manpower — Next.js backend

Next.js app that provides the website's API and, in production, also serves the built React frontend from `../frontend/dist`. The frontend calls these routes through `/api`.

Layout: `app/api/*/route.js` (routes), `lib/` (database, admin auth), `utils/` (request/response helpers, upload paths), `proxy.js` (CORS), `scripts/` (build/packaging).

| Route | File |
|---|---|
| `POST /api/apply` | `app/api/apply/route.js` |
| `POST /api/contact` | `app/api/contact/route.js` |
| `GET /api/jobs` | `app/api/jobs/route.js` |
| `POST /api/admin/login` | `app/api/admin/login/route.js` |
| `GET /api/admin/dashboard` | `app/api/admin/dashboard/route.js` |
| `GET/POST/DELETE /api/admin/applications` | `app/api/admin/applications/route.js` |
| `GET/POST/PUT/DELETE /api/admin/requirements` | `app/api/admin/requirements/route.js` |
| `GET /api/admin/settings` | `app/api/admin/settings/route.js` |
| `GET /uploads/...` (uploaded resumes) | `app/uploads/[...path]/route.js` |

The backend never creates, alters or drops tables. It only reads and writes rows in the existing `applications`, `contact_messages` and `job_requirements` tables (and reads the legacy `jobs` table). See `../database/README.md`.

## Setup

```bash
cd backend
npm install
cp .env.example .env.local   # fill in the EXISTING database credentials
```

## Development

```bash
npm run dev        # http://localhost:3000 — the Vite dev server proxies /api and /uploads here
```

Run the frontend from `../frontend` with `npm run dev` (http://localhost:5173).

## Production (one Node.js app serves the website + API)

`npm run build:full` builds the React frontend in `../frontend`, copies its `dist/` into `backend/public/`, then builds Next.js (`npm run build` only builds Next.js, using whatever is already in `public/`). `npm start` then serves:

- the website (all React routes fall back to `index.html`)
- `/api/*` — the API
- `/uploads/*` — uploaded resumes

```bash
cd backend
npm install
npm run build:full
npm start          # listens on $PORT
```

### Hostinger (hPanel → Node.js app)

`npm run build:hostinger` creates `../deploy/hostinger-deploy.zip` (frontend + backend, no secrets, no node_modules).

| Setting | Value |
|---|---|
| Upload | `deploy/hostinger-deploy.zip` |
| Application type / framework | Next.js |
| Node.js version | 22 |
| Build command | `npm run build` (uses Webpack: Hostinger cannot run Turbopack) |
| Output directory | `dist` (Next.js build output, set by `distDir` in next.config.mjs) |
| Start command / entry file | `npm start` / `server.js` |

Environment variables (set in hPanel, not in a committed file):

```
# Set DB_HOST to the exact hostname shown in Hostinger hPanel.
DB_HOST=
DB_PORT=3306
DB_USER=
DB_PASSWORD=<database password>
DB_NAME=
ADMIN_USERNAME=
ADMIN_PASSWORD=
JWT_SECRET=<long random string>
JWT_EXPIRES_IN=24h
UPLOADS_DIR=
# CORS_ORIGINS=https://newadarshmanpower.com   # only if the frontend runs on another domain
```

Set `UPLOADS_DIR` in hPanel to a persistent, writable folder **outside** the app directory so resumes survive redeploys. If the old site has an `uploads/resumes/` folder, copy its files there.
