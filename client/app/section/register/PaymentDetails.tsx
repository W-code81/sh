"use client";

import { ArrowLeft, Banknote, CalendarDays, CreditCard, MapPin } from "lucide-react";
import type { RegistrationPaymentMethod } from "../../register/types";

type PaymentDetailsProps = {
  active: boolean;
  onBack: () => void;
  paymentMethod: RegistrationPaymentMethod;
  onPaymentMethodChange: (method: RegistrationPaymentMethod) => void;
  isSubmitting: boolean;
};

export default function PaymentDetails({ active, onBack, paymentMethod, onPaymentMethodChange, isSubmitting, }: PaymentDetailsProps) {
  return (
    <fieldset hidden={!active} disabled={!active} className="min-w-0 border-0 p-0">
      <section aria-labelledby="payment-heading" className="rounded-2xl border border-outline-variant/70 bg-surface-container-lowest p-5 shadow-sm sm:p-7">
        <div className="mb-7 flex items-start gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-container/20 text-primary">
            <Banknote aria-hidden="true" size={21} />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Step 3 · Final details</p>
            <h2 id="payment-heading" className="mt-1 text-xl font-semibold text-foreground">Choose how to pay</h2>
            <p className="mt-1 text-sm leading-6 text-on-surface-variant">Your place is reserved now. Payment is due when you arrive at camp.</p>
          </div>
        </div>

        <fieldset>
          <legend className="mb-3 text-sm font-semibold text-foreground">Payment method</legend>
          <div role="radiogroup" aria-label="Payment method" className="grid gap-3 sm:grid-cols-2">
            
            {/* PAY ON ARRIVAL */}
            <label className="relative flex min-h-40 cursor-pointer flex-col rounded-xl border-2 border-primary bg-primary-container/10 p-4 outline-none transition focus-within:ring-2 focus-within:ring-primary/30 sm:p-5">
              <input
                className="peer sr-only"
                type="radio"
                name="paymentMethod"
                value="pay_on_arrival"
                checked={paymentMethod === "pay_on_arrival"}
                onChange={() => onPaymentMethodChange("pay_on_arrival")}
                required
              />
              <span className="flex items-start justify-between gap-3">
                <span className="flex size-10 items-center justify-center rounded-lg bg-primary-container/20 text-primary">
                  <Banknote aria-hidden="true" size={20} />
                </span>
                <span aria-hidden="true" className="flex size-5 items-center justify-center rounded-full border border-primary bg-primary text-on-primary">
                  <span className="size-2 rounded-full bg-current" />
                </span>
              </span>
              <span className="mt-4 block text-sm font-semibold text-foreground">Pay on arrival</span>
              <span className="mt-1 block text-xs leading-5 text-on-surface-variant">Pay the camp team at check-in. No online payment is required today.</span>
              <span className="mt-auto pt-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">Available</span>
            </label>

            {/* PAY ON WEBSITE */}
            <div aria-disabled="true" className="flex min-h-40 cursor-not-allowed flex-col rounded-xl border border-outline-variant/60 bg-surface-container-low p-4 opacity-70 sm:p-5">
              <span className="flex items-start justify-between gap-3">
                <span className="flex size-10 items-center justify-center rounded-lg bg-surface-container-high text-on-surface-variant">
                  <CreditCard aria-hidden="true" size={20} />
                </span>
                <span className="rounded-full border border-outline-variant/70 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-on-surface-variant">Unavailable</span>
              </span>
              <span className="mt-4 block text-sm font-semibold text-foreground">Pay on website</span>
              <span className="mt-1 block text-xs leading-5 text-on-surface-variant">Online card payment will be available once the payment provider is set up.</span>
              <span className="mt-auto pt-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-on-surface-variant">Coming later</span>
            </div>
          </div>
        </fieldset>

        <div role="note" className="mt-5 rounded-xl border border-outline-variant/60 bg-background p-4">
          <p className="text-sm font-medium text-foreground">Payment status: due on arrival</p>
          <p className="mt-1 text-xs leading-5 text-on-surface-variant">We’ll save your registration and pass ID now. The camp team will collect payment when you check in.</p>
        </div>

        <div className="mt-6 grid gap-3 border-t border-outline-variant/60 pt-5 text-sm sm:grid-cols-2">
          <div className="flex items-start gap-3"><CalendarDays aria-hidden="true" className="mt-0.5 shrink-0 text-primary" size={17} /><span><span className="block font-medium text-foreground">Camp dates</span><span className="mt-1 block text-on-surface-variant">15–18 December 2026</span></span></div>
          <div className="flex items-start gap-3"><MapPin aria-hidden="true" className="mt-0.5 shrink-0 text-primary" size={17} /><span><span className="block font-medium text-foreground">Venue</span><span className="mt-1 block text-on-surface-variant">Royal Girls Academy, Ozuoba</span></span></div>
        </div>

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button type="button" onClick={onBack} disabled={isSubmitting} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-outline-variant px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-surface-container focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-60">
            <ArrowLeft aria-hidden="true" size={17} /> Back
          </button>
          
          <button type="submit" disabled={isSubmitting} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-on-primary transition hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-wait disabled:opacity-70">
            {isSubmitting ? "Saving registration…" : "Complete registration"}
          </button>
        </div>
      </section>
    </fieldset>
  );
}