import { useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * En række varer, man kan rulle igennem.
 *
 * Den ruller med scroll-snap, ikke med JavaScript-animation, så et swipe på
 * en telefon opfører sig, som telefonen plejer. Pilene findes for musen, og
 * de er store nok til at ramme. De skjules på telefon, hvor de ville stjæle
 * plads fra det, de peger på.
 *
 * Ingen automatisk rotation. Et karrusel-slide, der forsvinder af sig selv,
 * mens man læser det, er en af de mest velbeskrevne måder at irritere folk
 * på, og det rammer hårdest hos dem, der læser langsomt.
 */
export default function Carousel({
  id,
  heading,
  note,
  href,
  hrefLabel = "Se alle",
  children,
  count,
}: {
  id: string;
  heading: string;
  note?: string;
  href?: string;
  hrefLabel?: string;
  children: ReactNode;
  count: number;
}) {
  const track = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  function onScroll() {
    const el = track.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  }

  function nudge(dir: 1 | -1) {
    const el = track.current;
    if (!el) return;
    // Rul en hel kortbredde, så et kort aldrig ender halvt afskåret.
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 16 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * step * 2, behavior: "smooth" });
  }

  if (count === 0) return null;

  return (
    <section aria-labelledby={id} className="py-8 sm:py-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6">
        <div className="flex items-end justify-between gap-4 mb-1">
          <h2 id={id} className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-ink-950">
            {heading}
          </h2>
          <div className="flex items-center gap-2 shrink-0">
            {href && (
              <a href={href} className="hidden sm:inline text-sm font-semibold text-ink-700 hover:text-ink-950 underline underline-offset-4">
                {hrefLabel}
              </a>
            )}
            <div className="hidden md:flex gap-1.5">
              <button
                type="button"
                onClick={() => nudge(-1)}
                disabled={atStart}
                aria-label="Rul tilbage"
                className="grid place-items-center w-11 h-11 rounded-full border border-ink-300 text-ink-950 hover:bg-ink-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
              >
                <ChevronLeft size={20} strokeWidth={2.5} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => nudge(1)}
                disabled={atEnd}
                aria-label="Rul frem"
                className="grid place-items-center w-11 h-11 rounded-full border border-ink-300 text-ink-950 hover:bg-ink-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
              >
                <ChevronRight size={20} strokeWidth={2.5} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
        {note && <p className="select-none text-ink-700 mb-5 max-w-2xl">{note}</p>}

        <ul
          ref={track}
          onScroll={onScroll}
          className="flex items-start gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 list-none m-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {children}
        </ul>

        {href && (
          <a href={href} className="sm:hidden mt-4 inline-block text-sm font-semibold text-ink-950 underline underline-offset-4">
            {hrefLabel}
          </a>
        )}
      </div>
    </section>
  );
}

export function CarouselItem({ children }: { children: ReactNode }) {
  return (
    <li className="snap-start shrink-0 w-[calc(75%-0.5rem)] sm:w-[240px] lg:w-[264px]">
      {children}
    </li>
  );
}
