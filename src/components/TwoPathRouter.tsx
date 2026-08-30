import { useState } from "react";
import { HardHat, ShoppingCart } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Cta, { MAILTO } from "./ui/Cta";

/**
 * ponytail: plain buttons in a radiogroup, NOT HeroUI's ToggleButton.
 * ToggleButton styles itself as a compact control — it forces its own inline
 * flex layout on the children, which collapsed these content cards into
 * overlapping text. HeroUI is the right call for the calculator's small
 * controls; a 320px card with a heading and three lines is not what it is for.
 * The radiogroup roles below give the same keyboard and screen-reader
 * behaviour without fighting the component's own styling.
 */
const PATHS: {
  id: string;
  title: string;
  desc: string;
  price: string;
  time: string;
  Icon: LucideIcon;
}[] = [
  {
    id: "diy",
    title: "Klar det selv",
    desc: "De rigtige fælder og midler til lige dit skadedyr, med en vejledning der er til at følge.",
    price: "Fra 19,00 kr.",
    time: "Sendes fra dag til dag",
    Icon: ShoppingCart,
  },
  {
    id: "pro",
    title: "Få en professionel ud",
    desc: "Vi kommer ud, behandler og dokumenterer. Bedst når det er vendt tilbage mere end én gang.",
    price: "Vejledende fra 1.800 kr.",
    time: "Typisk 1-2 besøg",
    Icon: HardHat,
  },
];

export default function TwoPathRouter() {
  const [active, setActive] = useState("diy");

  return (
    <section id="router" className="bg-ink-950 text-cream">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-14">
        <h2 className="font-display text-3xl font-bold tracking-tight uppercase text-center mb-8">
          Hvordan vil du tackle det?
        </h2>
        <div
          className="flex flex-wrap gap-6 justify-center"
          role="radiogroup"
          aria-label="Hvordan vil du tackle det?"
        >
          {PATHS.map((p) => {
            const isActive = active === p.id;
            return (
              // Selection is marked with a lime edge, not a lime fill: a fully
              // saturated card reads discount rather than professional.
              <button
                key={p.id}
                type="button"
                role="radio"
                aria-checked={isActive}
                onClick={() => setActive(p.id)}
                className={`text-left rounded-2xl border-2 p-6 transition-all w-full sm:w-[320px] ${
                  isActive
                    ? "bg-ink-800 border-accent-500 ring-1 ring-accent-500/40"
                    : "bg-ink-900 border-ink-700 hover:border-ink-600"
                }`}
              >
                <span
                  className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 transition-colors ${
                    isActive ? "bg-accent-500 text-ink-950" : "bg-ink-800 text-accent-400"
                  }`}
                >
                  <p.Icon size={24} strokeWidth={2} aria-hidden="true" />
                </span>
                <span className="block font-display text-2xl font-bold">{p.title}</span>
                <span className="block mt-2 text-sm text-ink-100/80">{p.desc}</span>
                <span className="block mt-4 font-semibold">{p.price}</span>
                <span className="block text-xs text-ink-100/60">{p.time}</span>
              </button>
            );
          })}
        </div>
        <div className="flex justify-center mt-8">
          <Cta href={active === "diy" ? "#shop" : MAILTO}>
            {active === "diy" ? "Se produkter" : "Få et uforpligtende tilbud"}
          </Cta>
        </div>
      </div>
    </section>
  );
}
