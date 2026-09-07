import { ArrowRight, Phone, ShieldAlert } from "lucide-react";
import { PEST_LABEL, type PestKey } from "../../lib/shop";
import { NUDGE, proLinkFor } from "../../lib/shopContent";

const TEL = "tel:+4524245583";

/**
 * Broen fra butikken til fagmanden.
 *
 * Det her er stedet, hvor butikken siger noget imod sig selv, og det er
 * med vilje. En kunde, der køber det forkerte, kommer ikke igen; en kunde,
 * der bliver sendt det rigtige sted hen, husker det. Panelet sælger ikke
 * imod varen, det afgrænser den: varen virker på den opgave, den er lavet
 * til, og her er den opgave, den ikke er lavet til.
 *
 * Farven følger alvoren. Gul er "det er sværere, end det ser ud". Rød er
 * "det er farligt eller ulovligt", og den bruges kun til hvepsebo i højden
 * og til rottegift, hvor der er en regel, ikke bare et godt råd.
 */
export default function ProPanel({ pest, compact }: { pest: PestKey; compact?: boolean }) {
  const n = NUDGE[pest];
  if (!n) return null;

  const alarm = n.level !== "svaert";
  const href = proLinkFor(pest);

  return (
    <aside
      className={`rounded-2xl border-2 ${
        alarm ? "border-red-300 bg-red-50" : "border-amber-300 bg-amber-50"
      } ${compact ? "p-4 sm:p-5" : "p-5 sm:p-7"}`}
    >
      <p className="select-none flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest mb-2">
        <ShieldAlert
          size={15}
          strokeWidth={2.75}
          aria-hidden="true"
          className={alarm ? "text-red-700" : "text-amber-700"}
        />
        <span className={alarm ? "text-red-800" : "text-amber-800"}>
          {n.level === "ulovligt" ? "Krav, ikke råd" : n.level === "farligt" ? "Pas på her" : "Værd at vide først"}
        </span>
      </p>

      <h3
        className={`font-display font-bold text-ink-950 leading-tight ${
          compact ? "text-lg" : "text-xl sm:text-2xl"
        }`}
      >
        {n.title}
      </h3>
      <p className="mt-2 text-ink-800 leading-relaxed text-[15px]">{n.body}</p>

      <div className="mt-5 flex flex-col sm:flex-row gap-2.5">
        <a
          href={href}
          className="press inline-flex items-center justify-center gap-2 rounded-full bg-ink-950 text-cream font-display font-bold min-h-[48px] px-6 hover:bg-ink-800 transition-colors"
        >
          Lad os klare {PEST_LABEL[pest].toLowerCase()}
          <ArrowRight size={17} strokeWidth={2.5} aria-hidden="true" />
        </a>
        <a
          href={TEL}
          className="press inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink-950 text-ink-950 font-display font-bold min-h-[48px] px-6 hover:bg-ink-950 hover:text-cream transition-colors"
        >
          <Phone size={17} strokeWidth={2.5} aria-hidden="true" />
          Ring 24 24 55 83
        </a>
      </div>
    </aside>
  );
}
