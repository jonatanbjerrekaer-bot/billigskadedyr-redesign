import { useMemo } from "react";
import { createBrowserRouter, Outlet, useParams } from "react-router";
import App from "./App.tsx";
import ConsentBox from "./components/ConsentBox.tsx";
import LegalPage from "./components/LegalPage.tsx";
import ServiceIndexPage from "./components/ServiceIndexPage.tsx";
import ServicePage from "./components/ServicePage.tsx";
import SpeciesPage from "./components/SpeciesPage.tsx";
import { useLinkRouting } from "./lib/linkRouting.ts";
import { usePageMeta } from "./lib/pageMeta.ts";
import { servicePest } from "./lib/serviceContent.ts";
import { speciesBySlug, type SpeciesArticle } from "./lib/speciesContent.ts";
import type { LegalKind } from "./lib/routes.ts";

/**
 * The site's pages. The list of addresses that get their own HTML file at
 * build time is in lib/routes.ts; keep the two in step (a service or article
 * added to the content shows up in both).
 *
 * A slug the content does not know means the URL is wrong, and the front page
 * is a better answer than an empty frame.
 */
function Root() {
  useLinkRouting();
  return (
    <>
      <Outlet />
      <ConsentBox />
    </>
  );
}

function Home() {
  usePageMeta({});
  return <App />;
}

function ServiceIndexRoute() {
  usePageMeta({ serviceIndex: true });
  return <ServiceIndexPage />;
}

function ServiceRoute() {
  const { service = "" } = useParams();
  const known = !!servicePest(service);
  usePageMeta(known ? { slug: service } : {});
  return known ? <ServicePage slug={service} /> : <App />;
}

function SpeciesRoute() {
  const { service = "", species: speciesSlug = "" } = useParams();
  const article = servicePest(service) ? speciesBySlug(service, speciesSlug) : undefined;
  // One tuple per article rather than per render, so the meta effect does not rerun every render.
  const species = useMemo(
    () => (article ? ([service, article] as [string, SpeciesArticle]) : undefined),
    [service, article],
  );
  usePageMeta(species ? { species } : {});
  return species ? <SpeciesPage service={species[0]} article={species[1]} /> : <App />;
}

function LegalRoute({ kind }: { kind: LegalKind }) {
  usePageMeta({ legal: kind });
  return <LegalPage kind={kind} />;
}

export const router = createBrowserRouter(
  [
    {
      element: <Root />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "service",
          children: [
            { index: true, element: <ServiceIndexRoute /> },
            { path: ":service", element: <ServiceRoute /> },
            { path: ":service/:species", element: <SpeciesRoute /> },
          ],
        },
        { path: "privatlivspolitik", element: <LegalRoute kind="privatlivspolitik" /> },
        { path: "cookiepolitik", element: <LegalRoute kind="cookiepolitik" /> },
        { path: "*", element: <Home /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
);
