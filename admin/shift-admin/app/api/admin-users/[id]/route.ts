import { NextResponse } from "next/server";
import { isValidObjectId } from "mongoose";
import { authorizeOwnerApi, hasSameOrigin, toAdminDto } from "@/lib/auth/authorize-owner-api";
import AdminUser from "@/lib/models/adminUser";

/** Deactivates an admin without deleting their audit history or Clerk account. */
export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  if (!hasSameOrigin(request)) {
    return NextResponse.json({ error: "Cross-origin requests are not allowed." }, { status: 403 });
  }

  const { id } = await context.params;

  if (!isValidObjectId(id)) {
    return NextResponse.json({ error: "Invalid admin ID." }, { status: 400 });
  }

  try {
    const authorization = await authorizeOwnerApi();
    
    if ("response" in authorization) return authorization.response;

    const target = await AdminUser.findById(id);

    if (!target || !target.active) {
      return NextResponse.json({ error: "Active admin not found." }, { status: 404 });
    }

    if (target._id.equals(authorization.owner._id)) {
      return NextResponse.json({ error: "You cannot remove your own admin access here." }, { status: 409 });
    }

    if (target.role === "owner") {
      const activeOwnerCount = await AdminUser.countDocuments({ role: "owner", active: true });

      if (activeOwnerCount <= 1) {
        return NextResponse.json(
          { error: "This is the last active super-admin. Add another super-admin before removing this account." },
          { status: 409 },
        );
      }
    }

    target.active = false;
    await target.save();

    return NextResponse.json({ admin: toAdminDto(target) });
  } catch (error) {
    console.error("DELETE /api/admin-users/[id] failed:", error);
    return NextResponse.json({ error: "Unable to remove admin access." }, { status: 500 });
  }
}
