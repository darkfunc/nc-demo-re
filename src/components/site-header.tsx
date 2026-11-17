"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Legacy", href: "/about" },
  { label: "News", href: "/news" },
  { label: "Achievements", href: "/achievements" },
  { label: "Co-Curricular", href: "/co-curricular" },
  { label: "Unit Papers", href: "/unit-test-papers" },
  { label: "Contact", href: "/contact" },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Utility strip */}
      <div className="bg-ink text-maroon-foreground/80">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.18em]">
          <a
            href="mailto:info@nalandacollege.lk"
            className="transition-colors hover:text-paper"
          >
            info@nalandacollege.lk
          </a>
          <span className="hidden md:inline opacity-70">
            Colombo · Sri Lanka · Est. 1925
          </span>
        </div>
      </div>

      {/* Masthead */}
      <header
        className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
          scrolled
            ? "bg-paper/95 border-border backdrop-blur-md"
            : "bg-paper border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 lg:h-[4.5rem] flex items-center justify-between gap-8">
          {/* Crest + wordmark */}
          <Link
            href="/"
            className="flex items-center gap-3.5 shrink-0 group"
            aria-label="Nalanda College Colombo — home"
          >
            <img
              src="/nc-crest.png"
              alt=""
              className="h-11 w-11 object-contain"
            />
            <span className="hidden sm:block leading-none">
              <span className="block font-body font-semibold text-[15px] tracking-[0.02em] uppercase text-foreground">
                Nalanda College
              </span>
              <span className="block font-mono text-[9px] uppercase tracking-[0.28em] text-muted-foreground mt-1.5">
                Colombo · Sri Lanka
              </span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={isActive(pathname, l.href) ? "page" : undefined}
                className={`relative py-1 text-[13.5px] font-medium tracking-tight transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-maroon after:transition-transform after:duration-300 hover:text-maroon hover:after:scale-x-100 ${
                  isActive(pathname, l.href)
                    ? "text-maroon after:scale-x-100"
                    : "text-foreground"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/admissions"
              className="ml-2 inline-flex items-center bg-maroon text-maroon-foreground px-5 py-2.5 font-mono text-[11px] font-bold uppercase tracking-[0.16em] transition-colors hover:bg-ink"
            >
              Apply Now
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="lg:hidden inline-flex h-11 w-11 flex-col items-center justify-center gap-[5px] border border-border bg-paper transition-colors hover:border-maroon"
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
          >
            <span className="h-px w-5 bg-foreground" />
            <span className="h-px w-5 bg-foreground" />
            <span className="h-px w-5 bg-foreground" />
          </button>
        </div>
      </header>

      {/* Mobile navigation panel */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[60] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div
            className="absolute inset-0 bg-ink/40 animate-fade"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col bg-paper shadow-2xl animate-fade">
            <div className="flex items-center justify-between border-b border-border px-6 h-16">
              <span className="flex items-center gap-3">
                <img
                  src="/nc-crest.png"
                  alt=""
                  className="h-9 w-9 object-contain"
                />
                <span className="font-body text-sm font-semibold uppercase tracking-[0.02em]">
                  Nalanda College
                </span>
              </span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center border border-border text-xl leading-none transition-colors hover:border-maroon hover:text-maroon"
                aria-label="Close navigation menu"
              >
                ×
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-6 py-4" aria-label="Mobile">
              <ul>
                {[{ label: "Home", href: "/" }, ...navLinks].map((l, i) => (
                  <li key={l.href} className="border-b border-border">
                    <Link
                      href={l.href}
                      onClick={() => setMenuOpen(false)}
                      aria-current={isActive(pathname, l.href) ? "page" : undefined}
                      className="group flex items-baseline gap-4 py-4"
                    >
                      <span className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`flex-1 text-lg tracking-tight transition-colors group-hover:text-maroon ${
                          isActive(pathname, l.href) ? "text-maroon" : "text-foreground"
                        }`}
                      >
                        {l.label}
                      </span>
                      <span
                        aria-hidden="true"
                        className="font-mono text-xs text-muted-foreground transition-transform duration-300 group-hover:translate-x-1"
                      >
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/admissions"
                onClick={() => setMenuOpen(false)}
                className="mt-8 flex items-center justify-center bg-maroon px-5 py-4 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-maroon-foreground transition-colors hover:bg-ink"
              >
                Apply Now
              </Link>
              <p className="mt-6 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                info@nalandacollege.lk
              </p>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
