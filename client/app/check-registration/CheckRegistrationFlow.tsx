"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Mail, ShieldCheck, TicketCheck } from "lucide-react";
import RegistrationTicket, { type TicketDetails } from "./RegistrationTicket";

export default function CheckRegistrationFlow() {
  const [ticket, setTicket] = useState<TicketDetails | null>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    setTicket({
      passId: String(formData.get("passId") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
    });
  }

  return (
    <main className="camp-hero flex flex-1 items-center bg-background px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(24rem,0.85fr)] lg:gap-16">
        <section className="mb-auto max-w-xl">
          <Link
            href="/"
            className="mr-2 inline-flex items-center gap-2 rounded-lg text-sm font-medium text-on-surface-variant transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
          >
            <ArrowLeft aria-hidden="true" size={16} />
            Back to camp details
          </Link>

          <p className="mt-9 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary-container/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-primary sm:mt-12">
            <TicketCheck aria-hidden="true" size={15} />
            Attendee pass lookup
          </p>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Find your <span className="text-primary">camp registration.</span>
          </h1>
          <p className="mt-4 max-w-lg text-base leading-7 text-on-surface-variant sm:text-lg">
            Enter the pass ID and email address you used when registering. We’ll use them to locate your attendee record.
          </p>

          <div className="mt-8 flex items-start gap-3 rounded-xl border border-outline-variant/70 bg-surface-container-low px-4 py-3.5 text-sm leading-6 text-on-surface-variant">
            <ShieldCheck aria-hidden="true" className="mt-0.5 shrink-0 text-primary" size={18} />
            <p>Your pass ID is on the registration confirmation sent after you signed up.</p>
          </div>
        </section>

        <section aria-label={ticket ? "Registration details preview" : "Find your registration"} className="w-full">
          {!ticket ? (
            <div className="rounded-2xl border border-outline-variant/70 bg-surface-container-lowest p-5 shadow-[0_18px_60px_rgba(12,7,18,0.16)] sm:p-8">
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary-container/15 text-primary">
                  <Mail aria-hidden="true" size={20} />
                </span>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Check your registration</h2>
                  <p className="mt-0.5 text-sm text-on-surface-variant">Step 1 <span aria-hidden="true">·</span> Verify your details</p>
                </div>
              </div>

              <div role="note" className="mt-6 rounded-xl border border-primary/20 bg-primary-container/10 p-4">
                <p className="text-sm font-semibold text-foreground">Keep an eye on your email</p>
                <p className="mt-1 text-sm leading-5 text-on-surface-variant">
                  Once lookup is connected, we’ll send a verification code there before showing your registration details.
                </p>
                <p className="mt-2 text-xs leading-5 text-on-surface-variant/80">
                  Code delivery and attendee lookup aren’t connected yet. Continue previews the ticket layout.
                </p>
              </div>

              <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="pass-id" className="mb-2 block text-sm font-medium text-foreground">
                    Official Pass ID
                  </label>
                  <input
                    id="pass-id"
                    name="passId"
                    type="text"
                    autoComplete="off"
                    placeholder="e.g. SHIFT-7K4P9D"
                    required
                    className="min-h-12 w-full rounded-xl border border-outline-variant bg-surface-container px-4 text-sm text-foreground outline-none transition placeholder:text-on-surface-variant/60 hover:border-outline focus:border-primary focus:ring-4 focus:ring-primary/15"
                  />
                </div>

                <div>
                  <label htmlFor="registration-email" className="mb-2 block text-sm font-medium text-foreground">
                    Registration email
                  </label>
                  <input
                    id="registration-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    required
                    className="min-h-12 w-full rounded-xl border border-outline-variant bg-surface-container px-4 text-sm text-foreground outline-none transition placeholder:text-on-surface-variant/60 hover:border-outline focus:border-primary focus:ring-4 focus:ring-primary/15"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary-container px-5 py-3 text-sm font-semibold text-on-primary-container shadow-[0_6px_20px_rgba(139,44,245,0.18)] transition hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary active:scale-[0.99]"
                >
                  Preview ticket <ArrowRight aria-hidden="true" size={17} />
                </button>
              </form>
              <p className="mt-5 text-center text-xs leading-5 text-on-surface-variant">
                Your pass ID and email must match the details on your registration.
              </p>
            </div>
          ) : (
            <div>
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-primary">
                    <CheckCircle2 aria-hidden="true" size={20} />
                    <p className="text-xs font-semibold uppercase tracking-[0.15em]">Lookup preview</p>
                  </div>
                  <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground">Your registration details</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setTicket(null)}
                  className="shrink-0 rounded-lg px-2 py-1 text-sm font-medium text-on-surface-variant transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  Edit details
                </button>
              </div>
              <p className="mb-4 text-sm leading-6 text-on-surface-variant">
                This is a preview. A real lookup will fill in the attendee and payment information after verification.
              </p>
              <RegistrationTicket ticket={ticket} />
              <button
                type="button"
                onClick={() => setTicket(null)}
                className="mt-6 inline-flex items-center gap-2 rounded-lg text-sm font-medium text-on-surface-variant transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
              >
                <ArrowLeft aria-hidden="true" size={16} />
                Check another pass
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
