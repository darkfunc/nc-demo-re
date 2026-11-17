import type { Metadata } from "next";

import { PageHero } from "@/components/page-hero";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ContactForm } from "@/components/contact-form";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Contact — Nalanda College Colombo",
  description: "Official contact information for Nalanda College Colombo based on the public website.",
};

const links = [
  { label: "Facebook", href: "https://web.facebook.com/NalandaCollegeColombo/" },
  { label: "YouTube", href: "https://www.youtube.com/channel/UCCOaxljN65_1vKFuJpmHCsw" },
  {
    label: "E-Newspaper",
    href: "https://drive.google.com/file/d/1_ihO6YaPWpLJ61hZu3lWUJ03h-OY-W4O/view?usp=sharing",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-body">
      <SiteHeader />
      <main>
        <PageHero
          eyebrow="Get in Touch"
          title={
            <>
              Reach the
              <br />
              official <span className="text-maroon">office.</span>
            </>
          }
          intro="The official public channel currently exposed by the school website is the school email address."
        />

        <section className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
          <SectionHeading
            index="01"
            title="Write to the College"
            meta={<span>Official Channels</span>}
          />

          <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
            {/* Official channels */}
            <div className="lg:col-span-5">
              <div className="border-t-2 border-maroon bg-paper p-8 md:p-10">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Official Channel
                </span>
                <a
                  href="mailto:info@nalandacollege.lk"
                  className="mt-4 block font-display text-3xl font-semibold tracking-tight text-foreground transition-colors hover:text-maroon"
                >
                  info@nalandacollege.lk
                </a>
                <p className="mt-5 border-t border-border pt-5 text-[15px] leading-relaxed text-muted-foreground">
                  This email appears on the official school website. No additional phone or
                  office-hour details are listed here unless they are published officially.
                </p>
              </div>

              <div className="mt-10">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Official Links
                </span>
                <ul className="mt-4 divide-y divide-border border-y border-border">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="group flex items-baseline justify-between py-4 text-[15px] font-medium transition-colors hover:text-maroon"
                      >
                        {link.label}
                        <span
                          aria-hidden="true"
                          className="font-mono text-xs text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-maroon"
                        >
                          ↗
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Enquiry form */}
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
