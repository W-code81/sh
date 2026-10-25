import type { HydratedDocument } from "mongoose";
import connectDb from "../db/mongoose";
import Registration, { type RegistrationRecord } from "../models/registration";
import OtpChallenge from "../models/otpChallenges";
import { createHmac } from "crypto";

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

export async function verifyLookUp(challengeId: string, code: string) {
  const cleanChallengeId = challengeId.trim().toUpperCase()
  const cleanCode = code.trim().toUpperCase();
  const apiKey = process.env.RESEND_API_KEY;
  const hashedCode = createHmac("sha256", apiKey).update(cleanCode).digest("hex");
  const now = new Date();

  if (!cleanChallengeId || !cleanCode) return null

  await connectDb();

  // Find active challenge and include codeHash
  const challenge = await OtpChallenge.findOne({
    challengeId: cleanChallengeId,
  }).select("+codeHash");

  // Reject expired, consumed, or locked challenges
  if (
    !challenge ||
    challenge.consumedAt !== null ||
    challenge.expiresAt <= now ||
    challenge.attempts >= challenge.maxAttempts
  ) {
    return { ok: false, message: "Invalid or expired code." };
  }

  // Compare submitted code hash safely and Increment attempts on failure
  if (challenge.codeHash !== hashedCode) {
    const updateChallenge = await OtpChallenge.updateOne(
      {
        _id: challenge._id,
        consumedAt: null,
        expiresAt: { $gt: now },
        attempts: { $lt: challenge.maxAttempts },
      },
      { $inc: { attempts: 1 } },
    );

    return updateChallenge
  }

  // Atomically consume challenge on success
  await OtpChallenge.updateOne(
    {
      _id: challenge._id,
      consumedAt: now,
      expiresAt: { $gt: now },
      attempts: { $lt: challenge.maxAttempts },
    },
    { $inc: { attempts: 1 } },
  );

  // Return a minimal attendee/ticket DTO
  const registration = await Registration.findOne({
    _id: challenge.registrationId,
    registrationStatus: "active",
  }).select(
    "passId attendee.fullName attendee.email payment.method payment.status",
  ).lean();


  if (!registration) {
    return { ok: false, message: "Invalid or expired code." };
  }

  return {
    ok: true,
    attendee: {
      passId: registration.passId,
      attendeeName: registration.attendee.fullName,
      email: registration.attendee.email,
      paymentMethod: registration.payment.method ?? null,
      paymentStatus: registration.payment.status,
    },
  };
}