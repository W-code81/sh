import mongoose, { type Model, type Types } from "mongoose";

export const AGE_GROUPS = ["18–22", "23–29", "30+"] as const;
export const REGISTRATION_SOURCES = ["website", "on_arrival"] as const;
export const REGISTRATION_STATUS = ["active", "cancelled"] as const;
export const PAYMENT_METHODS = [
  "card",
  "bank_transfer",
  "pay_on_arrival",
  "onsite",
] as const;
export const PAYMENT_STATUSES = [
  "pending",
  "due",
  "paid",
  "failed",
  "refunded",
] as const;

export type RegistrationSource = (typeof REGISTRATION_SOURCES)[number];
export type RegistrationStatus = (typeof REGISTRATION_STATUS)[number];
export type PaymentMethod = (typeof PAYMENT_METHODS)[number];
export type PaymentStatus = (typeof PAYMENT_STATUSES)[number];
export type AgeGroup = (typeof AGE_GROUPS)[number];

export interface RegistrationRecord {
  passId: string;
  attendee: {
    fullName: string;
    phoneNumber: string;
    email: string;
    emailNormalized: string;
    fellowshipGroup: string;
    ageGroup: AgeGroup;
  };
  emergencyContact: {
    name: string;
    phone: string;
  };
  requests: {
    dietaryAccessibility?: string;
  };
  registrationSource: RegistrationSource;
  registrationStatus: RegistrationStatus;
  payment: {
    method?: PaymentMethod | null;
    status: PaymentStatus;
    currency: "NGN";
    amountDueKobo?: number;
    amountPaidKobo: number;
    provider?: "opay" | "paystack" | null;
    providerReference?: string | null;
    paidAt?: Date | null;
  };
  createdByAdminId?: Types.ObjectId | null;
  createdAt?: Date;
  updatedAt?: Date;
}

const RegistrationSchema = new mongoose.Schema<RegistrationRecord>(
  {
    passId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    attendee: {
      fullName: {
        type: String,
        required: true,
        trim: true,
        maxlength: 120,
      },
      phoneNumber: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32,
      },
      email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        maxlength: 254,
      },
      emailNormalized: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        maxlength: 254,
      },
      fellowshipGroup: {
        type: String,
        required: true,
        trim: true,
        maxlength: 120,
      },
      ageGroup: {
        type: String,
        enum: AGE_GROUPS,
        required: true,
      },
    },
    emergencyContact: {
      name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 120,
      },
      phone: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32,
      },
    },
    requests: {
      dietaryAccessibility: {
        type: String,
        trim: true,
        maxlength: 1000,
      },
    },
    registrationSource: {
      type: String,
      enum: REGISTRATION_SOURCES,
      required: true,
    },
    registrationStatus: {
      type: String,
      enum: REGISTRATION_STATUS,
      default: "active",
      required: true,
    },
    payment: {
      method: {
        type: String,
        enum: PAYMENT_METHODS,
        default: null,
      },
      status: {
        type: String,
        enum: PAYMENT_STATUSES,
        default: "due",
        required: true,
      },
      currency: {
        type: String,
        enum: ["NGN"],
        default: "NGN",
        required: true,
      },
      amountDueKobo: {
        type: Number,
        min: 0,
      },
      amountPaidKobo: {
        type: Number,
        min: 0,
        default: 0,
        required: true,
      },
      provider: {
        type: String,
        enum: ["opay", "paystack"],
        default: null,
      },
      providerReference: {
        type: String,
        trim: true,
        default: null,
      },
      paidAt: { type: Date, default: null },
    },
    createdByAdminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdminUser",
      default: null,
    },
  },
  { timestamps: true },
);

RegistrationSchema.index({ "attendee.emailNormalized": 1 });
RegistrationSchema.index({ registrationSource: 1, registrationStatus: 1 });
RegistrationSchema.index({ "payment.status": 1 });

// hot-reload guard for registration 
// If mongoose.models.Registration exists, reuse it.
// Otherwise (?? handles null/undefined), create it.
const Registration =
  (mongoose.models.Registration as Model<RegistrationRecord> | undefined) ??
  mongoose.model<RegistrationRecord>("Registration", RegistrationSchema);

export default Registration;