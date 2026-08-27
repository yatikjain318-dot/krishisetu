"use client";

import React, { useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { MANDIS_DATA, CROPS_INTELLIGENCE } from "@/lib/data/mock-data";
import { Scale, X, ArrowRight, CheckCircle2, TrendingUp, Truck, Store, Award } from "lucide-react";

interface MandiComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCropId?: string;
}

export function MandiComparisonModal({ isOpen, onClose, defaultCropId = "wheat" }: MandiComparisonModalProps) {
  const { t } = useI18n();
  const [selectedCropId, setSelectedCropId] = useState(defaultCropId);
  const [quantityQtl, setQuantityQtl] = useState(40);
  const [selectedMandiIds, setSelectedMandiIds] = useState<string[]>([
    "jaipur-apmc",
    "ajmer-mandi",
    "kota-mandi",
  ]);

  if (!isOpen) return null;

  const currentCrop = CROPS_INTELLIGENCE.find((c) => c.id === selectedCropId) || CROPS_INTELLIGENCE[0];

  const toggleMandi = (id: string) => {
    if (selectedMandiIds.includes(id)) {
      if (selectedMandiIds.length > 2) {
        setSelectedMandiIds(selectedMandiIds.filter((m) => m !== id));
      }
    } else {
      if (selectedMandiIds.length < 4) {
        setSelectedMandiIds([...selectedMandiIds, id]);
      }
    }
  };

  const comparedMandis = MANDIS_DATA.filter((m) => selectedMandiIds.includes(m.id)).map((mandi) => {
    const priceObj = mandi.cropPrices.find((c) => c.cropId === selectedCropId) || mandi.cropPrices[0];
    const modalPrice = priceObj ? priceObj.modalPrice : 2500;
    const grossIncome = modalPrice * quantityQtl;
    const totalFreight = mandi.transportCostPerQtl * quantityQtl;
    const netIncome = grossIncome - totalFreight;
    const netRatePerQtl = modalPrice - mandi.transportCostPerQtl;

    return {
      ...mandi,
      priceObj,
      modalPrice,
      grossIncome,
      totalFreight,
      netIncome,
      netRatePerQtl,
    };
  });

  // Sort by highest net income
  const bestMandi = [...comparedMandis].sort((a, b) => b.netIncome - a.netIncome)[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-emerald-100 flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 text-white flex items-center justify-between rounded-t-3xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
              <Scale className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg sm:text-xl flex items-center gap-2">
                {t.compareMandisTitle}
              </h3>
              <p className="text-xs text-emerald-200">
                परिवहन खर्च (Freight) काटकर किस मंडी में सबसे ज्यादा मुनाफा मिलेगा?
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

        {/* Filters & Quantity Selector */}
        <div className="p-5 bg-gray-50 border-b border-gray-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1.5">
              🌾 फसल चुनें / Select Crop:
            </label>
            <select
              value={selectedCropId}
              onChange={(e) => setSelectedCropId(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-sm font-bold text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              {CROPS_INTELLIGENCE.map((crop) => (
                <option key={crop.id} value={crop.id}>
                  {crop.nameHi} (MSP: ₹{crop.msp})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1.5">
              ⚖️ विक्रय मात्रा (क्विंटल) / Quantity:
            </label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={5}
                max={2000}
                value={quantityQtl}
                onChange={(e) => setQuantityQtl(Number(e.target.value) || 1)}
                className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-sm font-bold text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
              <span className="text-sm font-bold text-gray-600 shrink-0">क्विंटल (Qtl)</span>
            </div>
          </div>
        </div>

        {/* Mandi Selector Pills */}
        <div className="px-5 pt-3">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">
            तुलना हेतु मंडियां चुनें (कम से कम 2, अधिकतम 4):
          </span>
          <div className="flex flex-wrap gap-2">
            {MANDIS_DATA.map((mandi) => {
              const isSelected = selectedMandiIds.includes(mandi.id);
              return (
                <button
                  key={mandi.id}
                  onClick={() => toggleMandi(mandi.id)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-emerald-600 text-white border-emerald-700 shadow-xs"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-emerald-50"
                  }`}
                >
                  <Store className="w-3.5 h-3.5" />
                  {mandi.nameHi} ({mandi.distanceKm} km)
                </button>
              );
            })}
          </div>
        </div>

        {/* Best Recommendation Banner */}
        {bestMandi && (
          <div className="m-5 p-4 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-teal-500/15 to-emerald-600/15 border-2 border-emerald-500 flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[11px] font-black text-emerald-800 uppercase tracking-wider bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-300">
                ⭐ सर्वोत्तम मंडी अनुशंसा (Most Profitable)
              </span>
              <h4 className="text-base font-extrabold text-emerald-950 mt-1">
                {bestMandi.nameHi} — हाथ में शुद्ध प्राप्ति ₹{bestMandi.netRatePerQtl}/क्विंटल
              </h4>
              <p className="text-xs text-emerald-800 font-medium">
                {quantityQtl} क्विंटल पर परिवहन खर्च काटने के बाद आपको कुल ₹
                {bestMandi.netIncome.toLocaleString("en-IN")} शुद्ध हाथ में मिलेंगे।
              </p>
            </div>
          </div>
        )}

        {/* Side-by-Side Comparison Cards */}
        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 flex-1">
          {comparedMandis.map((mandi) => {
            const isWinner = bestMandi?.id === mandi.id;
            return (
              <div
                key={mandi.id}
                className={`rounded-2xl p-4 transition relative flex flex-col justify-between ${
                  isWinner
                    ? "bg-emerald-50 border-2 border-emerald-600 shadow-md"
                    : "bg-white border border-gray-200 hover:border-emerald-300 shadow-2xs"
                }`}
              >
                {isWinner && (
                  <span className="absolute -top-3 right-4 bg-emerald-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs">
                    सर्वाधिक मुनाफा ✓
                  </span>
                )}

                <div>
                  <div className="font-extrabold text-base text-gray-900 mb-1">{mandi.nameHi}</div>
                  <div className="text-xs text-gray-500 flex items-center gap-2 mb-3">
                    <span>📍 {mandi.distanceKm} किमी दूर</span>
                    <span>•</span>
                    <span>{mandi.district}, {mandi.state}</span>
                  </div>

                  <div className="space-y-2 text-xs border-t border-gray-100 pt-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">मंडी मॉडल भाव:</span>
                      <span className="font-black text-sm text-gray-900">₹{mandi.modalPrice}/qtl</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-600 flex items-center gap-1">
                        <Truck className="w-3.5 h-3.5 text-amber-600" />
                        परिवहन भाड़ा (किमी अनुसार):
                      </span>
                      <span className="font-bold text-rose-600">- ₹{mandi.transportCostPerQtl}/qtl</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">आज की कुल आवक:</span>
                      <span className="font-semibold text-gray-800">
                        {mandi.priceObj?.arrivalTodayQtl || mandi.arrivalVolumeQtl} क्विंटल
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">गुणवत्ता मानक:</span>
                      <span className="font-semibold text-emerald-800 text-[11px] truncate max-w-[130px]" title={mandi.priceObj?.qualityRequirement}>
                        {mandi.priceObj?.qualityRequirement || "FAQ Standard"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Net Summary Box */}
                <div className="mt-4 pt-3 border-t border-gray-200 bg-white/70 p-3 rounded-xl">
                  <div className="text-[11px] text-gray-500 font-bold uppercase">
                    शुद्ध हाथ में भाव (Net Realization):
                  </div>
                  <div className="text-xl font-black text-emerald-700 mt-0.5">
                    ₹{mandi.netRatePerQtl} <span className="text-xs font-normal text-gray-600">/ क्विंटल</span>
                  </div>
                  <div className="text-xs font-bold text-gray-900 mt-1">
                    कुल शुद्ध राशि ({quantityQtl} क्विंटल): ₹{mandi.netIncome.toLocaleString("en-IN")}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 rounded-b-3xl flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-xs font-bold text-gray-600 hover:text-gray-900 px-4 py-2 rounded-xl hover:bg-gray-200 transition cursor-pointer"
          >
            बंद करें (Close)
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition shadow-xs cursor-pointer"
          >
            इस मंडी में परिवहन बुक करें
          </button>
        </div>
      </div>
    </div>
  );
}
