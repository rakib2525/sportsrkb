import Link from "next/link";
import type { GuideArticle } from "@/data/guides";

export function GuideCard({ guide }: { guide: GuideArticle }) {
  return (
    <article className="glass-card card-lift rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-sport-border dark:bg-sport-card dark:hover:border-sport-primary">
      <p className="text-xs font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
        {guide.category}
      </p>
      <h2 className="mt-3 text-xl font-black tracking-tight text-slate-950 dark:text-white">
        <Link href={`/guides/${guide.slug}`}>{guide.title}</Link>
      </h2>
      <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
        {guide.excerpt}
      </p>
      <Link
        href={`/guides/${guide.slug}`}
        className="btn-glow mt-5 inline-flex rounded px-1 text-sm font-bold text-emerald-800 hover:text-emerald-950 dark:text-sport-primary dark:hover:text-emerald-200"
      >
        Read guide
      </Link>
    </article>
  );
}
