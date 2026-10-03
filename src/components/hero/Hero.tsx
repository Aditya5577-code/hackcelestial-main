import { JourneyContracts } from "./JourneyContracts";
import { PromenadePlate } from "./PromenadePlate";
import { Watermark } from "./Watermark";

/**
 * Three layers on one sheet: the watermark pressed into the paper, the
 * artwork blended onto it, and the type on top. The section owns the
 * isolation context (`pv-sheet`) so the first two blend with each other
 * and with nothing else, and clips the bleed of both.
 *
 * There is no separate capacity ledger. The artwork carries its own —
 * and under `darken` the white card bodies drop out entirely, leaving
 * the gauges and numbers printed straight onto the paper.
 *
 * The column is left-anchored rather than centred in a max-width box.
 * The artwork is sized in `vw`, so a centred column drifts further from
 * it the wider the screen gets and opens a dead gap on the left; a
 * clamped left inset keeps the two a fixed distance apart instead.
 */
export function Hero() {
  return (
    <section className="pv-sheet relative w-full overflow-hidden">
      <Watermark />
      <PromenadePlate />

      {/* `safe center` rather than plain centring: on a short viewport the
          column is taller than the hero, and ordinary `center` overflows
          equally in both directions — which pushes the eyebrow up behind
          the sticky navbar. `safe` falls back to start-aligned instead. */}
      <div className="relative z-10 flex min-h-[calc(100svh-var(--nav-h))] flex-col [justify-content:safe_center] py-8 pl-[clamp(1.25rem,5.5vw,7rem)] pr-5">
        <div className="max-w-xl lg:max-w-[36rem]">
          <p
            className="pv-rise type-text mb-4 text-[0.64rem] uppercase tracking-[0.28em] text-ink-muted"
            style={{ ["--i" as string]: 0 }}
          >
            Hospitality orchestration · Simulated city
          </p>

          <h1
            className="pv-rise type-display letterpress ink-bleed max-w-[13ch] text-[clamp(2rem,4.2vw,3.15rem)] leading-[1.04] text-ink"
            style={{ ["--i" as string]: 1 }}
          >
            Telling everyone where it&rsquo;s empty creates the next crowd.
          </h1>

          <p
            className="pv-rise type-text mt-4 max-w-md text-[1rem] leading-relaxed text-ink-body"
            style={{ ["--i" as string]: 2 }}
          >
            PRAVAAH keeps a live Stay / Move / Eat / Gather ledger, then issues
            atomic journey contracts so different people receive different
            feasible paths.
          </p>

          <div className="pv-rise mt-7" style={{ ["--i" as string]: 3 }}>
            <JourneyContracts />
          </div>
        </div>
      </div>
    </section>
  );
}
