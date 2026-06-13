import type { Metadata } from "next";
import { GuideHubPage } from "@/components/guides/GuideHubPage";
import { getGuideHubBySlug } from "@/data/guideHubs";
import { createSeoMetadata } from "@/lib/seo/metadata";

const hub = getGuideHubBySlug("net-run-rate")!;

export const metadata: Metadata = createSeoMetadata({
  title: hub.metaTitle,
  description: hub.metaDescription,
  path: hub.href,
});

export default function NetRunRateGuideHub() {
  return <GuideHubPage hub={hub} />;
}
