import Image from "next/image";
import promenade from "../../../public/hero/promenade.jpg";
import { RiverFlow } from "./RiverFlow";

/**
 * The artwork, blended into the paper rather than pasted onto it. See
 * `.pv-plate img` in texture.css for how an opaque JPEG becomes a
 * cut-out with no alpha channel.
 *
 * Anchored to the bottom of the hero and allowed to run past the right
 * edge of the screen — the promenade continues off-screen, which is the
 * point of it. Sitting low leaves the upper half of the sheet clear for
 * the watermark to read as a whole word.
 */
export function PromenadePlate() {
  return (
    <div
      className="pv-plate pointer-events-none absolute bottom-0 right-[-6vw] w-[112vw] sm:w-[88vw] lg:w-[68vw]"
      style={{ aspectRatio: "1600 / 879" }}
    >
      <Image
        src={promenade}
        alt="A watercolour promenade: a crowd walking a riverside esplanade, with four coloured dotted trails rising from the pavement to Stay, Move, Eat and Gather pins, each with a live count."
        priority
        sizes="(min-width: 1024px) 68vw, (min-width: 640px) 88vw, 112vw"
        className="h-full w-full object-contain"
      />

      {/* Below `sm` there is no room for a legible fan between the screen
          edge and the artwork, so the river is dropped rather than
          rendered as a stub — the capacity strip under the navbar still
          carries all four pigments on small screens. */}
      <div className="hidden sm:block">
        <RiverFlow idPrefix="hero" />
      </div>
    </div>
  );
}
