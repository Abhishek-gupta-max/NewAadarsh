import { healthHandler } from '../../../src/health/health.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  return healthHandler();
}
