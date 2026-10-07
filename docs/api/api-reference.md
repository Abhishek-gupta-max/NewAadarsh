# API Reference

Base URL: `/api` (same-domain when served by Next.js backend)

All responses are JSON. Error responses use the format:
```json
{ "success": false, "message": "...", "error": "..." }
```

---

## Public Endpoints

### GET /api/jobs

Returns active job listings.

**Query parameters:**
| Param | Type | Description |
|-------|------|-------------|
| `id`  | number | Return a single job by ID |
| `slug` | string | Return a single job by slug |

**Response 200:**
```json
[
  {
    "id": 1,
    "title": "Software Engineer",
    "description": "...",
    "requirements": "...",
    "experience": "2+ years",
    "salary": "30,000 INR/month",
    "job_location": "Delhi",
    "company_name": "NEW ADARSH MANPOWER CONSULTANT PRIVATE LIMITED",
    "category": "Manpower",
    "vacancies": "5",
    "status": "active",
    "created_at": "2026-01-01 10:00:00",
    "slug": "software-engineer"
  }
]
```

---

### POST /api/apply

Submit a job application. Body: `multipart/form-data`.

**Fields:**
| Field | Type | Required |
|-------|------|---------|
| `name` | string | Yes |
| `email` | string | Yes |
| `phone` | string | Yes |
| `job_position` | string | Yes |
| `experience` | string | Yes |
| `message` | string | No |
| `resume` | File | Yes (PDF/DOC/DOCX/JPG/PNG, max 5 MB) |

**Response 200:**
```json
{ "success": true, "message": "Application submitted successfully!" }
```

---

### POST /api/contact

Submit a contact form message. Body: JSON or `multipart/form-data`.

**Fields:** `name`, `email`, `phone`, `subject` (optional), `message`

**Response 200:**
```json
{ "success": true, "message": "Message sent successfully! Our team will contact you soon." }
```

---

## Admin Endpoints (require `Authorization: Bearer <token>`)

### POST /api/admin/login

**Body:** `{ "username": "...", "password": "..." }`

**Response 200:**
```json
{ "success": true, "token": "<jwt>", "username": "admin", "message": "Logged in successfully!" }
```

---

### GET /api/admin/dashboard

**Response 200:**
```json
{
  "stats": {
    "total_apps": 42,
    "pending_apps": 10,
    "approved_apps": 28,
    "rejected_apps": 4
  },
  "latest_applications": [ { "id": 1, "name": "...", ... } ]
}
```

---

### GET /api/admin/applications

| Param | Description |
|-------|-------------|
| `id` | Single application by ID |
| `search` | Filter by name/email/phone/job_position |

### POST /api/admin/applications

Update application status:
```json
{ "action": "update_status", "id": 1, "status": "approved" }
```

### DELETE /api/admin/applications?id=N

Delete an application and its resume file.

---

### GET /api/admin/requirements

| Param | Description |
|-------|-------------|
| `id` | Single position by ID |

### POST /api/admin/requirements

Create a new job requirement. Body: JSON with position fields.

### PUT /api/admin/requirements

Update an existing requirement. Body must include `id`.

### DELETE /api/admin/requirements?id=N

Delete a job requirement.

---

### GET /api/admin/settings

Returns system info and statistics.

---

## Error Responses

| Status | Meaning |
|--------|---------|
| 400 | Bad request / validation error |
| 401 | Unauthorized (invalid/missing token) |
| 404 | Resource not found |
| 405 | Method not allowed |
| 500 | Internal server error |
