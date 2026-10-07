# New Adarsh Manpower — Docker Setup

This file documents Docker configuration for local development and production deployment.

> [!NOTE]
> The current production deployment is on **Hostinger** (Node.js app — no Docker). Docker is provided here for local development and future containerized deployments.

## Files

| File | Purpose |
|------|---------|
| `docker-compose.yml` | Local development: MySQL + backend + frontend |
| `Dockerfile.backend` | Production image for the Next.js backend |
| `Dockerfile.frontend` | (Optional) Separate frontend dev container |
| `.dockerignore` | Files to exclude from Docker build context |

## Quick Start (Local Development with Docker)

```bash
# 1. Copy and configure environment
cp backend/.env.example backend/.env.local
# Fill in DB_HOST=db, DB_USER=newaadarsh, DB_PASSWORD=..., DB_NAME=newaadarsh

# 2. Start all services
docker compose up -d

# Frontend available at: http://localhost:5173
# Backend API at:        http://localhost:3000/api
# MySQL at:              localhost:3306
```

## Services

### `db` — MySQL 8
- Image: `mysql:8`
- Port: `3306`
- Volume: `mysql_data` (persistent)
- Init: `database/schemas/schema.sql` (creates tables on first run)

### `backend` — Next.js API
- Port: `3000`
- Depends on: `db`
- Hot reload in development mode

### `frontend` — React + Vite
- Port: `5173`
- Proxies `/api` → backend:3000

## Production Docker Deployment

```bash
# Build production image
docker build -f docker/Dockerfile.backend -t newaadarsh-backend .

# Run with environment variables
docker run -d \
  -p 3000:3000 \
  -e DB_HOST=<host> \
  -e DB_PORT=3306 \
  -e DB_USER=<user> \
  -e DB_PASSWORD=<password> \
  -e DB_NAME=<name> \
  -e JWT_SECRET=<secret> \
  -e ADMIN_USERNAME=<username> \
  -e ADMIN_PASSWORD=<password> \
  newaadarsh-backend
```
