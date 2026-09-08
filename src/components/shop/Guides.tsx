import { ArrowRight } from "lucide-react";
import { NUDGE, proLinkFor } from "../../lib/shopContent";

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
    cta: "Se fælder og sikringer mod mus",
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
  const [stor, ...smaa] = KORT;
  return (
    <section aria-labelledby="vaerd-at-vide" className="border-y border-ink-200 bg-white">
      <div className="max-w-[77.5rem] mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <h2
          id="vaerd-at-vide"
          className="font-display text-2xl sm:text-[1.875rem] font-bold tracking-tight text-ink-950 m-0"
        >
          Værd at vide, før du køber
        </h2>
        <p className="select-none mt-2 mb-8 max-w-[62ch] text-ink-700 leading-relaxed m-0">
          Det, folk ringer om, når midlet ikke gjorde det, de havde regnet med.
        </p>

        {/* Ét stort kort og to smaa paa tvaers. Tre ens kort paa en raekke er
            den form, alle genkender som skabelon; her har mus, den stoerste
            kategori, ogsaa den stoerste plads. Ingen etiket over
            overskriften: linket siger, hvilket dyr det handler om. */}
        <div className="grid gap-5 lg:grid-cols-12 lg:gap-6">
          <article className="group flex flex-col overflow-hidden rounded-2xl border border-ink-200 bg-white transition-[border-color] duration-200 hover:border-ink-950 lg:col-span-7">
            <div className="relative aspect-[4/3] bg-ink-100">
              <img
                src={`${BASE}${stor.img}`}
                alt={stor.alt}
                width={900}
                height={675}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col gap-3 p-6 sm:p-7">
              <h3 className="font-display text-xl sm:text-2xl font-bold leading-snug tracking-tight text-ink-950 m-0">
                {NUDGE[stor.pest]?.title}
              </h3>
              <p className="max-w-[60ch] text-[0.9375rem] text-ink-700 leading-relaxed m-0">{NUDGE[stor.pest]?.body}</p>
              <Link href={stor.href}>{stor.cta}</Link>
            </div>
          </article>

          <div className="flex flex-col gap-5 lg:col-span-5 lg:gap-6">
            {smaa.map(({ pest, img, alt, href, cta }) => {
              const n = NUDGE[pest];
              if (!n) return null;
              return (
                <article
                  key={pest}
                  className="group grid grid-cols-[38%_1fr] flex-1 overflow-hidden rounded-2xl border border-ink-200 bg-white transition-[border-color] duration-200 hover:border-ink-950"
                >
                  <div className="relative min-h-[11rem] bg-ink-100">
                    <img
                      src={`${BASE}${img}`}
                      alt={alt}
                      width={900}
                      height={675}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-2 p-5">
                    <h3 className="font-display text-lg font-bold leading-snug text-ink-950 m-0">{n.title}</h3>
                    <p className="text-[0.9375rem] text-ink-700 leading-relaxed m-0">{n.body}</p>
                    <Link href={href}>{cta}</Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Link({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      className="mt-auto pt-2 inline-flex items-center gap-2 font-semibold text-ink-950 underline underline-offset-4 decoration-ink-300 hover:decoration-ink-950"
    >
      {children}
      <ArrowRight
        size={16}
        strokeWidth={2.5}
        aria-hidden="true"
        className="transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5"
      />
    </a>
  );
}
