"use client";

import React, { useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { INITIAL_LOTS, DigitalLot, CROPS_INTELLIGENCE } from "@/lib/data/mock-data";
import { QRLotModal } from "@/components/qr-lot-modal";
import { AIQualityScannerModal } from "@/components/ai-quality-scanner-modal";
import {
  Sprout,
  Plus,
  QrCode,
  Camera,
  Upload,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  DollarSign,
  FileCheck,
  Handshake,
  ArrowRight,
  Eye,
  Trash2,
} from "lucide-react";
import Link from "next/link";

export default function MyCropsPage() {
  const { t, playChime } = useI18n();

  const [lots, setLots] = useState<DigitalLot[]>(INITIAL_LOTS);
  const [isCreatingLot, setIsCreatingLot] = useState(false);
  const [selectedLotForQR, setSelectedLotForQR] = useState<DigitalLot | null>(null);
  const [scannerOpen, setScannerOpen] = useState(false);

  // Form State
  const [cropId, setCropId] = useState("wheat");
  const [variety, setVariety] = useState("Sharbati Lokwan");
  const [quantityQtl, setQuantityQtl] = useState(40);
  const [harvestDate, setHarvestDate] = useState("2026-08-20");
  const [expectedSellingDate, setExpectedSellingDate] = useState("2026-09-05");
  const [moisturePercent, setMoisturePercent] = useState(11.2);
  const [qualityGrade, setQualityGrade] = useState<"Grade A" | "Grade B (FAQ)" | "Grade C">("Grade A");
  const [foreignMatter, setForeignMatter] = useState(0.5);
  const [brokenPercent, setBrokenPercent] = useState(1.0);
  const [expectedPrice, setExpectedPrice] = useState(2700);
  const [minReservePrice, setMinReservePrice] = useState(2580);
  const [farmerLocation, setFarmerLocation] = useState("ग्राम मोरीजा, चौमूं, जयपुर (राजस्थान)");
  const [certification, setCertification] = useState("AGMARK Grade-1 / Soil Health Card Verified");
  const [imagePreview, setImagePreview] = useState(
    "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&auto=format&fit=crop&q=80"
  );
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const handleCreateLot = (e: React.FormEvent) => {
    e.preventDefault();

    const selectedCropObj = CROPS_INTELLIGENCE.find((c) => c.id === cropId);
    const randomCode = `LOT-${cropId.toUpperCase().slice(0, 3)}-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newLot: DigitalLot = {
      id: `lot-${Date.now()}`,
      lotCode: randomCode,
      farmerId: "user-1",
      farmerName: "रामेश्वर गुर्जर (आप)",
      farmerPhone: "+91 98291 33451",
      farmerLocation,
      cropId,
      cropName: selectedCropObj ? selectedCropObj.nameHi : "गेहूं",
      variety,
      quantityQtl: Number(quantityQtl),
      harvestDate,
      expectedSellingDate,
      moisturePercent: Number(moisturePercent),
      qualityGrade,
      foreignMatterPercent: Number(foreignMatter),
      brokenPercent: Number(brokenPercent),
      expectedPrice: Number(expectedPrice),
      minReservePrice: Number(minReservePrice),
      certifications: [certification],
      photos: [imagePreview],
      status: "ACTIVE",
      createdAt: new Date().toISOString(),
      aiGradingScore: qualityGrade === "Grade A" ? 95 : 85,
    };

    setLots([newLot, ...lots]);
    setIsCreatingLot(false);
    playChime();
    setSuccessToast(`नया डिजिटल लॉट ${randomCode} सफलतापूर्वक प्रकाशित हुआ!`);
    setSelectedLotForQR(newLot);

    setTimeout(() => {
      setSuccessToast(null);
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 flex items-center gap-2">
              <Sprout className="w-8 h-8 text-emerald-600" />
              {t.navMyCrops}
            </h1>
            <span className="bg-emerald-100 text-emerald-900 text-xs font-black px-2.5 py-0.5 rounded-full border border-emerald-300">
              {lots.length} सक्रिय लॉट
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            अपनी फसल का डिजिटल लॉट बनाएं, फोटो/वीडियो व नमी विवरण जोड़ें और सत्यापित खरीदारों से सीधे ऑफर प्राप्त करें।
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setScannerOpen(true)}
            className="px-4 py-2.5 bg-blue-50 hover:bg-blue-100 border border-blue-300 text-blue-900 font-bold text-xs rounded-xl transition flex items-center gap-1.5 cursor-pointer"
          >
            <Camera className="w-4 h-4 text-blue-700" />
            AI क्वालिटी स्कैनर
          </button>

          <button
            onClick={() => setIsCreatingLot(true)}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            {t.createDigitalLot}
          </button>
        </div>
      </div>

      {successToast && (
        <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-950 font-bold text-sm rounded-2xl flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
          {successToast}
        </div>
      )}

      {/* LOT CREATION FORM MODAL */}
      {isCreatingLot && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-500 shadow-2xl space-y-6 animate-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center">
                <Sprout className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-gray-900">{t.createDigitalLot}</h3>
                <p className="text-xs text-gray-500">
                  सटीक विवरण भरने से आपको 10-15% अधिक मूल्य का ऑफर मिलेगा
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsCreatingLot(false)}
              className="text-gray-400 hover:text-gray-700 text-sm font-bold cursor-pointer"
            >
              ✕ रद्द करें
            </button>
          </div>

          <form onSubmit={handleCreateLot} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Crop Type */}
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  🌾 फसल का नाम:
                </label>
                <select
                  value={cropId}
                  onChange={(e) => {
                    const val = e.target.value;
                    setCropId(val);
                    const c = CROPS_INTELLIGENCE.find((x) => x.id === val);
                    if (c) {
                      setExpectedPrice(c.currentAvgModal + 80);
                      setMinReservePrice(c.currentAvgModal - 40);
                    }
                  }}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-sm font-bold text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  {CROPS_INTELLIGENCE.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nameHi}
                    </option>
                  ))}
                </select>
              </div>

              {/* Variety */}
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  🌱 किस्म (Variety):
                </label>
                <input
                  type="text"
                  value={variety}
                  onChange={(e) => setVariety(e.target.value)}
                  placeholder="उदा. लोकवन / शरबती"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-sm font-bold text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>

              {/* Quantity */}
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  ⚖️ कुल मात्रा (क्विंटल):
                </label>
                <input
                  type="number"
                  min={1}
                  max={5000}
                  value={quantityQtl}
                  onChange={(e) => setQuantityQtl(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-sm font-bold text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>

              {/* Harvest Date */}
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  📅 कटाई की तारीख (Harvest Date):
                </label>
                <input
                  type="date"
                  value={harvestDate}
                  onChange={(e) => setHarvestDate(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>

              {/* Expected Selling Date */}
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  ⏱️ कब तक बेचना चाहते हैं?
                </label>
                <input
                  type="date"
                  value={expectedSellingDate}
                  onChange={(e) => setExpectedSellingDate(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>

              {/* Location */}
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  📍 खेत / गांव का स्थान:
                </label>
                <input
                  type="text"
                  value={farmerLocation}
                  onChange={(e) => setFarmerLocation(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Quality Metrics Box */}
            <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 space-y-3">
              <h4 className="text-xs font-extrabold text-emerald-950 uppercase tracking-wider">
                🧪 गुणवत्ता व नमी विवरण (Quality Parameters):
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">नमी (Moisture %):</label>
                  <input
                    type="number"
                    step="0.1"
                    value={moisturePercent}
                    onChange={(e) => setMoisturePercent(Number(e.target.value))}
                    className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-xl font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">गुणवत्ता ग्रेड:</label>
                  <select
                    value={qualityGrade}
                    onChange={(e) => setQualityGrade(e.target.value as any)}
                    className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-xl font-bold"
                  >
                    <option value="Grade A">Grade A (प्रीमियम)</option>
                    <option value="Grade B (FAQ)">Grade B (FAQ)</option>
                    <option value="Grade C">Grade C (औसत)</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">कचरा (Foreign %):</label>
                  <input
                    type="number"
                    step="0.1"
                    value={foreignMatter}
                    onChange={(e) => setForeignMatter(Number(e.target.value))}
                    className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-xl font-bold"
                  />
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">टूटा दाना (Broken %):</label>
                  <input
                    type="number"
                    step="0.1"
                    value={brokenPercent}
                    onChange={(e) => setBrokenPercent(Number(e.target.value))}
                    className="w-full px-3 py-1.5 bg-white border border-gray-300 rounded-xl font-bold"
                  />
                </div>
              </div>
            </div>

            {/* Pricing Expectations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  💰 अपेक्षित विक्रय भाव (Target Price ₹/क्विंटल):
                </label>
                <input
                  type="number"
                  value={expectedPrice}
                  onChange={(e) => setExpectedPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-sm font-bold text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  🛡️ न्यूनतम स्वीकार्य भाव (Reserve Price ₹):
                </label>
                <input
                  type="number"
                  value={minReservePrice}
                  onChange={(e) => setMinReservePrice(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-sm font-bold text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Photo Upload & Certifications */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  📸 फसल का फोटो अपलोड करें:
                </label>
                <label className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-700 font-bold cursor-pointer hover:bg-emerald-50 transition">
                  <Upload className="w-4 h-4 text-emerald-600" />
                  गैलरी / कैमरे से फोटो चुनें
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setImagePreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                </label>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  📜 प्रमाणपत्र / जैविक विवरण:
                </label>
                <input
                  type="text"
                  value={certification}
                  onChange={(e) => setCertification(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setIsCreatingLot(false)}
                className="px-4 py-2.5 text-xs font-bold text-gray-600 hover:text-gray-900 cursor-pointer"
              >
                रद्द करें
              </button>

              <button
                type="submit"
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs rounded-xl shadow-md transition cursor-pointer flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                {t.submitLot}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ACTIVE LOTS LIST */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black text-gray-900">
            आपके पंजीकृत डिजिटल लॉट्स (My Listed Lots)
          </h3>
          <span className="text-xs text-gray-500 font-semibold">
            कुल मूल्य: ₹
            {lots
              .reduce((acc, l) => acc + l.quantityQtl * l.expectedPrice, 0)
              .toLocaleString("en-IN")}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {lots.map((lot) => (
            <div
              key={lot.id}
              className="bg-white rounded-3xl p-5 border border-gray-200 hover:border-emerald-500 shadow-xs hover:shadow-xl transition flex flex-col justify-between space-y-4 overflow-hidden"
            >
              <div>
                {/* Photo & Badge */}
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-gray-100 mb-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={lot.photos[0]}
                    alt={lot.cropName}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-md text-white font-mono font-bold text-[10px] px-2 py-0.5 rounded-md">
                    {lot.lotCode}
                  </div>
                  <div className="absolute top-2 right-2">
                    <span
                      className={`text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs ${
                        lot.status === "OFFER_RECEIVED"
                          ? "bg-amber-400 text-amber-950 animate-pulse"
                          : lot.status === "STORED"
                          ? "bg-purple-600 text-white"
                          : "bg-emerald-600 text-white"
                      }`}
                    >
                      {lot.status === "OFFER_RECEIVED"
                        ? "ऑफर प्राप्त! (Offer Received)"
                        : lot.status === "STORED"
                        ? "गोदाम में सुरक्षित"
                        : "सक्रिय लॉट"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-1">
                  <h4 className="font-extrabold text-base text-gray-900">{lot.cropName}</h4>
                  <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                    {lot.qualityGrade}
                  </span>
                </div>
                <p className="text-xs text-gray-500 font-medium">किस्म: {lot.variety}</p>

                {/* Metrics */}
                <div className="mt-3 space-y-1 text-xs bg-gray-50 p-3 rounded-2xl border border-gray-100">
                  <div className="flex justify-between">
                    <span className="text-gray-500">मात्रा:</span>
                    <span className="font-bold text-gray-900">{lot.quantityQtl} क्विंटल</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">नमी (Moisture):</span>
                    <span className="font-bold text-gray-900">{lot.moisturePercent}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">अपेक्षित भाव:</span>
                    <span className="font-black text-emerald-700">₹{lot.expectedPrice}/qtl</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">अनुमानित कुल मूल्य:</span>
                    <span className="font-bold text-gray-900">
                      ₹{(lot.quantityQtl * lot.expectedPrice).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center gap-2 border-t border-gray-100">
                <button
                  onClick={() => setSelectedLotForQR(lot)}
                  className="flex-1 py-2 bg-gray-100 hover:bg-emerald-50 text-gray-800 hover:text-emerald-900 font-bold text-xs rounded-xl transition flex items-center justify-center gap-1 cursor-pointer"
                >
                  <QrCode className="w-3.5 h-3.5 text-emerald-600" />
                  QR पासपोर्ट
                </button>

                <Link
                  href="/offers"
                  className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition flex items-center justify-center gap-1 text-center"
                >
                  <Handshake className="w-3.5 h-3.5" />
                  ऑफर देखें
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Global Modals */}
      <QRLotModal
        isOpen={!!selectedLotForQR}
        onClose={() => setSelectedLotForQR(null)}
        lot={selectedLotForQR}
      />
      <AIQualityScannerModal
        isOpen={scannerOpen}
        onClose={() => setScannerOpen(false)}
        onScanComplete={(res) => {
          setMoisturePercent(res.moisturePercent);
          setForeignMatter(res.foreignMatterPercent);
          setBrokenPercent(res.brokenPercent);
          setQualityGrade(res.grade);
          setIsCreatingLot(true);
        }}
      />
    </div>
  );
}
