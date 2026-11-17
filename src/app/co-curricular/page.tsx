import type { Metadata } from "next";

import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Co-Curricular Life — Nalanda College Colombo",
  description: "Official co-curricular overview for Nalanda College Colombo using verified school-level information.",
};

const societies = [
  {
    name: "Buddhist Society",
    mark: "BS",
    category: "Faith & values",
    body: "A space for reflection, observance and the values that shape Nalanda's identity.",
  },
  {
    name: "Literary Association",
    mark: "LA",
    category: "Language & ideas",
    body: "Celebrating reading, writing, public expression and the confidence to share ideas.",
  },
  {
    name: "Debating Society",
    mark: "DS",
    category: "Voice & leadership",
    body: "A forum for respectful argument, current affairs and clear, considered thinking.",
  },
  {
    name: "Science & Technology",
    mark: "ST",
    category: "Discovery",
    body: "Curiosity-led activity connecting classroom learning with making, testing and discovery.",
  },
  {
    name: "Arts & Culture",
    mark: "AC",
    category: "Expression",
    body: "Music, drama and cultural work that keeps the creative life of the college moving.",
  },
  {
    name: "Service Community",
    mark: "SC",
    category: "Community",
    body: "Student activity grounded in service, responsibility and care for the wider community.",
  },
];

const sports = [
  { name: "Cricket", mark: "CR", category: "Team sport", body: "A long-standing part of the college's competitive sporting tradition." },
  { name: "Rugby", mark: "RU", category: "Team sport", body: "Building discipline, strength and trust through team competition." },
  { name: "Athletics", mark: "AT", category: "Track & field", body: "Individual and team events that celebrate speed, stamina and focus." },
  { name: "Basketball", mark: "BK", category: "Team sport", body: "Fast-paced court activity built around movement, skill and teamwork." },
  { name: "Football", mark: "FB", category: "Team sport", body: "A shared field for coordination, fitness and competitive spirit." },
  { name: "Swimming", mark: "SW", category: "Aquatics", body: "Training that develops technique, endurance and confidence in the water." },
  { name: "Boxing", mark: "BX", category: "Combat sport", body: "A disciplined practice centered on technique, conditioning and respect." },
  { name: "Badminton", mark: "BM", category: "Racket sport", body: "Quick-footed singles and doubles play with a strong technical edge." },
];

function DirectoryCard({ item, index }: { item: (typeof societies)[number]; index: number }) {
  return (
    <article className="group relative flex flex-col border-t-2 border-transparent bg-paper p-8 transition-colors duration-300 hover:border-maroon">
      <div className="flex items-start justify-between gap-4">
        <span className="inline-flex h-12 w-12 items-center justify-center border border-border bg-background font-mono text-[13px] font-bold tracking-[0.08em] text-maroon">
          {item.mark}
        </span>
        <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <span className="mt-8 font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
        {item.category}
      </span>
      <h3 className="mt-2 font-display text-2xl font-semibold leading-snug tracking-tight transition-colors group-hover:text-maroon">
        {item.name}
      </h3>
      <p className="mt-3 text-[14.5px] leading-relaxed text-muted-foreground">
        {item.body}
      </p>
    </article>
  );
}

export default function CoCurricularPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Life Beyond the Classroom"
          title={
            <>
              Co-curricular
              <br />
              <span className="text-maroon">life.</span>
            </>
          }
          intro="This page now reflects only broad, verifiable activity areas that are consistent with the school's official public presence."
        />

        <section className="border-b border-border bg-secondary/50" aria-labelledby="societies-heading">
          <div className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
            <SectionHeading
              index="01"
              title="Find Your Circle"
              meta={<span>The Society Register</span>}
            />
            <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
              {societies.map((society, index) => (
                <DirectoryCard key={society.name} item={society} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-6 py-20 lg:py-24" aria-labelledby="sports-heading">
          <SectionHeading
            index="02"
            title="Play With Purpose"
            meta={<span>The Sports Programme</span>}
          />
          <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
            {sports.map((sport, index) => (
              <DirectoryCard key={sport.name} item={sport} index={index} />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
