'use client';

import * as Sentry from '@sentry/nextjs';

/**
 * Root React error boundary wired to Sentry.
 * Catches render + synchronous useEffect/lifecycle errors that React
 * swallows into the console (they never reach window.onerror).
 * Uncaught event-handler and async errors still flow to Sentry's
 * global handlers independently.
 */
export default function SentryErrorBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Sentry.ErrorBoundary
      fallback={
        <div className="min-h-[60vh] flex items-center justify-center p-6">
          <div className="max-w-md rounded-lg border border-neutral-700 bg-neutral-900 p-6 text-center text-neutral-100">
            <h2 className="text-xl font-semibold">Something went wrong</h2>
            <p className="mt-2 text-sm text-neutral-400">
              An unexpected error occurred. Please refresh the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500"
            >
              Refresh Page
            </button>
          </div>
        </div>
      }
    >
      {children}
    </Sentry.ErrorBoundary>
  );
}
