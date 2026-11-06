import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import { authorizeAdminApi } from "@/lib/auth/authorize-admin-api";
import Registration from "@/lib/models/registration";

/** Loads full attendee and payment details only for an authenticated admin. */
export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const authorization = await authorizeAdminApi();
    if ("response" in authorization) return authorization.response;

    const { id } = await context.params;
    if (!isValidObjectId(id)) {
      return NextResponse.json({ error: "Invalid registration ID." }, { status: 400 });
    }

    const record = await Registration.findById(id)
      .select("passId attendee.fullName attendee.email attendee.phoneNumber attendee.fellowshipGroup attendee.ageGroup emergencyContact requests registrationSource registrationStatus payment createdAt")
      .lean();

    if (!record) {
      return NextResponse.json({ error: "Registration not found." }, { status: 404 });
    }

    return NextResponse.json({
      registration: {
        id: record._id.toString(),
        passId: record.passId,
        attendee: record.attendee,
        emergencyContact: record.emergencyContact,
        requests: record.requests ?? {},
        registrationSource: record.registrationSource,
        registrationStatus: record.registrationStatus,
        payment: {
          method: record.payment.method ?? null,
          status: record.payment.status,
          currency: record.payment.currency,
          amountDueKobo: record.payment.amountDueKobo ?? null,
          amountPaidKobo: record.payment.amountPaidKobo,
          provider: record.payment.provider ?? null,
          providerReference: record.payment.providerReference ?? null,
          paidAt: record.payment.paidAt?.toISOString() ?? null,
        },
        createdAt: record.createdAt?.toISOString() ?? null,
      },
    });
  } catch (error) {
    console.error("GET /api/registrations/[id] failed:", error);
    return NextResponse.json({ error: "Unable to load registration details." }, { status: 500 });
  }
}
