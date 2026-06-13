type PageHeroProps = {
  title: string;
  description: string;
  eyebrow?: string;
};

export function PageHero({ title, description, eyebrow }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-sport-dark text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,255,102,0.12),transparent_30rem),radial-gradient(circle_at_bottom_right,rgba(249,115,22,0.12),transparent_26rem)]" />
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="glass-card relative max-w-4xl rounded-lg border border-white/10 p-6">
          {eyebrow ? (
            <p className="text-sm font-bold uppercase tracking-wide text-sport-primary">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="mt-3 max-w-3xl text-3xl font-black tracking-tight sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300 sm:text-lg">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
