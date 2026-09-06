import { useState, type FormEvent } from "react";
import { Input, Label, TextArea, TextField, toast } from "@heroui/react";
import { ClipboardPaste, Loader2, Send } from "lucide-react";

const FIELD =
  "w-full rounded-lg border border-ink-700 bg-ink-900 px-3.5 py-3 text-sm text-cream placeholder:text-ink-100/40 outline-none transition-colors focus-visible:border-accent-500 focus-visible:ring-2 focus-visible:ring-accent-500/50";
const ERROR = "text-xs text-[#f87171]";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Errors = { email?: string; message?: string };

/**
 * The page's one contact form. There is no backend yet, so the submit
 * pretends: a short wait, then a toast. The wait is deliberate — an instant
 * confirmation on a network action reads as fake, and this must feel
 * identical to the real thing once a backend lands.
 *
 * When the real endpoint arrives it must re-validate everything (client
 * validation is UX, not a control) and carry the spam-prevention stack:
 *   1. Honeypot field — hidden from humans, bots fill it, reject if filled.
 *   2. Time trap — stamp form render, reject submissions under ~2 s.
 *   3. Server-side validation — email format and a max message size.
 *   4. Rate limiting per IP and per email.
 *   5. CAPTCHA (Cloudflare Turnstile, not reCAPTCHA) only if 1-4 fail,
 *      accepting the third-party script cost.
 * The site is static on GitHub Pages, so the endpoint lives elsewhere
 * (Worker, form service, or a handler on the GX10 box); all five measures
 * live there, the page only holds the honeypot and the render stamp.
 *
 * Validation is manual on submit rather than HeroUI's validationBehavior:
 * the "aria" mode displays errors in realtime (including on first paint),
 * and "native" shows the browser's own English bubbles. Inline Danish errors
 * gated behind the first submit attempt are the third option, and the one
 * that matches how the form is actually used.
 */
export default function InquiryForm({ placeholder }: { placeholder: string }) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);

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
    // documented in the header comment above this component.
    window.setTimeout(() => {
      setSending(false);
      setEmail("");
      setMessage("");
      setErrors({});
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
            if (errors.message) setErrors((p) => ({ ...p, message: undefined }));
          }}
          placeholder={placeholder}
          className={`${FIELD} resize-y min-h-[104px]`}
          aria-invalid={errors.message ? true : undefined}
        />
        {errors.message && (
          <p role="alert" className={ERROR}>
            {errors.message}
          </p>
        )}
      </TextField.Root>

      {message === "" && (
        <button
          type="button"
          onClick={() => setMessage(placeholder)}
          className="self-start inline-flex items-center gap-1.5 -mt-1 text-xs text-accent-400 underline underline-offset-4 hover:text-accent-300 transition-colors"
        >
          <ClipboardPaste size={13} strokeWidth={2.25} aria-hidden="true" />
          Brug udkastet fra beregneren
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
    </form>
  );
}
