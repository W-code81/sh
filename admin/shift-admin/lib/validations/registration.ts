import { z } from "zod";
import { AGE_GROUPS } from "@/lib/models/registration";

const cleanText = (min: number, max: number, label: string) =>
  z.string().trim().min(min, `${label} is required`).max(max, `${label} is too long`);

/** Validates the public form field names, then maps them to the persisted document shape. */
export const registrationInputSchema = z
  .object({
    fullName: cleanText(2, 120, "Full name"),
    phoneNumber: cleanText(7, 32, "Phone number"),
    emailAddress: z.email().trim().toLowerCase().max(254),
    fellowshipGroup: cleanText(2, 120, "Church or fellowship group"),
    ageGroup: z.enum(AGE_GROUPS),
    emergencyName: cleanText(2, 120, "Emergency contact name"),
    emergencyPhone: cleanText(7, 32, "Emergency contact phone"),
    medicalDietary: z.string().trim().max(1000, "Requests are too long").optional().default(""),
  })
  .strict()
  .transform((input) => {
    const email = input.emailAddress;

    return {
      attendee: {
        fullName: input.fullName,
        phoneNumber: input.phoneNumber,
        email,
        emailNormalized: email,
        fellowshipGroup: input.fellowshipGroup,
        ageGroup: input.ageGroup,
      },
      emergencyContact: {
        name: input.emergencyName,
        phone: input.emergencyPhone,
      },
      requests: input.medicalDietary ? { dietaryAccessibility: input.medicalDietary } : {},
    };
  });

export type RegistrationInput = z.output<typeof registrationInputSchema>;
