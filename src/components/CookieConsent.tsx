import { useEffect, useState } from "react";
import { Cookie } from "lucide-react";
import { useConsent, setConsent, currentConsent, hasTools, OPEN_EVENT } from "../lib/consent";
import { analyticsToolNames, loadAnalytics, clearAnalyticsCookies } from "../lib/analytics";

const B = import.meta.env.BASE_URL;

/**
 * The cookie box: a card in the corner rather than a strip across the page,
 * so the page behind it stays readable and the question reads as a question.
 *
 * Nothing that sets cookies loads before "Ja tak" (lib/analytics). "Nej tak"
 * is the same size, colour and weight as "Ja tak", because refusing must be as
 * easy as accepting (Datatilsynet). It enters with a short rise and fade, and
 * not at all under reduced motion. The footer's "Cookieindstillinger" reopens it.
 */
export default function CookieBanner() {
  const consent = useConsent();
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    if (currentConsent() === "accepted") loadAnalytics();
    const reopen = () => setReopened(true);
    window.addEventListener(OPEN_EVENT, reopen);
    return () => window.removeEventListener(OPEN_EVENT, reopen);
  }, []);

  if (!hasTools || typeof window === "undefined" || (consent !== null && !reopened)) return null;

  function choose(yes: boolean) {
    const before = currentConsent();
    setConsent(yes ? "accepted" : "rejected");
    setReopened(false);
    if (yes) return loadAnalytics();
    if (before === "accepted") {
      // Scripts already running cannot be unloaded: clear their cookies and start a clean page.
      clearAnalyticsCookies();
      location.reload();
    }
  }

  return (
    <section role="dialog" aria-labelledby="cookie-title" aria-describedby="cookie-text" className="np cookiebox">
      <div className="cookiebox__head">
        <span className="cookiebox__icon" aria-hidden="true">
          <Cookie size={20} strokeWidth={2} />
        </span>
        <h2 id="cookie-title">Må vi bruge cookies?</h2>
      </div>
      <p id="cookie-text">
        Med cookies fra {analyticsToolNames} kan vi se, hvilke sider der bliver læst, og gøre siden bedre. Vi bruger
        dem ikke til reklamer.{" "}
        <a href={`${B}cookiepolitik/`} className="link">Læs mere om cookies</a>
      </p>
      <div className="cookiebox__actions">
        <button type="button" onClick={() => choose(true)} className="btn btn--primary">
          Ja tak
        </button>
        <button type="button" onClick={() => choose(false)} className="btn btn--primary">
          Nej tak
        </button>
      </div>
    </section>
  );
}

/** Footer button that shows the box again, so a yes can be withdrawn. */
export function CookieSettingsButton({ className }: { className?: string }) {
  if (!hasTools) return null;
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>
      Cookieindstillinger
    </button>
  );
}
