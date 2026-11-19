"use client";

import { useEffect } from "react";

// TEMPORARY Sentry frame-readability probe — bundle-defined function so the
// stack carries an app frame; only fires on ?sentry_frame_check. Remove after verification.
function sentryFrameCheck(): void {
  throw new Error("Sentry frame check oakit-vercel");
}

export default function SentryFrameProbe() {
  useEffect(() => {
    if (new URLSearchParams(window.location.search).has("sentry_frame_check")) {
      sentryFrameCheck();
    }
  }, []);
  return null;
}
