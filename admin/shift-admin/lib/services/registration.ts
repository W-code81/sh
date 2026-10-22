import { Types } from "mongoose";
import connectDb from "@/lib/db/mongoose";
import Registration, {
  type RegistrationRecord,
  type RegistrationSource,
} from "@/lib/models/registration";
import { createPassId } from "@/lib/services/pass-id";
import { registrationInputSchema } from "@/lib/validations/registration";

type CreateRegistrationOptions = {
  source: RegistrationSource;
  createdByAdminId?: Types.ObjectId | string | null;
};

/** Validate the form payload and create a website or on-arrival registration. */
export async function createRegistration( input: unknown,{ source, createdByAdminId = null }: CreateRegistrationOptions,) {

  // validating data with zod
  const parsed = registrationInputSchema.parse(input);

  // source validation
  if (source === "on_arrival" && !createdByAdminId) {
    throw new Error("An admin ID is required for on-arrival registrations");
  }

  if (source === "website" && createdByAdminId) {
    throw new Error("Website registrations cannot be assigned to an admin creator");
  }

  // connectdb
  await connectDb();

  // added attempt limit for registration to avoid spamming 
  for (let attempt = 0; attempt < 5; attempt += 1) {
    try {
      return await Registration.create({
        ...parsed,
        passId: createPassId(),
        registrationSource: source,
        registrationStatus: "active",
        payment: {
          ...parsed.payment,
          status: "due",
          currency: "NGN",
          amountPaidKobo: 0,
        },
        createdByAdminId:
          typeof createdByAdminId === "string"
            ? new Types.ObjectId(createdByAdminId)
            : createdByAdminId,
      } satisfies Partial<RegistrationRecord>);
      
    } catch (error) {
      const isPassIdCollision =
        typeof error === "object" &&
        error !== null &&
        "code" in error &&
        error.code === 11000 &&
        "keyPattern" in error &&
        typeof error.keyPattern === "object" &&
        error.keyPattern !== null &&
        "passId" in error.keyPattern;

      if (!isPassIdCollision || attempt === 4) throw error;
    }
  }

  throw new Error("Could not generate a unique pass ID");
}
