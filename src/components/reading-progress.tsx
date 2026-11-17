"use client";

import { useEffect, useState } from "react";

/**
 * Editorial reading-progress line: a 2px maroon rule just below the sticky
 * header that fills as the reader advances. rAF-throttled; purely
 * transform-based, so it never triggers layout or repaint of the page body.
 */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const total = doc.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? Math.min(1, Math.max(0, window.scrollY / total)) : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-16 z-40 h-0.5 w-full lg:top-[4.5rem]"
    >
      <div
        className="h-full origin-left bg-maroon"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
