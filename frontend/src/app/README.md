/**
 * frontend/src/app/README.md
 *
 * Application bootstrap and global configuration documentation.
 *
 * Current bootstrap chain:
 *   frontend/index.html
 *     └── src/main.jsx          ← ReactDOM.createRoot, StrictMode
 *           └── src/App.jsx     ← BrowserRouter, AppProvider, AuthProvider
 *                 └── src/routes/AppRoutes.jsx  ← all page routes
 *
 * Global providers (wrappers around the entire app):
 *   1. BrowserRouter    — react-router-dom client-side routing
 *   2. AppProvider      — global application state (AppContext.jsx)
 *   3. AuthProvider     — authentication state (AuthContext.jsx)
 *
 * This directory (src/app/) is reserved for future app-level concerns:
 *   - App-level error boundaries
 *   - Global toast/notification provider
 *   - Theme provider (dark/light mode)
 *   - Query client provider (React Query / SWR)
 *
 * Future structure:
 *   src/app/
 *   ├── App.jsx             ← move from src/ (when migrating)
 *   ├── ErrorBoundary.jsx   ← top-level React error boundary
 *   ├── Providers.jsx       ← compose all context providers here
 *   └── config.js           ← app-level runtime config
 */
