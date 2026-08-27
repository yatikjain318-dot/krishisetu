"use client";

import React, { useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { TRANSPORTERS_DATA, ACTIVE_SHIPMENTS, Transporter, ShipmentTracker } from "@/lib/data/mock-data";
import {
  Truck,
  MapPin,
  PhoneCall,
  Navigation,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Calculator,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function TransportPage() {
  const { t, playChime } = useI18n();

  const [activeTab, setActiveTab] = useState<"book" | "track">("track");
  const [distanceKm, setDistanceKm] = useState(38);
  const [quantityQtl, setQuantityQtl] = useState(45);
  const [selectedVehicleType, setSelectedVehicleType] = useState("Eicher 14-Ft (7 Ton / 70 Qtl)");
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  const [shipments, setShipments] = useState<ShipmentTracker[]>(ACTIVE_SHIPMENTS);

  // Rate Calculation
  const selectedTransporter =
    TRANSPORTERS_DATA.find((tr) => tr.vehicleType === selectedVehicleType) || TRANSPORTERS_DATA[0];

  const estimatedFreight = Math.round(
    selectedTransporter.baseRatePerKm * distanceKm + selectedTransporter.ratePerQtl * quantityQtl
  );

  const handleBookVehicle = (transporterName: string) => {
    playChime();
    const newShipmentCode = `TRK-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newShipment: ShipmentTracker = {
      id: `ship-${Date.now()}`,
      shipmentCode: newShipmentCode,
      lotCode: "LOT-WHT-2026-8912",
      cropName: "Wheat (Sharbati Gold)",
      quantityQtl,
      transporterName,
      vehicleNumber: "RJ 14 GB 4521",
      driverPhone: "+91 94140 22910",
      status: "IN_TRANSIT",
      from: "Morija Village, Chomu",
      to: "ITC Bindayaka Procurement Hub, Jaipur",
      estimatedArrival: "02:45 PM Today",
      currentMilestoneIndex: 1,
      milestones: [
        { title: "Transport Booked & Driver Assigned", time: "08:30 AM", done: true },
        { title: "Vehicle Arrived at Farm & Produce Loaded", time: "10:15 AM", done: true },
        { title: "In Transit (En route via Jaipur-Sikar Highway)", time: "11:45 AM", done: false },
        { title: "Arrival at Buyer Hub & Weighbridge Check", time: "Est. 01:30 PM", done: false },
        { title: "Assaying, Unloading & Instant Payout Release", time: "Est. 02:45 PM", done: false },
      ],
    };

    setShipments([newShipment, ...shipments]);
    setBookingSuccess(`वाहन सफलतापूर्वक बुक किया गया! ट्रैकिंग कोड: ${newShipmentCode}`);
    setActiveTab("track");
    setTimeout(() => setBookingSuccess(null), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 flex items-center gap-2">
              <Truck className="w-8 h-8 text-emerald-600" />
              {t.logisticsTitle}
            </h1>
            <span className="bg-teal-100 text-teal-900 text-xs font-black px-2.5 py-0.5 rounded-full border border-teal-300">
              GPS Enabled Fleet
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            खेत से सीधे मंडी या खरीदार के गोदाम तक सुरक्षित कृषि परिवहन • पारदर्शी प्रति किमी दरें व लाइव जीपीएस ट्रैकिंग
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 gap-4">
        <button
          onClick={() => setActiveTab("track")}
          className={`pb-3 text-sm font-extrabold transition border-b-2 cursor-pointer flex items-center gap-1.5 ${
            activeTab === "track"
              ? "border-emerald-600 text-emerald-700"
              : "border-transparent text-gray-500 hover:text-gray-900"
          }`}
        >
          <Navigation className="w-4 h-4 text-emerald-600" />
          🛰️ लाइव खेप ट्रैकिंग (Live GPS Tracking)
        </button>
        <button
          onClick={() => setActiveTab("book")}
          className={`pb-3 text-sm font-extrabold transition border-b-2 cursor-pointer flex items-center gap-1.5 ${
            activeTab === "book"
              ? "border-emerald-600 text-emerald-700"
              : "border-transparent text-gray-500 hover:text-gray-900"
          }`}
        >
          <Calculator className="w-4 h-4 text-amber-500" />
          🚚 नया वाहन खोजें व भाड़ा कैलकुलेटर
        </button>
      </div>

      {bookingSuccess && (
        <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-950 font-bold text-sm rounded-2xl flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
          {bookingSuccess}
        </div>
      )}

      {/* LIVE SHIPMENT TRACKING TAB */}
      {activeTab === "track" && (
        <div className="space-y-6">
          {shipments.map((shipment) => (
            <div
              key={shipment.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-200 shadow-lg space-y-6"
            >
              {/* Top Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-sm text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-md">
                      {shipment.shipmentCode}
                    </span>
                    <span className="text-xs bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-md animate-pulse">
                      🚚 रास्ते में (In Transit)
                    </span>
                  </div>
                  <h3 className="text-lg font-extrabold text-gray-900 mt-1">
                    {shipment.cropName} — {shipment.quantityQtl} क्विंटल
                  </h3>
                </div>

                <div className="text-right">
                  <span className="text-xs text-gray-500 font-semibold block">अनुमानित डिलीवरी:</span>
                  <span className="text-base font-black text-emerald-700">{shipment.estimatedArrival}</span>
                </div>
              </div>

              {/* Driver & Vehicle Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-gray-50 p-4 rounded-2xl border border-gray-200 text-xs">
                <div>
                  <span className="text-gray-500 font-semibold block">ट्रांसपोर्टर:</span>
                  <span className="font-bold text-gray-900">{shipment.transporterName}</span>
                </div>
                <div>
                  <span className="text-gray-500 font-semibold block">गाड़ी संख्या:</span>
                  <span className="font-mono font-bold text-gray-900">{shipment.vehicleNumber}</span>
                </div>
                <div className="flex items-center justify-between sm:justify-start gap-2">
                  <div>
                    <span className="text-gray-500 font-semibold block">चालक संपर्क:</span>
                    <span className="font-bold text-gray-900">{shipment.driverPhone}</span>
                  </div>
                  <a
                    href={`tel:${shipment.driverPhone}`}
                    className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition cursor-pointer shrink-0"
                    title="Call Driver"
                  >
                    <PhoneCall className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Route Path */}
              <div className="flex items-center justify-between text-xs bg-emerald-50/70 p-3 rounded-2xl border border-emerald-200">
                <div className="flex items-center gap-1.5 font-bold text-emerald-950">
                  <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>स्रोत: {shipment.from}</span>
                </div>
                <span className="text-emerald-700 font-bold">➔</span>
                <div className="flex items-center gap-1.5 font-bold text-emerald-950">
                  <MapPin className="w-4 h-4 text-blue-700 shrink-0" />
                  <span>गंतव्य: {shipment.to}</span>
                </div>
              </div>

              {/* GPS Milestones Step-by-Step Tracker */}
              <div className="space-y-3">
                <h4 className="text-xs font-extrabold text-gray-700 uppercase tracking-wider">
                  📍 सफर के चरण व लाइव प्रगति (Milestone Progress):
                </h4>

                <div className="relative border-l-2 border-emerald-500 ml-4 space-y-6 py-2">
                  {shipment.milestones.map((step, idx) => (
                    <div key={idx} className="relative pl-6">
                      {/* Step Circle */}
                      <span
                        className={`absolute -left-[9px] top-0.5 w-4 h-4 rounded-full border-2 border-white ${
                          step.done
                            ? "bg-emerald-600 ring-2 ring-emerald-300"
                            : "bg-gray-300"
                        }`}
                      />
                      <div className="flex items-center justify-between gap-2">
                        <span
                          className={`text-xs font-bold ${
                            step.done ? "text-gray-900" : "text-gray-400"
                          }`}
                        >
                          {step.title}
                        </span>
                        <span className="text-[11px] font-mono text-gray-500">
                          {step.time}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* BOOK TRANSPORT & RATE CALCULATOR TAB */}
      {activeTab === "book" && (
        <div className="space-y-6">
          {/* Freight Rate Calculator */}
          <div className="bg-gradient-to-br from-emerald-900 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                <Calculator className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white">
                  पारदर्शी भाड़ा कैलकुलेटर (Freight Calculator)
                </h3>
                <p className="text-xs text-emerald-200">
                  दूरी (किमी) व वजन के अनुसार तत्काल वास्तविक भाड़ा निकालें
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div>
                <label className="text-xs font-bold text-emerald-200 block mb-1">
                  📍 दूरी (किमी):
                </label>
                <input
                  type="number"
                  min={1}
                  max={1000}
                  value={distanceKm}
                  onChange={(e) => setDistanceKm(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-sm font-bold text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-emerald-200 block mb-1">
                  ⚖️ वजन (क्विंटल):
                </label>
                <input
                  type="number"
                  min={1}
                  max={500}
                  value={quantityQtl}
                  onChange={(e) => setQuantityQtl(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-sm font-bold text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-emerald-200 block mb-1">
                  🚚 वाहन प्रकार:
                </label>
                <select
                  value={selectedVehicleType}
                  onChange={(e) => setSelectedVehicleType(e.target.value)}
                  className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-xl text-xs font-bold text-white focus:outline-none"
                >
                  {TRANSPORTERS_DATA.map((t) => (
                    <option key={t.id} value={t.vehicleType} className="text-gray-900">
                      {t.vehicleType}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-emerald-800 flex items-center justify-between">
              <div>
                <span className="text-xs text-emerald-300 block">अनुमानित कुल भाड़ा:</span>
                <span className="text-2xl sm:text-3xl font-black text-amber-300">
                  ₹{estimatedFreight.toLocaleString("en-IN")}
                </span>
                <span className="text-[11px] text-emerald-300 block">
                  (मात्र ₹{Math.round(estimatedFreight / quantityQtl)}/क्विंटल)
                </span>
              </div>

              <button
                onClick={() => handleBookVehicle(selectedTransporter.name)}
                className="px-6 py-3 bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-xs sm:text-sm rounded-xl transition shadow-md cursor-pointer"
              >
                तुरंत बुक करें
              </button>
            </div>
          </div>

          {/* Transporters Fleet Directory */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {TRANSPORTERS_DATA.map((tr) => (
              <div
                key={tr.id}
                className="bg-white rounded-3xl p-5 border border-gray-200 hover:border-emerald-500 shadow-xs flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md">
                      ✓ GPS Verified Fleet
                    </span>
                    <span className="text-xs font-bold text-amber-600">⭐ {tr.rating}</span>
                  </div>

                  <h3 className="font-extrabold text-base text-gray-900">{tr.name}</h3>
                  <p className="text-xs text-gray-500">चालक: {tr.driverName}</p>

                  <div className="mt-3 space-y-1.5 text-xs bg-gray-50 p-3 rounded-2xl border border-gray-100">
                    <div className="flex justify-between">
                      <span className="text-gray-500">वाहन क्षमता:</span>
                      <span className="font-bold text-gray-900">{tr.vehicleType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">दर:</span>
                      <span className="font-bold text-emerald-700">₹{tr.baseRatePerKm}/km + ₹{tr.ratePerQtl}/qtl</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">वर्तमान स्थिति:</span>
                      <span className="font-bold text-gray-700">{tr.currentLocation}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <a
                    href={`tel:${tr.phone}`}
                    className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1"
                  >
                    <PhoneCall className="w-3.5 h-3.5" /> कॉल करें
                  </a>
                  <button
                    onClick={() => handleBookVehicle(tr.name)}
                    className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1 cursor-pointer"
                  >
                    वाहन बुक करें
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
