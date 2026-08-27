"use client";

import React, { useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { CROPS_INTELLIGENCE, WAREHOUSES_DATA } from "@/lib/data/mock-data";
import { Warehouse, Calculator, Sparkles, TrendingUp, DollarSign, ShieldCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export function SellVsStoreCalculator() {
  const { t, language } = useI18n();
  const isEn = language === "en";

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
              {isEn
                ? "Sell immediately vs store in scientific warehouse for future demand?"
                : "आज तुरंत बेचें या मान्यता प्राप्त गोदाम में रखकर आगामी मांग पर बेचें?"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/storage"
            className="text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 px-3 py-1.5 rounded-xl transition flex items-center gap-1"
          >
            <Warehouse className="w-3.5 h-3.5" />
            {isEn ? "View Nearby Warehouses" : "निकटवर्ती गोदाम देखें"}
          </Link>
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-2xl border border-gray-200">
        <div>
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">
            🌾 {isEn ? "Select Commodity:" : "फसल चुनें:"}
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
                {isEn ? c.name : c.nameHi}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">
            ⚖️ {isEn ? "Quantity (Quintals):" : "मात्रा (क्विंटल):"}
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={5}
              max={500}
              value={quantityQtl}
              onChange={(e) => setQuantityQtl(Number(e.target.value))}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-sm font-black text-gray-900 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
            <span className="text-xs text-gray-500 font-semibold shrink-0">
              ({bagsCount} {isEn ? "bags" : "बोरियां"})
            </span>
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">
            📅 {isEn ? "Storage Duration:" : "भंडारण अवधि:"}
          </label>
          <select
            value={storageMonths}
            onChange={(e) => setStorageMonths(Number(e.target.value))}
            className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-sm font-bold text-gray-900 focus:ring-2 focus:ring-purple-500 focus:outline-none"
          >
            <option value={1}>1 {isEn ? "Month" : "माह"}</option>
            <option value={2}>2 {isEn ? "Months (Recommended)" : "माह (अनुशंसित)"}</option>
            <option value={3}>3 {isEn ? "Months" : "माह"}</option>
            <option value={6}>6 {isEn ? "Months" : "माह"}</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">
            📈 {isEn ? "Expected Price Surge:" : "अपेक्षित मूल्य वृद्धि (%):"}
          </label>
          <div className="flex items-center gap-2">
            <input
              type="number"
              min={1}
              max={50}
              value={projectedPriceRisePercent}
              onChange={(e) => setProjectedPriceRisePercent(Number(e.target.value))}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-sm font-black text-emerald-700 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
            <span className="text-xs text-emerald-700 font-bold">%</span>
          </div>
        </div>
      </div>

      {/* Comparison ROI Output Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scenario A: Sell Today */}
        <div className="bg-gray-50 rounded-3xl p-5 border border-gray-200 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-gray-500">
              {isEn ? "Option A: Sell Immediately Today" : "विकल्प A: आज तुरंत बेचें"}
            </span>
            <span className="text-xs bg-gray-200 text-gray-800 font-bold px-2 py-0.5 rounded">
              {isEn ? "Instant Cash" : "तत्काल नकदी"}
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-600">
              <span>{isEn ? "Today's Mandi Price:" : "वर्तमान मंडी भाव:"}</span>
              <span className="font-bold text-gray-900">₹{currentPrice}/qtl</span>
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>{isEn ? "Total Harvest Volume:" : "कुल बेची गई मात्रा:"}</span>
              <span className="font-bold text-gray-900">{quantityQtl} {isEn ? "Qtl" : "क्विंटल"}</span>
            </div>
            <div className="pt-2 border-t border-gray-200 flex justify-between items-center">
              <span className="text-xs font-bold text-gray-800">{isEn ? "Total Realization:" : "कुल प्राप्त राशि:"}</span>
              <span className="text-2xl font-black text-gray-900 font-mono">
                ₹{immediateGrossIncome.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>

        {/* Scenario B: Store and Sell Later */}
        <div className={`rounded-3xl p-5 border-2 space-y-4 ${
          isProfitable
            ? "bg-gradient-to-br from-purple-50 to-emerald-50 border-emerald-400 shadow-md"
            : "bg-amber-50 border-amber-300"
        }`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold uppercase tracking-wider text-purple-900 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              {isEn ? `Option B: Store for ${storageMonths} Months` : `विकल्प B: ${storageMonths} माह गोदाम में रखें`}
            </span>
            <span className="text-xs bg-emerald-600 text-white font-black px-2.5 py-0.5 rounded-full">
              {isEn ? "+ Higher ROI" : "+ अधिक मुनाफा"}
            </span>
          </div>

          <div className="space-y-1.5 text-xs text-gray-700">
            <div className="flex justify-between">
              <span>{isEn ? `Future Projected Price (+${projectedPriceRisePercent}%):` : `अनुमानित भाव (+${projectedPriceRisePercent}%):`}</span>
              <span className="font-black text-emerald-700">₹{futurePricePerQtl}/qtl</span>
            </div>
            <div className="flex justify-between">
              <span>{isEn ? "Gross Future Value:" : "कुल भविष्य मूल्य:"}</span>
              <span className="font-mono font-bold text-gray-900">₹{futureGrossIncome.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-rose-600">
              <span>{isEn ? "Storage & Insurance Cost:" : "गोदाम किराया व बीमा खर्च:"}</span>
              <span className="font-mono">- ₹{totalStorageFee + handlingAndInsurance}</span>
            </div>
            {takePledgeLoan && (
              <div className="flex justify-between text-purple-900">
                <span>{isEn ? "75% e-NWR Loan Advance:" : "75% e-NWR बैंक लोन (अग्रिम नकदी):"}</span>
                <span className="font-mono font-bold text-purple-700">+ ₹{pledgeLoanAmount.toLocaleString("en-IN")}</span>
              </div>
            )}

            <div className="pt-2 border-t border-purple-200 flex justify-between items-center">
              <div>
                <span className="text-xs font-black text-emerald-950 block">
                  {isEn ? "Net Extra Profit (अतिरिक्त शुद्ध मुनाफा):" : "शुद्ध अतिरिक्त मुनाफा:"}
                </span>
                <span className="text-[11px] text-emerald-700 font-bold">
                  (+₹{netGainPerQtl}/qtl {isEn ? "extra" : "अधिक"})
                </span>
              </div>
              <span className="text-2xl font-black text-emerald-700 font-mono">
                + ₹{netAddedProfit.toLocaleString("en-IN")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
