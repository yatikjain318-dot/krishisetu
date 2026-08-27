"use client";

import React, { useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { VERIFIED_BUYERS, VerifiedBuyer } from "@/lib/data/mock-data";
import {
  ShieldCheck,
  Search,
  Filter,
  Sparkles,
  Award,
  PhoneCall,
  Mail,
  MapPin,
  CheckCircle2,
  DollarSign,
  Handshake,
  Star,
  ExternalLink,
  X,
  FileCheck,
} from "lucide-react";
import Link from "next/link";

export default function BuyersPage() {
  const { t, playChime } = useI18n();

  const [activeTab, setActiveTab] = useState<"directory" | "matching">("directory");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedBuyerForModal, setSelectedBuyerForModal] = useState<VerifiedBuyer | null>(null);
  const [sendSuccessMessage, setSendSuccessMessage] = useState<string | null>(null);

  const categories = [
    { id: "all", label: "सभी श्रेणियां (All Categories)" },
    { id: "Food Processing", label: "खाद्य प्रसंस्करण (Food Processing)" },
    { id: "Exporter", label: "निर्यातक (Exporters)" },
    { id: "Retail Chain", label: "रिटेल चेन (Retail Chains)" },
    { id: "Agri-Processing Unit", label: "तेल व दाल मिल (Agri Processing)" },
    { id: "Govt Procurement", label: "सरकारी खरीद (MSP Centers)" },
  ];

  const filteredBuyers = VERIFIED_BUYERS.filter((b) => {
    const matchesCategory = selectedCategory === "all" || b.category === selectedCategory;
    const matchesSearch =
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.crops.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase())) ||
      b.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const bestMatches = [...VERIFIED_BUYERS].sort((a, b) => b.matchScore - a.matchScore);

  const handleSendLotProposal = (buyerName: string) => {
    playChime();
    setSendSuccessMessage(`आपका डिजिटल लॉट ${buyerName} को सफलतापूर्वक भेजा गया! 24 घंटे में एस्क्रो ऑफर प्राप्त होगा।`);
    setTimeout(() => {
      setSendSuccessMessage(null);
      setSelectedBuyerForModal(null);
    }, 2800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 flex items-center gap-2">
              <ShieldCheck className="w-8 h-8 text-emerald-600" />
              {t.verifiedBuyerMarketplace}
            </h1>
            <span className="bg-amber-100 text-amber-900 text-xs font-black px-2.5 py-0.5 rounded-full border border-amber-300">
              100% KYC Verified
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            ITC, रिलायंस, अडानी, पतंजलि, डाबर एवं सरकारी एजेंसियों से सीधे जुड़ें • 24-घंटे में एस्क्रो सुरक्षित भुगतान
          </p>
        </div>

        <Link
          href="/my-crops"
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          अपनी फसल का लॉट बनाएं
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 gap-4">
        <button
          onClick={() => setActiveTab("directory")}
          className={`pb-3 text-sm font-extrabold transition border-b-2 cursor-pointer ${
            activeTab === "directory"
              ? "border-emerald-600 text-emerald-700"
              : "border-transparent text-gray-500 hover:text-gray-900"
          }`}
        >
          🏭 सभी सत्यापित खरीदार सूची ({VERIFIED_BUYERS.length})
        </button>
        <button
          onClick={() => setActiveTab("matching")}
          className={`pb-3 text-sm font-extrabold transition border-b-2 cursor-pointer flex items-center gap-1.5 ${
            activeTab === "matching"
              ? "border-emerald-600 text-emerald-700"
              : "border-transparent text-gray-500 hover:text-gray-900"
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          ✨ आपके लिए स्मार्ट AI मैच (Smart Matches)
        </button>
      </div>

      {/* DIRECTORY TAB */}
      {activeTab === "directory" && (
        <div className="space-y-6">
          {/* Filter Toolbar */}
          <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="कंपनी या फसल का नाम खोजें (उदा. ITC, Wheat, Mustard)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs sm:text-sm font-medium text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs sm:text-sm font-bold text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-end text-xs font-semibold text-gray-500">
              कुल {filteredBuyers.length} खरीदार उपलब्ध
            </div>
          </div>

          {/* Buyers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredBuyers.map((buyer) => (
              <div
                key={buyer.id}
                className="bg-white rounded-3xl p-5 border border-gray-200 hover:border-emerald-500 shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between space-y-4 relative"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2.5 py-1 rounded-md border border-emerald-300 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> {buyer.badge}
                    </span>
                    <span className="text-xs font-bold text-amber-600 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" /> {buyer.rating} ({buyer.ratingCount})
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base text-gray-900 leading-snug">{buyer.name}</h3>
                  <p className="text-xs text-gray-500 font-medium">{buyer.categoryHi}</p>

                  {/* Requirements & Pricing Details */}
                  <div className="mt-3.5 space-y-2 text-xs bg-gray-50 p-3.5 rounded-2xl border border-gray-100">
                    <div className="flex justify-between">
                      <span className="text-gray-500 font-semibold">वांछित फसलें:</span>
                      <span className="font-bold text-gray-900">{buyer.cropNamesHi.join(", ")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 font-semibold">आवश्यक मात्रा:</span>
                      <span className="font-bold text-gray-900">{buyer.requiredQtyTons} टन (न्यूनतम {buyer.minPurchaseQtl} क्विंटल)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 font-semibold">प्रस्तावित भाव:</span>
                      <span className="font-black text-emerald-700 text-sm">{buyer.offeredPriceRange}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500 font-semibold">भुगतान शर्तें:</span>
                      <span className="font-bold text-blue-900 text-right">{buyer.paymentTermsHi}</span>
                    </div>
                  </div>

                  <div className="mt-3 text-[11px] text-gray-500 flex items-center justify-between">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-gray-400" /> {buyer.location}
                    </span>
                    <span className="font-bold text-emerald-700">विवाद दर: {buyer.disputeRate}</span>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="pt-2 flex items-center gap-2">
                  <button
                    onClick={() => setSelectedBuyerForModal(buyer)}
                    className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition shadow-xs cursor-pointer flex items-center justify-center gap-1"
                  >
                    <Handshake className="w-3.5 h-3.5" /> प्रोफ़ाइल व सौदा प्रस्ताव
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SMART MATCHING TAB ("Best Matches For You") */}
      {activeTab === "matching" && (
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-emerald-900 to-teal-950 text-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs uppercase font-extrabold text-emerald-300 tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-300" />
                AI एल्गोरिदम स्मार्ट मैचमेकिंग
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                आपकी फसल व स्थान के आधार पर सर्वश्रेष्ठ खरीदार मैच
              </h3>
              <p className="text-xs text-emerald-200 leading-relaxed">
                फसल प्रकार, गुणवत्ता ग्रेड, खेत की दूरी, उच्चतम भाव और एस्क्रो भुगतान विश्वसनीयता के आधार पर रैंकिंग।
              </p>
            </div>
            <Link
              href="/my-crops"
              className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-xs rounded-xl shadow-md transition shrink-0"
            >
              नया लॉट बनाएं
            </Link>
          </div>

          <div className="space-y-4">
            {bestMatches.map((buyer, rank) => (
              <div
                key={buyer.id}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-emerald-200 shadow-sm hover:shadow-lg transition space-y-4 relative"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  {/* Left info */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-black text-xs flex items-center justify-center border border-emerald-300">
                        #{rank + 1}
                      </span>
                      <h3 className="text-lg font-extrabold text-gray-900">{buyer.name}</h3>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-2 py-0.5 rounded-md">
                        ✓ Verified
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600">
                      <span>मांग: <strong>{buyer.cropNamesHi.join(", ")}</strong></span>
                      <span>•</span>
                      <span>प्रस्तावित भाव: <strong className="text-emerald-700 text-sm">{buyer.offeredPriceRange}</strong></span>
                      <span>•</span>
                      <span>दूरी: <strong>{buyer.distanceKm} किमी</strong></span>
                      <span>•</span>
                      <span>सफल व्यापार: <strong>{buyer.completedTrades}+ सौदे</strong></span>
                    </div>
                  </div>

                  {/* Match Score Badge */}
                  <div className="flex items-center gap-4">
                    <div className="bg-emerald-50 border-2 border-emerald-500 rounded-2xl p-3 text-center min-w-[120px]">
                      <span className="text-[10px] text-emerald-800 font-bold uppercase block">
                        AI मैच स्कोर
                      </span>
                      <span className="text-2xl font-black text-emerald-700">
                        {buyer.matchScore}%
                      </span>
                      <span className="text-[10px] text-emerald-600 font-semibold block">उत्तम मेल ✓</span>
                    </div>

                    <button
                      onClick={() => setSelectedBuyerForModal(buyer)}
                      className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition shrink-0 cursor-pointer"
                    >
                      सीधे सौदा करें
                    </button>
                  </div>
                </div>

                {/* Match Factors Breakdown */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-gray-100 text-xs">
                  {buyer.matchFactors.map((f, fi) => (
                    <div key={fi} className="bg-gray-50 p-2 rounded-xl border border-gray-100">
                      <div className="flex justify-between text-[11px] font-bold text-gray-700">
                        <span>{f.label}</span>
                        <span className="text-emerald-700">{f.score}%</span>
                      </div>
                      <div className="w-full bg-gray-200 h-1.5 rounded-full mt-1 overflow-hidden">
                        <div
                          style={{ width: `${f.score}%` }}
                          className="bg-emerald-600 h-full rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Buyer Detailed Profile & Direct Offer Modal */}
      {selectedBuyerForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-emerald-100 flex flex-col">
            {/* Header */}
            <div className="p-5 bg-gradient-to-r from-emerald-800 to-teal-800 text-white flex items-center justify-between rounded-t-3xl">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6 text-amber-300" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base">{selectedBuyerForModal.name}</h3>
                  <span className="text-xs text-emerald-200">
                    {selectedBuyerForModal.categoryHi} • {selectedBuyerForModal.badge}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedBuyerForModal(null)}
                className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="p-5 space-y-4 flex-1">
              {sendSuccessMessage && (
                <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-950 font-bold text-xs rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  {sendSuccessMessage}
                </div>
              )}

              {/* KYC Verification Card */}
              <div className="bg-emerald-50/70 border border-emerald-200 p-4 rounded-2xl space-y-2 text-xs">
                <div className="flex items-center justify-between font-bold text-emerald-950">
                  <span className="flex items-center gap-1.5">
                    <FileCheck className="w-4 h-4 text-emerald-700" />
                    सरकारी व्यापार एवं KYC विवरण (Verified)
                  </span>
                  <span className="bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded text-[10px]">
                    100% Verified
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-gray-700 pt-1">
                  <div>GSTIN: <span className="font-mono font-bold text-gray-900">{selectedBuyerForModal.gstin}</span></div>
                  <div>FSSAI: <span className="font-mono font-bold text-gray-900">{selectedBuyerForModal.fssai}</span></div>
                  <div>सफल लेनदेन: <span className="font-bold text-gray-900">{selectedBuyerForModal.completedTrades}+</span></div>
                  <div>विवाद इतिहास: <span className="font-bold text-emerald-700">{selectedBuyerForModal.disputeRate} (Zero Disputes)</span></div>
                </div>
              </div>

              {/* Requirements */}
              <div className="space-y-2 text-xs">
                <h4 className="font-extrabold text-gray-900 uppercase tracking-wider">
                  खरीद आवश्यकता एवं विशिष्टताएं (Quality Specs):
                </h4>
                <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-gray-500">फसल व किस्में:</span>
                    <span className="font-bold text-gray-900">{selectedBuyerForModal.cropNamesHi.join(", ")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">गुणवत्ता ग्रेड:</span>
                    <span className="font-bold text-emerald-800">{selectedBuyerForModal.preferredGrade}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">प्रस्तावित भाव:</span>
                    <span className="font-black text-emerald-700 text-sm">{selectedBuyerForModal.offeredPriceRange}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">भुगतान प्रक्रिया:</span>
                    <span className="font-bold text-blue-900">{selectedBuyerForModal.paymentTerms}</span>
                  </div>
                </div>
              </div>

              {/* Official Contact Info */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <a
                  href={`tel:${selectedBuyerForModal.contactPhone}`}
                  className="p-3 rounded-xl bg-gray-50 hover:bg-emerald-50 border border-gray-200 flex items-center gap-2 font-bold text-gray-800 transition"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-600" />
                  {selectedBuyerForModal.contactPhone}
                </a>
                <a
                  href={`mailto:${selectedBuyerForModal.contactEmail}`}
                  className="p-3 rounded-xl bg-gray-50 hover:bg-emerald-50 border border-gray-200 flex items-center gap-2 font-bold text-gray-800 transition truncate"
                >
                  <Mail className="w-4 h-4 text-blue-600" />
                  {selectedBuyerForModal.contactEmail}
                </a>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 bg-gray-50 border-t border-gray-200 rounded-b-3xl flex items-center justify-between">
              <button
                onClick={() => setSelectedBuyerForModal(null)}
                className="text-xs font-bold text-gray-600 hover:text-gray-900 px-4 py-2 cursor-pointer"
              >
                बंद करें
              </button>

              <button
                onClick={() => handleSendLotProposal(selectedBuyerForModal.name)}
                className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs rounded-xl shadow-md transition cursor-pointer flex items-center gap-1.5"
              >
                <Handshake className="w-4 h-4 text-amber-300" />
                मेरी फसल का लॉट भेजें (Send My Lot)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
