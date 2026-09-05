import { Star } from "lucide-react";
import { EM_SCORE, EM_COUNT } from "./TrustSeal";

/**
 * PROVENANCE WARNING — read before shipping.
 *
 * The aggregate figures (Trustpilot 3,8/5 across 44 reviews; e-mærket via
 * EM_SCORE/EM_COUNT in TrustSeal.tsx, so the seal and this block cannot drift
 * apart) were read off the live badges. The individual quotes below were
 * collected earlier in this project and I have NOT re-verified them against
 * the live Trustpilot page. Before this concept goes anywhere public, either
 * re-scrape them with dates and reviewer names, or cut the quotes and keep
 * only the aggregate block, which is verifiable from the link.
 *
 * Deliberately NOT done: inventing reviewer names, avatars or per-review star
 * counts to make the section look fuller. That is what made it read as
 * generated in the first place — plausible detail with nothing behind it.
 * Everything shown here is either real or absent.
 */
const TRUSTPILOT_URL = "https://dk.trustpilot.com/review/billigskadedyr.dk";

const REVIEWS = [
  {
    quote:
      "Jeg har brugt billigskadedyr i mange år, da der altid er en klar og konkret vejledning, service og altid et smil med på vejen. Daniel har stået parat til at vejlede mig gennem store som små spørgsmål.",
    date: "18. februar 2026",
  },
  {
    quote:
      "Vi kontaktede billigskadedyr.dk mod skægkræ og det har vist sig at være det bedste vi har gjort. Utrolig kompetent, professionel og venlig rådgivning og service og prisen er mere end fornuftig.",
    date: "24. februar 2026",
  },
  {
    quote:
      "Købte noget gift, blev ringet op kort tid efter bestillingen og fortalt, at jeg kunne få et bedre produkt til det halve. Super god service, og produktet virker rigtig godt.",
    date: "13. januar 2026",
  },
];

function Stars({ score }: { score: number }) {
  return (
    <span className="flex gap-0.5" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={16}
          strokeWidth={0}
          className={i <= Math.round(score) ? "fill-accent-500" : "fill-ink-900/15"}
        />
      ))}
    </span>
  );
}

function ScoreBlock({ score, count, source }: { score: number; count: number; source: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-baseline gap-2">
        <span className="font-display text-3xl font-bold text-ink-900 tabular-nums">
          {score.toLocaleString("da-DK", { minimumFractionDigits: 1 })}
        </span>
        <span className="text-sm text-ink-900/70">af 5</span>
      </div>
      <Stars score={score} />
      <span className="text-xs text-ink-900/60">
        {source} · {count} anmeldelser
      </span>
    </div>
  );
}

export default function Reviews() {
  return (
    <section id="reviews" className="bg-white py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <h2 className="font-display text-3xl font-bold tracking-tight text-ink-900 uppercase mb-2">
          Anmeldelser
        </h2>
        <p className="text-ink-900/70 mb-8 max-w-2xl">
          Vi viser den samlede bedømmelse, som den er. Også når den ikke er fem stjerner.
        </p>

        <div className="flex flex-wrap gap-8 items-center bg-ink-50 rounded-2xl p-6 mb-6">
          <ScoreBlock score={3.8} count={44} source="Trustpilot" />
          <span aria-hidden="true" className="hidden sm:block w-px self-stretch bg-ink-900/10" />
          <ScoreBlock score={EM_SCORE} count={EM_COUNT} source="e-mærket" />
          <a
            href={TRUSTPILOT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="sm:ml-auto inline-flex items-center min-h-[44px] text-sm font-semibold text-ink-900 underline underline-offset-4 hover:text-accent-700"
          >
            Se alle anmeldelser på Trustpilot
          </a>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {REVIEWS.map((r) => (
            <blockquote
              key={r.date}
              className="bg-white border border-ink-900/10 rounded-2xl p-6 flex flex-col gap-4 hover:border-accent-500 transition-colors"
            >
              <span
                aria-hidden="true"
                className="font-display text-5xl leading-none text-accent-700"
              >
                &ldquo;
              </span>
              <p className="text-sm text-ink-900/90 leading-relaxed grow">{r.quote}</p>
              <cite className="text-xs text-ink-900/70 not-italic border-t border-ink-900/10 pt-3">
                Trustpilot · {r.date}
              </cite>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
