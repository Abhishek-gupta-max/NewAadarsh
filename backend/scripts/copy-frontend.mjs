// Copies the built React frontend (../frontend/dist) into ./public so the Next.js
// server can serve the website and the API from one Node.js app.
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const dist = path.resolve(root, '..', 'frontend', 'dist');
const target = path.join(root, 'public');

if (!fs.existsSync(path.join(dist, 'index.html'))) {
  console.error(`Frontend build not found at ${dist}. Run "npm run build" in the frontend folder first.`);
  process.exit(1);
}

fs.rmSync(target, { recursive: true, force: true });
fs.cpSync(dist, target, { recursive: true });
console.log(`Copied frontend build: ${dist} -> ${target}`);
