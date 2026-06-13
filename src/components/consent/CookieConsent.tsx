"use client";

import { useEffect, useState } from "react";

const consentKey = "rkbsports:cookie-consent";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(window.localStorage.getItem(consentKey) !== "accepted");
  }, []);

  function accept() {
    window.localStorage.setItem(consentKey, "accepted");
    setIsVisible(false);
  }

  if (!isVisible) {
    return null;
  }

  return (
    <section
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 p-4 shadow-lg backdrop-blur dark:border-sport-border dark:bg-sport-dark/95"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-6 text-slate-700 dark:text-slate-300">
          RKBSports.app may use cookies for basic analytics, performance, and ads
          readiness. You can keep using calculators while this banner is visible.
        </p>
        <button
          type="button"
          onClick={accept}
          className="btn-glow rounded bg-emerald-600 px-5 py-3 text-sm font-black text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 dark:bg-sport-primary dark:text-sport-dark dark:hover:bg-emerald-300"
        >
          Accept
        </button>
      </div>
    </section>
  );
}
