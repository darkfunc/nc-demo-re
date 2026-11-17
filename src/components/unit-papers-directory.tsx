"use client";

import { useMemo, useState } from "react";
import { ExternalLink, FileStack, Search } from "lucide-react";

export type UnitPaperGrade = {
  label: string;
  number: string;
  href?: string;
};

export function UnitPapersDirectory({ grades }: { grades: UnitPaperGrade[] }) {
  const [query, setQuery] = useState("");
  const filteredGrades = useMemo(
    () => grades.filter((grade) => grade.label.toLowerCase().includes(query.toLowerCase().trim())),
    [grades, query],
  );
  const availableCount = grades.filter((grade) => grade.href).length;

  return (
    <section
      className="max-w-7xl mx-auto px-6 py-20 md:py-24"
      aria-labelledby="paper-directory-heading"
    >
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:items-start">
        <div className="lg:sticky lg:top-32">
          <div className="mb-5 flex items-center gap-4">
            <span className="h-px w-10 bg-maroon" aria-hidden="true" />
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-maroon">
              Browse by grade
            </span>
          </div>
          <h2
            id="paper-directory-heading"
            className="max-w-lg font-display text-4xl font-semibold tracking-[-0.02em] md:text-5xl"
          >
            Your next <span className="text-maroon">practice set.</span>
          </h2>
          <p className="mt-6 max-w-md text-[15.5px] leading-relaxed text-muted-foreground">
            Choose a grade to open its official paper folder. The links below point directly
            to the folders published by Nalanda College.
          </p>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 font-mono text-[10px] uppercase tracking-[0.18em]">
            <span className="text-maroon">{availableCount} folders available</span>
            <span className="text-muted-foreground">Official links</span>
          </div>
        </div>

        <div>
          <label className="relative block">
            <span className="sr-only">Search grades</span>
            <Search className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by grade..."
              type="search"
              className="w-full border-b border-border bg-transparent py-4 pl-8 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-maroon"
            />
          </label>

          <ul className="mt-6 divide-y divide-border border-t border-border">
            {filteredGrades.map((grade) => {
              const content = (
                <>
                  <span className="w-12 shrink-0 font-mono text-xl font-bold text-maroon">
                    {grade.number}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-maroon">
                      {grade.label}
                    </span>
                    <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      {grade.href ? "Open official folder" : "Folder link not published"}
                    </span>
                  </span>
                  {grade.href ? (
                    <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-maroon" />
                  ) : (
                    <FileStack className="h-4 w-4 shrink-0 text-muted-foreground/60" />
                  )}
                </>
              );
              const className = "group flex min-h-20 items-center gap-5 py-5 pr-1";

              return (
                <li key={grade.label}>
                  {grade.href ? (
                    <a href={grade.href} target="_blank" rel="noreferrer" className={className}>
                      {content}
                    </a>
                  ) : (
                    <div
                      className={`${className} cursor-not-allowed opacity-60`}
                      aria-label={`${grade.label}: folder link not published`}
                    >
                      {content}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          {filteredGrades.length === 0 && (
            <p className="mt-6 border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
              No grade matches “{query}”. Try another search.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
