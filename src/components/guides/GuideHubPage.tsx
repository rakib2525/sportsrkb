import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { GuideCard } from "@/components/GuideCard";
import { JsonLd } from "@/components/seo/JsonLd";
import type { GuideHub } from "@/data/guideHubs";
import { getGuideBySlug } from "@/data/guides";
import { getToolBySlug } from "@/data/tools";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/schema";

export function GuideHubPage({ hub }: { hub: GuideHub }) {
  const relatedGuides = hub.guideSlugs
    .map((slug) => getGuideBySlug(slug))
    .filter(Boolean);
  const relatedTools = hub.toolSlugs
    .map((slug) =>
      slug === "dashboard"
        ? {
            name: "Dashboard",
            slug: "dashboard",
            href: "/dashboard",
            shortDescription:
              "Manage saved teams, recent calculations, and local tournament drafts on this device.",
          }
        : getToolBySlug(slug),
    )
    .filter(Boolean);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guides" },
          { name: hub.title, path: hub.href },
        ])}
      />
      <JsonLd data={faqSchema(hub.faqs)} />

      <header className="bg-sport-dark text-white">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Guides", href: "/guides" },
              { label: hub.title },
            ]}
          />
          <h1 className="mt-4 text-3xl font-black tracking-tight text-balance sm:text-5xl">
            {hub.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
            {hub.intro}
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <section>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
                Topic guides
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 dark:text-white sm:text-3xl">
                Read these related cricket guides
              </h2>
            </div>
            <p className="text-sm font-bold text-slate-600 dark:text-slate-300">
              {relatedGuides.length} guides
            </p>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedGuides.map((guide) =>
              guide ? <GuideCard key={guide.slug} guide={guide} /> : null,
            )}
          </div>
        </section>

        <section className="mt-12 rounded-lg border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-900 dark:bg-emerald-950/40">
          <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">
            Related tools
          </h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-700 dark:text-slate-300">
            Use these calculators and local tools alongside the guides when you
            want to check formulas, compare scenarios, or manage manual cricket
            data.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {relatedTools.map((tool) =>
              tool ? (
                <Link
                  key={tool.slug}
                  href={tool.href}
                  className="btn-glow rounded border border-white/70 bg-white px-4 py-3 shadow-sm transition hover:border-emerald-500 hover:text-emerald-900 dark:border-sport-border dark:bg-sport-card dark:text-slate-100 dark:hover:border-sport-primary dark:hover:text-sport-primary"
                >
                  <span className="block text-sm font-black">{tool.name}</span>
                  <span className="mt-1 block text-xs leading-5 text-slate-600 dark:text-slate-300">
                    {tool.shortDescription}
                  </span>
                </Link>
              ) : null,
            )}
          </div>
        </section>

        <section className="mt-12 rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-sport-border dark:bg-sport-card">
          <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">
            FAQ
          </h2>
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {hub.faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="font-black text-slate-950 dark:text-white">
                  {faq.question}
                </h3>
                <p className="mt-2 leading-7 text-slate-700 dark:text-slate-300">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
