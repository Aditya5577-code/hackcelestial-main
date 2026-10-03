"use client";

import { useEffect, useState } from "react";

/**
 * A hairline under the navbar in four pigment segments — the Stay / Move /
 * Eat / Gather ledger, kept visible on every screen.
 *
 * At rest each segment breathes on its own slow cycle. The durations are
 * deliberately in non-integer ratios so the four never drift into sync and
 * start pulsing as one bar. On scroll the strip doubles as a progress
 * indicator, brightening left to right.
 */

const SEGMENTS = [
  { id: "stay", label: "Stay", color: "var(--pig-clay)", dur: "7.3s", delay: "0s" },
  { id: "move", label: "Move", color: "var(--pig-indigo)", dur: "9.1s", delay: "-2.1s" },
  { id: "eat", label: "Eat", color: "var(--pig-turmeric)", dur: "11.7s", delay: "-4.6s" },
  { id: "gather", label: "Gather", color: "var(--pig-tea)", dur: "8.3s", delay: "-6.2s" },
];

export function CapacityStrip() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const bars = (bright: boolean) =>
    SEGMENTS.map((s) => (
      <span
        key={s.id}
        title={s.label}
        className={bright ? "h-full flex-1" : "pv-seg h-full flex-1"}
        style={{
          background: s.color,
          opacity: bright ? 1 : undefined,
          ["--dur" as string]: s.dur,
          ["--delay" as string]: s.delay,
        }}
      />
    ));

  return (
    <div
      aria-hidden="true"
      className="relative h-[2px] w-full overflow-hidden bg-rule/25"
    >
      <div className="absolute inset-0 flex gap-px opacity-45">{bars(false)}</div>
      <div
        className="absolute inset-0 flex gap-px transition-[clip-path] duration-150 ease-out"
        style={{ clipPath: `inset(0 ${100 - progress}% 0 0)` }}
      >
        {bars(true)}
      </div>
    </div>
  );
}
