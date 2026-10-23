import type { HydratedDocument } from "mongoose";
import connectDb from "../db/mongoose";
import Registration, { type RegistrationRecord } from "../models/registration";

/** Finds an active registration matching the attendee's pass ID and email. */
export async function lookUp(
  email: string,
  passId: string,
): Promise<HydratedDocument<RegistrationRecord> | null> {
  const cleanEmail = email.trim().toLowerCase();
  const cleanPassId = passId.trim().toUpperCase();

  if (!cleanEmail || !cleanPassId) return null;

  await connectDb();

  return Registration.findOne({
    passId: cleanPassId,
    "attendee.emailNormalized": cleanEmail,
    registrationStatus: "active",
  });
}
