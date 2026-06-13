import type { MetadataRoute } from "next";
import { calculatorPages } from "@/data/calculators";
import { guides } from "@/data/guides";
import { siteUrl } from "@/lib/site";

const routes = [
  "",
  "/tools",
  "/guides",
  "/dashboard",
  "/about",
  "/contact",
  "/status",
  "/privacy-policy",
  "/terms-and-conditions",
  "/disclaimer",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified,
    changeFrequency:
      route === "" || route === "/tools" || route === "/guides"
        ? "weekly"
        : "monthly",
    priority: route === "" ? 1 : route === "/tools" || route === "/guides" ? 0.9 : 0.7,
  }));

  const guideRoutes = guides.map((guide) => ({
    url: `${siteUrl}/guides/${guide.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const calculatorRoutes = calculatorPages.map((calculator) => ({
    url: `${siteUrl}/tools/${calculator.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  return [...staticRoutes, ...guideRoutes, ...calculatorRoutes];
}
