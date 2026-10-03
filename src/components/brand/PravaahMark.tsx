"use client";

import { useEffect, useState } from "react";

/**
 * What is left of the brand mark after the river moved to the hero.
 *
 * The shirorekha — the headline bar above Devanagari letters — is still
 * the flow line of the identity, but it is now drawn at hero scale where
 * it has room to actually split into four. In the navbar the wordmark is
 * just a wordmark: one line, small, out of the way.
 *
 * These are live text and SVG overlays rather than baked glyph outlines,
 * so the mark survives every font change made in the Type Lab.
 */

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(true); // assume reduced until known

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  return reduced;
}

/**
 * Horizontal lockup: the Devanagari mark, then the roman transliteration
 * letterspaced beside it. Stacked vertically the pair needs ~44px of
 * height, which is most of a small navbar; side by side it needs ~22px.
 */
export function Wordmark() {
  return (
    <span className="flex items-baseline gap-2.5">
      <span
        lang="mr"
        className="type-deva letterpress ink-bleed block text-[1.35rem] leading-none text-ink"
      >
        प्रवाह
      </span>
      <span className="type-text text-[0.55rem] uppercase tracking-[0.4em] text-ink-muted">
        Pravaah
      </span>
    </span>
  );
}
