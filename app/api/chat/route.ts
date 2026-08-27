import { NextRequest, NextResponse } from "next/server";
import { generateAgriAssistantResponse } from "@/lib/ai/assistant";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages = [], language = "hi" } = body;

    const reply = await generateAgriAssistantResponse(messages, language);

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("Chat assistant error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process chat message" },
      { status: 500 }
    );
  }
}
