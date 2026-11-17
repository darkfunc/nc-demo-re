"use client";

import { useEffect, useState } from "react";

/**
 * Minimal first-load preloader: centred crest, thin maroon progress line.
 *
 * Behaviour:
 * - Rendered only on the homepage; internal navigation never shows it again.
 * - The exit is a pure CSS animation (`forwards`), so even with JavaScript
 *   disabled the overlay disappears and the page remains usable.
 * - React additionally unmounts it shortly after the CSS exit for a clean DOM.
 * - Reduced-motion users get an effectively instant exit (see styles.css).
 */
export function PagePreloader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timeout = window.setTimeout(() => setVisible(false), reduceMotion ? 100 : 2300);
    return () => window.clearTimeout(timeout);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="home-preloader"
      role="status"
      aria-label="Loading Nalanda College"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "grid",
        placeItems: "center",
        minHeight: "100dvh",
      }}
    >
      <div className="home-preloader__content">
        <img
          src="/nc-crest.png"
          alt=""
          className="home-preloader__crest"
        />
        <span className="home-preloader__progress">
          <i />
        </span>
        <span className="home-preloader__label">Nalanda College · Est. 1925</span>
      </div>
    </div>
  );
}
