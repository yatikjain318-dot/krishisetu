import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { analyzeCropMedia } from "@/lib/ai/crop-doctor";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      userId = "user_farmer_demo",
      cropType,
      variety,
      sowingDate,
      location,
      problemDescription,
      mediaUrls = [],
      mediaType = "IMAGE",
      language = "hi",
    } = body;

    if (!cropType) {
      return NextResponse.json({ error: "Crop type is required" }, { status: 400 });
    }

    // Ensure user exists
    let user = await db.user.findFirst({
      where: { id: userId },
    });

    if (!user) {
      user = await db.user.create({
        data: {
          id: userId,
          name: "रामेश्वर जी (किसान)",
          phone: "9876543210",
          role: "FARMER",
          language,
        },
      });
    }

    // Map localized display name
    const cropNames: Record<string, string> = {
      wheat: "गेहूं (Wheat)",
      mustard: "सरसों (Mustard)",
      paddy: "धान (Paddy)",
      cotton: "कपास (Cotton)",
      millet: "बाजरा (Pearl Millet)",
      maize: "मक्का (Maize)",
      gram: "चना (Chickpea)",
      moong: "मूंग (Green Gram)",
      peanut: "मूंगफली (Groundnut)",
      vegetables: "सब्जियां (Vegetables)",
      fruits: "फल (Fruits)",
      other: "अन्य फसल (Other Crop)",
    };

    const cropTypeName = cropNames[cropType] || cropType;

    // Run AI Diagnosis Engine
    const analysis = await analyzeCropMedia({
      cropType,
      variety,
      sowingDate,
      location,
      problemDescription,
      mediaUrls,
      mediaType,
      language,
    });

    // Create DB records: Crop + Media + Diagnosis
    const crop = await db.crop.create({
      data: {
        userId: user.id,
        cropType,
        cropTypeName,
        variety: variety || undefined,
        sowingDate: sowingDate || undefined,
        location: location || undefined,
        problemDescription: problemDescription || undefined,
        media: {
          create: mediaUrls.map((url: string) => ({
            mediaType,
            fileUrl: url,
            fileName: `${cropType}_upload.jpg`,
          })),
        },
        diagnoses: {
          create: [
            {
              cropHealth: analysis.cropHealth,
              healthStatusText: analysis.healthStatusText,
              diseaseName: analysis.diseaseName,
              pestName: analysis.pestName,
              deficiency: analysis.deficiency,
              symptoms: analysis.symptoms,
              advisory: analysis.advisory,
              actionPlan: JSON.stringify(analysis.actionPlan),
              organicTreatment: analysis.organicTreatment,
              chemicalTreatment: analysis.chemicalTreatment,
              prevention: analysis.prevention,
              severityScore: analysis.severityScore,
              confidenceScore: analysis.confidenceScore,
              language,
              isAdvisory: true,
            },
          ],
        },
      },
      include: {
        diagnoses: true,
      },
    });

    const diagnosisRecord = crop.diagnoses[0];

    return NextResponse.json({
      success: true,
      cropId: crop.id,
      diagnosisId: diagnosisRecord.id,
      analysis,
    });
  } catch (error: any) {
    console.error("Crop analysis error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error during analysis" },
      { status: 500 }
    );
  }
}
