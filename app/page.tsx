"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import {
  MANDIS_DATA,
  CROPS_INTELLIGENCE,
  VERIFIED_BUYERS,
  INITIAL_LOTS,
  INITIAL_OFFERS,
  ACTIVE_SHIPMENTS,
  WAREHOUSES_DATA,
  TRANSACTIONS_DATA,
  GRIEVANCES_DATA,
  FPO_DATA,
  CropLot,
  DigitalOffer,
  ShipmentTracker,
  GrievanceCase,
  VerifiedBuyer,
} from "@/lib/data/mock-data";
import { VoiceMarketQueryModal } from "@/components/voice-market-query-modal";
import { MandiComparisonModal } from "@/components/mandi-comparison-modal";
import { SellVsStoreCalculator } from "@/components/sell-vs-store-calculator";
import { AIQualityScannerModal, QualityScanResult } from "@/components/ai-quality-scanner-modal";
import { QRLotModal } from "@/components/qr-lot-modal";
import { NegotiationModal } from "@/components/negotiation-modal";
import { VoiceAssistant } from "@/components/voice-assistant";
import { AdminDashboardClient } from "./admin/admin-client";
import {
  Search,
  Mic,
  TrendingUp,
  ShieldCheck,
  Sprout,
  Camera,
  Warehouse,
  Truck,
  Users,
  Bot,
  ArrowRight,
  Sparkles,
  Scale,
  Award,
  CheckCircle2,
  Lock,
  PhoneCall,
  DollarSign,
  Handshake,
  CreditCard,
  AlertTriangle,
  FileCheck,
  LayoutDashboard,
  Layers,
  MapPin,
  Calendar,
  Navigation,
  Microscope,
  UserPlus,
  Plus,
} from "lucide-react";

export default function HomePage() {
  const { t, currentLanguage, playChime } = useI18n();

  // Active Unified Module Tab
  const [activeModule, setActiveModule] = useState<
    | "overview"
    | "prices"
    | "buyers"
    | "lots"
    | "quality"
    | "offers"
    | "transport"
    | "storage"
    | "payments"
    | "disputes"
    | "fpo"
    | "assistant"
    | "transparency"
    | "admin"
  >("overview");

  // Modals state
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const [comparisonModalOpen, setComparisonModalOpen] = useState(false);
  const [qualityScannerOpen, setQualityScannerOpen] = useState(false);
  const [qrModalLot, setQrModalLot] = useState<CropLot | null>(null);
  const [selectedOfferForModal, setSelectedOfferForModal] = useState<DigitalOffer | null>(null);

  // Search & Spotlight Crop
  const [searchCrop, setSearchCrop] = useState("");
  const [selectedCropQuickId, setSelectedCropQuickId] = useState("wheat");

  // Lots state
  const [lots, setLots] = useState<CropLot[]>(INITIAL_LOTS);
  const [newLotCrop, setNewLotCrop] = useState("Wheat (Sharbati)");
  const [newLotQty, setNewLotQty] = useState(50);
  const [newLotPrice, setNewLotPrice] = useState(2700);

  // Offers state
  const [offers, setOffers] = useState<DigitalOffer[]>(INITIAL_OFFERS);

  // Shipments state
  const [shipments, setShipments] = useState<ShipmentTracker[]>(ACTIVE_SHIPMENTS);

  // Grievances state
  const [grievances, setGrievances] = useState<GrievanceCase[]>(GRIEVANCES_DATA);

  // FPO state
  const [selectedFpo, setSelectedFpo] = useState(FPO_DATA[0]);

  // Toast
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const activeCropIntel =
    CROPS_INTELLIGENCE.find((c) => c.id === selectedCropQuickId) || CROPS_INTELLIGENCE[0];

  const quickCrops = [
    { id: "wheat", name: "Wheat (Sharbati)", icon: "🌾", price: "₹2,650", trend: "+5.8%" },
    { id: "mustard", name: "Mustard (Sarson)", icon: "🟡", price: "₹5,820", trend: "+3.2%" },
    { id: "soybean", name: "Soybean", icon: "🌱", price: "₹4,720", trend: "+2.9%" },
    { id: "cotton", name: "Cotton (Kapas)", icon: "⚪", price: "₹7,450", trend: "-1.2%" },
    { id: "paddy", name: "Basmati Paddy", icon: "🍚", price: "₹4,050", trend: "+4.5%" },
    { id: "onion", name: "Onion (Nashik)", icon: "🧅", price: "₹1,750", trend: "+8.2%" },
  ];

  const allModulesList = [
    { id: "overview", label: "🌾 Home & AI Spotlight", icon: LayoutDashboard },
    { id: "prices", label: "📊 Mandi Prices & Forecast", icon: TrendingUp },
    { id: "buyers", label: "🏢 Verified Buyers & Match", icon: ShieldCheck },
    { id: "lots", label: "📦 Digital Lots & QR", icon: Sprout },
    { id: "quality", label: "🔬 AI Quality Scanner", icon: Camera },
    { id: "offers", label: "🤝 Negotiation Room", icon: Handshake },
    { id: "transport", label: "🚚 Logistics & GPS Track", icon: Truck },
    { id: "storage", label: "🏬 Storage & ROI Engine", icon: Warehouse },
    { id: "payments", label: "💳 7-Stage Payments", icon: CreditCard },
    { id: "disputes", label: "⚖️ Dispute Redressal", icon: AlertTriangle },
    { id: "fpo", label: "👥 FPO Bulk Aggregation", icon: Users },
    { id: "assistant", label: "🎙️ AI Voice Assistant", icon: Bot },
    { id: "transparency", label: "📜 Transparency Ledger", icon: FileCheck },
    { id: "admin", label: "🛡️ Master Admin", icon: Lock },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-20 right-6 z-50 p-4 bg-emerald-900 text-white border border-emerald-500 font-bold text-sm rounded-2xl shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom-5">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          {toastMsg}
        </div>
      )}

      {/* TOP UNIFIED MODULE NAV SWITCHER (All-in-One Bar) */}
      <div className="bg-white rounded-3xl p-3 border border-emerald-200 shadow-lg">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-gray-100 px-2">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-black text-emerald-950 uppercase tracking-wider">
              KrishiSetu Unified Ecosystem Hub
            </span>
          </div>
          <span className="text-[11px] font-bold text-gray-500">14 Core Modules on 1 Single URL</span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          {allModulesList.map((m) => {
            const Icon = m.icon;
            const isActive = activeModule === m.id;
            return (
              <button
                key={m.id}
                onClick={() => {
                  playChime();
                  setActiveModule(m.id as any);
                }}
                className={`px-3.5 py-2 rounded-2xl text-xs font-extrabold transition shrink-0 flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30 scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-emerald-50 hover:text-emerald-900"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{m.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODULE 1: OVERVIEW & HOME SPOTLIGHT */}
      {/* ========================================================================= */}
      {activeModule === "overview" && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* HERO BANNER WITH VOICE QUERY */}
          <div className="bg-gradient-to-br from-emerald-900 via-emerald-950 to-teal-950 rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-emerald-800 space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 bg-white/10 text-amber-300 text-xs font-black px-3.5 py-1 rounded-full border border-white/10">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>12 Indian Languages • AI Price Forecasting • 100% Verified Buyers</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                  Farmer Produce, <br className="hidden sm:inline" />
                  <span className="text-amber-400">Right Price & Direct Buyers</span>
                </h1>
                <p className="text-sm sm:text-base text-emerald-100 font-medium leading-relaxed">
                  Eliminating middleman information asymmetry. Real-time Mandi rates, 7-day AI forecast, verified corporate buyers (ITC, Reliance), digital lots, and escrow-backed payments — all in one place.
                </p>
              </div>

              {/* Big Voice Query Action Button */}
              <div className="shrink-0 flex flex-col items-center sm:items-end gap-3">
                <button
                  onClick={() => {
                    playChime();
                    setVoiceModalOpen(true);
                  }}
                  className="w-full sm:w-auto px-6 py-4 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-amber-950 font-black text-sm sm:text-base rounded-2xl shadow-xl transition transform hover:scale-105 flex items-center justify-center gap-3 cursor-pointer"
                >
                  <Mic className="w-6 h-6 animate-pulse text-amber-950" />
                  <span>{t.voiceAskBtn} (Ask by Voice)</span>
                </button>
                <span className="text-xs text-emerald-300 font-medium">
                  🎙️ Speak in your native language for prices, buyers, or storage gains
                </span>
              </div>
            </div>

            {/* Quick Crop Ticker Chips */}
            <div className="pt-4 border-t border-white/10">
              <div className="text-xs font-bold text-emerald-300 mb-2.5">
                ⚡ Today&apos;s Modal Price for Major Crops (Quick Spotlight):
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                {quickCrops.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCropQuickId(c.id)}
                    className={`p-2.5 rounded-2xl border text-left transition cursor-pointer ${
                      selectedCropQuickId === c.id
                        ? "bg-amber-400 text-amber-950 border-amber-300 font-black shadow-md"
                        : "bg-white/10 text-white border-white/10 hover:bg-white/20"
                    }`}
                  >
                    <div className="text-xs truncate">{c.icon} {c.name}</div>
                    <div className="text-base font-black mt-1 font-mono">{c.price}</div>
                    <div className="text-[10px] text-emerald-300 font-bold">{c.trend} ↗</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* AI PRICE INTELLIGENCE SPOTLIGHT CARD */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-lg space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-5">
              <div>
                <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                  🤖 AI Price Intelligence Spotlight
                </span>
                <h2 className="text-2xl font-black text-gray-900 mt-2">
                  {activeCropIntel.name} ({activeCropIntel.variety})
                </h2>
                <p className="text-xs text-gray-500 mt-0.5">
                  Govt MSP: <strong>₹{activeCropIntel.msp}/qtl</strong> • Today&apos;s Modal Average: <strong>₹{activeCropIntel.currentAvgModal}/qtl</strong>
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setComparisonModalOpen(true)}
                  className="px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-xs rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Scale className="w-4 h-4 text-emerald-700" />
                  Compare Mandis (मंडी तुलना)
                </button>
              </div>
            </div>

            {/* AI Decision Alert Box */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-400 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs font-black text-emerald-900 uppercase tracking-wider">
                  AI Recommendation:
                </div>
                <div className="text-lg font-black text-emerald-950">
                  💡 {activeCropIntel.aiRecommendation.action.replace(/_/g, " ")} — {activeCropIntel.aiRecommendation.reasonHi}
                </div>
                <div className="text-xs text-emerald-800">
                  Confidence Score: <strong>{activeCropIntel.aiRecommendation.confidenceScore}%</strong>
                </div>
              </div>

              <button
                onClick={() => setActiveModule("storage")}
                className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-xs shrink-0 cursor-pointer"
              >
                Open Storage ROI Calculator →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODULE 2: MANDI PRICES & COMPARISON */}
      {/* ========================================================================= */}
      {activeModule === "prices" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
            <div>
              <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                <TrendingUp className="w-7 h-7 text-emerald-600" />
                Mandi Prices & 7-Day AI Price Forecast
              </h2>
              <p className="text-xs text-gray-500">Live modal rates and daily arrival volumes across 16+ national APMC mandis</p>
            </div>
            <button
              onClick={() => setComparisonModalOpen(true)}
              className="px-5 py-2.5 bg-emerald-600 text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <Scale className="w-4 h-4" />
              Mandi Freight & Net Realization Tool
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {MANDIS_DATA.map((mandi) => (
              <div key={mandi.id} className="bg-white rounded-3xl p-5 border border-gray-200 hover:border-emerald-500 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full">
                    {mandi.distanceKm} km away
                  </span>
                  <span className="text-xs text-gray-500 font-bold font-mono">Arrival: {mandi.arrivalVolumeQtl} Qtl</span>
                </div>
                <div>
                  <h3 className="text-lg font-black text-gray-900">{mandi.name}</h3>
                  <p className="text-xs text-gray-500">{mandi.district}, {mandi.state}</p>
                </div>
                <div className="space-y-1.5 pt-2 border-t border-gray-100 text-xs">
                  {mandi.cropPrices.map((cp, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-gray-50 p-2 rounded-xl">
                      <span className="font-bold text-gray-800">{cp.cropName}</span>
                      <span className="font-black text-emerald-700 font-mono">₹{cp.modalPrice} <span className="text-[10px] text-gray-400 font-normal">/qtl</span></span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODULE 3: VERIFIED BUYERS */}
      {/* ========================================================================= */}
      {activeModule === "buyers" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
              <ShieldCheck className="w-7 h-7 text-amber-600" />
              100% KYC Verified Corporate & Institutional Buyers
            </h2>
            <p className="text-xs text-gray-500">ITC Agri, Reliance Retail, Nestlé, Adani Wilmar & certified processors</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {VERIFIED_BUYERS.map((buyer) => (
              <div key={buyer.id} className="bg-white rounded-3xl p-6 border border-gray-200 hover:border-amber-400 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 font-black px-2.5 py-0.5 rounded-full">
                    ✓ {buyer.kycStatus}
                  </span>
                  <span className="text-xs font-bold text-amber-600">⭐ {buyer.rating} ({buyer.completedTrades}+ trades)</span>
                </div>
                <div>
                  <h3 className="text-lg font-black text-gray-900">{buyer.name}</h3>
                  <p className="text-xs text-gray-500">{buyer.category} • 📍 {buyer.location}</p>
                </div>
                <div className="bg-amber-50/60 p-3 rounded-2xl border border-amber-200 text-xs space-y-1">
                  <div className="font-bold text-amber-950">Demand: {buyer.requiredCrops.join(", ")}</div>
                  <div className="text-gray-600">Payment: <strong>{buyer.paymentTerms}</strong> • AI Match: <strong className="text-emerald-700">{buyer.matchScore}%</strong></div>
                </div>
                <button
                  onClick={() => {
                    playChime();
                    showToast(`Your lot profile was sent to ${buyer.name}!`);
                  }}
                  className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-xs rounded-xl shadow-xs cursor-pointer"
                >
                  Connect with Buyer (सीधा प्रस्ताव भेजें)
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODULE 4: MY LOTS & QR PASSPORT */}
      {/* ========================================================================= */}
      {activeModule === "lots" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
            <div>
              <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                <Sprout className="w-7 h-7 text-emerald-600" />
                My Harvest Listings & Digital QR Passports (Digital Lots)
              </h2>
              <p className="text-xs text-gray-500">Crop listing, moisture and quality parameters with printable QR passports</p>
            </div>
            <button
              onClick={() => {
                const newCode = `LOT-WHT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
                const created: CropLot = {
                  id: `lot-${Date.now()}`,
                  lotCode: newCode,
                  cropName: newLotCrop,
                  variety: "Sharbati Super",
                  quantityQtl: newLotQty,
                  expectedPricePerQtl: newLotPrice,
                  moisturePercent: 11.2,
                  foreignMatterPercent: 0.5,
                  qualityGrade: "Grade A",
                  farmLocation: "Morija, Chomu",
                  status: "ACTIVE",
                  createdAt: "Today",
                  qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=LOT-WHT-2026",
                };
                setLots([created, ...lots]);
                showToast(`New lot ${newCode} successfully created!`);
              }}
              className="px-5 py-2.5 bg-emerald-600 text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Create New Digital Lot
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {lots.map((lot) => (
              <div key={lot.id} className="bg-white rounded-3xl p-6 border border-gray-200 hover:border-emerald-500 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-md">
                    {lot.lotCode}
                  </span>
                  <span className="text-xs bg-emerald-600 text-white font-bold px-2.5 py-0.5 rounded-full">
                    {lot.qualityGrade}
                  </span>
                </div>
                <h3 className="text-lg font-black text-gray-900">{lot.cropName}</h3>
                <div className="grid grid-cols-2 gap-2 text-xs bg-gray-50 p-3 rounded-2xl">
                  <div>Quantity: <strong>{lot.quantityQtl} Quintals</strong></div>
                  <div>Expected Price: <strong>₹{lot.expectedPricePerQtl}/qtl</strong></div>
                  <div>Moisture: <strong>{lot.moisturePercent}%</strong></div>
                  <div>Location: <strong>{lot.farmLocation}</strong></div>
                </div>
                <button
                  onClick={() => setQrModalLot(lot)}
                  className="w-full py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold text-xs rounded-xl border border-emerald-300 cursor-pointer"
                >
                  📱 View & Print QR Passport
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODULE 5: QUALITY SCANNER */}
      {/* ========================================================================= */}
      {activeModule === "quality" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="border-b border-gray-200 pb-4 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                <Microscope className="w-7 h-7 text-emerald-600" />
                AI Grain Quality Scanner & Certified Testing Labs
              </h2>
              <p className="text-xs text-gray-500">Analyze camera photos in 10s for moisture, foreign matter, and Grade A certification</p>
            </div>
            <button
              onClick={() => setQualityScannerOpen(true)}
              className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-extrabold text-xs rounded-xl shadow-md cursor-pointer"
            >
              Scan Crop Photo 📷
            </button>
          </div>

          <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-8 space-y-4 border border-emerald-800">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-amber-300">Latest AI Scan Result: Wheat (Sharbati Gold)</h3>
              <span className="bg-emerald-500 text-white text-xs font-black px-3 py-1 rounded-full">Grade A (95/100)</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
              <div className="bg-white/10 p-3 rounded-2xl"><span className="text-emerald-300 block">Moisture</span><span className="text-2xl font-black">11.2%</span></div>
              <div className="bg-white/10 p-3 rounded-2xl"><span className="text-emerald-300 block">Foreign Matter</span><span className="text-2xl font-black">0.4%</span></div>
              <div className="bg-white/10 p-3 rounded-2xl"><span className="text-emerald-300 block">Broken Grain</span><span className="text-2xl font-black">1.1%</span></div>
              <div className="bg-white/10 p-3 rounded-2xl"><span className="text-emerald-300 block">Color Score</span><span className="text-2xl font-black text-amber-300">95%</span></div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODULE 6: OFFERS & NEGOTIATION */}
      {/* ========================================================================= */}
      {activeModule === "offers" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
              <Handshake className="w-7 h-7 text-emerald-600" />
              Digital Negotiation Room & Escrow Agreements
            </h2>
            <p className="text-xs text-gray-500">Live buyer offers, instant counter-offers, and automated escrow order creation</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {offers.map((offer) => (
              <div key={offer.id} className="bg-white rounded-3xl p-6 border border-gray-200 hover:border-emerald-400 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-gray-500 font-bold">{offer.lotCode}</span>
                  <span className="text-xs font-black bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full">{offer.offerStatus}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-black text-base text-gray-900">{offer.cropName}</h3>
                    <p className="text-xs text-gray-500">Buyer: <strong>{offer.buyerName}</strong></p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-emerald-700">₹{offer.offeredPrice}</span>
                    <span className="text-[10px] text-gray-400 block">/ quintal</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedOfferForModal(offer)}
                  className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-xs rounded-xl shadow-xs cursor-pointer"
                >
                  Open Negotiation Room (मोलभाव करें)
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODULE 7: LOGISTICS & TRANSPORT */}
      {/* ========================================================================= */}
      {activeModule === "transport" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
              <Truck className="w-7 h-7 text-emerald-600" />
              Agri Logistics Booking & Live GPS Shipment Tracking
            </h2>
            <p className="text-xs text-gray-500">Farm-to-hub fleet booking with transparent ₹/km rates and real-time GPS milestones</p>
          </div>

          {shipments.map((ship) => (
            <div key={ship.id} className="bg-white rounded-3xl p-6 border border-emerald-200 shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono font-black text-xs text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-md">{ship.shipmentCode}</span>
                <span className="text-xs bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-md animate-pulse">🚚 In Transit (रास्ते में)</span>
              </div>
              <h3 className="text-lg font-black text-gray-900">{ship.cropName} ({ship.quantityQtl} Quintals)</h3>
              <p className="text-xs text-gray-600">Vehicle: <strong>{ship.vehicleNumber}</strong> • Driver: <strong>{ship.driverPhone}</strong></p>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs pt-2">
                {ship.milestones.map((m, i) => (
                  <div key={i} className={`p-2 rounded-xl text-center border ${m.done ? "bg-emerald-50 border-emerald-300 text-emerald-950 font-bold" : "bg-gray-50 border-gray-200 text-gray-400"}`}>
                    <div className="text-[11px] truncate">{m.title}</div>
                    <span className="text-[10px] text-gray-500 block mt-0.5">{m.time}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODULE 8: WAREHOUSE & ROI CALCULATOR */}
      {/* ========================================================================= */}
      {activeModule === "storage" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
              <Warehouse className="w-7 h-7 text-purple-600" />
              Scientific Warehouses & &ldquo;Sell Now vs Store Later&rdquo; ROI Engine
            </h2>
            <p className="text-xs text-gray-500">WDRA accredited silos, 75% e-NWR pledge loans, and storage profit analysis</p>
          </div>
          <SellVsStoreCalculator />
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODULE 9: PAYMENTS & ESCROW */}
      {/* ========================================================================= */}
      {activeModule === "payments" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
              <CreditCard className="w-7 h-7 text-emerald-600" />
              Transparent 7-Step Payment & Escrow Settlement Tracker
            </h2>
            <p className="text-xs text-gray-500">Auditable payment timeline with bank UTR numbers and official receipts</p>
          </div>

          <div className="space-y-4">
            {TRANSACTIONS_DATA.map((txn) => (
              <div key={txn.id} className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-gray-600">{txn.txnCode}</span>
                  <span className="text-2xl font-black text-emerald-700">₹{txn.totalAmount.toLocaleString("en-IN")}</span>
                </div>
                <h3 className="font-bold text-gray-900">{txn.crop} ({txn.quantityQtl} Qtl) — {txn.buyerName}</h3>
                <p className="text-xs text-emerald-700 font-bold">✓ Extra Farmer Gain: +₹{txn.extraRealization.toLocaleString("en-IN")} • UTR: {txn.utrNumber}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODULE 10: DISPUTES REDRESSAL */}
      {/* ========================================================================= */}
      {activeModule === "disputes" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
              <AlertTriangle className="w-7 h-7 text-rose-600" />
              Dispute & Grievance Redressal (48-Hour SLA Redressal)
            </h2>
            <p className="text-xs text-gray-500">Fair resolution for payment delays, weight discrepancies, and quality disputes</p>
          </div>

          <div className="space-y-4">
            {grievances.map((grv) => (
              <div key={grv.id} className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-rose-800 bg-rose-100 px-2.5 py-0.5 rounded-md">{grv.grievanceId}</span>
                  <span className="text-xs font-bold text-gray-600">{grv.status}</span>
                </div>
                <h3 className="font-bold text-gray-900">{grv.title}</h3>
                <p className="text-xs text-gray-600">{grv.description}</p>
                {grv.resolutionNote && (
                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-900 font-medium">
                    ✓ Resolution: {grv.resolutionNote}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODULE 11: FPO AGGREGATION */}
      {/* ========================================================================= */}
      {activeModule === "fpo" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
              <Users className="w-7 h-7 text-emerald-600" />
              FPO Bulk Aggregation & Corporate Tender Portal
            </h2>
            <p className="text-xs text-gray-500">Aggregate 100+ smallholder harvests into 250-tonne bulk lots for +₹260/qtl premium</p>
          </div>

          <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-8 space-y-4 border border-emerald-800">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-white">{selectedFpo.fpoName}</h3>
              <span className="bg-amber-400 text-amber-950 font-black text-xs px-3 py-1 rounded-full">Tender Approved ✓</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
              <div className="bg-white/10 p-3 rounded-2xl"><span className="text-emerald-300 block">Member Farmers</span><span className="text-2xl font-black">{selectedFpo.memberFarmersCount}</span></div>
              <div className="bg-white/10 p-3 rounded-2xl"><span className="text-emerald-300 block">Total Volume</span><span className="text-2xl font-black text-amber-300">{selectedFpo.totalAggregatedQtl} Qtl</span></div>
              <div className="bg-white/10 p-3 rounded-2xl"><span className="text-emerald-300 block">Tender Rate</span><span className="text-2xl font-black">₹{selectedFpo.offeredPrice}</span></div>
              <div className="bg-white/10 p-3 rounded-2xl"><span className="text-emerald-300 block">Extra FPO Profit</span><span className="text-2xl font-black text-emerald-400">+₹{(selectedFpo.totalFpoExtraProfit / 100000).toFixed(2)} L</span></div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODULE 12: VOICE AI ASSISTANT */}
      {/* ========================================================================= */}
      {activeModule === "assistant" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
              <Bot className="w-7 h-7 text-emerald-600" />
              12-Language AI Agri & Market Assistant
            </h2>
            <p className="text-xs text-gray-500">Voice recognition (STT) and speech readout (TTS) in all major Indian languages</p>
          </div>
          <VoiceAssistant />
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODULE 13: TRANSPARENCY LEDGER */}
      {/* ========================================================================= */}
      {activeModule === "transparency" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
              <FileCheck className="w-7 h-7 text-emerald-600" />
              Public Price Benchmark & Transactions Ledger
            </h2>
            <p className="text-xs text-gray-500">Mandi benchmark vs KrishiSetu realized price (+11.4% extra farmer gain)</p>
          </div>

          <div className="overflow-x-auto bg-white rounded-3xl border border-gray-200 p-4">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-gray-50 text-gray-600 font-bold border-b border-gray-200">
                  <th className="p-3">Trade Code</th>
                  <th className="p-3">Crop</th>
                  <th className="p-3">Quantity</th>
                  <th className="p-3">Agreed Price</th>
                  <th className="p-3 text-emerald-700">Extra Gain</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {TRANSACTIONS_DATA.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50">
                    <td className="p-3 font-mono font-bold">{t.txnCode}</td>
                    <td className="p-3 font-bold">{t.crop}</td>
                    <td className="p-3">{t.quantityQtl} Qtl</td>
                    <td className="p-3 font-black">₹{t.agreedPricePerQtl}/qtl</td>
                    <td className="p-3 font-black text-emerald-700">+₹{t.extraRealization.toLocaleString("en-IN")}</td>
                    <td className="p-3"><span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">Settled ✓</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODULE 14: MASTER ADMIN CONSOLE */}
      {/* ========================================================================= */}
      {activeModule === "admin" && (
        <div className="space-y-6 animate-in fade-in duration-300">
          <AdminDashboardClient />
        </div>
      )}

      {/* MODALS */}
      <VoiceMarketQueryModal
        isOpen={voiceModalOpen}
        onClose={() => setVoiceModalOpen(false)}
      />

      <MandiComparisonModal
        isOpen={comparisonModalOpen}
        onClose={() => setComparisonModalOpen(false)}
        selectedCrop="wheat"
      />

      <AIQualityScannerModal
        isOpen={qualityScannerOpen}
        onClose={() => setQualityScannerOpen(false)}
      />

      <QRLotModal
        isOpen={!!qrModalLot}
        onClose={() => setQrModalLot(null)}
        lot={qrModalLot}
      />

      <NegotiationModal
        isOpen={!!selectedOfferForModal}
        onClose={() => setSelectedOfferForModal(null)}
        offer={selectedOfferForModal}
        onAccept={(id) => {
          showToast("Offer accepted! Escrow order created.");
        }}
        onCounter={(id, price, note) => {
          showToast(`Counter offer (₹${price}) submitted!`);
        }}
        onReject={(id) => {
          showToast("Offer rejected.");
        }}
      />
    </div>
  );
}
