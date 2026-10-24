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
 * counts to make the section look fuller. Everything shown here is either
 * real or absent.
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

const score = (n: number) => n.toLocaleString("da-DK", { minimumFractionDigits: 1 });

export default function Reviews() {
  return (
    <section id="reviews" className="section">
      <div className="container grid12">
        <div className="head-split">
          <h2>Anmeldelser</h2>
          <p>Vi viser den samlede bedømmelse, som den er. Også når den ikke er fem stjerner.</p>
        </div>

        {/* The two scores as a box score between double rules: the figures
            are the proof, set at the size of the claim they make. */}
        <div className="score">
          <div>
            <p className="score__figure">
              {score(3.8)}
              <small>af 5</small>
            </p>
            <p className="score__line">Trustpilot, 44 anmeldelser</p>
          </div>
          <div>
            <p className="score__figure">
              {score(EM_SCORE)}
              <small>af 5</small>
            </p>
            <p className="score__line">e-mærket, {EM_COUNT} anmeldelser</p>
          </div>
          <p className="score__link">
            <a href={TRUSTPILOT_URL} target="_blank" rel="noopener noreferrer" className="link">
              Se alle anmeldelser på Trustpilot
            </a>
          </p>
        </div>

        <div className="quotes">
          {REVIEWS.map((r) => (
            <blockquote key={r.date}>
              <p>“{r.quote}”</p>
              <cite>Trustpilot, {r.date}</cite>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
