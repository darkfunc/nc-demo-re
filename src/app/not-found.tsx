import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6 text-center">
      <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-maroon">
        Error 404
      </span>
      <h1 className="mt-5 font-display text-6xl font-semibold tracking-tight md:text-7xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-3 bg-maroon px-6 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-maroon-foreground transition-colors hover:bg-ink"
        >
          Return Home
          <span aria-hidden="true">→</span>
        </Link>
        <Link
          href="/news"
          className="inline-flex items-center border border-border px-6 py-3.5 font-mono text-[11px] font-bold uppercase tracking-[0.16em] text-foreground transition-colors hover:border-maroon hover:text-maroon"
        >
          The Journal
        </Link>
      </div>
    </div>
  );
}
