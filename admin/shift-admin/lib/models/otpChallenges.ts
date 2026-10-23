import mongoose, { type Model, type Types } from "mongoose";

/** A one-time verification challenge for accessing an attendee's registration. */
export interface OtpChallengeRecord {
  challengeId: string;
  registrationId: Types.ObjectId;
  codeHash: string;
  expiresAt: Date;
  attempts: number;
  maxAttempts: number;
  consumedAt: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

const OtpChallengeSchema = new mongoose.Schema<OtpChallengeRecord>(
  {
    challengeId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    registrationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Registration",
      required: true,
    },
    codeHash: {
      type: String,
      required: true,
      select: false,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    attempts: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    maxAttempts: {
      type: Number,
      required: true,
      default: 5,
      min: 1,
    },
    consumedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);

OtpChallengeSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
OtpChallengeSchema.index({ registrationId: 1, consumedAt: 1 });

const OtpChallenge =
  (mongoose.models.OtpChallenge as Model<OtpChallengeRecord> | undefined) ??
  mongoose.model<OtpChallengeRecord>("OtpChallenge", OtpChallengeSchema);

export default OtpChallenge;
