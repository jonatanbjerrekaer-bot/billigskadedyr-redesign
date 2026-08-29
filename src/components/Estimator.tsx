import { useEffect, useRef, useState } from "react";
import { estimate, dkr, PRICE_TABLE } from "../lib/pricing";
import type { PropertyType, Severity } from "../lib/pricing";

const PESTS = PRICE_TABLE.map((r) => r.pest);

export default function Estimator() {
  const [pest, setPest] = useState(PESTS[0]);
  const [m2, setM2] = useState(100);
  const [property, setProperty] = useState<PropertyType>("lejlighed");
  const [severity, setSeverity] = useState<Severity>("normal");
  const [displayLow, setDisplayLow] = useState(0);
  const [displayHigh, setDisplayHigh] = useState(0);
  const rafRef = useRef<number | null>(null);

  const { low, high } = estimate(pest, m2, property, severity);

  // Animate numbers toward target (simple tween; respects reduced motion via CSS-independent guard)
  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplayLow(low);
      setDisplayHigh(high);
      return;
    }
    const fromLow = displayLow;
    const fromHigh = displayHigh;
    const start = performance.now();
    const duration = 400;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplayLow(Math.round(fromLow + (low - fromLow) * eased));
      setDisplayHigh(Math.round(fromHigh + (high - fromHigh) * eased));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // ponytail: deps intentionally limited to outputs
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [low, high]);

  return (
    <section id="estimator" className="bg-forest-900 text-cream py-16">
      <div className="max-w-4xl mx-auto px-5 flex flex-wrap gap-10">
        <div className="flex flex-col gap-5" style={{ flexBasis: "320px", flexGrow: 1, flexShrink: 1, maxWidth: "100%" }}>
          <h2 className="font-display text-3xl font-bold tracking-tight uppercase">
            Priskalkulator
          </h2>
          <p className="text-sm text-forest-100/80">
            Vejledende prisoverslag. Du får en fast pris efter en kort snak.
          </p>

          <label className="flex flex-col gap-1.5 text-sm font-medium">
            Skadedyr
            <select
              value={pest}
              onChange={(e) => setPest(e.target.value)}
              className="bg-forest-800 border border-forest-700 rounded-lg px-3 py-3 text-cream focus:outline-none focus:ring-2 focus:ring-accent-500 min-h-[44px]"
            >
              {PESTS.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1.5 text-sm font-medium">
            <span className="flex items-center justify-between">
              <span>Størrelse af område</span>
              <span className="tabular-nums text-accent-400 font-bold">{m2} m²</span>
            </span>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={20}
                max={400}
                step={5}
                value={m2}
                onChange={(e) => setM2(Number(e.target.value))}
                aria-label="Størrelse af område i kvadratmeter"
                className="w-full accent-accent-500 h-2"
              />
              <input
                type="number"
                min={20}
                max={400}
                value={m2}
                onChange={(e) => setM2(Math.max(20, Math.min(400, Number(e.target.value) || 20)))}
                aria-label="Størrelse af område i kvadratmeter"
                className="w-20 bg-forest-800 border border-forest-700 rounded-lg px-2 py-3 text-cream text-sm focus:outline-none focus:ring-2 focus:ring-accent-500"
              />
            </div>
          </label>

          <div>
            <span className="block text-sm font-medium mb-1.5">Ejendomstype</span>
            <div className="flex gap-2" role="radiogroup" aria-label="Ejendomstype">
              {[
                { id: "lejlighed", label: "Lejlighed" },
                { id: "hus", label: "Hus" },
                { id: "erhverv", label: "Erhverv" },
              ].map((o) => (
                <button
                  key={o.id}
                  role="radio"
                  aria-checked={property === o.id}
                  onClick={() => setProperty(o.id as PropertyType)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium min-h-[44px] transition-colors ${
                    property === o.id
                      ? "bg-accent-500 text-white"
                      : "bg-forest-800 text-forest-100 hover:bg-forest-700"
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="block text-sm font-medium mb-1.5">Grad</span>
            <div className="flex gap-2" role="radiogroup" aria-label="Grad af skadedyr">
              {[
                { id: "let", label: "Let" },
                { id: "normal", label: "Normal" },
                { id: "kraftig", label: "Kraftig" },
              ].map((o) => (
                <button
                  key={o.id}
                  role="radio"
                  aria-checked={severity === o.id}
                  onClick={() => setSeverity(o.id as Severity)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium min-h-[44px] transition-colors ${
                    severity === o.id
                      ? "bg-accent-500 text-white"
                      : "bg-forest-800 text-forest-100 hover:bg-forest-700"
                  }`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div
          className="flex flex-col gap-4 bg-forest-800 rounded-2xl p-6 min-h-[320px]"
          style={{ flexBasis: "300px", flexGrow: 1, flexShrink: 1, maxWidth: "100%" }}
          aria-live="polite"
        >
          <span className="text-xs uppercase tracking-widest text-forest-100/70">
            Vejledende prisoverslag
          </span>
          <div className="font-display text-4xl font-bold text-accent-400 tabular-nums">
            ca. {dkr(displayLow)} – {dkr(displayHigh)}
          </div>
          <ul className="text-sm text-forest-100/90 flex flex-col gap-2">
            <li>✓ Befaling og besøg</li>
            <li>✓ Behandling af det angrebne område</li>
            <li>✓ Opfølgning og dokumentation</li>
            <li>✓ Garanti på behandlingen</li>
          </ul>
          <p className="text-xs text-forest-100/60">
            Tid til løsning: typisk 1–2 besøg. Fast pris efter kort telefonmøde.
          </p>
          <a
            href="tel:+4524245583"
            className="mt-auto bg-accent-500 text-white font-semibold rounded-lg py-3.5 px-4 text-center min-h-[44px] flex items-center justify-center hover:bg-accent-400 transition-colors"
          >
            Få et uforpligtende tilbud
          </a>
        </div>
      </div>
    </section>
  );
}
