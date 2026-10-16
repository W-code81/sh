"use client";

import { ArrowLeft, CalendarDays, CircleHelp, MapPin } from "lucide-react";

type PaymentDetailsProps = { active: boolean; onBack: () => void };

export default function PaymentDetails({ active, onBack }: PaymentDetailsProps) {
    return (
        <fieldset hidden={!active} disabled={!active} className="min-w-0 border-0 p-0">
            <section aria-labelledby="payment-heading" className="rounded-2xl border border-outline-variant/70 bg-surface-container-lowest p-5 shadow-sm sm:p-7">
                <div className="mb-7 flex items-start gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-container/20 text-primary"><CircleHelp aria-hidden="true" size={21} /></span>
                    <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Step 3 · Final details</p><h2 id="payment-heading" className="mt-1 text-xl font-semibold text-foreground">Camp fee &amp; payment</h2><p className="mt-1 text-sm leading-6 text-on-surface-variant">Payment information will appear here once confirmed by the organizers.</p></div>
                </div>
                <div className="rounded-xl border border-outline-variant/60 bg-background p-5 sm:p-6">
                    <p className="text-sm font-semibold text-foreground">Payment details to be announced</p>
                    <p className="mt-2 text-sm leading-6 text-on-surface-variant">The camp fee and accepted payment methods have not been confirmed yet. This page is a frontend preview and does not submit or save registration details.</p>
                    <div className="mt-5 grid gap-3 border-t border-outline-variant/60 pt-5 text-sm sm:grid-cols-2">
                        <div className="flex items-start gap-3"><CalendarDays aria-hidden="true" className="mt-0.5 shrink-0 text-primary" size={17} /><span><span className="block font-medium text-foreground">Camp dates</span><span className="mt-1 block text-on-surface-variant">15–18 December 2026</span></span></div>
                        <div className="flex items-start gap-3"><MapPin aria-hidden="true" className="mt-0.5 shrink-0 text-primary" size={17} /><span><span className="block font-medium text-foreground">Venue</span><span className="mt-1 block text-on-surface-variant">Royal Girls Academy, Ozuoba</span></span></div>
                    </div>
                </div>
                <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <button type="button" onClick={onBack} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-outline-variant px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-surface-container focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"><ArrowLeft aria-hidden="true" size={17} /> Back</button>
                    <button type="button" disabled className="min-h-12 cursor-not-allowed rounded-xl bg-surface-container-high px-5 py-3 text-sm font-semibold text-on-surface-variant" aria-describedby="registration-preview-note">Registration opening soon</button>
                </div>
            </section>
        </fieldset>
    );
}
