import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Our Legacy — Nalanda College Colombo",
  description:
    "The official profile of Nalanda College Colombo — vision, mission and verified background from the college website.",
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
    body: "Nalanda College Colombo was founded in 1925 and remains a Buddhist boys' school in Colombo.",
  },
];

const facts = [
  { label: "Established", value: "1925" },
  { label: "Character", value: "Buddhist boys' school" },
  { label: "City", value: "Colombo" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Our Legacy · Est. 1925"
          title={
            <>
              A century of character,
              <br />
              recorded in <span className="text-maroon">the public record.</span>
            </>
          }
          intro="Verified facts from the college website, including the official vision, mission and public admissions notice."
        />

        {/* Fact strip */}
        <section className="border-b border-border bg-paper">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-3 sm:divide-x sm:divide-border">
            {facts.map((fact) => (
              <div key={fact.label} className="py-8 sm:px-8 first:sm:pl-0">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  {fact.label}
                </span>
                <p className="mt-2 font-display text-2xl font-semibold tracking-tight">
                  {fact.value}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-20 lg:py-24 border-b border-border">
          <SectionHeading
            index="01"
            title="Who We Are"
            meta={<span>Official Profile</span>}
          />
          <div className="divide-y divide-border border-y border-border">
            {profile.map((item) => (
              <article
                key={item.index}
                className="group grid gap-4 py-10 md:grid-cols-[6rem_1fr_2fr] md:items-baseline md:gap-8"
              >
                <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-maroon">
                  {item.index}
                </span>
                <h3 className="font-display text-2xl md:text-3xl font-semibold tracking-tight transition-colors group-hover:text-maroon">
                  {item.heading}
                </h3>
                <p className="text-[16px] leading-relaxed text-muted-foreground text-pretty">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
          <div className="border-t-2 border-maroon bg-paper p-10 md:p-14">
            <h3 className="max-w-3xl font-display text-2xl md:text-3xl font-semibold tracking-tight leading-snug">
              Refer to official notices for current school updates.
            </h3>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/admissions"
                className="inline-flex items-center gap-3 bg-maroon px-6 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-maroon-foreground transition-colors hover:bg-ink"
              >
                Admissions Notice
                <span aria-hidden="true">→</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 border border-border px-6 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-foreground transition-colors hover:border-maroon hover:text-maroon"
              >
                Contact Office
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
