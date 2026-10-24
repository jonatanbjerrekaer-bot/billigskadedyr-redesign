import { ListBox, ListBoxItem, Select as HeroSelect } from "@heroui/react";
import type { ReactNode } from "react";

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
}) {
  return (
    <HeroSelect.Root
      aria-label={ariaLabel}
      selectedKey={value}
      onSelectionChange={(key) => onValueChange(String(key))}
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

      <HeroSelect.Popover className={paper ? "np-popover" : "rounded-lg border border-ink-700 bg-ink-800 p-1 shadow-xl"}>
        <ListBox>
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
        </ListBox>
      </HeroSelect.Popover>
    </HeroSelect.Root>
  );
}
