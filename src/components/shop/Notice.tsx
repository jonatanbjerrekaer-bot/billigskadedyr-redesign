import type { ReactNode } from "react";

/**
 * En besked fra ham, der rykker ud.
 *
 * To forsøg er gået galt her, og begge på samme måde: jeg gav beskeden et
 * møbel at bo i. Først en tonet ballon med gul ramme hele vejen rundt og et
 * versalt "VÆRD AT VIDE FØRST" ovenover. Så en orange streg i venstre kant.
 * Stregen var mindre, men den var stadig et skilt, og den gjorde tre ting
 * forkert:
 *
 *   Linjelængden. Teksten løb hele containerens bredde. På varelisten er
 *   det 2000 px, altså 180 tegn på en linje. Ingen sætter tekst sådan i
 *   hånden; det sker kun, når ingen har set på det.
 *
 *   Farven. Orange findes ikke i paletten. Den var lånt fra begrebet
 *   "advarsel", ikke fra siden, og en farve, der kun betyder "system",
 *   ser ud som noget systemet har skrevet.
 *
 *   Ikonet. En advarselstrekant er det mest generiske tegn, der findes.
 *
 * Det her er ikke en systemadvarsel. Det er en håndværker, der siger noget
 * imod sit eget salg: fælden tager de mus, der er inde nu, men den gør
 * ikke noget ved hullet. Den slags skal se ud som en bemærkning i en tekst,
 * ikke som et felt i en formular.
 *
 * Derfor: en hårfin streg over, luft omkring, overskriften i displayskriften
 * og brødteksten sat til 62 tegn. Alvor markeres med stregens vægt, ikke med
 * en farve: et lovkrav får en tyk blækstreg, resten en hårfin.
 */

export type NoticeTone = "info" | "advarsel" | "krav";

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
  // Et krav er det eneste, der får ekstra vægt. Bliver alt fremhævet, er
  // intet fremhævet, og så læser folk hen over det, der faktisk er farligt.
  const rule = tone === "krav" ? "border-t-2 border-ink-950" : "border-t border-ink-300";

  return (
    <div className={`${rule} pt-4 ${className}`}>
      {title ? (
        <p className="font-display text-lg font-bold text-ink-950 leading-snug m-0 max-w-[48ch]">
          {title}
        </p>
      ) : null}

      <div
        className={`text-[15px] text-ink-800 leading-relaxed max-w-[62ch] ${
          title ? "mt-2" : ""
        }`}
      >
        {children}
      </div>

      {actions ? <div className="mt-4 flex flex-wrap gap-2.5">{actions}</div> : null}
    </div>
  );
}
