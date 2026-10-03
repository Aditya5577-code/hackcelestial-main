import {
  Anek_Devanagari,
  Baloo_2,
  Bricolage_Grotesque,
  Fraunces,
  Instrument_Serif,
  Kalam,
  Literata,
  Martel,
  Mukta,
  Newsreader,
  Noto_Serif_Devanagari,
  Rozha_One,
  Source_Serif_4,
  Spectral,
  Tiro_Devanagari_Hindi,
  Tiro_Devanagari_Marathi,
  Yatra_One,
} from "next/font/google";

/* ============================================================
   Every candidate is self-hosted at build time. Only the three
   families of the default "Kagaz" pairing preload; the rest are
   preload:false, so the Type Lab costs nothing at first paint —
   their files are fetched only once a rule actually uses them.

   Axis ranges below come from next's own font-data.json, not from
   memory. `wght` is never listed: next includes it by default on
   variable fonts, and passing it explicitly is rejected.
   ============================================================ */

// ── Latin ──────────────────────────────────────────────────────
const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
  variable: "--f-fraunces",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  preload: false,
  variable: "--f-instrument",
});

const newsreader = Newsreader({
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
  variable: "--f-newsreader",
});

const literata = Literata({
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
  preload: false,
  variable: "--f-literata",
});

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
  preload: false,
  variable: "--f-spectral",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
  preload: false,
  variable: "--f-source-serif",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["wdth", "opsz"],
  display: "swap",
  preload: false,
  variable: "--f-bricolage",
});

// ── Devanagari ─────────────────────────────────────────────────
const tiroMarathi = Tiro_Devanagari_Marathi({
  subsets: ["devanagari", "latin"],
  weight: "400",
  display: "swap",
  variable: "--f-tiro-marathi",
});

const tiroHindi = Tiro_Devanagari_Hindi({
  subsets: ["devanagari", "latin"],
  weight: "400",
  display: "swap",
  preload: false,
  variable: "--f-tiro-hindi",
});

const anek = Anek_Devanagari({
  subsets: ["devanagari", "latin"],
  axes: ["wdth"],
  display: "swap",
  preload: false,
  variable: "--f-anek",
});

const rozha = Rozha_One({
  subsets: ["devanagari", "latin"],
  weight: "400",
  display: "swap",
  preload: false,
  variable: "--f-rozha",
});

const notoSerifDeva = Noto_Serif_Devanagari({
  subsets: ["devanagari", "latin"],
  axes: ["wdth"],
  display: "swap",
  preload: false,
  variable: "--f-noto-serif-deva",
});

const mukta = Mukta({
  subsets: ["devanagari", "latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
  preload: false,
  variable: "--f-mukta",
});

const baloo = Baloo_2({
  subsets: ["devanagari", "latin"],
  display: "swap",
  preload: false,
  variable: "--f-baloo",
});

const martel = Martel({
  subsets: ["devanagari", "latin"],
  weight: ["300", "400", "700", "900"],
  display: "swap",
  preload: false,
  variable: "--f-martel",
});

const yatra = Yatra_One({
  subsets: ["devanagari", "latin"],
  weight: "400",
  display: "swap",
  preload: false,
  variable: "--f-yatra",
});

const kalam = Kalam({
  subsets: ["devanagari", "latin"],
  weight: ["300", "400", "700"],
  display: "swap",
  preload: false,
  variable: "--f-kalam",
});

/** Applied to <html> in the root layout. */
export const fontVariables = [
  fraunces,
  instrument,
  newsreader,
  literata,
  spectral,
  sourceSerif,
  bricolage,
  tiroMarathi,
  tiroHindi,
  anek,
  rozha,
  notoSerifDeva,
  mukta,
  baloo,
  martel,
  yatra,
  kalam,
]
  .map((f) => f.variable)
  .join(" ");

// ── Catalog ────────────────────────────────────────────────────

export type Script = "latin" | "devanagari" | "both";

export type AxisSpec = {
  tag: string;
  label: string;
  min: number;
  max: number;
  step: number;
  default: number;
};

export type FontEntry = {
  id: string;
  label: string;
  cssVar: string;
  script: Script;
  axes?: AxisSpec[];
  note?: string;
};

const opsz = (min: number, max: number, def: number): AxisSpec => ({
  tag: "opsz",
  label: "Optical size",
  min,
  max,
  step: 1,
  default: def,
});

export const FONT_CATALOG: FontEntry[] = [
  {
    id: "fraunces",
    label: "Fraunces",
    cssVar: "--f-fraunces",
    script: "latin",
    note: "Soft / Wonk axes — the most characterful option",
    axes: [
      { tag: "SOFT", label: "Softness", min: 0, max: 100, step: 1, default: 22 },
      { tag: "WONK", label: "Wonk", min: 0, max: 1, step: 1, default: 1 },
      opsz(9, 144, 48),
    ],
  },
  {
    id: "instrument",
    label: "Instrument Serif",
    cssVar: "--f-instrument",
    script: "latin",
    note: "High contrast, single weight",
  },
  {
    id: "newsreader",
    label: "Newsreader",
    cssVar: "--f-newsreader",
    script: "latin",
    axes: [opsz(6, 72, 16)],
  },
  {
    id: "literata",
    label: "Literata",
    cssVar: "--f-literata",
    script: "latin",
    axes: [opsz(7, 72, 18)],
  },
  {
    id: "spectral",
    label: "Spectral",
    cssVar: "--f-spectral",
    script: "latin",
    note: "Static weights only",
  },
  {
    id: "source-serif",
    label: "Source Serif 4",
    cssVar: "--f-source-serif",
    script: "latin",
    axes: [opsz(8, 60, 20)],
  },
  {
    id: "bricolage",
    label: "Bricolage Grotesque",
    cssVar: "--f-bricolage",
    script: "latin",
    note: "Sans — modern contrast option",
    axes: [
      { tag: "wdth", label: "Width", min: 75, max: 100, step: 1, default: 100 },
      opsz(12, 96, 24),
    ],
  },

  {
    id: "tiro-marathi",
    label: "Tiro Devanagari Marathi",
    cssVar: "--f-tiro-marathi",
    script: "devanagari",
    note: "Marathi letterforms — correct ल and श",
  },
  {
    id: "tiro-hindi",
    label: "Tiro Devanagari Hindi",
    cssVar: "--f-tiro-hindi",
    script: "devanagari",
    note: "Hindi cut — compare ल and श against the Marathi",
  },
  {
    id: "anek",
    label: "Anek Devanagari",
    cssVar: "--f-anek",
    script: "both",
    axes: [
      { tag: "wdth", label: "Width", min: 75, max: 125, step: 1, default: 100 },
    ],
  },
  {
    id: "rozha",
    label: "Rozha One",
    cssVar: "--f-rozha",
    script: "both",
    note: "High-contrast display — closest to the reference wordmark",
  },
  {
    id: "noto-serif-deva",
    label: "Noto Serif Devanagari",
    cssVar: "--f-noto-serif-deva",
    script: "both",
    axes: [
      {
        tag: "wdth",
        label: "Width",
        min: 62.5,
        max: 100,
        step: 0.5,
        default: 100,
      },
    ],
  },
  {
    id: "mukta",
    label: "Mukta",
    cssVar: "--f-mukta",
    script: "both",
    note: "Humanist sans",
  },
  {
    id: "baloo",
    label: "Baloo 2",
    cssVar: "--f-baloo",
    script: "both",
    note: "Rounded and warm",
  },
  { id: "martel", label: "Martel", cssVar: "--f-martel", script: "both" },
  {
    id: "yatra",
    label: "Yatra One",
    cssVar: "--f-yatra",
    script: "both",
    note: "Decorative display",
  },
  {
    id: "kalam",
    label: "Kalam",
    cssVar: "--f-kalam",
    script: "both",
    note: "Handwriting",
  },
];

export const byId = (id: string) => FONT_CATALOG.find((f) => f.id === id);

export const LATIN_FONTS = FONT_CATALOG.filter((f) => f.script !== "devanagari");
export const DEVA_FONTS = FONT_CATALOG.filter((f) => f.script !== "latin");

// ── Curated pairings ───────────────────────────────────────────

export type Pairing = {
  id: string;
  label: string;
  gloss: string;
  display: string;
  text: string;
  deva: string;
};

export const PAIRINGS: Pairing[] = [
  {
    id: "kagaz",
    label: "Kagaz",
    gloss: "कागज़ · paper — editorial and warm, Marathi-correct",
    display: "fraunces",
    text: "newsreader",
    deva: "tiro-marathi",
  },
  {
    id: "bazaar",
    label: "Bazaar",
    gloss: "बाज़ार — high contrast, closest to the reference",
    display: "instrument",
    text: "literata",
    deva: "rozha",
  },
  {
    id: "ledger",
    label: "Ledger",
    gloss: "sober and institutional — reads as a control plane",
    display: "source-serif",
    text: "source-serif",
    deva: "noto-serif-deva",
  },
  {
    id: "nadi",
    label: "Nadi",
    gloss: "नदी · river — modern, technical, variable width",
    display: "bricolage",
    text: "mukta",
    deva: "anek",
  },
  {
    id: "chai",
    label: "Chai",
    gloss: "चाय — soft and bookish",
    display: "spectral",
    text: "spectral",
    deva: "martel",
  },
];

export const DEFAULT_PAIRING = PAIRINGS[0];

/**
 * Latin face first, Devanagari second: CSS falls back per glyph, so
 * Latin renders from the Latin face and Devanagari drops through
 * automatically. No script detection needed anywhere.
 */
export function stackFor(latinId: string, devaId: string, generic = "serif") {
  const latin = byId(latinId);
  const deva = byId(devaId);
  return [
    latin && `var(${latin.cssVar})`,
    deva && `var(${deva.cssVar})`,
    generic,
  ]
    .filter(Boolean)
    .join(", ");
}

export const STORAGE_KEY = "pravaah:type";
