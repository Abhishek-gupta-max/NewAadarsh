# New Adarsh Manpower — newadarshmanpower.com

```
project-root/
├── frontend/   React (Vite) website — all pages, forms, admin panel UI
├── backend/    Next.js backend — API routes, MySQL access, file uploads; also serves the built website in production
├── database/   Documentation of the existing MySQL tables
├── .gitignore
└── README.md
```

```
React frontend  →  Next.js API (/api/...)  →  MySQL (existing database)
```

`uploads/` (resume files, local development data) and `deploy/` (generated Hostinger zip) are not committed.

## Local development

Needs Node.js 20+ and a MySQL database.

```bash
# 1. Backend (http://localhost:3000)
cd backend
npm install
cp .env.example .env.local      # fill in DB_* and admin settings
npm run dev

# 2. Frontend (http://localhost:5173) — in a second terminal
cd frontend
npm install
npm run dev
```

The Vite dev server forwards `/api` and `/uploads` to the backend on port 3000, so `VITE_API_BASE_URL` can stay empty.

## API

| Route | Purpose |
|---|---|
| `POST /api/apply` | Job application with resume upload |
| `POST /api/contact` | Contact form |
| `GET /api/jobs` | Job list, or one job with `?id=` / `?slug=` |
| `POST /api/admin/login` | Admin login (returns a token) |
| `GET /api/admin/dashboard` | Admin statistics |
| `GET/POST/DELETE /api/admin/applications` | List/search, change status, delete applications |
| `GET/POST/PUT/DELETE /api/admin/requirements` | Manage job positions |
| `GET /api/admin/settings` | System info and counts |
| `GET /uploads/...` | Uploaded resume files |

Details: [backend/README.md](backend/README.md) and [backend/API_REFERENCE.md](backend/API_REFERENCE.md). Tables: [database/README.md](database/README.md).

## Environment variables

**Frontend** (`frontend/.env.example`) — only `VITE_*` values, nothing secret:

| Variable | Value |
|---|---|
| `VITE_API_BASE_URL` | Empty when the backend serves the website on the same domain (recommended). Otherwise the backend's address, e.g. `https://api.newadarshmanpower.com`. |

**Backend** (`backend/.env.example`) — server only:

| Variable | Purpose |
|---|---|
| `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` | Existing MySQL database |
| `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `JWT_SECRET`, `JWT_EXPIRES_IN` | Admin login |
| `UPLOADS_DIR` | Folder where resumes are stored (outside the app folder in production) |
| `CORS_ORIGINS` | Only needed when the frontend is on a different domain |

## Build

```bash
cd frontend && npm install && npm run build                    # → frontend/dist
cd backend  && npm install && npm run build && npm start       # API only
cd backend  && npm run build:hostinger                         # website + API → deploy/hostinger-deploy.zip
```

## Deploy to Hostinger (one Node.js app — recommended)

1. `cd backend && npm run build:hostinger`
2. hPanel → Websites → newadarshmanpower.com → Node.js app → **Upload new files** → `deploy/hostinger-deploy.zip`
3. Build command `npm run build`, start command `npm start`, output directory **empty**, Node.js 20 or 22.
4. Environment variables: the backend list above, using the database hostname shown in Hostinger hPanel. Set `DB_HOST=localhost` only if Hostinger explicitly specifies it for that database. Leave `VITE_API_BASE_URL` empty (same domain).
5. Deploy. The build log must show `newaadarsh-backend … next build`. Check `https://newadarshmanpower.com/api/jobs` returns JSON.

Alternative — two separate apps: deploy the backend alone (e.g. `api.newadarshmanpower.com`, `npm run build` + `npm start`, `CORS_ORIGINS=https://newadarshmanpower.com`), and build the frontend with `VITE_API_BASE_URL=https://api.newadarshmanpower.com` before uploading `frontend/dist` to the main domain.
