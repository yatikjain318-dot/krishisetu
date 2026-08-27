import { db } from "@/lib/db";
import crypto from "crypto";

export interface CreateOrderParams {
  userId: string;
  packSlug: string;
}

export interface VerifyPaymentParams {
  userId: string;
  packSlug: string;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

export async function createYearlyPackOrder({ userId, packSlug }: CreateOrderParams) {
  const pack = await db.farmerPack.findUnique({
    where: { slug: packSlug },
  });

  if (!pack || !pack.isActive) {
    throw new Error("Invalid or inactive Farmer Pack selected.");
  }

  const amountInPaise = pack.price * 100;
  const orderId = `order_ks_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  const payment = await db.payment.create({
    data: {
      userId,
      packId: pack.id,
      amount: pack.price,
      currency: "INR",
      razorpayOrderId: orderId,
      status: "PENDING",
      paymentMethod: "UPI / QR / NetBanking (1-Time Annual)",
    },
  });

  return {
    orderId,
    amount: pack.price,
    amountInPaise,
    currency: "INR",
    packName: pack.name,
    packNameHi: pack.nameHi,
    validityDays: pack.validityDays, // 365
    paymentId: payment.id,
    keyId: process.env.RAZORPAY_KEY_ID || "rzp_test_krishisetu_demo",
  };
}

export async function verifyAndActivateYearlyPack({
  userId,
  packSlug,
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
}: VerifyPaymentParams) {
  const pack = await db.farmerPack.findUnique({
    where: { slug: packSlug },
  });

  if (!pack) {
    throw new Error("Farmer Pack not found.");
  }

  const razorpaySecret = process.env.RAZORPAY_KEY_SECRET;

  if (razorpaySecret && razorpaySignature) {
    const generatedSignature = crypto
      .createHmac("sha256", razorpaySecret)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest("hex");

    if (generatedSignature !== razorpaySignature) {
      throw new Error("Payment signature verification failed. Unauthorized transaction.");
    }
  }

  await db.payment.updateMany({
    where: { razorpayOrderId },
    data: {
      razorpayPaymentId,
      razorpaySignature,
      status: "SUCCESS",
    },
  });

  const startDate = new Date();
  const expiryDate = new Date(startDate.getTime() + pack.validityDays * 24 * 60 * 60 * 1000);

  await db.userPackAccess.updateMany({
    where: {
      userId,
      status: "ACTIVE",
    },
    data: {
      status: "EXPIRED",
    },
  });

  const newAccess = await db.userPackAccess.create({
    data: {
      userId,
      packId: pack.id,
      status: "ACTIVE",
      amountPaid: pack.price,
      startDate,
      expiryDate,
      paymentId: razorpayPaymentId || razorpayOrderId,
    },
    include: {
      pack: true,
      user: true,
    },
  });

  return {
    success: true,
    message: "1-Year Farmer Pack successfully activated!",
    access: {
      id: newAccess.id,
      packName: newAccess.pack.name,
      packNameHi: newAccess.pack.nameHi,
      amountPaid: newAccess.amountPaid,
      startDate: newAccess.startDate.toISOString(),
      expiryDate: newAccess.expiryDate.toISOString(),
      daysRemaining: 365,
      status: "ACTIVE",
    },
  };
}

export async function getUserCurrentPack(userId: string) {
  const activeAccess = await db.userPackAccess.findFirst({
    where: {
      userId,
      status: "ACTIVE",
    },
    include: {
      pack: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!activeAccess) {
    return null;
  }

  const now = new Date();
  const isStillValid = new Date(activeAccess.expiryDate) > now;

  if (!isStillValid) {
    await db.userPackAccess.update({
      where: { id: activeAccess.id },
      data: { status: "EXPIRED" },
    });
    return null;
  }

  const msRemaining = new Date(activeAccess.expiryDate).getTime() - now.getTime();
  const daysRemaining = Math.max(0, Math.ceil(msRemaining / (1000 * 60 * 60 * 24)));

  return {
    ...activeAccess,
    daysRemaining,
  };
}
