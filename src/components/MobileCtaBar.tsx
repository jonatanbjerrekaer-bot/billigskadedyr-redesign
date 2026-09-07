import { Mail, Phone } from "lucide-react";
import { Link } from "@heroui/react";
import { useConsent } from "../lib/consent";
import { CONTACT_HREF, TEL, homeHref } from "./ui/Cta";

/**
 * Mobile-only contact bar, pinned to the bottom.
 *
 * On a phone the page is ~13,000px tall, so for most of a visit the header CTA
 * is far off screen and the only way to make contact is to scroll to an end.
 * Keeping both channels one thumb-reach away is the single biggest mobile
 * conversion and trust fix here (Norman: visibility; Shneiderman 7: the user
 * stays in control of when to act, rather than having to hunt).
 *
 * It waits until the cookie banner is answered so the two never stack, and the
 * body gets matching bottom padding so it can never cover the footer.
 */
export default function MobileCtaBar() {
  const consent = useConsent();
  if (consent === null) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-ink-950/95 backdrop-blur border-t border-ink-800 px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] flex gap-2 animate-slide-up">
      <Link
        href={homeHref(CONTACT_HREF)}
        className="press basis-0 grow inline-flex items-center justify-center gap-2 min-h-[48px] rounded-lg bg-accent-500 text-ink-950 font-bold"
      >
        <Mail size={17} strokeWidth={2.5} aria-hidden="true" />
        Skriv til os
      </Link>
      <Link
        href={TEL}
        aria-label="Ring til os på 24 24 55 83"
        className="press inline-flex items-center justify-center gap-2 min-h-[48px] px-5 rounded-lg border-2 border-ink-700 text-cream font-semibold"
      >
        <Phone size={17} strokeWidth={2.5} aria-hidden="true" />
        Ring
      </Link>
    </div>
  );
}
