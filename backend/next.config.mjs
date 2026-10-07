/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack / trace root settings

  // This app lives inside the project; keep Next.js scoped to the backend folder
  turbopack: { root: import.meta.dirname },
  outputFileTracingRoot: import.meta.dirname,

  // CORS is handled in proxy.js (allow-list via CORS_ORIGINS)

  async rewrites() {
    return {
      // React app routes (/apply, /jobs/x, /admin/...) fall back to the frontend's index.html.
      // /api and /uploads are matched before this.
      fallback: [{ source: '/:path*', destination: '/index.html' }],
    };
  },
};

export default nextConfig;
