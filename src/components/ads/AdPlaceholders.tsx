type AdPlaceholderProps = {
  label: string;
  className?: string;
};

function AdPlaceholder({ label, className = "" }: AdPlaceholderProps) {
  return (
    <div
      className={`glass-card flex min-h-24 items-center justify-center rounded border border-dashed border-slate-300 bg-slate-100/70 px-4 py-6 text-center text-xs font-bold uppercase tracking-wide text-slate-500 dark:border-sport-border dark:bg-sport-card/70 dark:text-slate-400 ${className}`}
      aria-label={label}
    >
      {label}
    </div>
  );
}

export function TopCalculatorAd() {
  return <AdPlaceholder label="Advertisement placeholder - top calculator" />;
}

export function ResultAd() {
  return <AdPlaceholder label="Advertisement placeholder - below result" />;
}

export function InContentAd() {
  return <AdPlaceholder label="Advertisement placeholder - in content" className="mt-8" />;
}

export function StickyAnchorAdPlaceholder() {
  return (
    <div className="sticky bottom-0 z-30 border-t border-slate-200 bg-white/95 px-4 py-2 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur dark:border-sport-border dark:bg-sport-dark/95 md:hidden">
      <AdPlaceholder
        label="Advertisement placeholder - mobile anchor"
        className="min-h-12 py-3 text-[10px]"
      />
    </div>
  );
}
