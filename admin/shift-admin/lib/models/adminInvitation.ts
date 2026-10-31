import mongoose, { type Model, type Types } from "mongoose";

export type AdminInvitationStatus = "pending" | "accepted" | "revoked" | "expired";

export interface AdminInvitationRecord {
  _id: Types.ObjectId;
  clerkInvitationId: string;
  email: string;
  role: "owner" | "admin";
  status: AdminInvitationStatus;
  invitedByAdminId: Types.ObjectId;
  expiresAt: Date;
  acceptedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}

const AdminInvitationSchema = new mongoose.Schema<AdminInvitationRecord>(
  {
    clerkInvitationId: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
    role: { type: String, enum: ["owner", "admin"], required: true, default: "admin" },
    status: {
      type: String,
      enum: ["pending", "accepted", "revoked", "expired"],
      required: true,
      default: "pending",
    },
    invitedByAdminId: { type: mongoose.Schema.Types.ObjectId, ref: "AdminUser", required: true },
    expiresAt: { type: Date, required: true },
    acceptedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

AdminInvitationSchema.index(
  { email: 1 },
  { unique: true, partialFilterExpression: { status: "pending" } },
);

const AdminInvitation = (mongoose.models.AdminInvitation as Model<AdminInvitationRecord> | undefined)
  ?? mongoose.model<AdminInvitationRecord>("AdminInvitation", AdminInvitationSchema);

export default AdminInvitation;
