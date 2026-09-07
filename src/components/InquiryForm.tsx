import { useEffect, useRef, useState, type FormEvent } from "react";
import { Input, Label, TextArea, TextField, toast } from "@heroui/react";
import { ClipboardPaste, Eraser, ImagePlus, Loader2, Send, X } from "lucide-react";
import { LIMITS, prepare, type Prepared } from "../lib/imageUpload";

const FIELD =
  "w-full rounded-lg border border-ink-700 bg-ink-900 px-3.5 py-3 text-sm text-cream placeholder:text-ink-100/40 outline-none transition-colors focus-visible:border-accent-500 focus-visible:ring-2 focus-visible:ring-accent-500/50";
const ERROR = "text-xs text-[#f87171]";
const PLACEHOLDER = "Skriv kort, hvad du har set, og hvor i boligen det er.";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// A hint for the file picker, nothing more: accept is a convenience for the
// person choosing, not a check. What a file actually is gets decided by its
// leading bytes in lib/imageUpload, and decided again on the server. HEIC is
// here because an iPhone photo arrives as one and the sender will not know.
const PHOTO_ACCEPT = "image/png,image/jpeg,image/webp,image/heic,image/heif";

// Danish numbers are dialled a handful of ways (24245583, 24 24 55 83,
// +45 24 24 55 83). The check is on the digits only: strip spaces,
// require at least eight of them. Anything stricter repels people who
// type their number with dots or brackets.
const PHONE_MIN_DIGITS = 8;

type Errors = { email?: string; phone?: string; message?: string; photos?: string };

/**
 * The page's one contact form. There is no backend yet, so the submit
 * pretends: a short wait, then a toast. The wait is deliberate — an instant
 * confirmation on a network action reads as fake, and this must feel
 * identical to the real thing once a backend lands.
 *
 * When the real endpoint arrives it must re-validate everything (client
 * validation is UX, not a control) and carry the spam stack documented in
 * git history (commit 990cfba): honeypot, time trap, server-side validation,
 * rate limiting, CAPTCHA only as escalation.
 *
 * `draft` is the message drafted from the calculator. It is only passed when
 * the visitor actually used the calculator: prefilling a made-up situation
 * would read as a trick on a form whose whole job is trust. The prefill
 * applies while the field is empty or still holds the previous draft, so
 * it follows the calculator but never overwrites what the visitor typed.
 *
 * Validation is manual on submit rather than HeroUI's validationBehavior:
 * the "aria" mode displays errors in realtime (including on first paint),
 * and "native" shows the browser's own English bubbles. Inline Danish errors
 * gated behind the first submit attempt are the third option, and the one
 * that matches how the form is actually used.
 */
export default function InquiryForm({ draft }: { draft: string }) {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  // The last draft we placed in the field, so a calculator change can update
  // the draft but a keystroke of the visitor's own stops the sync. Cleared
  // stops it too: clearing is a decision, and silently refilling the field
  // would read as the page ignoring it.
  const appliedDraft = useRef("");
  const cleared = useRef(false);

  useEffect(() => {
    if (!draft || cleared.current) return;
    if (message === "" || message === appliedDraft.current) {
      setMessage(draft);
      appliedDraft.current = draft;
    }
  }, [draft, message]);

  // Now the prepared blobs rather than just names: they have been re-encoded
  // down to something a mail server will take, and stripped of the EXIF that
  // would otherwise carry the sender's home coordinates to the owner.
  const [photos, setPhotos] = useState<Prepared[]>([]);
  const [preparing, setPreparing] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (sending) return;

    const next: Errors = {};
    const em = email.trim();
    if (!em) next.email = "Skriv din e-mail, så vi kan svare dig.";
    else if (!EMAIL_RE.test(em)) next.email = "Den e-mail ser ikke rigtig ud. Tjek den lige.";
    const digits = phone.replace(/\s/g, "");
    if (digits.trim() && digits.replace(/\D/g, "").length < PHONE_MIN_DIGITS)
      next.phone = "Det telefonnummer ser for kort ud. Tjek det lige.";
    if (!message.trim())
      next.message = "Skriv en besked, eller brug udkastet fra beregneren.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setSending(true);
    // ponytail: fake send — the real endpoint must implement the spam stack
    // documented in the header comment of this component.
    window.setTimeout(() => {
      setSending(false);
      setEmail("");
      setPhone("");
      setMessage("");
      setPhotos([]);
      setErrors({});
      appliedDraft.current = "";
      cleared.current = false;
      toast.success("Tak for din besked!", {
        description: "Vi svarer på mail inden for en hverdag.",
      });
    }, 900);
  };

  return (
    <form onSubmit={submit} noValidate className="flex flex-col gap-3">
      {/* Email is the answer we need, phone is the fast lane to it. Side by
          side from sm up, stacked on a phone, where two half-width fields
          would shrink the keyboards too far. */}
      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
        <TextField.Root className="flex flex-col gap-1.5">
          <Label htmlFor="inquiry-email" className="text-xs font-medium text-ink-100/70">
            Din e-mail
          </Label>
          <Input
            id="inquiry-email"
            name="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
            }}
            placeholder="fx karen@mail.dk"
            className={FIELD}
            aria-invalid={errors.email ? true : undefined}
          />
          {errors.email && (
            <p role="alert" className={ERROR}>
              {errors.email}
            </p>
          )}
        </TextField.Root>

        <TextField.Root className="flex flex-col gap-1.5">
          <Label htmlFor="inquiry-phone" className="text-xs font-medium text-ink-100/70">
            Dit telefonnummer (valgfrit)
          </Label>
          <Input
            id="inquiry-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            inputMode="tel"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              if (errors.phone) setErrors((p) => ({ ...p, phone: undefined }));
            }}
            placeholder="fx 24 24 55 83"
            className={FIELD}
            aria-invalid={errors.phone ? true : undefined}
          />
          {errors.phone && (
            <p role="alert" className={ERROR}>
              {errors.phone}
            </p>
          )}
        </TextField.Root>
      </div>

      <TextField.Root className="flex flex-col gap-1.5">
        <Label htmlFor="inquiry-message" className="text-xs font-medium text-ink-100/70">
          Din besked
        </Label>
        <TextArea
          id="inquiry-message"
          name="message"
          rows={4}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (e.target.value === "") {
              // Deleting down to empty is the same decision as clearing.
              cleared.current = true;
              appliedDraft.current = "";
            }
            if (errors.message) setErrors((p) => ({ ...p, message: undefined }));
          }}
          placeholder={PLACEHOLDER}
          className={`${FIELD} resize-y min-h-[104px]`}
          aria-invalid={errors.message ? true : undefined}
        />
        {errors.message && (
          <p role="alert" className={ERROR}>
            {errors.message}
          </p>
        )}
      </TextField.Root>

      {message === "" ? (
        draft && (
          <button
            type="button"
            onClick={() => {
              setMessage(draft);
              appliedDraft.current = draft;
              cleared.current = false;
            }}
            className="self-start inline-flex items-center gap-1.5 -mt-1 text-xs text-accent-400 underline underline-offset-4 hover:text-accent-300 transition-colors"
          >
            <ClipboardPaste size={13} strokeWidth={2.25} aria-hidden="true" />
            Brug udkastet fra beregneren
          </button>
        )
      ) : (
        <button
          type="button"
          onClick={() => {
            setMessage("");
            appliedDraft.current = "";
            cleared.current = true;
          }}
          className="self-start inline-flex items-center gap-1.5 -mt-1 text-xs text-ink-100/60 underline underline-offset-4 hover:text-cream transition-colors"
        >
          <Eraser size={13} strokeWidth={2.25} aria-hidden="true" />
          Ryd beskedfeltet
        </button>
      )}

      {/* Two places on the site tell the visitor to send a picture, and
          until now the form had nowhere to put one. Optional, because most
          people describe it fine in words, and the ones who cannot are
          exactly the ones a photo helps most. */}
      <div className="flex flex-col gap-1.5">
        <span className="text-xs font-medium text-ink-100/70">Billede (valgfrit)</span>
        <label
          htmlFor="inquiry-photos"
          className="press flex items-center gap-2.5 rounded-lg border border-dashed border-ink-700 bg-ink-900 px-3.5 py-3 text-sm text-ink-100/70 cursor-pointer transition-colors hover:border-accent-500 hover:text-cream focus-within:border-accent-500"
        >
          <ImagePlus size={17} strokeWidth={2} aria-hidden="true" className="shrink-0" />
          {preparing
            ? "Gør billedet klar…"
            : photos.length === 0
              ? "Vedhæft et billede af dyret eller skaden"
              : `${photos.length} ${photos.length === 1 ? "billede" : "billeder"} valgt`}
        </label>
        <input
          id="inquiry-photos"
          name="photos"
          type="file"
          multiple
          accept={PHOTO_ACCEPT}
          className="sr-only"
          onChange={async (e) => {
            const picked = Array.from(e.target.files ?? []);
            // the same file picked twice should not queue twice
            e.target.value = "";
            if (!picked.length) return;
            setPreparing(true);
            try {
              const { accepted, rejected } = await prepare(picked, photos);
              setPhotos((p) => [...p, ...accepted]);
              setErrors((p) => ({
                ...p,
                photos: rejected.length ? rejected[0]!.reason : undefined,
              }));
            } finally {
              setPreparing(false);
            }
          }}
        />
        {photos.length > 0 && (
          <ul className="flex flex-wrap gap-1.5 list-none p-0 m-0">
            {photos.map((photo) => (
              <li
                key={photo.name}
                className="enter-soft inline-flex items-center gap-1.5 rounded-full bg-ink-800 px-2.5 py-1 text-xs text-ink-100/80"
              >
                <span className="max-w-[16ch] truncate">{photo.name}</span>
                <span className="text-ink-100/45">
                  {(photo.bytes / 1024 / 1024).toFixed(1)} MB
                </span>
                <button
                  type="button"
                  aria-label={`Fjern ${photo.name}`}
                  onClick={() => setPhotos((p) => p.filter((x) => x.name !== photo.name))}
                  className="press text-ink-100/50 hover:text-cream transition-colors"
                >
                  <X size={13} strokeWidth={2.5} aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        )}
        {errors.photos ? (
          <p role="alert" className={ERROR}>
            {errors.photos}
          </p>
        ) : (
          <p className="text-xs text-ink-100/50">
            Højst {LIMITS.maxFiles} billeder. Vi formindsker billedet og fjerner automatisk
            placering og andre metadata, før det sendes.
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={sending}
        className="press rounded-lg bg-accent-500 text-ink-950 font-bold min-h-[48px] px-6 inline-flex items-center justify-center gap-2 hover:bg-accent-400 transition-[color,background-color,transform] disabled:opacity-70"
      >
        {sending ? (
          <>
            <Loader2 size={17} strokeWidth={2.5} aria-hidden="true" className="animate-spin" />
            Sender…
          </>
        ) : (
          <>
            <Send size={17} strokeWidth={2.5} aria-hidden="true" />
            Send besked
          </>
        )}
      </button>

      {/*
        The consent line the reference business runs under its own forms. Both
        links intentionally land on the same page, exactly as they do there.
      */}
      <p className="text-xs text-ink-100/60 -mt-1">
        Når du sender formularen, accepterer du vores{" "}
        <a
          href="https://billigskadedyrprof.dk/privatlivspolitik/"
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-4 hover:text-cream transition-colors"
        >
          vilkår
        </a>{" "}
        og{" "}
        <a
          href="https://billigskadedyrprof.dk/privatlivspolitik/"
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-4 hover:text-cream transition-colors"
        >
          privatlivspolitik
        </a>
        .
      </p>
    </form>
  );
}
