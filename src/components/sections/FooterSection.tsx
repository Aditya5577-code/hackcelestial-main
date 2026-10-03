import Link from "next/link";
import { Wordmark } from "@/components/brand/PravaahMark";
import { DeckleRule } from "@/components/paper/DeckleRule";
import { LINKS } from "@/lib/links";

export function FooterSection() {
  return (
    <footer className="relative w-full py-16 px-5 sm:px-8 max-w-6xl mx-auto border-t border-rule/30 mt-12">
      <DeckleRule className="mb-12" />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pb-10 border-b border-rule/35">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <Wordmark />
            <span className="type-text text-[0.56rem] uppercase tracking-[0.24em] text-ink-muted border border-rule/50 px-2 py-0.5 rounded-full">
              Simulated City Engine
            </span>
          </div>
          <p className="type-text text-xs text-ink-muted max-w-md">
            Decentralized capacity ledgers & journey contracts for mega-event hospitality management and crowd safety.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={LINKS.ppt}
            className="pv-chip type-text text-[0.62rem] uppercase tracking-[0.22em] text-ink-soft border border-rule/60 px-4 py-2 rounded-sm"
          >
            Presentation (PPT)
          </a>
          <a
            href={LINKS.video}
            className="pv-chip type-text text-[0.62rem] uppercase tracking-[0.22em] text-ink-soft border border-rule/60 px-4 py-2 rounded-sm"
          >
            Demonstration Video
          </a>
        </div>
      </div>

      <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-ink-muted type-text">
        <p>
          © {new Date().getFullYear()} PRAVAAH · Hospitality Orchestration Project
        </p>
        <p className="text-[0.6rem] uppercase tracking-[0.18em]">
          Coffee & Paper Substrate · Letterpress Display
        </p>
      </div>
    </footer>
  );
}
