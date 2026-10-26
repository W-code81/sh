import type { HydratedDocument } from "mongoose";
import { createHmac, timingSafeEqual } from "node:crypto";
import connectDb from "../db/mongoose";
import Registration, {
  type PaymentMethod,
  type PaymentStatus,
  type RegistrationRecord,
} from "../models/registration";
import OtpChallenge from "../models/otpChallenges";

export type AttendeeTicketDto = {
  passId: string;
  attendeeName: string;
  email: string;
  paymentMethod: PaymentMethod | null;
  paymentStatus: PaymentStatus;
};

type VerifyLookupResult =
  | { ok: true; attendee: AttendeeTicketDto }
  | { ok: false; message: string };

const invalidCodeResult: VerifyLookupResult = {
  ok: false,
  message: "Invalid or expired code.",
};

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

export async function verifyLookUp(
  challengeId: string,
  code: string,
): Promise<VerifyLookupResult> {
  // Challenge IDs are UUIDs; keep their stored casing consistent.
  const cleanChallengeId = challengeId.trim().toLowerCase();
  const cleanCode = code.trim().toUpperCase();
  const apiKey = process.env.RESEND_API_KEY;

  if (!cleanChallengeId || !cleanCode) return invalidCodeResult;
  if (!apiKey) throw new Error("RESEND_API_KEY is not configured.");

  await connectDb();

  // codeHash is excluded by default in the schema, so explicitly select it.
  const challenge = await OtpChallenge.findOne({
    challengeId: cleanChallengeId,
  }).select("+codeHash");

  const now = new Date();

  if (
    !challenge ||
    challenge.consumedAt !== null ||
    challenge.expiresAt <= now ||
    challenge.attempts >= challenge.maxAttempts
  ) {
    return invalidCodeResult;
  }

  const submittedHash = createHmac("sha256", apiKey)
    .update(cleanCode)
    .digest("hex");
    
  const storedHash = Buffer.from(challenge.codeHash, "hex");
  const submittedHashBuffer = Buffer.from(submittedHash, "hex");

  const codeMatches =
    storedHash.length === submittedHashBuffer.length &&
    timingSafeEqual(storedHash, submittedHashBuffer);

  if (!codeMatches) {
    await OtpChallenge.updateOne(
      {
        _id: challenge._id,
        consumedAt: null,
        expiresAt: { $gt: now },
        attempts: { $lt: challenge.maxAttempts },
      },
      { $inc: { attempts: 1 } },
    );

    return invalidCodeResult;
  }

  // Consume exactly once; a concurrent verification will fail this condition.
  const consumeResult = await OtpChallenge.updateOne(
    {
      _id: challenge._id,
      consumedAt: null,
      expiresAt: { $gt: now },
      attempts: { $lt: challenge.maxAttempts },
    },
    { $set: { consumedAt: now } },
  );
  if (consumeResult.modifiedCount !== 1) return invalidCodeResult;

  // Select only the fields the attendee ticket needs.
  const registration = await Registration.findOne({
    _id: challenge.registrationId,
    registrationStatus: "active",
  })
    .select("passId attendee.fullName attendee.email payment.method payment.status")
    .lean();

  if (!registration) return invalidCodeResult;

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
