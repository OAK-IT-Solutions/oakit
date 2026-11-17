import type { NextConfig } from 'next';
import { withSentryConfig } from '@sentry/nextjs/config';

const baseConfig: NextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pos.oakitsolutionsandsupplies.com',
        port: ''
      }
    ]
  },
  transpilePackages: ['geist'],
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  }
};

// SDK init happens via src/instrumentation-client.ts + src/instrumentation.ts.
// withSentryConfig is only needed for sourcemap upload (requires SENTRY_AUTH_TOKEN);
// skip it otherwise so builds never depend on a token.
const nextConfig: NextConfig = process.env.SENTRY_AUTH_TOKEN
  ? withSentryConfig(baseConfig, {
      silent: true,
      org: process.env.SENTRY_ORG,
      project: process.env.SENTRY_PROJECT,
    })
  : baseConfig;

export default nextConfig;
