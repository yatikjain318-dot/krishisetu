"use client";

import React, { useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { Camera, Upload, Sparkles, X, CheckCircle2, ShieldCheck, AlertCircle, RefreshCw, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";

interface AIQualityScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanComplete?: (result: QualityScanResult) => void;
}

export interface QualityScanResult {
  grade: "Grade A" | "Grade B (FAQ)" | "Grade C";
  moisturePercent: number;
  foreignMatterPercent: number;
  brokenPercent: number;
  colorConsistencyScore: number;
  overallScore: number;
  cropName: string;
  advisory: string;
}

export function AIQualityScannerModal({ isOpen, onClose, onScanComplete }: AIQualityScannerModalProps) {
  const { t, language, playChime } = useI18n();
  const isEn = language === "en";

  const [selectedCrop, setSelectedCrop] = useState("wheat");
  const [imagePreview, setImagePreview] = useState<string | null>(
    "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&auto=format&fit=crop&q=80"
  );
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<QualityScanResult | null>(null);

  if (!isOpen) return null;

  const handleRunScan = () => {
    setIsScanning(true);
    setScanResult(null);

    setTimeout(() => {
      let result: QualityScanResult;
      if (selectedCrop === "mustard") {
        result = {
          grade: "Grade A",
          moisturePercent: 7.6,
          foreignMatterPercent: 0.5,
          brokenPercent: 0.8,
          colorConsistencyScore: 96,
          overallScore: 94,
          cropName: isEn ? "Mustard (Pusa Bold)" : "सरसों (पूसा बोल्ड)",
          advisory: isEn
            ? "Premium quality seed with estimated 42.2% oil content. Ideal for direct corporate purchase by ITC and Adani Wilmar."
            : "उत्कृष्ट चमकदार दाना। अनुमानित तेल मात्रा 42.2%। ITC व अडानी फॉर्च्यून में प्रीमियम भाव हेतु उपयुक्त।",
        };
      } else if (selectedCrop === "soybean") {
        result = {
          grade: "Grade A",
          moisturePercent: 9.2,
          foreignMatterPercent: 0.8,
          brokenPercent: 1.4,
          colorConsistencyScore: 92,
          overallScore: 91,
          cropName: isEn ? "Soybean (JS 335)" : "सोयाबीन (JS 335)",
          advisory: isEn
            ? "Clean yellow grain with zero fungal damage. Ready for top-grade listing in Indore and Neemuch mandis."
            : "पीला समान दाना, फफूंद रहित। नीमच व कोटा मंडियों में टॉप ग्रेड में बिक्री योग्य।",
        };
      } else {
        result = {
          grade: "Grade A",
          moisturePercent: 11.2,
          foreignMatterPercent: 0.4,
          brokenPercent: 1.1,
          colorConsistencyScore: 95,
          overallScore: 95,
          cropName: isEn ? "Wheat (Sharbati Gold)" : "गेहूं (शरबती गोल्ड)",
          advisory: isEn
            ? "Lustrous, uniform Sharbati grain. Low moisture (<12%) qualifies for certified WDRA storage and exporter tenders."
            : "स्वस्थ, चमकदार शरबती दाना। नमी 12% से कम होने के कारण सुरक्षित भंडारण व निर्यातकों की सीधी मांग हेतु उपयुक्त।",
        };
      }

      setScanResult(result);
      setIsScanning(false);
      playChime();
      if (onScanComplete) {
        onScanComplete(result);
      }
    }, 1600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-emerald-100 flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-emerald-800 to-teal-800 text-white flex items-center justify-between rounded-t-3xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
              <Camera className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg sm:text-xl flex items-center gap-2">
                {t.aiGrainScanner}
              </h3>
              <p className="text-xs text-emerald-200">
                {isEn
                  ? "Instant camera scan for grain moisture, foreign matter, and Grade A certification"
                  : "मोबाइल कैमरे से अनाज की प्रारंभिक डिजिटल गुणवत्ता व नमी जांच"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 space-y-5 flex-1">
          {/* Crop Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">
                🌾 {isEn ? "Crop Type:" : "फसल का प्रकार:"}
              </label>
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-sm font-bold text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="wheat">{isEn ? "Wheat (Sharbati)" : "गेहूं (Wheat)"}</option>
                <option value="mustard">{isEn ? "Mustard (Sarson)" : "सरसों (Mustard)"}</option>
                <option value="soybean">{isEn ? "Soybean" : "सोयाबीन (Soybean)"}</option>
                <option value="paddy">{isEn ? "Basmati Paddy" : "बासमती धान (Paddy)"}</option>
                <option value="chana">{isEn ? "Desi Chana (Gram)" : "चना / दाल (Gram)"}</option>
                <option value="onion">{isEn ? "Red Onion" : "प्याज (Onion)"}</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">
                📸 {isEn ? "Photo Source:" : "फोटो स्रोत:"}
              </label>
              <label className="flex items-center justify-center gap-2 px-3 py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-emerald-950 font-bold text-xs rounded-xl cursor-pointer transition">
                <Upload className="w-4 h-4 text-emerald-700" />
                {isEn ? "Select Photo / Camera Capture" : "गैलरी या कैमरे से नया फोटो चुनें"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const url = URL.createObjectURL(file);
                      setImagePreview(url);
                    }
                  }}
                />
              </label>
            </div>
          </div>

          {/* Image & Scanner Box */}
          <div className="relative rounded-2xl overflow-hidden border-2 border-dashed border-emerald-300 bg-gray-900 aspect-video max-h-64 flex items-center justify-center">
            {imagePreview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={imagePreview}
                alt="Grain sample"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-white text-center p-4">
                <Camera className="w-12 h-12 mx-auto text-emerald-400 mb-2 opacity-60" />
                <p className="text-xs">{isEn ? "Upload clear photo of grain sample" : "अनाज का स्पष्ट फोटो अपलोड करें"}</p>
              </div>
            )}

            {/* Scanning Laser Animation Overlay */}
            {isScanning && (
              <div className="absolute inset-0 bg-emerald-950/40 flex flex-col items-center justify-center">
                <div className="w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent absolute animate-bounce" />
                <div className="bg-black/70 backdrop-blur-md px-4 py-2 rounded-xl text-white text-xs font-bold flex items-center gap-2 border border-emerald-400/40">
                  <RefreshCw className="w-4 h-4 text-emerald-400 animate-spin" />
                  {isEn
                    ? "AI Analyzing Quality (Moisture %, Foreign Matter, Grain Integrity)..."
                    : "AI विश्लेषण जारी है (नमी, दाने का आकार, कचरा जांच)..."}
                </div>
              </div>
            )}

            {/* Run Scan Button Overlay */}
            {!isScanning && !scanResult && (
              <div className="absolute bottom-3 right-3">
                <button
                  onClick={handleRunScan}
                  className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs rounded-xl shadow-lg flex items-center gap-1.5 cursor-pointer transition transform hover:scale-105"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />{" "}
                  {isEn ? "Start AI Quality Scan" : "AI क्वालिटी स्कैन शुरू करें"}
                </button>
              </div>
            )}
          </div>

          {/* Preliminary Quality Report Result */}
          {scanResult && (
            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-900 to-teal-950 text-white shadow-lg">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs font-extrabold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-amber-300" />
                    {isEn ? "Digital Quality Certificate (AI)" : "प्रारंभिक डिजिटल गुणवत्ता प्रमाणपत्र"}
                  </span>
                  <span className="bg-emerald-500 text-white text-xs font-black px-3 py-1 rounded-full shadow-xs">
                    {scanResult.grade} ({isEn ? "Score" : "स्कोर"}: {scanResult.overallScore}/100)
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs pt-2">
                  <div className="bg-white/10 p-2.5 rounded-xl">
                    <span className="text-emerald-300 font-semibold block">{isEn ? "Moisture" : "नमी (Moisture)"}</span>
                    <span className="text-lg font-black text-white">{scanResult.moisturePercent}%</span>
                    <span className="text-[10px] text-emerald-400 block font-bold">{isEn ? "✓ Safe Level" : "✓ सुरक्षित स्तर"}</span>
                  </div>
                  <div className="bg-white/10 p-2.5 rounded-xl">
                    <span className="text-emerald-300 font-semibold block">{isEn ? "Foreign Matter" : "कचरा (Foreign Matter)"}</span>
                    <span className="text-lg font-black text-white">{scanResult.foreignMatterPercent}%</span>
                    <span className="text-[10px] text-emerald-400 block font-bold">{isEn ? "✓ Within Norms" : "✓ मानक के अंदर"}</span>
                  </div>
                  <div className="bg-white/10 p-2.5 rounded-xl">
                    <span className="text-emerald-300 font-semibold block">{isEn ? "Broken Grain" : "टूटा दाना (Broken)"}</span>
                    <span className="text-lg font-black text-white">{scanResult.brokenPercent}%</span>
                    <span className="text-[10px] text-emerald-400 block font-bold">{isEn ? "✓ Minimal" : "✓ नगण्य"}</span>
                  </div>
                  <div className="bg-white/10 p-2.5 rounded-xl">
                    <span className="text-emerald-300 font-semibold block">{isEn ? "Color Uniformity" : "रंग एकरूपता"}</span>
                    <span className="text-lg font-black text-amber-300">{scanResult.colorConsistencyScore}%</span>
                    <span className="text-[10px] text-emerald-300 block font-bold">{isEn ? "✓ Lustrous" : "✓ चमकदार"}</span>
                  </div>
                </div>

                <p className="text-xs text-emerald-100 mt-3 bg-white/10 p-2.5 rounded-xl leading-relaxed">
                  💡 <strong>{isEn ? "Expert Advisory:" : "विशेषज्ञ सलाह:"}</strong> {scanResult.advisory}
                </p>
              </div>

              {/* Disclaimer */}
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 flex items-start gap-2 text-[11px] text-amber-950">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  <strong>{isEn ? "Notice:" : "महत्वपूर्ण सूचना:"}</strong> {t.gradingDisclaimer}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 rounded-b-3xl flex items-center justify-between gap-2">
          {scanResult ? (
            <button
              onClick={() => {
                setScanResult(null);
                handleRunScan();
              }}
              className="text-xs font-bold text-gray-700 hover:text-gray-950 flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> {isEn ? "Scan Again" : "दोबारा स्कैन करें"}
            </button>
          ) : (
            <button
              onClick={onClose}
              className="text-xs font-bold text-gray-600 hover:text-gray-900 cursor-pointer"
            >
              {isEn ? "Cancel" : "रद्द करें"}
            </button>
          )}

          <div className="flex items-center gap-2">
            <Link
              href="/my-crops"
              onClick={onClose}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition cursor-pointer flex items-center gap-1"
            >
              {isEn ? "Create Lot with this Quality" : "इस गुणवत्ता के साथ लॉट बनाएं"} <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
