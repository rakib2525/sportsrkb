import type { Metadata } from "next";
import { GuideHubPage } from "@/components/guides/GuideHubPage";
import { getGuideHubBySlug } from "@/data/guideHubs";
import { createSeoMetadata } from "@/lib/seo/metadata";

const hub = getGuideHubBySlug("bowling-stats")!;

export const metadata: Metadata = createSeoMetadata({
  title: hub.metaTitle,
  description: hub.metaDescription,
  path: hub.href,
});

export default function BowlingStatsGuideHub() {
  return <GuideHubPage hub={hub} />;
}
