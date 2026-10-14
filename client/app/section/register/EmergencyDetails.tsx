"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight, ContactRound, HeartPulse, Phone } from "lucide-react";
import { continueIfValid } from "./stepValidation";

type EmergencyDetailsProps = { active: boolean; onBack: () => void; onContinue: () => void };
const fieldClass = "mt-2 h-12 w-full rounded-xl border border-outline-variant/70 bg-surface-container-lowest px-4 text-sm text-foreground shadow-sm outline-none transition placeholder:text-on-surface-variant/65 focus:border-primary focus:ring-2 focus:ring-primary/20";

export default function EmergencyDetails({ active, onBack, onContinue }: EmergencyDetailsProps) {
    const sectionRef = useRef<HTMLFieldSetElement>(null);
    return (
        <fieldset ref={sectionRef} hidden={!active} disabled={!active} className="min-w-0 border-0 p-0">
            <section aria-labelledby="emergency-heading" className="rounded-2xl border border-outline-variant/70 bg-surface-container-lowest p-5 shadow-sm sm:p-7">
                <div className="mb-7 flex items-start gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary-container/20 text-primary"><ContactRound aria-hidden="true" size={21} /></span>
                    <div><p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Step 2 · Helpful details</p><h2 id="emergency-heading" className="mt-1 text-xl font-semibold text-foreground">Emergency contact &amp; requests</h2><p className="mt-1 text-sm leading-6 text-on-surface-variant">Provide a contact in case the camp team needs to reach someone for you.</p></div>
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                    <label className="text-sm font-medium text-foreground" htmlFor="emergencyName">Emergency contact name <span className="text-error">*</span><span className="relative block"><ContactRound aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={17} /><input autoComplete="off" className={`${fieldClass} pl-11`} id="emergencyName" name="emergencyName" placeholder="Name of a trusted contact" required /></span></label>
                    <label className="text-sm font-medium text-foreground" htmlFor="emergencyPhone">Emergency contact phone <span className="text-error">*</span><span className="relative block"><Phone aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={17} /><input autoComplete="off" className={`${fieldClass} pl-11`} id="emergencyPhone" name="emergencyPhone" placeholder="Their phone number" required type="tel" /></span></label>
                    {/* <label className="text-sm font-medium text-foreground sm:col-span-2" htmlFor="roommatePreference">Roommate request <span className="font-normal text-on-surface-variant">(optional)</span><span className="relative block"><BedDouble aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={17} /><input className={`${fieldClass} pl-11`} id="roommatePreference" name="roommatePreference" placeholder="Name, if you have a request" /></span><span className="mt-1 block text-xs leading-5 text-on-surface-variant">Requests can be shared with the camp team for consideration.</span></label> */}
                    <label className="text-sm font-medium text-foreground sm:col-span-2" htmlFor="medicalDietary">Dietary or accessibility requests <span className="font-normal text-on-surface-variant">(optional)</span><span className="relative mt-2 block"><HeartPulse aria-hidden="true" className="pointer-events-none absolute left-4 top-4 text-on-surface-variant" size={17} /><textarea className="min-h-28 w-full resize-y rounded-xl border border-outline-variant/70 bg-surface-container-lowest py-3 pl-11 pr-4 text-sm text-foreground shadow-sm outline-none transition placeholder:text-on-surface-variant/65 focus:border-primary focus:ring-2 focus:ring-primary/20" id="medicalDietary" name="medicalDietary" placeholder="You can leave this blank if none." rows={4} /></span></label>
                </div>
                <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
                    <button type="button" onClick={onBack} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-outline-variant px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-surface-container focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"><ArrowLeft aria-hidden="true" size={17} /> Back</button>
                    <button type="button" onClick={() => continueIfValid(sectionRef.current, onContinue)} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-on-primary transition hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Review details <ArrowRight aria-hidden="true" size={17} /></button>
                </div>
            </section>
        </fieldset>
    );
}
