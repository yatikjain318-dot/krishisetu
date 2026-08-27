import { NextRequest, NextResponse } from "next/server";
import { createYearlyPackOrder } from "@/lib/payments/razorpay";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId = "user_farmer_demo", packSlug } = body;

    if (!packSlug) {
      return NextResponse.json({ error: "packSlug is required" }, { status: 400 });
    }

    const order = await createYearlyPackOrder({ userId, packSlug });

    return NextResponse.json(order);
  } catch (error: any) {
    console.error("Order creation failed:", error);
    return NextResponse.json(
      { error: error.message || "Failed to initiate yearly order" },
      { status: 500 }
    );
  }
}
