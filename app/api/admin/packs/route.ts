import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const packs = await db.farmerPack.findMany({
      orderBy: { price: "asc" },
    });
    return NextResponse.json({ packs });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, price, name, nameHi, maxDiagnosesPerYear, videoUploadAllowed, expertAssistance } = body;

    if (!id || price === undefined) {
      return NextResponse.json({ error: "id and price are required" }, { status: 400 });
    }

    const updatedPack = await db.farmerPack.update({
      where: { id },
      data: {
        price: Number(price),
        name: name || undefined,
        nameHi: nameHi || undefined,
        maxDiagnosesPerYear: maxDiagnosesPerYear !== undefined ? Number(maxDiagnosesPerYear) : undefined,
        videoUploadAllowed: videoUploadAllowed !== undefined ? Boolean(videoUploadAllowed) : undefined,
        expertAssistance: expertAssistance !== undefined ? Boolean(expertAssistance) : undefined,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Farmer Pack updated successfully!",
      pack: updatedPack,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
