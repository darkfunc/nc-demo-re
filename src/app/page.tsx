import type { Metadata } from "next";
import Link from "next/link";
import { PortableText } from "@portabletext/react";

import { SiteFooter } from "@/components/site-footer";
import { PrincipalSection } from "@/components/principal-section";
import { SiteHeader } from "@/components/site-header";
import { PagePreloader } from "@/components/page-preloader";
import { SectionHeading } from "@/components/section-heading";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { HOME_PAGE_QUERY } from "@/sanity/lib/queries";
import { formatDate } from "@/sanity/lib/format";

export const metadata: Metadata = {
  title: "Nalanda College Colombo — Home",
  description: "Official website of Nalanda College Colombo.",
  alternates: {
    canonical: "/",
  },
};

export const revalidate = 60; // re-fetch from Sanity at most once a minute

type NewsItem = {
  _id: string;
  title: string;
  slug: string;
  tag?: string;
  description?: string;
  thumbnailImage: any;
  publishedAt: string;
};

type Announcement = {
  _id: string;
  title: string;
  slug?: string;
  content: any[];
  publishedAt: string;
};

type AdmissionSection = {
  visible: boolean;
  heading: string;
  buttonText: string;
  buttonLink: string;
};

const profile = [
  {
    index: "01",
    heading: "Vision",
    body: "To gift the world great humans who are endowed with virtues and wisdom.",
  },
  {
    index: "02",
    heading: "Mission",
    body: "To reward mother Lanka with noble sons with balanced personality, dedicated to serve the country, nation and religion.",
  },
  {
    index: "03",
    heading: "Foundation",
    body: "Founded in 1925, Nalanda remains a Buddhist boys' school in the heart of Colombo — a century of character before career.",
  },
];

export default async function HomePage() {
  const { news, announcements, admission } = await client.fetch<{
    news: NewsItem[];
    announcements: Announcement[];
    admission: AdmissionSection | null;
  }>(HOME_PAGE_QUERY);

  const [featuredNews, ...secondaryNews] = news;
  const admissionHref = admission?.buttonLink?.trim() || "/admissions";

  return (
    <div className="min-h-screen bg-background text-foreground font-body antialiased">
      <PagePreloader />
      <SiteHeader />

      <main>
        {/* ---- Hero: editorial split, serif display, authentic photograph ---- */}
        <section className="border-b border-border bg-paper">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 lg:gap-16">
            <div className="order-2 py-14 lg:order-1 lg:col-span-5 lg:py-24 animate-reveal">
              <div className="flex items-center gap-4">
                <span className="h-px w-10 origin-left bg-maroon animate-clip" aria-hidden="true" />
                <span className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-maroon">
                  Est. 1925 · Colombo
                </span>
              </div>

              <p className="mt-8 font-mono text-xs tracking-[0.14em] text-muted-foreground">
                අපදාන සෝභිනී පඤ්ඤා
              </p>
              <h1 className="mt-3 font-display text-[2.9rem] font-semibold leading-[1.04] tracking-[-0.02em] text-balance md:text-6xl lg:text-[4.4rem] lg:leading-[1.02]">
                Character
                <br />
                Illumines
                <br />
                <span className="text-maroon">Wisdom.</span>
              </h1>

              <p className="mt-8 max-w-md text-[16.5px] leading-relaxed text-muted-foreground text-pretty">
                Since 1925, Nalanda has stood as the premier seat of Buddhist education,
                forging young men of impeccable character through the synthesis of ancient
                values and contemporary excellence.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-3 bg-maroon px-6 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-maroon-foreground transition-colors hover:bg-ink"
                >
                  Our Legacy
                  <span aria-hidden="true">→</span>
                </Link>
                <a
                  href="https://youtu.be/3ySGmaQaeUY?si=xFCl_8DfBjKsxobJ"
                  target="_blank"
                  rel="noreferrer"
                  className="border-b border-border pb-1 text-sm font-medium text-foreground transition-colors hover:border-maroon hover:text-maroon"
                >
                  Virtual Tour ↗
                </a>
              </div>
            </div>

            <div className="order-1 lg:order-2 lg:col-span-7 lg:border-l lg:border-border animate-fade">
              <figure className="relative h-full">
                <img
                  src="/hero-building.jpg"
                  alt="The Nalanda College main administration block"
                  width={1600}
                  height={1200}
                  className="h-72 w-full object-cover sm:h-96 lg:h-full lg:min-h-[38rem]"
                  fetchPriority="high"
                  decoding="async"
                />
                <figcaption className="absolute bottom-0 left-0 flex w-full items-center justify-between gap-4 border-t border-border bg-paper/95 px-5 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground backdrop-blur-sm">
                  <span>Nalanda Century Building</span>
                  <span className="text-maroon">01</span>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* ---- The College: numbered index instead of icon cards ---- */}
        <section className="max-w-7xl mx-auto px-6 py-20 lg:py-28 border-b border-border">
          <SectionHeading
            index="01"
            title="The College"
            meta={<span>Identity · Heritage · Purpose</span>}
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-px lg:bg-border">
            {profile.map((item) => (
              <article
                key={item.index}
                className="group bg-background p-8 lg:bg-paper lg:p-10"
              >
                <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-maroon">
                  {item.index}
                </span>
                <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight transition-colors group-hover:text-maroon">
                  {item.heading}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground text-pretty">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* ---- Admissions band (CMS-driven) ---- */}
        {admission?.visible && (
          <section className="bg-maroon text-maroon-foreground">
            <div className="max-w-7xl mx-auto px-6 flex flex-col items-start justify-between gap-8 py-16 md:flex-row md:items-center lg:py-20">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-maroon-foreground/70">
                  Admissions
                </span>
                <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold tracking-tight md:text-4xl">
                  {admission.heading}
                </h2>
              </div>
              <Link
                href={admissionHref}
                className="shrink-0 inline-flex items-center gap-3 bg-paper px-7 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-ink transition-colors hover:bg-foreground hover:text-paper"
              >
                {admission.buttonText}
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </section>
        )}

        {/* ---- Announcements: index list, not cards ---- */}
        {announcements.length > 0 && (
          <section className="max-w-7xl mx-auto px-6 py-20 lg:py-24 border-b border-border">
            <SectionHeading
              index="02"
              title="Announcements"
              meta={<span>Institutional Update</span>}
            />
            <ul className="divide-y divide-border border-y border-border">
              {announcements.map((a) => (
                <li key={a._id} className="group grid gap-3 py-8 md:grid-cols-[9rem_1fr] md:gap-10">
                  <time className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground md:pt-1.5">
                    {formatDate(a.publishedAt)}
                  </time>
                  <div className="flex items-start justify-between gap-6">
                    <div className="min-w-0">
                      <h3 className="max-w-3xl text-xl font-semibold leading-snug tracking-tight transition-colors group-hover:text-maroon md:text-[1.35rem]">
                        {a.title}
                      </h3>
                      <div className="mt-3 max-w-3xl text-[15px] leading-relaxed text-muted-foreground [&_p+p]:mt-3">
                        <PortableText value={a.content} />
                      </div>
                    </div>
                    <span
                      aria-hidden="true"
                      className="mt-1.5 shrink-0 font-mono text-xs text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:text-maroon group-hover:opacity-100"
                    >
                      →
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ---- The Journal: editorial featured story + index rows ---- */}
        <section className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
          <SectionHeading
            index="03"
            title="The Journal"
            meta={
              <Link
                href="/news"
                className="group inline-flex items-baseline gap-2 text-[13px] text-foreground transition-colors hover:text-maroon"
              >
                <span className="border-b border-transparent pb-0.5 transition-colors group-hover:border-maroon">
                  Journal Archive
                </span>
                <span aria-hidden="true">→</span>
              </Link>
            }
          />

          {featuredNews && (
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
              <Link
                href={`/news/${featuredNews.slug}`}
                className="group block lg:col-span-7"
              >
                <div className="overflow-hidden">
                  <img
                    src={urlFor(featuredNews.thumbnailImage).width(1200).height(800).url()}
                    alt={featuredNews.title}
                    width={1200}
                    height={800}
                    loading="lazy"
                    decoding="async"
                    className="w-full aspect-3/2 object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                </div>
                <div className="mt-6 flex items-baseline gap-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-maroon">
                    {featuredNews.tag || "Featured"}
                  </span>
                  <time className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {formatDate(featuredNews.publishedAt)}
                  </time>
                </div>
                <h3 className="mt-3 max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tight transition-colors group-hover:text-maroon md:text-4xl">
                  {featuredNews.title}
                </h3>
                <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
                  {featuredNews.description}
                </p>
                <span className="mt-5 inline-block border-b border-maroon pb-0.5 text-sm font-medium text-foreground transition-colors group-hover:text-maroon">
                  Read the full story →
                </span>
              </Link>

              <div className="lg:col-span-5 lg:border-l lg:border-border lg:pl-14">
                <ul className="divide-y divide-border">
                  {secondaryNews.slice(0, 4).map((n, i) => (
                    <li key={n._id}>
                      <Link
                        href={`/news/${n.slug}`}
                        className="group flex items-start gap-5 py-6"
                      >
                        <span className="mt-1 font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
                          {String(i + 2).padStart(2, "0")}
                        </span>
                        <div className="min-w-0 flex-1">
                          {n.tag && (
                            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-maroon">
                              {n.tag}
                            </span>
                          )}
                          <h4 className="mt-1.5 text-[17px] font-semibold leading-snug tracking-tight transition-colors group-hover:text-maroon">
                            {n.title}
                          </h4>
                          <time className="mt-2 block font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                            {formatDate(n.publishedAt)}
                          </time>
                        </div>
                        <span
                          aria-hidden="true"
                          className="mt-1.5 font-mono text-xs text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-maroon"
                        >
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </section>

        <PrincipalSection />
      </main>
      <SiteFooter />
    </div>
  );
}
