// Starts the Next.js backend (http://localhost:3000) and the React frontend (http://localhost:5173)
// together, so /api calls from the website always have a backend to reach. Ctrl+C stops both.
import { spawn } from 'node:child_process';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';

const apps = [
  { name: 'backend ', cwd: path.join(root, 'backend') },
  { name: 'frontend', cwd: path.join(root, 'frontend') },
];

const children = apps.map(({ name, cwd }) => {
  const child = spawn(npm, ['run', 'dev'], { cwd, shell: process.platform === 'win32', env: process.env });
  const prefix = (chunk) => chunk.toString().split(/\r?\n/).filter(Boolean).map((line) => `[${name}] ${line}`).join('\n') + '\n';
  child.stdout.on('data', (chunk) => process.stdout.write(prefix(chunk)));
  child.stderr.on('data', (chunk) => process.stderr.write(prefix(chunk)));
  child.on('exit', (code) => {
    console.log(`[${name}] stopped (exit code ${code})`);
    stopAll();
  });
  return child;
});

let stopping = false;
function stopAll() {
  if (stopping) return;
  stopping = true;
  for (const child of children) {
    if (child.exitCode !== null) continue;
    if (process.platform === 'win32') spawn('taskkill', ['/PID', String(child.pid), '/T', '/F']);
    else child.kill('SIGTERM');
  }
}

process.on('SIGINT', stopAll);
process.on('SIGTERM', stopAll);
