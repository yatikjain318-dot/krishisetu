"use client";

import React, { useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { MANDIS_DATA, CROPS_INTELLIGENCE, Mandi } from "@/lib/data/mock-data";
import { MandiComparisonModal } from "@/components/mandi-comparison-modal";
import { VoiceMarketQueryModal } from "@/components/voice-market-query-modal";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Sparkles,
  Scale,
  Search,
  Filter,
  Store,
  Truck,
  ArrowRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  MapPin,
  Mic,
  Share2,
} from "lucide-react";

export default function PricesPage() {
  const { t, language, playChime } = useI18n();
  const isEn = language === "en";

  const [selectedCrop, setSelectedCrop] = useState<string>("all");
  const [selectedState, setSelectedState] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"prices" | "intelligence">("prices");
  const [selectedCropForIntel, setSelectedCropForIntel] = useState<string>("wheat");

  const [comparisonModalOpen, setComparisonModalOpen] = useState(false);
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);

  const states = Array.from(new Set(MANDIS_DATA.map((m) => m.state)));
  const cropsList = CROPS_INTELLIGENCE;

  // Filter Mandis
  const filteredMandis = MANDIS_DATA.filter((mandi) => {
    const matchesState = selectedState === "all" || mandi.state === selectedState;
    const matchesSearch =
      mandi.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mandi.nameHi.includes(searchQuery) ||
      mandi.district.toLowerCase().includes(searchQuery.toLowerCase());

    const hasCrop =
      selectedCrop === "all" ||
      mandi.cropPrices.some((cp) => cp.cropId === selectedCrop);

    return matchesState && matchesSearch && hasCrop;
  });

  const activeIntelCrop =
    CROPS_INTELLIGENCE.find((c) => c.id === selectedCropForIntel) || CROPS_INTELLIGENCE[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 flex items-center gap-2">
              <TrendingUp className="w-8 h-8 text-emerald-600" />
              {t.todayMandiPrices}
            </h1>
            <span className="bg-emerald-100 text-emerald-900 text-xs font-black px-2.5 py-0.5 rounded-full border border-emerald-300">
              Live Mandi Feed
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            {isEn
              ? "Live modal prices, arrival volumes, freight calculations, and AI price forecasts across 16+ national mandis"
              : "प्रमुख मंडियों के दैनिक मॉडल भाव, आवक, परिवहन खर्च और AI मूल्य विश्लेषण"}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setVoiceModalOpen(true)}
            className="px-3.5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
          >
            <Mic className="w-4 h-4 animate-pulse text-amber-300" />
            {isEn ? "Voice Query" : "बोलकर भाव पूछें"}
          </button>

          <button
            onClick={() => {
              playChime();
              setComparisonModalOpen(true);
            }}
            className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-xs rounded-xl transition shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Scale className="w-4 h-4" />
            {t.compareMarkets}
          </button>
        </div>
      </div>

      {/* Tabs: Mandi Prices vs AI Price Intelligence */}
      <div className="flex border-b border-gray-200 gap-4">
        <button
          onClick={() => setActiveTab("prices")}
          className={`pb-3 text-sm font-extrabold transition border-b-2 cursor-pointer ${
            activeTab === "prices"
              ? "border-emerald-600 text-emerald-700"
              : "border-transparent text-gray-500 hover:text-gray-900"
          }`}
        >
          🏪 {isEn ? "Mandi Rates Table" : "मंडीवार भाव सूची (Mandi Rates Table)"}
        </button>
        <button
          onClick={() => setActiveTab("intelligence")}
          className={`pb-3 text-sm font-extrabold transition border-b-2 cursor-pointer flex items-center gap-1.5 ${
            activeTab === "intelligence"
              ? "border-emerald-600 text-emerald-700"
              : "border-transparent text-gray-500 hover:text-gray-900"
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          📈 {isEn ? "AI Price Intelligence & 7-Day Forecast" : "AI मूल्य सूझबूझ व 7-दिन भविष्यवाणी"}
        </button>
      </div>

      {activeTab === "prices" && (
        <div className="space-y-6">
          {/* Filters Bar */}
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={isEn ? "Search mandi or district name..." : "मंडी या जिले का नाम खोजें..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs sm:text-sm font-medium text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs sm:text-sm font-bold text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="all">🌾 {t.allCrops}</option>
                {cropsList.map((c) => (
                  <option key={c.id} value={c.id}>
                    {isEn ? c.name : c.nameHi}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs sm:text-sm font-bold text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="all">📍 {t.allStates}</option>
                {states.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Mandi Cards List */}
          <div className="space-y-4">
            {filteredMandis.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center border border-gray-200">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <h3 className="text-base font-bold text-gray-800">{isEn ? "No Mandi Results Found" : "कोई मंडी परिणाम नहीं मिला"}</h3>
                <p className="text-xs text-gray-500 mt-1">{isEn ? "Please adjust your search query or filters." : "कृपया फ़िल्टर या खोज शब्द बदलें।"}</p>
              </div>
            ) : (
              filteredMandis.map((mandi) => (
                <div
                  key={mandi.id}
                  className="bg-white rounded-3xl p-5 sm:p-6 border border-gray-200 hover:border-emerald-500 shadow-sm transition space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-black text-gray-900">
                          {isEn ? mandi.name : mandi.nameHi} ({mandi.name})
                        </h3>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                          {mandi.distanceKm} {isEn ? "km away" : "किमी दूर"}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-emerald-600" />
                        {mandi.district}, {mandi.state} • {isEn ? `Freight: ₹${mandi.transportCostPerQtl}/qtl` : `अनुमानित भाड़ा: ₹${mandi.transportCostPerQtl}/क्विंटल`}
                      </p>
                    </div>

                    <div className="text-xs text-gray-500 font-semibold bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-200 self-start sm:self-auto">
                      {isEn ? `Daily Arrival: ` : `दैनिक आवक: `}
                      <strong className="text-gray-900 font-mono">{mandi.arrivalVolumeQtl} {isEn ? "Qtl" : "क्विंटल"}</strong>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {mandi.cropPrices
                      .filter((cp) => selectedCrop === "all" || cp.cropId === selectedCrop)
                      .map((cp, idx) => (
                        <div
                          key={idx}
                          className="bg-gray-50 p-3.5 rounded-2xl border border-gray-200 hover:bg-emerald-50/60 hover:border-emerald-300 transition"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-extrabold text-sm text-gray-900">
                              {isEn ? cp.cropName : cp.cropNameHi}
                            </span>
                            <span className="text-[10px] text-gray-500 font-medium">
                              {cp.variety}
                            </span>
                          </div>

                          <div className="flex items-baseline justify-between mt-2 pt-2 border-t border-gray-200">
                            <div>
                              <span className="text-xs text-gray-500 block">{isEn ? "Modal Rate:" : "मॉडल भाव:"}</span>
                              <span className="text-xl font-black text-emerald-700 font-mono">
                                ₹{cp.modalPrice}
                              </span>
                              <span className="text-[10px] text-gray-400 ml-1">/qtl</span>
                            </div>

                            <div className="text-right text-[11px] text-gray-600">
                              <div>Range: ₹{cp.minPrice} - ₹{cp.maxPrice}</div>
                              <span className={`font-bold font-mono text-[10px] ${cp.changePercent >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                                {cp.changePercent >= 0 ? `▲ +${cp.changePercent}%` : `▼ ${cp.changePercent}%`}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Tab 2: AI Price Intelligence */}
      {activeTab === "intelligence" && (
        <div className="space-y-6">
          {/* Crop Selector Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {cropsList.map((c) => (
              <button
                key={c.id}
                onClick={() => setSelectedCropForIntel(c.id)}
                className={`px-4 py-2 rounded-2xl text-xs font-black transition whitespace-nowrap cursor-pointer ${
                  selectedCropForIntel === c.id
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30 scale-105"
                    : "bg-white text-gray-700 hover:bg-emerald-50 border border-gray-200"
                }`}
              >
                {isEn ? c.name : c.nameHi}
              </button>
            ))}
          </div>

          {/* AI Intelligence Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
              <div>
                <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full uppercase">
                  {isEn ? "7-Day AI Price Forecast" : "7-दिवसीय AI पूर्वानुमान"}
                </span>
                <h2 className="text-2xl font-black text-gray-900 mt-2">
                  {isEn ? activeIntelCrop.name : activeIntelCrop.nameHi} ({activeIntelCrop.varietyList.join(", ")})
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  {isEn ? "Govt MSP:" : "सरकारी MSP:"} <strong>₹{activeIntelCrop.msp}/qtl</strong> • {isEn ? "Today's Modal Average:" : "वर्तमान औसत भाव:"} <strong>₹{activeIntelCrop.currentAvgModal}/qtl</strong>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="bg-amber-400 text-amber-950 font-black text-xs px-3 py-1.5 rounded-xl shadow-xs">
                  {activeIntelCrop.aiRecommendation.action.replace(/_/g, " ")}
                </span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-300 space-y-2">
              <div className="text-xs font-black text-emerald-950 uppercase tracking-wider">
                💡 {isEn ? "AI Market Advisory & Recommendation:" : "AI मार्केट विश्लेषण व सलाह:"}
              </div>
              <p className="text-sm font-bold text-emerald-950 leading-relaxed">
                {isEn ? activeIntelCrop.aiRecommendation.reasonEn : activeIntelCrop.aiRecommendation.reasonHi}
              </p>
              <div className="text-xs text-emerald-800 pt-1">
                {isEn ? "Projected Target Rate:" : "अनुमानित लक्ष्य भाव:"} <strong>₹{activeIntelCrop.aiRecommendation.targetPriceProjection}/qtl</strong> ({isEn ? `within ${activeIntelCrop.aiRecommendation.expectedRiseDays} days` : `${activeIntelCrop.aiRecommendation.expectedRiseDays} दिनों के भीतर`})
              </div>
            </div>
          </div>
        </div>
      )}

      <MandiComparisonModal
        isOpen={comparisonModalOpen}
        onClose={() => setComparisonModalOpen(false)}
        selectedCrop={selectedCrop !== "all" ? selectedCrop : "wheat"}
      />

      <VoiceMarketQueryModal
        isOpen={voiceModalOpen}
        onClose={() => setVoiceModalOpen(false)}
      />
    </div>
  );
}
