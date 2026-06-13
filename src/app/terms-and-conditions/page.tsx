import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { createSeoMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createSeoMetadata({
  title: "Terms and Conditions",
  description:
    "Review the terms and conditions for using RKBSports.app cricket tools and informational content.",
  path: "/terms-and-conditions",
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Terms"
        title="Terms and Conditions"
        description="These terms outline the basic conditions for using RKBSports.app."
      />
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-7 leading-7 text-slate-700 dark:text-slate-300">
          <section>
            <h2 className="text-xl font-black text-slate-950 dark:text-white">Use of the website</h2>
            <p className="mt-3">
              RKBSports.app provides cricket calculators and informational
              content for general use. By using the website, visitors agree to
              use it responsibly and avoid actions that could harm the site or
              interfere with other visitors.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-black text-slate-950 dark:text-white">Content accuracy</h2>
            <p className="mt-3">
              We aim to keep formulas and explanations clear and useful, but
              visitors should verify important results independently, especially
              for official tournaments, scoring decisions, or published records.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-black text-slate-950 dark:text-white">Intellectual property</h2>
            <p className="mt-3">
              Website text, layout, and original interface elements belong to
              RKBSports.app unless otherwise stated. Visitors may not copy,
              republish, or misuse website content without permission.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-black text-slate-950 dark:text-white">Changes to terms</h2>
            <p className="mt-3">
              RKBSports.app may update these terms as the website grows. Continued
              use of the website after updates means the revised terms apply.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-black text-slate-950 dark:text-white">Contact</h2>
            <p className="mt-3">
              Terms questions can be sent to{" "}
              <a className="font-bold text-emerald-800 dark:text-emerald-300" href="mailto:contact@rkbsports.app">
                contact@rkbsports.app
              </a>
              .
            </p>
          </section>
        </div>
      </section>
    </>
  );
}
