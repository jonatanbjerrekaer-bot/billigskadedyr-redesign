import { ArrowRight } from "lucide-react";
import { BY_SLUG, type Product } from "../../lib/shop";
import { SEASON } from "../../lib/shopContent";
import ProductCard from "./ProductCard";

const BASE = import.meta.env.BASE_URL;

/**
 * Hvilken aarstid staar vi i? Listen er hans, men logikken er kalenderen,
 * ikke en kampagne.
 */
export function seasonNow(now = new Date()) {
  const m = now.getMonth() + 1;
  return SEASON.find((s) => s.months.includes(m)) ?? SEASON[0]!;
}

/**
 * Saesonvarerne.
 *
 * Staar to steder: paa forsiden med seks varer, og nederst paa en
 * produktside med tre. Det er den samme komponent begge steder, saa de ikke
 * kan naa at drive fra hinanden, naar den ene bliver rettet.
 *
 * "undtag" er varer, siden allerede viser. Paa en produktside er det varen
 * selv og de fire i raekken ovenover. At anbefale nogen den side, de staar
 * paa, er ikke en anbefaling, og den samme vare to gange under hinanden
 * ligner en fejl.
 */
export default function SeasonRow({
  antal = 6,
  undtag = [],
  priority,
  className = "",
}: {
  antal?: number;
  undtag?: string[];
  priority?: boolean;
  className?: string;
}) {
  const season = seasonNow();
  const items = season.slugs
    .filter((s) => !undtag.includes(s))
    .map((s) => BY_SLUG.get(s))
    .filter((x): x is Product => x != null)
    .slice(0, antal);

  if (items.length === 0) return null;

  return (
    <section aria-labelledby="saeson" className={className}>
      <div className="max-w-[77.5rem] mx-auto px-5 sm:px-8">
        <div className="max-w-[62ch]">
          <h2
            id="saeson"
            className="font-display text-2xl sm:text-[1.875rem] font-bold tracking-tight text-ink-950 m-0"
          >
            {season.heading}
          </h2>
          <p className="select-none mt-2 mb-8 text-ink-700 leading-relaxed m-0">{season.note}</p>
        </div>

        {/* Alle varer synlige paa én gang. Baymard: en statisk sektion saelger
            lige saa godt som en karrusel, og ingen skal rulle for at se den
            sidste. Tilbud er stedet, hvor der rulles. */}
        <ul className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 list-none p-0 m-0">
          {items.map((x, i) => (
            <li key={x.slug} className="flex">
              <ProductCard p={x} priority={priority === true && i < 3} />
            </li>
          ))}
        </ul>

        <a
          href={`${BASE}shop/produkter/`}
          className="mt-8 inline-flex items-center gap-2 font-semibold text-ink-950 underline underline-offset-4 decoration-ink-300 hover:decoration-ink-950"
        >
          Se alle varer
          <ArrowRight size={16} strokeWidth={2.5} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
