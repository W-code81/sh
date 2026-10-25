"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CalendarDays, CheckCircle2, Info, MapPin, TicketCheck } from "lucide-react";
import AttendeeDetails from "../section/register/AttendeeDetails";
import EmergencyDetails from "../section/register/EmergencyDetails";
import PaymentDetails from "../section/register/PaymentDetails";
import { useState, type FormEvent } from "react";
import { AGE_GROUPS, type RegisForm } from "./types";
import { createRegistration } from "./actions";

type SavedRegistration = Extract<Awaited<ReturnType<typeof createRegistration>>, { ok: true }>["registration"];

const steps = [
  { id: 1, label: "Attendee information" },
  { id: 2, label: "Emergency & stay" },
  { id: 3, label: "Payment details" },
] as const;

function parseStep(value: string | null) {
  const step = Number(value);
  return Number.isInteger(step) && step >= 1 && step <= 3 ? step : 1;
}

export default function RegisterFlow() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedStep = searchParams.get("step");
  const activeStep = parseStep(requestedStep);

  const goToStep = (step: number) => {
    router.replace(step === 1 ? "/register" : `/register?step=${step}`, { scroll: false });
  };

  // SHARED FORM STATE
  const [regisForm, setRegisForm] = useState<RegisForm>({
    attendee: {
      fullName: "",
      phoneNumber: "",
      email: "",
      fellowshipGroup: "",
      ageGroup: AGE_GROUPS[0],
    },
    emergency: {
      name: "",
      phone: "",
    },
    requests: {
      dietaryAccessibility: "",
    },
    paymentMethod: "pay_on_arrival",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [savedRegistration, setSavedRegistration] = useState<SavedRegistration | null>(null);

  // Form change handlers
  const handleAttendeeFieldChange = <K extends keyof RegisForm["attendee"],>(field: K, value: RegisForm["attendee"][K]) => {
    setRegisForm((prev) => ({
      ...prev,
      attendee: { ...prev.attendee, [field]: value },
    }));
  };

  const handleEmergencyFieldChange = <K extends keyof RegisForm["emergency"],>(field: K,value: RegisForm["emergency"][K],) => {
    setRegisForm((prev) => ({
      ...prev,
      emergency: { ...prev.emergency, [field]: value },
    }));
  };

  const handleDietaryRequestChange = (value: string) => {
    setRegisForm((prev) => ({
      ...prev,
      requests: { ...prev.requests, dietaryAccessibility: value },
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Gather all the data
      const payload = {
        fullName: regisForm.attendee.fullName,
        phoneNumber: regisForm.attendee.phoneNumber,
        emailAddress: regisForm.attendee.email,
        fellowshipGroup: regisForm.attendee.fellowshipGroup,
        ageGroup: regisForm.attendee.ageGroup,
        emergencyName: regisForm.emergency.name,
        emergencyPhone: regisForm.emergency.phone,
        medicalDietary: regisForm.requests.dietaryAccessibility,
        paymentMethod: regisForm.paymentMethod,
      }

      // POST to admin api
      const result = await createRegistration(payload);

      // client error msg
      if (!result.ok) {
        const fieldMessages = result.details?.map((detail) => detail.message).join(" ");
        setSubmitError(fieldMessages ? `${result.error} ${fieldMessages}` : result.error);
        return;
      }

      // for confirmation ticket modal
      setSavedRegistration(result.registration);
    } catch {
      setSubmitError("We couldn’t submit your registration. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // confimation ticket modal
  if (savedRegistration) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-background px-5 py-12 sm:px-8">
        <section aria-labelledby="registration-saved-heading" className="w-full max-w-xl rounded-2xl border border-outline-variant/70 bg-surface-container-lowest p-6 shadow-sm sm:p-9">
          <span className="flex size-12 items-center justify-center rounded-full bg-secondary-container text-on-secondary-container">
            <CheckCircle2 aria-hidden="true" size={25} />
          </span>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-primary">SHIFT Camp · Registration saved</p>
          <h1 id="registration-saved-heading" className="mt-2 text-3xl font-bold tracking-tight text-foreground">You’re on the list.</h1>
          <p className="mt-3 text-sm leading-6 text-on-surface-variant">Your registration is saved. Payment is due when you arrive at camp. Keep this pass ID so you can check your registration later.</p>
          <p role="status" className="mt-3 text-sm leading-6 text-on-surface-variant">
            {savedRegistration.confirmationEmailSent
              ? "We’ve sent your pass ID and camp details to your registration email."
              : "We couldn’t send the confirmation email just now. Save your pass ID below and contact the camp team if you need help."}
          </p>

          <div className="mt-6 rounded-xl border border-outline-variant/70 bg-background p-5">
            <div className="flex items-center gap-2 text-primary"><TicketCheck aria-hidden="true" size={18} /><p className="text-[11px] font-semibold uppercase tracking-[0.14em]">Official Pass ID</p></div>
            <p className="mt-2 font-mono text-2xl font-bold tracking-wide text-foreground">{savedRegistration.passId}</p>
            <p className="mt-3 text-sm text-on-surface-variant">Payment status: <span className="font-semibold capitalize text-foreground">{savedRegistration.payment.status.replaceAll("_", " ")}</span></p>
          </div>

          <Link href="/check-registration" className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-on-primary transition hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
            Check my registration
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-[70vh] w-full bg-background px-5 py-8 sm:px-8 sm:py-12">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg text-sm font-medium text-on-surface-variant transition-colors hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <ArrowLeft aria-hidden="true" size={16} />
          Back to camp details
        </Link>

        <div className="mb-8 mt-8 max-w-3xl sm:mb-10 sm:mt-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">SHIFT Camp · 15–18 December 2026</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Let’s get you ready for camp</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-on-surface-variant sm:text-base sm:leading-7">
            Share a few details so the camp team can prepare for your visit.
          </p>
        </div>

        <div id="registration-preview-note" role="note" className="mb-7 flex items-start gap-3 rounded-xl border border-primary/25 bg-primary-container/10 p-4 text-sm leading-6 text-on-surface-variant">
          <Info aria-hidden="true" className="mt-0.5 shrink-0 text-primary" size={18} />
          <p><span className="font-semibold text-foreground">Payment is due on arrival.</span> Your registration and pass ID will be saved when you complete this form. Online payment is not available yet.</p>
        </div>

        <nav aria-label="Registration progress" className="mb-7 rounded-2xl border border-outline-variant/70 bg-surface-container-lowest p-3 sm:mb-8 sm:p-4">
          <ol className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
            {steps.map(({ id, label }) => {
              const isCurrent = activeStep === id;
              const isComplete = activeStep > id;

              return (
                <li key={id}>
                  <button
                    type="button"
                    aria-current={isCurrent ? "step" : undefined}
                    onClick={() => goToStep(id)}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${isCurrent ? "bg-primary-container/15 text-foreground" : "text-on-surface-variant hover:bg-surface-container"
                      }`}
                  >
                    <span className={`flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${isCurrent ? "bg-primary-container text-on-primary-container" : isComplete ? "bg-secondary-container text-on-secondary-container" : "bg-surface-container-high text-on-surface-variant"}`}>
                      {id}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[10px] font-semibold uppercase tracking-[0.16em] text-on-surface-variant">Step {id} of 3</span>
                      <span className={`mt-0.5 block text-sm font-semibold ${isCurrent ? "text-primary" : "text-foreground"}`}>{label}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1.65fr)_minmax(17rem,0.75fr)] lg:gap-8">
          <form
            aria-describedby="registration-preview-note"
            className="min-w-0"
            onSubmit={handleSubmit}
          >
            <AttendeeDetails attendee={regisForm.attendee} handleAttendeeFieldChange={handleAttendeeFieldChange} active={activeStep === 1} onContinue={() => goToStep(2)} />
            <EmergencyDetails active={activeStep === 2} onBack={() => goToStep(1)} onContinue={() => goToStep(3)} emergency={regisForm.emergency} requests={regisForm.requests} handleEmergencyFieldChange={handleEmergencyFieldChange} handleDietaryRequestChange={handleDietaryRequestChange}/>
            <PaymentDetails active={activeStep === 3} onBack={() => goToStep(2)} paymentMethod={regisForm.paymentMethod} onPaymentMethodChange={(paymentMethod) => setRegisForm((prev) => ({ ...prev, paymentMethod }))} isSubmitting={isSubmitting}
            />
            {submitError && <p role="alert" className="mt-4 rounded-xl border border-error/30 bg-error/10 px-4 py-3 text-sm leading-6 text-error">{submitError}</p>}
          </form>

          <aside aria-label="Camp information" className="grid gap-4 lg:sticky lg:top-24">
            <div className="overflow-hidden rounded-2xl border border-outline-variant/60 bg-surface-container-lowest">
              <div className="relative h-44 sm:h-52">
                <Image
                  src="/images/expectation/venue.png"
                  alt="The grounds at Royal Girls Academy"
                  fill
                  sizes="(max-width: 1024px) 100vw, 34vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent" />
                <p className="absolute bottom-4 left-4 text-xs font-semibold uppercase tracking-[0.18em] text-white">Camp venue</p>
              </div>
              <div className="space-y-4 p-5">
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Royal Girls Academy</h2>
                  <p className="mt-1 text-sm leading-5 text-on-surface-variant">Ozuoba, Obio-Akpor, Port Harcourt, Rivers State, Nigeria</p>
                </div>
                <div className="flex items-center gap-3 border-t border-outline-variant/60 pt-4 text-sm">
                  <MapPin aria-hidden="true" className="shrink-0 text-primary" size={17} />
                  <span className="text-on-surface-variant">Venue</span>
                </div>
                <div className="flex items-center gap-3 border-t border-outline-variant/60 pt-4 text-sm">
                  <CalendarDays aria-hidden="true" className="shrink-0 text-primary" size={17} />
                  <span className="text-on-surface-variant">15–18 December 2026</span>
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Royal+Girls+Academy%2C+Ozuoba%2C+Obio-Akpor%2C+Port+Harcourt%2C+Rivers+State%2C+Nigeria"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
                >
                  View venue on map <ArrowUpRight aria-hidden="true" size={15} />
                </a>
              </div>
            </div>

            <p className="rounded-xl bg-surface-container-low px-4 py-3 text-xs leading-5 text-on-surface-variant">
              Camp fee and payment instructions will be added after they’re confirmed by the organizers.
            </p>
          </aside>
        </div>
      </div>
    </main>
  );
}
