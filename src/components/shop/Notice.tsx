import type { ReactNode } from "react";
import { AlertTriangle, Info, ShieldAlert } from "lucide-react";

/**
 * En besked, der skal læses, men ikke råbes.
 *
 * Den forrige udgave var en tonet ballon: gul flade, gul 2 px ramme hele
 * vejen rundt, afrundede hjørner, og et versalt "VÆRD AT VIDE FØRST" med
 * spærret skrift over overskriften. Det er sådan en maskine tegner en
 * advarsel. Tre af dem på samme side gør siden stribet, og når alt er
 * fremhævet, er intet fremhævet.
 *
 * Her er alvoren flyttet til en streg i venstre kant og til ikonet. Fladen
 * er sidens egen. Det er den måde, en trykt bog markerer en note i margen
 * på, og den skalerer: fem noter under hinanden ser stadig ud som tekst med
 * noter i, ikke som fem plakater.
 *
 * Versalerne er væk. Overskriften siger selv, hvad det handler om, og en
 * etiket, der gentager det med spærret skrift, er en etiket for etikettens
 * skyld.
 */

export type NoticeTone = "info" | "advarsel" | "krav";

const TONE: Record<NoticeTone, { rule: string; icon: string; Icon: typeof Info }> = {
  // Blæk, ikke farve: en note, der bare er værd at vide, skal ikke gøre
  // krav på det samme blik som et lovkrav.
  info: { rule: "border-ink-400", icon: "text-ink-500", Icon: Info },
  advarsel: { rule: "border-amber-600", icon: "text-amber-700", Icon: AlertTriangle },
  krav: { rule: "border-red-700", icon: "text-red-800", Icon: ShieldAlert },
};

export default function Notice({
  tone = "info",
  title,
  children,
  actions,
  className = "",
}: {
  tone?: NoticeTone;
  title?: string;
  children: ReactNode;
  actions?: ReactNode;
  className?: string;
}) {
  const t = TONE[tone];
  const { Icon } = t;

  return (
    <div
      className={`border-l-[3px] ${t.rule} pl-4 sm:pl-5 py-1 ${className}`}
      // Kun det, der er et krav, skal afbryde en skærmlæser. Resten er
      // noget, man læser, når man når dertil.
      role={tone === "krav" ? "note" : undefined}
    >
      {title ? (
        <p className="flex items-start gap-2 font-display font-bold text-ink-950 leading-snug m-0">
          <Icon size={18} strokeWidth={2.5} aria-hidden="true" className={`${t.icon} shrink-0 mt-0.5`} />
          {title}
        </p>
      ) : null}

      <div
        className={`text-[15px] text-ink-800 leading-relaxed ${title ? "mt-1.5" : ""}`}
      >
        {title ? (
          children
        ) : (
          <span className="flex items-start gap-2">
            <Icon size={18} strokeWidth={2.5} aria-hidden="true" className={`${t.icon} shrink-0 mt-0.5`} />
            <span>{children}</span>
          </span>
        )}
      </div>

      {actions ? <div className="mt-4 flex flex-wrap gap-2.5">{actions}</div> : null}
    </div>
  );
}
