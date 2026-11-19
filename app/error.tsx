'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // This is the nearest error boundary for page errors — report to Sentry
  // (parent Sentry.ErrorBoundary in the layout never sees these).
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100">Oops</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">Something went wrong</p>
        <p className="text-gray-500 dark:text-gray-500">An unexpected error occurred. Please try again.</p>
        <button
          onClick={() => reset()}
          className="inline-flex items-center justify-center rounded-md bg-gray-900 dark:bg-gray-50 px-6 py-3 text-sm font-medium text-gray-50 dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200 transition-colors"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}
