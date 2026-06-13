"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  clearAllRecentCalculations,
  readAllRecentCalculations,
  type DashboardRecentCalculation,
} from "@/lib/dashboard/recentCalculations";

function formatTimestamp(value?: string) {
  if (!value) {
    return "Time not available";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Time not available";
  }

  return date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export function RecentCalculationsHub() {
  const [items, setItems] = useState<DashboardRecentCalculation[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setItems(readAllRecentCalculations());
  }, []);

  function clearAll() {
    clearAllRecentCalculations();
    setItems([]);
    setMessage("Recent calculations cleared from this device.");
  }

  return (
    <section className="glass-card rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-sport-border dark:bg-sport-card">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-emerald-700 dark:text-sport-primary">
            Recent Calculations
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 dark:text-white">
            Calculator history on this device
          </h2>
          <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
            This hub reads recent results saved by calculator pages in your browser only.
          </p>
        </div>
        {items.length > 0 ? (
          <button
            type="button"
            onClick={clearAll}
            className="btn-glow rounded border border-red-200 px-3 py-2 text-xs font-black text-red-700 hover:bg-red-50 dark:border-red-900 dark:text-red-300 dark:hover:bg-red-950/50"
          >
            Clear All Recent
          </button>
        ) : null}
      </div>

      {message ? (
        <p className="mt-3 text-sm font-bold text-emerald-700 dark:text-sport-primary">
          {message}
        </p>
      ) : null}

      {items.length > 0 ? (
        <ul className="mt-5 space-y-3">
          {items.map((item) => (
            <li
              key={`${item.storageKey}-${item.id}`}
              className="rounded border border-slate-200 bg-slate-50 p-4 dark:border-sport-border dark:bg-sport-dark"
            >
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                <div>
                  <h3 className="font-black text-slate-950 dark:text-white">
                    {item.calculatorName}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-700 dark:text-slate-300">
                    {item.summary}
                  </p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    {formatTimestamp(item.timestamp)}
                  </p>
                </div>
                <Link
                  href={item.calculatorHref}
                  className="btn-glow inline-flex rounded px-1 text-sm font-black text-emerald-800 hover:text-emerald-950 dark:text-sport-primary dark:hover:text-emerald-200"
                >
                  Open calculator
                </Link>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-5 text-sm text-slate-600 dark:text-slate-300">
          No recent calculations saved yet.
        </p>
      )}
    </section>
  );
}
