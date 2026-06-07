require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8000;

// Enable CORS
app.use(cors());

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ensure upload directories exist
const uploadDirs = [
  path.join(__dirname, '../uploads'),
  path.join(__dirname, '../uploads/resumes')
];
uploadDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Serve uploaded files statically at /uploads
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Register public and admin API routes
app.use(require('./routes/jobs'));
app.use(require('./routes/contact'));
app.use(require('./routes/apply'));
app.use(require('./routes/admin/auth'));
app.use(require('./routes/admin/dashboard'));
app.use(require('./routes/admin/applications'));
app.use(require('./routes/admin/requirements'));
app.use(require('./routes/admin/settings'));

// Global error handler
app.use((err, req, res, next) => {
  console.error('[Global Error]:', err.stack);
  res.status(500).json({ error: 'Internal Server Error: ' + err.message });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
