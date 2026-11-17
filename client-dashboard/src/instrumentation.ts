import * as Sentry from '@sentry/nextjs'

export async function register(): Promise<void> {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const dsn = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN
    const disabled = process.env.NEXT_PUBLIC_SENTRY_DISABLED === 'true'
    if (dsn && !disabled) {
      Sentry.init({
        dsn,
        tracesSampleRate: 0.1,
        environment: process.env.NODE_ENV,
        initialScope: { tags: { app: 'client-dashboard' } },
      })
    }
  }
}

export const onRequestError = Sentry.captureRequestError
