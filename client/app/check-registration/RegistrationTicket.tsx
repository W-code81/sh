import { CalendarDays, Clock3, CreditCard, MapPin, WalletCards, type LucideIcon } from "lucide-react";

export type PaymentMethod = "card" | "bank-transfer" | "pay-on-arrival" | "onsite";
export type PaymentStatus = "paid" | "pending" | "due" | "failed" | "refunded";

export type TicketDetails = {
  passId: string;
  email: string;
  attendeeName?: string;
  paymentMethod?: PaymentMethod;
  paymentStatus?: PaymentStatus;
};

type PaymentPresentation = {
  label: string;
  detail: string;
  icon: LucideIcon;
  className: string;
};

function getPaymentPresentation( method?: PaymentMethod, status?: PaymentStatus,): PaymentPresentation {
  if (status === "failed") {
    return {
      label: "Payment not confirmed",
      detail: "Please contact the camp team to resolve your payment status.",
      icon: Clock3,
      className: "border-error/30 bg-error/10 text-error",
    };
  }

  if (status === "refunded") {
    return {
      label: "Payment refunded",
      detail: "Contact the camp team if you have questions about your registration.",
      icon: WalletCards,
      className: "border-outline-variant bg-surface-container-high text-on-surface-variant",
    };
  }

  if (status === "paid") {
    return {
      label: "Paid and confirmed",
      detail: "Your payment has been recorded.",
      icon: CreditCard,
      className: "border-tertiary/30 bg-tertiary-container/20 text-tertiary",
    };
  }

  if (method === "pay-on-arrival") {
    return {
      label: "Pay on arrival",
      detail: "Payment is due at camp check-in.",
      icon: WalletCards,
      className: "border-tertiary/25 bg-tertiary-container/15 text-tertiary",
    };
  }

  if (method === "onsite") {
    return {
      label: "On-site payment",
      detail: "Your payment is handled at camp check-in.",
      icon: WalletCards,
      className: "border-tertiary/25 bg-tertiary-container/15 text-tertiary",
    };
  }

  if (method === "bank-transfer") {
    return {
      label: "Transfer pending",
      detail: "We’re waiting for payment confirmation.",
      icon: Clock3,
      className: "border-primary/25 bg-primary-container/10 text-primary",
    };
  }

  if (method === "card") {
    return {
      label: "Online payment pending",
      detail: "Your online payment is awaiting confirmation.",
      icon: Clock3,
      className: "border-primary/25 bg-primary-container/10 text-primary",
    };
  }

  if (status === "due") {
    return {
      label: "Payment due",
      detail: "Payment is still due for this registration.",
      icon: WalletCards,
      className: "border-tertiary/25 bg-tertiary-container/15 text-tertiary",
    };
  }

  if (status === "pending") {
    return {
      label: "Payment confirmation pending",
      detail: "We’re waiting for payment confirmation.",
      icon: Clock3,
      className: "border-primary/25 bg-primary-container/10 text-primary",
    };
  }

  return {
    label: "Status appears after lookup",
    detail: "Payment information will be shown when your registration is verified.",
    icon: Clock3,
    className: "border-outline-variant bg-surface-container-high text-on-surface-variant",
  };
}

function maskEmail(email: string) {
  const [name, domain] = email.split("@");
  if (!name || !domain) return email;
  return `${name.slice(0, 1)}${"•".repeat(Math.min(Math.max(name.length - 1, 2), 5))}@${domain}`;
}

/** Ticket layout for a verified attendee record; payment copy follows method and status separately. */
export default function RegistrationTicket({ ticket }: { ticket: TicketDetails }) {
  const payment = getPaymentPresentation(ticket.paymentMethod, ticket.paymentStatus);
  const PaymentIcon = payment.icon;

  return (
    <article aria-label="Official attendee ticket preview" className="overflow-hidden rounded-2xl border border-outline-variant/70 bg-surface-container-lowest shadow-[0_18px_60px_rgba(12,7,18,0.16)]">
      <div aria-hidden="true" className="h-1 bg-linear-to-r from-primary-container via-primary to-tertiary" />

      <div className="space-y-6 p-5 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-on-surface-variant">Official Pass ID</p>
            <p className="mt-1 font-mono text-xl font-bold tracking-wide text-primary">{ticket.passId || "SHIFT-••••••"}</p>
          </div>
          <span className={`inline-flex max-w-full items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${payment.className}`}>
            <PaymentIcon aria-hidden="true" size={14} />
            {payment.label}
          </span>
        </div>

        <div className="grid gap-5 border-t border-dashed border-outline-variant/80 pt-5 sm:grid-cols-2">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-on-surface-variant">Registered camper</p>
            <p className="mt-1.5 text-lg font-semibold text-foreground">{ticket.attendeeName || "Name appears after lookup"}</p>
            <p className="mt-1 break-all text-sm text-on-surface-variant">{maskEmail(ticket.email)}</p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-on-surface-variant">Camp theme</p>
            <p className="mt-1.5 text-lg font-semibold text-foreground">Beyond the Ordinary</p>
            <p className="mt-1 text-sm text-on-surface-variant">SHIFT Camp 2026</p>
          </div>
        </div>

        <div className="grid gap-3 rounded-xl bg-surface-container p-4 sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <CalendarDays aria-hidden="true" className="mt-0.5 shrink-0 text-primary" size={17} />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant">Camp dates</p>
              <p className="mt-1 text-sm font-medium text-foreground">15–18 December 2026</p>
              <p className="mt-0.5 text-xs text-on-surface-variant">Tuesday to Friday</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin aria-hidden="true" className="mt-0.5 shrink-0 text-primary" size={17} />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant">Venue</p>
              <p className="mt-1 text-sm font-medium text-foreground">Royal Girls Academy</p>
              <p className="mt-0.5 text-xs text-on-surface-variant">Ozuoba, Port Harcourt</p>
            </div>
          </div>
        </div>

        <div className={`flex items-start gap-3 rounded-xl border p-4 ${payment.className}`}>
          <PaymentIcon aria-hidden="true" className="mt-0.5 shrink-0" size={17} />
          <div>
            <p className="text-sm font-semibold">{payment.label}</p>
            <p className="mt-1 text-sm leading-5 opacity-85">{payment.detail}</p>
            {ticket.paymentMethod && (
              <p className="mt-2 text-xs font-medium opacity-80">
                Method: {ticket.paymentMethod === "pay-on-arrival" ? "Pay on arrival" : ticket.paymentMethod === "bank-transfer" ? "Bank transfer" : ticket.paymentMethod === "onsite" ? "On-site payment" : "Card"}
              </p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
