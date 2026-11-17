import type { ReactNode } from "react";

/**
 * Numbered editorial section header:
 * a hairline rule, an index number, a serif title and optional trailing meta.
 */
export function SectionHeading({
  index,
  title,
  meta,
  className = "",
}: {
  index?: string;
  title: string;
  meta?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative border-b border-border pb-6 mb-12 lg:mb-16 ${className}`}>
      <span
        aria-hidden="true"
        className="absolute -bottom-px left-0 h-px w-16 bg-maroon"
      />
      <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3">
        <div className="flex items-baseline gap-4">
          {index && (
            <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-maroon">
              {index}
            </span>
          )}
          <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
            {title}
          </h2>
        </div>
        {meta && (
          <div className="text-[13px] text-muted-foreground tracking-tight">{meta}</div>
        )}
      </div>
    </div>
  );
}
