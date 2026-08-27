"use client";

import React from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function CropHistoryCompare({
  beforeImage,
  afterImage,
  cropName,
  improvementPercentage,
}: {
  beforeImage: string;
  afterImage: string;
  cropName: string;
  improvementPercentage: number;
}) {
  return (
    <div className="bg-white rounded-3xl p-6 border border-emerald-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-black text-gray-900 text-base">{cropName}</h3>
        <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
          +{improvementPercentage}% सुधार
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-2xl overflow-hidden aspect-video">
          <img src={beforeImage} alt="Before" className="w-full h-full object-cover" />
        </div>
        <div className="rounded-2xl overflow-hidden aspect-video">
          <img src={afterImage} alt="After" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
}
