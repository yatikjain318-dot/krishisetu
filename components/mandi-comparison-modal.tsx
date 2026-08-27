"use client";

import React, { useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { MANDIS_DATA, CROPS_INTELLIGENCE } from "@/lib/data/mock-data";
import { Scale, X, ArrowRight, CheckCircle2, TrendingUp, Truck, Store, Award } from "lucide-react";

interface MandiComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCropId?: string;
  selectedCrop?: string;
}

export function MandiComparisonModal({
  isOpen,
  onClose,
  defaultCropId = "wheat",
  selectedCrop,
}: MandiComparisonModalProps) {
  const { t, language } = useI18n();
  const isEn = language === "en";

  const [selectedCropId, setSelectedCropId] = useState(selectedCrop || defaultCropId);
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
                {isEn
                  ? "Which mandi yields the highest net in-pocket profit after deducting freight?"
                  : "परिवहन खर्च (Freight) काटकर किस मंडी में सबसे ज्यादा मुनाफा मिलेगा?"}
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
              🌾 {isEn ? "Select Commodity / Crop:" : "फसल चुनें:"}
            </label>
            <select
              value={selectedCropId}
              onChange={(e) => setSelectedCropId(e.target.value)}
              className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-sm font-bold text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              {CROPS_INTELLIGENCE.map((crop) => (
                <option key={crop.id} value={crop.id}>
                  {isEn ? crop.name : crop.nameHi} ({crop.varietyList[0] || crop.name})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1.5">
              ⚖️ {isEn ? "Total Harvest Volume (Quintals):" : "कुल फसल मात्रा (क्विंटल):"}
            </label>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min={10}
                max={200}
                step={5}
                value={quantityQtl}
                onChange={(e) => setQuantityQtl(Number(e.target.value))}
                className="flex-1 accent-emerald-600 cursor-pointer"
              />
              <span className="font-mono font-black text-sm text-emerald-950 bg-white border border-emerald-300 px-3 py-1.5 rounded-xl shrink-0">
                {quantityQtl} {isEn ? "Qtl" : "क्विंटल"}
              </span>
            </div>
          </div>
        </div>

        {/* Best Recommendation Highlight Banner */}
        {bestMandi && (
          <div className="p-5 bg-gradient-to-r from-emerald-900 to-teal-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-emerald-950">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-amber-400 text-amber-950 flex items-center justify-center font-black shrink-0">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-300">
                  🏆 {isEn ? "Best Net Realization Mandi" : "सर्वोत्तम शुद्ध लाभ मंडी (AI Recommendation)"}
                </span>
                <h4 className="text-lg font-black text-white">
                  {isEn ? bestMandi.name : bestMandi.nameHi} ({bestMandi.distanceKm} {isEn ? "km away" : "किमी दूर"})
                </h4>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-xs text-emerald-300 block">
                {isEn ? "Net In-Pocket Profit:" : "शुद्ध जेब में बचत (Net in Pocket):"}
              </span>
              <span className="text-2xl font-black text-amber-300 font-mono">
                ₹{bestMandi.netIncome.toLocaleString("en-IN")}
              </span>
              <span className="text-[11px] text-emerald-200 block">
                ({isEn ? "Effective" : "प्रभावी दर"}: ₹{bestMandi.netRatePerQtl}/qtl)
              </span>
            </div>
          </div>
        )}

        {/* Side-by-Side Comparison Table */}
        <div className="p-5 space-y-4 flex-1">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              📊 {isEn ? "Mandi-by-Mandi Cost & Net Realization Breakdown" : "मंडीवार भाड़ा व शुद्ध कमाई तुलना"}
            </h4>
            <span className="text-[11px] text-gray-400">
              {isEn ? "(Select 2 to 4 mandis)" : "(2 से 4 मंडियों का चयन करें)"}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-700 font-extrabold border-y border-gray-200">
                  <th className="p-3">{isEn ? "Mandi / Market" : "मंडी का नाम"}</th>
                  <th className="p-3">{isEn ? "Gross Price" : "मंडी भाव"}</th>
                  <th className="p-3">{isEn ? "Distance & Freight" : "दूरी व भाड़ा खर्च"}</th>
                  <th className="p-3">{isEn ? "Gross Realization" : "सकल आय (Gross)"}</th>
                  <th className="p-3 text-emerald-800">{isEn ? "Net In-Pocket" : "शुद्ध जेब में (Net)"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {comparedMandis.map((m) => {
                  const isWinner = m.id === bestMandi?.id;
                  return (
                    <tr
                      key={m.id}
                      className={isWinner ? "bg-emerald-50/80 font-bold" : "hover:bg-gray-50"}
                    >
                      <td className="p-3">
                        <div className="font-extrabold text-sm text-gray-900">
                          {isEn ? m.name : m.nameHi}
                          {isWinner && (
                            <span className="ml-1.5 text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-full font-bold">
                              {isEn ? "Best ✓" : "सर्वोत्तम ✓"}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-gray-500">{m.district}, {m.state}</div>
                      </td>

                      <td className="p-3">
                        <span className="text-sm font-black text-gray-900 font-mono">
                          ₹{m.modalPrice}
                        </span>
                        <span className="text-gray-400 text-[10px] block">/qtl</span>
                      </td>

                      <td className="p-3">
                        <div className="text-gray-700">
                          {m.distanceKm} {isEn ? "km" : "किमी"} • ₹{m.transportCostPerQtl}/qtl
                        </div>
                        <div className="text-xs font-bold text-rose-600">
                          - ₹{m.totalFreight.toLocaleString("en-IN")} {isEn ? "freight" : "भाड़ा"}
                        </div>
                      </td>

                      <td className="p-3 font-mono text-gray-700">
                        ₹{m.grossIncome.toLocaleString("en-IN")}
                      </td>

                      <td className="p-3">
                        <div className="text-base font-black text-emerald-700 font-mono">
                          ₹{m.netIncome.toLocaleString("en-IN")}
                        </div>
                        <div className="text-[11px] text-emerald-900 font-bold">
                          ₹{m.netRatePerQtl}/qtl {isEn ? "net rate" : "शुद्ध दर"}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 rounded-b-3xl flex items-center justify-between">
          <button
            onClick={onClose}
            className="text-xs font-bold text-gray-600 hover:text-gray-900 px-4 py-2 rounded-xl transition cursor-pointer"
          >
            {isEn ? "Close" : "बंद करें"}
          </button>

          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition cursor-pointer"
          >
            {isEn ? "Done" : "हो गया"}
          </button>
        </div>
      </div>
    </div>
  );
}
