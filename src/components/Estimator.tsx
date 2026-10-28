import { useEffect, useRef, useState } from "react";
import {
  Disclosure,
  Input,
  Label,
  NumberField,
  Slider,
  ToggleButton,
  TextField,
  ToggleButtonGroup,
} from "@heroui/react";
import {
  ChevronDown,
  LocateFixed,
  Minus,
  Plus,
  RotateCcw,
  X,
} from "lucide-react";
import Select from "./ui/Select";
import SegmentTrack from "./ui/SegmentTrack";
import { ContactCtas, CONTACT_HREF, homeHref } from "./ui/Cta";
import {
  publishEstimatorSelection,
  useChosenPest,
} from "../lib/estimatorSelection";
import { PestGlyph, PESTS, PRICED_PESTS } from "../lib/pests";
import { estimate, dkr, houseTier, nearestPostcode, OWNER_PRICES } from "../lib/pricing";
import type { Houses, PropertyType, Severity } from "../lib/pricing";

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

// "10+" because ten is the top tier: eleven houses still get the ten-house price.
const NEIGHBOURS: { id: Houses; label: string }[] = [
  { id: 1, label: "1" },
  { id: 2, label: "2" },
  { id: 5, label: "5" },
  { id: 10, label: "10+" },
];

// Colours live in index.css (see the segmented-control block); these are only
// the bits that are this page's layout choice rather than the control's theme.
const TOGGLE = "";
const GROUP = "inline-flex";
const PEST_TRIGGER = "pest-select-trigger";
const ADD_TRIGGER = "add-pest-trigger";

export default function Estimator({ initialPest }: { initialPest?: string } = {}) {
  // A service page knows which pest the visitor came for, so the picker opens
  // on it. This is not counted as the visitor having used the calculator:
  // selTouched stays false until they change something themselves, so the
  // contact form still refuses to prefill a situation nobody described.
  const [slug, setSlug] = useChosenPest(
    PRICED_PESTS.some((p) => p.slug === initialPest) ? initialPest! : PRICED_PESTS[0].slug,
  );
  // The chosen pest outlives a page change, so a pest picked on one page would
  // otherwise follow the visitor onto another pest's service page. Arriving on
  // a service page always means that page's pest.
  useEffect(() => {
    if (initialPest && PRICED_PESTS.some((p) => p.slug === initialPest)) setSlug(initialPest);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPest]);
  const [m2, setM2] = useState(DEFAULTS.m2);
  const [property, setProperty] = useState<PropertyType>(DEFAULTS.property);
  const [severity, setSeverity] = useState<Severity>(DEFAULTS.severity);
  // Where the job is and how many neighbours join in. Both change the price,
  // so they sit with the pest at the top and not behind "Tilpas beregningen".
  const [postcode, setPostcode] = useState("");
  const [houses, setHouses] = useState<Houses>(1);
  const [driveOpen, setDriveOpen] = useState(false);
  const [neighboursOpen, setNeighboursOpen] = useState(false);
  // Rooms or nests, for the pests he prices that way.
  const [count, setCount] = useState(1);
  // The same for each added pest, by slug.
  const [extraCounts, setExtraCounts] = useState<Record<string, number>>({});
  // More pests on the same visit: one trip, half the driving (owner, 2026-10-26).
  const [extras, setExtras] = useState<string[]>([]);
  // The add picker starts as one line of text, like driving and neighbours:
  // most visits are one pest, and a second field read as a required question.
  const [addOpen, setAddOpen] = useState(false);
  // Switching from one priced pest to another is the moment someone shows they
  // may have both, so the pest they left is offered back once per visit.
  const [nudge, setNudge] = useState<string | null>(null);
  const nudged = useRef(false);
  const openAdd = () => {
    setAddOpen(true);
    // Opens the list straight away, so the link is one click, not two.
    requestAnimationFrame(() => document.getElementById(ADD_TRIGGER)?.click());
  };
  // Opens the postnummer field and puts the cursor in it. The field only
  // exists after the render that opens it, hence the frame's wait.
  // "Brug min placering": the browser asks for permission on the click, and
  // the position only picks the nearest postnummer locally (lib/pricing).
  const [locating, setLocating] = useState(false);
  const [locError, setLocError] = useState("");
  const locate = () => {
    if (!navigator.geolocation) return setLocError("Din browser kan ikke dele placering. Skriv postnummeret i stedet.");
    setLocating(true);
    setLocError("");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLocating(false);
        const nr = nearestPostcode(coords.latitude, coords.longitude);
        if (!nr) return setLocError("Vi kunne ikke finde et postnummer. Skriv det i stedet.");
        setPostcode(nr);
        setSelTouched(true);
      },
      () => {
        setLocating(false);
        setLocError("Vi fik ikke din placering. Skriv postnummeret i stedet.");
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 600000 },
    );
  };
  const openDrive = () => {
    setDriveOpen(true);
    requestAnimationFrame(() => {
      const el = document.getElementById("estimator-postcode");
      if (!el) return;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      el.scrollIntoView({ block: "center", behavior: reduced ? "auto" : "smooth" });
      el.focus({ preventScroll: true });
    });
  };
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
  // From two houses up the price is driven by the tier, and one area or
  // severity cannot speak for houses that may differ anyway — those controls
  // are hidden then. Quote and draft from the defaults instead of from state
  // no control shows, so a hidden slider can never move the number or the
  // "your home is bigger" note.
  const multi = houses !== 1;
  const effM2 = multi ? DEFAULTS.m2 : m2;
  const effSeverity = multi ? DEFAULTS.severity : severity;
  const priceRow = pest.priceKey ? OWNER_PRICES[pest.priceKey] : undefined;
  const unit = priceRow?.kind === "fixed" ? priceRow.unit : undefined;
  // Only his area-limited prices (myrer, edderkopper, skægkræ) move with m².
  const hasArea = priceRow?.kind === "fixed" && priceRow.maxM2 !== undefined;
  // Only pests with a fixed price can join a visit, and never the one already chosen.
  const fixedPests = PRICED_PESTS.filter((p) => OWNER_PRICES[p.priceKey!]?.kind === "fixed");
  const extraPests = extras
    .filter((s) => s !== slug)
    .flatMap((s) => fixedPests.filter((p) => p.slug === s));
  const nudgePest = nudge && !extras.includes(nudge) && nudge !== slug ? fixedPests.find((p) => p.slug === nudge) : undefined;
  const addable = fixedPests.filter((p) => p.slug !== slug && !extras.includes(p.slug));
  const unitOf = (p: (typeof fixedPests)[number]) => {
    const r = OWNER_PRICES[p.priceKey!];
    return r?.kind === "fixed" ? r.unit : undefined;
  };
  const countedExtras = extraPests.flatMap((p) => {
    const u = unitOf(p);
    return u ? [{ pest: p, unit: u }] : [];
  });
  const extraUnit = countedExtras[0]?.unit;
  // His published price, or an honest "we set it after a short chat". The old
  // midpoint arithmetic is gone: these are the figures he actually charges, so
  // there is nothing left to average. Season comes from the clock inside
  // estimate(), which is why no control here asks about it.
  const quote = estimate(pest.priceKey!, effM2, property, effSeverity, new Date(), {
    postcode,
    houses,
    count: unit ? Math.min(count, 10) : 1,
    extras: extraPests.map((p) => ({ key: p.priceKey!, label: p.label, count: extraCounts[p.slug] })),
  });
  // The big number is what ONE house pays; the count-up follows it.
  const price = quote.kind === "fixed" ? quote.price : 0;

  // Shneiderman 6: easy reversal. Anyone who has fiddled the inputs can get
  // back to the starting point without reloading the page.
  const touched =
    m2 !== DEFAULTS.m2 ||
    property !== DEFAULTS.property ||
    severity !== DEFAULTS.severity ||
    postcode !== "" ||
    houses !== 1 ||
    count !== 1 ||
    extras.length > 0;
  const severityHint = SEVERITIES.find((x) => x.id === severity)?.hint;

  // What is included changes with the answers, so the list says what this job
  // covers rather than repeating four generic promises regardless of input.
  // Shneiderman 3 again: the list is feedback that the inputs did something.
  const included = [
    pest.treatment ?? "Behandling af det angrebne område",
    ...extraPests.map((p) => `${p.label}: ${(p.treatment ?? "behandling").toLowerCase()}`),
    multi
      ? "Op til to besøg pr. hus med opfølgning"
      : severity === "let"
      ? "Ét besøg, som regel nok ved et lille angreb"
      : severity === "kraftig"
        ? "Op til tre besøg og tættere opfølgning"
        : "Op til to besøg med opfølgning",
    "Faktura og kvittering",
  ];
  // The honest inverse of the list above. Unexpected cost at the end is the
  // single most-cited reason people abandon a purchase, so the variables that
  // could move this number are named before the visitor commits, not after.
  // Derived from the same answers, so it stays specific rather than becoming
  // a generic disclaimer nobody reads.

  const couldChange = [
    "Svær adgang, for eksempel krybekælder eller loft uden fast trappe",
    ...(hasArea && effM2 > 200 ? ["Flere etager eller bygninger på samme adresse"] : []),
    ...(effSeverity === "kraftig"
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
    m2: effM2,
    property,
    severity: effSeverity,
    postcode: quote.kind === "fixed" ? quote.place?.nr ?? null : null,
    town: quote.kind === "fixed" ? quote.place?.by ?? null : null,
    houses: quote.kind === "fixed" ? quote.houses : 1,
    // null, not 0: a quote has no number yet, and dkr(0) would hand the
    // contact form "omkring 0 kr." to send.
    price: quote.kind === "fixed" ? dkr(price) : null,
    amount: quote.kind === "fixed" ? price : null,
    // He no longer sells a two-treatment package (price list, 2026-10-26).
    packageAmount: null,
    touched: selTouched,
  });

  const reset = () => {
    m2Touched.current = false;
    glideArea(DEFAULTS.m2);
    setProperty(DEFAULTS.property);
    setSeverity(DEFAULTS.severity);
    setPostcode("");
    setHouses(1);
    setCount(1);
    setExtraCounts({});
    setExtras([]);
    setAddOpen(false);
    setNudge(null);
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

  /* Mobile price chip. In the calculator the controls sit far below the
     result card, and picking from the opened sheet (or from a hero chip,
     which scrolls here first) leaves the visitor shaping a price they
     cannot see. While the section is on screen and the result card is
     not, a small bar above the phone bar keeps the chosen pest, the
     counting price and a CTA one thumb-reach away. Desktop never sees
     it — the result card is in plain view there. */
  const sectionRef = useRef<HTMLElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const [chipOn, setChipOn] = useState(false);
  useEffect(() => {
    const section = sectionRef.current;
    const result = resultRef.current;
    // The card is taller than a phone screen, so its edges being on screen
    // says nothing about the price — watch the price line itself.
    const priceEl = result?.querySelector<HTMLElement>(".estimator__price");
    if (!section || !result || !priceEl) return;
    let sectionIn = false;
    let priceIn = false;
    const io = new IntersectionObserver(
      (entries) => {
        const vh = window.innerHeight;
        for (const e of entries) {
          const r = e.boundingClientRect;
          if (e.target === section) {
            // "In the section": any meaningful band of it is on screen.
            sectionIn = r.top < vh * 0.8 && r.bottom > vh * 0.2;
          } else {
            // The price sits at the top of the card, so the card counts as
            // visible once its top is comfortably inside the viewport.
            priceIn = r.bottom > vh * 0.1 && r.top < vh * 0.65;
          }
        }
        setChipOn(sectionIn && !priceIn);
      },
      { threshold: [0, 0.2, 0.5, 0.8] },
    );
    io.observe(section);
    io.observe(priceEl);
    return () => io.disconnect();
  }, []);

  return (
    <section id="estimator" ref={sectionRef} className="section section--s estimator estimator--calc">
      {/*
        Phone layout: head, price, controls (newsprint.css orders the flex
        column under 60rem). The price is the product — "et vejledende beløb
        med det samme" — so on a small screen it comes before the form that
        shapes it, within a thumb's reach of the section top. DOM order is
        head → controls → result, which is how a screen reader should meet it.
        The modifier scopes the reorder to this calculator; the service pages'
        quote panel shares estimator__controls/result but its heading belongs
        before its card, so it keeps DOM order.
      */}
      <div className="container grid12">
        <div className="estimator__head">
          <h2>Prisberegner</h2>
          <p className="lead" style={{ marginTop: "var(--space-md)" }}>
            Et vejledende beløb med det samme, så du ikke behøver ringe først. Den endelige pris
            aftaler vi, når vi kender opgaven, og så ligger den fast.
          </p>
        </div>

        <div className="estimator__controls">
          <div>
            <span className="field-label">Hvilket skadedyr?</span>
            <Select
              value={slug}
              onValueChange={(v) => {
                setSelTouched(true);
                if (!nudged.current && extras.length === 0 && v !== slug && fixedPests.some((p) => p.slug === slug) && fixedPests.some((p) => p.slug === v)) {
                  nudged.current = true;
                  setNudge(slug);
                } else setNudge(null);
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
              // The pests without a fixed price are still ours: listed after a
              // "+N" row, and picking one goes to its page for a fixed quote.
              more={{
                label: (n) => `${n} andre skadedyr`,
                hint: "Fast tilbud",
                options: PESTS.filter((p) => !p.priceKey).map((p) => ({
                  value: p.slug,
                  label: p.label,
                  icon: <PestGlyph pest={p} size={22} />,
                })),
                onPick: (v) => window.location.assign(`${import.meta.env.BASE_URL}service/${v}/`),
              }}
            />
          </div>

          {/* Several pests on one visit: the treatments add up, the driving is
              paid once and at half price. */}
          {quote.kind === "fixed" && (
            <div className="estimator__extras">
              {extraPests.length > 0 && (
                <ul className="estimator__extra-list" aria-label="Skadedyr på samme besøg">
                  {extraPests.map((p) => (
                    <li key={p.slug} className="estimator__extra">
                      <PestGlyph pest={p} size={20} />
                      <span>{p.label}</span>
                      <button
                        type="button"
                        aria-label={`Fjern ${p.label}`}
                        onClick={() => {
                          setExtras(extras.filter((s) => s !== p.slug));
                          setExtraCounts(({ [p.slug]: _, ...rest }) => rest);
                          setSelTouched(true);
                        }}
                      >
                        <X size={14} aria-hidden="true" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {/* The pest they just left, offered back as the same kind of
                  text link as driving and neighbours: no box, no new pattern. */}
              {nudgePest && quote.kind === "fixed" ? (
                <button
                  type="button"
                  className="estimator__open"
                  onClick={() => {
                    setExtras([...extras, nudgePest.slug]);
                    setNudge(null);
                    setSelTouched(true);
                  }}
                >
                  <span className="estimator__act">Tilføj {nudgePest.label.toLowerCase()}</span>{" "}
                  <span className="estimator__q">
                    {quote.comboSaving > 0 ? `spar ${dkr(quote.comboSaving)} på kørslen` : "på samme besøg"}
                  </span>
                </button>
              ) : addOpen && addable.length > 0 ? (
                <div className="estimator__add estimator__reveal">
                  <span className="field-label">Flere skadedyr på samme besøg</span>
                  <Select
                    value=""
                    onValueChange={(v) => {
                      setExtras([...extras.filter((s) => s !== slug), v]);
                      setSelTouched(true);
                    }}
                    ariaLabel="Tilføj et skadedyr"
                    placeholder="+ Tilføj et skadedyr"
                    triggerId={ADD_TRIGGER}
                    paper
                    options={addable.map((p) => ({
                      value: p.slug,
                      label: p.label,
                      icon: <PestGlyph pest={p} size={22} />,
                    }))}
                  />
                  <span className="small muted">Én tur ud, og du betaler kun halv kørsel.</span>
                </div>
              ) : (
                addable.length > 0 && (
                  <button type="button" className="estimator__open" onClick={openAdd}>
                    {extraPests.length ? (
                      <span className="estimator__act">Tilføj endnu et skadedyr</span>
                    ) : (
                      <>
                        <span className="estimator__act">Tilføj et skadedyr</span>{" "}
                        <span className="estimator__q">halv kørsel</span>
                      </>
                    )}
                  </button>
                )
              )}
            </div>
          )}

          {/* Driving and neighbours only move a fixed price. A pest that is
              quoted after a visit has no number for them to change.

              Both start as one line of text rather than as fields. The big
              firms (Orkin, Terminix, Rentokil) ask for a postcode before they
              say anything; here the price comes first, and the two things that
              can move it are offered, not demanded. Each opens in place. */}
          {quote.kind === "fixed" && (
            <div className="estimator__where">
              {driveOpen ? (
                <TextField.Root className="estimator__postcode estimator__reveal">
                  <Label htmlFor="estimator-postcode" className="field-label">
                    Postnummer
                  </Label>
                  <Input
                    id="estimator-postcode"
                    // Not name="postcode": Safari keys its contact/password
                    // autofill heuristics on the name token, and every 4-digit
                    // postcode-looking input gets the iCloud autofill bubble
                    // no matter the autocomplete value. A neutral name keeps
                    // the field out of the classifier; verified in Safari.
                    name="nr"
                    inputMode="numeric"
                    autoComplete="off"
                    data-1p-ignore
                    data-lpignore="true"
                    maxLength={4}
                    value={postcode}
                    onChange={(e) => {
                      // Digits only, so a pasted "8800 Viborg" still finds the code.
                      setPostcode(e.target.value.replace(/\D/g, "").slice(0, 4));
                      setSelTouched(true);
                    }}
                    placeholder="fx 8800"
                    className="field"
                    aria-describedby="estimator-driving"
                    aria-invalid={quote.postcodeState === "unknown" ? true : undefined}
                  />
                  {/* The town confirms the postnummer was read right; the
                      driving line already names it when there is a charge. */}
                  <p id="estimator-driving" className="small muted estimator__where-note" aria-live="polite">
                    {quote.place && !quote.driving.includes(quote.place.by) ? `${quote.place.nr} ${quote.place.by}. ` : ""}
                    {quote.driving}
                  </p>
                  <button type="button" className="estimator__open estimator__locate" onClick={locate} disabled={locating}>
                    <LocateFixed size={16} aria-hidden="true" />
                    {locating ? "Finder din placering…" : "Brug min placering"}
                  </button>
                  {locError && (
                    <p className="small muted estimator__where-note" role="status">
                      {locError}
                    </p>
                  )}
                </TextField.Root>
              ) : (
                <button type="button" className="estimator__open" onClick={openDrive}>
                  <span className="estimator__act">Beregn kørsel</span>{" "}
                  <span className="estimator__q">syd og vest for Aarhus</span>
                </button>
              )}

              {neighboursOpen ? (
                <div className="estimator__reveal">
                  <span className="field-label">Antal huse, der går sammen</span>
                  <SegmentTrack value={houses}>
                    <ToggleButtonGroup.Root
                      selectionMode="single"
                      disallowEmptySelection
                      selectedKeys={[houses]}
                      onSelectionChange={(keys) => {
                        const next = [...keys][0];
                        if (next === undefined) return;
                        setHouses(houseTier(Number(next)));
                        setSelTouched(true);
                      }}
                      className={GROUP}
                      aria-label="Antal huse, der går sammen"
                    >
                      {NEIGHBOURS.map((o) => (
                        <ToggleButton key={o.id} id={o.id} className={TOGGLE}>
                          {o.label}
                        </ToggleButton>
                      ))}
                    </ToggleButtonGroup.Root>
                  </SegmentTrack>
                  <p className="small muted estimator__where-note">
                    2 huse: halv kørsel. 5 huse: 80 % rabat på kørslen. 10 huse: en fast,
                    lavere pris pr. hus, uanset kørsel.
                  </p>
                </div>
              ) : (
                <button type="button" className="estimator__open" onClick={() => setNeighboursOpen(true)}>
                  <span className="estimator__act">Se naboprisen</span>{" "}
                  <span className="estimator__q">når I er flere</span>
                </button>
              )}
            </div>
          )}

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
                    {unit
                      ? `${unit === "rum" ? "Antal rum" : "Antal bo"}, boligtype og hvor slemt det er.`
                      : extraUnit
                        ? `${hasArea && !multi ? "Areal, antal" : "Antal"} ${extraUnit}, boligtype og hvor slemt det er.`
                      : multi
                        ? "Kun boligtype — prisen styres af hvor mange I er."
                        : hasArea
                          ? "Areal, boligtype og hvor slemt det er. Ellers regner vi på et gennemsnitligt hus."
                          : "Boligtype og hvor slemt det er."}
                  </span>
                </span>
                <ChevronDown size={20} aria-hidden="true" className="chev" />
              </Disclosure.Trigger>
            </Disclosure.Heading>

            <Disclosure.Content>
              <Disclosure.Body style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)", paddingTop: "var(--space-md)" }}>
                {/* From two houses the tier sets the price and one area cannot
                    describe houses that differ anyway, so the slider steps
                    aside. The state is kept: setting "1" again brings the
                    visitor's own number back. */}
                {/* One size question per pest: rooms or nests where he prices
                    that way, the area only where his price has an area limit.
                    Rooms stay visible with several houses, since the price is
                    per room in each house. */}
                {unit && (
                  <CountStepper unit={unit} label={unit === "rum" ? "Antal rum" : "Antal bo"} count={count} onChange={(n) => {
                    setCount(n);
                    setSelTouched(true);
                  }} />
                )}
                {!multi && hasArea && (
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
                )}
                {/* Added pests priced per room or nest get the same stepper, so
                    "1 bo" is something the visitor set, not something we assumed. */}
                {countedExtras.map(({ pest: p, unit: u }) => (
                  <CountStepper
                    key={p.slug}
                    unit={u}
                    label={`${u === "rum" ? "Antal rum" : "Antal bo"}, ${p.label.toLowerCase()}`}
                    count={extraCounts[p.slug] ?? 1}
                    onChange={(n) => {
                      setExtraCounts({ ...extraCounts, [p.slug]: n });
                      setSelTouched(true);
                    }}
                  />
                ))}

                <div>
                  <span className="field-label">Ejendomstype</span>
                  <SegmentTrack value={property}>
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
                  </SegmentTrack>
                </div>

                {/* Severity shapes the one-house copy, but with several houses
                    the tier drives the price and a single grade cannot speak
                    for all of them — hidden like the area, state preserved. */}
                {!multi && (
                <div>
                  <span className="field-label">Grad af angreb</span>
                  <SegmentTrack value={severity}>
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
                  </SegmentTrack>
                  <p className="small muted" style={{ marginTop: "var(--space-xs)" }} aria-live="polite">
                    {severityHint}
                  </p>
                </div>
                )}

                {/* Always in the layout, only visible once there is something to
                    reset: appearing on the first change made the whole
                    calculator 47px taller and everything below it jump. */}
                <button
                  type="button"
                  onClick={reset}
                  className="estimator__reset"
                  disabled={!touched}
                  aria-hidden={!touched || undefined}
                  tabIndex={touched ? undefined : -1}
                  style={touched ? undefined : { visibility: "hidden" }}
                >
                  <RotateCcw size={15} strokeWidth={2} aria-hidden="true" />
                  Nulstil til standard
                </button>
              </Disclosure.Body>
            </Disclosure.Content>
          </Disclosure.Root>
          )}
        </div>

        <div className="estimator__result" ref={resultRef} aria-live="polite">
          {/*
            The pest name is what people reach for when they want a different
            pest, so it opens the picker rather than just reporting state.
            ponytail: driven by focus+click on the trigger — react-aria exposes
            no imperative "open" on Select.
          */}
          {/* The label sits above as its own line, flush with the price, so the
              button is one tight row: icon, name, chevron. */}
          <div className="estimator__pick-wrap">
          <span className="select-none small muted">Vejledende pris</span>
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById(PEST_TRIGGER);
              if (!el) return;
              // Below 40rem the picker is a bottom sheet pinned to the visual
              // viewport, so it looks identical no matter which trigger opened
              // it or where that trigger sits — the scroll below would only
              // yank the page. (Match Select.tsx's sheet breakpoint.)
              const sheet = window.matchMedia("(max-width: 40rem)").matches;
              if (sheet) {
                el.focus({ preventScroll: true });
                el.click();
                return;
              }
              // The list is placed under the trigger when it opens and does not
              // follow it afterwards, so it may only open once the page has
              // stopped moving. Already in view: open at once. Otherwise scroll
              // there first and open when the scroll has settled.
              const open = () => {
                el.focus({ preventScroll: true });
                el.click();
              };
              const r = el.getBoundingClientRect();
              if (r.top >= 0 && r.bottom <= window.innerHeight) return open();
              const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
              if (reduced) {
                el.scrollIntoView({ block: "start" });
                return open();
              }
              // Wait until the page has held still for a few frames: scrollend
              // is missing in older Safari, and a fixed timeout fires mid-scroll
              // on a long way down. Capped, so the list always opens.
              const started = performance.now();
              let lastY = -1;
              let still = 0;
              const settle = () => {
                still = window.scrollY === lastY ? still + 1 : 0;
                lastY = window.scrollY;
                if (still >= 4 || performance.now() - started > 1500) return open();
                requestAnimationFrame(settle);
              };
              requestAnimationFrame(settle);
              // Near the top (scroll-margin clears the sticky header), so the
              // list has room to open downwards instead of flipping up over it.
              el.scrollIntoView({ block: "start", behavior: "smooth" });
            }}
            className="estimator__pick"
          >
            <PestGlyph pest={pest} size={28} />
            <span className="trigger-title">{pest.label}</span>
            <ChevronDown size={16} aria-hidden="true" />
          </button>
          </div>

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
                  {/* Without a postnummer the number is the Aarhus price, so it
                      says driving may come on top, and the note itself takes the
                      visitor to the field that works it out. */}
                  {quote.postcodeState !== "ok" && (
                    <button
                      type="button"
                      className="estimator__drive-link"
                      onClick={openDrive}
                    >
                      + kørsel
                    </button>
                  )}
                </p>
                {quote.houses > 1 && (
                  <p className="small" data-testid="group-total">
                    pr. hus, {dkr(quote.total)} i alt for {quote.houses} huse
                    {quote.soloPrice > quote.price && (
                      <> · Hver sparer {dkr(quote.soloPrice - quote.price)}</>
                    )}
                  </p>
                )}
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

      {/*
        Phone-only companion (visibility from the observer above): chosen
        pest, live price and a CTA while the controls are in use. The open
        picker's scrim (z 390) covers this (z 380), so they never compete.
        tabIndex keeps the hidden bar out of the tab order; the strings
        repeat the result card, so no live region here.
      */}
      <div className={`estimator__chip${chipOn ? " is-on" : ""}`}>
        <div className="estimator__chip-row">
          <span className="estimator__chip-glyph" aria-hidden="true">
            <PestGlyph pest={pest} size={20} />
          </span>
          <span className="estimator__chip-pest" title={pest.label}>
            {pest.label}
          </span>
          <a
            href={homeHref(CONTACT_HREF)}
            className="btn btn--primary estimator__chip-cta"
            tabIndex={chipOn ? 0 : -1}
          >
            Skriv til os
          </a>
        </div>
        <span className="estimator__chip-price">
          {quote.kind === "fixed" ? (
            <>
              {quote.overArea && "Fra "}
              {dkr(display)}
              {quote.postcodeState !== "ok" && <span className="estimator__chip-drive"> + kørsel</span>}
            </>
          ) : quote.inspection ? (
            dkr(quote.inspection.price)
          ) : (
            "Fast pris efter en kort snak"
          )}
        </span>
      </div>
    </section>
  );
}

/** Rooms or nests, for the pests he prices that way: the main pest and every added one. */
function CountStepper({ unit, label, count, onChange }: { unit: "rum" | "bo"; label: string; count: number; onChange: (n: number) => void }) {
  // Which way the number rolls: up for more, down for fewer.
  const dir = useRef<"up" | "down">("up");
  const step = (n: number) => {
    dir.current = n > count ? "up" : "down";
    onChange(n);
  };
  return (
    <div className="area-row">
      <span>
        <span className="field-label" style={{ marginBottom: 0 }}>
          {label}
        </span>
        {/* Keyed on the wording, so the 10 → 10+ switch animates in. */}
        <span key={count > 10 ? "over" : "per"} className="small muted text-swap">
          {count > 10
            ? `Prisen viser 10 ${unit}, resten aftaler vi.`
            : unit === "rum"
              ? "Prisen er pr. rum, der skal behandles."
              : "Hvert ekstra bo koster 400 kr. oveni."}
        </span>
      </span>
      {/* ponytail: 11 means "10+", priced as 10 since the list stops there. */}
      <div className="area-field stepper" role="group" aria-label={label}>
        <button type="button" aria-label="Færre" disabled={count <= 1} onClick={() => step(count - 1)}>
          <Minus size={16} aria-hidden="true" />
        </button>
        <output aria-live="polite">
          {/* Keyed, so each new number mounts and rolls in. */}
          <b key={count} className="stepper__num" data-dir={dir.current}>
            {count > 10 ? "10+" : count}
          </b>{" "}
          <span>{unit}</span>
        </output>
        <button type="button" aria-label="Flere" disabled={count > 10} onClick={() => step(count + 1)}>
          <Plus size={16} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
