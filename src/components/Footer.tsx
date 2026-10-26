import TrustSeal from "./TrustSeal";
import { CookieSettingsButton } from "./CookieBanner";

export default function Footer() {
  return (
    <footer className="foot">
      <div className="container">
        <p className="foot__mark">
          <img src={`${import.meta.env.BASE_URL}logo-prof-light.svg`} alt="" width={184} height={185} />
          <span>Billigskadedyr<span className="wordmark__prof">Prof</span></span>
        </p>
        <p className="foot__line">
          Professionel skadedyrsbekæmpelse i hele Jylland og på Fyn, med base i Risskov.
        </p>

        <div className="foot__cols">
          <div>
            <h3>Menu</h3>
            <ul>
              <li><a href="#pest">Skadedyr</a></li>
              <li><a href="#estimator">Priser</a></li>
              <li><a href="#process">Forløb</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>
          {/*
            The legal furniture. A Danish buyer looks for these before booking a
            service visit, and their absence reads as an unregistered trader even
            when the trader is fine. The site's own pages, written from what
            this site does (components/LegalPage).
          */}
          <div>
            <h3>Handel og vilkår</h3>
            <ul>
              <li><a href={`${import.meta.env.BASE_URL}privatlivspolitik/`}>Privatlivspolitik</a></li>
              <li><a href={`${import.meta.env.BASE_URL}cookiepolitik/`}>Cookiepolitik</a></li>
              <li><CookieSettingsButton className="foot__link-btn" /></li>
            </ul>
          </div>
          <div>
            <h3>Din sikkerhed</h3>
            <ul>
              <li>Miljøgodkendte midler, brugt efter de danske regler</li>
              <li>Faktura og kvittering på behandlingen</li>
              <li>Autoriseret til de behandlinger, hvor det kræves</li>
            </ul>
          </div>
        </div>

        <div className="foot__pay">
          <img
            src={`${import.meta.env.BASE_URL}payment-logos-light.svg`}
            alt="Vi tager imod MobilePay, Dankort, Visa, Mastercard, PayPal, ViaBill og EAN"
            width={326}
            height={24}
          />
          <TrustSeal variant="paper" />
        </div>

        <div className="foot__legal">
          <p>© 2026. Uofficielt redesign-koncept af Jonatan Daugbjerg Bjerrekær. Ikke tilknyttet eller godkendt af Billigskadedyr.dk / BilligskadedyrPROF.</p>
          <p>CVR 40306633. Tilbudet fra prisberegneren er vejledende.</p>
          <p data-credits>
            Insektikoner:{" "}
            <a href="https://www.flaticon.com/" rel="noopener noreferrer" target="_blank" className="link">
              Freepik, Flaticon
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
