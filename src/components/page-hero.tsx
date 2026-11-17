import type { ReactNode } from "react";

/**
 * Interior-page opening: hairline rule + eyebrow, serif display title,
 * optional intro. Plain paper — no decorative gradients.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-border bg-paper">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-16 md:pt-24 md:pb-20">
        <div className="mb-10 flex items-center gap-4 animate-fade">
          <span className="h-px w-10 origin-left bg-maroon animate-clip" aria-hidden="true" />
          <span className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-maroon">
            {eyebrow}
          </span>
        </div>
        <h1 className="font-display text-[2.6rem] leading-[1.04] font-semibold tracking-[-0.02em] md:text-6xl lg:text-[4.25rem] max-w-4xl text-balance animate-reveal">
          {title}
        </h1>
        {intro ? (
          <p className="mt-7 max-w-2xl text-[17px] leading-relaxed text-muted-foreground text-pretty">
            {intro}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
