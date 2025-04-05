import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/prisma";

// Helper function to add CORS headers
function corsHeaders(response: NextResponse) {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization",
  );
  return response;
}

///////////////////////////////////////////////////////////////|
// Handle preflight OPTIONS requests                         //|
export async function OPTIONS() {
  //|
  const response = NextResponse.json({}, { status: 200 }); //|
  return corsHeaders(response); //|
} //|
///////////////////////////////////////////////////////////////|

////////////////////////////////////////////////////////////////////////////////////////////////////

// Test for retell


export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    console.log(body)
  }
  catch (e) {
    console.log("SHIT FAILES ", e)
  }
}


// export async function POST(req: NextRequest) {

//   try {
//     console.log("Received request to /api/functions for inbound call");

//     const body = await req.json();
//     console.log("Request Body:", body); // Log the entire body for inspection

//     // Check for the 'event' and 'call_inbound' properties
//     if (body?.event !== "call_inbound" || !body?.call_inbound) {
//       const response = NextResponse.json(
//         { error: "Invalid request format: Expected 'event' and 'call_inbound' properties" },
//         { status: 400 },
//       );
//       return corsHeaders(response);
//     }

//     // Extract data from the 'call_inbound' object
//     const { agent_id, from_number, to_number } = body.call_inbound;

//     // Log the extracted information
//     console.log("Agent ID:", agent_id);
//     console.log("From Number:", from_number);
//     console.log("To Number:", to_number);

//     //  basic validation
//     if (!from_number) {
//         const response = NextResponse.json({ error: "From number is required." }, { status: 400 });
//         return corsHeaders(response);
//     }
//     if (!to_number) {
//         const response = NextResponse.json({ error: "To number is required." }, { status: 400 });
//         return corsHeaders(response);
//     }

//     try {
//       //  Save call data
//       await prisma.customer.create({
//         data: {
//           agentId: agent_id,
//           fromNumber: from_number,
//           toNumber: to_number,
//         },
//       });

//       // Return a success response
//       const response = NextResponse.json(
//         { message: "Inbound call data saved successfully" },
//         { status: 200 },
//       );
//       return corsHeaders(response);
//     } catch (dbError: any) {
//       console.error("Database error:", dbError);
//       const response = NextResponse.json(
//         { error: "Error saving data to database: " + dbError.message }, // Include the error message
//         { status: 500 },
//       );
//       return corsHeaders(response);
//     }
//   } catch (error: any) {
//     console.error("Error processing request:", error);
//     const response = NextResponse.json(
//       { error: "Failed to process request: " + error.message }, // Include the error message
//       { status: 500 },
//     );
//     return corsHeaders(response);
//   }
// }

export function GET() {
  const response = NextResponse.json({ message: "you a bithc" });
  return corsHeaders(response);
}
