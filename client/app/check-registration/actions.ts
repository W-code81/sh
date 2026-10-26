"use server"

type RequestResponse = {
    message?: string,
    error?: string
    challengeId: string
}

type PayloadData = {
    passId: string,
    email: string
}

export async function RequestCode(payload: PayloadData) {
    const adminApiUrl = process.env.ADMIN_API_URL?.replace(/\/+$/, "");

    if (!adminApiUrl) {
        return { ok: false as const, error: "Registration service is not configured." };
    }

    try {
        const response = await fetch(`${adminApiUrl}/api/attendee-lookup/request-code`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            cache: "no-store",
        });

        const result = (await response.json()) as RequestResponse;

        if (!response.ok ) {
            return {
                ok: false as const,
                error: result.error ?? "We couldn’t request verification. Please try again.",
            };
        }

        return {
            ok: true as const,
            result
        };

    } catch {
        return {
            ok: false as const,
            error: "We couldn’t reach the verification service. Please try again shortly.",
        };
    }

}