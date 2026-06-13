import type { Metadata } from "next";
import { getCalculatorPageBySlug } from "@/data/calculators";
import { createSeoMetadata } from "@/lib/seo/metadata";

export function createCalculatorMetadata(slug: string): Metadata {
  const calculator = getCalculatorPageBySlug(slug);

  if (!calculator) {
    return {
      title: "Calculator Not Found",
    };
  }

  return createSeoMetadata({
    title: calculator.metaTitle,
    description: calculator.metaDescription,
    path: `/tools/${calculator.slug}`,
  });
}
