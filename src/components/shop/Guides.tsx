import { ArrowRight } from "lucide-react";
import { NUDGE, proLinkFor } from "../../lib/shopContent";
import { PEST_LABEL } from "../../lib/shop";

const BASE = import.meta.env.BASE_URL;

/**
 * Vidensstribe mellem karrusellerne.
 *
 * Teksten er hans egen fra NUDGE. Der er ikke skrevet ny "SEO-tekst" til
 * lejligheden: de tre afsnit stod der i forvejen, fordi de er rigtige, og
 * det er ogsaa dem, der er vaerd at blive fundet paa.
 *
 * Rottekortet peger paa fagmanden i stedet for paa en varekategori. Det er
 * ikke en salgsknap, der er sat ind: rotter er anmeldepligtige, og gift maa
 * kun laegges ud med autorisation, saa "se varerne" ville vaere forkert.
 */
const KORT = [
  {
    pest: "mus" as const,
    img: "guide-loft.webp",
    alt: "Lyst loftrum med synlige spær og ovenlys",
    href: `${BASE}shop/produkter/?dyr=mus`,
    cta: "Se fælder og sikringer",
  },
  {
    pest: "hvepse" as const,
    img: "guide-tag.webp",
    alt: "Gavl med tagudhæng og tagrende mod en lys himmel",
    href: `${BASE}shop/produkter/?dyr=hvepse`,
    cta: "Se hvepsemidler",
  },
  {
    pest: "rotter" as const,
    img: "hero.webp",
    alt: "Skadedyrsbekæmper i heldragt på arbejde indendørs",
    href: proLinkFor("rotter"),
    cta: "Skriv til os om rotter",
  },
];

export default function Guides() {
  return (
    <section aria-labelledby="vaerd-at-vide" className="border-y border-ink-200 bg-white">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 py-14 sm:py-20">
        <h2
          id="vaerd-at-vide"
          className="font-display text-2xl sm:text-[30px] font-bold tracking-tight text-ink-950"
        >
          Værd at vide, før du køber
        </h2>
        <p className="select-none mt-2 mb-6 max-w-[62ch] text-ink-700 leading-relaxed">
          Det, vi oftest bliver ringet op om, når midlet ikke gjorde det, folk håbede.
        </p>

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 list-none p-0 m-0">
          {KORT.map(({ pest, img, alt, href, cta }) => {
            const n = NUDGE[pest];
            if (!n) return null;
            return (
              <li key={pest} className="flex">
                <article className="group flex flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white transition-[border-color,transform] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 hover:border-ink-400">
                  <div className="relative aspect-[4/3] bg-ink-100">
                    <img
                      src={`${BASE}${img}`}
                      alt={alt}
                      width={900}
                      height={675}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-2.5 p-5">
                    <p className="select-none text-[13px] font-semibold text-ink-600 m-0">
                      {PEST_LABEL[pest]}
                    </p>
                    <h3 className="font-display text-lg font-bold leading-snug text-ink-950 m-0">
                      {n.title}
                    </h3>
                    <p className="text-[15px] text-ink-700 leading-relaxed m-0">{n.body}</p>
                    <a
                      href={href}
                      className="mt-auto pt-2 inline-flex items-center gap-2 font-semibold text-ink-950 underline underline-offset-4 decoration-ink-400 hover:decoration-ink-950"
                    >
                      {cta}
                      <ArrowRight
                        size={16}
                        strokeWidth={2.5}
                        aria-hidden="true"
                        className="transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5"
                      />
                    </a>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
