"use client";

import React, { useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { FPO_DATA, FPOAggregation } from "@/lib/data/mock-data";
import {
  Users,
  Plus,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  DollarSign,
  Award,
  Sparkles,
  ArrowRight,
  Handshake,
  UserPlus,
} from "lucide-react";

export default function FPOPage() {
  const { t, playChime } = useI18n();

  const [fpoList, setFpoList] = useState<FPOAggregation[]>(FPO_DATA);
  const [selectedFPO, setSelectedFPO] = useState<FPOAggregation>(FPO_DATA[0]);

  const [isAddingMember, setIsAddingMember] = useState(false);
  const [newMemberName, setNewMemberName] = useState("");
  const [newMemberVillage, setNewMemberVillage] = useState("");
  const [newMemberQty, setNewMemberQty] = useState(40);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName) return;

    playChime();
    const payout = newMemberQty * selectedFPO.offeredPrice;
    const updatedMembers = [
      ...selectedFPO.members,
      {
        farmerName: newMemberName,
        village: newMemberVillage || "चौमूं",
        quantityQtl: Number(newMemberQty),
        payout,
        status: "QUEUED",
      },
    ];

    const updatedFPO: FPOAggregation = {
      ...selectedFPO,
      totalAggregatedQtl: selectedFPO.totalAggregatedQtl + Number(newMemberQty),
      memberFarmersCount: selectedFPO.memberFarmersCount + 1,
      totalFpoExtraProfit:
        selectedFPO.totalFpoExtraProfit +
        Number(newMemberQty) * (selectedFPO.offeredPrice - selectedFPO.localMandiBenchmark),
      members: updatedMembers,
    };

    setSelectedFPO(updatedFPO);
    setFpoList((prev) => prev.map((f) => (f.id === updatedFPO.id ? updatedFPO : f)));
    setIsAddingMember(false);
    setToastMessage(`सदस्य ${newMemberName} की उपज (${newMemberQty} क्विंटल) बल्क लॉट में जोड़ी गई!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleDisburseAll = () => {
    playChime();
    const updatedMembers = selectedFPO.members.map((m) => ({ ...m, status: "DISBURSED" }));
    const updatedFPO: FPOAggregation = {
      ...selectedFPO,
      status: "PAYOUTS_DISTRIBUTED",
      members: updatedMembers,
    };
    setSelectedFPO(updatedFPO);
    setToastMessage("सभी सदस्य किसानों के बैंक खातों में डीबीटी भुगतान सफलतापूर्वक जारी किया गया!");
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 flex items-center gap-2">
              <Users className="w-8 h-8 text-emerald-600" />
              {t.fpoTitle}
            </h1>
            <span className="bg-rose-100 text-rose-900 text-xs font-black px-2.5 py-0.5 rounded-full border border-rose-300">
              Bulk Aggregation Hub
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            छोटे किसानों की फसल जोड़कर 250 टन का वाणिज्यिक थोक लॉट बनाएं, बड़े कॉर्पोरेट खरीदारों से उच्चतम टेंडर भाव पाएं
          </p>
        </div>

        <button
          onClick={() => setIsAddingMember(true)}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <UserPlus className="w-4 h-4" />
          नया किसान / उपज जोड़ें
        </button>
      </div>

      {toastMessage && (
        <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-950 font-bold text-sm rounded-2xl flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
          {toastMessage}
        </div>
      )}

      {/* Add Member Form Modal */}
      {isAddingMember && (
        <div className="bg-white rounded-3xl p-6 border-2 border-emerald-500 shadow-xl space-y-4 animate-in slide-in-from-top-3">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <h3 className="font-extrabold text-base text-gray-900 flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-emerald-600" />
              सदस्य किसान की उपज एग्रीगेट करें
            </h3>
            <button
              onClick={() => setIsAddingMember(false)}
              className="text-xs font-bold text-gray-400 hover:text-gray-700"
            >
              ✕ बंद करें
            </button>
          </div>

          <form onSubmit={handleAddMember} className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <label className="font-bold text-gray-700 block mb-1">किसान का नाम:</label>
              <input
                type="text"
                placeholder="उदा. घासीराम यादव"
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl font-bold"
                required
              />
            </div>
            <div>
              <label className="font-bold text-gray-700 block mb-1">गांव का नाम:</label>
              <input
                type="text"
                placeholder="उदा. सामोद"
                value={newMemberVillage}
                onChange={(e) => setNewMemberVillage(e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl"
              />
            </div>
            <div>
              <label className="font-bold text-gray-700 block mb-1">मात्रा (क्विंटल):</label>
              <input
                type="number"
                min={5}
                max={500}
                value={newMemberQty}
                onChange={(e) => setNewMemberQty(Number(e.target.value))}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl font-bold"
                required
              />
            </div>

            <div className="sm:col-span-3 flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddingMember(false)}
                className="px-4 py-2 font-bold text-gray-600"
              >
                रद्द करें
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-xl shadow-xs"
              >
                लॉट में जोड़ें
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Selected FPO Aggregation Spotlight */}
      <div className="bg-gradient-to-br from-emerald-900 via-emerald-950 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-800 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-white">{selectedFPO.fpoName}</h2>
              <span className="text-xs bg-amber-400 text-amber-950 font-black px-2.5 py-0.5 rounded-full">
                टेंडर स्वीकृत ✓
              </span>
            </div>
            <p className="text-xs text-emerald-200 mt-1">
              फसल: <strong>{selectedFPO.crop}</strong> • खरीदार: <strong>{selectedFPO.targetBuyer}</strong>
            </p>
          </div>

          <div className="text-right">
            <span className="text-xs text-emerald-300 font-semibold block">थोक टेंडर भाव:</span>
            <span className="text-2xl font-black text-amber-300">
              ₹{selectedFPO.offeredPrice} <span className="text-xs font-normal text-white">/ क्विंटल</span>
            </span>
            <span className="text-[11px] text-emerald-300 block font-semibold">
              (स्थानीय मंडी ₹{selectedFPO.localMandiBenchmark} से ₹{selectedFPO.offeredPrice - selectedFPO.localMandiBenchmark} अधिक)
            </span>
          </div>
        </div>

        {/* Big Impact Stat Numbers */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
          <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
            <span className="text-emerald-300 font-semibold block">कुल जुड़े किसान</span>
            <span className="text-2xl font-black text-white font-mono mt-1">
              {selectedFPO.memberFarmersCount} किसान
            </span>
          </div>
          <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
            <span className="text-emerald-300 font-semibold block">एकत्रित कुल मात्रा</span>
            <span className="text-2xl font-black text-amber-300 font-mono mt-1">
              {selectedFPO.totalAggregatedQtl} Qtl ({selectedFPO.totalAggregatedQtl / 10} टन)
            </span>
          </div>
          <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
            <span className="text-emerald-300 font-semibold block">कुल टेंडर व्यापार मूल्य</span>
            <span className="text-2xl font-black text-white font-mono mt-1">
              ₹{((selectedFPO.totalAggregatedQtl * selectedFPO.offeredPrice) / 100000).toFixed(2)} Lakh
            </span>
          </div>
          <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
            <span className="text-emerald-300 font-semibold block">FPO कुल अतिरिक्त लाभ</span>
            <span className="text-2xl font-black text-emerald-400 font-mono mt-1">
              + ₹{(selectedFPO.totalFpoExtraProfit / 100000).toFixed(2)} Lakh
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="text-xs text-emerald-200">
            💡 <strong>थोक शक्ति (Bargaining Power):</strong> 100 किसानों की फसल एक साथ बेचने पर प्रति क्विंटल ₹260 अधिक भाव प्राप्त हुआ।
          </div>
          <button
            onClick={handleDisburseAll}
            className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-amber-950 font-black text-xs rounded-xl shadow-md transition cursor-pointer"
          >
            {t.disbursePayouts} (DBT बैंक वितरण)
          </button>
        </div>
      </div>

      {/* Member Roster Table */}
      <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-base text-gray-900">
            सदस्य किसानों की सूची एवं भुगतान स्थिति (Member Roster)
          </h3>
          <span className="text-xs text-gray-500 font-bold">
            {selectedFPO.members.length} पंजीकृत सदस्य
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-gray-50 text-gray-600 font-bold border-y border-gray-100">
                <th className="py-3 px-3">किसान का नाम</th>
                <th className="py-3 px-3">गांव / स्थान</th>
                <th className="py-3 px-3">योगदान मात्रा</th>
                <th className="py-3 px-3">कुल भुगतान राशि</th>
                <th className="py-3 px-3">स्थिति</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {selectedFPO.members.map((m, i) => (
                <tr key={i} className="hover:bg-emerald-50/50">
                  <td className="py-3 px-3 font-bold text-gray-900">{m.farmerName}</td>
                  <td className="py-3 px-3 text-gray-600">{m.village}</td>
                  <td className="py-3 px-3 font-bold text-emerald-800">{m.quantityQtl} क्विंटल</td>
                  <td className="py-3 px-3 font-black text-gray-900">₹{m.payout.toLocaleString("en-IN")}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                        m.status === "DISBURSED"
                          ? "bg-emerald-100 text-emerald-800"
                          : m.status === "PROCESSING"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {m.status === "DISBURSED"
                        ? "बैंक खाते में जमा ✓"
                        : m.status === "PROCESSING"
                        ? "प्रोसेसिंग में..."
                        : "कतारबद्ध"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
