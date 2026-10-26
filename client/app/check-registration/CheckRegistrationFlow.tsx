"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { ArrowLeft, CheckCircle2, ShieldCheck, TicketCheck } from "lucide-react";
import RegistrationTicket, { type TicketDetails } from "./RegistrationTicket";
import { RequestCode, VerifyCode } from "./actions";
import { DetailsForm } from "../section/check-registrations/DetailsForm";
import { CodeForm } from "../section/check-registrations/CodeForm";

export default function CheckRegistrationFlow() {
  const [ticket, setTicket] = useState<TicketDetails | null>(null);

  const [verifyCode, setVerifyCode] = useState<boolean>(false)
  const [verifyError, setVerifyError] = useState<string | null>(null)
  const [requestError, setRequestError] = useState<string | null>(null)
  const [isRequesting, setIsRequesting] = useState<boolean>(false)
  const [isVerifying, setIsVerifying] = useState<boolean>(false)
  const [challengeId, setChallengeId] = useState<string | null>(null)


  async function handleRequest(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const payload = {
      passId: String(formData.get("passId") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
    }
    setRequestError(null);

    try {
      setIsRequesting(true)

      const results = await RequestCode(payload)

      if (!results.ok) {
        setRequestError(results.error)
        return
      }

      setChallengeId(results.result.challengeId)
      setVerifyCode(true)
    }
    catch {
      setRequestError("We couldn’t reach the verification service. Please try again shortly.")
    } finally {
      setIsRequesting(false)
    }
  }

  async function handleVerify(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const payload = {
      challengeId: challengeId?.trim() ?? "",
      code: String(formData.get("code") ?? "").trim(),
    }
    setVerifyError(null);

    try {
      setIsVerifying(true)

      const results = await VerifyCode(payload)

      if (!results.ok) {
        setVerifyError(results.error)
        return
      }

      const paymentMethodMap = {
        card: "card",
        bank_transfer: "bank-transfer",
        pay_on_arrival: "pay-on-arrival",
        onsite: "onsite",
      } as const;
      
      const method = results.attendee.paymentMethod;
      
      const ticketDto: TicketDetails = {
        passId: results.attendee.passId,
        attendeeName: results.attendee.attendeeName,
        email: results.attendee.email,
        paymentMethod: method ? paymentMethodMap[method] : undefined,
        paymentStatus: results.attendee.paymentStatus
      }

      setTicket(ticketDto)
      setVerifyCode(false)
      setChallengeId(null)
    }
    catch {
      setVerifyError("We couldn’t reach the verification service. Please try again shortly.")
    } finally {
      setIsVerifying(false)
    }
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

        <section aria-label={ticket ? "Verified registration details" : verifyCode ? "Enter verification code" : "Find your registration"} className="w-full">

          {!verifyCode && !ticket && <DetailsForm handleRequest={handleRequest} isRequesting={isRequesting} requestError={requestError} />}
          {verifyCode && !ticket && <CodeForm handleVerify={handleVerify} isVerifying={isVerifying} verifyError={verifyError} />}
          {!verifyCode && ticket && (
            <div>
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-primary">
                    <CheckCircle2 aria-hidden="true" size={20} />
                    <p className="text-xs font-semibold uppercase tracking-[0.15em]">Verified attendee</p>
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
