"use client"

import { ArrowRight, Binary } from "lucide-react"

type CodeFormProp ={
    handleVerify: () => void,
    isVerifying: boolean,
    verifyError: string | null
}

export function CodeForm({handleVerify, isVerifying, verifyError}: CodeFormProp){
    return(
         <div className="rounded-2xl border border-outline-variant/70 bg-surface-container-lowest p-5 shadow-[0_18px_60px_rgba(12,7,18,0.16)] sm:p-8">
            <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary-container/15 text-primary">
                    <Binary aria-hidden="true" size={20} />
                </span>
                <div>
                    <h2 className="text-lg font-semibold text-foreground">Check your registration</h2>
                    <p className="mt-0.5 text-sm text-on-surface-variant">Step 2 <span aria-hidden="true">·</span> Input OTP Code</p>
                </div>
            </div>

            <form className="mt-6 space-y-5" onSubmit={handleVerify}>
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
                    {isVerifying ? 'Verifying...' : 'Verify OTP'} <ArrowRight aria-hidden="true" size={17} />
                </button>
            </form>
            {verifyError && (
                <p role="alert" className="mt-4 text-sm text-error">
                    {verifyError}
                </p>
            )}
            <p className="mt-5 text-center text-xs leading-5 text-on-surface-variant">
                Your pass ID and email must match the details on your registration.
            </p>
        </div>
    )
}