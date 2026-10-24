/**
 * Microsoft Clarity and Google Analytics 4, loaded only after "Accepter".
 * Ported from the Viborg Motionscenter site, onto this site's own consent
 * store (lib/consent).
 *
 * To switch a tool on, paste its ID below; nothing else needs touching. An
 * empty ID means that tool never loads and is never named in the banner.
 * Changing which IDs are set asks every visitor again, because a yes only
 * counts for the tools it was given for (see TOOLS in lib/consent).
 */
export const analytics = {
  clarityId: "", // Clarity project ID, e.g. "z0o4bp0phe"
  gaId: "", // GA4 measurement ID, e.g. "G-XXXXXXXXXX"
};

/** "Google Analytics og Microsoft Clarity", or just the one that is set. */
export const analyticsToolNames = [analytics.gaId && "Google Analytics", analytics.clarityId && "Microsoft Clarity"]
  .filter(Boolean)
  .join(" og ");

// Only the real site counts. The GitHub Pages and GX10 previews would fill the
// stats with our own visits; 127.0.0.1 stays on so the consent flow can be
// tested locally with the tool requests blocked.
const COUNTED_HOSTS = ["billigskadedyrprof.dk", "www.billigskadedyrprof.dk", "127.0.0.1"];

declare global {
  interface Window {
    clarity?: ((...args: unknown[]) => void) & { q?: unknown[] };
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function addScript(src: string) {
  if (document.querySelector(`script[src="${src}"]`)) return;
  const s = document.createElement("script");
  s.async = true;
  s.src = src;
  document.head.appendChild(s);
}

/** Loads the tools the visitor agreed to. Safe to call twice. */
export function loadAnalytics() {
  if (!COUNTED_HOSTS.includes(location.hostname)) return;
  if (analytics.clarityId) {
    // Microsoft's snippet: a queue the real script drains once it has loaded.
    window.clarity ??= Object.assign((...args: unknown[]) => void (window.clarity!.q ??= []).push(args), {});
    window.clarity("consentv2", { ad_Storage: "denied", analytics_Storage: "granted" });
    addScript(`https://www.clarity.ms/tag/${analytics.clarityId}`);
  }
  if (analytics.gaId && !window.gtag) {
    window.dataLayer ??= [];
    // gtag must push the `arguments` object itself, not an array copy.
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
    window.gtag("js", new Date());
    window.gtag("config", analytics.gaId, { anonymize_ip: true });
    addScript(`https://www.googletagmanager.com/gtag/js?id=${analytics.gaId}`);
  }
}

/** Removes the first-party cookies these tools set. Third-party ones belong to Google and Microsoft. */
export function clearAnalyticsCookies() {
  const host = location.hostname.replace(/^www\./, "");
  for (const c of document.cookie.split(";")) {
    const name = c.split("=")[0].trim();
    if (!/^(_ga|_gid|_gat|_clck|_clsk|CLID|ANONCHK|MR|MUID|SM)/.test(name)) continue;
    for (const domain of ["", `; domain=${host}`, `; domain=.${host}`]) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain}`;
    }
  }
}
