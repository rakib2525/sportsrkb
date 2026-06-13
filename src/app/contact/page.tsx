import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { createSeoMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createSeoMetadata({
  title: "Contact Us",
  description:
    "Contact RKBSports.app for cricket tool feedback, website questions, and general inquiries.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Contact RKBSports.app"
        description="Send feedback, corrections, tool suggestions, or general website inquiries."
      />
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-xl font-black text-slate-950 dark:text-white">General inquiries</h2>
          <p className="mt-4 leading-7 text-slate-700 dark:text-slate-300">
            For questions about RKBSports.app, cricket tool suggestions, policy
            concerns, or corrections, contact us by email.
          </p>
          <p className="mt-3 leading-7 text-slate-700 dark:text-slate-300">
            Please include the page URL and a short description if you are
            reporting a calculator issue, typo, accessibility concern, or
            content correction.
          </p>
          <p className="mt-5">
            <a
              className="font-black text-emerald-800 hover:text-emerald-950 dark:text-emerald-300 dark:hover:text-emerald-200"
              href="mailto:contact@rkbsports.app"
            >
              contact@rkbsports.app
            </a>
          </p>
          <p className="mt-3">
            <a
              className="font-black text-emerald-800 hover:text-emerald-950 dark:text-emerald-300 dark:hover:text-emerald-200"
              href="mailto:support@rkbsports.app"
            >
              support@rkbsports.app
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
