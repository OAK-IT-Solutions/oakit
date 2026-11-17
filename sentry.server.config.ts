import * as Sentry from '@sentry/nextjs'

const dsn = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN

if (dsn && process.env.NEXT_PUBLIC_SENTRY_DISABLED !== 'true') {
  Sentry.init({
    dsn,
    tracesSampleRate: 0.1,
    environment: process.env.NODE_ENV,
    initialScope: { tags: { app: 'oakit' } },
  })
}
