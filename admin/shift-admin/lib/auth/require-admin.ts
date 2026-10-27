import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import connectDb from "@/lib/db/mongoose";
import AdminUser from "@/lib/models/adminUser";

/** Resolves the signed-in admin record and keeps inactive or unknown users out. */
export async function requireAdmin() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  await connectDb();
  const admin = await AdminUser.findOne({ authProviderUserId: userId, active: true })
    .select("authProviderUserId email role active")
    .lean();

  if (!admin) {
    notFound();
  }

  return admin;
}

/** Conceals owner-only pages from regular admins, including direct URL visits. */
export async function requireOwner() {
  const admin = await requireAdmin();

  if (admin.role !== "owner") {
    notFound();
  }

  return admin;
}
