import Link from "next/link";
import { getGuideBySlug } from "@/data/guides";

const popularGuideSlugs = [
  "how-to-calculate-nrr-in-cricket",
  "what-is-run-rate-in-cricket",
  "required-run-rate-explained",
  "cricket-points-table-rules-explained",
  "beginner-guide-to-cricket-statistics",
  "how-to-read-a-cricket-scorecard",
];

export function PopularGuides() {
  const popularGuides = popularGuideSlugs
    .map((slug) => getGuideBySlug(slug))
    .filter(Boolean);

  return (
    <section className="glass-card rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-sport-border dark:bg-sport-card">
      <p className="text-sm font-bold uppercase tracking-wide text-emerald-700 dark:text-sport-primary">
        Popular guides
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 dark:text-white">
        Start with these cricket explainers
      </h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {popularGuides.map((guide) =>
          guide ? (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="btn-glow rounded border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black text-slate-800 hover:border-emerald-500 hover:text-emerald-900 dark:border-sport-border dark:bg-sport-dark dark:text-slate-100 dark:hover:border-sport-primary dark:hover:text-sport-primary"
            >
              <span className="block">{guide.title}</span>
              <span className="mt-1 block text-xs font-semibold leading-5 text-slate-600 dark:text-slate-300">
                {guide.excerpt}
              </span>
            </Link>
          ) : null,
        )}
      </div>
    </section>
  );
}
