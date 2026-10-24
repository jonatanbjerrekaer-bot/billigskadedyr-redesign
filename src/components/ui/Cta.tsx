import type { ReactNode } from "react";

/**
 * Every call to action on the redesigned pages, in one place: a plain <a>,
 * because each of them goes somewhere (an anchor, a tel: link), set in the
 * paper's control pair.
 *
 * Email leads and phone follows, everywhere. Changing that ordering is a
 * one-line change here rather than a sweep across nine components.
 */
export const TEL = "tel:+4524245583";
// Every "Skriv til os" button scrolls to the page's one contact form instead
// of opening a mail client; the form is the action, the buttons are ways to
// reach it.
export const CONTACT_HREF = "#skriv";
// The service pages carry their own estimator, contact form, process and FAQ,
// so those hashes resolve locally there. The pest index is the one section that
// still lives only on the front page, so it is the only hash worth rewriting.
const HOME_ONLY = new Set(["#pest", "#top"]);
export const homeHref = (hash: string) =>
  HOME_ONLY.has(hash) && location.pathname.includes("/service/")
    ? import.meta.env.BASE_URL + hash
    : hash;

const VARIANTS = {
  /** Ink on paper, or paper on the ink band. The one action we most want taken. */
  primary: "btn btn--primary",
  /** Ruled top and bottom. */
  secondary: "btn btn--secondary",
} as const;

export default function Cta({
  href,
  variant = "primary",
  fullWidth,
  children,
}: {
  href: string;
  variant?: keyof typeof VARIANTS;
  fullWidth?: boolean;
  children: ReactNode;
}) {
  return (
    <a href={href} className={`${VARIANTS[variant]} ${fullWidth ? "btn--block" : ""}`}>
      {children}
    </a>
  );
}

/** The pair used under the price: mail first, phone second. */
export function ContactCtas({ className = "" }: { className?: string }) {
  return (
    <div className={`actions ${className}`}>
      <Cta href={CONTACT_HREF} variant="primary">
        Skriv til os
      </Cta>
      <Cta href={TEL} variant="secondary">
        Ring 24 24 55 83
      </Cta>
    </div>
  );
}
