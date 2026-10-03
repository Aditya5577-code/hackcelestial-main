"use client";

import { usePrefersReducedMotion } from "@/components/brand/PravaahMark";

/**
 * The river, moved out of the navbar and given room to actually mean
 * something. One neutral hairline enters from off-screen left, runs
 * beneath the headline, and forks into four pigment threads — Stay,
 * Move, Eat, Gather — each rising to meet the *painted* dotted trail
 * of the same colour in the artwork. The illustration then carries the
 * thread the rest of the way to its pin.
 *
 * Alignment is structural, not tuned per breakpoint. The svg is a
 * sibling of the <img> in the same box, and its viewBox is the image's
 * intrinsic 1600x879 extended 2400 units to the left:
 *
 *   viewBox  -2400 0 4000 879      left:-150%  width:250%  height:100%
 *
 * 2400/1600 = 150% and 4000/1600 = 250%, so the aspect ratio of the
 * element matches the viewBox exactly and user units map 1:1 onto image
 * pixels at every viewport width. Coordinates below are therefore just
 * positions on the artwork, and the extension to the left is what
 * reaches out across the text column to the edge of the screen.
 */

const VIEW = { x: -2400, y: 0, w: 4000, h: 879 };

/** Where the trunk arrives and the fan begins, in artwork pixels. */
const FORK = [-160, 800] as const;

/**
 * The trunk is a shallow diagonal rather than a horizontal, and it
 * starts at the very bottom-left of the extended viewBox. That is the
 * one corridor across the text column that nothing else occupies: it
 * passes roughly 40px below the call to action at every width, instead
 * of trying to thread a horizontal line between the paragraph and the
 * chips.
 */
const TRUNK_START = [VIEW.x, 879] as const;

type Thread = {
  id: string;
  color: string;
  /** Cubic control points and the endpoint, in artwork pixels. */
  c1: [number, number];
  c2: [number, number];
  end: [number, number];
  /** Seconds. Deliberately non-integer ratios so the dots never sync. */
  dur: number;
  delay: number;
};

/**
 * Endpoints are the bottom tails of the four painted trails, read off
 * the artwork. They land inside the plate's bottom feather, so the
 * vector thread and the painted one cross-fade into each other instead
 * of butting up against a seam.
 */
const THREADS: Thread[] = [
  {
    id: "clay",
    color: "var(--pig-clay)",
    c1: [40, 800],
    c2: [376, 748],
    end: [372, 650],
    dur: 7.3,
    delay: 0,
  },
  {
    id: "indigo",
    color: "var(--pig-indigo)",
    c1: [150, 800],
    c2: [600, 742],
    end: [574, 646],
    dur: 9.1,
    delay: 0.9,
  },
  {
    id: "turmeric",
    color: "var(--pig-turmeric)",
    c1: [310, 800],
    c2: [952, 736],
    end: [938, 644],
    dur: 11.7,
    delay: 1.9,
  },
  {
    id: "tea",
    color: "var(--pig-tea)",
    c1: [430, 798],
    c2: [1150, 730],
    end: [1092, 642],
    dur: 8.9,
    delay: 2.9,
  },
];

const TRUNK_D = `M ${TRUNK_START[0]},${TRUNK_START[1]} L ${FORK[0]},${FORK[1]}`;

const fan = (t: Thread) =>
  `C ${t.c1[0]},${t.c1[1]} ${t.c2[0]},${t.c2[1]} ${t.end[0]},${t.end[1]}`;

/** Drawn: the fan only. The trunk is stroked once, in neutral ink. */
const strokeD = (t: Thread) => `M ${FORK[0]},${FORK[1]} ${fan(t)}`;

/** Travelled: trunk *and* fan, so a dot rides in before it picks a side. */
const motionD = (t: Thread) => `${TRUNK_D} ${fan(t)}`;

export function RiverFlow({ idPrefix = "river" }: { idPrefix?: string }) {
  const reduced = usePrefersReducedMotion();

  /* Reveal is a clip wipe rather than a stroke-dash animation: in CSS
     `stroke-dasharray: 1` parses as a *length* (1px), so pathLength
     normalisation never applies and the threads render half-drawn. The
     clip rect scales from `transform-origin: 0 0` which, under
     `transform-box: view-box`, is the viewBox's own left edge — i.e.
     off-screen left, so the wipe travels downstream. */
  const wipe = (key: string, i: number) => (
    <clipPath
      key={key}
      id={`${idPrefix}-reveal-${key}`}
      clipPathUnits="userSpaceOnUse"
    >
      <rect
        x={VIEW.x}
        y={VIEW.y}
        width={VIEW.w}
        height={VIEW.h}
        className="pv-river-reveal"
        style={{ ["--i" as string]: i }}
      />
    </clipPath>
  );

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={`${VIEW.x} ${VIEW.y} ${VIEW.w} ${VIEW.h}`}
      className="pointer-events-none absolute inset-y-0 left-[-150%] w-[250%]"
    >
      <defs>
        {/* Each thread is stroked with a gradient along its own chord so
            it emerges from the neutral trunk rather than starting at a
            hard tee, and arrives on the painted trail at full weight. */}
        {THREADS.map((t) => (
          <linearGradient
            key={t.id}
            id={`${idPrefix}-fade-${t.id}`}
            gradientUnits="userSpaceOnUse"
            x1={FORK[0]}
            y1={FORK[1]}
            x2={t.end[0]}
            y2={t.end[1]}
          >
            <stop offset="0" stopColor={t.color} stopOpacity={0} />
            <stop offset="0.42" stopColor={t.color} stopOpacity={0} />
            <stop offset="0.62" stopColor={t.color} stopOpacity={0.78} />
            <stop offset="1" stopColor={t.color} stopOpacity={0.78} />
          </linearGradient>
        ))}

        {/* Motion paths are never stroked — they exist so the dots can
            ride the trunk before the fan, which the drawn paths omit. */}
        {THREADS.map((t) => (
          <path key={t.id} id={`${idPrefix}-motion-${t.id}`} d={motionD(t)} />
        ))}
        {wipe("trunk", 0)}
        {THREADS.map((t, i) => wipe(t.id, i + 1))}
      </defs>

      <path
        d={TRUNK_D}
        fill="none"
        stroke="var(--ink-muted)"
        strokeOpacity={0.5}
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
        clipPath={`url(#${idPrefix}-reveal-trunk)`}
      />

      {THREADS.map((t) => (
        <path
          key={t.id}
          d={strokeD(t)}
          fill="none"
          stroke={`url(#${idPrefix}-fade-${t.id})`}
          strokeWidth={1.4}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          clipPath={`url(#${idPrefix}-reveal-${t.id})`}
        />
      ))}

      {/* SMIL cannot be paused from a media query, so the dots are not
          rendered at all when motion is unwelcome. */}
      {!reduced &&
        THREADS.map((t) => (
          <circle
            key={t.id}
            r={5}
            fill={t.color}
            className="pv-river-dot"
            style={{
              ["--dur" as string]: `${t.dur}s`,
              ["--delay" as string]: `${t.delay}s`,
            }}
          >
            <animateMotion
              dur={`${t.dur}s`}
              begin={`${t.delay}s`}
              repeatCount="indefinite"
            >
              <mpath href={`#${idPrefix}-motion-${t.id}`} />
            </animateMotion>
          </circle>
        ))}
    </svg>
  );
}
