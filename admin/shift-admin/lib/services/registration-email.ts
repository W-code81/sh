import { Resend } from "resend";
import type { RegistrationRecord } from "@/lib/models/registration";


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

/** Send the attendee their pass ID after the registration has been saved. */
export async function sendRegistrationConfirmationEmail(
  registration: Pick<RegistrationRecord, "passId" | "attendee" | "payment">,
) {
  
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;

  if (!apiKey || !from) {
    throw new Error("RESEND_API_KEY and RESEND_FROM_EMAIL must be configured");
  }

  const resend = new Resend(apiKey);
  const name = registration.attendee.fullName;
  const passId = registration.passId;
  const paymentNote =
    registration.payment.method === "pay_on_arrival"
      ? "Payment is due when you arrive at camp."
      : "Your payment details will be shared by the camp team.";
  const text = [
    `Hello ${name},`,
    "",
    "Thanks for registering for SHIFT Camp. We’re looking forward to having you with us from 15–18 December 2026.",
    "",
    `Your Official Pass ID: ${passId}`,
    paymentNote,
    "",
    "Keep this email safe. You’ll need your pass ID and registration email to check your details later.",
    "",
    "The SHIFT Camp team",
  ].join("\n");

  const { error } = await resend.emails.send({
    from,
    to: [registration.attendee.email],
    subject: `Your SHIFT Camp pass: ${passId}`,
    text,
    html: `
      <div style="margin:0;background:#f7f5f0;padding:32px 16px;color:#22231f;font-family:Arial,sans-serif">
        <div style="margin:0 auto;max-width:560px;border:1px solid #e5e1d8;border-radius:16px;background:#ffffff;padding:32px">
          <p style="margin:0;color:#53624b;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase">SHIFT Camp · 15–18 December 2026</p>
          <h1 style="margin:16px 0 12px;font-size:26px;line-height:1.2">You’re registered, ${escapeHtml(name)}!</h1>
          <p style="margin:0;color:#55584f;font-size:16px;line-height:1.6">Thanks for signing up. We’re looking forward to welcoming you to camp.</p>
          <div style="margin:24px 0;padding:20px;border:1px solid #ded9ce;border-radius:12px;background:#f7f5f0">
            <p style="margin:0;color:#65675f;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase">Official Pass ID</p>
            <p style="margin:8px 0 0;color:#22231f;font-family:monospace;font-size:24px;font-weight:700;letter-spacing:1px">${escapeHtml(passId)}</p>
          </div>
          <p style="margin:0;color:#55584f;font-size:14px;line-height:1.6">${escapeHtml(paymentNote)}</p>
          <p style="margin:16px 0 0;color:#55584f;font-size:14px;line-height:1.6">Keep this email safe. You’ll need your pass ID and registration email to check your details later.</p>
          <p style="margin:24px 0 0;color:#22231f;font-size:14px;font-weight:700">The SHIFT Camp team</p>
        </div>
      </div>
    `,
  });

  if (error) {
    throw new Error(`Resend failed: ${error.message}`);
  }
}
