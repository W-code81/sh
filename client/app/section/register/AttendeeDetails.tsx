"use client";

import { useRef } from "react";
import { ArrowRight, Building2, Mail, Phone, UserRound, UsersRound } from "lucide-react";
import { continueIfValid } from "./stepValidation";
import { AGE_GROUPS, type AttendeeFieldChange, type RegisForm } from "../../register/types";

type AttendeeDetailsProps = {
    active: boolean;
    onContinue: () => void;
    attendee: RegisForm["attendee"];
    handleAttendeeFieldChange: AttendeeFieldChange;
};

const fieldClass = "mt-2 h-12 w-full rounded-xl border border-outline-variant/70 bg-surface-container-lowest px-4 text-sm text-foreground shadow-sm outline-none transition placeholder:text-on-surface-variant/65 focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed";

export default function AttendeeDetails({ active, onContinue, attendee, handleAttendeeFieldChange }: AttendeeDetailsProps) {
    const sectionRef = useRef<HTMLFieldSetElement>(null);

    return (
        <fieldset ref={sectionRef} hidden={!active} disabled={!active} className="min-w-0 border-0 p-0">
            <section aria-labelledby="attendee-heading" className="rounded-2xl border border-outline-variant/70 bg-surface-container-lowest p-5 shadow-sm sm:p-7">
                <div className="mb-7 flex items-start gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-container/20 text-primary"><UserRound aria-hidden="true" size={21} /></span>
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Step 1 · About you</p>
                        <h2 id="attendee-heading" className="mt-1 text-xl font-semibold text-foreground">Attendee information</h2>
                        <p className="mt-1 text-sm leading-6 text-on-surface-variant">Add the best way for the camp team to reach you.</p>
                    </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                    <label className="text-sm font-medium text-foreground sm:col-span-2" htmlFor="fullName">Full name <span className="text-error">*</span>
                        <span className="relative block"><UserRound aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={17} /><input autoComplete="name" className={`${fieldClass} pl-11`} id="fullName" name="fullName" placeholder="Your name" required value={attendee.fullName} onChange={(event) => handleAttendeeFieldChange("fullName", event.currentTarget.value)} /></span>
                    </label>
                    <label className="text-sm font-medium text-foreground" htmlFor="phoneNumber">Phone number <span className="text-error">*</span>
                        <span className="relative block"><Phone aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={17} /><input autoComplete="tel" className={`${fieldClass} pl-11`} id="phoneNumber" name="phoneNumber" placeholder="Your phone number" required type="tel" value={attendee.phoneNumber} onChange={(event) => handleAttendeeFieldChange("phoneNumber", event.currentTarget.value)} /></span>
                    </label>
                    <label className="text-sm font-medium text-foreground" htmlFor="emailAddress">Email address <span className="text-error">*</span>
                        <span className="relative block"><Mail aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={17} /><input autoComplete="email" className={`${fieldClass} pl-11`} id="emailAddress" name="emailAddress" placeholder="you@example.com" required type="email" value={attendee.email} onChange={(event) => handleAttendeeFieldChange("email", event.currentTarget.value)} /></span>
                    </label>
                    <label className="text-sm font-medium text-foreground sm:col-span-2" htmlFor="fellowshipGroup">Church or fellowship group <span className="text-error">*</span>
                        <span className="relative block"><Building2 aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={17} /><input autoComplete="organization" className={`${fieldClass} pl-11`} id="fellowshipGroup" name="fellowshipGroup" placeholder="Your church or fellowship" required value={attendee.fellowshipGroup} onChange={(event) => handleAttendeeFieldChange("fellowshipGroup", event.currentTarget.value)} /></span>
                    </label>
                </div>

                <fieldset className="mt-6 border-0 p-0" aria-describedby="age-help">
                    <legend className="text-sm font-medium text-foreground">Age group <span className="text-error">*</span></legend>
                    <p id="age-help" className="mt-1 text-xs leading-5 text-on-surface-variant">Choose the range that fits you best.</p>
                    <div className="mt-3 grid gap-3 sm:grid-cols-3">
                        {AGE_GROUPS.map((age) => (
                            <label key={age} className="flex cursor-pointer items-center gap-3 rounded-xl border border-outline-variant/70 bg-background px-4 py-3 text-sm text-foreground transition has-checked:border-primary has-checked:bg-primary-container/10 has-focus-visible:ring-2 has-focus-visible:ring-primary/30">
                                <input className="size-4 accent-primary" type="radio" name="ageGroup" value={age} checked={attendee.ageGroup === age} onChange={() => handleAttendeeFieldChange("ageGroup", age)} required />
                                <UsersRound aria-hidden="true" className="text-on-surface-variant" size={17} />{age}
                            </label>
                        ))}
                    </div>
                </fieldset>

                <button type="button" onClick={() => continueIfValid(sectionRef.current, onContinue)} className="mt-8 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-on-primary transition hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:w-auto sm:min-w-52">
                    Continue <ArrowRight aria-hidden="true" size={17} />
                </button>
            </section>
        </fieldset>
    );
}
