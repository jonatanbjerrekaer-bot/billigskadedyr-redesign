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
        {/*
          "SkadedyrPro" was a name this concept invented for a business that
          already has one. The mark is the client's own, lifted from their
          logo with the wordmark cropped off, so the header carries their
          identity rather than a redesign's idea of it. The name still reaches
          screen readers through the visually-hidden span.
        */}
        <a href="#top" className="inline-flex items-center min-h-[44px]">
          <img
            src={`${import.meta.env.BASE_URL}logo-mark.svg`}
            alt=""
            width={69}
            height={67}
            className="h-9 w-auto"
          />
          <span className="sr-only">Billigskadedyr.dk, til forsiden</span>
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
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-ink-500 bg-ink-800 text-cream hover:bg-ink-700 hover:border-accent-500 transition-colors"
          >
            {mobileNavOpen ? (
              <X size={20} aria-hidden="true" />
            ) : (
              <Menu size={20} aria-hidden="true" />
            )}
          </Button>
        </div>
      </div>

      {/* Kept mounted and collapsed with the shared row-collapse class so both
          opening and closing animate; visibility on the collapsed state keeps
          the hidden links out of the tab order. */}
      <nav
        id="mobile-nav"
        aria-label="Mobilnavigation"
        aria-hidden={!mobileNavOpen}
        className="md:hidden bg-ink-900 border-t border-ink-800 data-[collapsed=true]:border-transparent"
      >
        <div className="row-collapse" data-collapsed={!mobileNavOpen}>
          <div>
            <div className="px-5 py-3 flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={onNavToggle}
                className="px-3 min-h-[48px] flex items-center rounded-lg text-cream hover:bg-ink-800 text-base"
              >
                {l.label}
              </a>
            ))}
            <Link
              href={MAILTO}
              className="mt-2 w-full bg-accent-500 text-ink-950 text-center font-semibold rounded-lg py-3 min-h-[48px] flex items-center justify-center gap-2"
            >
              <Mail size={16} strokeWidth={2.5} aria-hidden="true" />
              Skriv til os
            </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
