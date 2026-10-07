/**
 * frontend/src/features/README.md
 *
 * Feature-based architecture guide for the React frontend.
 *
 * Current state:
 *   The frontend organizes code by layer (components/, pages/, hooks/, etc.).
 *   This is fully functional and NOT changed.
 *
 * Future feature-based structure (gradual migration path):
 *
 *   src/features/
 *   ├── auth/
 *   │   ├── components/     ← LoginForm, LogoutButton
 *   │   ├── hooks/          ← useLogin, useLogout
 *   │   ├── services/       ← authService (move from src/services/authService.js)
 *   │   ├── validation/     ← loginSchema (Zod/Yup schema or custom)
 *   │   └── index.js        ← barrel export
 *   │
 *   ├── jobs/
 *   │   ├── components/     ← JobCard, JobList, JobFilter
 *   │   ├── hooks/          ← useJobs, useJobDetail
 *   │   ├── services/       ← jobService (move from src/services/jobService.js)
 *   │   └── index.js
 *   │
 *   ├── applications/
 *   │   ├── components/     ← ApplicationForm, ApplicationTable, StatusBadge
 *   │   ├── hooks/          ← useApplications, useApply
 *   │   ├── services/       ← applicationService
 *   │   ├── validation/     ← applicationSchema
 *   │   └── index.js
 *   │
 *   ├── contact/
 *   │   ├── components/     ← ContactForm
 *   │   ├── services/       ← contactService
 *   │   ├── validation/     ← contactSchema
 *   │   └── index.js
 *   │
 *   └── admin/
 *       ├── components/     ← DashboardStats, AdminTable, AdminModal
 *       ├── hooks/          ← useDashboard, useAdminApplications
 *       └── index.js
 *
 * Migration rule: one feature at a time, fully tested before moving the next.
 */
