import { useEffect, useId, useState } from "react";
import { Button, Checkbox, CheckboxGroup } from "@heroui/react";
import { ChevronDown, X } from "lucide-react";

/**
 * Filtrene.
 *
 * Den forrige udgave hældte alle værdier ud på én gang: seksten skadedyr,
 * fem prisgrupper, alle typer og alle mærker, under hinanden, i en søjle
 * der var tre skærme lang. Det er ikke et filter, det er et katalog over
 * filtre, og man skal rulle for at finde ud af, om det man leder efter
 * overhovedet findes.
 *
 * Baymard beskriver de tre ting, der gør en sidebar brugbar, og de er alle
 * tre lavet her:
 *
 *   Grupperne kan foldes sammen. Så kan man se, hvilke slags filtre der er,
 *   uden at læse hver eneste værdi. De to første står åbne, fordi de er dem,
 *   folk bruger; resten åbner man, hvis man vil.
 *
 *   Lange lister er skåret ned til seks med en "vis alle". Testdeltagere
 *   overser bunden af en lang liste, og en liste med seksten værdier
 *   skubber alt under sig ud af skærmen.
 *
 *   Sidebaren følger med ned. Filtrene skal kunne nås, mens man kigger på
 *   varerne, ikke kun mens man kigger på toppen af listen.
 *
 * En gruppe med under to værdier vises ikke. Der er intet at vælge imellem,
 * og en overskrift med ét punkt under er kun en linje mere at læse.
 */

export type Option = { id: string; label: string; count: number };

const VIS = 6;

function Group({
  title, options, selected, onChange, defaultOpen, rowClass,
  renderIcon,
}: {
  title: string;
  options: Option[];
  selected: Set<string>;
  onChange: (v: string[]) => void;
  defaultOpen?: boolean;
  rowClass: string;
  renderIcon?: (id: string) => React.ReactNode;
}) {
  const [all, setAll] = useState(false);
  const id = useId();

  // Intet at vælge imellem: så er gruppen støj.
  if (options.length < 2) return null;

  // Et valgt filter, der ligger gemt bag "vis alle", er et filter man ikke
  // kan finde igen. Er noget valgt langt nede, foldes listen ud af sig selv.
  const hiddenSelected = options.slice(VIS).some((o) => selected.has(o.id));
  const show = all || hiddenSelected ? options : options.slice(0, VIS);
  const rest = options.length - show.length;

  return (
    <details
      open={defaultOpen || selected.size > 0}
      className="filter-group border-b border-ink-200 py-3"
    >
      <summary className="flex items-center gap-2 cursor-pointer list-none select-none min-h-[44px] font-display font-bold text-ink-950">
        <span className="grow">{title}</span>
        {selected.size > 0 && (
          <span className="rounded-full bg-ink-950 text-cream text-xs font-sans font-bold tabular-nums px-2 py-0.5">
            {selected.size}
          </span>
        )}
        <ChevronDown
          size={18}
          strokeWidth={2.5}
          aria-hidden="true"
          className="filter-chevron text-ink-600 shrink-0"
        />
      </summary>

      <CheckboxGroup
        aria-label={title}
        value={[...selected]}
        onChange={onChange}
        className="flex flex-col gap-1 mt-1.5"
      >
        {show.map((o) => (
          <Checkbox
            key={o.id}
            value={o.id}
            isDisabled={o.count === 0 && !selected.has(o.id)}
            className="group w-full data-[disabled]:opacity-35"
          >
            <Checkbox.Content className={rowClass}>
              <Checkbox.Control>
                <Checkbox.Indicator />
              </Checkbox.Control>
              {renderIcon?.(o.id)}
              <span className="grow text-left">{o.label}</span>
              <span className="text-xs tabular-nums opacity-70">{o.count}</span>
            </Checkbox.Content>
          </Checkbox>
        ))}
      </CheckboxGroup>

      {rest > 0 && (
        <Button
          onPress={() => setAll(true)}
          aria-controls={id}
          className="mt-1 bg-transparent text-sm font-semibold text-ink-700 hover:text-ink-950 underline underline-offset-4 px-3 h-9"
        >
          Vis alle {options.length}
        </Button>
      )}
      {all && options.length > VIS && (
        <Button
          onPress={() => setAll(false)}
          className="mt-1 bg-transparent text-sm font-semibold text-ink-700 hover:text-ink-950 underline underline-offset-4 px-3 h-9"
        >
          Vis færre
        </Button>
      )}
    </details>
  );
}

export type GroupSpec = {
  key: string;
  title: string;
  options: Option[];
  selected: Set<string>;
  onChange: (v: string[]) => void;
  renderIcon?: (id: string) => React.ReactNode;
};

export default function ShopFilters({
  groups, inStock, inStockCount, onInStock, open, onClose, resultCount, onClear,
  hasFilters,
}: {
  groups: GroupSpec[];
  inStock: boolean;
  inStockCount: number;
  onInStock: (v: boolean) => void;
  open: boolean;
  onClose: () => void;
  resultCount: number;
  onClear: () => void;
  hasFilters: boolean;
}) {
  const ROW =
    "w-full flex items-center gap-2.5 rounded-lg px-3 min-h-[44px] text-[15px] font-semibold " +
    "border-2 border-transparent text-ink-800 hover:border-ink-300 transition-colors " +
    "group-data-[selected]:bg-ink-950 group-data-[selected]:text-cream group-data-[selected]:border-ink-950";

  /* Skuffen er et lag over siden, ikke et felt der skubber listen ned.
     Baggrunden bag den skal ikke kunne rulle, ellers mister man sin plads
     i listen, mens man vælger filtre. */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", esc);
    };
  }, [open, onClose]);

  const body = (
    <>
      {groups.map((g, i) => (
        <Group
          key={g.key}
          title={g.title}
          options={g.options}
          selected={g.selected}
          onChange={g.onChange}
          defaultOpen={i < 2}
          rowClass={ROW}
          renderIcon={g.renderIcon}
        />
      ))}

      <div className="py-3">
        <Checkbox
          isSelected={inStock}
          onChange={onInStock}
          className="group w-full"
        >
          <Checkbox.Content className={ROW}>
            <Checkbox.Control>
              <Checkbox.Indicator />
            </Checkbox.Control>
            <span className="grow text-left">Kun på lager</span>
            <span className="text-xs tabular-nums opacity-70">{inStockCount}</span>
          </Checkbox.Content>
        </Checkbox>
      </div>
    </>
  );

  return (
    <>
      {/* Skrivebord. Sidebaren følger med ned, så filtrene kan nås, mens
          man kigger på varer langt nede i listen. */}
      <div className="shop-filter hidden lg:block lg:sticky lg:top-4 lg:max-h-[calc(100vh-2rem)] lg:overflow-y-auto lg:pr-1">
        <div className="flex items-center justify-between min-h-[44px]">
          <h2 className="select-none text-[11px] font-bold uppercase tracking-widest text-ink-600 m-0">
            Filtrér
          </h2>
          {hasFilters && (
            <Button
              onPress={onClear}
              className="bg-transparent text-sm font-semibold text-ink-700 hover:text-ink-950 underline underline-offset-4 px-1 h-9"
            >
              Ryd alle
            </Button>
          )}
        </div>
        {body}
      </div>

      {/* Mobil. En skuffe over siden med knappen i bunden, hvor tommelen er,
          og med antallet på: man skal kunne se, hvad valgene har gjort, før
          man lukker skuffen. */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-[60] flex">
          <button
            type="button"
            aria-label="Luk filtre"
            onClick={onClose}
            className="absolute inset-0 bg-ink-950/50 border-0 p-0"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Filtre"
            className="drawer relative ml-auto flex h-full w-[min(92vw,26rem)] flex-col bg-cream shadow-2xl"
          >
            <div className="flex items-center justify-between gap-2 border-b-2 border-ink-200 px-4 py-3">
              <h2 className="font-display text-lg font-bold text-ink-950 m-0">Filtre</h2>
              {hasFilters && (
                <Button
                  onPress={onClear}
                  className="bg-transparent text-sm font-semibold text-ink-700 underline underline-offset-4 px-1 h-11"
                >
                  Ryd alle
                </Button>
              )}
              <Button
                onPress={onClose}
                aria-label="Luk filtre"
                className="bg-transparent text-ink-950 h-11 w-11 p-0 grid place-items-center rounded-full hover:bg-ink-100"
              >
                <X size={22} strokeWidth={2.5} aria-hidden="true" />
              </Button>
            </div>

            <div className="shop-filter flex-1 overflow-y-auto px-4">{body}</div>

            <div className="border-t-2 border-ink-200 p-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              <Button
                onPress={onClose}
                className="w-full rounded-full bg-accent-500 text-ink-950 font-display text-base font-bold min-h-[52px]"
              >
                Vis {resultCount} {resultCount === 1 ? "vare" : "varer"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
