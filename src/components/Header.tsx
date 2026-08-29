const NAV_LINKS = [
  { label: "Pests", href: "#pest" },
  { label: "Pricing", href: "#estimator" },
  { label: "Process", href: "#process" },
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
    <header className="sticky top-0 z-40 bg-forest-950 text-cream shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        <a href="#top" className="font-display text-lg font-extrabold tracking-tight uppercase">
          Skadedyr
          <span className="text-accent-400">Pro</span>
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-accent-400 transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="tel:+4524245583"
            className="hidden sm:inline-flex bg-accent-500 hover:bg-accent-400 text-white font-semibold rounded-lg px-4 py-2.5 text-sm min-h-[44px] items-center transition-colors"
          >
            Call 24 24 55 83
          </a>
          <button
            onClick={onNavToggle}
            aria-expanded={mobileNavOpen}
            aria-controls="mobile-nav"
            aria-label="Toggle navigation menu"
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg bg-forest-800 hover:bg-forest-700 transition-colors"
          >
            <span aria-hidden="true" className="text-lg leading-none">
              {mobileNavOpen ? "×" : "☰"}
            </span>
          </button>
        </div>
      </div>

      {mobileNavOpen && (
        <nav
          id="mobile-nav"
          aria-label="Mobile navigation"
          className="md:hidden bg-forest-900 border-t border-forest-800"
        >
          <div className="px-4 py-3 flex flex-col gap-1">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={onNavToggle}
                className="px-3 py-3 rounded-lg hover:bg-forest-800 text-sm"
              >
                {l.label}
              </a>
            ))}
            <a
              href="tel:+4524245583"
              className="mt-2 bg-accent-500 text-white text-center font-semibold rounded-lg py-3 min-h-[44px]"
            >
              Call 24 24 55 83
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
