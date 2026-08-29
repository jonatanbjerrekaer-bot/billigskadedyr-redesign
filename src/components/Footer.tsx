export default function Footer() {
  return (
    <footer className="bg-forest-950 text-cream">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-12">
        <div className="flex flex-wrap gap-10">
          <div style={{ flexBasis: "220px", flexGrow: 1, flexShrink: 1 }}>
            <p className="font-display text-xl font-extrabold uppercase tracking-tight">
              Skadedyr<span className="text-accent-400">Pro</span>
            </p>
            <p className="text-sm text-forest-100/70 mt-3">
              Gør-det-selv produkter og professionel bekæmpelse under ét tag.
            </p>
            <a
              href="https://certifikat.emaerket.dk/billigskadedyr.dk"
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-4 border border-forest-700 rounded-lg px-4 py-2.5 text-sm hover:border-accent-400 transition-colors"
            >
              e-mærket webshop
            </a>
          </div>
          <div style={{ flexBasis: "200px", flexGrow: 1, flexShrink: 1 }}>
            <h3 className="text-sm uppercase tracking-widest text-forest-100/60 mb-3">Menu</h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li><a href="#pest" className="hover:text-accent-400">Skadedyr</a></li>
              <li><a href="#estimator" className="hover:text-accent-400">Priser</a></li>
              <li><a href="#process" className="hover:text-accent-400">Forløb</a></li>
              <li><a href="#faq" className="hover:text-accent-400">FAQ</a></li>
            </ul>
          </div>
          <div style={{ flexBasis: "260px", flexGrow: 1, flexShrink: 1 }}>
            <h3 className="text-sm uppercase tracking-widest text-forest-100/60 mb-3">Kontakt</h3>
            <ul className="flex flex-col gap-2 text-sm text-forest-100/80">
              <li>Viengevej 6A · 8240 Risskov</li>
              <li><a href="tel:+4524245583" className="hover:text-accent-400">+45 24 24 55 83</a></li>
              <li><a href="mailto:info@billigskadedyr.dk" className="hover:text-accent-400">info@billigskadedyr.dk</a></li>
              <li>Man-Fre 08-18 · Lø-Søn 12-16</li>
              <li className="text-forest-100/50">CVR 40306633</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-forest-800 pt-6 text-xs text-forest-100/50 flex flex-col sm:flex-row gap-3 justify-between">
          <p>© 2026 · Uofficielt redesign-koncept af Jonatan Daugbjerg Bjerkjær. Ikke tilknyttet eller godkendt af Billigskadedyr.dk / BilligskadedyrPROF.</p>
          <p>Tilbudet fra priskalkulatoren er vejledende.</p>
        </div>
      </div>
    </footer>
  );
}
