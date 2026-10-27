import { ListBox, ListBoxItem, Select as HeroSelect } from "@heroui/react";
import { usePreventScroll } from "react-aria";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

/**
 * Thin wrapper over HeroUI's Select so the call site stays a plain
 * value/onValueChange contract and the palette lives in one place.
 *
 * HeroUI v3 is built on react-aria-components, so this keeps listbox
 * semantics, type-ahead, arrow/Home/End keys, Escape and focus return —
 * the things a native <select> gives for free and a div-based menu loses.
 */
export type SelectOption = { value: string; label: string; icon?: ReactNode };

export default function Select({
  value,
  onValueChange,
  options,
  ariaLabel,
  triggerId,
  paper,
  more,
  placeholder,
}: {
  value: string;
  onValueChange: (v: string) => void;
  options: SelectOption[];
  ariaLabel?: string;
  /** Lets another control focus and open this select. */
  triggerId?: string;
  /** The redesigned pages' ruled field and sheet. The shop keeps its own look
      until it is redesigned. */
  paper?: boolean;
  /** Extra options behind a last "+N …" row. Picking that row unfolds them in
      the open list; picking one of them calls onMore, not onValueChange. */
  more?: { label: (n: number) => string; hint?: string; options: SelectOption[]; onPick: (v: string) => void };
  /** Shown while value is "": an action picker that never holds a value. */
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  /* Which ends of the list still hide rows: drives the blurred, shadowed edge. */
  const [edge, setEdge] = useState({ top: false, bottom: false });
  const listEl = useRef<HTMLDivElement | null>(null);
  const measure = useCallback(() => {
    const el = listEl.current;
    if (!el) return;
    const top = el.scrollTop > 1;
    const bottom = el.scrollTop + el.clientHeight < el.scrollHeight - 1;
    setEdge((e) => (e.top === top && e.bottom === bottom ? e : { top, bottom }));
  }, []);
  /* Arrow keys: react-aria scrolls the focused row just into view, which puts
     it under the blurred edge. Keep two rows of room on either side instead.
     Keyboard only: hover also moves focus in a select list, and the list must
     not scroll away under a mouse. */
  const byKeys = useRef(false);
  const onKey = useCallback(() => {
    byKeys.current = true;
  }, []);
  const onPointer = useCallback(() => {
    byKeys.current = false;
  }, []);
  const keepRoom = useCallback((e: FocusEvent) => {
    const el = listEl.current;
    const row = e.target as HTMLElement;
    if (!el || !byKeys.current || !row.matches('[role="option"]')) return;
    requestAnimationFrame(() => {
      const room = row.offsetHeight * 2;
      const top = row.offsetTop - room;
      const bottom = row.offsetTop + row.offsetHeight + room - el.clientHeight;
      if (el.scrollTop > top) el.scrollTop = Math.max(0, top);
      else if (el.scrollTop < bottom) el.scrollTop = bottom;
    });
  }, []);
  const listRef = useCallback(
    (el: HTMLDivElement | null) => {
      listEl.current?.removeEventListener("scroll", measure);
      listEl.current?.removeEventListener("focusin", keepRoom);
      listEl.current?.removeEventListener("keydown", onKey);
      listEl.current?.removeEventListener("pointermove", onPointer);
      listEl.current = el;
      if (el) {
        // Opened from the keyboard counts as keys until the mouse moves.
        byKeys.current = !el.matches(":hover");
        el.addEventListener("scroll", measure, { passive: true });
        el.addEventListener("focusin", keepRoom);
        el.addEventListener("keydown", onKey);
        el.addEventListener("pointermove", onPointer, { passive: true });
        requestAnimationFrame(measure);
      }
    },
    [measure, keepRoom, onKey, onPointer],
  );
  // Unfolding the "+N" rows grows the list without a scroll event.
  useEffect(() => {
    if (open) requestAnimationFrame(measure);
  }, [open, showMore, measure]);
  /* The phone sheet is NON-modal: RAC's default (modal) moves focus into the
     popover on open, and on WebKit — deep in a scrolled page — that focus is
     lost to the body a beat later, the blur closes the sheet (adobe/react-
     spectrum#7579, #4533). Non-modal leaves focus on the trigger; nothing can
     blur it shut. We give back what modal gave us, by hand: a scrim portal
     (tap to close) and a document scroll lock. */
  const [sheet, setSheet] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 40rem)");
    const update = () => setSheet(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  // Modal popovers scroll-lock via react-aria; the non-modal sheet must lock
  // the page itself or drags on the scrim strip scroll the document behind.
  // This is the same hook RAC calls for its own modal overlays.
  usePreventScroll({ isDisabled: !(open && paper && sheet) });
  /* Pin the open sheet to the VISUAL viewport. `fixed; bottom: 0` anchors to
     the layout viewport, which on WebKit can extend past what is actually
     shown — URL-bar chrome, pinch zoom, a panned page — so the sheet's lower
     edge and its last rows land off screen and the list reads as broken.
     visualViewport geometry tracks all of those, so the sheet hugs the
     visible rectangle. The CSS is var-driven (see tradesman.css) so the
     !important rules win over react-aria's own inline positioning. HeroUI
     does not forward the Popover ref, and react-aria REMOUNTS the popover
     node when the "+N" row unfolds the list — a MutationObserver re-pins
     whichever node is mounted, no refs involved. */
  useEffect(() => {
    if (!(open && paper && sheet)) return;
    const vv = window.visualViewport;
    if (!vv) return;
    let raf = 0;
    let pinnedEl: HTMLElement | null = null;
    const unpin = (el: HTMLElement) => {
      el.classList.remove("np-popover--pinned");
      el.style.removeProperty("--np-sheet-top");
      el.style.removeProperty("--np-sheet-left");
      el.style.removeProperty("--np-sheet-width");
      el.style.removeProperty("--np-sheet-height");
    };
    const pin = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = document.querySelector<HTMLElement>(".np-popover");
        if (!el) return;
        if (pinnedEl && pinnedEl !== el) unpin(pinnedEl);
        pinnedEl = el;
        el.style.setProperty("--np-sheet-top", `${vv.offsetTop + vv.height * 0.15}px`);
        el.style.setProperty("--np-sheet-left", `${vv.offsetLeft}px`);
        el.style.setProperty("--np-sheet-width", `${vv.width}px`);
        el.style.setProperty("--np-sheet-height", `${vv.height * 0.85}px`);
        el.classList.add("np-popover--pinned");
      });
    };
    pin();
    vv.addEventListener("resize", pin);
    vv.addEventListener("scroll", pin);
    const mo = new MutationObserver(pin);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      cancelAnimationFrame(raf);
      vv.removeEventListener("resize", pin);
      vv.removeEventListener("scroll", pin);
      mo.disconnect();
      if (pinnedEl) unpin(pinnedEl);
    };
  }, [open, paper, sheet]);
  /* Touch leak shield, armed SYNCHRONOUSLY when the sheet opens. On iOS the
     tap that opens it is followed — same task, before React can flush a
     single state update — by synthesized mouse events hit-tested against the
     freshly opened rows: the row under the finger gets "clicked" and the
     sheet closes as fast as it opened. A body class takes pointer-events
     off the sheet at hit-test time, which no event ordering can race; the
     scrim also ignores taps while armed. The next real pointerdown (the
     user's first deliberate tap) stands it down, with a timeout for opens
     that came from the keyboard. */
  const armedRef = useRef(false);
  const armTimerRef = useRef(0);
  const disarmShield = () => {
    if (!armedRef.current) return;
    armedRef.current = false;
    document.body.classList.remove("np-sheet-arming");
    window.removeEventListener("pointerdown", disarmShield, { capture: true });
    window.removeEventListener("pointercancel", disarmShield, { capture: true });
    window.clearTimeout(armTimerRef.current);
  };
  const armShield = () => {
    disarmShield();
    armedRef.current = true;
    document.body.classList.add("np-sheet-arming");
    window.addEventListener("pointerdown", disarmShield, { capture: true });
    window.addEventListener("pointercancel", disarmShield, { capture: true });
    armTimerRef.current = window.setTimeout(disarmShield, 600);
  };
  const closeSheet = () => {
    disarmShield();
    setOpen(false);
    setShowMore(false);
  };
  // The list closes on any pick, the "+N" row included; this keeps that one
  // close from folding the extra rows away again before it reopens.
  const unfolding = useRef(false);
  const MORE = "__more";
  const extra = more && showMore ? more.options : [];
  return (
    <>
      {open && paper && sheet &&
        createPortal(
          <div
            className="np-sheet-scrim"
            onPointerDown={() => {
              // While the shield is armed the opener's synthesized events hit
              // the scrim (the sheet itself ignores pointer-events) — a tap
              // there must not close what the user just opened.
              if (!armedRef.current) closeSheet();
            }}
          />,
          document.body,
        )}
      <HeroSelect.Root
      aria-label={ariaLabel}
      selectedKey={value || null}
      placeholder={placeholder}
      isOpen={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (o && paper && sheet) armShield();
        if (!o) disarmShield();
        if (!o && !unfolding.current) setShowMore(false);
        unfolding.current = false;
      }}
      onSelectionChange={(key) => {
        const k = String(key);
        // The "+N" row is a button inside the list, not a value: unfold and stay open.
        if (k === MORE) {
          unfolding.current = true;
          setShowMore(true);
          requestAnimationFrame(() => setOpen(true));
          // Bring the unfolded rows into view, after react-aria's own
          // scroll-to-selected on reopen has run.
          window.setTimeout(() => {
            const el = listEl.current;
            const first = el?.querySelector<HTMLElement>(".select-more-item");
            if (el && first) el.scrollTo({ top: first.offsetTop - first.offsetHeight, behavior: "smooth" });
          }, 120);
          return;
        }
        if (more?.options.some((o) => o.value === k)) return more.onPick(k);
        onValueChange(k);
      }}
      fullWidth
    >
      <HeroSelect.Trigger id={triggerId} className={paper ? "select-trigger" : "w-full rounded-lg border border-ink-700 bg-ink-800 px-3 py-2.5 text-left text-cream min-h-[52px] hover:border-ink-600 data-[pressed]:border-accent-500"}>
        {/* The trigger mirrors the row so the icon does not appear only on open. */}
        {/* Value renders the selected option's own children, icon included.
            The accent colour is set here so the glyph inherits it. */}
        <span className={`flex items-center gap-3 grow min-w-0 ${paper ? "" : "text-accent-500"}`}>
          <HeroSelect.Value className={`flex items-center gap-3 truncate ${paper ? "" : "text-cream"}`} />
        </span>
        <HeroSelect.Indicator className="text-ink-100/70" />
      </HeroSelect.Trigger>

      <HeroSelect.Popover isNonModal={paper && sheet} className={paper ? `np-popover${edge.top ? " np-more-above" : ""}${edge.bottom ? " np-more-below" : ""}` : "rounded-lg border border-ink-700 bg-ink-800 p-1 shadow-xl"}>
        {paper && <EdgeFade side="top" />}
        <ListBox ref={paper ? listRef : undefined}>
          {options.map((o) => (
            <ListBoxItem
              key={o.value}
              id={o.value}
              textValue={o.label}
              className={paper ? "cursor-pointer px-3 py-2 outline-none flex items-center gap-3" : "cursor-pointer rounded-md px-3 py-2 text-sm text-ink-100 outline-none flex items-center gap-3 data-[focused]:bg-ink-700 data-[focused]:text-cream data-[selected]:font-semibold data-[selected]:text-accent-500"}
            >
              {o.icon && (
                <span className={`shrink-0 flex w-7 items-center justify-center ${paper ? "" : "text-accent-500"}`}>
                  {o.icon}
                </span>
              )}
              {o.label}
            </ListBoxItem>
          ))}
          {extra.map((o) => (
            <ListBoxItem
              key={o.value}
              id={o.value}
              textValue={o.label}
              className="cursor-pointer px-3 py-2 outline-none flex items-center gap-3 select-more-item"
            >
              {o.icon && <span className="shrink-0 flex w-7 items-center justify-center">{o.icon}</span>}
              <span className="grow">{o.label}</span>
              {more?.hint && <span className="small muted">{more.hint}</span>}
            </ListBoxItem>
          ))}
          {more && !showMore && (
            <ListBoxItem id={MORE} textValue={more.label(more.options.length)} className="cursor-pointer px-3 py-2 outline-none flex items-center gap-3 select-more">
              <span className="shrink-0 flex w-7 items-center justify-center" aria-hidden="true">+</span>
              {more.label(more.options.length)}
            </ListBoxItem>
          )}
        </ListBox>
        {paper && <EdgeFade side="bottom" />}
      </HeroSelect.Popover>
    </HeroSelect.Root>
    </>
  );
}

/* Eight stacked blur layers, each stronger and masked to a later band, so the rows
   soften gradually into the edge instead of under one flat blur. */
function EdgeFade({ side }: { side: "top" | "bottom" }) {
  return (
    <div className={`np-edge np-edge--${side}`} aria-hidden="true">
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <i key={i} />
      ))}
    </div>
  );
}
