import { NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(req: Request) {
    try {
        const { to } = await req.json(); // Extract 'to' from the request body

        if (!to) {
            return NextResponse.json({ error: "Missing 'to' field" }, { status: 400 });
        }

        const accountSid = process.env.TWILIO_SID;
        const authToken = process.env.TWILIO_AUTH;
        const from = "+12184233286";
        const url = "https://handler.twilio.com/twiml/EH5e01c35f8c758e3ab9c6fbabb80fe2ff";

        if (!accountSid || !authToken) {
            return NextResponse.json({ error: "Twilio credentials are missing" }, { status: 500 });
        }

        const client = twilio(accountSid, authToken);

        const call = await client.calls.create({
            to,
            from,
            url,
        });

        return NextResponse.json({ success: true, callSid: call.sid });
    } catch ({ error }: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
