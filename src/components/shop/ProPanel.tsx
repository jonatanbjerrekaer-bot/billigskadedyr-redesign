import { ArrowRight, Phone } from "lucide-react";
import { PEST_LABEL, type PestKey } from "../../lib/shop";
import { NUDGE, proLinkFor } from "../../lib/shopContent";
import Notice from "./Notice";

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
 * Alvoren ligger i stregen i venstre kant, ikke i en tonet flade. Rød er
 * "det er farligt eller ulovligt", gul er "det er sværere, end det ser ud".
 * Den forrige udgave var en gul kasse med gul ramme og et versalt
 * "VÆRD AT VIDE FØRST" ovenover, og den slags etiket er kun en etiket:
 * overskriften siger allerede, hvad der er på spil.
 */
export default function ProPanel({ pest, compact }: { pest: PestKey; compact?: boolean }) {
  const n = NUDGE[pest];
  if (!n) return null;

  const href = proLinkFor(pest);

  return (
    <Notice
      tone={n.level === "ulovligt" || n.level === "farligt" ? "krav" : "advarsel"}
      title={n.title}
      className={compact ? "" : "py-2"}
      actions={
        <>
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
        </>
      }
    >
      {n.body}
    </Notice>
  );
}
