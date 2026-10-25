import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

/**
 * Wraps a ToggleButtonGroup so its selection is one dark thumb that slides to
 * the chosen button, instead of a fill that jumps. The thumb is the group's
 * ::before (tradesman.css); this only measures where it should sit and hands
 * that over as CSS variables, so the move itself is a CSS transition and
 * retargets cleanly when someone clicks through the options quickly.
 * `value` is what changes the selection; resizes are caught by an observer.
 */
export default function SegmentTrack({ value, children }: { value: unknown; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  // Off until the first measurement lands, so the thumb does not slide in
  // from the left edge on page load; the selected button paints itself till then.
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    const wrap = ref.current;
    const group = wrap?.querySelector<HTMLElement>(".toggle-button-group");
    if (!wrap || !group) return;
    const place = () => {
      const sel = group.querySelector<HTMLElement>("[data-selected]");
      if (!sel) return;
      group.style.setProperty("--seg-x", `${sel.offsetLeft}px`);
      group.style.setProperty("--seg-w", `${sel.offsetWidth}px`);
    };
    place();
    const ro = new ResizeObserver(place);
    ro.observe(group);
    // A frame later, so the first position is painted before transitions are on.
    const raf = requestAnimationFrame(() => setReady(true));
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value]);

  return (
    <div ref={ref} className="seg" data-ready={ready || undefined}>
      {children}
    </div>
  );
}
