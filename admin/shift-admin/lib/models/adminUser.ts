import mongoose, { type Model } from "mongoose";

export interface AdminUserRecord {
  authProviderUserId: string;
  email: string;
  role: "owner" | "admin";
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const AdminUserSchema = new mongoose.Schema<AdminUserRecord>(
  {
    authProviderUserId: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    role: { type: String, enum: ["owner", "admin"], required: true, default: "admin" },
    active: { type: Boolean, required: true, default: true },
  },
  { timestamps: true },
);

const AdminUser = (mongoose.models.AdminUser as Model<AdminUserRecord> | undefined)
  ?? mongoose.model<AdminUserRecord>("AdminUser", AdminUserSchema);

export default AdminUser;
