/**
 * The thesis, stated as a before and after.
 *
 * Three people ask the same question at the same moment. A system that
 * answers it identically for all three *is* the crowd it was asked to
 * prevent. So the row above is the question, the row below is what
 * PRAVAAH actually returns: three different venues, three different
 * windows, three different ways of getting there — each one a contract
 * against capacity that has already been decremented.
 */

const QUESTION = "Where should I eat?";

const CONTRACTS = [
  {
    who: "Asha",
    venue: "River Ghat Kitchen",
    window: "19:10 – 19:40",
    route: "Walk corridor B",
  },
  {
    who: "Omar",
    venue: "Outer-ring Mess 4",
    window: "19:20 – 19:50",
    route: "Shuttle wave 3",
  },
  {
    who: "Meera",
    venue: "Shade Hall Canteen",
    window: "19:35 – 20:05",
    route: "Accessible route",
  },
];

export function JourneyContracts() {
  return (
    <div>
      <ul className="flex flex-wrap gap-2.5">
        {CONTRACTS.map((c) => (
          <li
            key={c.who}
            className="rounded-full border border-rule/60 bg-page/55 px-3.5 py-1.5"
          >
            <span className="type-text text-[0.72rem] text-ink">{c.who}</span>
            <span className="type-text text-[0.72rem] text-ink-muted">
              {" · "}
              {QUESTION}
            </span>
          </li>
        ))}
      </ul>

      <p className="type-text mt-4 flex items-center gap-3 text-[0.58rem] uppercase tracking-[0.24em] text-ink-muted">
        <span aria-hidden="true" className="h-px w-8 bg-rule/70" />
        Three feasible answers
      </p>

      <ul className="mt-3 grid gap-3 sm:grid-cols-3">
        {CONTRACTS.map((c) => (
          <li
            key={c.who}
            className="pv-contract rounded-sm border border-rule/55 bg-page/80 p-3"
          >
            <div className="flex items-baseline justify-between gap-2">
              <span className="type-text text-[0.5rem] uppercase tracking-[0.2em] text-turmeric">
                Journey contract
              </span>
              <span className="type-text rounded-[2px] border border-rule/60 px-1.5 py-0.5 text-[0.46rem] uppercase tracking-[0.18em] text-ink-muted">
                Held
              </span>
            </div>

            <p className="type-display mt-2 text-[0.95rem] leading-tight text-ink">
              {c.venue}
            </p>
            <p className="type-text mt-1 text-[0.66rem] text-ink-muted">
              {c.window}
            </p>

            <p className="type-text mt-2.5 border-t border-rule/45 pt-2 text-[0.66rem] text-ink-soft">
              Eat · {c.who}
            </p>
            <p className="type-text text-[0.66rem] text-ink-muted">
              + {c.route}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
