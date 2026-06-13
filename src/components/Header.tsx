import Link from "next/link";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";

const navigation = [
  { href: "/", label: "Home" },
  { href: "/tools", label: "Tools" },
  { href: "/guides", label: "Guides" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-sport-border dark:bg-sport-dark/95">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Logo />
        <div className="flex items-center gap-2">
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="btn-glow rounded px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-800 dark:text-slate-200 dark:hover:bg-sport-card dark:hover:text-sport-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
          <details className="group relative md:hidden">
            <summary className="btn-glow flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded border border-slate-300 text-slate-900 transition hover:border-emerald-700 hover:bg-emerald-50 hover:text-emerald-800 dark:border-sport-border dark:text-slate-100 dark:hover:border-sport-primary dark:hover:bg-sport-card dark:hover:text-sport-primary">
              <span className="sr-only">Open menu</span>
              <span className="block h-0.5 w-5 bg-current before:block before:h-0.5 before:w-5 before:-translate-y-1.5 before:bg-current before:content-[''] after:block after:h-0.5 after:w-5 after:translate-y-1 after:bg-current after:content-['']" />
            </summary>
            <nav
              className="glass-card absolute right-0 mt-3 w-48 rounded border border-slate-200 bg-white p-2 shadow-lg dark:border-sport-border dark:bg-sport-card"
              aria-label="Mobile navigation"
            >
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-sport-primary"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
