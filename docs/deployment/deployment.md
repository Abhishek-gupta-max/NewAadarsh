# Deployment Guide

## Production Environment (Hostinger)

The application runs as a **single Node.js app** on Hostinger hPanel.
The Next.js backend serves both the React frontend and the API.

### Setup Steps

1. **Upload** `deploy/hostinger-deploy.zip` (built via `npm run build:backend` from root)
2. **Configure** hPanel → Node.js App:
   | Setting | Value |
   |---------|-------|
   | Application type | Next.js |
   | Node.js version | 22 |
   | Build command | `npm run build` |
   | Output directory | `dist` |
   | Start command | `npm start` |
   | Entry file | `server.js` |

3. **Set environment variables** in hPanel (NEVER commit these):
   ```
   DB_HOST=<Hostinger MySQL hostname>
   DB_PORT=3306
   DB_USER=<database username>
   DB_PASSWORD=<database password>
   DB_NAME=<database name>
   ADMIN_USERNAME=<admin username>
   ADMIN_PASSWORD=<admin password>
   JWT_SECRET=<long random string, min 32 chars>
   JWT_EXPIRES_IN=24h
   UPLOADS_DIR=<persistent folder outside app dir>
   ```

4. **Set UPLOADS_DIR** to a folder outside the app directory so resume files survive redeployments.

### Build Commands (from project root)

```bash
# Build and package for Hostinger
npm run build:backend   # → deploy/hostinger-deploy.zip

# Build locally (backend serves frontend)
npm run build           # frontend build + Next.js build
npm start               # serves on PORT (default 3000)
```

---

## Local Development

```bash
# Install dependencies (both frontend + backend)
npm install             # runs postinstall which installs both

# Run both servers concurrently
npm run dev             # frontend :5173 + backend :3000

# Or run separately:
npm run dev:frontend    # Vite dev server at :5173
npm run dev:backend     # Next.js dev at :3000
```

---

## Docker (Local Development Only)

See [docker/README.md](../../docker/README.md).

```bash
docker compose -f docker/docker-compose.yml up -d
```

---

## CI/CD Recommendations

A basic GitHub Actions pipeline (`/.github/workflows/deploy.yml`) should:

1. On push to `main`:
   - Run linter: `npm --prefix frontend run lint`
   - Run tests: `npm run test` (when configured)
   - Build: `npm run build:backend`
   - Upload `deploy/hostinger-deploy.zip` as a workflow artifact
   - (Optional) Deploy via Hostinger API / FTP

---

## Health Check

Once the `/api/health` endpoint is wired (see `backend/src/health/health.js`):

```bash
# Check application health
curl https://newadarshmanpower.com/api/health

# Response (healthy):
{ "status": "ok", "uptime": 3600, "checks": { "database": { "connected": true } } }

# Response (degraded):
{ "status": "degraded", "checks": { "database": { "connected": false, "error": "..." } } }
```

---

## Graceful Shutdown

The production `server.js` listens on `$PORT`. Node.js handles `SIGTERM` automatically.
For zero-downtime deployments, configure a process manager (PM2 or Hostinger's built-in) to
send `SIGTERM` and wait for the process to finish handling in-flight requests.

---

## Reverse Proxy (HTTPS)

Hostinger handles HTTPS termination and reverse proxy automatically.
For custom setups (VPS, Docker), use **nginx** or **Caddy**:

```nginx
server {
    listen 443 ssl;
    server_name newadarshmanpower.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```
