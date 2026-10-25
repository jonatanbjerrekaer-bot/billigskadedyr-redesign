import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { ToastProvider } from "@heroui/react";
import Header from "./Header";
import UspBar from "./UspBar";
import Footer from "./Footer";
import MobileCtaBar from "./MobileCtaBar";
import Contact from "./Contact";
import SpeciesCards from "./SpeciesCards";
import { PestGlyph, PRICED_PESTS } from "../lib/pests";
import { serviceContentFor, servicePest } from "../lib/serviceContent";
import { SPECIES_ART } from "../lib/speciesArt";
import type { SpeciesArticle } from "../lib/speciesContent";
import { linkify } from "../lib/wikiLinks";

const B = import.meta.env.BASE_URL;

/**
 * One species, one page: the long version of a card on the service page.
 *
 * It is a reference page first, so the article leads and the selling is kept
 * to what the service page already says: the way back to the treatment and
 * the contact form, email before phone. Someone who landed here from a search
 * for "husedderkop" wants to know what he is looking at before he wants a
 * price, and is more likely to ask for one when the page has answered him.
 */
export default function SpeciesPage({ service, article }: { service: string; article: SpeciesArticle }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  // main.tsx only renders this page for a known service, so both are there.
  const pest = servicePest(service)!;
  const content = serviceContentFor(service)!;
  const label = pest.label;
  const heading = article.title ?? article.name;
  const card = content.species?.find((sp) => sp.name === article.name);
  const art = SPECIES_ART[article.name];
  const siblings = (content.species ?? []).filter((sp) => sp.name !== article.name);
  const priced = PRICED_PESTS.some((p) => p.slug === service);
  const servicePage = `${B}service/${service}/`;
  // Filled while the article renders: each page linked once, never this one.
  const linked = new Set([`${servicePage}${article.slug}/`]);

  return (
    <div className="np">
      <UspBar />
      <Header mobileNavOpen={mobileNavOpen} onNavToggle={() => setMobileNavOpen((v) => !v)} />
      <main>
        <section className="svc-hero">
          <div className="container grid12">
            {/* The full path rather than a single back link: arriving from a
                search, the reader has not seen the service page and should
                be able to tell that it is one step up. */}
            <nav aria-label="Brødkrumme" className="crumbs" style={{ gridColumn: "1 / -1" }}>
              <ol>
                <li>
                  <a href={`${B}service/`}>Alle skadedyr</a>
                  <ChevronRight size={14} aria-hidden="true" />
                </li>
                <li>
                  <a href={servicePage}>{label}</a>
                  <ChevronRight size={14} aria-hidden="true" />
                </li>
                <li aria-current="page">{heading}</li>
              </ol>
            </nav>
            <div className="svc-hero__title">
              {/* The service page's pest glyph, so the species reads as part of it. */}
              <span className="svc-hero__glyph">
                <PestGlyph pest={pest} size={64} />
              </span>
              <div>
                <h1>{heading}</h1>
                {article.latin && <p className="species-page__latin">{article.latin}</p>}
              </div>
            </div>
            {card && <p className="lead svc-hero__lead">{card.text}</p>}
            <div className="actions">
              <a href="#skriv" className="btn btn--primary">
                Skriv til os
              </a>
              <a href={servicePage} className="btn btn--secondary">
                Sådan behandler vi {label.toLowerCase()}
              </a>
            </div>
          </div>
        </section>

        <section className="section">
          <div className={`container species-page${art ? "" : " species-page--plain"}`}>
            {art && (
              <figure className="species-page__art">
                <div className="species__art">
                  <img src={`${B}species/${art}.webp`} alt={`Tegning af ${article.name.toLowerCase()}`} />
                </div>
                <figcaption>Tegning fra et gammelt naturhistorisk værk, efter et frit foto eller efter et museumseksemplar.</figcaption>
              </figure>
            )}
            <article className="species-page__body">
              {article.sections.map((s) => (
                <section key={s.heading}>
                  <h2>{s.heading}</h2>
                  {s.paragraphs.map((p) => (
                    <p key={p.slice(0, 40)}>{linkify(p, linked)}</p>
                  ))}
                </section>
              ))}
              <div className="species-page__cta">
                <h2>Vil du have hjælp?</h2>
                <p>
                  Skriv, hvad du har set, og gerne et billede. Så siger vi, om du selv kan klare det, eller om det er
                  en opgave for os. Prisen ligger fast, før vi går i gang.
                </p>
                <div className="actions">
                  <a href="#skriv" className="btn btn--primary">
                    Skriv til os
                  </a>
                  <a href={`${servicePage}#estimator`} className="btn btn--secondary">
                    {priced ? "Beregn din pris" : "Få et fast tilbud"}
                  </a>
                </div>
              </div>
              {article.sources.length > 0 && (
                <div className="species-page__sources">
                  <h2>Kilder</h2>
                  <ul>
                    {article.sources.map((url) => (
                      <li key={url}>
                        <a href={url} className="link" rel="external noopener" target="_blank">
                          {sourceLabel(url)}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          </div>
        </section>

        {siblings.length > 0 && (
          <section className="section">
            <div className="container">
              <h2>Andre {label.toLowerCase()}</h2>
              <SpeciesCards service={service} species={siblings} />
              <p style={{ marginTop: "var(--space-lg)" }}>
                <a href={servicePage} className="link">
                  Alt om {label.toLowerCase()} og behandlingen
                </a>
              </p>
            </div>
          </section>
        )}

        <Contact pestLabel={label} />
      </main>
      <Footer />
      <MobileCtaBar />
      <ToastProvider />
    </div>
  );
}

/** "https://da.wikipedia.org/wiki/Husedderkop" -> "da.wikipedia.org: Husedderkop". */
function sourceLabel(url: string): string {
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    const last = decodeURIComponent(u.pathname.split("/").filter(Boolean).pop() ?? "").replace(/[_-]+/g, " ");
    return last ? `${host}: ${last}` : host;
  } catch {
    return url;
  }
}
