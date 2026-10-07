// Builds one upload for Hostinger "Node.js Apps": the Next.js backend with the
// React frontend (../frontend/dist) inside its public/ folder. Run from the backend folder:
//   npm run build:hostinger
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const backend = path.resolve(import.meta.dirname, '..');
const projectRoot = path.resolve(backend, '..');
const stage = path.join(projectRoot, 'deploy', 'backend');
const zipFile = path.join(projectRoot, 'deploy', 'backend-nodejs-app.zip');

// Files Hostinger needs to install, build and start the app (no node_modules, no .env secrets)
const INCLUDE = ['app', 'src', 'lib', 'utils', 'public', 'scripts', 'server.js', 'proxy.js', 'next.config.mjs', 'package.json', 'package-lock.json', '.env.example', 'README.md'];

// 1. Put the latest frontend build into backend/public
execFileSync(process.execPath, [path.join(backend, 'scripts', 'copy-frontend.mjs')], { stdio: 'inherit' });

// 2. Stage only this generated package; leave other deploy artifacts untouched.
fs.rmSync(stage, { recursive: true, force: true });
fs.rmSync(zipFile, { force: true });
fs.mkdirSync(stage, { recursive: true });
for (const item of INCLUDE) {
  fs.cpSync(path.join(backend, item), path.join(stage, item), { recursive: true });
}

// 3. Zip it. On Windows use the built-in bsdtar (not Git Bash's GNU tar, which can't write zip files).
const entries = fs.readdirSync(stage);
if (process.platform === 'win32') {
  const tar = path.join(process.env.SystemRoot || 'C:\\Windows', 'System32', 'tar.exe');
  execFileSync(tar, ['-a', '-c', '-f', zipFile, ...entries], { cwd: stage, stdio: 'inherit' });
} else {
  execFileSync('zip', ['-r', '-q', zipFile, ...entries], { cwd: stage, stdio: 'inherit' });
}

const sizeMb = (fs.statSync(zipFile).size / 1024 / 1024).toFixed(1);
console.log(`\nBackend package ready: ${zipFile} (${sizeMb} MB)`);
console.log('Upload it to a host that runs Node.js. Build command: npm run build   Start command: npm start');
