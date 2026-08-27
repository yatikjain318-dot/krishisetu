import { NextRequest, NextResponse } from "next/server";
import { verifyAndActivateYearlyPack } from "@/lib/payments/razorpay";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      userId = "user_farmer_demo",
      packSlug,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    } = body;

    if (!packSlug || !razorpayOrderId || !razorpayPaymentId) {
      return NextResponse.json(
        { error: "Missing required payment verification fields" },
        { status: 400 }
      );
    }

    const activation = await verifyAndActivateYearlyPack({
      userId,
      packSlug,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    });

    return NextResponse.json(activation);
  } catch (error: any) {
    console.error("Payment verification failed:", error);
    return NextResponse.json(
      { error: error.message || "Payment verification failed" },
      { status: 400 }
    );
  }
}
