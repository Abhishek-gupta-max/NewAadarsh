// Builds the website-only package for the Hostinger static site (output directory "dist").
// The site calls the separately hosted Next.js backend at VITE_API_BASE_URL.
//   Windows:  $env:VITE_API_BASE_URL="https://api.newadarshmanpower.com"; npm run build:static
//   bash:     VITE_API_BASE_URL=https://api.newadarshmanpower.com npm run build:static
import { execFileSync, execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const frontend = path.join(root, 'frontend');
const stage = path.join(root, 'deploy', 'static-site');
const zipFile = path.join(root, 'deploy', 'hostinger-static-site.zip');

const apiBase = (process.env.VITE_API_BASE_URL || '').trim().replace(/\/+$/, '');
if (!/^https?:\/\/[^/]+/.test(apiBase)) {
  console.error('Set VITE_API_BASE_URL to the backend address first, e.g. https://api.newadarshmanpower.com');
  process.exit(1);
}

// 1. Build the React app with the backend address baked in
execSync('npm run build', { cwd: frontend, stdio: 'inherit', env: { ...process.env, VITE_API_BASE_URL: apiBase } });

// 2. Stage: prebuilt site + a tiny build step that copies it to dist/ (what Hostinger publishes)
fs.rmSync(stage, { recursive: true, force: true });
fs.mkdirSync(stage, { recursive: true });
fs.cpSync(path.join(frontend, 'dist'), path.join(stage, 'site'), { recursive: true });
const htaccess = path.join(frontend, '.htaccess');
if (fs.existsSync(htaccess)) fs.copyFileSync(htaccess, path.join(stage, 'site', '.htaccess'));

fs.writeFileSync(path.join(stage, 'package.json'), JSON.stringify({
  name: 'newaadarsh-static-site',
  private: true,
  description: `Website for Hostinger static hosting. API: ${apiBase}`,
  scripts: { build: 'node copy-site.js' },
}, null, 2) + '\n');
fs.writeFileSync(path.join(stage, 'copy-site.js'), [
  "// Copies the prebuilt website (site/) to dist/, the folder Hostinger publishes to public_html.",
  "const fs = require('fs');",
  "const path = require('path');",
  "fs.rmSync(path.join(__dirname, 'dist'), { recursive: true, force: true });",
  "fs.cpSync(path.join(__dirname, 'site'), path.join(__dirname, 'dist'), { recursive: true });",
  "console.log('Copied site/ -> dist/');",
  '',
].join('\n'));

// 3. Zip (Windows bsdtar can write zip; elsewhere use zip)
fs.rmSync(zipFile, { force: true });
const items = ['package.json', 'copy-site.js', 'site'];
if (process.platform === 'win32') {
  const tar = path.join(process.env.SystemRoot || 'C:\\Windows', 'System32', 'tar.exe');
  execFileSync(tar, ['-a', '-c', '-f', zipFile, '-C', stage, ...items], { stdio: 'inherit' });
} else {
  execFileSync('zip', ['-r', '-q', zipFile, ...items], { cwd: stage, stdio: 'inherit' });
}

const sizeMb = (fs.statSync(zipFile).size / 1024 / 1024).toFixed(1);
console.log(`\nReady for Hostinger (website only): ${zipFile} (${sizeMb} MB)`);
console.log(`API calls go to: ${apiBase}/api`);
console.log('Hostinger settings: Build command "npm run build", Output directory "dist".');
