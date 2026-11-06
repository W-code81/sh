import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { HydratedDocument } from "mongoose";
import connectDb from "@/lib/db/mongoose";
import AdminUser, { type AdminUserRecord } from "@/lib/models/adminUser";

type AdminApiResult =
  | { admin: HydratedDocument<AdminUserRecord> }
  | { response: NextResponse };

/** Resolves an active admin and returns JSON auth errors instead of redirects. */
export async function authorizeAdminApi(): Promise<AdminApiResult> {
  const { userId } = await auth();

  if (!userId) {
    return { response: NextResponse.json({ error: "Authentication required." }, { status: 401 }) };
  }

  await connectDb();
  const admin = await AdminUser.findOne({ authProviderUserId: userId, active: true });

  if (!admin) {
    return { response: NextResponse.json({ error: "Active admin access required." }, { status: 403 }) };
  }

  return { admin };
}
