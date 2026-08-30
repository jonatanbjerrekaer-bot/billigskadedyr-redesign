import { useEffect, useRef, useState } from "react";
import {
  Disclosure,
  NumberField,
  Slider,
  ToggleButton,
  ToggleButtonGroup,
} from "@heroui/react";
import { Check, ChevronDown, RotateCcw } from "lucide-react";
import Select from "./ui/Select";
import { ContactCtas } from "./ui/Cta";
import { PestGlyph, PRICED_PESTS } from "../lib/pests";
import { estimate, dkr, diyFrom } from "../lib/pricing";
import type { PropertyType, Severity } from "../lib/pricing";

/**
 * Progressive disclosure (Norman: visibility; Shneiderman 8: reduce short-term
 * memory load). Choosing the pest is the only step that must happen. Area,
 * property type and severity only refine an estimate that is already on screen,
 * so they start folded away behind one control and every one of them has a
 * sensible default. A first-time visitor sees two things, not five.
 */

const DEFAULTS = {
  m2: 100,
  property: "lejlighed" as PropertyType,
  severity: "normal" as Severity,
};

const PROPERTIES: { id: PropertyType; label: string }[] = [
  { id: "lejlighed", label: "Lejlighed" },
  { id: "hus", label: "Hus" },
  { id: "erhverv", label: "Erhverv" },
];

// One line per level, and only the chosen one is shown. Listing all three at
// once is a paragraph to parse before you can pick; showing the selected one is
// the same information delivered when it is actually useful (progressive
// disclosure, and Shneiderman 3: the description doubles as feedback that the
// choice registered).
const SEVERITIES: { id: Severity; label: string; hint: string }[] = [
  { id: "let", label: "Let", hint: "Du ser dem sjældent, og kun ét sted." },
  { id: "normal", label: "Normal", hint: "Du ser dem jævnligt." },
  { id: "kraftig", label: "Kraftig", hint: "Du ser dem dagligt eller flere steder i boligen." },
];

// Colours live in index.css (see the segmented-control block); these are only
// the bits that are this page's layout choice rather than the control's theme.
const TOGGLE = "px-4 py-3 text-sm font-medium data-[selected]:font-semibold";
const GROUP = "inline-flex";
const PEST_TRIGGER = "pest-select-trigger";

export default function Estimator() {
  const [slug, setSlug] = useState(PRICED_PESTS[0].slug);
  const [m2, setM2] = useState(DEFAULTS.m2);
  const [property, setProperty] = useState<PropertyType>(DEFAULTS.property);
  const [severity, setSeverity] = useState<Severity>(DEFAULTS.severity);
  const [display, setDisplay] = useState(0);
  const [advOpen, setAdvOpen] = useState(false);
  const rafRef = useRef<number | null>(null);
  const advRef = useRef<HTMLDivElement | null>(null);
  const advTouched = useRef(false);

  // Desktop only: open the refinements as the calculator comes into view, so
  // the controls are already there by the time the eye arrives. On a phone
  // they stay folded — screen space is the scarce thing there, not attention.
  // Once the visitor opens or closes it themselves we never override them
  // again (Shneiderman 7: they keep control).
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia("(min-width: 768px)").matches) return;
    const el = advRef.current;
    if (!el) return;
    // Two guards, because the observer alone opened the panel too early.
    //
    // 1. A narrow band. The old margin left a 45%-to-75% window, so the block
    //    tripped it while its top edge was still down near the fold. The band
    //    is now a strip around the middle of the screen: the block has to be
    //    where the reader is actually looking, not merely present.
    // 2. A dwell. Scrolling past at speed used to fire it in passing, so the
    //    panel opened for someone already gone. It now has to stay in the band
    //    for a beat before anything moves, which is the difference between
    //    "you have arrived" and "you went by".
    let dwell: number | undefined;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (advTouched.current) return;
        if (entry.isIntersecting) {
          dwell = window.setTimeout(() => {
            if (!advTouched.current) setAdvOpen(true);
            io.disconnect();
          }, 400);
        } else if (dwell !== undefined) {
          window.clearTimeout(dwell);
          dwell = undefined;
        }
      },
      // A single edge, not a strip. An earlier attempt used a narrow band
      // (55%-65%) and a short block could pass through it without ever
      // satisfying the observer, so the panel simply never opened. This asks
      // one question instead: has the block risen into the top 60% of the
      // screen? That is later than the old 75% trigger, which is the fix, and
      // it cannot be stepped over.
      { threshold: 0, rootMargin: "0px 0px -40% 0px" },
    );
    io.observe(el);
    return () => {
      if (dwell !== undefined) window.clearTimeout(dwell);
      io.disconnect();
    };
  }, []);

  const pest = PRICED_PESTS.find((p) => p.slug === slug) ?? PRICED_PESTS[0];
  const { low, high } = estimate(pest.priceKey!, m2, property, severity);
  // One number, not a range: a range makes the visitor do the arithmetic
  // and still leaves them unsure. Midpoint, rounded to nearest 50 kr.
  const price = Math.round((low + high) / 2 / 50) * 50;
  const diy = diyFrom(pest.slug);

  // Shneiderman 6: easy reversal. Anyone who has fiddled the inputs can get
  // back to the starting point without reloading the page.
  const touched =
    m2 !== DEFAULTS.m2 || property !== DEFAULTS.property || severity !== DEFAULTS.severity;
  const severityHint = SEVERITIES.find((x) => x.id === severity)?.hint;

  // What is included changes with the answers, so the list says what this job
  // covers rather than repeating four generic promises regardless of input.
  // Shneiderman 3 again: the list is feedback that the inputs did something.
  const included = [
    "Besigtigelse på adressen",
    pest.treatment ?? "Behandling af det angrebne område",
    severity === "let"
      ? "Ét besøg, som regel nok ved et lille angreb"
      : severity === "kraftig"
        ? "Op til tre besøg og tættere opfølgning"
        : "Op til to besøg med opfølgning",
    property === "erhverv"
      ? "Dokumentation til egenkontrol og audit"
      : "Skriftlig dokumentation af behandlingen",
    "Garanti på behandlingen",
  ];
  const reset = () => {
    setM2(DEFAULTS.m2);
    setProperty(DEFAULTS.property);
    setSeverity(DEFAULTS.severity);
  };

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplay(price);
      return;
    }
    const from = display;
    const start = performance.now();
    const duration = 400;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(from + (price - from) * eased));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // ponytail: deps intentionally limited to outputs
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [price]);

  return (
    <section id="estimator" className="bg-ink-900 text-cream py-12 sm:py-16">
      {/*
        flex-col-reverse on mobile puts the price above the controls, so the
        number stays on screen while you adjust them. DOM order is unchanged
        (controls first, then result), which is the order that reads correctly
        to a screen reader.
      */}
      <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col-reverse md:flex-row md:flex-wrap gap-8 md:gap-10">
        <div
          className="flex flex-col gap-6"
          style={{ flexBasis: "320px", flexGrow: 1, flexShrink: 1, maxWidth: "100%" }}
        >
          <div className="hidden md:block">
            <h2 className="font-display text-3xl font-bold tracking-tight uppercase">
              Prisberegner
            </h2>
            <p className="mt-2 text-sm text-ink-100/80">
              Et vejledende beløb med det samme, så du ikke behøver ringe først. Den endelige
              pris aftaler vi, når vi kender opgaven, og så ligger den fast.
            </p>
          </div>

          <div className="flex flex-col gap-1.5 text-sm font-medium">
            <span>Hvilket skadedyr?</span>
            <Select
              value={slug}
              onValueChange={setSlug}
              ariaLabel="Skadedyr"
              triggerId={PEST_TRIGGER}
              options={PRICED_PESTS.map((p) => ({
                value: p.slug,
                label: p.label,
                icon: <PestGlyph pest={p} size={22} />,
              }))}
            />
          </div>

          <Disclosure.Root
            ref={advRef}
            isExpanded={advOpen}
            onExpandedChange={(v: boolean) => {
              advTouched.current = true;
              setAdvOpen(v);
            }}
            className="border-t border-ink-800 pt-4"
          >
            <Disclosure.Heading>
              <Disclosure.Trigger className="group flex w-full items-center justify-between gap-3 min-h-[44px] text-left text-sm font-medium cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-accent-500 rounded-lg">
                <span>
                  Tilpas beregningen
                  <span className="block text-xs font-normal text-ink-100/60">
                    Areal, boligtype og hvor slemt det er. Ellers regner vi på en gennemsnitlig
                    lejlighed.
                  </span>
                </span>
                <ChevronDown
                  size={20}
                  strokeWidth={2.5}
                  aria-hidden="true"
                  className="shrink-0 text-accent-500 transition-transform duration-300 group-aria-expanded:rotate-180"
                />
              </Disclosure.Trigger>
            </Disclosure.Heading>

            <Disclosure.Content>
              <Disclosure.Body className="flex flex-col gap-6 pt-5 motion-safe:animate-[disclosureIn_.35s_ease-out]">
                <Slider.Root
                  value={m2}
                  onChange={(v) => setM2(Number(v))}
                  minValue={20}
                  maxValue={400}
                  step={5}
                  aria-label="Størrelse af område i kvadratmeter"
                  className="flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between gap-3 text-sm font-medium">
                    <span>
                      Størrelse af område
                      <span className="block text-xs font-normal text-ink-100/60">
                        Arealet vi skal behandle. Er du i tvivl, så tag hele boligen.
                      </span>
                    </span>
                    <NumberField.Root
                      value={m2}
                      onChange={(v) =>
                        setM2(Number.isNaN(v) ? 20 : Math.max(20, Math.min(400, v)))
                      }
                      minValue={20}
                      maxValue={400}
                      aria-label="Størrelse af område i kvadratmeter"
                    >
                      <NumberField.Group className="w-28 shrink-0 rounded-lg border border-ink-700 bg-ink-800 flex items-center min-h-[44px]">
                        <NumberField.Input className="w-full min-h-[44px] bg-transparent px-3 py-2 text-sm text-accent-400 font-bold tabular-nums outline-none" />
                        <span aria-hidden="true" className="pr-3 text-xs text-ink-100/60">
                          m²
                        </span>
                      </NumberField.Group>
                    </NumberField.Root>
                  </div>
                  <Slider.Track className="relative h-3 w-full rounded-full">
                    <Slider.Fill className="absolute left-0 top-0 h-full rounded-full" />
                    <Slider.Thumb className="h-7 w-7 sm:h-6 sm:w-6 rounded-full shadow-lg data-[dragging]:scale-110 transition-transform" />
                  </Slider.Track>
                  <div className="flex justify-between text-xs text-ink-100/50 tabular-nums">
                    <span>20 m²</span>
                    <span>400 m²</span>
                  </div>
                </Slider.Root>

                <div>
                  <span className="block text-sm font-medium mb-2">Ejendomstype</span>
                  <ToggleButtonGroup.Root
                    selectionMode="single"
                    disallowEmptySelection
                    selectedKeys={[property]}
                    onSelectionChange={(keys) => {
                      const next = [...keys][0];
                      if (next) setProperty(next as PropertyType);
                    }}
                    className={GROUP}
                    aria-label="Ejendomstype"
                  >
                    {PROPERTIES.map((o) => (
                      <ToggleButton key={o.id} id={o.id} className={TOGGLE}>
                        {o.label}
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup.Root>
                </div>

                <div>
                  <span className="block text-sm font-medium mb-2">Grad af angreb</span>
                  <ToggleButtonGroup.Root
                    selectionMode="single"
                    disallowEmptySelection
                    selectedKeys={[severity]}
                    onSelectionChange={(keys) => {
                      const next = [...keys][0];
                      if (next) setSeverity(next as Severity);
                    }}
                    className={GROUP}
                    aria-label="Grad af angreb"
                  >
                    {SEVERITIES.map((o) => (
                      <ToggleButton key={o.id} id={o.id} className={TOGGLE}>
                        {o.label}
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup.Root>
                  <p className="mt-2 text-xs text-ink-100/60" aria-live="polite">
                    {severityHint}
                  </p>
                </div>

                {touched && (
                  <button
                    type="button"
                    onClick={reset}
                    className="self-start inline-flex items-center gap-2 min-h-[44px] px-3 -ml-3 rounded-lg text-sm text-ink-100/60 underline underline-offset-4 hover:text-cream transition-colors"
                  >
                    <RotateCcw size={15} strokeWidth={2} aria-hidden="true" />
                    Nulstil til standard
                  </button>
                )}
              </Disclosure.Body>
            </Disclosure.Content>
          </Disclosure.Root>
        </div>

        <div
          className="flex flex-col gap-4 bg-ink-800 rounded-2xl p-5 sm:p-6 md:min-h-[320px]"
          style={{ flexBasis: "320px", flexGrow: 1, flexShrink: 1, maxWidth: "100%" }}
          aria-live="polite"
        >
          <h2 className="font-display text-2xl font-bold tracking-tight uppercase md:hidden">
            Prisberegner
          </h2>

          {/*
            The pest name is what people reach for when they want a different
            pest, so it opens the picker rather than just reporting state.
            ponytail: driven by focus+click on the trigger — react-aria exposes
            no imperative "open" on Select, and a second piece of open-state
            plumbing to avoid one DOM call is not worth it.
          */}
          <button
            type="button"
            aria-label={`Skadedyr: ${pest.label}. Klik for at vælge et andet.`}
            onClick={() => {
              const el = document.getElementById(PEST_TRIGGER);
              if (!el) return;
              el.scrollIntoView({ block: "center", behavior: "smooth" });
              el.focus();
              el.click();
            }}
            className="group flex items-center gap-3 -m-2 p-2 rounded-xl text-left transition-colors hover:bg-ink-700/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500"
          >
            <span className="w-11 h-11 rounded-xl bg-ink-900 text-accent-500 flex items-center justify-center shrink-0 transition-colors group-hover:bg-ink-950">
              <PestGlyph pest={pest} size={24} />
            </span>
            <span className="min-w-0">
              <span className="block text-xs uppercase tracking-widest text-ink-100/70">
                Vejledende pris
              </span>
              <span className="flex items-center gap-1.5 text-sm text-ink-100/80">
                {pest.label}
                <ChevronDown
                  size={14}
                  strokeWidth={2.5}
                  aria-hidden="true"
                  className="text-accent-500 opacity-60 transition-opacity group-hover:opacity-100"
                />
              </span>
            </span>
          </button>

          <div className="font-display text-4xl font-bold text-accent-400 tabular-nums">
            {dkr(display)}
          </div>

          <ul className="text-sm text-ink-100/90 flex flex-col gap-2">
            {included.map((item) => (
              <li key={item} className="flex gap-2">
                <Check
                  size={16}
                  strokeWidth={3}
                  aria-hidden="true"
                  className="text-accent-500 shrink-0 mt-0.5"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="text-xs text-ink-100/60">
            Svar inden for 24 timer på hverdage, og vi er typisk hos dig inden for 1-2 hverdage.
            De fleste opgaver er løst på ét til to besøg.
          </p>

          {diy && (
            <p className="text-xs text-ink-100/70 border-t border-ink-700 pt-3">
              Er angrebet lille, kan du ofte klare det selv. Midler mod {pest.label.toLowerCase()}{" "}
              starter ved <span className="font-semibold text-accent-400">{diy}</span> i webshoppen.
            </p>
          )}

          <ContactCtas className="mt-auto" />
        </div>
      </div>
    </section>
  );
}
