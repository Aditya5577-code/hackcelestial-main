import Link from "next/link";
import { Wordmark } from "@/components/brand/PravaahMark";
import { CapacityStrip } from "./CapacityStrip";
import { LINKS } from "@/lib/links";

const NAV = [
  { href: "#selected-work", label: "Selected Work" },
  { href: LINKS.ppt, label: "PPT" },
  { href: LINKS.video, label: "Video" },
];


/**
 * A quiet strip, but not an empty one. It used to carry the river and a
 * theme toggle and grow and shrink on scroll; all of that moved out or
 * was cut, which leaves nothing here that needs state — so this is a
 * server component now. The capacity strip underneath is the only live
 * part, and it owns its own scroll listener.
 *
 * Three grey words in a row read as unfinished, so the bar gets one
 * accent and two solid shapes: a running-status pill on the left of the
 * nav, and the deliverable links as hairline chips rather than bare
 * text. The status pill is hidden below `sm`, where the two chips and
 * the wordmark already fill the width.
 */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-rule/40 bg-page/95 backdrop-blur-[10px] supports-[backdrop-filter]:bg-page/75">
      <div className="mx-auto flex h-[var(--nav-h)] max-w-6xl items-center justify-between gap-4 px-5">
        <Link href="/" className="shrink-0 rounded-sm" aria-label="Pravaah — home">
          <Wordmark />
        </Link>

        <nav className="flex shrink-0 items-center gap-2.5 sm:gap-3.5">
          <span className="mr-1.5 hidden items-center gap-2 rounded-full border border-rule/50 py-1 pl-2.5 pr-3 sm:inline-flex">
            <span
              aria-hidden="true"
              className="pv-live block size-1.5 rounded-full bg-tea"
            />
            <span className="type-text text-[0.58rem] uppercase tracking-[0.22em] text-ink-muted">
              Simulated
            </span>
          </span>

          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              title={item.href === "#" ? "Link coming soon" : undefined}
              className="pv-chip type-text rounded-sm border border-rule/60 px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.22em] text-ink-soft"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <CapacityStrip />
    </header>
  );
}
