/**
 * A torn-paper section divider. Uses the shared #pv-deckle filter
 * defined once in the root layout, so this stays a server component
 * with no client JS and no filter-id collisions between instances.
 */
export function DeckleRule({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none w-full text-rule ${className}`}
    >
      <svg
        viewBox="0 0 1200 14"
        preserveAspectRatio="none"
        className="h-3.5 w-full"
      >
        <rect
          x="0"
          y="6"
          width="1200"
          height="1.5"
          fill="currentColor"
          filter="url(#pv-deckle)"
        />
      </svg>
    </div>
  );
}
