/*
 * Butikkens egen router.
 *
 * Butikken og servicesitet er to sites, ikke to afdelinger af ét. Derfor har
 * de hver sit entrypoint og hver sin router, og derfor kan man ikke skrive et
 * link fra servicesitet ind i butikken uden at gøre det med vilje: routeren
 * derovre kender ikke butikkens adresser, og denne her kender kun sine egne.
 *
 * Retningen er hele pointen. Fra butikken til fagmanden er en henvisning, vi
 * gerne vil have folk til at følge. Den anden vej ville være at sende en
 * kunde, der har besluttet sig for at få en pris, hen for at kigge på en
 * spray til 140 kr., og det er at tabe salget for at redde et andet.
 *
 * Links ud af butikken er derfor helt almindelige links: de bliver til en
 * rigtig sideindlæsning, fordi de går til et andet site. Det er ikke en
 * mangel, det er den korrekte adfærd, når man forlader huset.
 */
import { useEffect, useSyncExternalStore } from "react";
import { flushSync } from "react-dom";

const BASE = import.meta.env.BASE_URL;
const SHOP = BASE + "shop/";

export type ShopRoute =
  | { kind: "home" }
  | { kind: "browse" }
  | { kind: "product"; slug: string };

export function shopRouteOf(pathname: string): ShopRoute {
  const rest = pathname.startsWith(SHOP) ? pathname.slice(SHOP.length) : "";
  const product = rest.match(/^produkt\/([^/]+)\/?$/);
  if (product) return { kind: "product", slug: product[1]! };
  if (/^produkter\/?$/.test(rest)) return { kind: "browse" };
  return { kind: "home" };
}

const listeners = new Set<() => void>();
let current = typeof location === "undefined" ? "" : location.pathname + location.search;

function emit() {
  current = location.pathname + location.search;
  listeners.forEach((l) => l());
}

/** Adressen inklusive søgestrengen, fordi ?dyr=mus er en del af siden. */
export function useLocationKey(): string {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => current,
    () => current,
  );
}

const reduced = () =>
  typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

function applyScroll() {
  const hash = location.hash.slice(1);
  if (hash) {
    const el = document.getElementById(hash);
    if (el) {
      el.scrollIntoView({ behavior: "instant" as ScrollBehavior });
      return;
    }
  }
  scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
}

/**
 * Varebilledet, man klikkede paa, faar navnet "vare". Produktsidens billede
 * baerer det samme navn, saa browseren flytter det ene hen paa det andet i
 * stedet for at klippe mellem to sider.
 *
 * Navnet saettes ved klikket og staar ikke fast paa hvert kort: den samme
 * vare kan ligge i to karruseller paa forsiden, og to elementer med samme
 * navn afbryder hele overgangen. Ét navn ad gangen kan ikke kollidere.
 */
function markShot(a: Element): (() => void) | undefined {
  const img = a.querySelector("img");
  if (!(img instanceof HTMLImageElement)) return;
  img.style.viewTransitionName = "vare";
  return () => {
    img.style.viewTransitionName = "";
  };
}

function go(url: string, clear?: () => void) {
  const run = () => {
    history.pushState({}, "", url);
    flushSync(emit);
    applyScroll();
  };
  if (reduced() || !document.startViewTransition) {
    run();
    clear?.();
    return;
  }
  const vt = document.startViewTransition(run);
  // Navnet skal af igen. Bliver det staaende, baerer et gammelt kort det
  // stadig, hvis man gaar tilbage, og saa er der to om det.
  if (clear) void vt.finished.then(clear, clear);
}

export function navigate(url: string) {
  go(url);
}

/**
 * Fanger klik inde i butikken. Alt andet får lov at være en rigtig
 * navigation, og det gælder udtrykkeligt links til servicesitet.
 */
export function useShopLinkRouting() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const a = (e.target as Element | null)?.closest?.("a");
      if (!a) return;
      if (a.target && a.target !== "_self") return;
      if (a.hasAttribute("download") || a.getAttribute("rel")?.includes("external")) return;

      const href = a.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("tel:") || href.startsWith("mailto:")) {
        return;
      }

      const url = new URL(href, location.href);
      if (url.origin !== location.origin) return;
      // Kun butikkens egne adresser. Et link til /service/hvepse/ falder
      // igennem her og bliver en almindelig indlæsning, hvilket er meningen.
      if (!url.pathname.startsWith(SHOP)) return;

      e.preventDefault();
      const clear =
        shopRouteOf(url.pathname).kind === "product" ? markShot(a) : undefined;
      go(url.pathname + url.search + url.hash, clear);
    }

    document.addEventListener("click", onClick);
    const onPop = () => emit();
    addEventListener("popstate", onPop);
    return () => {
      document.removeEventListener("click", onClick);
      removeEventListener("popstate", onPop);
    };
  }, []);
}
