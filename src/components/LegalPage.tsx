import { useState } from "react";
import { ToastProvider } from "@heroui/react";
import Header from "./Header";
import UspBar from "./UspBar";
import Footer from "./Footer";
import MobileCtaBar from "./MobileCtaBar";
import { CookieSettingsButton } from "./CookieConsent";
import { tools } from "../lib/analytics";
import { controller, updated, processors, enquiryRetentionMonths } from "../lib/legal";

export type LegalKind = "privatlivspolitik" | "cookiepolitik";

const B = import.meta.env.BASE_URL;
const clarity = tools.clarity;
const ga = tools.ga;
const anyTools = clarity || ga;

/**
 * The site's own privacy and cookie pages. They replace links to the old
 * site's pages, which were WordPress's untouched template text about blog
 * comments and logins this site does not have.
 *
 * Written from what this site actually does (lib/legal for the facts,
 * lib/analytics for which tools it uses), so adding or dropping a tool
 * changes both pages with it.
 */
export default function LegalPage({ kind }: { kind: LegalKind }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  return (
    <div className="np">
      <UspBar />
      <Header mobileNavOpen={mobileNavOpen} onNavToggle={() => setMobileNavOpen((v) => !v)} />
      <main>
        <article className="section legal">
          <div className="container">
            {kind === "privatlivspolitik" ? <Privacy /> : <Cookies />}
          </div>
        </article>
      </main>
      <Footer />
      <MobileCtaBar />
      <ToastProvider />
    </div>
  );
}

function Who() {
  return (
    <p>
      {controller.name} ({controller.trade}), {controller.form}, CVR {controller.cvr}, {controller.address}. E-mail{" "}
      <a href={`mailto:${controller.email}`} className="link">{controller.email}</a>, telefon {controller.phone}.
    </p>
  );
}

function Privacy() {
  return (
    <>
      <h1>Privatlivspolitik</h1>
      <p className="lead">
        Her står, hvilke oplysninger vi får om dig, hvad vi bruger dem til, hvem der ellers ser dem, og hvordan du
        får dem slettet.
      </p>
      <p className="legal__updated">Sidst opdateret {updated}.</p>

      <h2>Hvem er ansvarlig</h2>
      <Who />
      <p>Har du spørgsmål til dine oplysninger, så skriv eller ring til os.</p>

      <h2>Når du skriver eller ringer til os</h2>
      <p>
        Bruger du formularen, får vi din e-mail, dit telefonnummer hvis du skriver det, din besked og de billeder,
        du vedhæfter. Billederne bliver formindsket i din browser, før de sendes, og det fjerner placering og andre
        metadata fra dem. Skriver du en mail eller ringer, får vi de oplysninger, du selv giver os.
      </p>
      <p>
        Vi bruger dem kun til at svare dig og give dig et tilbud. Det er nødvendigt for at gøre det, du beder om,
        før vi eventuelt laver en aftale (databeskyttelsesforordningen artikel 6, stk. 1, litra b).
      </p>

      <h2>Når vi udfører en opgave for dig</h2>
      <p>
        Så har vi også dit navn og din adresse, hvad vi har behandlet og hvornår, og fakturaen. Vi bruger det til at
        udføre opgaven, give dig skriftlig dokumentation for behandlingen og sende regningen (artikel 6, stk. 1,
        litra b). Fakturaer og regnskab skal vi gemme efter bogføringsloven (litra c).
      </p>

      <h2>Statistik på hjemmesiden</h2>
      {anyTools ? (
        <>
          <p>
            Kun hvis du siger ja i cookieboksen, måler vi, hvordan siden bliver brugt, så vi kan gøre den bedre. Vi
            bruger det ikke til reklamer. Retsgrundlaget er dit samtykke (artikel 6, stk. 1, litra a), og du kan
            trække det tilbage når som helst under <CookieSettingsButton className="link legal__inline-btn" />.
          </p>
          <ul>
            {clarity && (
              <li>
                <strong>Microsoft Clarity</strong> viser, hvor folk klikker og scroller, og laver anonyme
                afspilninger af besøg. Det, du skriver i felter, bliver skjult og optages ikke.{" "}
                <a href="https://privacy.microsoft.com/da-dk/privacystatement" className="link" target="_blank" rel="noopener noreferrer">
                  Microsofts privatlivspolitik
                </a>
                .
              </li>
            )}
            {ga && (
              <li>
                <strong>Google Analytics</strong> tæller besøg og viser, hvilke sider der bliver læst, og hvor
                besøgende kommer fra.{" "}
                <a href="https://policies.google.com/privacy?hl=da" className="link" target="_blank" rel="noopener noreferrer">
                  Googles privatlivspolitik
                </a>
                .
              </li>
            )}
          </ul>
          <p>
            Microsoft og Google er amerikanske virksomheder. Oplysningerne kan blive overført til USA, hvilket sker
            under EU-U.S. Data Privacy Framework, som begge er certificeret efter.
          </p>
        </>
      ) : (
        <p>
          Vi bruger ingen værktøjer til statistik eller reklame på siden. Begynder vi på det, spørger vi dig først.
        </p>
      )}

      <h2>Hvem der ellers ser oplysningerne</h2>
      <ul>
        <li>Hjemmesiden ligger hos {processors.hosting}. Som alle webservere registrerer den din IP-adresse, når siden bliver hentet.</li>
        <li>
          {processors.formService
            ? `Beskeder fra formularen bliver sendt til os gennem ${processors.formService}.`
            : "Beskeder fra formularen og dine mails ligger hos vores udbyder af e-mail."}
        </li>
        <li>Vores bogholder og revisor ser fakturaer og regnskab.</li>
        {anyTools && <li>Microsoft og Google, som beskrevet ovenfor, og kun hvis du har sagt ja.</li>}
      </ul>
      <p>Vi sælger aldrig dine oplysninger, og vi giver dem ikke videre til andre formål.</p>

      <h2>Hvor længe vi gemmer dem</h2>
      <ul>
        <li>En henvendelse, der ikke bliver til en opgave, sletter vi senest {enquiryRetentionMonths} måneder efter den sidste kontakt.</li>
        <li>Fakturaer og regnskab gemmer vi i 5 år fra udgangen af regnskabsåret, som bogføringsloven kræver. Resten om en opgave sletter vi samtidig.</li>
        {anyTools && <li>Statistikken gemmes hos Microsoft og Google efter deres regler, typisk 12 til 14 måneder.</li>}
      </ul>

      <h2>Dine rettigheder</h2>
      <p>
        Du kan få at vide, hvilke oplysninger vi har om dig, og få dem rettet, slettet eller udleveret. Du kan bede
        os om at begrænse brugen af dem eller gøre indsigelse mod den. Skriv til{" "}
        <a href={`mailto:${controller.email}`} className="link">{controller.email}</a>, så svarer vi inden for en
        måned.
      </p>
      <p>
        Er du utilfreds med, hvordan vi bruger dine oplysninger, kan du klage til Datatilsynet, Carl Jacobsens Vej
        35, 2500 Valby,{" "}
        <a href="https://www.datatilsynet.dk" className="link" target="_blank" rel="noopener noreferrer">datatilsynet.dk</a>.
      </p>
      <p>
        Hvordan vi bruger cookies, står i vores <a href={`${B}cookiepolitik/`} className="link">cookiepolitik</a>.
      </p>
    </>
  );
}

function Cookies() {
  return (
    <>
      <h1>Cookiepolitik</h1>
      <p className="lead">
        En cookie er en lille fil, som en hjemmeside gemmer i din browser. Her står, hvilke vi bruger, og hvordan
        du siger nej.
      </p>
      <p className="legal__updated">Sidst opdateret {updated}.</p>

      <h2>Det gemmer vi altid</h2>
      <p>
        Dit svar i cookieboksen bliver gemt i din browser, så vi ikke spørger igen ved hvert besøg. Det er ikke en
        cookie men browserens lokale lager, og det indeholder kun dit ja eller nej. Det bliver liggende, til du
        ændrer dit valg eller rydder browseren.
      </p>

      <h2>Statistik, kun hvis du siger ja</h2>
      {anyTools ? (
        <>
          <p>
            Ingen af disse bliver sat, før du har trykket på "Ja tak". Trykker du på "Nej tak", eller lukker du ikke
            boksen, sætter vi dem ikke.
          </p>
          <div className="legal__table">
            <table>
              <thead>
                <tr><th>Cookie</th><th>Fra</th><th>Hvad den gør</th><th>Holder</th></tr>
              </thead>
              <tbody>
                {clarity && (
                  <>
                    <tr><td>_clck</td><td>Microsoft Clarity</td><td>Genkender din browser mellem besøg</td><td>1 år</td></tr>
                    <tr><td>_clsk</td><td>Microsoft Clarity</td><td>Samler sidevisningerne i ét besøg</td><td>1 dag</td></tr>
                    <tr><td>CLID</td><td>Microsoft Clarity</td><td>Genkender browseren første gang</td><td>1 år</td></tr>
                    <tr><td>MUID, ANONCHK, SM, MR</td><td>Microsoft</td><td>Microsofts egne cookies, som Clarity bruger</td><td>Fra besøget til 1 år</td></tr>
                  </>
                )}
                {ga && (
                  <>
                    <tr><td>_ga</td><td>Google Analytics</td><td>Skelner mellem besøgende</td><td>2 år</td></tr>
                    <tr><td>_ga_*</td><td>Google Analytics</td><td>Husker besøget på tværs af sider</td><td>2 år</td></tr>
                  </>
                )}
              </tbody>
            </table>
          </div>
          <p>Hvad Microsoft og Google gør med oplysningerne, står i vores <a href={`${B}privatlivspolitik/`} className="link">privatlivspolitik</a>.</p>
        </>
      ) : (
        <p>Vi sætter ingen cookies til statistik eller reklame. Begynder vi på det, spørger vi dig først.</p>
      )}

      <h2>Links til andre sider</h2>
      <p>
        Når du klikker videre til for eksempel Trustpilot eller e-mærket, gælder deres cookies og regler. Ingen af
        dem bliver hentet ind på vores side, før du klikker.
      </p>

      <h2>Sådan ændrer du dit valg</h2>
      {anyTools ? (
        <p>
          Du kan altid ændre eller trække dit svar tilbage under <CookieSettingsButton className="link legal__inline-btn" />.
          Siger du nej efter at have sagt ja, sletter vi cookierne fra statistikken. Du kan også slette cookies i
          din browsers indstillinger.
        </p>
      ) : (
        <p>Du kan slette det, browseren har gemt, i dens indstillinger.</p>
      )}

      <h2>Hvem er ansvarlig</h2>
      <Who />
    </>
  );
}
