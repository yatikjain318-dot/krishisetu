"use client";

import React from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import {
  TrendingUp,
  ShieldCheck,
  Sprout,
  Handshake,
  Warehouse,
  Truck,
  Camera,
  Bot,
  ArrowRight,
  Sparkles,
  CreditCard,
  PhoneCall,
  CheckCircle2,
} from "lucide-react";
import { MANDIS_DATA, INITIAL_LOTS, INITIAL_OFFERS, ACTIVE_SHIPMENTS } from "@/lib/data/mock-data";

export default function DashboardPage() {
  const { t } = useI18n();

  const activeLots = INITIAL_LOTS;
  const pendingOffers = INITIAL_OFFERS;
  const activeShipments = ACTIVE_SHIPMENTS;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 uppercase tracking-widest bg-emerald-800/80 px-3 py-1 rounded-full">
            <span>👨🌾 किसान डैशबोर्ड (Farmer Command Center)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            रामेश्वर जी, कृषिसेतु में आपका स्वागत है!
          </h1>
          <p className="text-xs sm:text-sm text-emerald-200">
            खेत का स्थान: <strong>ग्राम मोरीजा, चौमूं, जयपुर (राजस्थान)</strong> • कुल रकबा: <strong>4.5 एकड़</strong>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/my-crops"
            className="px-5 py-3 bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-xs rounded-2xl transition shadow-md flex items-center gap-1.5"
          >
            <Sprout className="w-4 h-4" />
            नया लॉट बनाएं
          </Link>
          <Link
            href="/prices"
            className="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-2xl transition border border-white/20"
          >
            मंडी भाव देखें
          </Link>
        </div>
      </div>

      {/* 4 Overview Metric Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-xs">
          <span className="text-xs font-bold text-gray-500 block">सक्रिय लॉट (Active Lots):</span>
          <div className="text-2xl font-black text-emerald-700 font-mono mt-1">
            {activeLots.length} लॉट
          </div>
          <span className="text-[11px] text-gray-500">कुल 91 क्विंटल फसल</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-xs">
          <span className="text-xs font-bold text-gray-500 block">प्राप्त खरीदार प्रस्ताव:</span>
          <div className="text-2xl font-black text-amber-600 font-mono mt-1">
            {pendingOffers.length} ऑफर्स
          </div>
          <span className="text-[11px] text-amber-700 font-bold">ITC एवं Reliance से</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-xs">
          <span className="text-xs font-bold text-gray-500 block">रास्ते में माल (In Transit):</span>
          <div className="text-2xl font-black text-blue-700 font-mono mt-1">
            {activeShipments.length} वाहन
          </div>
          <span className="text-[11px] text-blue-700 font-bold">लाइव GPS ट्रैकिंग चालू</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-xs">
          <span className="text-xs font-bold text-gray-500 block">प्राप्त एस्क्रो भुगतान:</span>
          <div className="text-2xl font-black text-purple-700 font-mono mt-1">
            ₹1,20,600
          </div>
          <span className="text-[11px] text-emerald-700 font-bold">100% सफल निपटान</span>
        </div>
      </div>

      {/* Quick Action Navigation Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link
          href="/prices"
          className="p-5 bg-white rounded-3xl border border-gray-200 hover:border-emerald-500 shadow-xs hover:shadow-lg transition space-y-3"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base text-gray-900">{t.navPrices}</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            आस-पास की मंडियों के ताजा मॉडल भाव, आवक और 7-दिन का AI मूल्य पूर्वानुमान।
          </p>
        </Link>

        <Link
          href="/buyers"
          className="p-5 bg-white rounded-3xl border border-gray-200 hover:border-emerald-500 shadow-xs hover:shadow-lg transition space-y-3"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base text-gray-900">{t.navBuyers}</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            ITC, रिलायंस, अडानी जैसे 100% KYC सत्यापित कॉर्पोरेट खरीदारों से सीधे जुड़ें।
          </p>
        </Link>

        <Link
          href="/storage"
          className="p-5 bg-white rounded-3xl border border-gray-200 hover:border-emerald-500 shadow-xs hover:shadow-lg transition space-y-3"
        >
          <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
            <Warehouse className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base text-gray-900">{t.navStorage}</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            आज बेचें बनाम गोदाम में रखकर बेचें? ROI कैलकुलेटर व 75% e-NWR लोन सुविधा।
          </p>
        </Link>

        <Link
          href="/transport"
          className="p-5 bg-white rounded-3xl border border-gray-200 hover:border-emerald-500 shadow-xs hover:shadow-lg transition space-y-3"
        >
          <div className="w-12 h-12 rounded-2xl bg-teal-100 text-teal-700 flex items-center justify-center">
            <Truck className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base text-gray-900">{t.navTransport}</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            खेत से मंडी तक वाहन बुक करें और प्रति किमी पारदर्शी भाड़े के साथ लाइव ट्रैक करें।
          </p>
        </Link>
      </div>
    </div>
  );
}
