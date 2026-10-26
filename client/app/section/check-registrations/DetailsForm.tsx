"use client"

import { ArrowRight, Mail } from "lucide-react";
import type { FormEventHandler } from "react";

type DetailsFormProp = {
    handleRequest: FormEventHandler<HTMLFormElement>,
    isRequesting: boolean,
    requestError: string | null
}

export function DetailsForm({handleRequest, isRequesting, requestError}:DetailsFormProp) {
    return (
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
                    we’ll send a verification code there before showing your registration details.
                </p>
            </div>

            <form className="mt-6 space-y-5" onSubmit={handleRequest}>
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
                    disabled={isRequesting}
                    className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary-container px-5 py-3 text-sm font-semibold text-on-primary-container shadow-[0_6px_20px_rgba(139,44,245,0.18)] transition hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary active:scale-[0.99] cursor-pointer"
                >
                    {isRequesting ? 'Requesting...' : 'Request OTP'} <ArrowRight aria-hidden="true" size={17} />
                </button>
            </form>
            {requestError && (
                <p role="alert" className="mt-4 text-sm text-error">
                    {requestError}
                </p>
            )}
            <p className="mt-5 text-center text-xs leading-5 text-on-surface-variant">
                Your pass ID and email must match the details on your registration.
            </p>
        </div>
    )
}