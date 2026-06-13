"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const announcementKey = "rkbsports:announcement-dismissed:v1";

export function AnnouncementBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(window.localStorage.getItem(announcementKey) !== "true");
  }, []);

  function dismiss() {
    window.localStorage.setItem(announcementKey, "true");
    setIsVisible(false);
  }

  if (!isVisible) {
    return null;
  }

  return (
    <section className="sticky top-[65px] z-30 border-b border-emerald-200/70 bg-emerald-50/95 backdrop-blur dark:border-sport-border dark:bg-sport-card/90">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-2 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-bold text-slate-800 dark:text-slate-100">
          <Link className="text-emerald-800 hover:text-emerald-950 dark:text-sport-primary" href="/tools/fantasy-cricket-points-calculator">
            New: Fantasy Cricket Points Calculator
          </Link>
          <Link className="text-orange-700 hover:text-orange-900 dark:text-sport-secondary" href="/tools/nrr-calculator">
            New: Shareable Result Cards
          </Link>
          <Link className="text-emerald-800 hover:text-emerald-950 dark:text-sport-primary" href="/tools/bowlers-spell-analyzer">
            Try: Bowler&apos;s Spell Analyzer
          </Link>
        </div>
        <button
          type="button"
          onClick={dismiss}
          className="btn-glow self-start rounded border border-slate-300 px-3 py-1 text-xs font-black text-slate-700 hover:border-emerald-500 dark:border-slate-700 dark:text-slate-200 dark:hover:border-sport-primary sm:self-auto"
        >
          Dismiss
        </button>
      </div>
    </section>
  );
}
