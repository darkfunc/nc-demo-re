import type { Metadata } from "next";

import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SectionHeading } from "@/components/section-heading";
import { formatDate } from "@/sanity/lib/format";

export const metadata: Metadata = {
  title: "Achievements — Nalanda College Colombo",
  description:
    "Verified achievement overview for Nalanda College Colombo, with public highlights kept separate from news and announcements.",
};

const featuredAchievement = {
  title: "Recognised as Sri Lanka's First Carbon Footprint Neutral School",
  date: "2026-06-05",
  badge: "Environment & Sustainability",
  summary:
    "Nalanda College Colombo was officially recognised as Sri Lanka's first Carbon Footprint Neutral School on World Environment Day 2026.",
  details: [
    "The certification was presented to Principal Mr. Iran Champika Silva by the Hon. Minister of Environment, Dr. Dammika Patabendi, at the Ministry of Environment on 5 June 2026, coinciding with World Environment Day 2026.",
    "The ceremony was attended by the Hon. Deputy Minister of Environment, Mr. Anton Jayakody, Ms. Padma Abeykoon of the Ministry of Environment, and Ms. Harshini Aberathna, Chief Executive Officer of the Sri Lanka Climate Fund.",
    "Representing Nalanda College were Deputy Principals Mrs. Anupa Weeraratne and Mr. Charitha Rupasinghe, Assistant Principal Mrs. Deepthi Kulatunga, members of the academic staff and students of the Environment Society.",
    "This recognition, awarded during National Environment Week 2026, reflects the College's commitment to environmental sustainability and aligns with the themes 'Mitigating the Impact of Climate Change and Air Pollution' and 'Fostering Environmental Consciousness from School Days.'",
  ],
};

const areas = [
  {
    title: "Academics",
    body: "Academic progress is highlighted through news, notices and examination-related updates.",
  },
  {
    title: "Sports",
    body: "Sporting activity is covered through public news items and school announcements.",
  },
  {
    title: "Culture",
    body: "Arts and cultural events are shared as official school news rather than fixed claims here.",
  },
];

export default function AchievementsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Records & Honours"
          title={
            <>
              Public highlights,
              <br />
              <span className="text-maroon">verified only.</span>
            </>
          }
          intro="This page highlights verified milestones only. For the latest achievements, use the school's official news feed and public notices."
        />

        {/* Featured milestone */}
        <section className="border-b border-border bg-paper">
          <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
            <article className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-maroon">
                    {featuredAchievement.badge}
                  </span>
                  <time className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                    {formatDate(featuredAchievement.date)}
                  </time>
                </div>

                <h2 className="mt-5 font-display text-3xl md:text-[2.75rem] font-semibold leading-[1.12] tracking-[-0.02em] max-w-2xl">
                  {featuredAchievement.title}
                </h2>

                <p className="mt-7 max-w-2xl border-l-2 border-maroon pl-6 text-lg leading-relaxed text-foreground">
                  {featuredAchievement.summary}
                </p>

                <div className="article-body mt-8 max-w-2xl">
                  {featuredAchievement.details.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <aside className="lg:col-span-5">
                <figure>
                  <div className="relative">
                    <div
                      aria-hidden="true"
                      className="absolute -left-3 -top-3 h-full w-full border border-maroon/40"
                    />
                    <img
                      src="/achievement_carbonft.jpg"
                      alt="Nalanda College receiving recognition as Sri Lanka's first Carbon Footprint Neutral School"
                      className="relative w-full aspect-4/3 object-cover bg-secondary"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <figcaption className="mt-4 border-t border-border pt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    Ministry of Environment · 5 June 2026
                  </figcaption>
                </figure>

                <div className="mt-10 border-t-2 border-maroon pt-6">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground block mb-3">
                    Milestone
                  </span>
                  <h3 className="font-display text-2xl font-semibold tracking-tight leading-snug">
                    Sustainability at the center of the school story.
                  </h3>
                  <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
                    <p>
                      The recognition reflects Nalanda College's commitment to environmental
                      responsibility and sustainable practice.
                    </p>
                    <p>
                      It also acknowledges the collective effort of the school community and
                      partners who supported the certification process.
                    </p>
                    <p>
                      More achievements can be added here later as smaller entries without
                      changing the overall layout.
                    </p>
                  </div>
                </div>
              </aside>
            </article>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
          <SectionHeading
            index="01"
            title="Where Achievements Live"
            meta={<span>Records & Honours</span>}
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-px lg:bg-border">
            {areas.map((item, i) => (
              <article key={item.title} className="group bg-paper p-8 lg:p-10">
                <span className="font-mono text-[11px] font-bold tracking-[0.2em] text-maroon">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight transition-colors group-hover:text-maroon">
                  {item.title}
                </h3>
                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground text-pretty">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
