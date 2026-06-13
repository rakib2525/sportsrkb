import type { CalculatorPageData } from "@/data/calculators";
import type { GuideArticle } from "@/data/guides";
import { siteUrl } from "@/lib/site";

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "RKBSports.app",
    url: siteUrl,
    description:
      "Cricket calculators, tools, and guides for manual cricket planning and statistics.",
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "RKBSports.app",
    url: siteUrl,
    email: "contact@rkbsports.app",
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "support@rkbsports.app",
      },
    ],
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteUrl}${item.path}`,
    })),
  };
}

export function faqSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function calculatorWebApplicationSchema(calculator: CalculatorPageData) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: calculator.name,
    url: `${siteUrl}/tools/${calculator.slug}`,
    applicationCategory: "SportsApplication",
    operatingSystem: "Any",
    description: calculator.metaDescription,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}

export function guideArticleSchema(guide: GuideArticle) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.metaDescription,
    dateModified: guide.updatedAt,
    url: `${siteUrl}/guides/${guide.slug}`,
    author: {
      "@type": "Organization",
      name: "RKBSports.app",
    },
    publisher: {
      "@type": "Organization",
      name: "RKBSports.app",
    },
  };
}
