import { Menu, X } from "lucide-react";
import { useEffect, useRef } from "react";
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
  const menuRef = useRef<HTMLElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  /* The open sheet behaves modally even though it stays a nav landmark:
     Escape closes it, Tab cycles the links and the one action instead of
     falling through to the page behind, and focus returns to the toggle so
     a keyboard never lands on hidden content. The guard keeps the focus
     move on the open transition only, as the toggle prop is a new identity
     every render. */
  useEffect(() => {
    if (!mobileNavOpen) {
      /* Back from open: hash navigation moves focus to the target before
         this runs, so "was focus inside" is too narrow — return it to the
         trigger unconditionally, the disclosure pattern. */
      if (wasOpen.current) burgerRef.current?.focus();
      wasOpen.current = false;
      return;
    }
    const focusables = () =>
      [...(menuRef.current?.querySelectorAll<HTMLElement>("a[href], button") ?? [])].filter(
        (el) => !el.hasAttribute("disabled"),
      );
    if (!wasOpen.current) focusables()[0]?.focus();
    wasOpen.current = true;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onNavToggle();
        burgerRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const els = focusables();
      if (!els.length) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileNavOpen, onNavToggle]);

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
          ref={burgerRef}
          onClick={onNavToggle}
          aria-expanded={mobileNavOpen}
          aria-controls="mobile-nav"
          aria-label={mobileNavOpen ? "Luk menu" : "Åbn menu"}
          className="mast-menu"
        >
          {mobileNavOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>

      {/* Kept mounted and toggled with the hidden attribute: when open it is
          a fixed full-screen sheet (see tradesman.css), and hidden keeps the
          links out of the tab order while closed. */}
      <nav
        id="mobile-nav"
        ref={menuRef}
        aria-label="Mobilnavigation"
        aria-hidden={!mobileNavOpen}
        className="mast-mobile"
        hidden={!mobileNavOpen}
      >
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
