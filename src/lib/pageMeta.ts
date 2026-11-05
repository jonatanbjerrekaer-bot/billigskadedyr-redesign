import { useEffect } from "react";
import { metaFor, type RouteInput } from "./routes.ts";

/** The tab title and description for whichever page is showing (the list lives in lib/routes.ts). */
export function usePageMeta(input: RouteInput) {
  const { slug = "", legal = "", serviceIndex = false, species } = input;
  useEffect(() => {
    const { title, description } = metaFor({ slug, legal, serviceIndex, species });
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
  }, [slug, legal, serviceIndex, species]);
}
