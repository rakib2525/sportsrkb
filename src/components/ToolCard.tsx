import Link from "next/link";
import type { Tool } from "@/data/tools";

export function ToolCard({ tool }: { tool: Tool }) {
  const cardHref =
    tool.statusLabel === "Available" ? tool.href : `/guides/${tool.relatedGuideSlug}`;

  return (
    <article
      id={tool.slug}
      className="glass-card card-lift rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-sport-border dark:bg-sport-card dark:hover:border-sport-primary"
    >
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-lg font-black tracking-tight text-slate-950 dark:text-white">
          {tool.name}
        </h2>
        <span className="rounded bg-amber-100 px-2 py-1 text-xs font-bold uppercase tracking-wide text-amber-800 dark:bg-amber-300/15 dark:text-amber-200">
          {tool.statusLabel}
        </span>
      </div>
      <p className="mt-2 text-xs font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
        {tool.category}
      </p>
      <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
        {tool.shortDescription}
      </p>
      <Link
        href={cardHref}
        className="btn-glow mt-5 inline-flex rounded px-1 text-sm font-bold text-emerald-800 hover:text-emerald-950 dark:text-sport-primary dark:hover:text-emerald-200"
      >
        {tool.statusLabel === "Available" ? "Open calculator" : "Read related guide"}
      </Link>
    </article>
  );
}
