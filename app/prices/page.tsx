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
  const { t, playChime } = useI18n();

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
            प्रमुख मंडियों के दैनिक मॉडल भाव, आवक, परिवहन खर्च और AI मूल्य विश्लेषण
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setVoiceModalOpen(true)}
            className="px-3.5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
          >
            <Mic className="w-4 h-4 animate-pulse text-amber-300" />
            बोलकर भाव पूछें
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
          🏪 मंडीवार भाव सूची (Mandi Rates Table)
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
          📈 AI मूल्य सूझबूझ व 7-दिन भविष्यवाणी (AI Intelligence)
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
                placeholder="मंडी या जिले का नाम खोजें..."
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
                    {c.nameHi}
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
                <h3 className="text-base font-bold text-gray-800">कोई मंडी परिणाम नहीं मिला</h3>
                <p className="text-xs text-gray-500 mt-1">कृपया फ़िल्टर या खोज शब्द बदलें।</p>
              </div>
            ) : (
              filteredMandis.map((mandi) => (
                <div
                  key={mandi.id}
                  className="bg-white rounded-3xl p-5 border border-gray-200 shadow-xs hover:border-emerald-400 hover:shadow-md transition space-y-4"
                >
                  {/* Mandi Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-extrabold text-gray-900">{mandi.nameHi}</h3>
                        <span className="text-[11px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded-md border border-emerald-200">
                          {mandi.state}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mt-1">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                          दूरी: <strong>{mandi.distanceKm} किमी</strong>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Truck className="w-3.5 h-3.5 text-amber-600" />
                          अनुमानित भाड़ा: <strong>₹{mandi.transportCostPerQtl}/क्विंटल</strong>
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-blue-600" />
                          समय: {mandi.timings}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        playChime();
                        setComparisonModalOpen(true);
                      }}
                      className="text-xs font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-xl transition self-start sm:self-auto cursor-pointer"
                    >
                      तुलना में जोड़ें +
                    </button>
                  </div>

                  {/* Crop Prices Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="bg-gray-50 text-gray-600 font-bold border-y border-gray-100">
                          <th className="py-2.5 px-3">फसल व किस्म</th>
                          <th className="py-2.5 px-3">{t.minPrice}</th>
                          <th className="py-2.5 px-3">{t.maxPrice}</th>
                          <th className="py-2.5 px-3 text-emerald-800">{t.modalPrice}</th>
                          <th className="py-2.5 px-3">{t.priceTrend}</th>
                          <th className="py-2.5 px-3">{t.arrivalVolume}</th>
                          <th className="py-2.5 px-3">गुणवत्ता मानक</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100 font-medium">
                        {mandi.cropPrices
                          .filter((cp) => selectedCrop === "all" || cp.cropId === selectedCrop)
                          .map((price, i) => (
                            <tr key={i} className="hover:bg-emerald-50/50 transition">
                              <td className="py-3 px-3">
                                <div className="font-bold text-gray-900">{price.cropNameHi}</div>
                                <div className="text-[11px] text-gray-500">{price.variety}</div>
                              </td>
                              <td className="py-3 px-3 text-gray-700">₹{price.minPrice}</td>
                              <td className="py-3 px-3 text-gray-700">₹{price.maxPrice}</td>
                              <td className="py-3 px-3 font-black text-sm text-emerald-700">
                                ₹{price.modalPrice}
                              </td>
                              <td className="py-3 px-3">
                                <span
                                  className={`inline-flex items-center gap-1 font-bold text-xs px-2 py-0.5 rounded-md ${
                                    price.trend === "up"
                                      ? "bg-emerald-100 text-emerald-800"
                                      : price.trend === "down"
                                      ? "bg-rose-100 text-rose-800"
                                      : "bg-gray-100 text-gray-800"
                                  }`}
                                >
                                  {price.trend === "up" ? (
                                    <TrendingUp className="w-3 h-3" />
                                  ) : price.trend === "down" ? (
                                    <TrendingDown className="w-3 h-3" />
                                  ) : (
                                    <Minus className="w-3 h-3" />
                                  )}
                                  {price.changePercent > 0 ? "+" : ""}
                                  {price.changePercent}%
                                </span>
                              </td>
                              <td className="py-3 px-3 text-gray-800">
                                {price.arrivalTodayQtl} क्विंटल
                              </td>
                              <td className="py-3 px-3 text-[11px] text-gray-500 max-w-xs truncate" title={price.qualityRequirement}>
                                {price.qualityRequirement}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* AI Price Intelligence & 7-Day Forecasting Tab */}
      {activeTab === "intelligence" && (
        <div className="space-y-6">
          {/* Crop Selector Pills */}
          <div className="flex flex-wrap gap-2">
            {cropsList.map((c) => {
              const isSelected = selectedCropForIntel === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCropForIntel(c.id)}
                  className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-extrabold transition cursor-pointer ${
                    isSelected
                      ? "bg-emerald-600 text-white shadow-md"
                      : "bg-white text-gray-800 border border-gray-200 hover:bg-emerald-50"
                  }`}
                >
                  {c.nameHi}
                </button>
              );
            })}
          </div>

          {/* AI Decision Box */}
          <div className="bg-gradient-to-br from-emerald-900 to-teal-950 text-white p-6 rounded-3xl shadow-xl space-y-4 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs uppercase font-extrabold text-emerald-300 tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  {t.aiRecommendationTitle} ({activeIntelCrop.nameHi})
                </span>
                <h3 className="text-2xl font-black text-white mt-1">
                  AI स्पष्ट फैसला: {activeIntelCrop.aiRecommendation.action.replace(/_/g, " ")}
                </h3>
              </div>

              <div className="bg-white/10 p-3 rounded-2xl border border-white/20 text-center shrink-0">
                <span className="text-[11px] text-emerald-200 block font-semibold">AI विश्वास स्कोर</span>
                <span className="text-2xl font-black text-amber-300">{activeIntelCrop.aiRecommendation.confidence}%</span>
              </div>
            </div>

            <p className="text-sm text-emerald-50 leading-relaxed font-medium bg-white/10 p-4 rounded-2xl border border-white/10">
              💡 {activeIntelCrop.aiRecommendation.reasonHi}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs pt-2">
              <div className="bg-white/10 p-3 rounded-xl">
                <span className="text-emerald-300 block">आज का औसत भाव</span>
                <span className="text-lg font-black text-white">₹{activeIntelCrop.currentAvgModal}</span>
              </div>
              <div className="bg-white/10 p-3 rounded-xl">
                <span className="text-emerald-300 block">7-दिन अनुमानित भाव</span>
                <span className="text-lg font-black text-amber-300">₹{activeIntelCrop.aiRecommendation.targetPriceProjection}</span>
              </div>
              <div className="bg-white/10 p-3 rounded-xl">
                <span className="text-emerald-300 block">30-दिन बदलाव</span>
                <span className="text-lg font-black text-emerald-400">+{activeIntelCrop.thirtyDayTrendPercent}%</span>
              </div>
              <div className="bg-white/10 p-3 rounded-xl">
                <span className="text-emerald-300 block">सरकारी MSP</span>
                <span className="text-lg font-black text-white">₹{activeIntelCrop.msp}</span>
              </div>
            </div>
          </div>

          {/* Historical & AI Forecast Chart Data Visualization */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-base text-gray-900">
                  {activeIntelCrop.nameHi} — 30-दिन ऐतिहासिक भाव एवं 7-दिन AI पूर्वानुमान
                </h3>
                <span className="text-xs text-gray-500">
                  (नीले स्तम्भ = वास्तविक भाव, पीले स्तम्भ = AI अनुमान)
                </span>
              </div>
            </div>

            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 items-end h-56 pt-6 px-2 bg-gray-50 rounded-2xl border border-gray-100">
              {activeIntelCrop.chartData.map((pt, idx) => {
                const heightPct = Math.max(25, Math.min(100, ((pt.price - 2000) / 4500) * 100));
                return (
                  <div key={idx} className="flex flex-col items-center gap-1 h-full justify-end group">
                    <span className="text-[10px] font-bold text-gray-700 group-hover:text-emerald-700">
                      ₹{pt.price}
                    </span>
                    <div
                      style={{ height: `${heightPct}%` }}
                      className={`w-full max-w-[28px] rounded-t-lg transition-all ${
                        pt.projected
                          ? "bg-gradient-to-t from-amber-500 to-amber-300 border-2 border-dashed border-amber-600 animate-pulse"
                          : "bg-gradient-to-t from-emerald-600 to-teal-500"
                      }`}
                    />
                    <span className="text-[10px] text-gray-500 font-semibold truncate max-w-[40px] text-center">
                      {pt.date}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950">
              {t.aiEstimatesDisclaimer}
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <MandiComparisonModal
        isOpen={comparisonModalOpen}
        onClose={() => setComparisonModalOpen(false)}
        defaultCropId={selectedCrop === "all" ? "wheat" : selectedCrop}
      />
      <VoiceMarketQueryModal
        isOpen={voiceModalOpen}
        onClose={() => setVoiceModalOpen(false)}
      />
    </div>
  );
}
