import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { HydratedDocument, Types } from "mongoose";
import connectDb from "@/lib/db/mongoose";
import AdminUser, { type AdminUserRecord } from "@/lib/models/adminUser";

type OwnerApiResult =
  | { owner: HydratedDocument<AdminUserRecord> }
  | { response: NextResponse };

/** API routes return JSON auth errors instead of page redirects or not-found boundaries. */
export async function authorizeOwnerApi(): Promise<OwnerApiResult> {
  const { userId } = await auth();

  if (!userId) {
    return { response: NextResponse.json({ error: "Authentication required." }, { status: 401 }) };
  }

  await connectDb();
  const owner = await AdminUser.findOne({ authProviderUserId: userId, active: true });

  if (!owner || owner.role !== "owner") {
    return { response: NextResponse.json({ error: "Owner access required." }, { status: 403 }) };
  }

  return { owner };
}

/** Rejects browser mutations from a different origin while allowing tools without Origin. */
export function hasSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return true;

  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

// normalize admin data
export function toAdminDto(admin: {
  _id: Types.ObjectId;
  email: string;
  role: "owner" | "admin";
  active: boolean;
  createdAt?: Date;
}) {
  return {
    id: admin._id.toString(),
    email: admin.email,
    role: admin.role,
    active: admin.active,
    createdAt: admin.createdAt?.toISOString() ?? null,
  };
}
