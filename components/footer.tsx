"use client";

import React from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n/context";
import {
  Sprout,
  PhoneCall,
  ShieldCheck,
  Award,
  Globe2,
  Lock,
  TrendingUp,
  Handshake,
  Warehouse,
  Truck,
  Users,
} from "lucide-react";

export function Footer() {
  const { t } = useI18n();

  return (
    <footer className="bg-emerald-950 text-emerald-100 border-t border-emerald-900 pt-14 pb-24 lg:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Helpline Banner */}
        <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-900 rounded-3xl p-6 sm:p-8 border border-emerald-800 shadow-2xl mb-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shrink-0">
              <PhoneCall className="w-8 h-8" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest text-amber-300 font-bold">
                {t.callHelpline} (Kisan Call Center)
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {t.kisanCallCenter}
              </div>
              <p className="text-xs text-emerald-300 mt-0.5">
                निशुल्क 24x7 किसान सेवा केंद्र • सभी 12 भारतीय भाषाओं में सहायता उपलब्ध
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/prices"
              className="bg-emerald-500 hover:bg-emerald-400 text-emerald-950 px-6 py-3 rounded-2xl font-black text-sm transition transform hover:scale-105 shadow-lg shadow-emerald-500/20"
            >
              {t.todayMandiPrices}
            </Link>
            <Link
              href="/buyers"
              className="bg-emerald-900/90 hover:bg-emerald-800 text-white border border-emerald-700 px-6 py-3 rounded-2xl font-bold text-sm transition"
            >
              {t.verifiedBuyerMarketplace}
            </Link>
          </div>
        </div>

        {/* 4 Column Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-emerald-900">
          {/* Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white">
                <Sprout className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black text-white tracking-tight">
                KrishiSetu <span className="text-emerald-400">कृषिसेतु</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-emerald-300/90 leading-relaxed">
              {t.brandTagline} — भारत के किसानों, एफपीओ और कॉर्पोरेट खरीदारों के बीच सीधा, पारदर्शी और एस्क्रो-सुरक्षित डिजिटल कृषि सेतु।
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-300 font-bold bg-amber-950/40 border border-amber-800/60 p-2.5 rounded-xl">
              <ShieldCheck className="w-4 h-4 shrink-0 text-amber-400" />
              <span>0% बिचौलिया कटौती • 24 घंटे में गारंटीड एस्क्रो भुगतान</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-white tracking-wide">
              प्रमुख कृषि सेवाएं
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-emerald-300">
              <li>
                <Link href="/prices" className="hover:text-white transition flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  {t.navPrices} (AI भविष्यवाणी)
                </Link>
              </li>
              <li>
                <Link href="/buyers" className="hover:text-white transition flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  {t.navBuyers} (ITC, Reliance)
                </Link>
              </li>
              <li>
                <Link href="/my-crops" className="hover:text-white transition flex items-center gap-1.5">
                  <Sprout className="w-3.5 h-3.5 text-emerald-400" />
                  {t.createDigitalLot} (QR पासपोर्ट)
                </Link>
              </li>
              <li>
                <Link href="/storage" className="hover:text-white transition flex items-center gap-1.5">
                  <Warehouse className="w-3.5 h-3.5 text-emerald-400" />
                  {t.navStorage} (ROI कैलकुलेटर)
                </Link>
              </li>
              <li>
                <Link href="/transport" className="hover:text-white transition flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-emerald-400" />
                  {t.navTransport} (लाइव GPS)
                </Link>
              </li>
              <li>
                <Link href="/fpo" className="hover:text-white transition flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-emerald-400" />
                  {t.navFPO} (थोक एग्रीगेशन)
                </Link>
              </li>
            </ul>
          </div>

          {/* 12 Languages Supported */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-white tracking-wide flex items-center gap-1.5">
              <Globe2 className="w-4 h-4 text-emerald-400" />
              12 भारतीय भाषाएँ (Languages)
            </h4>
            <div className="grid grid-cols-2 gap-1.5 text-xs text-emerald-300/90">
              <span>🇮🇳 हिन्दी (Hindi)</span>
              <span>🌐 English</span>
              <span>🐪 राजस्थानी (Rajasthani)</span>
              <span>🌾 ਪੰਜਾਬੀ (Punjabi)</span>
              <span>🦁 ગુજરાતી (Gujarati)</span>
              <span>🚩 मराठी (Marathi)</span>
              <span>🐅 বাংলা (Bengali)</span>
              <span>🌱 తెలుగు (Telugu)</span>
              <span>🛕 தமிழ் (Tamil)</span>
              <span>🐘 ಕನ್ನಡ (Kannada)</span>
              <span>🌴 മലയാളം (Malayalam)</span>
              <span>🌊 ଓଡ଼ିଆ (Odia)</span>
            </div>
          </div>

          {/* Trust & Guarantees */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-white tracking-wide flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-400" />
              100% भारतीय किसान सुरक्षा
            </h4>
            <ul className="space-y-2 text-xs text-emerald-300">
              <li className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                सुरक्षित डिजिटल एस्क्रो भुगतान
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                WDRA e-NWR गोदाम रसीद पर 75% ऋण
              </li>
              <li className="flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                48-घंटे में त्वरित शिकायत निवारण
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-400/80">
          <div>
            © {new Date().getFullYear()} KrishiSetu (कृषिसेतु) • राष्ट्रीय डिजिटल कृषि बाजार एवं मूल्य आसूचना मंच
          </div>
          <div className="flex items-center gap-4">
            <Link href="/transparency" className="hover:text-white transition">
              {t.navTransparency}
            </Link>
            <span>•</span>
            <Link href="/disputes" className="hover:text-white transition">
              {t.navDisputes}
            </Link>
            <span>•</span>
            <Link href="/admin" className="hover:text-white transition">
              {t.navAdmin}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
