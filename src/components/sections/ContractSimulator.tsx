"use client";

import { useState } from "react";
import { DeckleRule } from "@/components/paper/DeckleRule";

interface Scenario {
  id: string;
  name: string;
  request: string;
  contract: {
    venue: string;
    window: string;
    route: string;
    category: string;
    ledgerRemaining: number;
    color: string;
  };
}

const SCENARIOS: Scenario[] = [
  {
    id: "s1",
    name: "Asha & Family (4 People)",
    request: "Where can we find evening meal & quiet seating?",
    contract: {
      venue: "River Ghat Kitchen · Mess 2",
      window: "19:15 – 19:45",
      route: "Corridor B via North Gate",
      category: "Eat · Stay",
      ledgerRemaining: 340,
      color: "var(--pig-turmeric)",
    },
  },
  {
    id: "s2",
    name: "Rohan (Solo Pilgrim)",
    request: "Fastest route to Main Sacred Amphitheatre?",
    contract: {
      venue: "Central Sacred Arena · Gate 4",
      window: "18:50 – 19:20",
      route: "Shuttle Wave 3 -> Pontoon 2",
      category: "Move · Gather",
      ledgerRemaining: 120,
      color: "var(--pig-indigo)",
    },
  },
  {
    id: "s3",
    name: "Meera (Accessible Access)",
    request: "Shaded rest area with ramp access near Ghats?",
    contract: {
      venue: "Shade Hall Canteen · Sector 3",
      window: "19:30 – 20:00",
      route: "Battery Transit Loop A",
      category: "Stay · Eat",
      ledgerRemaining: 85,
      color: "var(--pig-clay)",
    },
  },
];

export function ContractSimulator() {
  const [selectedId, setSelectedId] = useState<string>("s1");
  const [issuedContracts, setIssuedContracts] = useState<Record<string, boolean>>({
    s1: true,
  });

  const currentScenario = SCENARIOS.find((s) => s.id === selectedId) || SCENARIOS[0];
  const isIssued = issuedContracts[currentScenario.id];

  const toggleIssue = (id: string) => {
    setIssuedContracts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="relative w-full py-16 px-5 sm:px-8 max-w-6xl mx-auto">
      <DeckleRule className="mb-12" />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <p className="type-text text-[0.6rem] uppercase tracking-[0.26em] text-ink-muted mb-2">
            03 · Interactive Dispatcher
          </p>
          <h2 className="type-display letterpress ink-bleed text-2xl sm:text-3xl text-ink">
            Issue an Atomic Journey Contract
          </h2>
        </div>
        <p className="type-text text-sm text-ink-soft max-w-md leading-relaxed">
          Select a visitor profile to observe how PRAVAAH calculates a non-conflicting journey contract against live spatial capacity.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Scenario Selectors */}
        <div className="lg:col-span-5 space-y-3">
          <p className="type-text text-[0.58rem] uppercase tracking-[0.2em] text-ink-muted mb-2">
            Incoming Visitor Requests
          </p>

          {SCENARIOS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedId(s.id)}
              className={`w-full text-left p-4 rounded-sm border transition-all ${
                selectedId === s.id
                  ? "border-ink bg-page/90 shadow-sm"
                  : "border-rule/45 bg-page/40 hover:border-rule/80"
              }`}
            >
              <div className="flex justify-between items-baseline mb-1">
                <span className="type-text text-xs font-semibold text-ink">
                  {s.name}
                </span>
                <span className="type-text text-[0.52rem] uppercase tracking-[0.16em] text-ink-muted">
                  {issuedContracts[s.id] ? "Contract Issued" : "Pending"}
                </span>
              </div>
              <p className="type-text text-xs text-ink-soft italic">
                &ldquo;{s.request}&rdquo;
              </p>
            </button>
          ))}
        </div>

        {/* Contract Ticket Display */}
        <div className="lg:col-span-7 rounded-sm border border-rule/65 bg-page/90 p-6 shadow-sm relative">
          <div className="flex items-center justify-between border-b border-rule/45 pb-4 mb-5">
            <div>
              <span
                className="type-text text-[0.55rem] uppercase tracking-[0.24em] font-medium"
                style={{ color: currentScenario.contract.color }}
              >
                Atomic Contract #{currentScenario.id.toUpperCase()}-2026
              </span>
              <h3 className="type-display text-xl text-ink mt-0.5">
                {currentScenario.name}
              </h3>
            </div>

            <button
              onClick={() => toggleIssue(currentScenario.id)}
              className="pv-chip type-text text-[0.62rem] uppercase tracking-[0.2em] px-4 py-2 rounded-sm border border-rule/60 bg-page text-ink font-medium"
            >
              {isIssued ? "Revoke Contract" : "Issue Contract"}
            </button>
          </div>

          {isIssued ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 border border-rule/40 rounded-sm bg-parchment/40">
                  <span className="type-text text-[0.52rem] uppercase tracking-[0.18em] text-ink-muted block mb-1">
                    Assigned Venue & Window
                  </span>
                  <p className="type-display text-base text-ink font-medium">
                    {currentScenario.contract.venue}
                  </p>
                  <p className="type-text text-xs text-ink-soft mt-0.5">
                    {currentScenario.contract.window}
                  </p>
                </div>

                <div className="p-3 border border-rule/40 rounded-sm bg-parchment/40">
                  <span className="type-text text-[0.52rem] uppercase tracking-[0.18em] text-ink-muted block mb-1">
                    Dedicated Transit Corridor
                  </span>
                  <p className="type-display text-base text-ink font-medium">
                    {currentScenario.contract.route}
                  </p>
                  <p className="type-text text-xs text-ink-soft mt-0.5">
                    Category: {currentScenario.contract.category}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-rule/40 text-xs">
                <span className="type-text text-ink-muted">
                  Ledger status: {currentScenario.contract.ledgerRemaining} slots remaining in block
                </span>
                <span className="type-text text-tea font-medium flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-tea inline-block" />
                  Capacity Reserved
                </span>
              </div>
            </div>
          ) : (
            <div className="py-10 text-center text-ink-muted type-text text-xs">
              Contract revoked. Click &ldquo;Issue Contract&rdquo; to recalculate a feasible route slot.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
