import { createHmac, randomBytes, randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import OtpChallenge from "@/lib/models/otpChallenges";
import { lookUp } from "@/lib/services/attendee-lookup";

// zod validation schema
const requestCodeSchema = z.object({
  email: z.string().trim().email().max(254),
  passId: z.string().trim().min(1).max(64),
});

const genericMessage = "If those details match an active registration, a code will be sent.";

// normalizes text on email
function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  // validate json body via zod schema
  const parsed = requestCodeSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Enter a valid email and pass ID." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !from) {
    console.error("Request-code email configuration is missing.");
    return NextResponse.json(
      { error: "Unable to send a verification code right now." },
      { status: 503 },
    );
  }

  try {
    const attendee = await lookUp(parsed.data.email, parsed.data.passId);
    const oneTimeCode = randomBytes(8).toString("hex").toUpperCase();
    const challengeId = randomUUID();
    const codeHash = createHmac("sha256", apiKey).update(oneTimeCode).digest("hex");

    if (attendee) {
      await OtpChallenge.create({
        challengeId,
        registrationId: attendee._id,
        codeHash,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000), //15mins
        attempts: 0,
        maxAttempts: 5,
        consumedAt: null,
      });

      const resend = new Resend(apiKey);
      const userName = escapeHtml(attendee.attendee.fullName);
      const userEmail = attendee.attendee.emailNormalized;
      const userPassId = escapeHtml(attendee.passId);
      const { error } = await resend.emails.send({
        from,
        to: [userEmail],
        subject: `Your SHIFT Camp verification code: ${oneTimeCode}`,
        html: `
<div style="margin:0;background:#f7f5f0;padding:32px 16px;color:#22231f;font-family:Arial,sans-serif">
  <div style="margin:0 auto;max-width:560px;border:1px solid #e5e1d8;border-radius:16px;background:#ffffff;padding:32px">
    <p style="margin:0;color:#53624b;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase">SHIFT Camp · 15–18 December 2026</p>
    <h1 style="margin:16px 0 12px;font-size:26px;line-height:1.2">Verify your registration, ${userName}</h1>
    <p style="margin:0;color:#55584f;font-size:16px;line-height:1.6">Use this code to access your SHIFT Camp registration.</p>
    <div style="margin:24px 0;padding:20px;border:1px solid #ded9ce;border-radius:12px;background:#f7f5f0;text-align:center">
      <p style="margin:0;color:#65675f;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase">Verification Code</p>
      <p style="margin:8px 0 0;color:#22231f;font-family:monospace;font-size:32px;font-weight:700;letter-spacing:4px">${oneTimeCode}</p>
    </div>
    <p style="margin:16px 0 0;color:#8a211e;font-size:14px;line-height:1.6;font-weight:700">This code expires in 15 minutes.</p>
    <p style="margin:8px 0 0;color:#55584f;font-size:14px;line-height:1.6">If you did not make this request, please ignore this email. Your Pass ID is ${userPassId}.</p>
    <p style="margin:24px 0 0;color:#22231f;font-size:14px;font-weight:700">The SHIFT Camp team</p>
  </div>
</div>`,
      });

      if (error) {
        console.error("Verification email could not be sent.");
        await OtpChallenge.updateOne(
          { challengeId },
          { $set: { consumedAt: new Date() } },
        ).catch(() => null);
      }
    }

    return NextResponse.json(
      { message: genericMessage, challengeId },
      { status: 202, headers: { "Cache-Control": "no-store" } },
    );

  } catch {
    console.error("Request-code processing failed.");
    return NextResponse.json(
      { error: "Unable to process the verification request right now." },
      { status: 500, headers: { "Cache-Control": "no-store" } },
    );
  }
}
