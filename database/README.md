# Database

The site uses the **existing MySQL database** (`u624959623_newadarsh` on Hostinger). The backend never creates, alters or drops tables — it only reads and writes rows through parameterized queries in `backend/lib/db.js`.

Schema below is taken from the local development copy (`SHOW CREATE TABLE`); production should match.

## Tables used by the backend

### `applications` — job applications (`POST /api/apply`, admin applications pages)

| Column | Type | Notes |
|---|---|---|
| `id` | int, auto increment | primary key |
| `name` | varchar(100) | required |
| `email` | varchar(100) | required |
| `phone` | varchar(20) | required |
| `job_position` | varchar(100) | required |
| `experience` | varchar(100) | required |
| `resume_file` | varchar(255) | stored file name, e.g. `resume_1791220172_f9423ded.pdf` |
| `file_path` | varchar(255) | e.g. `uploads/resumes/resume_1791220172_f9423ded.pdf` |
| `message` | longtext | optional |
| `created_at` | timestamp | database default |
| `status` | varchar(50) | `pending` (default), `approved`, `rejected` |

Resume files live in the folder set by `UPLOADS_DIR` (`<UPLOADS_DIR>/resumes/`), not in the database.

### `contact_messages` — contact form (`POST /api/contact`)

| Column | Type |
|---|---|
| `id` | int, auto increment |
| `name` | varchar(150) |
| `email` | varchar(150) |
| `phone` | varchar(50) |
| `subject` | varchar(255) |
| `message` | text |
| `created_at` | timestamp |

### `job_requirements` — job positions (`GET /api/jobs`, admin requirements pages)

| Column | Type |
|---|---|
| `id` | int, auto increment |
| `position_title` | varchar(150) |
| `description` | longtext |
| `requirements` | text |
| `experience_needed` | varchar(100) |
| `salary_range` | varchar(100) |
| `location` | varchar(150) |
| `status` | varchar(50), default `active` |
| `created_at` | timestamp |
| `updated_at` | timestamp, updates automatically |

### `jobs` — legacy job table (read only)

Used by `GET /api/jobs` only when `job_requirements` doesn't exist or has no active rows. Columns: `id`, `title`, `slug`, `company_name`, `job_location`, `salary`, `experience`, `job_type`, `category`, `description`, `requirements`, `vacancies`, `featured_image`, `status`, `created_at`.

## Other tables (not used by the backend)

`company_info`, `contacts`, `recruitment_area`, `website_visitors` exist in the database but no API reads or writes them. Leave them as they are.

## Connection

Set in the backend environment (never in the frontend):

```
DB_HOST=                  # set to the exact hostname shown in Hostinger hPanel
DB_PORT=3306
DB_USER=u624959623_newadarsh
DB_PASSWORD=...
DB_NAME=u624959623_newadarsh
```
