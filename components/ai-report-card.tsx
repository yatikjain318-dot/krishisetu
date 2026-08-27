"use client";

import React from "react";
import { CheckCircle2, AlertTriangle, FileText } from "lucide-react";

export function AIReportCard({ diagnosis }: { diagnosis: any }) {
  if (!diagnosis) return null;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-md space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 pb-4">
        <div>
          <span className="text-xs text-gray-500 font-semibold block">डिजिटल फसल जांच रिपोर्ट</span>
          <h3 className="text-xl font-black text-gray-900">{diagnosis.crop?.cropTypeName || "फसल"}</h3>
        </div>
        <span className="bg-emerald-100 text-emerald-800 text-xs font-black px-3 py-1 rounded-full">
          सत्यापित रिपोर्ट ✓
        </span>
      </div>

      <div className="space-y-2 text-sm text-gray-700">
        <div>
          <span className="font-bold text-gray-900">पहचाना गया लक्षण: </span>
          {diagnosis.diseaseName || "स्वस्थ फसल"}
        </div>
        <div>
          <span className="font-bold text-gray-900">कृषि वैज्ञानिक सलाह: </span>
          {diagnosis.advisory || "उचित सिंचाई व संतुलित पोषण प्रबंधन जारी रखें।"}
        </div>
      </div>
    </div>
  );
}
