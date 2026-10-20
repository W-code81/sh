import connectDb from "@/lib/db/mongoose";
import Registration, { AGE_GROUPS } from "@/lib/models/registration";
import { z } from "zod"
import { NextResponse } from "next/server";
import { createPassId  as generatePassId} from "@/lib/services/pass-id";

export async function GET() {
  await connectDb();
  const registrations = await Registration.find({ registrationStatus: "active" });
  return Response.json(registrations);
}

// Zod validation schema
const registrationSchema = z.object({
    attendee: z.object({
        fullName: z.string().trim().min(1).max(120),
        phoneNumber: z.string().trim().min(1).max(32),
        email: z.string().trim().email().max(254),
        fellowshipGroup: z.string().trim().min(1).max(120),
        ageGroup: z.enum(AGE_GROUPS),
    }),
    emergencyContact: z.object({
        name: z.string().trim().min(1).max(120),
        phone: z.string().trim().min(1).max(32),
    }),
    requests: z.object({ dietaryAccessibility: z.string().trim().max(1000).optional() }).optional(),
});


export async function POST(request: Request) {
 
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" },{ status: 400 });
  }

  // Validate
  const parsed = registrationSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validation failed",
        details: parsed.error.issues.map((i) => ({
          field: i.path.join("."),
          message: i.message,
        })),
      },
      { status: 400 },
    );
  }

  const data = parsed.data;

  try {
    // Connect to the database
    await connectDb();

    // Optional: block duplicate active registrations for the same email.
    const emailNormalized = data.attendee.email.toLowerCase();
    
    //  Create the document
    const registration = await Registration.create({
      passId: generatePassId(),
      attendee: { ...data.attendee, emailNormalized},
      emergencyContact: data.emergencyContact,
      requests: data.requests ?? {},
      registrationSource: "website"
    });

    // Respond with 201 Created
    return NextResponse.json(
      { message: "Registration created", registration },
      { status: 201 },
    );
  } catch (error: unknown) {
    // Mongo duplicate key error (e.g. passId collision)
    if (typeof error === "object" && error !== null && "code" in error && error.code === 11000) {
      return NextResponse.json({ error: "Duplicate record, try again" }, { status: 409 });
    }
    console.error("POST /api/registration failed:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

