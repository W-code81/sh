import { clerkClient } from "@clerk/nextjs/server";
import { isValidObjectId } from "mongoose";
import { NextResponse } from "next/server";
import { authorizeOwnerApi, hasSameOrigin } from "@/lib/auth/authorize-owner-api";
import AdminInvitation from "@/lib/models/adminInvitation";

/** Revokes a pending Clerk invite and marks the local invitation record. */
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  if (!hasSameOrigin(request)) {
    return NextResponse.json({ error: "Cross-origin requests are not allowed." }, { status: 403 });
  }

  const { id } = await context.params;
  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid invitation ID." }, { status: 400 });
  }

  try {
    const authorization = await authorizeOwnerApi();
    if ("response" in authorization) return authorization.response;

    const invitation = await AdminInvitation.findById(id);
    if (!invitation || invitation.status !== "pending") {
      return NextResponse.json({ error: "Pending invitation not found." }, { status: 404 });
    }

    const client = await clerkClient();
    await client.invitations.revokeInvitation(invitation.clerkInvitationId);
    invitation.status = "revoked";
    await invitation.save();

    return NextResponse.json({
      invitation: {
        id: invitation._id.toString(),
        email: invitation.email,
        role: invitation.role,
        status: invitation.status,
      },
    });
  } catch (error) {
    console.error("DELETE /api/admin-users/invitations/[id] failed:", error);
    return NextResponse.json({ error: "Unable to revoke the invitation." }, { status: 500 });
  }
}
