import { NextResponse } from 'next/server';

// CORS for the API. Only listed origins may call it from a browser on another domain.
// Same-origin requests (frontend served by this app) don't need CORS at all.
//   CORS_ORIGINS=https://newadarshmanpower.com,https://www.newadarshmanpower.com
const DEFAULT_ORIGINS = ['https://newadarshmanpower.com', 'https://www.newadarshmanpower.com'];
const DEV_ORIGINS = ['http://localhost:5173', 'http://localhost:4173', 'http://127.0.0.1:5173'];

const configuredOrigins = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim().replace(/\/$/, ''))
  .filter(Boolean);

const allowedOrigins = [
  ...DEFAULT_ORIGINS,
  ...configuredOrigins,
  ...(process.env.NODE_ENV === 'production' ? [] : DEV_ORIGINS),
];

const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
  'Access-Control-Max-Age': '86400',
};

export function proxy(request) {
  const origin = request.headers.get('origin') ?? '';
  const isAllowedOrigin = allowedOrigins.includes(origin);

  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: {
        ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
        ...corsOptions,
        Vary: 'Origin',
      },
    });
  }

  const response = NextResponse.next();
  if (isAllowedOrigin) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    Object.entries(corsOptions).forEach(([key, value]) => response.headers.set(key, value));
  }
  response.headers.set('Vary', 'Origin');
  return response;
}

export const config = {
  matcher: '/api/:path*',
};
