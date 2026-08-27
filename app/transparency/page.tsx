"use client";

import React from "react";
import { useI18n } from "@/lib/i18n/context";
import { TRANSACTIONS_DATA } from "@/lib/data/mock-data";
import { FileCheck, TrendingUp, ShieldCheck, CheckCircle2, Lock, Scale, Award } from "lucide-react";

export default function TransparencyPage() {
  const { t } = useI18n();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 flex items-center gap-2">
              <FileCheck className="w-8 h-8 text-emerald-600" />
              {t.navTransparency}
            </h1>
            <span className="bg-emerald-100 text-emerald-900 text-xs font-black px-2.5 py-0.5 rounded-full border border-emerald-300">
              Public Ledger
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            कृषि उपज सौदों का पारदर्शी सार्वजनिक बहीखाता • बिचौलिया सूचना विषमता (Information Asymmetry) को समाप्त करने हेतु समर्पित
          </p>
        </div>
      </div>

      {/* Trust Comparison Banner */}
      <div className="bg-gradient-to-br from-emerald-900 via-emerald-950 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
            <Scale className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              स्थानीय मंडी औसत बनाम कृषिसेतु प्राप्त मूल्य
            </h3>
            <p className="text-xs text-emerald-200">
              सत्यापित डेटा विश्लेषण के अनुसार कृषिसेतु से जुड़े किसान औसतन 11.4% अधिक मूल्य प्राप्त कर रहे हैं
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
            <span className="text-xs text-emerald-300 font-semibold block">औसत स्थानीय मंडी दर</span>
            <span className="text-2xl font-black text-gray-300 mt-1">₹2,480 / qtl</span>
            <span className="text-[10px] text-gray-400 block mt-0.5">(गेहूं औसत)</span>
          </div>
          <div className="bg-emerald-500/20 p-4 rounded-2xl border-2 border-emerald-400">
            <span className="text-xs text-amber-300 font-bold block">कृषिसेतु सत्यापित कॉर्पोरेट दर</span>
            <span className="text-3xl font-black text-amber-300 mt-1">₹2,720 / qtl</span>
            <span className="text-[10px] text-emerald-200 block font-bold mt-0.5">(+₹240/qtl अधिक)</span>
          </div>
          <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
            <span className="text-xs text-emerald-300 font-semibold block">बिचौलिया कटौती</span>
            <span className="text-2xl font-black text-emerald-400 mt-1">0.0%</span>
            <span className="text-[10px] text-emerald-200 block mt-0.5">(शून्य दलाली)</span>
          </div>
        </div>
      </div>

      {/* Public Transparent Trades Ledger */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-base text-gray-900">
              हाल ही में संपन्न सत्यापित कृषि सौदों का सार्वजनिक रिकॉर्ड
            </h3>
            <p className="text-xs text-gray-500">
              गोपनीयता बनाए रखते हुए वास्तविक दरों व मात्रा का निष्पक्ष ऑडिट रिकॉर्ड
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-gray-50 text-gray-600 font-bold border-y border-gray-100">
                <th className="py-3 px-3">सौदा कोड</th>
                <th className="py-3 px-3">फसल व किस्म</th>
                <th className="py-3 px-3">मात्रा</th>
                <th className="py-3 px-3">तय भाव (Agreed)</th>
                <th className="py-3 px-3">मंडी बेंचमार्क</th>
                <th className="py-3 px-3 text-emerald-700">अतिरिक्त किसान लाभ</th>
                <th className="py-3 px-3">भुगतान स्थिति</th>
                <th className="py-3 px-3">दिनांक</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {TRANSACTIONS_DATA.map((txn) => (
                <tr key={txn.id} className="hover:bg-emerald-50/50">
                  <td className="py-3 px-3 font-mono font-bold text-gray-800">{txn.txnCode}</td>
                  <td className="py-3 px-3 font-bold text-gray-900">{txn.crop}</td>
                  <td className="py-3 px-3">{txn.quantityQtl} क्विंटल</td>
                  <td className="py-3 px-3 font-black text-gray-900">₹{txn.agreedPricePerQtl}/qtl</td>
                  <td className="py-3 px-3 text-gray-500">₹{txn.mandiBenchmarkPrice}/qtl</td>
                  <td className="py-3 px-3 font-black text-emerald-700">
                    + ₹{txn.extraRealization.toLocaleString("en-IN")}
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                      ✓ एस्क्रो सेटल्ड
                    </span>
                  </td>
                  <td className="py-3 px-3 text-gray-500">{txn.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
