import { NextResponse } from "next/server";
import { z } from "zod";
import { verifyLookUp } from "@/lib/services/attendee-lookup";

// zod schema
const verifyCodeSchema = z.object({
        challengeId: z.uuid(),
        code: z.string().trim().regex(/^[0-9a-fA-F]{16}$/),
    })
    .strict();


export async function POST(request: Request) {
    let body: unknown;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json(
            { error: "Invalid JSON body." },
            { status: 400, headers: { "Cache-Control": "no-store" } },
        );
    }

    //   parsed data to zod 
    const parsed = verifyCodeSchema.safeParse(body);

    if (!parsed.success) {
        return NextResponse.json(
            { error: "Enter a valid challenge ID and verification code." },
            { status: 400, headers: { "Cache-Control": "no-store" } },
        );
    }

    try {
        const result = await verifyLookUp(parsed.data.challengeId, parsed.data.code);

        if (!result.ok) {
            return NextResponse.json(
                { error: result.message },
                { status: 400, headers: { "Cache-Control": "no-store" } },
            );
        }

        return NextResponse.json(
            { attendee: result.attendee },
            { status: 200, headers: { "Cache-Control": "no-store" } },
        );

    } catch {
        console.error("Verify-code processing failed.");
        return NextResponse.json(
            { error: "Unable to verify the code right now." },
            { status: 500, headers: { "Cache-Control": "no-store" } },
        );
    }
}
