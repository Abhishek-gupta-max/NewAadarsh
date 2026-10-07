import fs from 'node:fs';
import path from 'node:path';

function getUploadsDir() {
  if (process.env.UPLOADS_DIR) {
    return path.resolve(process.env.UPLOADS_DIR);
  }
  // Check if parent directory uploads exists (local dev monorepo)
  const parentUploads = path.resolve(process.cwd(), '..', 'uploads');
  try {
    if (fs.existsSync(parentUploads)) {
      return parentUploads;
    }
  } catch {}

  // Fallback to public/uploads inside the current app directory (Hostinger deployment)
  return path.resolve(process.cwd(), 'public', 'uploads');
}

export const UPLOADS_DIR = getUploadsDir();
export const RESUMES_DIR = path.join(UPLOADS_DIR, 'resumes');

/**
 * Resolve a DB-stored path ("uploads/...") or a path inside uploads to an
 * absolute file path. Returns null if it would escape the uploads folder.
 */
export function resolveUploadPath(relativePath) {
  const inside = String(relativePath).replace(/\\/g, '/').replace(/^\/?uploads\//, '');
  const full = path.resolve(UPLOADS_DIR, inside);
  if (full !== UPLOADS_DIR && !full.startsWith(UPLOADS_DIR + path.sep)) return null;
  return full;
}
