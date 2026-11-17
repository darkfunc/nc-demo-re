import type { Metadata } from "next";
import Link from "next/link";

import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Admissions — Nalanda College Colombo",
  description:
    "Official admissions notice page for Nalanda College Colombo, based on the public website and current admissions announcements.",
};

export default function AdmissionsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Admissions · Official Notice"
          title={
            <>
              Current admissions
              <br />
              <span className="text-maroon">information.</span>
            </>
          }
          intro="The public website currently lists the 2028 A/L admissions notice as closed. Please refer to the official website for future notices and updates."
        >
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-3 bg-maroon px-6 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-maroon-foreground transition-colors hover:bg-ink"
            >
              Official Website
              <span aria-hidden="true">→</span>
            </Link>
            <a
              href="mailto:info@nalandacollege.lk"
              className="inline-flex items-center border border-border px-6 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-foreground transition-colors hover:border-maroon hover:text-maroon"
            >
              Email the Office
            </a>
          </div>
        </PageHero>

        <section className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
          <SectionHeading
            index="01"
            title="Notice Status"
            meta={<span>Official Notes</span>}
          />
          <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <p className="text-[16.5px] leading-relaxed text-muted-foreground text-pretty">
                The public website currently confirms the 2028 A/L admissions notice is
                closed. For future admissions updates, use the official website or the
                school email.
              </p>
              <p className="mt-8 border-l-2 border-maroon pl-6 text-sm leading-relaxed text-muted-foreground">
                No unpublished application dates or fee tables are shown here.
              </p>
            </div>

            <div className="mt-14 lg:col-span-6 lg:mt-0">
              <h3 className="font-display text-xl font-semibold tracking-tight">
                Official school email
              </h3>
              <dl className="mt-5 divide-y divide-border border-y border-border">
                <div className="flex flex-col gap-1 py-5 sm:flex-row sm:items-center sm:justify-between">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    General
                  </dt>
                  <dd>
                    <a
                      href="mailto:info@nalandacollege.lk"
                      className="font-mono text-sm text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-maroon hover:decoration-maroon"
                    >
                      info@nalandacollege.lk
                    </a>
                  </dd>
                </div>
                <div className="flex flex-col gap-1 py-5 sm:flex-row sm:items-center sm:justify-between">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    2028 A/L admissions notice
                  </dt>
                  <dd className="font-mono text-sm font-bold uppercase tracking-[0.14em] text-maroon">
                    Closed
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
