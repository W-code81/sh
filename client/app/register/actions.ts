"use server";

type RegistrationResponse = {
  message?: string;
  error?: string;
  details?: Array<{ field: string; message: string }>;
  registration?: {
    passId: string;
    registrationStatus: "active" | "cancelled";
    payment: {
      method: string | null;
      status: string;
      currency: string;
      amountDueKobo?: number;
      amountPaidKobo: number;
    };
    confirmationEmailSent?: boolean;
  };
};

export async function createRegistration(payload: unknown) {
  const adminApiUrl = process.env.ADMIN_API_URL?.replace(/\/+$/, "");

  if (!adminApiUrl) {
    return { ok: false as const, error: "Registration service is not configured." };
  }

  try {
    const response = await fetch(`${adminApiUrl}/api/registrations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    const result = (await response.json()) as RegistrationResponse;

    if (!response.ok || !result.registration) {
      return {
        ok: false as const,
        error: result.error ?? "We couldn’t submit your registration. Please try again.",
        details: result.details,
      };
    }

    return {
      ok: true as const,
      registration: {
        ...result.registration,
        confirmationEmailSent: result.registration.confirmationEmailSent ?? false,
      },
    };
    
  } catch {
    return {
      ok: false as const,
      error: "We couldn’t reach the registration service. Please try again shortly.",
    };
  }
}
