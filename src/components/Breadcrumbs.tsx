import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm font-bold">
      <ol className="flex flex-wrap items-center gap-2 text-slate-300">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 ? <span className="text-slate-500">/</span> : null}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="btn-glow rounded text-sport-primary hover:text-emerald-200"
                >
                  {item.label}
                </Link>
              ) : (
                <span className={isLast ? "text-slate-100" : "text-slate-300"}>
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
