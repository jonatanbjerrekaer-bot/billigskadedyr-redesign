import { Menu, X } from "lucide-react";
import { CONTACT_HREF, homeHref } from "./ui/Cta";

const NAV_LINKS = [
  { label: "Skadedyr", href: "#pest" },
  { label: "Priser", href: "#estimator" },
  { label: "Forløb", href: "#process" },
  { label: "FAQ", href: "#faq" },
];

/**
 * The masthead: the client's own mark and name, the four destinations, and
 * the one action. Sticky, so "Skriv til os" stays one click away all the way
 * down the page; on a phone the bottom bar does that job instead.
 */
export default function Header({
  mobileNavOpen,
  onNavToggle,
}: {
  mobileNavOpen: boolean;
  onNavToggle: () => void;
}) {
  return (
    <header className="mast-bar">
      <div className="container mast-bar__row">
        <a href={homeHref("#top")} className="wordmark" aria-label="Billigskadedyr Prof, til forsiden">
          <img src={`${import.meta.env.BASE_URL}logo-prof.svg`} alt="" width={184} height={185} />
          <span aria-hidden="true">Billigskadedyr<span className="wordmark__prof">Prof</span></span>
        </a>

        <nav className="mast-nav" aria-label="Hovedmenu">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={homeHref(l.href)}>
              {l.label}
            </a>
          ))}
        </nav>

        <a href={homeHref(CONTACT_HREF)} className="btn btn--primary">
          Skriv til os
        </a>
        <button
          type="button"
          onClick={onNavToggle}
          aria-expanded={mobileNavOpen}
          aria-controls="mobile-nav"
          aria-label={mobileNavOpen ? "Luk menu" : "Åbn menu"}
          className="mast-menu"
        >
          {mobileNavOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>

      {/* Kept mounted and collapsed with the shared row-collapse class so both
          opening and closing animate; visibility on the collapsed state keeps
          the hidden links out of the tab order. */}
      <nav id="mobile-nav" aria-label="Mobilnavigation" aria-hidden={!mobileNavOpen} className="mast-mobile" hidden={!mobileNavOpen}>
        <div className="container">
          <ul>
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={homeHref(l.href)} onClick={onNavToggle}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href={homeHref(CONTACT_HREF)} onClick={onNavToggle} className="btn btn--primary btn--block">
            Skriv til os
          </a>
        </div>
      </nav>
    </header>
  );
}
