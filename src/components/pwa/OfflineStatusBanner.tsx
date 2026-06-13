"use client";

import { useEffect, useState } from "react";

export function OfflineStatusBanner() {
  const [isOffline, setIsOffline] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const updateStatus = () => {
      const offline = !navigator.onLine;
      setIsOffline(offline);
      if (!offline) {
        setDismissed(false);
      }
    };

    updateStatus();
    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);

    return () => {
      window.removeEventListener("online", updateStatus);
      window.removeEventListener("offline", updateStatus);
    };
  }, []);

  if (!isOffline || dismissed) {
    return null;
  }

  return (
    <div
      className="fixed inset-x-3 bottom-3 z-50 rounded border border-amber-300/70 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-950 shadow-lg dark:border-sport-secondary/60 dark:bg-sport-card dark:text-slate-100 sm:left-auto sm:max-w-md"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start justify-between gap-3">
        <p>You are offline. Saved calculators may still work.</p>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="btn-glow rounded px-2 py-1 text-xs font-bold text-amber-900 hover:bg-amber-100 dark:text-sport-secondary dark:hover:bg-slate-800"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
