import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { createSeoMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createSeoMetadata({
  title: "Advertising and AdSense Policy",
  description:
    "Read RKBSports.app advertising principles, including user-first content, no misleading ads, and no forced clicks.",
  path: "/adsense",
});

const policies = [
  {
    title: "User-first content",
    text: "RKBSports.app focuses on useful cricket calculators, guides, and static informational pages. Advertising should support the site without making the tools difficult to use.",
  },
  {
    title: "No misleading ads",
    text: "Advertising placements should be clearly separated from calculator results, guide content, navigation, and action buttons. Ads must not be presented as cricket results, official updates, or tool outputs.",
  },
  {
    title: "No forced clicks",
    text: "The site should never ask users to click ads, hide content behind ad clicks, or place ads in a way that causes accidental clicks. Calculator buttons and form controls should remain easy to access.",
  },
  {
    title: "Safe content policy",
    text: "RKBSports.app does not provide streaming links, fake live scores, copyrighted team assets, official league branding, or demo API data. The goal is original, practical cricket content.",
  },
];

export default function AdsensePage() {
  return (
    <>
      <PageHero
        eyebrow="Advertising"
        title="Advertising and AdSense policy"
        description="RKBSports.app is prepared for user-friendly advertising while keeping cricket tools, guides, and policy pages clear and useful."
      />

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-5 sm:grid-cols-2">
          {policies.map((policy) => (
            <section
              key={policy.title}
              className="glass-card card-lift rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-sport-border dark:bg-sport-card"
            >
              <h2 className="text-xl font-black tracking-tight text-slate-950 dark:text-white">
                {policy.title}
              </h2>
              <p className="mt-3 leading-7 text-slate-700 dark:text-slate-300">
                {policy.text}
              </p>
            </section>
          ))}
        </div>

        <section className="mt-8 rounded-lg border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-900 dark:bg-emerald-950/40">
          <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">
            AdSense readiness note
          </h2>
          <p className="mt-4 leading-7 text-slate-700 dark:text-slate-300">
            RKBSports.app keeps ad placeholder areas subtle and avoids adding
            real ad code until approval and configuration are ready. The
            published ads.txt file uses a placeholder comment only and does not
            include a fake publisher ID.
          </p>
        </section>
      </section>
    </>
  );
}
