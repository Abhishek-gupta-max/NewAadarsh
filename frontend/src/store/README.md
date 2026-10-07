/**
 * frontend/src/store/README.md
 *
 * State management architecture for the React frontend.
 *
 * Current implementation:
 *   - React Context API (no Redux/Zustand)
 *   - AuthContext  (src/context/AuthContext.jsx)  — auth state + login/logout
 *   - AppContext   (src/context/AppContext.jsx)   — global app state
 *
 * The existing Context implementation is NOT changed.
 *
 * This directory (src/store/) is reserved for future global state management
 * should the application scale to require Redux Toolkit or Zustand.
 *
 * Migration path (when needed):
 *   1. Install redux-toolkit: npm install @reduxjs/toolkit react-redux
 *   2. Create store/index.js with configureStore()
 *   3. Create feature slices: store/slices/authSlice.js, jobsSlice.js, etc.
 *   4. Replace Context consumers with Redux selectors one feature at a time.
 *   5. Keep Context providers until all consumers are migrated.
 *
 * Future store slices (when migrating):
 *   store/
 *   ├── index.js          ← configureStore()
 *   └── slices/
 *       ├── authSlice.js          ← user, isAuthenticated, token
 *       ├── jobsSlice.js          ← jobs list, loading, error
 *       ├── applicationsSlice.js  ← admin applications
 *       └── uiSlice.js            ← modals, notifications, loading states
 */
