"use client";

import React, { useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { DigitalOffer } from "@/lib/data/mock-data";
import { Handshake, X, Check, ArrowRight, ShieldCheck, Clock, Send, MessageSquare, AlertCircle } from "lucide-react";

interface NegotiationModalProps {
  isOpen: boolean;
  onClose: () => void;
  offer: DigitalOffer | null;
  onAccept: (offerId: string) => void;
  onCounter: (offerId: string, counterPrice: number, note: string) => void;
  onReject: (offerId: string) => void;
}

export function NegotiationModal({
  isOpen,
  onClose,
  offer,
  onAccept,
  onCounter,
  onReject,
}: NegotiationModalProps) {
  const { t, language, playChime } = useI18n();
  const isEn = language === "en";

  const [counterPrice, setCounterPrice] = useState<number>(offer ? offer.offeredPrice + 50 : 2700);
  const [counterNote, setCounterNote] = useState("");
  const [isCounterMode, setIsCounterMode] = useState(false);

  if (!isOpen || !offer) return null;

  const handleSendCounter = () => {
    onCounter(offer.id, counterPrice, counterNote || (isEn ? "Proposed revised price." : "प्रस्तावित संशोधित मूल्य।"));
    playChime();
    setIsCounterMode(false);
    onClose();
  };

  const handleAccept = () => {
    onAccept(offer.id);
    playChime();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-emerald-100 flex flex-col">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-emerald-800 to-teal-800 text-white flex items-center justify-between rounded-t-3xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
              <Handshake className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg flex items-center gap-2">
                {t.digitalOffersTitle}
              </h3>
              <span className="text-xs text-emerald-200">
                {isEn ? "Lot Code: " : "लॉट कोड: "}
                <span className="font-mono font-bold text-white">{offer.lotCode}</span>
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-5 flex-1">
          {/* Buyer Info Card */}
          <div className="bg-gray-50 border border-gray-200 p-4 rounded-2xl flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="font-extrabold text-base text-gray-900">{offer.buyerName}</h4>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" /> Verified Buyer
                </span>
              </div>
              <div className="text-xs text-gray-600 mt-1">
                ⭐ {offer.buyerRating} / 5.0 • {isEn ? "100% Escrow Payout Record" : "100% एस्क्रो भुगतान रिकॉर्ड"}
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-500 font-bold block">{isEn ? "Offered Price:" : "प्रस्तावित भाव:"}</span>
              <span className="text-xl font-black text-emerald-700">₹{offer.offeredPrice}</span>
              <span className="text-[11px] text-gray-500 font-medium block">/ quintal</span>
            </div>
          </div>

          {/* Offer Key Details */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200">
              <span className="text-emerald-800 font-bold block">{isEn ? "Quantity:" : "मात्रा (Quantity):"}</span>
              <span className="text-base font-extrabold text-emerald-950">{offer.quantityQtl} {isEn ? "Quintals" : "क्विंटल"}</span>
            </div>
            <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200">
              <span className="text-emerald-800 font-bold block">{isEn ? "Total Amount:" : "कुल मूल्य (Total):"}</span>
              <span className="text-base font-extrabold text-emerald-950">₹{offer.totalValue.toLocaleString("en-IN")}</span>
            </div>
            <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200 col-span-2 sm:col-span-1">
              <span className="text-emerald-800 font-bold block">{isEn ? "Logistics:" : "उठाव / डिलीवरी:"}</span>
              <span className="text-sm font-extrabold text-emerald-950">
                {offer.pickupOrDelivery === "FARM_PICKUP"
                  ? isEn
                    ? "🚜 Farm Gate Pickup"
                    : "🚜 खेत से उठाव (Farm Pickup)"
                  : isEn
                  ? "🚚 Mandi Delivery"
                  : "🚚 मंडी डिलीवरी"}
              </span>
            </div>
          </div>

          {/* Payment Terms Banner */}
          <div className="bg-blue-50 border border-blue-200 p-3.5 rounded-2xl flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-blue-600 shrink-0" />
            <div className="text-xs text-blue-950">
              <span className="font-bold block">{isEn ? "Payment Terms:" : "भुगतान शर्तें (Payment Terms):"}</span>
              {offer.paymentTerms}
            </div>
          </div>

          {/* Negotiation Trail / History */}
          <div>
            <span className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-2">
              📜 {isEn ? "Negotiation Trail & Messages:" : "बातचीत व मोलभाव का इतिहास:"}
            </span>
            <div className="space-y-2 border border-gray-200 rounded-2xl p-3 bg-gray-50 max-h-40 overflow-y-auto">
              {offer.negotiationHistory.map((h, i) => (
                <div
                  key={i}
                  className={`p-2.5 rounded-xl text-xs ${
                    h.sender === "BUYER"
                      ? "bg-white border border-gray-200 text-gray-800"
                      : "bg-emerald-100 border border-emerald-300 text-emerald-950 ml-6"
                  }`}
                >
                  <div className="flex items-center justify-between font-bold mb-1">
                    <span>{h.sender === "BUYER" ? `🏭 ${offer.buyerName}` : isEn ? "👨🌾 You (Seller)" : "👨🌾 आप (किसान)"}</span>
                    <span className="text-emerald-700 font-extrabold">₹{h.price}/qtl</span>
                  </div>
                  <p className="text-gray-600">{h.note}</p>
                  <span className="text-[10px] text-gray-400 block mt-1">⏱️ {h.timestamp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Counter Offer Form (if toggled) */}
          {isCounterMode && (
            <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-400 space-y-3 animate-in fade-in duration-150">
              <h5 className="text-xs font-extrabold text-amber-950 uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-amber-600" />
                {isEn ? "Submit Counter Offer" : "काउंटर ऑफर दर्ज करें"}
              </h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    {isEn ? "Your Counter Price (₹/qtl):" : "आपका काउंटर भाव (₹/क्विंटल):"}
                  </label>
                  <input
                    type="number"
                    value={counterPrice}
                    onChange={(e) => setCounterPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-sm font-bold text-gray-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    {isEn ? "Message / Note:" : "संदेश / टिप्पणी:"}
                  </label>
                  <input
                    type="text"
                    placeholder={isEn ? "e.g. Farm gate pickup required" : "उदा. खेत से उठाव आवश्यक है"}
                    value={counterNote}
                    onChange={(e) => setCounterNote(e.target.value)}
                    className="w-full px-3 py-2 bg-white border border-gray-300 rounded-xl text-sm text-gray-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-1">
                <button
                  onClick={() => setIsCounterMode(false)}
                  className="px-3 py-1.5 text-xs font-bold text-gray-600 hover:text-gray-900"
                >
                  {isEn ? "Cancel" : "रद्द करें"}
                </button>
                <button
                  onClick={handleSendCounter}
                  className="px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-amber-950 font-black text-xs rounded-xl shadow-xs cursor-pointer flex items-center gap-1"
                >
                  <Send className="w-3.5 h-3.5" /> {isEn ? "Send Counter Offer" : "काउंटर ऑफर भेजें"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 rounded-b-3xl flex flex-wrap items-center justify-between gap-2">
          <button
            onClick={() => onReject(offer.id)}
            className="px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 border border-rose-200 rounded-xl transition cursor-pointer"
          >
            {isEn ? "Reject Offer" : "अस्वीकार करें (Reject)"}
          </button>

          <div className="flex items-center gap-2">
            {!isCounterMode && (
              <button
                onClick={() => setIsCounterMode(true)}
                className="px-4 py-2 bg-white hover:bg-amber-50 text-amber-900 border border-amber-300 font-bold text-xs rounded-xl transition cursor-pointer flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
                {isEn ? "Negotiate / Counter" : "मोलभाव / काउंटर ऑफर दें"}
              </button>
            )}

            <button
              onClick={handleAccept}
              className="px-5 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-extrabold text-xs rounded-xl shadow-md transition cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              {isEn ? `Accept Deal (₹${offer.offeredPrice}/qtl)` : `सौदा स्वीकार करें (Accept ₹${offer.offeredPrice}/qtl)`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
