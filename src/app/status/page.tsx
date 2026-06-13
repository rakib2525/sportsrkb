import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { createSeoMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createSeoMetadata({
  title: "Status",
  description:
    "View RKBSports.app public status information, available features, contact emails, and dependency notes.",
  path: "/status",
});

const availableFeatures = [
  "Cricket calculators for run rate, NRR, strike rate, economy rate, averages, chase planning, and tournament scenarios.",
  "Cricket guides with formulas, examples, FAQs, and related tools.",
  "Dark and light mode with saved user preference.",
  "PWA install support and offline fallback for cached calculator pages.",
  "LocalStorage-only saved teams, recent calculations, cookie consent, and share cards.",
];

export default function StatusPage() {
  return (
    <>
      <PageHero
        eyebrow="Status"
        title="RKBSports.app status"
        description="A simple public status and information page for the RKBSports.app cricket tools website."
      />
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="glass-card rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-sport-border dark:bg-sport-card">
          <dl className="grid gap-5 text-sm sm:grid-cols-2">
            <div>
              <dt className="font-black uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Site name
              </dt>
              <dd className="mt-1 text-lg font-black text-slate-950 dark:text-white">
                RKBSports.app
              </dd>
            </div>
            <div>
              <dt className="font-black uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Current version
              </dt>
              <dd className="mt-1 text-lg font-black text-emerald-800 dark:text-sport-primary">
                Beta
              </dd>
            </div>
            <div>
              <dt className="font-black uppercase tracking-wide text-slate-500 dark:text-slate-400">
                General contact
              </dt>
              <dd className="mt-1">
                <a
                  className="font-bold text-emerald-800 hover:text-emerald-950 dark:text-sport-primary dark:hover:text-emerald-200"
                  href="mailto:contact@rkbsports.app"
                >
                  contact@rkbsports.app
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-black uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Support and bug reports
              </dt>
              <dd className="mt-1">
                <a
                  className="font-bold text-emerald-800 hover:text-emerald-950 dark:text-sport-primary dark:hover:text-emerald-200"
                  href="mailto:support@rkbsports.app"
                >
                  support@rkbsports.app
                </a>
              </dd>
            </div>
          </dl>

          <div className="mt-8">
            <h2 className="text-xl font-black text-slate-950 dark:text-white">
              Features available
            </h2>
            <ul className="mt-4 space-y-3 text-slate-700 dark:text-slate-300">
              {availableFeatures.map((feature) => (
                <li key={feature} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 flex-none rounded-full bg-emerald-600 dark:bg-sport-primary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700 dark:border-sport-border dark:bg-sport-dark dark:text-slate-300">
            <p className="font-bold text-slate-950 dark:text-white">
              No live score or API dependency
            </p>
            <p className="mt-2">
              RKBSports.app is a static cricket tools and information website.
              It does not depend on live score feeds, streaming services, team
              branding, player photos, or demo sports APIs.
            </p>
          </div>

          <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
            Last updated: June 13, 2026
          </p>
        </div>
      </section>
    </>
  );
}
