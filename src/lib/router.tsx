import { useEffect, useSyncExternalStore } from "react";

/**
 * A router small enough to read in one sitting.
 *
 * The site is sixteen real HTML documents, one per pest, because that is what
 * gives each pest an indexable URL, and prerendering fills each of them with
 * real content. What it cost was that every link was a document load: the
 * browser threw away a rendered page and built the next one from scratch, and
 * that is what read as a reload even once the blank was gone.
 *
 * So clicks inside the site stop being navigations. The URL still changes,
 * history still works, and every URL still serves its own prerendered file to
 * anything arriving cold, including crawlers. What changes is that arriving
 * from inside now swaps React state rather than the document.
 *
 * Everything that should still be a real navigation stays one: other origins,
 * downloads, targets, modified clicks, and anything the browser knows better
 * than we do about.
 */

const BASE = import.meta.env.BASE_URL; // "/billigskadedyr-redesign/"

/** "/base/service/myrer/" -> "myrer". The front page gives "". */
export function slugOf(pathname: string): string {
  const rest = pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname.replace(/^\//, "");
  const m = rest.match(/^service\/([^/]+)\/?$/);
  return m ? m[1]! : "";
}

const listeners = new Set<() => void>();
let current = typeof location === "undefined" ? "" : location.pathname;

function emit() {
  current = location.pathname;
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => listeners.delete(l);
}

/** The current pathname, as a value React re-renders on. */
export function usePathname(): string {
  return useSyncExternalStore(
    subscribe,
    () => current,
    () => current,
  );
}

const reduced = () =>
  typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Swap page. The pest tile on the grid and the tile in the service hero share
 * a view-transition-name, so with startViewTransition the icon travels between
 * the two instead of the pages cross-fading. Without support, or under reduced
 * motion, the swap is instant, which is the correct fallback rather than a
 * degraded imitation.
 */
function go(url: string, replace = false) {
  const run = () => {
    history[replace ? "replaceState" : "pushState"]({}, "", url);
    emit();
  };
  if (reduced() || !document.startViewTransition) {
    run();
    return;
  }
  document.startViewTransition(run);
}

export function navigate(url: string) {
  go(url);
}

/**
 * Intercepts in-site link clicks once, at the document. A listener per link
 * would mean re-binding every time the pest list re-renders, and would miss
 * links rendered by anything that does not know about the router.
 */
export function useLinkRouting(onNavigate?: () => void) {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      // let the browser have the clicks it handles better: new tab, download,
      // context menu, anything with a modifier held
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const a = (e.target as Element | null)?.closest?.("a");
      if (!a) return;
      if (a.target && a.target !== "_self") return;
      if (a.hasAttribute("download") || a.getAttribute("rel")?.includes("external")) return;

      const href = a.getAttribute("href");
      if (!href || href.startsWith("#")) return; // same-page anchor: browser scrolls

      const url = new URL(href, location.href);
      if (url.origin !== location.origin) return;
      if (!url.pathname.startsWith(BASE)) return;

      // a hash on the page we are already on is a scroll, not a navigation
      if (url.pathname === location.pathname && url.hash) return;

      e.preventDefault();
      go(url.pathname + url.search + url.hash);
      onNavigate?.();
    }

    document.addEventListener("click", onClick);
    const onPop = () => emit();
    addEventListener("popstate", onPop);
    return () => {
      document.removeEventListener("click", onClick);
      removeEventListener("popstate", onPop);
    };
  }, [onNavigate]);
}

/**
 * After a swap, put the reader where the link promised. A hash scrolls to its
 * target; anything else starts at the top, because arriving halfway down a
 * page you have not seen is disorienting. Back and forward are left alone:
 * the browser restores those positions itself and does it better.
 */
export function useRouteScroll(pathname: string) {
  useEffect(() => {
    const hash = location.hash.slice(1);
    if (hash) {
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: reduced() ? "auto" : "smooth" });
        return;
      }
    }
    scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
}
