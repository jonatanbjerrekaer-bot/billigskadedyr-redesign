import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import ServicePage from "./components/ServicePage.tsx";
import { serviceContentFor, servicePest } from "./lib/serviceContent.ts";
import { slugOf, usePathname, useLinkRouting } from "./lib/router.tsx";
import "./index.css";

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

/** The tab title and description for whichever page is showing. */
function useDocumentMeta(slug: string) {
  useEffect(() => {
    const pest = slug ? servicePest(slug) : undefined;
    const content = slug ? serviceContentFor(slug) : undefined;

    document.title = pest
      ? `Professionel bekæmpelse af ${pest.label.toLowerCase()} | Billigskadedyr.dk`
      : "Billigskadedyr.dk | Professionel skadedyrsbekæmpelse i Jylland og på Fyn";

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      "content",
      content
        ? content.intro.slice(0, 155)
        : "Fast pris før vi går i gang. Certificerede fagfolk i hele Jylland og på Fyn.",
    );

    // The shells carry the slug so the prerender knows which page it is
    // rendering. Keeping it in step means a prerendered file always matches
    // the URL it sits at.
    document.documentElement.setAttribute("data-pest", slug);
  }, [slug]);
}

function Site() {
  const pathname = usePathname();
  const slug = slugOf(pathname);
  useLinkRouting();
  useDocumentMeta(slug);

  // A slug the registry does not know means the URL is wrong, and the front
  // page is a better answer than an empty frame.
  if (slug && servicePest(slug)) return <ServicePage slug={slug} />;
  return <App />;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Site />
  </StrictMode>,
);
