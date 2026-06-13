import Link from "next/link";
import { Logo } from "@/components/Logo";

const siteLinks = [
  { href: "/", label: "Home" },
  { href: "/tools", label: "Tools" },
  { href: "/guides", label: "Guides" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/status", label: "Status" },
];

const policyLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-and-conditions", label: "Terms and Conditions" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/adsense", label: "Advertising Policy" },
  { href: "/google-search-console", label: "Search Console" },
];

export function Footer() {
  return (
    <footer className="border-t border-sport-border bg-sport-dark text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
        <div>
          <Logo theme="dark" />
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-300">
            RKBSports.app provides practical cricket calculators, guides, and
            reference pages for fans, players, coaches, and community tournament
            organizers.
          </p>
          <div className="mt-4 space-y-1 text-sm">
            <a className="btn-glow block rounded text-slate-300 hover:text-sport-primary" href="mailto:contact@rkbsports.app">
              contact@rkbsports.app
            </a>
            <a className="btn-glow block rounded text-slate-300 hover:text-sport-primary" href="mailto:support@rkbsports.app">
              support@rkbsports.app
            </a>
          </div>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-emerald-300">
            Website
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            {siteLinks.map((item) => (
              <li key={item.href}>
                <Link className="btn-glow inline-flex rounded text-slate-300 hover:text-sport-primary" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-emerald-300">
            Legal
          </h2>
          <ul className="mt-3 space-y-2 text-sm">
            {policyLinks.map((item) => (
              <li key={item.href}>
                <Link className="btn-glow inline-flex rounded text-slate-300 hover:text-sport-primary" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 px-4 py-4 text-center text-xs text-slate-400">
        {"\u00A9"} {new Date().getFullYear()} RKBSports.app. All rights reserved.
      </div>
    </footer>
  );
}
