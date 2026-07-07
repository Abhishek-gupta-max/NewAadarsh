# PHP to Node.js Migration Guide

## ✅ Migration Status: COMPLETE

All PHP API endpoints have been successfully migrated to a Node.js Express backend. The new backend uses the same database structure and provides identical API responses.

---

## 📁 Directory Structure

```
server/
├── index.js                    # Main Express app
├── package.json               # Dependencies
├── .env.example              # Environment variables template
├── db.js                      # MySQL connection pool
├── middleware/
│   └── auth.js               # JWT authentication middleware
└── routes/
    ├── jobs.js               # Job listings API
    ├── contact.php           # Contact form API
    ├── apply.js              # Job application API
    └── admin/
        ├── auth.js           # Admin login API
        ├── dashboard.js      # Dashboard statistics
        ├── applications.js   # Manage applications (CRUD)
        ├── requirements.js   # Manage job positions (CRUD)
        └── settings.js       # System info & statistics
```

---

## 🔄 Migrated Endpoints

| Method | Endpoint | Purpose | Auth |
|--------|----------|---------|------|
| **GET** | `/api/jobs.php` | List all jobs or get by ID/slug | ❌ No |
| **POST** | `/api/contact.php` | Submit contact form | ❌ No |
| **POST** | `/api/apply.php` | Submit job application (file upload) | ❌ No |
| **POST** | `/api/admin/login.php` | Admin authentication | ❌ No |
| **GET** | `/api/admin/dashboard.php` | Dashboard stats | ✅ Yes |
| **GET/POST/PUT/DELETE** | `/api/admin/applications.php` | Manage applications | ✅ Yes |
| **GET/POST/PUT/DELETE** | `/api/admin/requirements.php` | Manage job positions | ✅ Yes |
| **GET** | `/api/admin/settings.php` | System info & statistics | ✅ Yes |

---

## 🚀 Setup & Running the Server

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Configure Environment Variables
```bash
cp .env.example .env
# Edit .env with your database credentials
```

### 3. Start the Server

**Development Mode (with auto-reload):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

The server will run on `http://localhost:8000` (or PORT specified in .env)

---

## 📚 Key Migration Changes

### Database Connection
- **PHP**: New connection per request → `mysqli()`
- **Node.js**: Connection pooling → `mysql2/promise` with pool management
  - More efficient for high-traffic scenarios
  - Automatic connection reuse

### Authentication
- **PHP**: Custom HMAC token generation with base64 encoding
- **Node.js**: Industry-standard JWT (jsonwebtoken library)
  - Cleaner, more secure implementation
  - Automatic expiration handling

### File Uploads
- **PHP**: Manual file handling with `move_uploaded_file()`
- **Node.js**: Multer middleware
  - Built-in file validation
  - Better error handling
  - Cleaner integration

### Error Handling
- **PHP**: Direct HTTP status codes with `http_response_code()`
- **Node.js**: Express error middleware with consistent response format
  - Global error handler in index.js
  - Consistent JSON error responses

---

## 🔐 Security Notes

### Credentials (Change in Production!)
The default admin credentials in `.env.example` are:
- **Username**: `admin`
- **Password**: `admin@123987`

**⚠️ Change these immediately in production!**

### JWT Token
- Token expires in 24 hours (configurable via `JWT_EXPIRES_IN`)
- Bearer token authentication for all protected endpoints
- Signature verification on every request

### SQL Injection Prevention
- **PHP**: Used `real_escape_string()` (less secure)
- **Node.js**: Uses prepared statements with parameterized queries (more secure)

---

## 🔄 API Usage Examples

### Fetch Jobs
```javascript
GET /api/jobs.php
// or by ID:
GET /api/jobs.php?id=5
// or by slug:
GET /api/jobs.php?slug=software-engineer
```

### Submit Application
```javascript
POST /api/apply.php
Content-Type: multipart/form-data

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "job_position": "Software Engineer",
  "experience": "3 years",
  "message": "Interested in this role",
  "resume": <file>
}
```

### Admin Login
```javascript
POST /api/admin/login.php
Content-Type: application/json

{
  "username": "admin",
  "password": "admin@123987"
}

// Response:
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "username": "admin",
  "message": "Logged in successfully!"
}
```

### Fetch Applications (Protected)
```javascript
GET /api/admin/applications.php
Authorization: Bearer <token>

// Optional search:
GET /api/admin/applications.php?search=john

// Get single:
GET /api/admin/applications.php?id=5
```

---

## 📦 Dependencies Explained

| Package | Purpose |
|---------|---------|
| `express` | Web framework |
| `cors` | Cross-Origin Resource Sharing |
| `dotenv` | Environment variable management |
| `mysql2` | MySQL database driver with promise support |
| `jsonwebtoken` | JWT token generation & verification |
| `multer` | File upload middleware |
| `nodemon` | Auto-restart on file changes (dev only) |

---

## 🐛 Troubleshooting

### "Connection failed" Error
- Check if MySQL is running
- Verify DB credentials in `.env`
- Ensure database `newaadarsh` exists

### "Port 8000 already in use"
```bash
# Change PORT in .env or kill process:
lsof -i :8000
kill -9 <PID>
```

### "Unauthorized" (401) on admin routes
- Make sure to include Bearer token in Authorization header
- Token format: `Bearer <token>`
- Token might be expired (24h lifetime)

### File upload fails
- Check `/uploads/resumes` directory exists
- Verify write permissions: `chmod 755 uploads/uploads/resumes`
- Max file size is 5MB (configurable in `apply.js`)

---

## 🔄 React Frontend Integration

Update API endpoints in React from `/api/` (PHP) to the Node.js server URL:

```javascript
// Before (PHP):
const response = await fetch('/api/jobs.php');

// After (Node.js):
const response = await fetch('http://localhost:8000/api/jobs.php');
// Or use environment variable:
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
const response = await fetch(`${API_URL}/api/jobs.php`);
```

Update services in `src/services/` to point to the new backend URL.

---

## 📝 Database Tables Required

The Node.js server automatically creates `job_requirements` table on first run.
Ensure these tables exist in your MySQL database:

- `applications` - Job applications
- `contact_messages` - Contact form submissions (optional)
- `job_requirements` - Job listings (created automatically)

---

## ✨ Next Steps

1. ✅ Install dependencies: `npm install`
2. ✅ Copy and configure `.env` file
3. ✅ Start server: `npm run dev`
4. ✅ Update React frontend API URLs
5. ✅ Test endpoints with Postman or curl
6. ✅ Change admin credentials in production
7. ✅ Set up proper JWT_SECRET in production

---

## 📄 Old PHP Files

The old PHP files in `/api/` directory are now deprecated but kept for reference.
You can safely delete them once you've verified everything works with Node.js.

```bash
rm -rf api/  # Remove old PHP API
```

---

**Migration completed successfully!** 🎉
