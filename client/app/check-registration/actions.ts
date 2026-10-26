"use server";

type RequestCodePayload = { passId: string; email: string };
type RequestCodeResponse = { message: string; challengeId: string };

type RequestCodeActionResult =
  | {
      ok: true;
      result: { message: string; challengeId: string };
    }
  | { ok: false; error: string };

type VerifyCodePayload = { challengeId: string; code: string };
type TicketDto = {
  passId: string;
  attendeeName: string;
  email: string;
  paymentMethod: "card" | "bank_transfer" | "pay_on_arrival" | "onsite" | null;
  paymentStatus: "pending" | "due" | "paid" | "failed" | "refunded";
};
type VerifyCodeActionResult =
  | { ok: true; attendee: TicketDto }
  | { ok: false; error: string };

const paymentMethods = ["card", "bank_transfer", "pay_on_arrival", "onsite"] as const;
const paymentStatuses = ["pending", "due", "paid", "failed", "refunded"] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseRequestPayload(payload: unknown): RequestCodePayload | null {
  if (!isRecord(payload)) return null;

  const passId = typeof payload.passId === "string" ? payload.passId.trim() : "";
  const email = typeof payload.email === "string" ? payload.email.trim().toLowerCase() : "";
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!passId || passId.length > 64 || email.length > 254 || !validEmail) return null;
  return { passId, email };
}

function parseRequestResponse(value: unknown): RequestCodeResponse | null {
  if (!isRecord(value)) return null;

  const isUuid =
    typeof value.challengeId === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      value.challengeId,
    );

  if (typeof value.message !== "string" || !isUuid) return null;
  return { message: value.message, challengeId: value.challengeId as string };
}

function parseVerifyCodePayload(payload: unknown): VerifyCodePayload | null {
  if (!isRecord(payload)) return null;

  const challengeId = typeof payload.challengeId === "string" ? payload.challengeId.trim() : "";
  const code = typeof payload.code === "string" ? payload.code.trim().toUpperCase() : "";
  const validChallengeId =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(challengeId);

  if (!validChallengeId || !/^[0-9A-F]{16}$/.test(code)) return null;
  return { challengeId, code };
}

function parseTicketDto(value: unknown): TicketDto | null {
  if (!isRecord(value) || !isRecord(value.attendee)) return null;

  const attendee = value.attendee;
  const validPaymentMethod =
    attendee.paymentMethod === null ||
    paymentMethods.some((method) => method === attendee.paymentMethod);
  const validPaymentStatus = paymentStatuses.some(
    (status) => status === attendee.paymentStatus,
  );

  if (
    typeof attendee.passId !== "string" ||
    typeof attendee.attendeeName !== "string" ||
    typeof attendee.email !== "string" ||
    !validPaymentMethod ||
    !validPaymentStatus
  ) {
    return null;
  }

  return {
    passId: attendee.passId,
    attendeeName: attendee.attendeeName,
    email: attendee.email,
    paymentMethod: attendee.paymentMethod as TicketDto["paymentMethod"],
    paymentStatus: attendee.paymentStatus as TicketDto["paymentStatus"],
  };
}

/** Proxies attendee lookup requests to the private admin service. */
export async function RequestCode(payload: unknown): Promise<RequestCodeActionResult> {
  const parsedPayload = parseRequestPayload(payload);
  if (!parsedPayload) {
    return { ok: false, error: "Enter a valid pass ID and email address." };
  }

  const adminApiUrl = process.env.ADMIN_API_URL?.trim().replace(/\/+$/, "");
  if (!adminApiUrl) {
    return { ok: false, error: "Registration service is not configured." };
  }

  try {
    const response = await fetch(`${adminApiUrl}/api/attendee-lookup/request-code`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsedPayload),
      cache: "no-store",
    });

    const responseBody: unknown = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMessage = isRecord(responseBody) && typeof responseBody.error === "string"
        ? responseBody.error
        : null;
      return {
        ok: false,
        error: errorMessage
          ? errorMessage
          : "We couldn’t request verification. Please try again.",
      };
    }

    const result = parseRequestResponse(responseBody);
    if (!result) {
      return { ok: false, error: "The verification service returned an unexpected response." };
    }

    return { ok: true, result };
  } catch {
    return {
      ok: false,
      error: "We couldn’t reach the verification service. Please try again shortly.",
    };
  }
}

/** Verifies an email code and returns only the registration fields needed for the ticket. */
export async function VerifyCode(payload: unknown): Promise<VerifyCodeActionResult> {

  const parsedPayload = parseVerifyCodePayload(payload);

  if (!parsedPayload) {
    return { ok: false, error: "Enter the challenge ID and the 16-character code from your email." };
  }

  const adminApiUrl = process.env.ADMIN_API_URL?.trim().replace(/\/+$/, "");
  if (!adminApiUrl) {
    return { ok: false, error: "Registration service is not configured." };
  }

  try {
    const response = await fetch(`${adminApiUrl}/api/attendee-lookup/verify-code`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsedPayload),
      cache: "no-store",
    });

    const responseBody: unknown = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMessage = isRecord(responseBody) && typeof responseBody.error === "string"
        ? responseBody.error
        : null;
      return {
        ok: false,
        error: errorMessage ?? "That code is invalid or expired. Request a new code and try again.",
      };
    }

    const attendee = parseTicketDto(responseBody);
    
    if (!attendee) {
      return { ok: false, error: "The verification service returned an unexpected response." };
    }

    return { ok: true, attendee };
  } catch {
    return {
      ok: false,
      error: "We couldn’t reach the verification service. Please try again shortly.",
    };
  }
}
