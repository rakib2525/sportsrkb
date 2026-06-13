import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { createSeoMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createSeoMetadata({
  title: "Disclaimer",
  description:
    "Read the RKBSports.app disclaimer about cricket tools, informational content, and unofficial sports references.",
  path: "/disclaimer",
});

export default function DisclaimerPage() {
  return (
    <>
      <PageHero
        eyebrow="Disclaimer"
        title="Website Disclaimer"
        description="RKBSports.app provides cricket tools and informational resources, not official scoring decisions or live match services."
      />
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-7 leading-7 text-slate-700 dark:text-slate-300">
          <section>
            <h2 className="text-xl font-black text-slate-950 dark:text-white">General information</h2>
            <p className="mt-3">
              The information on RKBSports.app is provided for general cricket
              reference and planning purposes. Calculators and guides should not
              be treated as official match records or professional advice.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-black text-slate-950 dark:text-white">No live score service</h2>
            <p className="mt-3">
              RKBSports.app does not provide streaming, live match video, fake
              live scores, or unofficial live score feeds. Tool pages are built
              for calculations and static cricket information.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-black text-slate-950 dark:text-white">No official affiliation</h2>
            <p className="mt-3">
              RKBSports.app is an independent cricket tools website and is not
              affiliated with cricket boards, teams, leagues, broadcasters, or
              player organizations unless explicitly stated.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-black text-slate-950 dark:text-white">Corrections</h2>
            <p className="mt-3">
              To report an issue, email{" "}
              <a className="font-bold text-emerald-800 dark:text-emerald-300" href="mailto:support@rkbsports.app">
                support@rkbsports.app
              </a>
              .
            </p>
          </section>
        </div>
      </section>
    </>
  );
}
