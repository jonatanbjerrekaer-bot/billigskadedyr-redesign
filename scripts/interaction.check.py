#!/usr/bin/env python3
"""Prisberegnerens interaktionsregler, de to der kan maskintjekkes.

IX-08: hver knap i Estimator.tsx har en hover-regel i temaet, og intet
       understreget link eller knap på de vigtigste sider står uden hover.
IX-01: hver kontrol flytter resultatet (pris eller en linje under den).

De øvrige regler kræver et menneske; de står i design.md under
"Interaktion". Kræver en bygget dist/ og Chromium med CDP på :9222,
samme som prerender.py.

Kør: npm run build:site && python3 scripts/interaction.check.py
"""
import pathlib
import re
import sys
import time

sys.path.insert(0, str(pathlib.Path(__file__).parent))
import cdp  # noqa: E402
import prerender  # noqa: E402

ROOT = pathlib.Path(__file__).resolve().parent.parent
fails: list[str] = []


def hover_classes() -> set[str]:
    """Every class that appears in a selector carrying :hover."""
    out: set[str] = set()
    for f in ("src/themes/tradesman.css", "src/newsprint.css"):
        css = re.sub(r"/\*.*?\*/", "", (ROOT / f).read_text(), flags=re.S)
        for sel in re.findall(r"([^{}]+)\{", css):
            if ":hover" in sel:
                out |= set(re.findall(r"\.([\w-]+)", sel))
    return out


def check_hover():
    tsx = (ROOT / "src/components/Estimator.tsx").read_text()
    hovered = hover_classes()
    for cls in sorted(set(re.findall(r'<button[^>]*?className="([^"]+)"', tsx, flags=re.S))):
        if not set(cls.split()) & hovered:
            fails.append(f'IX-08 knap uden hover: className="{cls}" -> føj den til den fælles hover-regel i tradesman.css')


HELPERS = r"""
const sleep = ms => new Promise(r => setTimeout(r, ms));
const until = async (fn, ms = 5000) => { const t0 = Date.now(); for (;;) { const v = fn(); if (v) return v; if (Date.now() - t0 > ms) return null; await sleep(50); } };
const need = async sel => { const el = await until(() => document.querySelector(sel)); if (!el) throw new Error('fandt ikke ' + sel); return el; };
const result = () => document.querySelector('.estimator__result').textContent;
const row = t => [...document.querySelectorAll('.disclosure-trigger')].find(e => e.textContent.trim().startsWith(t));
// The page is prerendered, so the calculator is on screen before React listens.
// Openers retry until what they open is there, which also waits out hydration.
const open = async (click, sel) => {
  for (let i = 0; i < 50; i++) {
    const el = document.querySelector(sel);
    if (el) return el;
    if (i % 5 === 0) click();
    await sleep(100);
  }
  throw new Error('åbnede ikke ' + sel);
};
const openRow = (t, sel) => open(() => row(t)?.click(), sel);
const tilpas = () => open(() => { const t = row('Tilpas beregningen'); if (t.getAttribute('aria-expanded') !== 'true') t.click(); }, '[aria-label="Ejendomstype"] button');
const pick = (group, label) => [...document.querySelectorAll(`[aria-label="${group}"] button`)].find(b => b.textContent.trim() === label).click();
const type = (el, v) => {
  el.focus();
  Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(el, v);
  el.dispatchEvent(new Event('input', { bubbles: true }));
  el.dispatchEvent(new Event('change', { bubbles: true }));
  el.blur();
};
const HOUSES = '[aria-label="Antal huse, der går sammen"] button';
"""

# Each control is changed on a fresh page, after an opener has proven React is
# live; the result panel's text must change within 3 s.
CONTROLS = {
    "Areal": "await tilpas(); before = result(); type(await need('.area-field input'), '400');",
    "Ejendomstype": "await tilpas(); before = result(); pick('Ejendomstype', 'Lejlighed');",
    "Kørsel": "const f = await openRow('Kørsel', '.estimator__postcode input'); before = result(); type(f, '8800');",
    "Naboer": "await openRow('Naboer', HOUSES); before = result(); document.querySelectorAll(HOUSES)[1].click();",
    "Flere skadedyr": """
      await tilpas(); before = result();
      if (row('Har du også')) {
        await openRow('Har du også', '.estimator__extra-list');
      } else {
        (await openRow('Flere skadedyr', '.estimator__add [data-slot="select"] button')).click();
        (await need('[role="option"]')).click();
      }""",
}


# Every underlined link or button that is on screen must match some :hover rule.
LINK_AUDIT = r"""(() => {
  const hov = [];
  const walk = rules => { for (const r of rules) {
    if (r.cssRules && !r.selectorText) { try { walk(r.cssRules); } catch (e) {} }
    else if (r.selectorText && r.selectorText.includes(':hover')) hov.push(r.selectorText);
  } };
  for (const s of document.styleSheets) { try { walk(s.cssRules); } catch (e) {} }
  const hovered = el => hov.some(sel => sel.split(/,(?![^(]*\))/).some(x => {
    if (!x.includes(':hover')) return false;
    try { return el.matches(x.replace(/:hover(::?[\w-]+)?/g, '').replace(/::?(before|after)/g, '').trim()); } catch (e) { return false; }
  }));
  return [...document.querySelectorAll('a, button')]
    .filter(el => getComputedStyle(el).textDecorationLine.includes('underline') && el.getClientRects().length && !hovered(el))
    .map(el => `${el.className || el.tagName}: "${el.textContent.trim().slice(0, 40)}"`);
})()"""
LINK_PAGES = ["", "service/myrer/", "cookiepolitik/", "privatlivspolitik/"]


def check_links():
    for page in LINK_PAGES:
        tab = cdp.Tab(f"http://127.0.0.1:{prerender.PORT}{prerender.BASE}{page}")
        try:
            tab.js("new Promise(r => setTimeout(r, 1500))", timeout=10)
            for hit in tab.js(LINK_AUDIT) or []:
                fails.append(f"IX-08 link uden hover på /{page}: {hit} -> føj klassen til den fælles hover-regel i tradesman.css")
        finally:
            tab.close()


def check_controls():
    url = f"http://127.0.0.1:{prerender.PORT}{prerender.BASE}service/myrer/"
    for name, steps in CONTROLS.items():
        tab = cdp.Tab(url)
        label = name
        try:
            for _ in range(50):
                if tab.js("!!document.querySelector('.estimator__result')"):
                    break
                time.sleep(0.2)
            moved = tab.js(
                f"(async () => {{ {HELPERS} let before; {steps}\n"
                "return !!(await until(() => result() !== before, 3000)); })()",
                timeout=20,
            )
        except RuntimeError as e:
            moved, label = False, f"{name} (kunne ikke betjenes: {str(e).splitlines()[0][:80]})"
        finally:
            tab.close()
        if not moved:
            fails.append(f"IX-01 kontrol ændrer intet i resultatet: {label}")


if __name__ == "__main__":
    check_hover()
    # The server runs in a daemon thread and dies with the process, as in
    # prerender.py; shutdown() would wait on Chrome's open connection.
    prerender.serve()
    check_controls()
    check_links()
    if fails:
        print("\n".join(fails))
        sys.exit(1)
    print(f"OK interaktion  ({len(CONTROLS)} kontroller flytter resultatet, alle knapper og links på {len(LINK_PAGES)} sider har hover)")
