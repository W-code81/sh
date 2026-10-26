"use server";

type RequestCodePayload = { passId: string; email: string };
type RequestCodeResponse = { message: string; challengeId: string };

type RequestCodeActionResult =
  | {
      ok: true;
      result: { message: string; challengeId: string };
    }
  | { ok: false; error: string };

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
