import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * One-time entrance for card grids: rises 8px and fades in the first time the
 * element scrolls into view, staggered per sibling via `delay`. The observer
 * disconnects after firing, so it never replays, and the element is fully
 * interactive before and during the entrance. Under reduced motion only the
 * opacity fades (index.css). If IntersectionObserver is unavailable the
 * content renders immediately.
 *
 * Whether it has fired is React state rather than a class added by hand. It
 * used to be `el.classList.add("is-revealed")`, which React knew nothing
 * about: any later render rewrote className from props and wiped it, and
 * since the observer had already disconnected the element stayed at opacity 0
 * forever. That is invisible until something re-renders a revealed element,
 * which is exactly what filtering a list does. Anything React renders must be
 * state React owns.
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
  immediate = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Skip the entrance and render shown. For content that
      appears in response to something the visitor just did, where waiting
      for a scroll would read as the result having failed to load. */
  immediate?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(immediate);

  useEffect(() => {
    if (revealed) return;
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setRevealed(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [revealed]);

  return (
    <div
      ref={ref}
      className={`reveal ${revealed ? "is-revealed" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
