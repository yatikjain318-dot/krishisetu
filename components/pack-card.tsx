"use client";

import React from "react";
import { CheckCircle2, Award } from "lucide-react";

export function PackCard({ pack, onSelect }: { pack: any; onSelect?: () => void }) {
  if (!pack) return null;

  return (
    <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-black text-gray-900">{pack.nameHi || pack.name}</h3>
        <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
          वार्षिक
        </span>
      </div>
      <div className="text-2xl font-black text-emerald-700">₹{pack.price}</div>
      <p className="text-xs text-gray-500">{pack.descriptionHi || pack.description}</p>
      {onSelect && (
        <button
          onClick={onSelect}
          className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition"
        >
          पैक चुनें
        </button>
      )}
    </div>
  );
}
