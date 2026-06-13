import Link from "next/link";

const quickLinks = [
  { href: "/tools/run-rate-calculator", label: "Run Rate" },
  { href: "/tools/required-run-rate-calculator", label: "Required Run Rate" },
  { href: "/tools/nrr-calculator", label: "NRR" },
  { href: "/tools/balls-to-overs-converter", label: "Balls to Overs" },
  { href: "/tools/follow-on-calculator", label: "Follow-On" },
  { href: "/tools/tournament-qualification-scenario-predictor", label: "Qualification Scenario" },
  { href: "/tools/points-table-calculator", label: "Points Table" },
];

export function QuickCalculatorLinks() {
  return (
    <section className="glass-card rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-sport-border dark:bg-sport-card">
      <p className="text-sm font-bold uppercase tracking-wide text-emerald-700 dark:text-sport-primary">
        Quick Links
      </p>
      <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 dark:text-white">
        Popular calculators
      </h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {quickLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="btn-glow rounded border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black text-slate-800 hover:border-emerald-500 hover:text-emerald-900 dark:border-sport-border dark:bg-sport-dark dark:text-slate-100 dark:hover:border-sport-primary dark:hover:text-sport-primary"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
