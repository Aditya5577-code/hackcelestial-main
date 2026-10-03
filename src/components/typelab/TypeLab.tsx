"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  byId,
  DEFAULT_PAIRING,
  DEVA_FONTS,
  FONT_CATALOG,
  LATIN_FONTS,
  PAIRINGS,
  STORAGE_KEY,
  type FontEntry,
} from "@/app/fonts";

type Axes = Record<string, Record<string, number>>;

type TypeState = {
  display: string;
  text: string;
  deva: string;
  axes: Axes;
};

type SampleLang = "en" | "hi" | "mr";

const SAMPLES: Record<SampleLang, { label: string; lang: string; body: string }> = {
  en: {
    label: "English",
    lang: "en",
    body: "Telling everyone where it is empty creates the next crowd.",
  },
  hi: {
    label: "हिन्दी",
    lang: "hi",
    body: "जहाँ जगह खाली है यह सबको बता देना ही अगली भीड़ बना देता है।",
  },
  mr: {
    label: "मराठी",
    lang: "mr",
    body: "कुठे रिकामे आहे हे सर्वांना सांगणेच पुढची गर्दी तयार करते.",
  },
};

function defaultAxesFor(font?: FontEntry): Record<string, number> {
  if (!font?.axes) return {};
  return Object.fromEntries(font.axes.map((a) => [a.tag, a.default]));
}

function initialState(): TypeState {
  const p = DEFAULT_PAIRING;
  const axes: Axes = {};
  for (const f of FONT_CATALOG) {
    const d = defaultAxesFor(f);
    if (Object.keys(d).length) axes[f.id] = d;
  }
  return { display: p.display, text: p.text, deva: p.deva, axes };
}

function varOf(id: string) {
  const f = byId(id);
  return f ? `var(${f.cssVar})` : null;
}

function vset(id: string, axes: Axes): string {
  const font = byId(id);
  const vals = axes[id];
  if (!font?.axes || !vals) return "normal";
  const parts = font.axes
    .map((a) => (vals[a.tag] === undefined ? null : `"${a.tag}" ${vals[a.tag]}`))
    .filter(Boolean);
  return parts.length ? parts.join(", ") : "normal";
}

/** Writes the whole type configuration onto :root. */
function applyType(s: TypeState) {
  const root = document.documentElement;
  const deva = varOf(s.deva);

  const stack = (latinId: string) =>
    [varOf(latinId), deva, "serif"].filter(Boolean).join(", ");

  root.style.setProperty("--type-display", stack(s.display));
  root.style.setProperty("--type-text", stack(s.text));
  root.style.setProperty("--type-deva", [deva, "serif"].filter(Boolean).join(", "));

  root.style.setProperty("--vset-display", vset(s.display, s.axes));
  root.style.setProperty("--vset-text", vset(s.text, s.axes));
  root.style.setProperty("--vset-deva", vset(s.deva, s.axes));
}

function snippetFor(s: TypeState) {
  const names = [s.display, s.text, s.deva]
    .filter((v, i, a) => a.indexOf(v) === i)
    .map((id) => byId(id))
    .filter(Boolean) as FontEntry[];

  const lines = names.map((f) => {
    const ax = f.axes?.length
      ? `\n  axes: [${f.axes.map((a) => `"${a.tag}"`).join(", ")}],`
      : "";
    const sub =
      f.script === "latin" ? `["latin"]` : `["devanagari", "latin"]`;
    return `// ${f.label}\n{\n  subsets: ${sub},${ax}\n  display: "swap",\n  variable: "${f.cssVar}",\n}`;
  });

  const vars = [
    `--type-display: ${[varOf(s.display), varOf(s.deva), "serif"].filter(Boolean).join(", ")};`,
    `--type-text: ${[varOf(s.text), varOf(s.deva), "serif"].filter(Boolean).join(", ")};`,
    `--type-deva: ${[varOf(s.deva), "serif"].filter(Boolean).join(", ")};`,
    `--vset-display: ${vset(s.display, s.axes)};`,
    `--vset-text: ${vset(s.text, s.axes)};`,
    `--vset-deva: ${vset(s.deva, s.axes)};`,
  ].join("\n  ");

  return `${lines.join("\n\n")}\n\n/* globals.css :root */\n:root {\n  ${vars}\n}\n`;
}

export function TypeLab() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<TypeState>(initialState);
  const [sample, setSample] = useState<SampleLang>("mr");
  const [copied, setCopied] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Restore once on mount. The <head> script has already applied the
  // stored value to :root, so this only re-syncs the React state.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<TypeState>;
        setState((prev) => ({
          display: byId(parsed.display ?? "") ? parsed.display! : prev.display,
          text: byId(parsed.text ?? "") ? parsed.text! : prev.text,
          deva: byId(parsed.deva ?? "") ? parsed.deva! : prev.deva,
          axes: { ...prev.axes, ...(parsed.axes ?? {}) },
        }));
      }
    } catch {
      /* unreadable or corrupt: fall back to the default pairing */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    applyType(state);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* non-fatal */
    }
  }, [state, hydrated]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "t" && e.key !== "T") return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const el = e.target as HTMLElement | null;
      const tag = el?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (el?.isContentEditable) return;
      setOpen((v) => !v);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const activePreset = useMemo(
    () =>
      PAIRINGS.find(
        (p) =>
          p.display === state.display &&
          p.text === state.text &&
          p.deva === state.deva,
      )?.id ?? "custom",
    [state.display, state.text, state.deva],
  );

  const setRole = useCallback((role: "display" | "text" | "deva", id: string) => {
    setState((s) => ({ ...s, [role]: id }));
  }, []);

  const setAxis = useCallback((fontId: string, tag: string, value: number) => {
    setState((s) => ({
      ...s,
      axes: { ...s.axes, [fontId]: { ...(s.axes[fontId] ?? {}), [tag]: value } },
    }));
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(snippetFor(state));
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard blocked — nothing useful to do */
    }
  };

  const roles: Array<{
    key: "display" | "text" | "deva";
    label: string;
    options: FontEntry[];
  }> = [
    { key: "display", label: "Display", options: LATIN_FONTS },
    { key: "text", label: "Text", options: LATIN_FONTS },
    { key: "deva", label: "Devanagari", options: DEVA_FONTS },
  ];

  const s = SAMPLES[sample];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Type Lab — try different fonts (T)"
        title="Type Lab (T)"
        className="fixed bottom-5 right-5 z-[55] grid size-11 place-items-center rounded-full border border-rule bg-parchment/90 text-ink-soft shadow-sm backdrop-blur transition-colors hover:bg-kraft hover:text-ink"
      >
        <span className="type-display text-lg leading-none">Aa</span>
      </button>

      {open && (
        <aside
          className="fixed inset-y-0 right-0 z-[60] flex w-[24rem] max-w-full flex-col overflow-y-auto border-l border-rule bg-parchment shadow-2xl"
          style={{ animation: "drawer-in 260ms cubic-bezier(.4,0,.2,1)" }}
          aria-label="Type Lab"
        >
          <div className="flex items-center justify-between border-b border-rule/60 px-5 py-4">
            <div>
              <h2 className="type-display text-lg text-ink">Type Lab</h2>
              <p className="type-text text-[0.7rem] text-ink-muted">
                Press T to toggle
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close Type Lab"
              className="grid size-8 place-items-center rounded-full border border-rule/60 text-ink-soft hover:bg-kraft"
            >
              ✕
            </button>
          </div>

          {/* live sample */}
          <div className="border-b border-rule/60 bg-page/60 px-5 py-5">
            <div className="mb-3 flex gap-1">
              {(Object.keys(SAMPLES) as SampleLang[]).map((k) => (
                <button
                  key={k}
                  type="button"
                  onClick={() => setSample(k)}
                  className={`type-text rounded-sm border px-2 py-1 text-[0.68rem] transition-colors ${
                    sample === k
                      ? "border-rule bg-kraft text-ink"
                      : "border-transparent text-ink-muted hover:text-ink"
                  }`}
                >
                  {SAMPLES[k].label}
                </button>
              ))}
            </div>

            <p
              lang={s.lang}
              className="type-display letterpress mb-2 text-[1.5rem] leading-tight text-ink"
            >
              {sample === "en" ? "Pravaah" : "प्रवाह"}
            </p>
            <p lang={s.lang} className="type-text text-[0.92rem] leading-snug text-ink-body">
              {s.body}
            </p>

            {sample !== "en" && (
              <p className="mt-3 border-t border-rule/40 pt-3">
                <span className="type-text mb-1 block text-[0.62rem] uppercase tracking-[0.18em] text-ink-muted">
                  Marathi vs Hindi letterforms
                </span>
                <span lang={s.lang} className="type-deva text-[1.7rem] text-ink">
                  ल श ष
                </span>
              </p>
            )}
          </div>

          {/* presets */}
          <section className="border-b border-rule/60 px-5 py-4">
            <h3 className="type-text mb-2 text-[0.62rem] uppercase tracking-[0.2em] text-ink-muted">
              Pairings
            </h3>
            <div className="flex flex-col gap-1">
              {PAIRINGS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() =>
                    setState((v) => ({
                      ...v,
                      display: p.display,
                      text: p.text,
                      deva: p.deva,
                    }))
                  }
                  className={`rounded-sm border px-3 py-2 text-left transition-colors ${
                    activePreset === p.id
                      ? "border-rule bg-kraft"
                      : "border-transparent hover:bg-kraft/50"
                  }`}
                >
                  <span className="type-display block text-[0.95rem] text-ink">
                    {p.label}
                  </span>
                  <span className="type-text block text-[0.68rem] leading-tight text-ink-muted">
                    {p.gloss}
                  </span>
                </button>
              ))}
              {activePreset === "custom" && (
                <p className="type-text px-3 py-1 text-[0.68rem] text-ink-muted">
                  Custom mix
                </p>
              )}
            </div>
          </section>

          {/* per-role pickers + axes */}
          {roles.map((role) => {
            const selected = byId(state[role.key]);
            return (
              <section
                key={role.key}
                className="border-b border-rule/60 px-5 py-4"
              >
                <h3 className="type-text mb-2 text-[0.62rem] uppercase tracking-[0.2em] text-ink-muted">
                  {role.label}
                </h3>
                <select
                  value={state[role.key]}
                  onChange={(e) => setRole(role.key, e.target.value)}
                  className="type-text w-full rounded-sm border border-rule bg-page px-2 py-1.5 text-[0.82rem] text-ink"
                >
                  {role.options.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.label}
                    </option>
                  ))}
                </select>

                {selected?.note && (
                  <p className="type-text mt-1.5 text-[0.68rem] leading-tight text-ink-muted">
                    {selected.note}
                  </p>
                )}

                {selected?.axes?.map((a) => {
                  const value = state.axes[selected.id]?.[a.tag] ?? a.default;
                  return (
                    <label key={a.tag} className="mt-3 block">
                      <span className="type-text flex justify-between text-[0.68rem] text-ink-soft">
                        <span>{a.label}</span>
                        <span className="tabular-nums text-ink-muted">
                          {value}
                        </span>
                      </span>
                      <input
                        type="range"
                        min={a.min}
                        max={a.max}
                        step={a.step}
                        value={value}
                        onChange={(e) =>
                          setAxis(selected.id, a.tag, Number(e.target.value))
                        }
                        className="mt-1 w-full accent-[var(--pig-clay)]"
                      />
                    </label>
                  );
                })}
              </section>
            );
          })}

          <div className="mt-auto flex gap-2 px-5 py-4">
            <button
              type="button"
              onClick={copy}
              className="type-text flex-1 rounded-sm border border-rule bg-page px-3 py-2 text-[0.75rem] text-ink transition-colors hover:bg-kraft"
            >
              {copied ? "Copied" : "Copy config"}
            </button>
            <button
              type="button"
              onClick={() => setState(initialState())}
              className="type-text rounded-sm border border-rule/60 px-3 py-2 text-[0.75rem] text-ink-muted transition-colors hover:bg-kraft hover:text-ink"
            >
              Reset
            </button>
          </div>
        </aside>
      )}
    </>
  );
}
