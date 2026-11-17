import * as Sentry from '@sentry/nextjs'

const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN
const disabled = process.env.NEXT_PUBLIC_SENTRY_DISABLED === 'true'

if (dsn && !disabled) {
  Sentry.init({
    dsn,
    tracesSampleRate: 0.1,
    environment: process.env.NODE_ENV,
    initialScope: { tags: { app: 'client-dashboard' } },
    ignoreErrors: [
      'ResizeObserver loop limit exceeded',
      'ResizeObserver loop completed with undelivered notifications',
    ],
  })
}

export const onRequestError = Sentry.captureRequestError
