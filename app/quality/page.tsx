"use client";

import React, { useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { AIQualityScannerModal, QualityScanResult } from "@/components/ai-quality-scanner-modal";
import {
  Camera,
  ShieldCheck,
  Award,
  Upload,
  CheckCircle2,
  Sparkles,
  FileCheck,
  AlertCircle,
  PhoneCall,
  Calendar,
  Building,
  Microscope,
} from "lucide-react";
import Link from "next/link";

export default function QualityPage() {
  const { t, playChime } = useI18n();

  const [scannerOpen, setScannerOpen] = useState(false);
  const [latestScan, setLatestScan] = useState<QualityScanResult | null>({
    grade: "Grade A",
    moisturePercent: 11.2,
    foreignMatterPercent: 0.4,
    brokenPercent: 1.1,
    colorConsistencyScore: 95,
    overallScore: 95,
    cropName: "Wheat (Sharbati Gold)",
    advisory: "स्वस्थ, चमकदार शरबती दाना। नमी 12% से कम होने के कारण सुरक्षित भंडारण व निर्यातकों की सीधी मांग हेतु उपयुक्त।",
  });

  const [assayerBooked, setAssayerBooked] = useState(false);

  const qualityLabs = [
    {
      id: "lab-1",
      name: "Rajasthan State Seed & Assaying Lab, Jaipur",
      accreditation: "NABL & AGMARK Accredited",
      location: "Durgapura, Jaipur",
      contact: "+91 141 2550180",
      fee: "₹250 / सैंपल",
      tat: "4 घंटे में रिपोर्ट",
    },
    {
      id: "lab-2",
      name: "National Institute of Agricultural Marketing (NIAM) Lab",
      accreditation: "Govt of India Accredited",
      location: "Bambala, Tonk Road, Jaipur",
      contact: "+91 141 2795120",
      fee: "₹350 / सैंपल",
      tat: "तत्काल डिजिटल रिपोर्ट",
    },
    {
      id: "lab-3",
      name: "WDRA Warehouse Testing Sub-Center, Chomu",
      accreditation: "WDRA Certified Assayer",
      location: "Chomu Mandi Yard",
      contact: "+91 1423 221090",
      fee: "₹150 / सैंपल",
      tat: "30 मिनट में ऑन-स्पॉट जांच",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 flex items-center gap-2">
              <Camera className="w-8 h-8 text-emerald-600" />
              {t.digitalQualityGrading}
            </h1>
            <span className="bg-emerald-100 text-emerald-900 text-xs font-black px-2.5 py-0.5 rounded-full border border-emerald-300">
              AI Vision + NABL Lab
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            मोबाइल फोटो से तुरंत प्रारंभिक गुणवत्ता व नमी रिपोर्ट प्राप्त करें और 1-क्लिक में आधिकारिक गुणवत्ता परीक्षक बुक करें।
          </p>
        </div>

        <button
          onClick={() => {
            playChime();
            setScannerOpen(true);
          }}
          className="px-5 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-md transition flex items-center gap-2 cursor-pointer self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          नया AI क्वालिटी स्कैन करें
        </button>
      </div>

      {/* Latest AI Scan Result Card */}
      {latestScan && (
        <div className="bg-gradient-to-br from-emerald-900 via-emerald-950 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-emerald-700 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
                <Microscope className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <span className="text-xs uppercase font-extrabold text-emerald-300 tracking-wider">
                  ताजा AI डिजिटल विश्लेषण रिपोर्ट (Latest Analysis)
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">{latestScan.cropName}</h3>
              </div>
            </div>

            <div className="bg-emerald-500 text-white font-black text-sm px-4 py-1.5 rounded-full shadow-md self-start sm:self-auto">
              {latestScan.grade} (स्कोर: {latestScan.overallScore}/100)
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
            <div className="bg-white/10 p-3.5 rounded-2xl border border-white/10">
              <span className="text-emerald-300 font-semibold block">नमी (Moisture)</span>
              <span className="text-2xl font-black text-white mt-1">{latestScan.moisturePercent}%</span>
              <span className="text-[10px] text-emerald-400 block font-bold mt-0.5">✓ 12% से कम (सुरक्षित)</span>
            </div>
            <div className="bg-white/10 p-3.5 rounded-2xl border border-white/10">
              <span className="text-emerald-300 font-semibold block">कचरा (Foreign Matter)</span>
              <span className="text-2xl font-black text-white mt-1">{latestScan.foreignMatterPercent}%</span>
              <span className="text-[10px] text-emerald-400 block font-bold mt-0.5">✓ शुद्ध दाना</span>
            </div>
            <div className="bg-white/10 p-3.5 rounded-2xl border border-white/10">
              <span className="text-emerald-300 font-semibold block">टूटा दाना (Broken)</span>
              <span className="text-2xl font-black text-white mt-1">{latestScan.brokenPercent}%</span>
              <span className="text-[10px] text-emerald-400 block font-bold mt-0.5">✓ मानक स्तर</span>
            </div>
            <div className="bg-white/10 p-3.5 rounded-2xl border border-white/10">
              <span className="text-emerald-300 font-semibold block">रंग व चमक स्कोर</span>
              <span className="text-2xl font-black text-amber-300 mt-1">{latestScan.colorConsistencyScore}%</span>
              <span className="text-[10px] text-emerald-400 block font-bold mt-0.5">✓ प्रीमियम चमक</span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-emerald-100 bg-white/10 p-4 rounded-2xl border border-white/10 leading-relaxed">
            💡 <strong>AI सिफारिश:</strong> {latestScan.advisory}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            <span className="text-xs text-amber-300 font-semibold flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" /> {t.gradingDisclaimer}
            </span>
            <Link
              href="/my-crops"
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-xs rounded-xl transition shadow-md"
            >
              इस ग्रेड के साथ लॉट बनाएं
            </Link>
          </div>
        </div>
      )}

      {/* Book On-Farm Physical Assaying Lab Inspection */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center">
              <Building className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-black text-gray-900">
                मान्यता प्राप्त गुणवत्ता प्रयोगशालाएं एवं ऑन-फार्म चेकिंग
              </h3>
              <p className="text-xs text-gray-600">
                NABL, AGMARK व WDRA प्रमाणित लैब से आधिकारिक ग्रेडिंग सर्टिफिकेट प्राप्त करें
              </p>
            </div>
          </div>

          {assayerBooked ? (
            <div className="bg-emerald-100 text-emerald-900 text-xs font-bold px-4 py-2 rounded-xl border border-emerald-300 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              लैब इंस्पेक्टर असाइन हुआ! (आज शाम 4 बजे विजिट)
            </div>
          ) : (
            <button
              onClick={() => {
                playChime();
                setAssayerBooked(true);
              }}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition cursor-pointer"
            >
              खेत पर इंस्पेक्टर बुलाएं (Book On-Farm Assayer)
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {qualityLabs.map((lab) => (
            <div
              key={lab.id}
              className="bg-gray-50 rounded-2xl p-4 border border-gray-200 space-y-3 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                  {lab.accreditation}
                </span>
                <h4 className="font-extrabold text-sm text-gray-900 mt-2">{lab.name}</h4>
                <p className="text-xs text-gray-500 mt-0.5">📍 {lab.location}</p>

                <div className="mt-3 space-y-1 text-xs bg-white p-2.5 rounded-xl border border-gray-100">
                  <div className="flex justify-between">
                    <span className="text-gray-500">शुल्क:</span>
                    <span className="font-bold text-gray-900">{lab.fee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">समय:</span>
                    <span className="font-bold text-emerald-700">{lab.tat}</span>
                  </div>
                </div>
              </div>

              <a
                href={`tel:${lab.contact}`}
                className="py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1 border border-emerald-200"
              >
                <PhoneCall className="w-3.5 h-3.5" /> {lab.contact}
              </a>
            </div>
          ))}
        </div>
      </div>

      <AIQualityScannerModal
        isOpen={scannerOpen}
        onClose={() => setScannerOpen(false)}
        onScanComplete={(res) => setLatestScan(res)}
      />
    </div>
  );
}
