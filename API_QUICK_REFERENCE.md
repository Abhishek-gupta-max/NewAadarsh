# Node.js API Quick Reference Guide

## 🚀 Server Startup

```bash
cd server
npm install
cp .env.example .env
npm run dev        # Development mode
npm start          # Production mode
```

Default: `http://localhost:8000`

---

## 📍 Public Endpoints (No Auth)

### 1. GET /api/jobs.php
Fetch job listings.

**Query Parameters:**
- No params: Get all active jobs
- `?id=5`: Get job by ID
- `?slug=software-engineer`: Get job by slug

**Response:**
```json
[
  {
    "id": 1,
    "title": "Software Engineer",
    "description": "...",
    "requirements": "...",
    "experience": "2 years",
    "salary": "5-7 LPA",
    "job_location": "Mumbai",
    "company_name": "NEW ADARSH MANPOWER CONSULTANT PRIVATE LIMITED",
    "category": "Manpower",
    "vacancies": "5",
    "status": "active",
    "created_at": "2024-01-15T10:30:00Z",
    "slug": "software-engineer"
  }
]
```

---

### 2. POST /api/contact.php
Submit contact form.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "subject": "Inquiry",
  "message": "I'm interested..."
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Message sent successfully! Our team will contact you soon."
}
```

**Error (400):**
```json
{
  "error": "All fields are required!"
}
```

---

### 3. POST /api/apply.php
Submit job application with resume.

**Request:** `multipart/form-data`
```
name: "John Doe"
email: "john@example.com"
phone: "9876543210"
job_position: "Software Engineer"
experience: "3 years"
message: "I'm very interested"
resume: <file> (PDF, DOC, DOCX, JPG, PNG - max 5MB)
```

**Response (200):**
```json
{
  "success": true,
  "message": "Application submitted successfully!"
}
```

**Errors:**
```json
{
  "error": "Resume file is required!"
}
{
  "error": "File size must be less than 5MB!"
}
{
  "error": "Only PDF, DOC, DOCX, JPG, JPEG, PNG files are allowed!"
}
```

---

## 🔐 Admin Endpoints (JWT Protected)

All admin endpoints require:
```
Authorization: Bearer <token>
```

### 4. POST /api/admin/login.php
Admin authentication.

**Request Body:**
```json
{
  "username": "admin",
  "password": "admin@123987"
}
```

**Response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "username": "admin",
  "message": "Logged in successfully!"
}
```

**Error (401):**
```json
{
  "error": "Invalid username or password!"
}
```

---

### 5. GET /api/admin/dashboard.php
Dashboard statistics (requires auth).

**Query:** None

**Response:**
```json
{
  "stats": {
    "total_apps": 45,
    "pending_apps": 12,
    "approved_apps": 28,
    "rejected_apps": 5
  },
  "latest_applications": [
    {
      "id": 45,
      "name": "Jane Smith",
      "email": "jane@example.com",
      "phone": "9876543211",
      "job_position": "Developer",
      "status": "pending",
      "created_at": "2024-07-06T15:30:00Z"
    }
  ]
}
```

---

### 6. GET /api/admin/applications.php
List applications (requires auth).

**Query Parameters:**
- No params: Get all applications
- `?id=5`: Get single application
- `?search=john`: Search by name/email/phone/position

**Response (list):**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "job_position": "Software Engineer",
    "experience": "3 years",
    "resume_file": "resume_1234567890.pdf",
    "file_path": "uploads/resumes/resume_1234567890.pdf",
    "message": "Interested in this role",
    "status": "pending",
    "created_at": "2024-07-06T10:30:00Z"
  }
]
```

---

### 7. POST /api/admin/applications.php
Update application status (requires auth).

**Request Body:**
```json
{
  "action": "update_status",
  "id": 5,
  "status": "approved"
}
```

**Valid Statuses:** `pending`, `approved`, `rejected`

**Response:**
```json
{
  "success": true,
  "message": "Status updated successfully!"
}
```

---

### 8. DELETE /api/admin/applications.php
Delete application & uploaded file (requires auth).

**Query:** `?id=5`

**Response:**
```json
{
  "success": true,
  "message": "Application deleted successfully!"
}
```

---

### 9. GET /api/admin/requirements.php
List job positions (requires auth).

**Query Parameters:**
- No params: Get all positions
- `?id=5`: Get single position

**Response:**
```json
[
  {
    "id": 1,
    "position_title": "Software Engineer",
    "description": "We are looking for...",
    "requirements": "Strong in JS, React, Node.js",
    "experience_needed": "2-3 years",
    "salary_range": "5-7 LPA",
    "location": "Mumbai",
    "status": "active",
    "created_at": "2024-01-15T10:30:00Z",
    "updated_at": "2024-07-06T10:30:00Z"
  }
]
```

---

### 10. POST /api/admin/requirements.php
Add new job position (requires auth).

**Request Body:**
```json
{
  "position_title": "QA Engineer",
  "description": "Quality assurance engineer...",
  "requirements": "Testing knowledge, automation tools",
  "experience_needed": "2 years",
  "salary_range": "4-6 LPA",
  "location": "Bangalore"
}
```

**Response:**
```json
{
  "success": true,
  "id": 42,
  "message": "Position added successfully!"
}
```

---

### 11. PUT /api/admin/requirements.php
Update job position (requires auth).

**Request Body:**
```json
{
  "id": 1,
  "position_title": "Senior Software Engineer",
  "description": "...",
  "requirements": "...",
  "experience_needed": "5+ years",
  "salary_range": "10-15 LPA",
  "location": "Mumbai",
  "status": "active"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Position updated successfully!"
}
```

---

### 12. DELETE /api/admin/requirements.php
Delete job position (requires auth).

**Query:** `?id=5`

**Response:**
```json
{
  "success": true,
  "message": "Position deleted successfully!"
}
```

---

### 13. GET /api/admin/settings.php
System diagnostics (requires auth).

**Response:**
```json
{
  "system_info": {
    "node_version": "v18.16.0",
    "mysql_server": "MySQL/MariaDB (via mysql2)",
    "server_time": "July 6, 2024 - 4:30 PM"
  },
  "statistics": {
    "total_applications": 45,
    "job_positions": 8,
    "pending": 12,
    "approved": 28
  }
}
```

---

## 🔍 Error Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | Success | Data returned |
| 400 | Bad Request | Missing fields, invalid data |
| 401 | Unauthorized | Missing/invalid token |
| 404 | Not Found | Resource doesn't exist |
| 405 | Method Not Allowed | Using wrong HTTP method |
| 500 | Server Error | Database error |

---

## 🛠️ JavaScript/Fetch Examples

### Get All Jobs
```javascript
const response = await fetch('http://localhost:8000/api/jobs.php');
const jobs = await response.json();
console.log(jobs);
```

### Submit Contact Form
```javascript
const response = await fetch('http://localhost:8000/api/contact.php', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    phone: '9876543210',
    subject: 'Inquiry',
    message: 'Hello'
  })
});
const data = await response.json();
```

### Upload Resume (FormData)
```javascript
const formData = new FormData();
formData.append('name', 'John Doe');
formData.append('email', 'john@example.com');
formData.append('phone', '9876543210');
formData.append('job_position', 'Engineer');
formData.append('experience', '3 years');
formData.append('resume', fileInputElement.files[0]);

const response = await fetch('http://localhost:8000/api/apply.php', {
  method: 'POST',
  body: formData
});
const data = await response.json();
```

### Admin Login
```javascript
const response = await fetch('http://localhost:8000/api/admin/login.php', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'admin',
    password: 'admin@123987'
  })
});
const { token } = await response.json();
localStorage.setItem('authToken', token);
```

### Get Dashboard (with Token)
```javascript
const token = localStorage.getItem('authToken');
const response = await fetch('http://localhost:8000/api/admin/dashboard.php', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
const data = await response.json();
```

### Update Application Status
```javascript
const token = localStorage.getItem('authToken');
const response = await fetch('http://localhost:8000/api/admin/applications.php', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    action: 'update_status',
    id: 5,
    status: 'approved'
  })
});
const data = await response.json();
```

---

## 📝 Environment Variables (.env)

```env
PORT=8000
NODE_ENV=development
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=newaadarsh
DB_PORT=3306
JWT_SECRET=newaadarsh_secure_salt_987123
JWT_EXPIRES_IN=24h
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin@123987
```

---

## ✅ Testing Checklist

- [ ] Test all 4 public endpoints
- [ ] Test file upload (size, type validation)
- [ ] Test admin login
- [ ] Test all admin endpoints with valid token
- [ ] Test invalid token rejection
- [ ] Test search functionality
- [ ] Test status update
- [ ] Test delete with file removal
- [ ] Test CORS from React frontend
- [ ] Test error responses

---

## 📚 Related Files

- `MIGRATION_GUIDE.md` - Detailed setup instructions
- `MIGRATION_VERIFICATION.md` - Complete verification report
- `server/.env.example` - Environment template
- `server/package.json` - Dependencies list

---

**Happy coding!** 🚀
