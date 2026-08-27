"use client";

import React, { useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { GRIEVANCES_DATA, GrievanceCase } from "@/lib/data/mock-data";
import {
  AlertTriangle,
  Plus,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Upload,
  Clock,
  ArrowRight,
  HelpCircle,
} from "lucide-react";

export default function DisputesPage() {
  const { t, playChime } = useI18n();

  const [grievances, setGrievances] = useState<GrievanceCase[]>(GRIEVANCES_DATA);
  const [isFiling, setIsFiling] = useState(false);

  // Form State
  const [lotCode, setLotCode] = useState("LOT-WHT-2026-8912");
  const [againstParty, setAgainstParty] = useState("Shree Shyam Agro Traders");
  const [category, setCategory] = useState<GrievanceCase["category"]>("PAYMENT_DELAY");
  const [title, setTitle] = useState("भुगतान में 24 घंटे से अधिक का विलंब");
  const [description, setDescription] = useState(
    "माल 25 अगस्त को डिलीवर हो गया था और क्वालिटी ग्रेड A प्रमाणित हुई थी। खरीदार द्वारा एस्क्रो रिलीज में देरी की जा रही है।"
  );
  const [evidenceFileName, setEvidenceFileName] = useState("weighbridge_slip.pdf");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleFileGrievance = (e: React.FormEvent) => {
    e.preventDefault();

    const randomId = `GRV-2026-${Math.floor(100 + Math.random() * 900)}`;

    const newCase: GrievanceCase = {
      id: `grv-${Date.now()}`,
      grievanceId: randomId,
      lotCode,
      complainantName: "रामेश्वर गुर्जर (आप)",
      complainantRole: "FARMER",
      againstParty,
      category,
      categoryHi:
        category === "PAYMENT_DELAY"
          ? "भुगतान में विलंब"
          : category === "QUALITY_DISPUTE"
          ? "गुणवत्ता विवाद"
          : category === "QUANTITY_MISMATCH"
          ? "वजन में अंतर"
          : "परिवहन क्षति",
      title,
      description,
      status: "SUBMITTED",
      statusHi: "दर्ज हुआ (अधिकारी समीक्षा जारी)",
      evidenceFiles: [evidenceFileName],
      createdAt: new Date().toISOString().split("T")[0],
      steps: [
        { stage: "शिकायत दर्ज हुई", done: true, date: "आज" },
        { stage: "प्लैटफ़ॉर्म मध्यस्थ नियुक्त", done: true, date: "आज" },
        { stage: "सबूतों का सत्यापन", done: false, date: "लंबित (24 घंटे में)" },
        { stage: "समाधान प्रस्ताव", done: false, date: "लंबित" },
        { stage: "मामला हल व बंद", done: false, date: "लंबित" },
      ],
    };

    setGrievances([newCase, ...grievances]);
    setIsFiling(false);
    playChime();
    setToastMessage(`शिकायत ${randomId} दर्ज कर ली गई है! 48 घंटे में समाधान सुनिश्चित है।`);
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 flex items-center gap-2">
              <AlertTriangle className="w-8 h-8 text-amber-600" />
              {t.disputesTitle}
            </h1>
            <span className="bg-amber-100 text-amber-900 text-xs font-black px-2.5 py-0.5 rounded-full border border-amber-300">
              48-Hour Fast Redressal SLA
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            भुगतान देरी, वजन अंतर, गुणवत्ता या परिवहन विवादों का निष्पक्ष एवं कानूनी मध्यस्थता समाधान
          </p>
        </div>

        <button
          onClick={() => setIsFiling(true)}
          className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          {t.raiseGrievance}
        </button>
      </div>

      {toastMessage && (
        <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-950 font-bold text-sm rounded-2xl flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
          {toastMessage}
        </div>
      )}

      {/* FILE NEW GRIEVANCE MODAL */}
      {isFiling && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-rose-400 shadow-2xl space-y-6 animate-in slide-in-from-top-4 duration-200">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-gray-900">{t.raiseGrievance}</h3>
                <p className="text-xs text-gray-500">
                  हमारे मध्यस्थ अधिकारी 48 घंटे में कांटा पर्ची व एस्क्रो लॉक राशि के आधार पर न्याय दिलाएंगे
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsFiling(false)}
              className="text-gray-400 hover:text-gray-700 text-sm font-bold cursor-pointer"
            >
              ✕ रद्द करें
            </button>
          </div>

          <form onSubmit={handleFileGrievance} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  लॉट कोड / सौदा संदर्भ:
                </label>
                <input
                  type="text"
                  value={lotCode}
                  onChange={(e) => setLotCode(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-sm font-mono font-bold text-gray-900 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  विपक्ष पार्टी (खरीदार / ट्रांसपोर्टर):
                </label>
                <input
                  type="text"
                  value={againstParty}
                  onChange={(e) => setAgainstParty(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-sm font-bold text-gray-900 focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  शिकायत की श्रेणी:
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-sm font-bold text-gray-900 focus:outline-none"
                >
                  <option value="PAYMENT_DELAY">{t.paymentDelay}</option>
                  <option value="QUALITY_DISPUTE">{t.qualityDispute}</option>
                  <option value="QUANTITY_MISMATCH">{t.quantityMismatch}</option>
                  <option value="TRANSPORT_DAMAGE">{t.transportDamage}</option>
                  <option value="CONTRACT_VIOLATION">{t.contractViolation}</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">
                शिकायत का शीर्षक:
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-sm font-bold text-gray-900 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">
                विस्तृत विवरण (घटना का समय, स्थान व बातचीत):
              </label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-sm text-gray-900 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 block mb-1">
                📸 सबूत दस्तावेज अपलोड करें (कांटा पर्ची, लैब टेस्ट रिपोर्ट, फोटो):
              </label>
              <label className="flex items-center gap-2 px-3 py-2.5 bg-gray-50 border border-gray-300 rounded-xl text-xs text-gray-700 font-bold cursor-pointer hover:bg-emerald-50 transition">
                <Upload className="w-4 h-4 text-emerald-600" />
                फाइल चुनें ({evidenceFileName})
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setEvidenceFileName(e.target.files[0].name);
                    }
                  }}
                />
              </label>
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setIsFiling(false)}
                className="px-4 py-2 text-xs font-bold text-gray-600 hover:text-gray-900"
              >
                रद्द करें
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs rounded-xl shadow-md transition"
              >
                शिकायत दर्ज करें (Submit Grievance)
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Grievances List */}
      <div className="space-y-6">
        {grievances.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 hover:border-amber-400 shadow-sm space-y-5"
          >
            {/* Top row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs bg-gray-100 text-gray-800 px-2.5 py-0.5 rounded-md">
                    {c.grievanceId}
                  </span>
                  <span className="text-[11px] font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded-md">
                    {c.categoryHi}
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-gray-900 mt-1">{c.title}</h3>
                <p className="text-xs text-gray-500">विपक्ष पार्टी: <strong>{c.againstParty}</strong> • लॉट: {c.lotCode}</p>
              </div>

              <span
                className={`text-xs font-black px-3 py-1 rounded-full self-start sm:self-auto ${
                  c.status === "RESOLVED"
                    ? "bg-emerald-600 text-white"
                    : c.status === "RESOLUTION_PROPOSED"
                    ? "bg-amber-500 text-amber-950 animate-pulse"
                    : "bg-blue-600 text-white"
                }`}
              >
                {c.statusHi}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-2xl border border-gray-100">
              {c.description}
            </p>

            {/* Resolution Note if Proposed/Resolved */}
            {c.resolutionNote && (
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-300 space-y-1 text-xs">
                <span className="font-extrabold text-emerald-950 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  मध्यस्थता अधिकारी का अंतिम निर्णय व समाधान:
                </span>
                <p className="text-emerald-900 leading-relaxed font-medium">
                  {c.resolutionNote}
                </p>
              </div>
            )}

            {/* Step Progress Tracker */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs pt-2">
              {c.steps.map((step, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-xl border text-center ${
                    step.done
                      ? "bg-emerald-50 border-emerald-300 text-emerald-950 font-bold"
                      : "bg-gray-50 border-gray-200 text-gray-400"
                  }`}
                >
                  <div className="text-[11px] truncate">{step.stage}</div>
                  <span className="text-[10px] text-gray-500 block mt-0.5">{step.date}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
