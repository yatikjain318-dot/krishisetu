"use client";

import React, { useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { INITIAL_OFFERS, DigitalOffer } from "@/lib/data/mock-data";
import { NegotiationModal } from "@/components/negotiation-modal";
import {
  Handshake,
  Check,
  X,
  MessageSquare,
  Clock,
  ShieldCheck,
  CreditCard,
  CheckCircle2,
  DollarSign,
  ArrowRight,
  Send,
} from "lucide-react";
import Link from "next/link";

export default function OffersPage() {
  const { t, playChime } = useI18n();

  const [offers, setOffers] = useState<DigitalOffer[]>(INITIAL_OFFERS);
  const [selectedOfferForModal, setSelectedOfferForModal] = useState<DigitalOffer | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleAcceptOffer = (offerId: string) => {
    setOffers((prev) =>
      prev.map((o) =>
        o.id === offerId
          ? {
              ...o,
              offerStatus: "ACCEPTED",
              negotiationHistory: [
                ...o.negotiationHistory,
                {
                  sender: "FARMER",
                  price: o.offeredPrice,
                  note: "सौदा स्वीकार किया गया! एस्क्रो सुरक्षित आदेश जनरेट हुआ।",
                  timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                },
              ],
            }
          : o
      )
    );
    setToastMessage("सौदा स्वीकार हुआ! एस्क्रो ऑर्डर कन्फर्म हो गया है।");
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleCounterOffer = (offerId: string, counterPrice: number, note: string) => {
    setOffers((prev) =>
      prev.map((o) =>
        o.id === offerId
          ? {
              ...o,
              offeredPrice: counterPrice,
              offerStatus: "COUNTERED",
              negotiationHistory: [
                ...o.negotiationHistory,
                {
                  sender: "FARMER",
                  price: counterPrice,
                  note,
                  timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                },
              ],
            }
          : o
      )
    );
    setToastMessage(`काउंटर ऑफर (₹${counterPrice}/क्विंटल) खरीदार को भेजा गया!`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleRejectOffer = (offerId: string) => {
    setOffers((prev) =>
      prev.map((o) => (o.id === offerId ? { ...o, offerStatus: "REJECTED" } : o))
    );
    setToastMessage("प्रस्ताव अस्वीकार कर दिया गया।");
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 flex items-center gap-2">
              <Handshake className="w-8 h-8 text-emerald-600" />
              {t.digitalOffersTitle}
            </h1>
            <span className="bg-amber-100 text-amber-900 text-xs font-black px-2.5 py-0.5 rounded-full border border-amber-300">
              {offers.filter((o) => o.offerStatus === "PENDING" || o.offerStatus === "COUNTERED").length} सक्रिय बातचीत
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            खरीदारों से प्राप्त डिजिटल मूल्य प्रस्ताव, ऑनलाइन मोलभाव एवं एस्क्रो सुरक्षित अनुबंध
          </p>
        </div>

        <Link
          href="/transactions"
          className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 font-bold text-xs rounded-xl transition flex items-center gap-1.5 self-start sm:self-auto"
        >
          <CreditCard className="w-4 h-4 text-emerald-700" />
          भुगतान व रसीदें देखें
        </Link>
      </div>

      {toastMessage && (
        <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-950 font-bold text-sm rounded-2xl flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
          {toastMessage}
        </div>
      )}

      {/* Offers Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {offers.map((offer) => {
          const isPending = offer.offerStatus === "PENDING";
          const isCountered = offer.offerStatus === "COUNTERED";
          const isAccepted = offer.offerStatus === "ACCEPTED";
          const isRejected = offer.offerStatus === "REJECTED";

          return (
            <div
              key={offer.id}
              className={`bg-white rounded-3xl p-6 border transition shadow-xs hover:shadow-xl space-y-5 flex flex-col justify-between ${
                isAccepted
                  ? "border-emerald-500 bg-emerald-50/30"
                  : isRejected
                  ? "border-gray-300 opacity-60"
                  : "border-gray-200 hover:border-emerald-400"
              }`}
            >
              <div>
                {/* Top Row */}
                <div className="flex items-center justify-between gap-2 border-b border-gray-100 pb-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-gray-500 block">
                      लॉट आईडी: {offer.lotCode}
                    </span>
                    <h3 className="font-extrabold text-base text-gray-900">{offer.cropName}</h3>
                  </div>

                  <span
                    className={`text-xs font-black px-3 py-1 rounded-full ${
                      isAccepted
                        ? "bg-emerald-600 text-white"
                        : isCountered
                        ? "bg-amber-500 text-amber-950"
                        : isRejected
                        ? "bg-rose-600 text-white"
                        : "bg-blue-600 text-white"
                    }`}
                  >
                    {isAccepted
                      ? "सौदा स्वीकृत ✓ (Order Created)"
                      : isCountered
                      ? "काउंटर भेजा गया"
                      : isRejected
                      ? "अस्वीकृत"
                      : "नया प्रस्ताव प्राप्त"}
                  </span>
                </div>

                {/* Buyer & Price Row */}
                <div className="mt-4 p-4 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-between">
                  <div>
                    <div className="font-extrabold text-sm text-gray-900 flex items-center gap-1">
                      {offer.buyerName}
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      ⭐ {offer.buyerRating} • {offer.paymentTerms}
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-xs text-gray-500 font-bold block">प्रस्तावित दर:</span>
                    <span className="text-2xl font-black text-emerald-700">₹{offer.offeredPrice}</span>
                    <span className="text-[10px] text-gray-500 block font-medium">/ क्विंटल</span>
                  </div>
                </div>

                {/* Summary Metrics */}
                <div className="grid grid-cols-2 gap-2 text-xs mt-3">
                  <div className="bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100">
                    <span className="text-gray-500 block">मात्रा (Quantity):</span>
                    <span className="font-extrabold text-emerald-950">{offer.quantityQtl} क्विंटल</span>
                  </div>
                  <div className="bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100">
                    <span className="text-gray-500 block">कुल सौदा मूल्य:</span>
                    <span className="font-extrabold text-emerald-950">
                      ₹{offer.totalValue.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                {/* Latest Negotiation Message */}
                {offer.negotiationHistory.length > 0 && (
                  <div className="mt-3 text-xs bg-gray-100/80 p-3 rounded-xl border border-gray-200">
                    <div className="font-bold text-gray-700 mb-1 flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5 text-gray-500" />
                      नवीनतम संदेश ({offer.negotiationHistory[offer.negotiationHistory.length - 1].sender === "BUYER" ? offer.buyerName : "आप"}):
                    </div>
                    <p className="text-gray-600 italic">
                      &ldquo;{offer.negotiationHistory[offer.negotiationHistory.length - 1].note}&rdquo;
                    </p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                {isAccepted ? (
                  <div className="w-full flex items-center justify-between text-xs font-bold text-emerald-800 bg-emerald-100 p-2.5 rounded-xl">
                    <span>✓ एस्क्रो में ₹{offer.totalValue.toLocaleString("en-IN")} सुरक्षित</span>
                    <Link href="/transport" className="underline text-emerald-950">
                      परिवहन ट्रैक करें →
                    </Link>
                  </div>
                ) : isRejected ? (
                  <span className="text-xs text-gray-400 font-bold">यह प्रस्ताव समाप्त हो चुका है।</span>
                ) : (
                  <>
                    <button
                      onClick={() => handleRejectOffer(offer.id)}
                      className="px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition cursor-pointer"
                    >
                      अस्वीकार करें
                    </button>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedOfferForModal(offer)}
                        className="px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs rounded-xl transition cursor-pointer flex items-center gap-1"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-amber-700" />
                        काउंटर ऑफर दें
                      </button>

                      <button
                        onClick={() => handleAcceptOffer(offer.id)}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-xs transition cursor-pointer flex items-center gap-1"
                      >
                        <Check className="w-4 h-4" />
                        स्वीकार करें
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Negotiation Modal */}
      <NegotiationModal
        isOpen={!!selectedOfferForModal}
        onClose={() => setSelectedOfferForModal(null)}
        offer={selectedOfferForModal}
        onAccept={handleAcceptOffer}
        onCounter={handleCounterOffer}
        onReject={handleRejectOffer}
      />
    </div>
  );
}
