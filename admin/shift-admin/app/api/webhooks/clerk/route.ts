import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { isValidObjectId } from "mongoose";
import { NextResponse, type NextRequest } from "next/server";
import connectDb from "@/lib/db/mongoose";
import AdminInvitation from "@/lib/models/adminInvitation";
import AdminUser from "@/lib/models/adminUser";

/** Syncs accepted owner-issued invitations into the local authorization table. */
export async function POST(request: NextRequest) {

  // configured env check
  if (!process.env.CLERK_WEBHOOK_SIGNING_SECRET) {
    console.error("CLERK_WEBHOOK_SIGNING_SECRET is not configured.");
    return NextResponse.json({ error: "Webhook is not configured." }, { status: 500 });
  }

  let event;
  try {
    event = await verifyWebhook(request);
  } catch {
    return NextResponse.json({ error: "Invalid webhook signature." }, { status: 400 });
  }

  try {
    await connectDb();

    // deleted user check
    if (event.type === "user.deleted") {
      await AdminUser.updateOne(
        { authProviderUserId: event.data.id },
        { $set: { active: false } },
      );
      return NextResponse.json({ received: true });
    }

    // created user check
    if (event.type !== "user.created") {
      return NextResponse.json({ received: true });
    }

    // invitation id check
    const invitationId = event.data.public_metadata.shiftAdminInvitationId;
    if (typeof invitationId !== "string" || !isValidObjectId(invitationId)) {
      return NextResponse.json({ received: true });
    }

    const invitation = await AdminInvitation.findById(invitationId);
    if (!invitation || invitation.status !== "pending") {
      return NextResponse.json({ received: true });
    }

    // email check
    const primaryEmail = event.data.email_addresses.find(
      (emailAddress) => emailAddress.id === event.data.primary_email_address_id,
    );
    if (
      !primaryEmail
      || primaryEmail.email_address.trim().toLowerCase() !== invitation.email
      || primaryEmail.verification?.status !== "verified"
    ) {
      console.error("Clerk invitation acceptance did not match its verified invite email.");
      return NextResponse.json({ error: "Invitation email did not match." }, { status: 400 });
    }

    // expired invitation check
    if (invitation.expiresAt <= new Date()) {
      invitation.status = "expired";
      await invitation.save();
      return NextResponse.json({ received: true });
    }

    // existing admin check
    const existingAdmin = await AdminUser.findOne({
      $or: [
        { authProviderUserId: event.data.id },
        { email: invitation.email },
      ],
    });

    if (!existingAdmin) {
      await AdminUser.create({
        authProviderUserId: event.data.id,
        email: invitation.email,
        role: invitation.role,
        active: true,
      });
    } else if (
      existingAdmin.authProviderUserId !== event.data.id
      || !existingAdmin.active
    ) {
      console.error("Clerk invitation matched an existing inactive or different admin record.");
      return NextResponse.json({ error: "Admin account requires manual review." }, { status: 409 });
    }

    invitation.status = "accepted";
    invitation.acceptedAt = new Date();
    await invitation.save();

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("POST /api/webhooks/clerk failed:", error);
    return NextResponse.json({ error: "Unable to process Clerk webhook." }, { status: 500 });
  }
}
