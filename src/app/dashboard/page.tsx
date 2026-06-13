import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { QuickCalculatorLinks } from "@/components/dashboard/QuickCalculatorLinks";
import { RecentCalculationsHub } from "@/components/dashboard/RecentCalculationsHub";
import { TournamentDrafts } from "@/components/dashboard/TournamentDrafts";
import { SavedTeams } from "@/components/teams/SavedTeams";
import { createSeoMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = createSeoMetadata({
  title: "Dashboard",
  description:
    "Manage local RKBSports.app saved teams, recent calculator results, tournament drafts, and quick calculator links.",
  path: "/dashboard",
});

export default function DashboardPage() {
  return (
    <>
      <PageHero
        eyebrow="Dashboard"
        title="Your local cricket tools dashboard"
        description="Manage saved teams, recent calculations, tournament drafts, and quick calculator links. Everything here is saved only in this browser on this device."
      />
      <section className="mx-auto max-w-6xl space-y-8 px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm font-semibold leading-6 text-emerald-950 dark:border-sport-primary/40 dark:bg-sport-card dark:text-slate-200">
          No login is required. RKBSports.app does not send this dashboard data
          to a server, database, or API.
        </div>
        <QuickCalculatorLinks />
        <SavedTeams />
        <RecentCalculationsHub />
        <TournamentDrafts />
      </section>
    </>
  );
}
