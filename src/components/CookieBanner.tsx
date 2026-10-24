import { useEffect, useState } from "react";
import { useConsent, setConsent, currentConsent, OPEN_EVENT } from "../lib/consent";
import { analyticsToolNames, loadAnalytics, clearAnalyticsCookies } from "../lib/analytics";

/**
 * The paper's notice: one ruled strip at the foot of the screen. No slide;
 * the theme moves nothing but state, and the answer simply removes it.
 *
 * Nothing that sets cookies loads before "Accepter" (lib/analytics). "Afvis"
 * is the same size and weight as "Accepter", because refusing must be as easy
 * as accepting (Datatilsynet). The footer's "Cookieindstillinger" reopens it.
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

  if (typeof window === "undefined" || (consent !== null && !reopened)) return null;

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
    <div role="dialog" aria-label="Cookies" className="notice">
      <div className="container notice__row">
        <p>
          {analyticsToolNames
            ? `Må vi bruge cookies fra ${analyticsToolNames}? Så kan vi se, hvilke sider der bliver læst, og gøre siden bedre.`
            : "Vi bruger cookies til statistik, så vi kan forbedre siden."}
        </p>
        <div className="actions notice__actions">
          <button type="button" onClick={() => choose(true)} className="btn btn--primary">
            Accepter
          </button>
          <button type="button" onClick={() => choose(false)} className="btn btn--primary">
            Afvis
          </button>
        </div>
      </div>
    </div>
  );
}

/** Footer button that shows the banner again, so a yes can be withdrawn. */
export function CookieSettingsButton({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new Event(OPEN_EVENT))}>
      Cookieindstillinger
    </button>
  );
}
