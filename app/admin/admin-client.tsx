"use client";

import React, { useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import {
  MANDIS_DATA,
  VERIFIED_BUYERS,
  TRANSACTIONS_DATA,
  GRIEVANCES_DATA,
  FPO_DATA,
  VerifiedBuyer,
  GrievanceCase,
} from "@/lib/data/mock-data";
import {
  ShieldCheck,
  Users,
  CreditCard,
  Sprout,
  TrendingUp,
  Award,
  Globe2,
  Building,
  Truck,
  Warehouse,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Edit,
  Save,
  Search,
  Scale,
} from "lucide-react";

export function AdminDashboardClient() {
  const { t, playChime } = useI18n();

  const [activeTab, setActiveTab] = useState<
    "metrics" | "buyers" | "disputes" | "mandis" | "fpos"
  >("metrics");

  const [buyers, setBuyers] = useState<VerifiedBuyer[]>(VERIFIED_BUYERS);
  const [disputes, setDisputes] = useState<GrievanceCase[]>(GRIEVANCES_DATA);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toggleBuyerStatus = (buyerId: string) => {
    playChime();
    setBuyers((prev) =>
      prev.map((b) =>
        b.id === buyerId
          ? {
              ...b,
              kycStatus: b.kycStatus === "VERIFIED" ? "PENDING" : "VERIFIED",
            }
          : b
      )
    );
    setToastMessage("खरीदार का सत्यापन स्टेटस सफलतापूर्वक अपडेट किया गया!");
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleResolveDispute = (disputeId: string) => {
    playChime();
    setDisputes((prev) =>
      prev.map((d) =>
        d.id === disputeId
          ? {
              ...d,
              status: "RESOLVED",
              statusHi: "सफलतापूर्वक हल व बंद (Resolved)",
              resolutionNote: "एडमिन द्वारा एस्क्रो राशि किसान खाते में रिलीज की गई एवं विवाद समाप्त किया गया।",
            }
          : d
      )
    );
    setToastMessage(`शिकायत ${disputeId} को सफलतापूर्वक हल किया गया!`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 rounded-3xl p-6 sm:p-8 text-white shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 uppercase tracking-widest bg-amber-500/20 px-3 py-1 rounded-full border border-amber-400/30">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>{t.adminTitle}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            कृषिसेतु मास्टर इकोसिस्टम एडमिन कंसोल
          </h1>
          <p className="text-xs sm:text-sm text-emerald-200">
            पारदर्शी डिजिटल कृषि मंडी, 12-भाषी संचालन, खरीदार सत्यापन एवं विवाद मध्यस्थता नियंत्रण
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-xs flex items-center gap-2">
          <Globe2 className="w-5 h-5 text-emerald-400" />
          <span>12 भारतीय भाषाएँ सक्रिय रूप से समर्थित</span>
        </div>
      </div>

      {toastMessage && (
        <div className="bg-emerald-100 border border-emerald-300 text-emerald-900 p-4 rounded-2xl text-sm font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-700" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Key Performance Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-xs space-y-1">
          <div className="text-xs font-bold text-gray-500">कुल व्यापार मूल्य (Traded Volume)</div>
          <div className="text-2xl sm:text-3xl font-black text-gray-900 font-mono">
            ₹48.6 Cr
          </div>
          <div className="text-[11px] text-emerald-600 font-bold">142,000+ क्विंटल फसल</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-xs space-y-1">
          <div className="text-xs font-bold text-gray-500">किसान अतिरिक्त मूल्य प्राप्ति</div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-700 font-mono">
            +11.4%
          </div>
          <div className="text-[11px] text-emerald-600 font-bold">मंडी बेंचमार्क से अधिक</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-xs space-y-1">
          <div className="text-xs font-bold text-gray-500">सत्यापित खरीदार व FPO</div>
          <div className="text-2xl sm:text-3xl font-black text-teal-700 font-mono">
            {buyers.length} खरीदार • 140+ FPO
          </div>
          <div className="text-[11px] text-teal-600 font-bold">100% KYC अनुपालित</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-xs space-y-1">
          <div className="text-xs font-bold text-gray-500">पोस्ट-हार्वेस्ट नुकसान में कमी</div>
          <div className="text-2xl sm:text-3xl font-black text-purple-700 font-mono">
            -18.5%
          </div>
          <div className="text-[11px] text-purple-600 font-bold">वैज्ञानिक भंडारण द्वारा</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab("metrics")}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition shrink-0 flex items-center gap-1.5 cursor-pointer ${
            activeTab === "metrics"
              ? "bg-emerald-600 text-white shadow-xs"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>मुख्य विश्लेषिकी (Analytics)</span>
        </button>

        <button
          onClick={() => setActiveTab("buyers")}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition shrink-0 flex items-center gap-1.5 cursor-pointer ${
            activeTab === "buyers"
              ? "bg-emerald-600 text-white shadow-xs"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <Building className="w-4 h-4" />
          <span>खरीदार KYC एवं सत्यापन ({buyers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("disputes")}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition shrink-0 flex items-center gap-1.5 cursor-pointer ${
            activeTab === "disputes"
              ? "bg-emerald-600 text-white shadow-xs"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>विवाद मध्यस्थता ({disputes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("mandis")}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition shrink-0 flex items-center gap-1.5 cursor-pointer ${
            activeTab === "mandis"
              ? "bg-emerald-600 text-white shadow-xs"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>मंडी भाव व डेटा फ़ीड ({MANDIS_DATA.length})</span>
        </button>
      </div>

      {/* TAB 1: Detailed Analytics */}
      {activeTab === "metrics" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs space-y-3">
              <h3 className="font-extrabold text-sm text-gray-900">
                💰 औसत भुगतान निपटान समय
              </h3>
              <div className="text-3xl font-black text-emerald-700 font-mono">
                2.4 घंटे
              </div>
              <p className="text-xs text-gray-500">
                डिलीवरी और डिजिटल क्वालिटी सत्यापन के बाद एस्क्रो से किसान खाते में औसत ट्रांसफर समय।
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs space-y-3">
              <h3 className="font-extrabold text-sm text-gray-900">
                🛡️ विवाद निवारण सफलता दर
              </h3>
              <div className="text-3xl font-black text-blue-700 font-mono">
                98.2%
              </div>
              <p className="text-xs text-gray-500">
                औसत 22 घंटे में कांटा पर्ची व लैब रिपोर्ट के आधार पर विवादों का निपटारा।
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-xs space-y-3">
              <h3 className="font-extrabold text-sm text-gray-900">
                🌾 सक्रिय किसान व एफपीओ भागीदारी
              </h3>
              <div className="text-3xl font-black text-amber-700 font-mono">
                18,420+
              </div>
              <p className="text-xs text-gray-500">
                राजस्थान, मध्य प्रदेश, पंजाब, हरियाणा, महाराष्ट्र व गुजरात में सक्रिय।
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Buyers Management */}
      {activeTab === "buyers" && (
        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-md">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-base font-black text-gray-900">
              सत्यापित खरीदार एवं कॉर्पोरेट KYC प्रबंधन ({buyers.length})
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 uppercase font-bold border-b border-gray-200">
                <tr>
                  <th className="p-4">कंपनी का नाम</th>
                  <th className="p-4">श्रेणी</th>
                  <th className="p-4">GSTIN / FSSAI</th>
                  <th className="p-4">सफल व्यापार</th>
                  <th className="p-4">रेटिंग</th>
                  <th className="p-4">KYC स्थिति</th>
                  <th className="p-4">कार्रवाई</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {buyers.map((b) => (
                  <tr key={b.id} className="hover:bg-gray-50">
                    <td className="p-4 font-bold text-gray-900">{b.name}</td>
                    <td className="p-4 text-gray-600">{b.categoryHi}</td>
                    <td className="p-4 font-mono text-gray-500">{b.gstin}</td>
                    <td className="p-4 font-bold text-gray-800">{b.completedTrades}+</td>
                    <td className="p-4 text-amber-600 font-bold">⭐ {b.rating}</td>
                    <td className="p-4">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          b.kycStatus === "VERIFIED"
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {b.kycStatus}
                      </span>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => toggleBuyerStatus(b.id)}
                        className={`px-3 py-1 text-[11px] font-bold rounded-lg transition cursor-pointer ${
                          b.kycStatus === "VERIFIED"
                            ? "bg-rose-50 text-rose-700 hover:bg-rose-100"
                            : "bg-emerald-600 text-white hover:bg-emerald-700"
                        }`}
                      >
                        {b.kycStatus === "VERIFIED" ? "निलंबित करें (Suspend)" : "स्वीकृत करें (Verify)"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: Disputes Moderation */}
      {activeTab === "disputes" && (
        <div className="space-y-4">
          {disputes.map((d) => (
            <div
              key={d.id}
              className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-gray-500">{d.grievanceId}</span>
                  <h4 className="font-extrabold text-base text-gray-900">{d.title}</h4>
                  <p className="text-xs text-gray-500">
                    शिकायतकर्ता: <strong>{d.complainantName}</strong> vs <strong>{d.againstParty}</strong>
                  </p>
                </div>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    d.status === "RESOLVED"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-amber-100 text-amber-900"
                  }`}
                >
                  {d.statusHi}
                </span>
              </div>

              <p className="text-xs text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-100">
                {d.description}
              </p>

              {d.status !== "RESOLVED" && (
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => handleResolveDispute(d.id)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition cursor-pointer flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    एस्क्रो फंड रिलीज करें व केस हल करें
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* TAB 4: Mandis Management */}
      {activeTab === "mandis" && (
        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-md">
          <div className="p-6 border-b border-gray-100">
            <h3 className="text-base font-black text-gray-900">
              राष्ट्रीय मंडी फ़ीड एवं मूल्य प्रबंधन ({MANDIS_DATA.length} मंडियां)
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-500 uppercase font-bold border-b border-gray-200">
                <tr>
                  <th className="p-4">मंडी का नाम</th>
                  <th className="p-4">राज्य / जिला</th>
                  <th className="p-4">दूरी</th>
                  <th className="p-4">दैनिक आवक</th>
                  <th className="p-4">प्रमुख फसलें</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {MANDIS_DATA.map((m) => (
                  <tr key={m.id} className="hover:bg-gray-50">
                    <td className="p-4 font-bold text-gray-900">{m.nameHi}</td>
                    <td className="p-4 text-gray-600">{m.district}, {m.state}</td>
                    <td className="p-4 font-bold text-gray-800">{m.distanceKm} किमी</td>
                    <td className="p-4 font-black text-emerald-700">{m.arrivalVolumeQtl} क्विंटल</td>
                    <td className="p-4 text-gray-600">
                      {m.cropPrices.map((c) => `${c.cropName} (₹${c.modalPrice})`).join(" • ")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
