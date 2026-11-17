import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SectionHeading } from "@/components/section-heading";
import { ReadingProgress } from "@/components/reading-progress";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import {
  ALL_NEWS_QUERY,
  NEWS_BY_SLUG_QUERY,
  NEWS_SLUGS_QUERY,
} from "@/sanity/lib/queries";
import { formatDate } from "@/sanity/lib/format";
import { toJsonLd } from "@/lib/jsonld";

export const revalidate = 60;
const SITE_URL = "https://www.nalandacolleges.lk";
const SITE_NAME = "Nalanda College Colombo";

type NewsDetail = {
  _id: string;
  title: string;
  slug: string;
  tag?: string;
  description?: string;
  thumbnailImage: any;
  images?: any[];
  content: any[];
  publishedAt: string;
};

type NewsNavigationItem = {
  title: string;
  slug: string;
  tag?: string;
};

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(NEWS_SLUGS_QUERY);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const news = await client.fetch<NewsDetail | null>(NEWS_BY_SLUG_QUERY, { slug });

  if (!news) return {};

  return {
    title: news.title,
    description: news.description,
    keywords: [news.title, news.tag, "Nalanda College Colombo news"].filter(
      (keyword): keyword is string => Boolean(keyword),
    ),
    alternates: {
      canonical: `/news/${slug}`,
    },
    openGraph: {
      type: "article",
      url: `${SITE_URL}/news/${slug}`,
      title: news.title,
      description: news.description,
      publishedTime: news.publishedAt,
      section: news.tag,
      siteName: SITE_NAME,
      images: [
        {
          url: urlFor(news.thumbnailImage).width(1200).height(630).fit("crop").url(),
          width: 1200,
          height: 630,
          alt: news.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: news.title,
      description: news.description,
      images: [urlFor(news.thumbnailImage).width(1200).height(630).fit("crop").url()],
    },
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [news, newsList] = await Promise.all([
    client.fetch<NewsDetail | null>(NEWS_BY_SLUG_QUERY, { slug }),
    client.fetch<NewsNavigationItem[]>(ALL_NEWS_QUERY),
  ]);

  if (!news) notFound();

  const currentIndex = newsList.findIndex((item) => item.slug === news.slug);
  const previousNews = currentIndex >= 0 ? newsList[currentIndex + 1] : undefined;
  const nextNews = currentIndex > 0 ? newsList[currentIndex - 1] : undefined;

  // Related stories: same tag first, then the remaining latest items.
  const related = newsList
    .filter((item) => item.slug !== news.slug)
    .sort((a, b) => (a.tag === news.tag ? -1 : 0) - (b.tag === news.tag ? -1 : 0))
    .slice(0, 3);

  const newsUrl = `${SITE_URL}/news/${news.slug}`;
  const thumbnailUrl = urlFor(news.thumbnailImage).width(1200).height(630).fit("crop").url();
  const newsJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: news.title,
    description: news.description,
    image: [thumbnailUrl],
    datePublished: news.publishedAt,
    mainEntityOfPage: newsUrl,
    url: newsUrl,
    author: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "EducationalOrganization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/nc-crest.png`,
      },
    },
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <SiteHeader />
      <ReadingProgress />
      <main>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: toJsonLd(newsJsonLd) }}
        />

        {/* Article header */}
        <header className="relative border-b border-border bg-paper">
          <span
            aria-hidden="true"
            className="absolute bottom-0 left-0 z-10 h-px w-24 bg-maroon"
          />
          <div className="max-w-7xl mx-auto px-6 pt-10 pb-12 md:pt-14 md:pb-16">
            <Link
              href="/news"
              className="group inline-flex items-baseline gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-maroon"
            >
              <span
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:-translate-x-1"
              >
                ←
              </span>
              The Journal
            </Link>
            <div className="mt-8 flex flex-wrap items-baseline gap-x-5 gap-y-2">
              {news.tag && (
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-maroon">
                  {news.tag}
                </span>
              )}
              <time className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                {formatDate(news.publishedAt)}
              </time>
            </div>
            <h1 className="mt-5 max-w-4xl font-display text-[2.4rem] font-semibold leading-[1.08] tracking-[-0.02em] md:text-6xl md:leading-[1.05] text-balance animate-reveal">
              {news.title}
            </h1>
            {news.description && (
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty">
                {news.description}
              </p>
            )}
          </div>
        </header>

        {/* Feature photograph */}
        <div className="border-b border-border bg-secondary/50">
          <div className="max-w-7xl mx-auto px-6 py-10 md:py-14">
            <figure>
              <img
                src={urlFor(news.thumbnailImage).width(1600).height(900).url()}
                alt={news.title}
                width={1600}
                height={900}
                className="w-full aspect-16/9 object-cover"
                fetchPriority="high"
                decoding="async"
              />
            </figure>
          </div>
        </div>

        {/* Article body */}
        <article className="max-w-7xl mx-auto px-6 py-14 md:py-20">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-32 space-y-8">
                <div className="border-t border-border pt-5">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground block mb-2">
                    Published
                  </span>
                  <time className="text-sm font-medium">{formatDate(news.publishedAt)}</time>
                </div>
                {news.tag && (
                  <div className="border-t border-border pt-5">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground block mb-2">
                      Category
                    </span>
                    <span className="text-sm font-medium text-maroon">{news.tag}</span>
                  </div>
                )}
                <div className="hidden lg:block border-t border-border pt-5">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground block mb-2">
                    The Nalanda Journal
                  </span>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    A running record of college life — academics, sport, culture and the
                    everyday.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="article-body max-w-[44rem]">
                <PortableText value={news.content} />
              </div>

              {/* Gallery */}
              {(news.images?.length ?? 0) > 0 && (
                <section className="mt-16 border-t border-border pt-10">
                  <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-maroon">
                    Photographs
                  </h2>
                  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {news.images!.map((img, i) => (
                      <figure
                        key={i}
                        className={news.images!.length % 2 !== 0 && i === 0 ? "sm:col-span-2" : ""}
                      >
                        <img
                          src={urlFor(img).width(1200).height(800).url()}
                          alt={`${news.title} — photograph ${i + 1}`}
                          width={1200}
                          height={800}
                          loading="lazy"
                          decoding="async"
                          className="w-full aspect-3/2 object-cover bg-secondary"
                        />
                        <figcaption className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                          Fig. {String(i + 1).padStart(2, "0")}
                        </figcaption>
                      </figure>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </article>

        {/* Related stories */}
        {related.length > 0 && (
          <section className="border-t border-border bg-paper">
            <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
              <SectionHeading index="↳" title="Related Stories" />
              <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3">
                {related.map((item) => (
                  <article key={item.slug} className="group">
                    <Link href={`/news/${item.slug}`}>
                      <div className="flex items-baseline gap-4">
                        {item.tag && (
                          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-maroon">
                            {item.tag}
                          </span>
                        )}
                      </div>
                      <h3 className="mt-3 font-display text-xl font-semibold leading-snug tracking-tight transition-colors group-hover:text-maroon">
                        {item.title}
                      </h3>
                      <span className="mt-4 inline-block border-b border-border pb-0.5 text-sm font-medium transition-colors group-hover:border-maroon group-hover:text-maroon">
                        Read →
                      </span>
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Prev / next navigation */}
        {(previousNews || nextNews) && (
          <nav
            aria-label="More news"
            className="border-t border-border"
          >
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 sm:divide-x sm:divide-border">
              {previousNews ? (
                <Link
                  href={`/news/${previousNews.slug}`}
                  rel="prev"
                  className="group flex flex-col gap-2 py-10 pr-8"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    <ArrowLeft className="mr-2 inline h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
                    Previous
                  </span>
                  <span className="max-w-sm font-display text-xl font-semibold leading-snug tracking-tight transition-colors group-hover:text-maroon">
                    {previousNews.title}
                  </span>
                </Link>
              ) : (
                <div className="hidden sm:block" />
              )}
              {nextNews && (
                <Link
                  href={`/news/${nextNews.slug}`}
                  rel="next"
                  className="group flex flex-col items-start gap-2 border-t border-border py-10 sm:items-end sm:border-t-0 sm:pl-8 sm:text-right"
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    Next
                    <ArrowRight className="ml-2 inline h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <span className="max-w-sm font-display text-xl font-semibold leading-snug tracking-tight transition-colors group-hover:text-maroon">
                    {nextNews.title}
                  </span>
                </Link>
              )}
            </div>
          </nav>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
