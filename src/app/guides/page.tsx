import type { Metadata } from "next";
import Link from "next/link";
import { GuideCard } from "@/components/GuideCard";
import { PageHero } from "@/components/PageHero";
import { guides } from "@/data/guides";
import { createSeoMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createSeoMetadata({
  title: "Cricket Guides",
  description:
    "Read beginner-friendly cricket guides about cricket formulas, rules, run rate, NRR, powerplays, free hits, and batting or bowling metrics.",
  path: "/guides",
});

export default function GuidesPage() {
  return (
    <>
      <PageHero
        eyebrow="Guides"
        title="Cricket guides for formulas, rules, and match context"
        description="Learn the meaning behind important cricket numbers and rules with simple explanations, examples, FAQs, and links to related RKBSports.app tools."
      />
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
              Latest guides
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 dark:text-white sm:text-3xl">
              Cricket formulas explained clearly
            </h2>
          </div>
          <Link
            href="/tools"
            className="text-sm font-black text-emerald-800 hover:text-emerald-950 dark:text-emerald-300 dark:hover:text-emerald-200"
          >
            Browse tools
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      </section>
    </>
  );
}
