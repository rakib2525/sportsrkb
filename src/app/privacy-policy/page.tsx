import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { createSeoMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createSeoMetadata({
  title: "Privacy Policy",
  description:
    "Read the RKBSports.app privacy policy for information about website usage, analytics, advertising, and contact emails.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy"
        title="Privacy Policy"
        description="This page explains how RKBSports.app approaches privacy for visitors using our cricket tools and informational pages."
      />
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-7 leading-7 text-slate-700 dark:text-slate-300">
          <section>
            <h2 className="text-xl font-black text-slate-950 dark:text-white">Information we collect</h2>
            <p className="mt-3">
              RKBSports.app may collect basic information that visitors choose to
              send by email, such as a name, email address, and message content.
              Standard server logs may also record technical information such as
              browser type, device type, referring pages, and approximate usage
              patterns.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-black text-slate-950 dark:text-white">Cookies and advertising</h2>
            <p className="mt-3">
              The website may use cookies or similar technologies for analytics,
              performance, security, and advertising. If advertising services
              such as Google AdSense are used, third-party vendors may use
              cookies to serve relevant ads based on visits to this and other
              websites.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-black text-slate-950 dark:text-white">How information is used</h2>
            <p className="mt-3">
              Information may be used to respond to inquiries, improve website
              content, monitor performance, protect the site, and maintain
              useful cricket tools for visitors.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-black text-slate-950 dark:text-white">Local browser storage</h2>
            <p className="mt-3">
              Some features, such as saved teams, recent calculations, dashboard
              notes, tournament drafts, and points table drafts, use
              localStorage in the visitor&apos;s browser. This local data stays
              on the device unless the visitor clears it. RKBSports.app does not
              require an account, database profile, or login for these features.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-black text-slate-950 dark:text-white">Contact</h2>
            <p className="mt-3">
              Privacy questions can be sent to{" "}
              <a className="font-bold text-emerald-800 dark:text-emerald-300" href="mailto:contact@rkbsports.app">
                contact@rkbsports.app
              </a>
              . Support and bug-report questions can be sent to{" "}
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
