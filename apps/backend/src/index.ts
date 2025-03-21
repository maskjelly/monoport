import { ToolCall, RequestBodyMessage, finalData } from "@repo/shared/lib/types"
import { Hono } from "hono";
import { cors } from "hono/cors";
import { getPrismaClient } from "@repo/shared/prisma";

const app = new Hono();
interface Env {
    PRISMA_ACCELERATE_BASE_URL: string;
    PRISMA_ACCELERATE_API_KEY: string;
  }
app.use(cors());

const extractToolCallData = (obj: unknown): ToolCall | null => {
    if (!obj || typeof obj !== "object") return null;

    const message = obj as RequestBodyMessage;

    if (message.toolCalls?.length) return message.toolCalls[0];
    if (message.toolCallList?.toolCalls?.length) return message.toolCallList.toolCalls[0];

    if (message.artifact?.messages) {
        for (const artifactMessage of message.artifact.messages) {
            if (artifactMessage.toolCalls?.length) {
                return artifactMessage.toolCalls[0];
            }
        }
    }

    for (const key of Object.keys(obj)) {
        const result = extractToolCallData((obj as any)[key]);
        if (result) return result;
    }

    return null;
};

app.post("/functions", async (c) => {
    const body = await c.req.json<{ success: boolean; message?: RequestBodyMessage }>();

    if (body.success) {
        console.log("Received data");
    }

    const toolCallData = extractToolCallData(body.message);
    let args: finalData = {} as finalData;

    if (typeof toolCallData?.function?.arguments === "string") {
        try {
            args = JSON.parse(toolCallData.function.arguments) as finalData;
        } catch (error) {
            console.error("Error parsing arguments string:", error);
            args = {} as finalData;
        }
    } else if (typeof toolCallData?.function?.arguments === "object") {
        args = toolCallData.function.arguments as finalData;
    }

    const name = args.Name || body.message?.customer?.name || "No name provided";
    const phoneNumber = args.Phone_Number || body.message?.phoneNumber || "No phone number provided";
    const prisma = getPrismaClient(c.env);
    try { 
        const user = await prisma.clientBookings.create ({
            data : {
                name : name || "Error Catching name ",
                phoneNumber : phoneNumber || "Error catching phone numnber",
            }
        })
        console.log(name);
        console.log(phoneNumber);
    }catch(error){
        console.error(error)
        console.log("WHAT THE FUCK  , will try again later ")
    }


    console.log(`Extracted Name: ${name}, Phone Number: ${phoneNumber}`);

    return c.json({
        message: `Received ${name} and ${phoneNumber}`,
        success: true,
    });
});

app.get("/functions", (c) => {
    return c.text("This route is for testing []");
});

export default app;
