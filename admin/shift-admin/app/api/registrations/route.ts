import { ZodError } from "zod";
import { NextResponse } from "next/server";
import { authorizeAdminApi } from "@/lib/auth/authorize-admin-api";
import Registration from "@/lib/models/registration";
import { createRegistration } from "@/lib/services/registration";
import { sendRegistrationConfirmationEmail } from "@/lib/services/registration-email";

const PAGE_SIZE = 10;

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** Returns a compact, paginated registration list for active admins. */
export async function GET(request: Request) {
  try {
    const authorization = await authorizeAdminApi();
    if ("response" in authorization) return authorization.response;

    const url = new URL(request.url);
    const rawPage = Number.parseInt(url.searchParams.get("page") ?? "1", 10);
    const query = (url.searchParams.get("q") ?? "").trim().slice(0, 100);
    const source = url.searchParams.get("source") ?? "all";
    const status = url.searchParams.get("status") ?? "all";

    if (!Number.isInteger(rawPage) || rawPage < 1) {
      return NextResponse.json({ error: "Page must be a positive integer." }, { status: 400 });
    }
    if (!["all", "website", "on_arrival"].includes(source)) {
      return NextResponse.json({ error: "Invalid registration source." }, { status: 400 });
    }
    if (!["all", "active", "cancelled"].includes(status)) {
      return NextResponse.json({ error: "Invalid registration status." }, { status: 400 });
    }

    const filter: Record<string, unknown> = {};
    if (source !== "all") filter.registrationSource = source;
    if (status !== "all") filter.registrationStatus = status;
    if (query) {
      const matcher = new RegExp(escapeRegex(query), "i");
      filter.$or = [
        { passId: matcher },
        { "attendee.fullName": matcher },
        { "attendee.email": matcher },
        { "attendee.phoneNumber": matcher },
      ];
    }

    const total = await Registration.countDocuments(filter);
    const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
    const page = Math.min(rawPage, totalPages);
    const records = await Registration.find(filter)
      .sort({ createdAt: -1, _id: -1 })
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .select("passId attendee.fullName attendee.email attendee.phoneNumber registrationSource registrationStatus payment.method payment.status createdAt")
      .lean();

    return NextResponse.json({
      registrations: records.map((record) => ({
        id: record._id.toString(),
        passId: record.passId,
        name: record.attendee.fullName,
        email: record.attendee.email,
        phoneNumber: record.attendee.phoneNumber,
        source: record.registrationSource,
        registrationStatus: record.registrationStatus,
        paymentMethod: record.payment.method ?? null,
        paymentStatus: record.payment.status,
        createdAt: record.createdAt?.toISOString() ?? null,
      })),
      pagination: { page, pageSize: PAGE_SIZE, total, totalPages },
    });
  } catch (error) {
    console.error("GET /api/registrations failed:", error);
    return NextResponse.json({ error: "Unable to load registrations." }, { status: 500 });
  }
}

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
