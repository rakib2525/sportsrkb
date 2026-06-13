import type { Metadata } from "next";
import Link from "next/link";
import { GuideCard } from "@/components/GuideCard";
import { ToolCard } from "@/components/ToolCard";
import { guides } from "@/data/guides";
import { tools } from "@/data/tools";
import { createSeoMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createSeoMetadata({
  title: "Cricket Tools & Calculators",
  description:
    "Use RKBSports.app for cricket calculators, planning tools, and simple cricket statistics resources built for mobile and desktop users.",
  path: "/",
});

const reasons = [
  "Designed for cricket-specific formulas and match planning workflows.",
  "Fast static pages with a clean mobile-first interface.",
  "No fake live scores, no streaming, and no copyrighted sports media.",
  "Clear informational content suitable for cricket fans and tournament organizers.",
];

export default function Home() {
  const featuredTools = tools.slice(0, 4);
  const featuredGuides = guides.slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden bg-sport-dark text-white">
        <div className="absolute inset-y-0 right-0 hidden w-1/2 opacity-20 md:block">
          <div className="absolute right-10 top-12 h-56 w-56 rounded-full border-[18px] border-emerald-400" />
          <div className="absolute bottom-12 right-40 h-32 w-32 rounded-full border-[12px] border-lime-300" />
          <div className="absolute right-0 top-1/2 h-2 w-96 -rotate-12 bg-white" />
        </div>
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-sm font-bold uppercase tracking-wide text-emerald-300">
            RKBSports.app
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-black tracking-tight text-balance sm:text-6xl">
            Cricket Tools & Calculators
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
            Simple, fast cricket tools for calculating match situations,
            checking player statistics, and planning league table scenarios.
            Built for fans, players, coaches, and local competition organizers.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/tools"
              className="btn-glow inline-flex justify-center rounded bg-sport-primary px-5 py-3 text-sm font-black text-sport-dark transition hover:bg-emerald-300"
            >
              Explore tools
            </Link>
            <Link
              href="/about"
              className="btn-glow inline-flex justify-center rounded border border-sport-border px-5 py-3 text-sm font-bold text-white transition hover:border-sport-primary hover:text-sport-primary"
            >
              About RKBSports.app
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white sm:text-3xl">
              Practical cricket resources without the clutter
            </h2>
            <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
              RKBSports.app focuses on real, useful cricket tools and static
              informational pages. The site does not publish fake live scores,
              streaming links, copied team assets, or demo API feeds. Every page
              is planned to be lightweight, searchable, and easy to use on a
              phone during cricket discussions or tournament planning.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900/60">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
                Featured tools
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 dark:text-white sm:text-3xl">
                Cricket calculators available on RKBSports.app
              </h2>
            </div>
            <Link
              href="/tools"
              className="text-sm font-black text-emerald-800 hover:text-emerald-950 dark:text-emerald-300 dark:hover:text-emerald-200"
            >
              View all tools
            </Link>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredTools.map((tool) => (
              <ToolCard key={tool.name} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
              Why use us
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 dark:text-white sm:text-3xl">
              Built for clear cricket calculations
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {reasons.map((reason) => (
              <div key={reason} className="glass-card card-lift rounded-lg border border-slate-200 p-5 dark:border-sport-border dark:bg-sport-card">
                <p className="text-sm font-semibold leading-6 text-slate-700 dark:text-slate-300">
                  {reason}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sport-card text-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
            Cricket calculator guides for common match questions
          </h2>
          <p className="mt-4 max-w-4xl leading-7 text-emerald-50">
            Cricket statistics are easier to understand when the calculations
            are presented plainly. RKBSports.app is being structured around
            common questions such as current run rate, required run rate, net run
            rate, strike rate, bowling economy, batting average, bowling average,
            and points table planning. Each tool page will explain the inputs,
            the formula, and the result in a way that supports real cricket use
            without pretending to provide live match coverage.
          </p>
          <Link
            href="/tools"
            className="btn-glow mt-7 inline-flex rounded bg-sport-primary px-5 py-3 text-sm font-black text-sport-dark transition hover:bg-emerald-300"
          >
            Go to tools page
          </Link>
        </div>
      </section>

      <section className="bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
                Guides
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 dark:text-white sm:text-3xl">
                Learn the formulas behind the tools
              </h2>
            </div>
            <Link
              href="/guides"
              className="text-sm font-black text-emerald-800 hover:text-emerald-950 dark:text-emerald-300 dark:hover:text-emerald-200"
            >
              View all guides
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {featuredGuides.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sport-dark text-white">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-black tracking-tight sm:text-3xl">
            Start with tools or guides
          </h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-300">
            Browse the calculators, then read the matching guide to understand
            the cricket formula and use each tool with better context.
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/tools"
              className="btn-glow inline-flex justify-center rounded bg-sport-primary px-5 py-3 text-sm font-black text-sport-dark transition hover:bg-emerald-300"
            >
              Tools
            </Link>
            <Link
              href="/guides"
              className="btn-glow inline-flex justify-center rounded border border-sport-border px-5 py-3 text-sm font-bold text-white transition hover:border-sport-primary hover:text-sport-primary"
            >
              Guides
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
