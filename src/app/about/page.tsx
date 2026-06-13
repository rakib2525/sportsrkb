import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { createSeoMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createSeoMetadata({
  title: "About Us",
  description:
    "Learn about RKBSports.app, a cricket tools website focused on useful calculators, clean information, and responsible sports content.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Useful cricket tools, built with clarity"
        description="RKBSports.app is a cricket-focused website for practical calculators, match planning resources, and plain-language cricket statistics."
      />
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-6 leading-7 text-slate-700 dark:text-slate-300">
          <p>
            RKBSports.app exists to make common cricket calculations easier to
            understand and faster to perform. The website is being built around
            real utilities such as run rate, required run rate, net run rate,
            strike rate, bowling economy, averages, and points table planning.
          </p>
          <p>
            The site avoids streaming, fake live scores, copyrighted sports
            images, team logos, and demo API feeds. Our goal is to provide a
            lightweight, mobile-friendly cricket reference that can grow into a
            trusted toolkit over time.
          </p>
          <p>
            RKBSports.app is intended for cricket fans, players, coaches,
            scorers, and local tournament organizers who need simple tools and
            clear explanations without unnecessary clutter.
          </p>
          <p>
            The website is independent and focuses on manual calculators,
            original guides, and local-only browser storage features. It does
            not require login for saved teams, recent calculations, dashboard
            drafts, or points table planning.
          </p>
          <p>
            General questions can be sent to{" "}
            <a className="font-bold text-emerald-800 dark:text-emerald-300" href="mailto:contact@rkbsports.app">
              contact@rkbsports.app
            </a>
            . Bugs or support requests can be sent to{" "}
            <a className="font-bold text-emerald-800 dark:text-emerald-300" href="mailto:support@rkbsports.app">
              support@rkbsports.app
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
