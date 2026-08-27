"use client";

import React, { useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { CROPS_INTELLIGENCE, WAREHOUSES_DATA } from "@/lib/data/mock-data";
import { Warehouse, Calculator, Sparkles, TrendingUp, DollarSign, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export function SellVsStoreCalculator() {
  const { t } = useI18n();

  const [selectedCropId, setSelectedCropId] = useState("mustard");
  const [quantityQtl, setQuantityQtl] = useState(50); // 50 qtl = 100 bags (50kg each)
  const [currentPrice, setCurrentPrice] = useState(5820);
  const [storageMonths, setStorageMonths] = useState(2);
  const [ratePerBagPerMonth, setRatePerBagPerMonth] = useState(11);
  const [projectedPriceRisePercent, setProjectedPriceRisePercent] = useState(12);
  const [takePledgeLoan, setTakePledgeLoan] = useState(true);

  const crop = CROPS_INTELLIGENCE.find((c) => c.id === selectedCropId) || CROPS_INTELLIGENCE[0];

  // Calculations
  const bagsCount = quantityQtl * 2; // 50kg per bag
  const immediateGrossIncome = quantityQtl * currentPrice;

  const totalStorageFee = bagsCount * ratePerBagPerMonth * storageMonths;
  const handlingAndInsurance = bagsCount * 12; // one-time loading/unloading/assaying

  // Pledge Loan against e-NWR: 75% value at 7% p.a. interest
  const pledgeLoanAmount = takePledgeLoan ? immediateGrossIncome * 0.75 : 0;
  const interestCost = takePledgeLoan ? (pledgeLoanAmount * 0.07 * (storageMonths / 12)) : 0;

  const totalCostOfHolding = totalStorageFee + handlingAndInsurance + interestCost;

  const futurePricePerQtl = Math.round(currentPrice * (1 + projectedPriceRisePercent / 100));
  const futureGrossIncome = quantityQtl * futurePricePerQtl;

  const netIncomeAfterStorage = futureGrossIncome - totalCostOfHolding;
  const netAddedProfit = netIncomeAfterStorage - immediateGrossIncome;
  const netGainPerQtl = Math.round(netAddedProfit / quantityQtl);

  const isProfitable = netAddedProfit > 0;

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-7 border border-emerald-200 shadow-xl space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex items-center justify-center shadow-md">
            <Calculator className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-black text-gray-900">{t.sellVsStoreCalculator}</h3>
              <span className="bg-purple-100 text-purple-900 text-[10px] font-extrabold px-2 py-0.5 rounded-md border border-purple-300 uppercase">
                WDRA e-NWR ROI
              </span>
            </div>
            <p className="text-xs text-gray-600">
              आज तुरंत बेचें या मान्यता प्राप्त गोदाम में रखकर आगामी मांग पर बेचें?
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/storage"
            className="text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 px-3 py-1.5 rounded-xl transition flex items-center gap-1"
          >
            <Warehouse className="w-3.5 h-3.5" />
            निकटवर्ती गोदाम देखें
          </Link>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-200">
        <div>
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">
            🌾 फसल चुनें:
          </label>
          <select
            value={selectedCropId}
            onChange={(e) => {
              const id = e.target.value;
              setSelectedCropId(id);
              const found = CROPS_INTELLIGENCE.find((c) => c.id === id);
              if (found) {
                setCurrentPrice(found.currentAvgModal);
              }
            }}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-sm font-bold text-gray-900 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          >
            {CROPS_INTELLIGENCE.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nameHi}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">
            ⚖️ मात्रा (क्विंटल):
          </label>
          <input
            type="number"
            min={10}
            max={2000}
            value={quantityQtl}
            onChange={(e) => setQuantityQtl(Number(e.target.value) || 1)}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-sm font-bold text-gray-900 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
          <span className="text-[11px] text-gray-500 mt-0.5 block font-medium">
            = {bagsCount} मानक बोरियां (50 kg)
          </span>
        </div>

        <div>
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">
            💰 आज का मंडी भाव (₹/qtl):
          </label>
          <input
            type="number"
            min={500}
            max={50000}
            value={currentPrice}
            onChange={(e) => setCurrentPrice(Number(e.target.value) || 1)}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-sm font-bold text-gray-900 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">
            ⏱️ स्टोरेज अवधि:
          </label>
          <select
            value={storageMonths}
            onChange={(e) => setStorageMonths(Number(e.target.value))}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-sm font-bold text-gray-900 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          >
            <option value={1}>1 माह (30 दिन)</option>
            <option value={2}>2 माह (60 दिन) - अनुशंसित</option>
            <option value={3}>3 माह (90 दिन)</option>
            <option value={4}>4 माह (120 दिन)</option>
            <option value={6}>6 माह (180 दिन)</option>
          </select>
        </div>
      </div>

      {/* Advanced Slider: Projected Off-Season Rise */}
      <div className="bg-purple-50/70 p-4 rounded-2xl border border-purple-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-purple-700" />
            <span className="text-xs font-extrabold text-purple-950 uppercase tracking-wider">
              AI अनुमानित आगामी भाव वृद्धि (%):
            </span>
          </div>
          <span className="text-sm font-black text-purple-900 bg-purple-200 px-3 py-0.5 rounded-full">
            +{projectedPriceRisePercent}% वृद्धि (₹{futurePricePerQtl}/क्विंटल)
          </span>
        </div>
        <input
          type="range"
          min={2}
          max={35}
          value={projectedPriceRisePercent}
          onChange={(e) => setProjectedPriceRisePercent(Number(e.target.value))}
          className="w-full accent-purple-600 cursor-pointer"
        />

        {/* e-NWR Pledge Loan Toggle */}
        <div className="mt-3 pt-3 border-t border-purple-200/60 flex items-center justify-between">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={takePledgeLoan}
              onChange={(e) => setTakePledgeLoan(e.target.checked)}
              className="w-4 h-4 accent-purple-600 rounded"
            />
            <span className="text-xs font-bold text-purple-950">
              e-NWR रसीद पर 75% तत्काल बैंक ऋण लें (ब्याज 7% p.a.)
            </span>
          </label>
          {takePledgeLoan && (
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
              तत्काल प्राप्त ऋण राशि: ₹{pledgeLoanAmount.toLocaleString("en-IN")}
            </span>
          )}
        </div>
      </div>

      {/* Comparison Result Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Option A: Sell Today */}
        <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 flex flex-col justify-between">
          <div>
            <div className="text-xs font-extrabold text-gray-500 uppercase tracking-wider mb-1">
              विकल्प A: आज ही तुरंत बेचना
            </div>
            <h4 className="text-lg font-black text-gray-900">
              तत्काल विक्रय प्राप्ति (Spot Sale)
            </h4>
            <div className="mt-4 space-y-2 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>विक्रय मात्रा:</span>
                <span className="font-bold text-gray-900">{quantityQtl} क्विंटल</span>
              </div>
              <div className="flex justify-between">
                <span>वर्तमान मॉडल भाव:</span>
                <span className="font-bold text-gray-900">₹{currentPrice}/qtl</span>
              </div>
              <div className="flex justify-between">
                <span>स्टोरेज व ब्याज खर्च:</span>
                <span className="font-bold text-emerald-700">₹0</span>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <span className="text-xs text-gray-500 font-bold block">कुल तत्काल प्राप्ति:</span>
            <div className="text-2xl font-black text-gray-900">
              ₹{immediateGrossIncome.toLocaleString("en-IN")}
            </div>
          </div>
        </div>

        {/* Option B: Store & Sell Later */}
        <div className={`p-5 rounded-2xl border-2 flex flex-col justify-between relative ${
          isProfitable
            ? "bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-500 shadow-md"
            : "bg-rose-50 border-rose-300"
        }`}>
          {isProfitable && (
            <span className="absolute -top-3 right-4 bg-emerald-600 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-xs flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300" />
              सर्वाधिक अनुशंसित (+₹{netAddedProfit.toLocaleString("en-IN")})
            </span>
          )}

          <div>
            <div className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider mb-1">
              विकल्प B: {storageMonths} माह स्टोर कर बेचना
            </div>
            <h4 className="text-lg font-black text-emerald-950">
              वैज्ञानिक भंडारण + आगामी विक्रय
            </h4>

            <div className="mt-4 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600">अनुमानित भावी भाव:</span>
                <span className="font-black text-emerald-800">₹{futurePricePerQtl}/qtl (+{projectedPriceRisePercent}%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">भावी सकल आय:</span>
                <span className="font-bold text-gray-900">₹{futureGrossIncome.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">कुल स्टोरेज शुल्क ({storageMonths} माह):</span>
                <span className="font-bold text-rose-600">- ₹{totalStorageFee.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">हैंडलिंग व बीमा:</span>
                <span className="font-bold text-rose-600">- ₹{handlingAndInsurance.toLocaleString("en-IN")}</span>
              </div>
              {takePledgeLoan && (
                <div className="flex justify-between">
                  <span className="text-gray-600">ऋण ब्याज (7% p.a.):</span>
                  <span className="font-bold text-rose-600">- ₹{Math.round(interestCost).toLocaleString("en-IN")}</span>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-emerald-200">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-emerald-800 font-bold block">खर्च काटकर शुद्ध प्राप्ति:</span>
                <div className="text-2xl font-black text-emerald-900">
                  ₹{Math.round(netIncomeAfterStorage).toLocaleString("en-IN")}
                </div>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-extrabold text-emerald-700 block">शुद्ध अतिरिक्त लाभ:</span>
                <span className="text-lg font-black text-emerald-700 bg-emerald-200/80 px-2.5 py-1 rounded-xl">
                  + ₹{netGainPerQtl} / qtl
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Recommendation */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-800 to-teal-800 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-8 h-8 text-amber-300 shrink-0" />
          <div className="text-xs sm:text-sm">
            <span className="font-bold text-amber-300 block">
              💡 कृषि सेतु AI निष्कर्ष: {crop.nameHi} को {storageMonths} माह स्टोर करने पर प्रति क्विंटल ₹{netGainPerQtl} अधिक मिलेगा!
            </span>
            <span className="text-emerald-100">
              e-NWR रसीद द्वारा आप तत्काल ₹{pledgeLoanAmount.toLocaleString("en-IN")} का 75% बैंक लोन प्राप्त कर अपनी नकदी जरूरत भी पूरी कर सकते हैं।
            </span>
          </div>
        </div>

        <Link
          href="/storage"
          className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-xs rounded-xl transition shadow-md shrink-0 flex items-center gap-1.5"
        >
          गोदाम में स्पेस बुक करें <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
