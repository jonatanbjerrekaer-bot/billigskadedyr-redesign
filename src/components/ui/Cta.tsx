import { Link } from "@heroui/react";
import { Mail, Phone } from "lucide-react";
import type { ReactNode } from "react";

/**
 * Every call to action on the page, in one place.
 *
 * HeroUI's Button is react-aria's Button and does not navigate, so anything
 * pointing at a tel: or #anchor uses HeroUI's Link instead — same
 * focus and press handling, but it renders a real <a href>.
 *
 * Email leads and phone follows, everywhere. Changing that ordering is a
 * one-line change here rather than a sweep across nine components.
 */
export const TEL = "tel:+4524245583";
// Every "Skriv til os" button scrolls to the page's one contact form instead
// of opening a mail client; the form is the action, the buttons are ways to
// reach it.
export const CONTACT_HREF = "#skriv";

const BASE =
  "press rounded-lg font-semibold min-h-[48px] px-6 py-3.5 inline-flex items-center justify-center gap-2 text-center transition-[color,background-color,border-color,transform]";

const VARIANTS = {
  /** Lime on ink. The one action we most want taken. */
  primary: "bg-accent-500 text-ink-950 font-bold hover:bg-accent-400",
  /** Outlined, for dark backgrounds. */
  secondary: "border-2 border-ink-600 text-cream hover:border-accent-500",
  /** Outlined, for light backgrounds. */
  secondaryLight: "border-2 border-ink-900/20 text-ink-900 hover:border-accent-600",
  /** Solid ink, for use on the lime section. */
  onAccent: "bg-ink-950 text-white hover:bg-ink-900",
  onAccentGhost: "bg-white text-ink-900 hover:bg-ink-50",
} as const;

export default function Cta({
  href,
  variant = "primary",
  icon,
  fullWidth,
  children,
}: {
  href: string;
  variant?: keyof typeof VARIANTS;
  icon?: ReactNode;
  fullWidth?: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`${BASE} ${VARIANTS[variant]} ${fullWidth ? "w-full" : ""}`}
    >
      {icon}
      {children}
    </Link>
  );
}

/** The pair used at the bottom of most sections: mail first, phone second. */
export function ContactCtas({
  variant = "secondary",
  className = "",
}: {
  variant?: keyof typeof VARIANTS;
  className?: string;
}) {
  return (
    <div className={`flex flex-col sm:flex-row gap-2 ${className}`}>
      <Cta
        href={CONTACT_HREF}
        variant="primary"
        fullWidth
        icon={<Mail size={17} strokeWidth={2.5} aria-hidden="true" />}
      >
        Skriv til os
      </Cta>
      <Cta
        href={TEL}
        variant={variant}
        fullWidth
        icon={<Phone size={17} strokeWidth={2.5} aria-hidden="true" />}
      >
        Ring 24 24 55 83
      </Cta>
    </div>
  );
}
