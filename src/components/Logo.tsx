import Link from "next/link";

type LogoProps = {
  theme?: "light" | "dark";
};

export function Logo({ theme = "light" }: LogoProps) {
  const nameClass =
    theme === "dark" ? "text-white" : "text-slate-950 dark:text-white";
  const labelClass =
    theme === "dark"
      ? "text-emerald-300"
      : "text-emerald-700 dark:text-emerald-300";

  return (
    <Link href="/" className="flex items-center gap-3" aria-label="RKBSports.app home">
      <span className="grid h-10 w-10 place-items-center rounded bg-emerald-700 text-sm font-black text-white shadow-sm">
        RKB
      </span>
      <span className="leading-tight">
        <span className={`block text-base font-black tracking-tight ${nameClass}`}>
          RKBSports.app
        </span>
        <span className={`block text-xs font-semibold uppercase tracking-wide ${labelClass}`}>
          Cricket tools
        </span>
      </span>
    </Link>
  );
}
