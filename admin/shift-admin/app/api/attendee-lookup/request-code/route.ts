import { randomBytes, createHash } from "node:crypto";
import connectDb from "@/lib/db/mongoose";
import Registration, { RegistrationRecord } from "@/lib/models/registration";
import { NextResponse } from "next/server";
import { Resend } from "resend";


type Body = {
    email: string,
    passId: string
}

export async function POST(request: Request) {
    let body: Body
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM_EMAIL;

    try {
        body = await request.json();

    } catch {
        return NextResponse.json({ error: 'Invalid json body' }, { status: 400 })
    }

    try {
        const { email, passId } = body;

        connectDb();

        const attendee = await Registration.findOne<RegistrationRecord>({ "passId": passId, "attendee.email": email });

        if (!attendee) {
            return NextResponse.json({ message: 'If passId exists a code was sent to attendee\'s email' });
        }

        // short lived code
        const oneTimeCode = randomBytes(8).toString('hex');

        const hashedCode = createHash("sha256")
            .update(oneTimeCode)
            .digest("hex");

        // store in db here (new schema types should be made for it )
        // Registration.checkRegisToken = hashedCode
        // Registration.expireCheckRegisToken = Date.now() + 1000 * 60 * 15; // 15 mins
        // Registration.save();

        // resend 
        if (!apiKey || !from) {
            throw new Error("RESEND_API_KEY and RESEND_FROM_EMAIL must be configured");
        }

        const resend = new Resend(apiKey);
        const userName = attendee.fullName;
        const userEmail = attendee.email;
        const userPassId = attendee.passId;

        await resend.emails.send({
            from,
            to: [userEmail],
            subject: `Your SHIFT Camp verification code: ${oneTimeCode}`,
            html: `
<div style="margin:0;background:#f7f5f0;padding:32px 16px;color:#22231f;font-family:Arial,sans-serif">
<div style="margin:0 auto;max-width:560px;border:1px solid #e5e1d8;border-radius:16px;background:#ffffff;padding:32px">
  <p style="margin:0;color:#53624b;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase">SHIFT Camp · 15–18 December 2026</p>
  <h1 style="margin:16px 0 12px;font-size:26px;line-height:1.2">Verify your account, ${userName}</h1>
  <p style="margin:0;color:#55584f;font-size:16px;line-height:1.6">You requested a verification code to access your SHIFT Camp profile details. Use the code below to complete your login.</p>
  <div style="margin:24px 0;padding:20px;border:1px solid #ded9ce;border-radius:12px;background:#f7f5f0;text-align:center">
    <p style="margin:0;color:#65675f;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase">Verification Code</p>
    <p style="margin:8px 0 0;color:#22231f;font-family:monospace;font-size:32px;font-weight:700;letter-spacing:4px">${oneTimeCode}</p>
  </div>
  <p style="margin:16px 0 0;color:#8a211e;font-size:14px;line-height:1.6;font-weight:700">This code expires in 15 minutes.</p>
  <p style="margin:8px 0 0;color:#55584f;font-size:14px;line-height:1.6">If you did not make this request, please ignore this email securely. Your Pass ID for reference is ${userPassId}.</p>
  <p style="margin:24px 0 0;color:#22231f;font-size:14px;font-weight:700">The SHIFT Camp team</p>
</div>
</div>
`,
        });



    } catch (error) {
        console.error('request code error: ', error); 
    }
}