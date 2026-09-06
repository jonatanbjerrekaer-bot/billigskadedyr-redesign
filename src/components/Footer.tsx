import TrustSeal from "./TrustSeal";

export default function Footer() {
  return (
    <footer className="bg-ink-950 text-cream">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-12">
        <div className="flex flex-wrap gap-10">
          <div style={{ flexBasis: "220px", flexGrow: 1, flexShrink: 1 }}>
            <p className="flex items-center gap-3 font-display text-xl font-extrabold tracking-tight">
              <img
                src={`${import.meta.env.BASE_URL}logo-mark.svg`}
                alt=""
                width={69}
                height={67}
                className="h-10 w-auto"
              />
              Billigskadedyr.dk
            </p>
            <p className="text-sm text-ink-100/70 mt-3">
              Professionel skadedyrsbekæmpelse i hele Jylland og på Fyn. Vi
              kommer ud til dig, og prisen ligger fast, før vi går i gang.
            </p>
            <TrustSeal className="mt-4" />
          </div>
          <div style={{ flexBasis: "200px", flexGrow: 1, flexShrink: 1 }}>
            <h3 className="text-sm uppercase tracking-widest text-ink-100/60 mb-3">Menu</h3>
            <ul className="flex flex-col gap-2 text-sm">
              <li><a href="#pest" className="block py-3.5 md:py-0 hover:text-accent-400">Skadedyr</a></li>
              <li><a href="#estimator" className="block py-3.5 md:py-0 hover:text-accent-400">Priser</a></li>
              <li><a href="#process" className="block py-3.5 md:py-0 hover:text-accent-400">Forløb</a></li>
              <li><a href="#faq" className="block py-3.5 md:py-0 hover:text-accent-400">FAQ</a></li>
            </ul>
          </div>
          <div style={{ flexBasis: "260px", flexGrow: 1, flexShrink: 1 }}>
            <h3 className="text-sm uppercase tracking-widest text-ink-100/60 mb-3">Kontakt</h3>
            <ul className="flex flex-col gap-2 text-sm text-ink-100/80">
              <li>Viengevej 6A · 8240 Risskov</li>
              <li className="text-ink-100/60">Vi kører ud i hele Jylland og på Fyn</li>
              <li><a href="tel:+4524245583" className="select-text block py-3.5 md:py-0 hover:text-accent-400">+45 24 24 55 83</a></li>
              <li><a href="mailto:info@billigskadedyr.dk" className="select-text block py-3.5 md:py-0 hover:text-accent-400">info@billigskadedyr.dk</a></li>
              <li>Man-Fre 08-21 · Lør-Søn 12-16 · Helligdage 12-16</li>
              <li className="text-ink-100/50">CVR 40306633</li>
            </ul>
          </div>
        </div>
        {/*
          The legal furniture. A Danish buyer looks for these before booking a
          service visit, and their absence reads as an unregistered trader even
          when the trader is fine. These are the prof site's own policy pages,
          the ones that govern a service booking.
        */}
        <div className="mt-10 border-t border-ink-800 pt-6 grid gap-6 sm:grid-cols-2">
          <div>
            <h3 className="text-sm uppercase tracking-widest text-ink-100/60 mb-3">Handel og vilkår</h3>
            <ul className="flex flex-col gap-2 text-sm text-ink-100/80">
              <li><a href="https://billigskadedyrprof.dk/privatlivspolitik/" target="_blank" rel="noreferrer" className="block py-3.5 md:py-0 hover:text-accent-400">Privatlivspolitik</a></li>
              <li><a href="https://billigskadedyrprof.dk/cookie-politik/" target="_blank" rel="noreferrer" className="block py-3.5 md:py-0 hover:text-accent-400">Cookiepolitik</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm uppercase tracking-widest text-ink-100/60 mb-3">Din sikkerhed</h3>
            <ul className="flex flex-col gap-2 text-sm text-ink-100/80">
              <li>Miljøgodkendte midler, brugt efter de danske regler</li>
              <li>Skriftlig dokumentation af behandlingen</li>
              <li>Autoriseret til de behandlinger, hvor det kræves</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-ink-800 pt-6">
          <h3 className="text-sm uppercase tracking-widest text-ink-100/60 mb-3">Betaling</h3>
          <img
            src={`${import.meta.env.BASE_URL}payment-logos.svg`}
            alt="Vi tager imod MobilePay, Dankort, Visa, Mastercard, PayPal, ViaBill og EAN"
            width={326}
            height={24}
            className="h-6 w-auto max-w-full"
          />
        </div>

        <div className="mt-8 border-t border-ink-800 pt-6 text-xs text-ink-100/50 flex flex-col sm:flex-row gap-3 justify-between">
          <p>© 2026 · Uofficielt redesign-koncept af Jonatan Daugbjerg Bjerrekær. Ikke tilknyttet eller godkendt af Billigskadedyr.dk / BilligskadedyrPROF.</p>
          <p>Tilbudet fra prisberegneren er vejledende.</p>
        </div>
      </div>
    </footer>
  );
}
