import Link from "next/link";

const columns = [
  {
    heading: "Explore",
    links: [
      { label: "News", href: "/news" },
      { label: "Unit Test Papers", href: "/unit-test-papers" },
      { label: "Achievements", href: "/achievements" },
      { label: "Co-Curricular", href: "/co-curricular" },
      { label: "Admissions", href: "/admissions" },
      { label: "Our Legacy", href: "/about" },
    ],
  },
  {
    heading: "Community",
    links: [
      { label: "Old Nalandians' Sports Club", href: "https://www.onsc.lk/" },
      { label: "Nalanda Junior OBA", href: "https://www.njoba.lk/" },
      { label: "Official News", href: "https://nalandacollege.lk/news/" },
    ],
  },
  {
    heading: "Resources",
    links: [
      {
        label: "E-Magazine",
        href: "https://drive.google.com/file/d/1_ihO6YaPWpLJ61hZu3lWUJ03h-OY-W4O/view?usp=sharing",
      },
      { label: "Contact Office", href: "/contact" },
    ],
  },
];

function FooterLink({ label, href }: { label: string; href: string }) {
  const external = href.startsWith("http");
  const className =
    "inline-block py-1 text-[13.5px] text-paper/65 transition-colors hover:text-paper";
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {label}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-ink text-paper">
      <div className="max-w-7xl mx-auto px-6">
        {/* Upper masthead row */}
        <div className="grid grid-cols-1 gap-12 border-b border-paper/10 py-16 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-4">
              <img
                src="/nc-crest.png"
                alt=""
                className="h-14 w-14 object-contain"
              />
              <div className="leading-none">
                <span className="block font-display text-2xl font-semibold tracking-tight">
                  Nalanda College
                </span>
                <span className="mt-2 block font-mono text-[9px] uppercase tracking-[0.28em] text-paper/50">
                  Colombo · Sri Lanka · Est. 1925
                </span>
              </div>
            </div>
            <p className="mt-7 max-w-md text-[15px] leading-relaxed text-paper/60">
              To gift the world great humans who are endowed with virtues and wisdom. To
              reward mother Lanka with noble sons with balanced personality, dedicated to
              serve the country, nation and religion.
            </p>
            <a
              href="mailto:info@nalandacollege.lk"
              className="mt-7 inline-block border-b border-maroon pb-1 font-mono text-[11px] uppercase tracking-[0.2em] text-paper/80 transition-colors hover:text-paper"
            >
              info@nalandacollege.lk
            </a>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 gap-10 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.heading}>
                <h3 className="mb-5 border-b border-paper/15 pb-3 font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-paper/50">
                  {column.heading}
                </h3>
                <ul className="space-y-1.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <FooterLink {...link} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-start justify-between gap-3 py-8 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/40 sm:flex-row sm:items-center">
          <span>© 2026 Nalanda College Colombo. All rights reserved.</span>
          <span className="flex items-center gap-3">
            <span className="h-px w-6 bg-maroon" aria-hidden="true" />
            අපදාන සෝභිනී පඤ්ඤා
          </span>
        </div>
      </div>
    </footer>
  );
}
