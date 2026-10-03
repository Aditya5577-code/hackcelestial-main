/**
 * प्रवाह at architectural scale, cropped by the right edge of the screen.
 *
 * It is the only Devanagari on the page besides the navbar wordmark, and
 * it is set in ink at ~5% — low enough to read as an impression pressed
 * into the sheet rather than as text. It sits *inside* the isolated
 * blend context so the artwork's `darken` picks it up: where the two
 * overlap, the watermark shows faintly through the painting's pale
 * areas, which is what stitches the two together.
 */
export function Watermark() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <span
        lang="mr"
        className="type-deva absolute select-none leading-[0.72] text-ink"
        style={{
          top: "8%",
          right: "-0.22em",
          fontSize: "clamp(9rem, 27vw, 30rem)",
          opacity: 0.075,
        }}
      >
        प्रवाह
      </span>
    </div>
  );
}
