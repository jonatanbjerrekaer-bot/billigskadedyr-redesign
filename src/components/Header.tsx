import { Button, Link } from "@heroui/react";

import { Mail, Menu, X } from "lucide-react";
import { MAILTO } from "./ui/Cta";

const NAV_LINKS = [
  { label: "Skadedyr", href: "#pest" },
  { label: "Priser", href: "#estimator" },
  { label: "Forløb", href: "#process" },
  { label: "FAQ", href: "#faq" },
];

export default function Header({
  mobileNavOpen,
  onNavToggle,
}: {
  mobileNavOpen: boolean;
  onNavToggle: () => void;
}) {
  return (
    <header className="sticky top-0 z-40 bg-ink-950 text-cream shadow-md">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-14 flex items-center justify-between gap-4">
        <a
          href="#top"
          className="inline-flex items-center min-h-[44px] font-display text-lg font-extrabold tracking-tight uppercase"
        >
          Skadedyr
          <span className="text-accent-400">Pro</span>
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-cream hover:text-accent-400 transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {/* Mail leads. The phone number stays one tap away in the hero strip
              and the footer for the people who want it. */}
          <Link
            href={MAILTO}
            className="hidden sm:inline-flex gap-2 bg-accent-500 hover:bg-accent-400 text-ink-950 font-semibold rounded-lg px-4 py-2.5 text-sm min-h-[44px] items-center transition-colors"
          >
            <Mail size={16} strokeWidth={2.5} aria-hidden="true" />
            Skriv til os
          </Link>
          <Button
            onPress={onNavToggle}
            aria-expanded={mobileNavOpen}
            aria-controls="mobile-nav"
            aria-label={mobileNavOpen ? "Luk menu" : "Åbn menu"}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg bg-ink-800 hover:bg-ink-700 transition-colors"
          >
            {mobileNavOpen ? (
              <X size={20} aria-hidden="true" />
            ) : (
              <Menu size={20} aria-hidden="true" />
            )}
          </Button>
        </div>
      </div>

      {mobileNavOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobilnavigation"
          className="md:hidden bg-ink-900 border-t border-ink-800"
        >
          <div className="px-5 py-3 flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={onNavToggle}
                className="px-3 py-3 rounded-lg text-cream hover:bg-ink-800 text-sm"
              >
                {l.label}
              </a>
            ))}
            <Link
              href={MAILTO}
              className="mt-2 bg-accent-500 text-ink-950 text-center font-semibold rounded-lg py-3 min-h-[44px] inline-flex items-center justify-center gap-2"
            >
              <Mail size={16} strokeWidth={2.5} aria-hidden="true" />
              Skriv til os
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
