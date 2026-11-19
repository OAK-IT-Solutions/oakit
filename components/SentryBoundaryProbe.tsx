"use client";

import { useEffect } from "react";

// TEMPORARY boundary verification probe — sync useEffect throw (the exact
// case React swallows from window.onerror without an ErrorBoundary).
// Only fires on ?sentry_frame_check. Remove after verification.
function sentryBoundaryCheck(): void {
  throw new Error("Sentry boundary check oakit");
}

export default function SentryBoundaryProbe() {
  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("sentry_frame_check")) {
      sentryBoundaryCheck();
    }
  }, []);
  return null;
}
