"use client";

import React from "react";
import { useI18n } from "@/lib/i18n/context";
import { UserCheck, ShieldAlert, PhoneCall } from "lucide-react";

export function DemoUserBar() {
  const { userRole, setUserRole, t } = useI18n();

  return (
    <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 text-white text-xs font-medium px-4 py-2 flex flex-wrap items-center justify-between gap-2 border-b border-emerald-800">
      <div className="flex items-center gap-2">
        <a
          href="tel:18001801551"
          className="flex items-center gap-1 bg-emerald-800/80 px-2 py-0.5 rounded-full text-emerald-200 font-semibold hover:text-white"
        >
          <PhoneCall className="w-3 h-3 text-emerald-400" />
          <span>हेल्पलाइन: 1800-180-1551 (टोल फ्री)</span>
        </a>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-emerald-300">भूमिका:</span>

        <div className="inline-flex rounded-lg bg-emerald-950/60 p-0.5 border border-emerald-700/50">
          <button
            onClick={() => setUserRole("FARMER")}
            className={`px-2.5 py-1 rounded-md transition text-xs font-semibold flex items-center gap-1 ${
              userRole === "FARMER"
                ? "bg-emerald-500 text-white shadow-xs"
                : "text-emerald-200 hover:text-white"
            }`}
          >
            <UserCheck className="w-3 h-3" />
            किसान
          </button>
          <button
            onClick={() => setUserRole("ADMIN")}
            className={`px-2.5 py-1 rounded-md transition text-xs font-semibold flex items-center gap-1 ${
              userRole === "ADMIN"
                ? "bg-amber-600 text-white shadow-xs"
                : "text-emerald-200 hover:text-white"
            }`}
          >
            <ShieldAlert className="w-3 h-3" />
            प्रशासक (Admin)
          </button>
        </div>
      </div>
    </div>
  );
}
