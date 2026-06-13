import Link from "next/link";
import { getToolBySlug } from "@/data/tools";

const popularCalculatorSlugs = [
  "nrr-calculator",
  "run-rate-calculator",
  "required-run-rate-calculator",
  "points-table-calculator",
  "balls-to-overs-converter",
  "bowlers-spell-analyzer",
];

export function PopularCalculators() {
  const calculators = popularCalculatorSlugs
    .map((slug) => getToolBySlug(slug))
    .filter(Boolean);

  return (
    <section className="glass-card rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-sport-border dark:bg-sport-card">
      <p className="text-sm font-bold uppercase tracking-wide text-emerald-700 dark:text-sport-primary">
        Popular calculators
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 dark:text-white">
        Quick cricket calculation tools
      </h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {calculators.map((calculator) =>
          calculator ? (
            <Link
              key={calculator.slug}
              href={calculator.href}
              className="btn-glow rounded border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black text-slate-800 hover:border-emerald-500 hover:text-emerald-900 dark:border-sport-border dark:bg-sport-dark dark:text-slate-100 dark:hover:border-sport-primary dark:hover:text-sport-primary"
            >
              <span className="block">{calculator.name}</span>
              <span className="mt-1 block text-xs font-semibold leading-5 text-slate-600 dark:text-slate-300">
                {calculator.shortDescription}
              </span>
            </Link>
          ) : null,
        )}
      </div>
    </section>
  );
}
