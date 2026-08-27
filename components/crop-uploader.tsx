"use client";

import React from "react";
import { Upload, Camera } from "lucide-react";

export function CropUploader({ onUploadComplete }: { onUploadComplete?: (res: any) => void }) {
  return (
    <div className="p-8 border-2 border-dashed border-emerald-300 rounded-3xl bg-emerald-50/40 text-center space-y-4">
      <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
        <Camera className="w-6 h-6" />
      </div>
      <div>
        <h3 className="font-black text-gray-900 text-base">फसल की फोटो अपलोड करें</h3>
        <p className="text-xs text-gray-500 mt-0.5">AI स्वचालित रूप से फसल का विश्लेषण करेगा</p>
      </div>
    </div>
  );
}
