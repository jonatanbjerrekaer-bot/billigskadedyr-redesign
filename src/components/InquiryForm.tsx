import { useEffect, useRef, useState, type FormEvent } from "react";
import { Input, Label, TextArea, TextField, toast } from "@heroui/react";
import { ClipboardPaste, Eraser, Loader2, Send } from "lucide-react";

const FIELD =
  "w-full rounded-lg border border-ink-700 bg-ink-900 px-3.5 py-3 text-sm text-cream placeholder:text-ink-100/40 outline-none transition-colors focus-visible:border-accent-500 focus-visible:ring-2 focus-visible:ring-accent-500/50";
const ERROR = "text-xs text-[#f87171]";
const PLACEHOLDER = "Skriv kort, hvad du har set, og hvor i boligen det er.";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Errors = { email?: string; message?: string };

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

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (sending) return;

    const next: Errors = {};
    const em = email.trim();
    if (!em) next.email = "Skriv din e-mail, så vi kan svare dig.";
    else if (!EMAIL_RE.test(em)) next.email = "Den e-mail ser ikke rigtig ud. Tjek den lige.";
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
      setMessage("");
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
