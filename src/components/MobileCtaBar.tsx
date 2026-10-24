import { useConsent } from "../lib/consent";
import { CONTACT_HREF, TEL, homeHref } from "./ui/Cta";

/**
 * Phone-only contact bar, pinned to the bottom (CSS shows it under 60rem).
 *
 * On a phone the page is long, so for most of a visit the header action is
 * far off screen and the only way to make contact is to scroll to an end.
 * Keeping both channels one thumb-reach away is the single biggest mobile
 * fix here. It waits until the cookie notice is answered so the two never
 * stack, and the page gets matching bottom padding so it never covers the
 * footer.
 */
export default function MobileCtaBar() {
  const consent = useConsent();
  if (consent === null) return null;

  return (
    <div className="phonebar">
      <a href={homeHref(CONTACT_HREF)} className="btn btn--primary">
        Skriv til os
      </a>
      <a href={TEL} aria-label="Ring til os på 24 24 55 83" className="btn btn--secondary">
        Ring
      </a>
    </div>
  );
}
