import { DeckleRule } from "@/components/paper/DeckleRule";

const PRINCIPLES = [
  {
    num: "01",
    title: "No Broadcast Advice",
    accent: "var(--pig-clay)",
    body: "Telling 100,000 people that Corridor A is empty causes 100,000 people to march to Corridor A. PRAVAAH replaces public advice with individualized, staggered journey contracts.",
  },
  {
    num: "02",
    title: "Atomic Multi-Leg Bundles",
    accent: "var(--pig-indigo)",
    body: "A reservation is not just a destination pin. Each journey contract atomically secures a transit corridor, dining window, and resting slot in a single, non-colliding transaction.",
  },
  {
    num: "03",
    title: "Temporal Horizon Spreading",
    accent: "var(--pig-turmeric)",
    body: "By shifting arrival horizons by as little as 10 to 20 minutes across pilgrim groups, peak density at sacred ghats and bottleneck bridges drops below critical risk levels.",
  },
];

export function MechanismSection() {
  return (
    <section className="relative w-full py-16 px-5 sm:px-8 max-w-6xl mx-auto">
      <DeckleRule className="mb-12" />

      <div className="max-w-2xl mb-12">
        <p className="type-text text-[0.6rem] uppercase tracking-[0.26em] text-ink-muted mb-2">
          02 · Architectural Principles
        </p>
        <h2 className="type-display letterpress ink-bleed text-2xl sm:text-3xl text-ink leading-tight">
          How Atomic Journey Contracts Prevent Mass Congestion
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PRINCIPLES.map((p) => (
          <div
            key={p.num}
            className="rounded-sm border border-rule/50 bg-page/60 p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span
                  className="type-display text-sm font-semibold tracking-wider"
                  style={{ color: p.accent }}
                >
                  {p.num}
                </span>
                <span
                  className="h-1 w-6 rounded-full"
                  style={{ backgroundColor: p.accent, opacity: 0.6 }}
                />
              </div>

              <h3 className="type-display text-lg text-ink mb-3 leading-snug">
                {p.title}
              </h3>
              <p className="type-text text-sm text-ink-soft leading-relaxed">
                {p.body}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-rule/35 flex items-center justify-between text-[0.58rem] uppercase tracking-[0.2em] text-ink-muted">
              <span>Spec · {p.title.split(" ")[0]}</span>
              <span>Verified</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
