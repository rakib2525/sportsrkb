import type { Metadata } from "next";
import { siteName, siteUrl } from "@/lib/site";

type SeoMetadataInput = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
};

export function createSeoMetadata({
  title,
  description,
  path,
  type = "website",
}: SeoMetadataInput): Metadata {
  const url = `${siteUrl}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: `${title} | ${siteName}`,
      description,
      url,
      siteName,
      type,
    },
    twitter: {
      card: "summary",
      title: `${title} | ${siteName}`,
      description,
    },
  };
}
