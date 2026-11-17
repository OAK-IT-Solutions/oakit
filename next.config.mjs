import { withSentryConfig } from '@sentry/nextjs/config';

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // Next 14: required for instrumentation.ts (server/edge Sentry init)
    instrumentationHook: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'static.ghost.org',
      },
      {
        protocol: 'https',
        hostname: 'blog.oakitsolutionsandsupplies.com',
      },
      {
        protocol: 'https',
        hostname: 'www.gravatar.com',
      },
    ],
  },
  async redirects() {
    return [
      { source: '/aboutUs', destination: '/about-us', permanent: true },
      { source: '/Backendstack', destination: '/backend-stack', permanent: true },
      { source: '/Frontendstack', destination: '/frontend-stack', permanent: true },
      { source: '/Fullstacklearnmore', destination: '/fullstack-learn-more', permanent: true },
    ];
  },
};

// withSentryConfig injects sentry.client.config.ts into the client bundle and
// uploads sourcemaps when SENTRY_AUTH_TOKEN is set (Vercel). Without a token it
// warns and skips the upload — init itself is guarded by DSN presence.
export default withSentryConfig(nextConfig, {
  silent: true,
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
});
