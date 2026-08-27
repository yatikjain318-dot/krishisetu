"use client";

import React from "react";
import { useI18n } from "@/lib/i18n/context";
import { DigitalLot } from "@/lib/data/mock-data";
import { QrCode, X, Download, Share2, Printer, ShieldCheck, CheckCircle2, Sprout } from "lucide-react";

interface QRLotModalProps {
  isOpen: boolean;
  onClose: () => void;
  lot: DigitalLot | null;
}

export function QRLotModal({ isOpen, onClose, lot }: QRLotModalProps) {
  const { t } = useI18n();

  if (!isOpen || !lot) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-emerald-100 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-emerald-800 to-teal-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
              <QrCode className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-base">डिजिटल लॉट पासपोर्ट (QR Passport)</h3>
              <p className="text-[11px] text-emerald-200">{lot.lotCode}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Card */}
        <div className="p-6 space-y-4 text-center">
          {/* Brand watermark */}
          <div className="flex items-center justify-center gap-1.5 text-emerald-950 font-black text-sm">
            <Sprout className="w-4 h-4 text-emerald-600" />
            KrishiSetu Verified Produce
          </div>

          {/* QR Box Visual */}
          <div className="p-4 bg-emerald-50 rounded-2xl border-2 border-dashed border-emerald-300 inline-block shadow-inner">
            {/* SVG Simulated QR Code */}
            <svg
              className="w-44 h-44 mx-auto text-emerald-900"
              viewBox="0 0 100 100"
              fill="currentColor"
            >
              {/* Corner markers */}
              <rect x="5" y="5" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="4" />
              <rect x="11" y="11" width="13" height="13" />
              <rect x="70" y="5" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="4" />
              <rect x="76" y="11" width="13" height="13" />
              <rect x="5" y="70" width="25" height="25" fill="none" stroke="currentColor" strokeWidth="4" />
              <rect x="11" y="76" width="13" height="13" />
              {/* Patterns */}
              <rect x="36" y="8" width="6" height="6" />
              <rect x="48" y="16" width="8" height="8" />
              <rect x="15" y="40" width="8" height="6" />
              <rect x="38" y="38" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="3" />
              <rect x="44" y="44" width="12" height="12" />
              <rect x="70" y="40" width="8" height="10" />
              <rect x="35" y="72" width="12" height="8" />
              <rect x="55" y="68" width="8" height="8" />
              <rect x="72" y="72" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="3" />
              <rect x="78" y="78" width="6" height="6" />
            </svg>
            <span className="text-[10px] font-mono font-bold text-emerald-900 mt-2 block tracking-widest">
              {lot.lotCode}
            </span>
          </div>

          {/* Details Table */}
          <div className="bg-gray-50 border border-gray-200 rounded-2xl p-3.5 text-left text-xs space-y-1.5">
            <div className="flex justify-between">
              <span className="text-gray-500">किसान का नाम:</span>
              <span className="font-bold text-gray-900">{lot.farmerName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">फसल व किस्म:</span>
              <span className="font-bold text-gray-900">{lot.cropName} ({lot.variety})</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">मात्रा:</span>
              <span className="font-bold text-emerald-800">{lot.quantityQtl} क्विंटल</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">गुणवत्ता ग्रेड / नमी:</span>
              <span className="font-bold text-gray-900">{lot.qualityGrade} • {lot.moisturePercent}% नमी</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">अपेक्षित भाव:</span>
              <span className="font-bold text-emerald-700">₹{lot.expectedPrice}/qtl</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">स्थान:</span>
              <span className="font-medium text-gray-800 truncate max-w-[200px]">{lot.farmerLocation}</span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between gap-2">
          <button
            onClick={handlePrint}
            className="px-3.5 py-2 bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" /> प्रिंट पर्ची
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: `KrishiSetu Lot ${lot.lotCode}`,
                    text: `${lot.farmerName} का ${lot.cropName} (${lot.quantityQtl} क्विंटल) कृषिसेतु पर बिक्री हेतु उपलब्ध।`,
                    url: window.location.href,
                  });
                } else {
                  alert("लिंक कॉपी हो गया!");
                }
              }}
              className="px-3.5 py-2 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" /> शेयर करें
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition cursor-pointer"
            >
              पूर्ण
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
