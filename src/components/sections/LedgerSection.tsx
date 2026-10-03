"use client";

import { useState } from "react";
import { DeckleRule } from "@/components/paper/DeckleRule";

interface CapacityItem {
  id: string;
  name: string;
  category: "Stay" | "Move" | "Eat" | "Gather";
  color: string;
  current: number;
  max: number;
  unit: string;
  status: "Optimal" | "Moderate" | "Reserved";
}

const INITIAL_CAPACITIES: CapacityItem[] = [
  {
    id: "c1",
    name: "North Pontoon Bridge & Corridor B",
    category: "Move",
    color: "var(--pig-indigo)",
    current: 4120,
    max: 6000,
    unit: "pedestrians / hr",
    status: "Optimal",
  },
  {
    id: "c2",
    name: "River Ghat Kitchen & Langar 3",
    category: "Eat",
    color: "var(--pig-turmeric)",
    current: 1850,
    max: 2200,
    unit: "diners / slot",
    status: "Moderate",
  },
  {
    id: "c3",
    name: "Sector 4 Rest Tents & Pilgrim Lodge",
    category: "Stay",
    color: "var(--pig-clay)",
    current: 8400,
    max: 10000,
    unit: "overnight beds",
    status: "Optimal",
  },
  {
    id: "c4",
    name: "Central Sacred Arena & Amphitheatre",
    category: "Gather",
    color: "var(--pig-tea)",
    current: 14200,
    max: 15000,
    unit: "max assembly",
    status: "Reserved",
  },
];

export function LedgerSection() {
  const [capacities] = useState<CapacityItem[]>(INITIAL_CAPACITIES);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Stay", "Move", "Eat", "Gather"];

  const filtered = activeCategory === "All" 
    ? capacities 
    : capacities.filter(c => c.category === activeCategory);

  return (
    <section className="relative w-full py-16 px-5 sm:px-8 max-w-6xl mx-auto">
      <DeckleRule className="mb-12" />

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <p className="type-text text-[0.6rem] uppercase tracking-[0.26em] text-ink-muted mb-2">
            01 · Real-Time Resource Accounting
          </p>
          <h2 className="type-display letterpress ink-bleed text-2xl sm:text-3xl text-ink">
            The Four Live Capacities
          </h2>
        </div>
        <p className="type-text text-sm text-ink-soft max-w-md leading-relaxed">
          Static schedules fail under mega-events. PRAVAAH continuously balances four interconnected spatial ledgers to guarantee physical safety.
        </p>
      </div>

      {/* Category Filter Chips */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`pv-chip type-text text-[0.62rem] uppercase tracking-[0.2em] px-3.5 py-1.5 rounded-sm border transition-all ${
              activeCategory === cat
                ? "border-ink bg-ink text-page font-medium"
                : "border-rule/60 text-ink-soft bg-page/40 hover:border-rule"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Capacity Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => {
          const pct = Math.round((item.current / item.max) * 100);
          return (
            <div
              key={item.id}
              className="pv-contract rounded-sm border border-rule/55 bg-page/80 p-5 relative overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span
                    className="type-text text-[0.54rem] uppercase tracking-[0.22em] font-medium"
                    style={{ color: item.color }}
                  >
                    {item.category} Ledger
                  </span>
                  <span className="type-text text-[0.5rem] uppercase tracking-[0.16em] text-ink-muted border border-rule/45 px-2 py-0.5 rounded-[2px]">
                    {item.status}
                  </span>
                </div>

                <h3 className="type-display text-lg text-ink mb-1">
                  {item.name}
                </h3>
                <p className="type-text text-xs text-ink-muted mb-4">
                  Capacity limit: {item.max.toLocaleString()} {item.unit}
                </p>
              </div>

              <div>
                <div className="flex justify-between items-baseline text-xs mb-1.5">
                  <span className="type-text text-ink-soft">
                    {item.current.toLocaleString()} allocated
                  </span>
                  <span className="type-text text-ink font-medium">
                    {pct}%
                  </span>
                </div>

                {/* Meter Bar */}
                <div className="h-1.5 w-full bg-rule/30 rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-500 rounded-full"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
