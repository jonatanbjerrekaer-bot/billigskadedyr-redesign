import { useState } from "react";
import Header from "./Header";
import UspBar from "./UspBar";
import Footer from "./Footer";
import MobileCtaBar from "./MobileCtaBar";
import PestQuickSelect from "./PestQuickSelect";

/**
 * The overview at /service/: every pest in one searchable list, the same
 * index the front page sets, so the two can never drift apart. Cold arrivals
 * get this file with its content prerendered; the router swaps to it like
 * any other in-site move.
 *
 * The URL existed before this page did, as a directory listing: the service
 * shells were discovered from disk, but nothing wrote an index.html at the
 * root of service/, so the bare /service/ URL answered with an auto-generated
 * file browser. routes.check.mjs now fails on that.
 */
export default function ServiceIndexPage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  return (
    <div className="np">
      <UspBar />
      <Header mobileNavOpen={mobileNavOpen} onNavToggle={() => setMobileNavOpen((v) => !v)} />
      <main>
        <section className="svc-hero">
          <div className="container grid12">
            <div className="svc-hero__title">
              <h1>Alle skadedyr i Danmark</h1>
            </div>
            <p className="lead svc-hero__lead">
              Fra myrer til mår: hvert skadedyr har sin egen side med kendetegn, blæktegninger og fast
              pris på behandling. Vælg nedenfor, eller skriv hvad du har set — du behøver ikke kende
              navnet.
            </p>
          </div>
        </section>
        <section className="index-band">
          <div className="container">
            <PestQuickSelect />
          </div>
        </section>
      </main>
      <Footer />
      <MobileCtaBar />
    </div>
  );
}
