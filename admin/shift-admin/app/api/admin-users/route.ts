import { clerkClient } from "@clerk/nextjs/server";
import { Types } from "mongoose";
import { NextResponse } from "next/server";
import { z } from "zod";
import { authorizeOwnerApi, hasSameOrigin, toAdminDto } from "@/lib/auth/authorize-owner-api";
import AdminInvitation from "@/lib/models/adminInvitation";
import AdminUser from "@/lib/models/adminUser";

const inviteSchema = z.object({
  email: z.email().trim().max(254),
  role: z.enum(["admin", "owner"]).default("admin"),
}).strict();

/** Lists current admin accounts and invitations, visible to active owners only. */
export async function GET() {
  try {
    const authorization = await authorizeOwnerApi();
    
    if ("response" in authorization) return authorization.response;

    const now = new Date();

    await AdminInvitation.updateMany(
      { status: "pending", expiresAt: { $lte: now } },
      { $set: { status: "expired" } },
    );

    const [admins, invitations] = await Promise.all([
      AdminUser.find({}).sort({ role: 1, email: 1 }).lean(),
      AdminInvitation.find({}).sort({ createdAt: -1 }).lean(),
    ]);

    return NextResponse.json({
      admins: admins.map(toAdminDto),
      invitations: invitations.map((invitation) => ({
        id: invitation._id.toString(),
        email: invitation.email,
        role: invitation.role,
        status: invitation.status,
        expiresAt: invitation.expiresAt.toISOString(),
        createdAt: invitation.createdAt?.toISOString() ?? null,
      })),
    });
  } catch (error) {
    console.error("GET /api/admin-users failed:", error);
    return NextResponse.json({ error: "Unable to load admin access." }, { status: 500 });
  }
}

/** Sends a Clerk invitation; only an existing owner may assign the invited role. */
export async function POST(request: Request) {
  if (!hasSameOrigin(request)) {
    return NextResponse.json({ error: "Cross-origin requests are not allowed." }, { status: 403 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = inviteSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Enter a valid email address.", details: parsed.error.issues.map((issue) => issue.message) },
      { status: 400 },
    );
  }

  try {
    const authorization = await authorizeOwnerApi();

    if ("response" in authorization) return authorization.response;

    const email = parsed.data.email.toLowerCase();
    const existingAdmin = await AdminUser.exists({ email, active: true });

    if (existingAdmin) {
      return NextResponse.json({ error: "This email already has admin access." }, { status: 409 });
    }

    const existingInvitation = await AdminInvitation.findOne({ email, status: "pending" });

    if (existingInvitation && existingInvitation.expiresAt > new Date()) {
      return NextResponse.json({ error: "An active invitation already exists for this email." }, { status: 409 });
    }

    if (existingInvitation) {
      existingInvitation.status = "expired";
      await existingInvitation.save();
    }

    const invitationRecordId = new Types.ObjectId();
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const client = await clerkClient();

    const record = await AdminInvitation.create({
      _id: invitationRecordId,
      clerkInvitationId: `preparing:${invitationRecordId.toString()}`,
      email,
      role: parsed.data.role,
      status: "pending",
      invitedByAdminId: authorization.owner._id,
      expiresAt,
    });

    let clerkInvitationId: string | undefined;

    try {
      const clerkInvitation = await client.invitations.createInvitation({
        emailAddress: email,
        expiresInDays: 7,
        ignoreExisting: false,
        notify: true,
        redirectUrl: new URL("/sign-up", request.url).toString(),
        publicMetadata: { shiftAdminInvitationId: invitationRecordId.toString() },
      });

      clerkInvitationId = clerkInvitation.id;

      // Persist locally before the invite email can be accepted and trigger the webhook.
      record.clerkInvitationId = clerkInvitationId;
      await record.save();

      return NextResponse.json({
        invitation: {
          id: record._id.toString(),
          email: record.email,
          role: record.role,
          status: record.status,
          expiresAt: record.expiresAt.toISOString(),
          createdAt: record.createdAt?.toISOString() ?? null,
        },
      }, { status: 201 });
    } catch (databaseError) {

      if (clerkInvitationId) {
        // Keep Clerk and MongoDB in sync if the invitation cannot be committed locally.
      await client.invitations.revokeInvitation(clerkInvitationId).catch((revokeError: unknown) => {
          console.error("Failed to revoke an invitation after database write failure:", revokeError);
        });
      }

      const latestRecord = await AdminInvitation.findById(invitationRecordId);
      if (latestRecord?.status === "pending") await latestRecord.deleteOne();
      throw databaseError;
    }
  } catch (error) {
    console.error("POST /api/admin-users failed:", error);

    const status = typeof error === "object" && error !== null && "status" in error
      && typeof error.status === "number" && error.status >= 400 && error.status < 500
      ? 409
      : 500;
    return NextResponse.json(
      { error: status === 409 ? "Clerk could not create that invitation. Check whether the account or an invitation already exists." : "Unable to create the admin invitation." },
      { status },
    );
  }
}
