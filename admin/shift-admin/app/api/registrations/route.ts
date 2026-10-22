import { ZodError } from "zod";
import { NextResponse } from "next/server";
import { createRegistration } from "@/lib/services/registration";
import { sendRegistrationConfirmationEmail } from "@/lib/services/registration-email";

/** Creates a website registration using the shared validation and service layer. */
export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  try {
    const registration = await createRegistration(body, { source: "website" });
    
    let confirmationEmailSent = false;

    try {
      await sendRegistrationConfirmationEmail(registration);
      confirmationEmailSent = true;
    } catch (emailError: unknown) {
      // Keep the saved registration successful even if the email provider is down.
      console.error("Registration confirmation email failed:", emailError);
    }

    // Return only what the public registration flow needs; attendee and emergency
    // contact details stay on the server.
    return NextResponse.json(
      {
        message: "Registration created",
        registration: {
          passId: registration.passId,
          registrationStatus: registration.registrationStatus,
          payment: {
            method: registration.payment.method,
            status: registration.payment.status,
            currency: registration.payment.currency,
            amountDueKobo: registration.payment.amountDueKobo,
            amountPaidKobo: registration.payment.amountPaidKobo,
          },
          confirmationEmailSent,
        },
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: error.issues.map((issue) => ({
            field: issue.path.join("."),
            message: issue.message,
          })),
        },
        { status: 400 },
      );
    }

    console.error("POST /api/registrations failed:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
