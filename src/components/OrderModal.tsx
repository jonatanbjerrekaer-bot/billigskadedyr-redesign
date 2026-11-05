import { useEffect, useRef, useState, type FormEvent } from "react";
import { Input, Label, TextField } from "@heroui/react";
import { Loader2, X } from "lucide-react";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_MIN_DIGITS = 8;

export type OrderSelection = {
  pest: string;
  extraPests: string[];
  property: string;
  area: string | null;
  count: string | null;
  houses: number;
  postcode: string | null;
  price: number;
  priceLabel: string;
  totalLabel: string | null;
  caption: string;
  driving: string;
};

export type OrderRequest = {
  name: string;
  email: string;
  phone: string;
  selection: OrderSelection;
};

type Errors = { name?: string; email?: string; phone?: string };
type Status = "idle" | "sending" | "success" | "error";

export default function OrderModal({
  open,
  selection,
  onClose,
  onSubmit,
}: {
  open: boolean;
  selection: OrderSelection;
  onClose: () => void;
  onSubmit: (order: OrderRequest) => Promise<void>;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");
  const sending = status === "sending";

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      setStatus("idle");
      setErrors({});
      dialog.showModal();
      requestAnimationFrame(() => document.getElementById("order-name")?.focus({ preventScroll: true }));
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const close = () => {
    if (sending) return;
    if (status === "success") {
      setName("");
      setEmail("");
      setPhone("");
    }
    setStatus("idle");
    onClose();
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (sending) return;

    const next: Errors = {};
    if (!name.trim()) next.name = "Skriv dit navn, så vi ved, hvem vi skal kontakte.";
    const trimmedEmail = email.trim();
    if (!trimmedEmail) next.email = "Skriv din e-mail, så vi kan svare dig.";
    else if (!EMAIL_RE.test(trimmedEmail)) next.email = "Den e-mail ser ikke rigtig ud. Tjek den lige.";
    if (phone.replace(/\D/g, "").length < PHONE_MIN_DIGITS) next.phone = "Skriv et telefonnummer med mindst 8 cifre.";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setStatus("sending");
    try {
      await onSubmit({
        name: name.trim(),
        email: trimmedEmail,
        phone: phone.trim(),
        selection,
      });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const details = [
    { label: "Skadedyr", value: [selection.pest, ...selection.extraPests].join(", ") },
    { label: "Ejendomstype", value: selection.property },
    ...(selection.area ? [{ label: "Areal", value: selection.area }] : []),
    ...(selection.count ? [{ label: "Antal", value: selection.count }] : []),
    ...(selection.houses > 1 ? [{ label: "Antal huse", value: String(selection.houses) }] : []),
    ...(selection.postcode ? [{ label: "Postnummer", value: selection.postcode }] : []),
  ];

  return (
    <dialog
      ref={dialogRef}
      className="order-modal"
      aria-labelledby="order-modal-title"
      aria-describedby="order-modal-intro"
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="order-modal__panel">
        <button
          type="button"
          className="order-modal__close"
          aria-label="Luk bestilling"
          onClick={close}
          disabled={sending}
        >
          <X size={22} aria-hidden="true" />
        </button>

        {status === "success" ? (
          <div className="order-modal__success" role="status">
            <p className="order-modal__eyebrow">Forespørgsel sendt</p>
            <h2 id="order-modal-title">Tak, {name.trim()}.</h2>
            <p id="order-modal-intro">
              Vi kontakter dig for at aftale tidspunktet. Din forespørgsel indeholder {selection.pest.toLowerCase()} til{" "}
              {selection.priceLabel}. Du betaler først, når arbejdet er udført.
            </p>
            <button type="button" className="btn btn--primary" onClick={close}>
              Luk
            </button>
          </div>
        ) : (
          <>
            <div className="order-modal__head">
              <h2 id="order-modal-title">Bestil dit tilbud</h2>
              <p id="order-modal-intro">Udfyld dine oplysninger, så kontakter vi dig for at aftale tidspunktet.</p>
            </div>

            <section className="order-modal__summary" aria-label="Din beregning">
              <div className="order-modal__price">
                <span>Din vejledende pris</span>
                <strong>{selection.priceLabel}</strong>
              </div>
              {selection.totalLabel && <p className="small">{selection.totalLabel}</p>}
              <p className="small">{selection.caption}</p>
              <p className="small order-modal__payment">Du betaler først, når arbejdet er udført.</p>
              <dl>
                {details.map((detail) => (
                  <div key={detail.label}>
                    <dt>{detail.label}</dt>
                    <dd>{detail.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="small muted">{selection.driving}</p>
            </section>

            <form onSubmit={submit} noValidate className="form order-modal__form">
              <TextField.Root>
                <Label htmlFor="order-name" className="field-label">
                  Dit navn
                </Label>
                <Input
                  id="order-name"
                  name="name"
                  autoComplete="name"
                  autoFocus
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) setErrors((current) => ({ ...current, name: undefined }));
                  }}
                  placeholder="fx Karen Jensen"
                  className="field"
                  aria-invalid={errors.name ? true : undefined}
                  aria-describedby={errors.name ? "order-name-error" : undefined}
                />
                {errors.name && (
                  <p id="order-name-error" role="alert" className="field-error">
                    {errors.name}
                  </p>
                )}
              </TextField.Root>

              <div className="form__pair">
                <TextField.Root>
                  <Label htmlFor="order-email" className="field-label">
                    Din e-mail
                  </Label>
                  <Input
                    id="order-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((current) => ({ ...current, email: undefined }));
                    }}
                    placeholder="fx karen@mail.dk"
                    className="field"
                    aria-invalid={errors.email ? true : undefined}
                    aria-describedby={errors.email ? "order-email-error" : undefined}
                  />
                  {errors.email && (
                    <p id="order-email-error" role="alert" className="field-error">
                      {errors.email}
                    </p>
                  )}
                </TextField.Root>

                <TextField.Root>
                  <Label htmlFor="order-phone" className="field-label">
                    Telefon
                  </Label>
                  <Input
                    id="order-phone"
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors((current) => ({ ...current, phone: undefined }));
                    }}
                    placeholder="fx 24 24 55 83"
                    className="field"
                    aria-invalid={errors.phone ? true : undefined}
                    aria-describedby={errors.phone ? "order-phone-error" : undefined}
                  />
                  {errors.phone && (
                    <p id="order-phone-error" role="alert" className="field-error">
                      {errors.phone}
                    </p>
                  )}
                </TextField.Root>
              </div>

              {status === "error" && (
                <p className="order-modal__error" role="alert">
                  Forespørgslen kunne ikke sendes. Prøv igen, eller <a href="tel:+4524245583">ring 24 24 55 83</a>.
                </p>
              )}

              <p className="small muted">
                Den endelige pris aftaler vi, før vi går i gang. Der er ingen betaling i dette trin.
              </p>

              <button type="submit" className="btn btn--primary order-modal__submit" disabled={sending}>
                {sending ? (
                  <>
                    <Loader2 size={17} aria-hidden="true" className="animate-spin" />
                    Sender forespørgsel…
                  </>
                ) : (
                  "Bestil tilbud"
                )}
              </button>

              <p className="small muted">
                Vi bruger kun dine oplysninger til at svare på din forespørgsel.{" "}
                <a href={`${import.meta.env.BASE_URL}privatlivspolitik/`} className="link">
                  Læs vores privatlivspolitik
                </a>
                .
              </p>
            </form>
          </>
        )}
      </div>
    </dialog>
  );
}
