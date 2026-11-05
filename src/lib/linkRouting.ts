import { useEffect } from "react";
import { useNavigate } from "react-router";

/**
 * In-site links, the way this site wants them.
 *
 * React Router does the routing, history and matching. What it does not do is
 * the page change the site is designed around: a view transition in which the
 * pest icon you clicked flies from its tile to the service page's hero, and a
 * scroll that lands where the reader expects. That lives here, once, at the
 * document: a listener per link would need re-binding whenever the pest list
 * re-renders and would miss anchors rendered by anything that does not know
 * about the router (the library components, the linkified article text).
 *
 * Everything that should still be a real navigation stays one: other origins,
 * downloads, targets, modified clicks, and anything the browser knows better
 * than we do about.
 */

const BASE = import.meta.env.BASE_URL; // "/billigskadedyr-redesign/", "/" when hosted at the root

/** "/base/service/myrer/?a=1#x" -> "/service/myrer/?a=1#x" (the router adds the base itself). */
const toRoute = (url: string) => "/" + url.slice(BASE.length);

/** "/service/myrer/" -> "myrer". Anything else gives "". */
const slugOf = (routePath: string) => routePath.match(/^\/service\/([^/]+)\/?$/)?.[1] ?? "";

const reduced = () => typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Where the reader lands after a swap. A hash goes to its target, anything
 * else to the top, because arriving halfway down a page you have not seen is
 * disorienting. Always instant: this runs inside the transition callback, and
 * a smooth scroll would still be moving when the browser takes its snapshot.
 */
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
 * Names the one glyph for the pest a navigation is about, and only that one.
 * Every pest icon used to carry its name permanently, so every in-site
 * navigation flew all of them at once, from wherever they sat on the old page,
 * across the screen to the new one. Only the icon you clicked has somewhere
 * to go; the rest belong to the cross-fade. "" clears them all.
 */
function flyPest(slug: string) {
  let named = false;
  document.querySelectorAll<HTMLElement>("[data-vt-pest]").forEach((el) => {
    // a name may appear once per page, so the first match is the one that flies
    const fly = !named && !!slug && el.dataset.vtPest === slug;
    el.style.viewTransitionName = fly ? `pest-${slug}` : "";
    if (fly) named = true;
  });
}

type Navigate = ReturnType<typeof useNavigate>;

function go(navigate: Navigate, route: string) {
  // The pest the move is about: the page you are going to, or the one you are
  // leaving when you go back to the list.
  const slug = slugOf(route.split(/[?#]/)[0] ?? "") || slugOf(toRoute(location.pathname));
  const run = async () => {
    // flushSync: startViewTransition captures the new state the moment this
    // resolves, and a render merely scheduled would let the browser snapshot
    // the old page as the destination, so the icon would fly to where it used to be.
    await navigate(route, { flushSync: true });
    // Scroll is part of that snapshot too. The chip can be far down the page
    // while the hero tile is at the top, so moving after the capture would
    // measure the flight against a viewport about to change.
    applyScroll();
    flyPest(slug);
  };
  if (reduced() || !document.startViewTransition) {
    void run();
    return;
  }
  flyPest(slug);
  document.startViewTransition(run).finished.finally(() => flyPest(""));
}

export function useLinkRouting() {
  const navigate = useNavigate();
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
      if (!href) return;

      if (href.startsWith("#")) {
        const id = href.slice(1);
        // A target that is here is the browser's job, exactly as before.
        if (!id || document.getElementById(id)) return;
        // A target that is not here would otherwise be a click that does
        // nothing. The front page carries every section, so send it there
        // with the hash and let applyScroll land on it after the render.
        e.preventDefault();
        go(navigate, "/" + href);
        return;
      }

      const url = new URL(href, location.href);
      if (url.origin !== location.origin) return;
      if (!url.pathname.startsWith(BASE)) return;

      // a hash on the page we are already on is a scroll, not a navigation
      if (url.pathname === location.pathname && url.hash) return;

      e.preventDefault();
      go(navigate, toRoute(url.pathname) + url.search + url.hash);
    }

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [navigate]);
}

// Back and forward are the router's, and they do not scroll here on purpose:
// the browser restores those positions itself and does it better than we would.
