#!/usr/bin/env python3
"""Write real HTML into every built page.

Vite ships each entry as a 1.3 KB shell holding nothing but <div id="root">.
That one file is the cause of two separate complaints. A visitor navigating
between pages sees the shell's background and nothing else until React has
downloaded and rendered, which is the "blank page" that makes a multi page
site feel broken. And a crawler, whether Google's or an assistant's, is handed
that same empty div: fifty-six answers, the species lists, the prices and even
the H1 are invisible to anything that does not run JavaScript.

This renders each page in the browser that is already on this machine, then
writes the rendered markup back into the file. The page now paints its content
on first frame, and the content is in the source for anything that reads HTML.

React still mounts normally afterwards. The entry uses createRoot rather than
hydrateRoot, so React replaces the prerendered DOM with an identical tree
instead of trying to adopt it. That costs one render and removes every class
of hydration mismatch, which matters here because the estimator's copy depends
on the season: markup built in December and read in June would not agree, and
a mismatch is a worse failure than a re-render nobody can see.

Each service page also gets a FAQPage block built from its own questions. The
homepage had one written by hand; the sixteen service pages, which carry all
the real long-tail questions, had none.

Run: python3 scripts/prerender.py            (after npm run build)
Needs: a chromium listening for CDP on 9222.
"""
import http.server
import json
import pathlib
import re
import socketserver
import sys
import threading

sys.path.insert(0, "/tmp")
import cdp  # noqa: E402

ROOT = pathlib.Path(__file__).resolve().parent.parent
DIST = ROOT / "dist"
BASE = "/billigskadedyr-redesign/"
PORT = 8791


def serve():
    """dist has to be reachable at its real base path or the assets 404."""
    stage = pathlib.Path("/tmp/prerender-root")
    stage.mkdir(exist_ok=True)
    link = stage / BASE.strip("/")
    if link.is_symlink():
        link.unlink()
    link.symlink_to(DIST)

    class Handler(http.server.SimpleHTTPRequestHandler):
        def __init__(self, *a, **kw):
            super().__init__(*a, directory=str(stage), **kw)

        def log_message(self, *a):
            pass

    # Back-to-back runs otherwise die on the previous socket's TIME_WAIT.
    socketserver.TCPServer.allow_reuse_address = True
    httpd = socketserver.TCPServer(("127.0.0.1", PORT), Handler)
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    return httpd


def faq_schema(tab):
    """Build FAQPage from what the page actually rendered, so the structured
    data can never drift from the visible answers."""
    raw = tab.js("""(() => {
      const heads = [...document.querySelectorAll('h2')];
      const h = heads.find(e => /Ofte stillede/i.test(e.textContent));
      if (!h) return "[]";
      const sec = h.closest('section');
      const out = [];
      sec.querySelectorAll('[role="button"], button').forEach(btn => {
        const q = btn.textContent.trim();
        if (!q.endsWith('?')) return;
        const panel = btn.closest('div')?.parentElement?.querySelector('p');
        if (panel) out.push({ q, a: panel.textContent.trim() });
      });
      return JSON.stringify(out);
    })()""")
    items = json.loads(raw)
    if not items:
        return None
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {"@type": "Question", "name": i["q"],
             "acceptedAnswer": {"@type": "Answer", "text": i["a"]}}
            for i in items
        ],
    }


def main():
    pages = sorted(DIST.glob("service/*/index.html")) + [DIST / "index.html"]
    httpd = serve()
    done = 0
    try:
        for f in pages:
            rel = f.relative_to(DIST).parent
            url = f"http://127.0.0.1:{PORT}{BASE}" + (f"{rel}/" if str(rel) != "." else "")
            tab = cdp.Tab(url, 9222)
            try:
                # every entry opens each accordion item's panel into the DOM,
                # so waiting for the first h1 is enough to know React is done
                tab.js("""new Promise((res, rej) => {
                  const t0 = Date.now();
                  (function poll() {
                    if (document.querySelector('h1')) return res(true);
                    if (Date.now() - t0 > 15000) return rej(new Error('no h1'));
                    setTimeout(poll, 50);
                  })();
                })""", timeout=25)
                tab.js("new Promise(r => setTimeout(r, 400))")

                schema = faq_schema(tab) if str(rel) != "." else None
                html = tab.js("document.documentElement.outerHTML")
            finally:
                tab.close()

            if schema:
                tag = ('<script type="application/ld+json">'
                       + json.dumps(schema, ensure_ascii=False) + "</script>")
                html = html.replace("</head>", tag + "\n  </head>", 1)

            # the runtime sets these on mount; keep what it produced
            out = "<!doctype html>\n" + html
            f.write_text(out, encoding="utf-8")
            n_q = len(schema["mainEntity"]) if schema else 0
            print(f"  {str(rel):28} {len(out) // 1024:>4} KB   {n_q} spørgsmål i schema")
            done += 1
    finally:
        httpd.shutdown()
    print(f"prerendered {done} pages")


if __name__ == "__main__":
    main()
