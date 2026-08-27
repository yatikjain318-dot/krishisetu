"use client";

import React, { useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { WAREHOUSES_DATA, Warehouse } from "@/lib/data/mock-data";
import { SellVsStoreCalculator } from "@/components/sell-vs-store-calculator";
import {
  Warehouse as WarehouseIcon,
  ShieldCheck,
  Award,
  PhoneCall,
  CheckCircle2,
  MapPin,
  DollarSign,
  Calculator,
  Search,
  Sparkles,
} from "lucide-react";

export default function StoragePage() {
  const { t, playChime } = useI18n();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [bookingToast, setBookingToast] = useState<string | null>(null);

  const filteredWarehouses = WAREHOUSES_DATA.filter((wh) => {
    const matchesSearch =
      wh.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      wh.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleBookSpace = (whName: string) => {
    playChime();
    setBookingToast(`${whName} में आपका भंडारण स्पेस सफलतापूर्वक आरक्षित हुआ! e-NWR रसीद जेनरेट की जा रही है।`);
    setTimeout(() => setBookingToast(null), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 flex items-center gap-2">
              <WarehouseIcon className="w-8 h-8 text-emerald-600" />
              {t.storageTitle}
            </h1>
            <span className="bg-purple-100 text-purple-900 text-xs font-black px-2.5 py-0.5 rounded-full border border-purple-300">
              WDRA Accredited
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            मान्यता प्राप्त वैज्ञानिक गोदाम व कोल्ड स्टोरेज खोजें • e-NWR रसीद पर 75% तत्काल बैंक लोन एवं सुरक्षा बीमा
          </p>
        </div>
      </div>

      {bookingToast && (
        <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-950 font-bold text-sm rounded-2xl flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
          {bookingToast}
        </div>
      )}

      {/* Interactive Sell vs Store ROI Calculator */}
      <SellVsStoreCalculator />

      {/* Warehouses Directory */}
      <div className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-xl font-black text-gray-900">
              निकटवर्ती वैज्ञानिक गोदाम व कोल्ड स्टोरेज सूची
            </h3>
            <p className="text-xs text-gray-500">
              सभी गोदाम भारत सरकार के WDRA नियमों के तहत बीमित एवं प्रमाणित हैं
            </p>
          </div>

          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="गोदाम या स्थान खोजें..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-white border border-gray-300 rounded-xl text-xs font-medium text-gray-900 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredWarehouses.map((wh) => (
            <div
              key={wh.id}
              className="bg-white rounded-3xl p-6 border border-gray-200 hover:border-purple-500 shadow-xs hover:shadow-lg transition space-y-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] bg-purple-100 text-purple-900 font-extrabold px-2.5 py-0.5 rounded-md border border-purple-300">
                    {wh.eNWRSupport ? "✓ e-NWR लोन योग्य (75%)" : "FPO स्टोरेज"}
                  </span>
                  <span className="text-xs font-bold text-amber-600">⭐ {wh.rating} / 5.0</span>
                </div>

                <h4 className="font-extrabold text-base text-gray-900">{wh.name}</h4>
                <p className="text-xs text-gray-500 font-medium">{wh.typeHi}</p>

                <div className="mt-3.5 space-y-1.5 text-xs bg-gray-50 p-3.5 rounded-2xl border border-gray-100">
                  <div className="flex justify-between">
                    <span className="text-gray-500">स्थान / दूरी:</span>
                    <span className="font-bold text-gray-900">{wh.location} ({wh.distanceKm} किमी दूर)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">उपलब्ध खाली क्षमता:</span>
                    <span className="font-extrabold text-purple-900">
                      {wh.availableCapacityBags.toLocaleString("en-IN")} बोरियां ({wh.totalCapacityBags.toLocaleString("en-IN")} में से)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">मासिक किराया:</span>
                    <span className="font-black text-emerald-700 text-sm">
                      ₹{wh.ratePerBagPerMonth} / बोरी / माह
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">सुरक्षा बीमा:</span>
                    <span className="font-bold text-emerald-800">✓ 100% बीमित (Fire/Flood/Pest)</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <a
                  href={`tel:${wh.contact}`}
                  className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1"
                >
                  <PhoneCall className="w-3.5 h-3.5" /> कॉल करें
                </a>
                <button
                  onClick={() => handleBookSpace(wh.name)}
                  className="flex-1 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1 shadow-xs cursor-pointer"
                >
                  स्पेस आरक्षित करें
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
