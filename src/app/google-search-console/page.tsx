import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { createSeoMetadata } from "@/lib/seo/metadata";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = createSeoMetadata({
  title: "Google Search Console Information",
  description:
    "Learn how RKBSports.app uses Google Search Console for sitemap submission, indexing checks, and search performance monitoring.",
  path: "/google-search-console",
});

export default function GoogleSearchConsolePage() {
  const sitemapUrl = `${siteUrl}/sitemap.xml`;

  return (
    <>
      <PageHero
        eyebrow="Search"
        title="Google Search Console information"
        description="A public overview of how RKBSports.app prepares its cricket tools and guide pages for search discovery."
      />

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-sport-border dark:bg-sport-card">
            <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">
              What Search Console Is
            </h2>
            <p className="mt-4 leading-7 text-slate-700 dark:text-slate-300">
              Google Search Console is a free Google tool that helps site owners
              understand how their public pages are discovered, crawled, and
              indexed by Google Search. It can show sitemap status, indexing
              issues, search queries, and page performance information.
            </p>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-sport-border dark:bg-sport-card">
            <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">
              How RKBSports.app Uses It
            </h2>
            <p className="mt-4 leading-7 text-slate-700 dark:text-slate-300">
              RKBSports.app uses Search Console readiness practices to help
              search engines find cricket calculators, guide hubs, static
              informational pages, and policy pages. The site uses static pages,
              clear internal links, metadata, sitemap entries, and robots rules
              that allow crawling of public content.
            </p>
          </section>

          <section className="rounded-lg border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-900 dark:bg-emerald-950/40">
            <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">
              Sitemap URL
            </h2>
            <p className="mt-4 leading-7 text-slate-700 dark:text-slate-300">
              The public sitemap is available at:
            </p>
            <Link
              href="/sitemap.xml"
              className="btn-glow mt-3 inline-flex rounded bg-sport-primary px-4 py-2 text-sm font-black text-sport-dark transition hover:bg-emerald-300"
            >
              {sitemapUrl}
            </Link>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-sport-border dark:bg-sport-card">
            <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">
              Indexing Information
            </h2>
            <p className="mt-4 leading-7 text-slate-700 dark:text-slate-300">
              RKBSports.app is built to make public cricket tools and guides
              crawlable. Pages are not hidden behind login, calculator results
              use manual user input, and guide content is served as static
              content. Search engines may still choose when and whether to index
              individual pages based on their own quality and crawl systems.
            </p>
          </section>
        </div>
      </section>
    </>
  );
}
