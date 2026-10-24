import { useEffect, useRef, useState } from "react";
import {
  Disclosure,
  NumberField,
  Slider,
  ToggleButton,
  ToggleButtonGroup,
} from "@heroui/react";
import {
  ChevronDown,
  RotateCcw,
} from "lucide-react";
import Select from "./ui/Select";
import { ContactCtas } from "./ui/Cta";
import {
  publishEstimatorSelection,
  useChosenPest,
} from "../lib/estimatorSelection";
import { PestGlyph, PRICED_PESTS } from "../lib/pests";
import { estimate, dkr, OWNER_PRICES } from "../lib/pricing";
import type { PropertyType, Severity } from "../lib/pricing";

/**
 * Progressive disclosure (Norman: visibility; Shneiderman 8: reduce short-term
 * memory load). Choosing the pest is the only step that must happen. Area,
 * property type and severity only refine an estimate that is already on screen,
 * so they start folded away behind one control and every one of them has a
 * sensible default. A first-time visitor sees two things, not five.
 */

// Gennemsnitligt boligareal i Jylland og på Fyn, Danmarks Statistik 2026
// (BYGB70 areal / BOL101 boliger, landsdele 07-11): etagebolig 79,2 m2,
// parcelhus 139,9 m2. Erhverv har ingen meningsfuld gennemsnitsstørrelse og
// beholder derfor den værdi, der allerede står.
const AREA_PRESETS: Partial<Record<PropertyType, number>> = {
  lejlighed: 80,
  hus: 140,
};

const DEFAULTS = {
  m2: AREA_PRESETS.hus!,
  property: "hus" as PropertyType,
  severity: "normal" as Severity,
};

const PROPERTIES: { id: PropertyType; label: string }[] = [
  { id: "hus", label: "Hus" },
  { id: "lejlighed", label: "Lejlighed" },
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
const TOGGLE = "";
const GROUP = "inline-flex";
const PEST_TRIGGER = "pest-select-trigger";

export default function Estimator({ initialPest }: { initialPest?: string } = {}) {
  // A service page knows which pest the visitor came for, so the picker opens
  // on it. This is not counted as the visitor having used the calculator:
  // selTouched stays false until they change something themselves, so the
  // contact form still refuses to prefill a situation nobody described.
  const [slug, setSlug] = useChosenPest(
    PRICED_PESTS.some((p) => p.slug === initialPest) ? initialPest! : PRICED_PESTS[0].slug,
  );
  const [m2, setM2] = useState(DEFAULTS.m2);
  const [property, setProperty] = useState<PropertyType>(DEFAULTS.property);
  const [severity, setSeverity] = useState<Severity>(DEFAULTS.severity);
  // True once the visitor changes any input themselves. The contact form
  // uses it to prefill the message with a draft; defaults alone never do,
  // the draft must describe the visitor's own situation, not a made-up one.
  const [selTouched, setSelTouched] = useState(false);
  const [display, setDisplay] = useState(0);
  const [advOpen, setAdvOpen] = useState(() => typeof window !== "undefined" && window.matchMedia("(min-width: 60rem)").matches);
  const rafRef = useRef<number | null>(null);
  const advRef = useRef<HTMLDivElement | null>(null);
  const advTouched = useRef(false);
  const m2Touched = useRef(false);
  const [areaAnim, setAreaAnim] = useState(false);
  const animTimer = useRef<number | undefined>(undefined);
  // Set by slider drags and typed numbers; consumed by the count-up effect so
  // those inputs skip the tween and track 1:1.
  const instantRef = useRef(false);

  // Moving the area for the visitor should read as a deliberate change, not as
  // a glitch, so the track glides. Dragging must stay 1:1 with the pointer, so
  // the transition is only switched on for the length of a preset change.
  const glideArea = (next: number) => {
    setAreaAnim(true);
    setM2(next);
    window.clearTimeout(animTimer.current);
    animTimer.current = window.setTimeout(() => setAreaAnim(false), 500);
  };

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
        // Nothing in that block affects a quoted pest, so it should not
        // invite the visitor to go and move it.
        if (advTouched.current || quote.kind !== "fixed") return;
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
  // His published price, or an honest "we set it after a short chat". The old
  // midpoint arithmetic is gone: these are the figures he actually charges, so
  // there is nothing left to average. Season comes from the clock inside
  // estimate(), which is why no control here asks about it.
  const quote = estimate(pest.priceKey!, m2, property, severity);
  const price = quote.kind === "fixed" ? quote.price : 0;

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
  ];
  // The honest inverse of the list above. Unexpected cost at the end is the
  // single most-cited reason people abandon a purchase, so the variables that
  // could move this number are named before the visitor commits, not after.
  // Derived from the same answers, so it stays specific rather than becoming
  // a generic disclaimer nobody reads.

  const couldChange = [
    "Svær adgang, for eksempel krybekælder eller loft uden fast trappe",
    ...(m2 > 200 ? ["Flere etager eller bygninger på samme adresse"] : []),
    ...(severity === "kraftig"
      ? ["Ekstra besøg, hvis angrebet har bredt sig mere end forventet"]
      : []),
    ...(property === "erhverv"
      ? ["Krav om dokumentation ud over det normale, for eksempel til en audit"]
      : []),
  ];

  // The contact section below drafts its message placeholder from these
  // answers; publishing is shallow-guarded, so re-renders cost nothing.
  publishEstimatorSelection({
    pestLabel: pest.label,
    m2,
    property,
    severity,
    // null, not 0: a quote has no number yet, and dkr(0) would hand the
    // contact form "omkring 0 kr." to send.
    price: quote.kind === "fixed" ? dkr(price) : null,
    amount: quote.kind === "fixed" ? price : null,
    packageAmount: (() => {
      const row = OWNER_PRICES[pest.priceKey!];
      return row?.kind === "fixed" ? row.packagePrice ?? null : null;
    })(),
    touched: selTouched,
  });

  const reset = () => {
    m2Touched.current = false;
    glideArea(DEFAULTS.m2);
    setProperty(DEFAULTS.property);
    setSeverity(DEFAULTS.severity);
    setSelTouched(false);
  };

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Slider drags and typed numbers must stay 1:1 with the pointer, the same
    // rule the thumb itself follows: those changes render instantly, and only
    // discrete changes (pest, preset, reset) get the tween.
    if (reduced || instantRef.current) {
      instantRef.current = false;
      setDisplay(price);
      return;
    }
    const from = display;
    const start = performance.now();
    const duration = 250;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      // Ease-out matching the site's --ease-out token.
      const eased = 1 - Math.pow(1 - t, 4);
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
    <section id="estimator" className="section section--s estimator">
      {/*
        Under 60rem the grid becomes a reversed column, so the price sits above
        the controls and stays on screen while you adjust them. DOM order is
        unchanged (controls first, then result), which is the order that reads
        correctly to a screen reader.
      */}
      <div className="container grid12">
        <div className="estimator__controls">
          <div>
            <h2>Prisberegner</h2>
            <p className="lead" style={{ marginTop: "var(--space-md)" }}>
              Et vejledende beløb med det samme, så du ikke behøver ringe først. Den endelige pris
              aftaler vi, når vi kender opgaven, og så ligger den fast.
            </p>
          </div>

          <div>
            <span className="field-label">Hvilket skadedyr?</span>
            <Select
              value={slug}
              onValueChange={(v) => {
                setSelTouched(true);
                setSlug(v);
              }}
              ariaLabel="Skadedyr"
              triggerId={PEST_TRIGGER}
              paper
              options={PRICED_PESTS.map((p) => ({
                value: p.slug,
                label: p.label,
                icon: <PestGlyph pest={p} size={22} />,
              }))}
            />
          </div>

          {/* Area, property type and severity feed the fixed-price
              calculation. For a pest that is quoted after a visit they
              change nothing, and a control that does nothing reads as a
              broken tool or as a hidden number. */}
          {quote.kind === "fixed" && (
          <Disclosure.Root
            ref={advRef}
            isExpanded={advOpen}
            onExpandedChange={(v: boolean) => {
              advTouched.current = true;
              setAdvOpen(v);
            }}
            className="estimator__disclosure"
          >
            <Disclosure.Heading>
              <Disclosure.Trigger className="disclosure-trigger">
                <span>
                  <span className="trigger-title">Tilpas beregningen</span>
                  <span className="small muted" style={{ display: "block" }}>
                    Areal, boligtype og hvor slemt det er. Ellers regner vi på et
                    gennemsnitligt hus.
                  </span>
                </span>
                <ChevronDown size={20} aria-hidden="true" className="chev" />
              </Disclosure.Trigger>
            </Disclosure.Heading>

            <Disclosure.Content>
              <Disclosure.Body style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)", paddingTop: "var(--space-md)" }}>
                <Slider.Root
                  value={m2}
                  onChange={(v) => {
                    if (Number(v) !== m2) {
                      m2Touched.current = true;
                      setAreaAnim(false);
                      instantRef.current = true;
                      setSelTouched(true);
                    }
                    setM2(Number(v));
                  }}
                  minValue={20}
                  maxValue={400}
                  step={5}
                  aria-label="Størrelse af område i kvadratmeter"
                  className={`slider-block${areaAnim ? " area-anim" : ""}`}
                  style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}
                >
                  <div className="area-row">
                    <span>
                      <span className="field-label" style={{ marginBottom: 0 }}>Størrelse af område</span>
                      <span className="small muted">
                        Arealet vi skal behandle. Er du i tvivl, så tag hele boligen.
                      </span>
                    </span>
                    <NumberField.Root
                      value={m2}
                      onChange={(v) => {
                        const next = Number.isNaN(v) ? 20 : Math.max(20, Math.min(400, v));
                        if (next !== m2) {
                          m2Touched.current = true;
                          setAreaAnim(false);
                          instantRef.current = true;
                          setSelTouched(true);
                        }
                        setM2(next);
                      }}
                      minValue={20}
                      maxValue={400}
                      aria-label="Størrelse af område i kvadratmeter"
                    >
                      <NumberField.Group className="area-field">
                        <NumberField.Input />
                        <span aria-hidden="true">m²</span>
                      </NumberField.Group>
                    </NumberField.Root>
                  </div>
                  <Slider.Track className="relative w-full">
                    <Slider.Fill className="absolute left-0 top-0 h-full" />
                    <Slider.Thumb />
                  </Slider.Track>
                  <div className="scale">
                    <span>20 m²</span>
                    <span>400 m²</span>
                  </div>
                </Slider.Root>

                <div>
                  <span className="field-label">Ejendomstype</span>
                  <ToggleButtonGroup.Root
                    selectionMode="single"
                    disallowEmptySelection
                    selectedKeys={[property]}
                    onSelectionChange={(keys) => {
                      const next = [...keys][0];
                      if (!next) return;
                      const p = next as PropertyType;
                      setProperty(p);
                      setSelTouched(true);
                      // Sæt arealet til et realistisk gennemsnit for den valgte
                      // boligtype, men aldrig oven i et tal brugeren selv har sat.
                      const preset = AREA_PRESETS[p];
                      if (!m2Touched.current && preset) glideArea(preset);
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
                  <span className="field-label">Grad af angreb</span>
                  <ToggleButtonGroup.Root
                    selectionMode="single"
                    disallowEmptySelection
                    selectedKeys={[severity]}
                    onSelectionChange={(keys) => {
                      const next = [...keys][0];
                      if (next) {
                        setSeverity(next as Severity);
                        setSelTouched(true);
                      }
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
                  <p className="small muted" style={{ marginTop: "var(--space-xs)" }} aria-live="polite">
                    {severityHint}
                  </p>
                </div>

                {touched && (
                  <button type="button" onClick={reset} className="estimator__reset">
                    <RotateCcw size={15} strokeWidth={2} aria-hidden="true" />
                    Nulstil til standard
                  </button>
                )}
              </Disclosure.Body>
            </Disclosure.Content>
          </Disclosure.Root>
          )}
        </div>

        <div className="estimator__result" aria-live="polite">
          {/*
            The pest name is what people reach for when they want a different
            pest, so it opens the picker rather than just reporting state.
            ponytail: driven by focus+click on the trigger — react-aria exposes
            no imperative "open" on Select.
          */}
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById(PEST_TRIGGER);
              if (!el) return;
              const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
              el.scrollIntoView({ block: "center", behavior: reduced ? "auto" : "smooth" });
              el.focus();
              el.click();
            }}
            className="estimator__pick"
          >
            <PestGlyph pest={pest} size={28} />
            <span>
              <span className="select-none small muted" style={{ display: "block" }}>Vejledende pris</span>
              <span className="trigger-title">{pest.label}</span>
            </span>
            <ChevronDown size={16} aria-hidden="true" />
          </button>

          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
            {quote.kind === "fixed" ? (
              <>
                <p className="estimator__price">
                  {/* Always mounted, so crossing the area threshold is a
                      transition and not a mount. */}
                  <span className="price-prefix" data-show={quote.overArea || undefined}>
                    Fra{" "}
                  </span>
                  {dkr(display)}
                </p>
                {/* The price never appears without saying what it covers. */}
                <p className="small">{quote.caption}</p>
                {quote.notes.map((n) => (
                  <p key={n} className="enter-soft small muted">
                    {n}
                  </p>
                ))}
              </>
            ) : (
              <>
                {quote.inspection ? (
                  <p className="estimator__price">{dkr(quote.inspection.price)}</p>
                ) : (
                  <p className="estimator__price estimator__price--words">Fast pris efter en kort snak</p>
                )}
                {quote.inspection && <p className="small">{quote.inspection.text}</p>}
                <p className="small muted">{quote.why}</p>
                <p className="small muted">
                  {quote.inspection
                    ? "Selve behandlingen får du en fast pris på i tilbuddet, og den ændrer sig ikke undervejs."
                    : "Vi gætter ikke på et tal her. Du får prisen, før vi går i gang, og den ændrer sig ikke undervejs."}
                </p>
              </>
            )}
            <p className="select-none estimator__facts">
              <span>Svar på 1 hverdag</span>
              <span>Hos dig på 1-2 hverdage</span>
            </p>
          </div>

          <div>
            <p className="select-none estimator__sub">Prisen dækker</p>
            <ul className="estimator__list">
              {included.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {/* The caveats qualify the price rather than support it, so they sit
              under their own double rule instead of joining the list. */}
          <div className="estimator__caveat" hidden={quote.kind !== "fixed"}>
            <p className="estimator__sub">Det kan ændre prisen</p>
            <ul>
              {couldChange.map((item) => (
                <li key={item} className="enter-soft">
                  {item}
                </li>
              ))}
            </ul>
            <p className="small" style={{ marginTop: "var(--space-sm)" }}>
              Vi siger det, før vi går i gang. Prisen ændrer sig ikke undervejs.
            </p>
          </div>


          <ContactCtas />
        </div>
      </div>
    </section>
  );
}
