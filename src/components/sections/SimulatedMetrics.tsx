import { DeckleRule } from "@/components/paper/DeckleRule";

const METRICS = [
  {
    value: "1.2M",
    label: "Simulated Daily Agents",
    detail: "Modeled pilgrim & attendee flows across high-density simulated mega-events.",
  },
  {
    value: "-84%",
    label: "Peak Queue Reduction",
    detail: "Eliminated catastrophic bottleneck accumulation at narrow ghat bridges.",
  },
  {
    value: "14 ms",
    label: "Contract Latency",
    detail: "Sub-second multi-leg journey assignment generated at edge nodes.",
  },
  {
    value: "100%",
    label: "Safety Floor Compliance",
    detail: "Zero spatial cells exceed safe crowding limits (>3 persons / m²).",
  },
];

const SPECS = [
  { label: "Spatial Grid", val: "5m² cell resolution" },
  { label: "Temporal Horizon", val: "15-minute sliding windows" },
  { label: "Resilience", val: "Offline QR fallback for non-smartphone users" },
  { label: "Orchestration Layer", val: "Decentralized state ledger" },
];

export function SimulatedMetrics() {
  return (
    <section className="relative w-full py-16 px-5 sm:px-8 max-w-6xl mx-auto">
      <DeckleRule className="mb-12" />

      <div className="max-w-xl mb-12">
        <p className="type-text text-[0.6rem] uppercase tracking-[0.26em] text-ink-muted mb-2">
          04 · Simulation Benchmark
        </p>
        <h2 className="type-display letterpress ink-bleed text-2xl sm:text-3xl text-ink">
          Simulated Mega-Event Metrics
        </h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {METRICS.map((m) => (
          <div
            key={m.label}
            className="rounded-sm border border-rule/55 bg-page/70 p-5 flex flex-col justify-between"
          >
            <div>
              <p className="type-display text-3xl sm:text-4xl text-ink font-semibold mb-1">
                {m.value}
              </p>
              <p className="type-text text-xs uppercase tracking-[0.18em] text-ink font-medium mb-2">
                {m.label}
              </p>
            </div>
            <p className="type-text text-xs text-ink-muted leading-relaxed">
              {m.detail}
            </p>
          </div>
        ))}
      </div>

      {/* System Technical Specifications Strip */}
      <div className="rounded-sm border border-rule/50 bg-parchment/40 p-5">
        <p className="type-text text-[0.58rem] uppercase tracking-[0.24em] text-ink-muted mb-4 border-b border-rule/35 pb-2">
          Technical Specifications
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SPECS.map((s) => (
            <div key={s.label}>
              <span className="type-text text-[0.55rem] uppercase tracking-[0.16em] text-ink-muted block">
                {s.label}
              </span>
              <span className="type-text text-xs text-ink font-medium">
                {s.val}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
