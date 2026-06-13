import Link from "next/link";
import type { ReactNode } from "react";
import {
  InContentAd,
  ResultAd,
  StickyAnchorAdPlaceholder,
  TopCalculatorAd,
} from "@/components/ads/AdPlaceholders";
import { GlossaryTooltip } from "@/components/glossary/GlossaryTooltip";
import { JsonLd } from "@/components/seo/JsonLd";
import type { CalculatorPageData } from "@/data/calculators";
import { getGuideBySlug } from "@/data/guides";
import { getToolBySlug } from "@/data/tools";
import {
  breadcrumbSchema,
  calculatorWebApplicationSchema,
  faqSchema,
} from "@/lib/seo/schema";

type CalculatorLayoutProps = {
  calculator: CalculatorPageData;
  calculatorPanel?: ReactNode;
};

export function CalculatorLayout({
  calculator,
  calculatorPanel,
}: CalculatorLayoutProps) {
  const relatedTools = calculator.relatedToolSlugs
    .map((slug) => getToolBySlug(slug))
    .filter(Boolean);
  const relatedGuides = calculator.relatedGuideSlugs
    .map((slug) => getGuideBySlug(slug))
    .filter(Boolean);

  return (
    <>
      <article>
        <JsonLd
          data={breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Tools", path: "/tools" },
            { name: calculator.name, path: `/tools/${calculator.slug}` },
          ])}
        />
        <JsonLd data={calculatorWebApplicationSchema(calculator)} />
        <JsonLd data={faqSchema(calculator.faqs)} />
        <header className="bg-sport-dark text-white">
          <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
            <Link
              href="/tools"
              className="btn-glow inline-flex rounded text-sm font-bold text-sport-primary hover:text-emerald-200"
            >
              Tools
            </Link>
            <h1 className="mt-4 max-w-3xl text-3xl font-black tracking-tight text-balance sm:text-5xl">
              {calculator.name}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
              {calculator.intro}
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <TopCalculatorAd />

          {calculatorPanel ?? (
            <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              <section className="glass-card rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-sport-border dark:bg-sport-card">
                <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">
                  Calculator
                </h2>
                <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
                  The working form will be added in a later phase. This
                  placeholder reserves the input structure and uses shared cricket
                  validation utilities for future safe calculations.
                </p>
              </section>
              <aside className="space-y-6">
                <section className="glass-card rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-sport-border dark:bg-sport-card">
                  <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">
                    Result
                  </h2>
                  <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
                    Results will appear here after the calculator logic is added.
                  </p>
                </section>
                <ResultAd />
              </aside>
            </div>
          )}

          <section className="glass-card mt-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-sport-border dark:bg-sport-card">
            <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">
              About this calculator
            </h2>
            <div className="mt-4 space-y-4 leading-7 text-slate-700 dark:text-slate-300">
              {calculator.description.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-x-3 gap-y-2 text-sm">
              {calculator.glossaryTerms.map((term) => (
                <GlossaryTooltip key={term} term={term} />
              ))}
            </div>
          </section>

          <InContentAd />

          <section className="glass-card mt-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-sport-border dark:bg-sport-card">
            <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">
              {calculator.formula.title}
            </h2>
            <div className="mt-4 rounded border border-slate-200 bg-slate-100 p-4 font-mono text-sm font-bold text-slate-950 dark:border-sport-border dark:bg-sport-dark dark:text-sport-primary">
              {calculator.formula.value}
            </div>
            <p className="mt-4 leading-7 text-slate-700 dark:text-slate-300">
              {calculator.formula.note}
            </p>
          </section>

          <section className="glass-card mt-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-sport-border dark:bg-sport-card">
            <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">
              {calculator.example.title}
            </h2>
            <ol className="mt-4 list-decimal space-y-3 pl-5 leading-7 text-slate-700 dark:text-slate-300">
              {calculator.example.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </section>

          <section className="glass-card mt-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-sport-border dark:bg-sport-card">
            <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">
              FAQ
            </h2>
            <div className="mt-5 space-y-5">
              {calculator.faqs.map((faq) => (
                <div key={faq.question}>
                  <h3 className="font-black text-slate-950 dark:text-white">
                    {faq.question}
                  </h3>
                  <p className="mt-2 leading-7 text-slate-700 dark:text-slate-300">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <section className="glass-card rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-sport-border dark:bg-sport-card">
              <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">
                Related tools
              </h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {relatedTools.map((tool) =>
                  tool ? (
                    <Link
                      key={tool.slug}
                      href={tool.href}
                      className="btn-glow rounded bg-emerald-50 px-4 py-2 text-sm font-black text-emerald-800 hover:text-emerald-950 dark:bg-emerald-950/40 dark:text-sport-primary dark:hover:text-emerald-200"
                    >
                      {tool.name}
                    </Link>
                  ) : null,
                )}
              </div>
            </section>

            <section className="glass-card rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-sport-border dark:bg-sport-card">
              <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">
                Related guides
              </h2>
              <div className="mt-4 space-y-3">
                {relatedGuides.map((guide) =>
                  guide ? (
                    <Link
                      key={guide.slug}
                      href={`/guides/${guide.slug}`}
                      className="btn-glow block rounded text-sm font-black text-emerald-800 hover:text-emerald-950 dark:text-sport-primary dark:hover:text-emerald-200"
                    >
                      {guide.title}
                    </Link>
                  ) : null,
                )}
              </div>
            </section>
          </div>
        </div>
      </article>
      <StickyAnchorAdPlaceholder />
    </>
  );
}
