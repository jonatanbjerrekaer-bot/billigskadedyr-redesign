import { useConsent, setConsent } from "../lib/consent";

/**
 * The paper's notice: one ruled strip at the foot of the screen. No slide;
 * the theme moves nothing but state, and the answer simply removes it.
 */
export default function CookieBanner() {
  const consent = useConsent();
  if (consent !== null || typeof window === "undefined") return null;

  return (
    <div role="dialog" aria-label="Cookie notice" className="notice">
      <div className="container notice__row">
        <p>Vi bruger cookies til statistik, så vi kan forbedre siden.</p>
        <div className="actions">
          <button type="button" onClick={() => setConsent("accepted")} className="btn btn--primary">
            Accepter
          </button>
          <button type="button" onClick={() => setConsent("rejected")} className="btn btn--secondary">
            Afvis
          </button>
        </div>
      </div>
    </div>
  );
}
