import { SERVICE_CONTENT, serviceContentFor, servicePest } from "./serviceContent";
import { allSpeciesRoutes, speciesBySlug, type SpeciesArticle } from "./speciesContent";

/**
 * Every page of the site and the title and description each one carries.
 *
 * One list serves two readers. The running app sets the tab title from it
 * (main.tsx), and the build writes one HTML file per page from it
 * (scripts/routePages.ts), so a cold arrival from a search result gets the
 * right words in the source before any script has run. Add a service or a
 * species article to the content and its page, title and sitemap entry follow.
 */

export type LegalKind = "privatlivspolitik" | "cookiepolitik";
export type PageMeta = { title: string; description: string };
/** `path` is relative to the site base, with a trailing slash: "service/myrer/". */
export type Page = PageMeta & { path: string; pest: string };

const HOME_DESCRIPTION =
  "Vi kommer ud i hele Jylland og på Fyn, ser på det og giver en fast pris, før vi går i gang. Skriv til os, så svarer vi inden for en hverdag.";

/** Species pages are named for the species: that is what someone searching "husedderkop" typed. */
export const speciesTitle = (a: SpeciesArticle) => `${a.title ?? a.name}: kendetegn og bekæmpelse | Billigskadedyr.dk`;

export type RouteInput = {
  slug?: string;
  legal?: LegalKind | "";
  serviceIndex?: boolean;
  species?: [string, SpeciesArticle];
};

export function metaFor({ slug = "", legal = "", serviceIndex = false, species }: RouteInput): PageMeta {
  const pest = slug ? servicePest(slug) : undefined;
  const content = slug ? serviceContentFor(slug) : undefined;

  const title = species
    ? speciesTitle(species[1])
    : legal
      ? `${legal === "privatlivspolitik" ? "Privatlivspolitik" : "Cookiepolitik"} | Billigskadedyr.dk`
      : pest
        ? `Bekæmpelse af ${pest.label.toLowerCase()} til fast pris | Billigskadedyr.dk`
        : serviceIndex
          ? "Alle skadedyr i Danmark: kendetegn, tegninger og priser | Billigskadedyr.dk"
          : "Skadedyrsbekæmpelse i Jylland og på Fyn | Billigskadedyr.dk";

  const description = species
    ? species[1].description
    : legal
      ? legal === "privatlivspolitik"
        ? "Hvilke oplysninger Billigskadedyr får om dig, hvad vi bruger dem til, og hvordan du får dem slettet."
        : "Hvilke cookies Billigskadedyr.dk bruger, og hvordan du siger ja eller nej til dem."
      : content
        ? content.intro.slice(0, 155)
        : serviceIndex
          ? "Alle skadedyr i Danmark i én liste: kendetegn, blæktegninger og fast pris på behandling. Vælg dit skadedyr, eller skriv hvad du har set."
          : HOME_DESCRIPTION;

  return { title, description };
}

/** Every page except the front page, which is index.html itself. */
export function allPages(): Page[] {
  const pages: Page[] = [{ path: "service/", pest: "", ...metaFor({ serviceIndex: true }) }];
  for (const slug of Object.keys(SERVICE_CONTENT).filter((s) => servicePest(s))) {
    pages.push({ path: `service/${slug}/`, pest: slug, ...metaFor({ slug }) });
  }
  for (const [service, slug] of allSpeciesRoutes()) {
    const article = servicePest(service) ? speciesBySlug(service, slug) : undefined;
    if (article) {
      pages.push({ path: `service/${service}/${slug}/`, pest: service, ...metaFor({ species: [service, article] }) });
    }
  }
  for (const legal of ["privatlivspolitik", "cookiepolitik"] as const) {
    pages.push({ path: `${legal}/`, pest: "", ...metaFor({ legal }) });
  }
  return pages;
}
