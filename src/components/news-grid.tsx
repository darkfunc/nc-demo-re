"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";
import { formatDate } from "@/sanity/lib/format";

type NewsItem = {
  _id: string;
  title: string;
  slug: string;
  tag?: string;
  description?: string;
  thumbnailImage: any;
  publishedAt: string;
};

export function NewsGrid({ news }: { news: NewsItem[] }) {
  const categories = useMemo(() => {
    const tags = Array.from(new Set(news.map((n) => n.tag).filter(Boolean))) as string[];
    return ["All", ...tags];
  }, [news]);

  const [active, setActive] = useState("All");

  const filtered = active === "All" ? news : news.filter((n) => n.tag === active);
  const [featured, ...rest] = filtered;

  if (news.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 text-center font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        No news posted yet. Check back soon.
      </div>
    );
  }

  return (
    <>
      {/* Filter: text tabs with a maroon rule instead of pill buttons */}
      <div className="border-b border-border">
        <div
          className="max-w-7xl mx-auto px-6 flex flex-wrap items-center gap-x-7 gap-y-2 py-4"
          role="tablist"
          aria-label="Filter news by category"
        >
          {categories.map((c) => (
            <button
              key={c}
              role="tab"
              aria-selected={active === c}
              onClick={() => setActive(c)}
              className={`relative py-1 font-mono text-[11px] uppercase tracking-[0.16em] transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-full after:origin-left after:bg-maroon after:transition-transform after:duration-300 ${
                active === c
                  ? "text-maroon after:scale-x-100"
                  : "text-muted-foreground hover:text-foreground after:scale-x-0"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {featured && (
        <section className="border-b border-border bg-paper">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 gap-10 py-16 lg:grid-cols-12 lg:gap-14 lg:py-20">
            <Link href={`/news/${featured.slug}`} className="group block lg:col-span-7">
              <img
                src={urlFor(featured.thumbnailImage).width(1200).height(800).url()}
                alt={featured.title}
                width={1200}
                height={800}
                className="w-full aspect-3/2 object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </Link>
            <div className="flex flex-col justify-center lg:col-span-5">
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-maroon">
                  Featured{featured.tag ? ` · ${featured.tag}` : ""}
                </span>
                <time className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                  {formatDate(featured.publishedAt)}
                </time>
              </div>
              <Link href={`/news/${featured.slug}`} className="group mt-4">
                <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight transition-colors group-hover:text-maroon md:text-4xl lg:text-[2.6rem]">
                  {featured.title}
                </h2>
              </Link>
              <p className="mt-5 text-[15.5px] leading-relaxed text-muted-foreground">
                {featured.description}
              </p>
              <Link
                href={`/news/${featured.slug}`}
                className="group mt-8 inline-flex items-baseline gap-2 text-sm font-medium text-foreground"
              >
                <span className="border-b border-maroon pb-0.5 transition-colors group-hover:text-maroon">
                  Read the full story
                </span>
                <span
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
        {rest.length === 0 ? (
          <p className="text-center font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            No further stories in this category.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((a, i) => (
              <article key={a._id} className="group">
                <Link href={`/news/${a.slug}`}>
                  <div className="relative overflow-hidden">
                    <img
                      src={urlFor(a.thumbnailImage).width(800).height(560).url()}
                      alt={a.title}
                      width={800}
                      height={560}
                      loading="lazy"
                      decoding="async"
                      className="w-full aspect-10/7 object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 right-0 bg-paper px-2.5 py-1 font-mono text-[10px] tracking-[0.2em] text-muted-foreground"
                    >
                      {String(i + 2).padStart(2, "0")}
                    </span>
                  </div>
                  <div className="mt-5 flex items-baseline gap-4">
                    {a.tag && (
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-maroon">
                        {a.tag}
                      </span>
                    )}
                    <time className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      {formatDate(a.publishedAt)}
                    </time>
                  </div>
                  <h3 className="mt-2.5 font-display text-[1.35rem] font-semibold leading-snug tracking-tight transition-colors group-hover:text-maroon">
                    {a.title}
                  </h3>
                  <p className="mt-3 border-t border-border pt-3 text-sm leading-relaxed text-muted-foreground">
                    {a.description}
                  </p>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
