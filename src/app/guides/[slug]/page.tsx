import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PopularCalculators } from "@/components/discovery/PopularCalculators";
import { JsonLd } from "@/components/seo/JsonLd";
import { getGuideHubForGuideSlug } from "@/data/guideHubs";
import { getGuideBySlug, guides } from "@/data/guides";
import { getToolBySlug } from "@/data/tools";
import { createSeoMetadata } from "@/lib/seo/metadata";
import {
  breadcrumbSchema,
  faqSchema,
  guideArticleSchema,
} from "@/lib/seo/schema";

type GuidePageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return guides.map((guide) => ({
    slug: guide.slug,
  }));
}

export function generateMetadata({ params }: GuidePageProps): Metadata {
  const guide = getGuideBySlug(params.slug);

  if (!guide) {
    return {
      title: "Guide Not Found",
    };
  }

  return createSeoMetadata({
    title: guide.metaTitle,
    description: guide.metaDescription,
    path: `/guides/${guide.slug}`,
    type: "article",
  });
}

export default function GuidePage({ params }: GuidePageProps) {
  const guide = getGuideBySlug(params.slug);

  if (!guide) {
    notFound();
  }

  const relatedTools = guide.relatedTools
    .map((slug) => getToolBySlug(slug))
    .filter(Boolean);
  const relatedGuides = guide.relatedGuides
    .map((slug) => getGuideBySlug(slug))
    .filter(Boolean);
  const relatedHub = getGuideHubForGuideSlug(guide.slug);

  return (
    <article>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guides" },
          { name: guide.title, path: `/guides/${guide.slug}` },
        ])}
      />
      <JsonLd data={guideArticleSchema(guide)} />
      <JsonLd data={faqSchema(guide.faqs)} />
      <header className="bg-slate-950 text-white">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Guides", href: "/guides" },
              { label: guide.title },
            ]}
          />
          <h1 className="mt-4 text-3xl font-black tracking-tight text-balance sm:text-5xl">
            {guide.title}
          </h1>
          <p className="mt-5 text-base leading-7 text-slate-300 sm:text-lg">
            {guide.intro}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-10">
          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">
              Simple explanation
            </h2>
            <div className="mt-4 space-y-4 leading-7 text-slate-700 dark:text-slate-300">
              {guide.explanation.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section className="glass-card rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-sport-border dark:bg-sport-card">
            <MarkdownContent content={guide.body} />
          </section>

          {guide.formula ? (
            <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">
                Formula
              </h2>
              <div className="mt-4 rounded bg-slate-100 p-4 font-mono text-sm font-bold text-slate-950 dark:bg-slate-950 dark:text-emerald-200">
                {guide.formula.value}
              </div>
              <p className="mt-4 text-sm font-bold text-slate-900 dark:text-slate-100">
                {guide.formula.label}
              </p>
              <p className="mt-2 leading-7 text-slate-700 dark:text-slate-300">
                {guide.formula.note}
              </p>
            </section>
          ) : null}

          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">
              {guide.example.title}
            </h2>
            <ol className="mt-4 list-decimal space-y-3 pl-5 leading-7 text-slate-700 dark:text-slate-300">
              {guide.example.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">
              FAQ
            </h2>
            <div className="mt-5 space-y-5">
              {guide.faqs.map((faq) => (
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

          <section className="rounded-lg border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-900 dark:bg-emerald-950/40">
            <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">
              Related tools
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {relatedTools.map((tool) =>
                tool ? (
                  <Link
                    key={tool.slug}
                    href={tool.href}
                    className="rounded bg-white px-4 py-2 text-sm font-black text-emerald-800 shadow-sm hover:text-emerald-950 dark:bg-slate-900 dark:text-emerald-300 dark:hover:text-emerald-200"
                  >
                    {tool.name}
                  </Link>
                ) : null,
              )}
            </div>
          </section>

          {relatedGuides.length > 0 ? (
            <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-sport-border dark:bg-sport-card">
              <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">
                Related guides
              </h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {relatedGuides.map((relatedGuide) =>
                  relatedGuide ? (
                    <Link
                      key={relatedGuide.slug}
                      href={`/guides/${relatedGuide.slug}`}
                      className="btn-glow rounded border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-black text-slate-800 hover:border-emerald-500 hover:text-emerald-900 dark:border-sport-border dark:bg-sport-dark dark:text-slate-100 dark:hover:border-sport-primary dark:hover:text-sport-primary"
                    >
                      {relatedGuide.title}
                    </Link>
                  ) : null,
                )}
              </div>
            </section>
          ) : null}

          {relatedHub ? (
            <section className="rounded-lg border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-900 dark:bg-emerald-950/40">
              <p className="text-sm font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
                Topic hub
              </p>
              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 dark:text-white">
                More in {relatedHub.title}
              </h2>
              <p className="mt-3 max-w-2xl leading-7 text-slate-700 dark:text-slate-300">
                {relatedHub.excerpt}
              </p>
              <Link
                href={relatedHub.href}
                className="btn-glow mt-5 inline-flex rounded bg-sport-primary px-4 py-2 text-sm font-black text-sport-dark transition hover:bg-emerald-300"
              >
                Explore this topic
              </Link>
            </section>
          ) : null}

          <PopularCalculators />
        </div>
      </div>
    </article>
  );
}

function MarkdownContent({ content }: { content: string }) {
  const blocks = content.split(/\n{2,}/).filter(Boolean);

  return (
    <div className="space-y-5 leading-7 text-slate-700 dark:text-slate-300">
      {blocks.map((block) => {
        if (block.startsWith("## ")) {
          return (
            <h2
              key={block}
              className="pt-2 text-2xl font-black tracking-tight text-slate-950 dark:text-white"
            >
              {block.replace(/^## /, "")}
            </h2>
          );
        }

        if (block.startsWith("### ")) {
          return (
            <h3
              key={block}
              className="pt-1 text-xl font-black tracking-tight text-slate-950 dark:text-white"
            >
              {block.replace(/^### /, "")}
            </h3>
          );
        }

        if (block.split(/\r?\n/).every((line) => line.startsWith("- "))) {
          return (
            <ul key={block} className="list-disc space-y-2 pl-5">
              {block.split(/\r?\n/).map((line) => (
                <li key={line}>{line.replace(/^- /, "")}</li>
              ))}
            </ul>
          );
        }

        return <p key={block}>{block}</p>;
      })}
    </div>
  );
}
