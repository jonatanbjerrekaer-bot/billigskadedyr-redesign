import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import ShopHome from "./components/shop/ShopHome.tsx";
import ProductBrowser from "./components/shop/ProductBrowser.tsx";
import ProductPage from "./components/shop/ProductPage.tsx";
import { BY_SLUG, PEST_LABEL, type PestKey } from "./lib/shop.ts";
import { shopRouteOf, useLocationKey, useShopLinkRouting, type ShopRoute } from "./lib/shopRouter.tsx";
import "./index.css";

/**
 * Butikkens entrypoint.
 *
 * Servicesitet har sit eget i main.tsx og deler ingen route-tabel med det
 * her. Det er den tekniske udgave af den samme regel som i teksten: man kan
 * gå fra butikken over til fagmanden, og ikke den anden vej.
 */

function useShopMeta(route: ShopRoute) {
  useEffect(() => {
    const p = route.kind === "product" ? BY_SLUG.get(route.slug) : undefined;

    document.title =
      route.kind === "home"
        ? "Skadedyrsmidler og fælder til hus og have | Billigskadedyr.dk"
        : route.kind === "browse"
          ? // Titlen skal sige, hvad man ser på. Et filter er en side i sig
            // selv for den, der bogmærker eller deler den.
            (() => {
              const dyr = new URLSearchParams(location.search).get("dyr");
              const label = dyr && dyr in PEST_LABEL ? PEST_LABEL[dyr as PestKey] : null;
              return label
                ? `Alt mod ${label.toLowerCase()} | Billigskadedyr.dk`
                : "Alle varer | Billigskadedyr.dk";
            })()
          : p
            ? `${p.name} mod ${PEST_LABEL[p.pest].toLowerCase()} | Billigskadedyr.dk`
            : "Varen findes ikke | Billigskadedyr.dk";

    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute(
      "content",
      p
        ? p.blurb.slice(0, 155)
        : "Godkendte midler, fælder og sikring mod mus, rotter, hvepse, myrer og møl. Fri fragt over 499 kr.",
    );
  }, [route.kind, route.kind === "product" ? route.slug : ""]);
}

/**
 * Butikkens baggrund.
 *
 * Dokumentet er sat til servicesitets mørkegrønne, fordi det er den rigtige
 * farve der. Butikken er lys, og uden det her stod hver overskrift sort på
 * sort. Den sættes på html-elementet og ikke kun på en wrapper, så den også
 * dækker det, der er under sidens indhold på en kort side.
 */
function useLightPage() {
  useEffect(() => {
    const html = document.documentElement;
    const before = html.style.backgroundColor;
    html.style.backgroundColor = "var(--color-cream)";
    return () => {
      html.style.backgroundColor = before;
    };
  }, []);
}

function Shop() {
  const key = useLocationKey();
  const route = shopRouteOf(new URL(key, location.origin).pathname);
  useShopLinkRouting();
  useShopMeta(route);
  useLightPage();

  switch (route.kind) {
    case "browse":
      // key tvinger en frisk montering, når ?dyr= skifter, så filteret i
      // browserens egen state følger adressen i stedet for at hænge fast.
      return <ProductBrowser key={key} />;
    case "product":
      return <ProductPage slug={route.slug} />;
    default:
      return <ShopHome />;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="bg-cream text-ink-950 min-h-screen">
      <Shop />
    </div>
  </StrictMode>,
);
