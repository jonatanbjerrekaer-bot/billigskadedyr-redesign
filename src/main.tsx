import { StrictMode, useEffect, useMemo } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import ServicePage from "./components/ServicePage.tsx";
import ServiceIndexPage from "./components/ServiceIndexPage.tsx";
import LegalPage from "./components/LegalPage.tsx";
import SpeciesPage from "./components/SpeciesPage.tsx";
import ConsentBox from "./components/ConsentBox.tsx";
import { servicePest } from "./lib/serviceContent.ts";
import { speciesBySlug, type SpeciesArticle } from "./lib/speciesContent.ts";
import { metaFor, type RouteInput } from "./lib/routes.ts";
import { slugOf, legalOf, speciesRouteOf, usePathname, useLinkRouting } from "./lib/router.tsx";
import "./index.css";

// iOS Safari only applies :active (our pressed state on touch) when a touch
// listener exists on the page; this empty passive one guarantees it.
document.addEventListener("touchstart", () => {}, { passive: true });

// Hidden-until-revealed states are scoped under .js, so nothing is invisible
// for a visitor whose script never runs.
document.documentElement.classList.add("js");

/**
 * One entry for the whole site.
 *
 * There used to be two, one per kind of page, which is the natural shape for
 * a set of separate documents. It is the wrong shape once links stop being
 * document loads: a router can only swap between pages that are in the same
 * bundle. So both live here, and which one renders is a function of the URL.
 *
 * Nothing about the URLs changed. Every pest still has its own address and
 * its own prerendered file, so a cold arrival, from a search result or a
 * shared link, gets that file with its content in it. The router only takes
 * over once the visitor is already inside.
 */

/** The tab title and description for whichever page is showing (the list lives in lib/routes.ts). */
function useDocumentMeta(input: RouteInput) {
  const { slug = "", species } = input;
  useEffect(() => {
    const { title, description } = metaFor(input);
    document.title = title;

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);

    // The generated page files carry the slug so the prerender knows which page
    // it is rendering. Keeping it in step means a prerendered file always
    // matches the URL it sits at.
    document.documentElement.setAttribute("data-pest", species ? species[0] : slug);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input.slug, input.legal, input.serviceIndex, species]);
}

function Site() {
  const pathname = usePathname();
  const slug = slugOf(pathname);
  const legal = legalOf(pathname);
  const route = speciesRouteOf(pathname);
  // The bare /service/ URL: one level above every service page, so neither
  // slugOf (one segment) nor speciesRouteOf (two) claims it. Checked before
  // the slug fallback, which would otherwise render the front page here.
  const serviceIndex = pathname === `${import.meta.env.BASE_URL}service/`;
  const article = route && servicePest(route[0]) ? speciesBySlug(route[0], route[1]) : undefined;
  // One tuple per article rather than per render, so the meta effect does not
  // rerun on every render of the page.
  const species = useMemo(() => (route && article ? ([route[0], article] as [string, SpeciesArticle]) : undefined), [route?.[0], article]);
  useLinkRouting();
  useDocumentMeta({ slug, legal, serviceIndex, species });

  // A slug the registry does not know means the URL is wrong, and the front
  // page is a better answer than an empty frame. The cookie box sits outside
  // the page so it shows wherever a visitor lands, not only on the front page.
  const page = legal ? (
    <LegalPage kind={legal} />
  ) : species ? (
    <SpeciesPage service={species[0]} article={species[1]} />
  ) : slug && servicePest(slug) ? (
    <ServicePage slug={slug} />
  ) : serviceIndex ? (
    <ServiceIndexPage />
  ) : (
    <App />
  );
  return (
    <>
      {page}
      <ConsentBox />
    </>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Site />
  </StrictMode>,
);
