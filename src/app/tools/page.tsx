import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { SavedTeams } from "@/components/teams/SavedTeams";
import { ToolCard } from "@/components/ToolCard";
import { tools } from "@/data/tools";
import { createSeoMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createSeoMetadata({
  title: "Cricket Tools",
  description:
    "Browse cricket calculators for run rate, NRR, strike rate, economy rate, averages, chase planning, and more.",
  path: "/tools",
});

export default function ToolsPage() {
  return (
    <>
      <PageHero
        eyebrow="Tools"
        title="Cricket calculators and match planning tools"
        description="Explore RKBSports.app cricket calculators and planning tools with clear formulas, real manual inputs, no fake live data, and no copied sports media."
      />
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">
            Available cricket tools
          </h2>
          <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
            These calculators are built as real working utilities with manual
            inputs, clear formulas, and related guide links for extra context.
          </p>
          <Link
            href="/guides"
            className="mt-4 inline-flex text-sm font-black text-emerald-800 hover:text-emerald-950 dark:text-emerald-300 dark:hover:text-emerald-200"
          >
            Read cricket guides
          </Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </div>
        <div className="mt-10">
          <SavedTeams />
        </div>
      </section>
    </>
  );
}
