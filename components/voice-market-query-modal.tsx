"use client";

import React, { useState, useEffect } from "react";
import { useI18n } from "@/lib/i18n/context";
import { Mic, MicOff, Volume2, VolumeX, X, Sparkles, ArrowRight, TrendingUp, Store, ShieldCheck, CheckCircle2 } from "lucide-react";
import { startSpeechRecognition, speakText, stopSpeaking, parseFarmerVoiceQuery, ParsedVoiceQuery } from "@/lib/speech";
import { MANDIS_DATA, CROPS_INTELLIGENCE, VERIFIED_BUYERS } from "@/lib/data/mock-data";
import Link from "next/link";

interface VoiceMarketQueryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export function VoiceMarketQueryModal({ isOpen, onClose, initialQuery }: VoiceMarketQueryModalProps) {
  const { t, language, currentLanguage, playChime } = useI18n();
  const isEn = language === "en";

  const [isListening, setIsListening] = useState(false);
  const [spokenText, setSpokenText] = useState(initialQuery || "");
  const [parsedResult, setParsedResult] = useState<ParsedVoiceQuery | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechStopper, setSpeechStopper] = useState<{ stop: () => void } | null>(null);

  const sampleVoicePrompts = isEn
    ? [
        { text: "What is today's modal price for Wheat?", crop: "wheat" },
        { text: "Who is the top verified buyer for Mustard?", crop: "mustard" },
        { text: "What is the profit if I store Soybean for 15 days?", crop: "soybean" },
        { text: "Which mandi offers the highest rate for Chana?", crop: "chana" },
        { text: "What is the current price of Red Onion?", crop: "onion" },
      ]
    : [
        { text: "मेरे गेहूं का आज का भाव क्या है?", crop: "wheat" },
        { text: "सरसों के लिए सबसे अच्छा खरीदार कौन है?", crop: "mustard" },
        { text: "अगर मैं सोयाबीन 15 दिन स्टोर करूं तो क्या फायदा होगा?", crop: "soybean" },
        { text: "आज चना किस मंडी में सबसे तेज बिक रहा है?", crop: "chana" },
        { text: "प्याज का आज आजादपुर मंडी में क्या भाव है?", crop: "onion" },
      ];

  useEffect(() => {
    if (isOpen && initialQuery) {
      handleProcessQuery(initialQuery);
    }
  }, [isOpen, initialQuery]);

  useEffect(() => {
    return () => {
      if (speechStopper) speechStopper.stop();
      stopSpeaking();
    };
  }, [speechStopper]);

  if (!isOpen) return null;

  const handleStartListening = () => {
    stopSpeaking();
    setIsSpeaking(false);
    setSpokenText("");
    setParsedResult(null);
    setIsListening(true);
    playChime();

    const recognition = startSpeechRecognition(currentLanguage.bcp47, {
      onResult: (transcript) => {
        setSpokenText(transcript);
        handleProcessQuery(transcript);
      },
      onError: (err) => {
        console.warn("Speech recognition error:", err);
        setIsListening(false);
      },
      onEnd: () => {
        setIsListening(false);
      },
    });

    if (recognition) {
      setSpeechStopper(recognition);
    } else {
      setTimeout(() => {
        const simulated = isEn
          ? "What is today's modal price for Wheat?"
          : "मेरे गेहूं का आज का भाव क्या है?";
        setSpokenText(simulated);
        handleProcessQuery(simulated);
        setIsListening(false);
      }, 1500);
    }
  };

  const handleStopListening = () => {
    if (speechStopper) {
      speechStopper.stop();
    }
    setIsListening(false);
  };

  const handleProcessQuery = (text: string) => {
    const parsed = parseFarmerVoiceQuery(text);
    setParsedResult(parsed);

    let responseSpeech = "";
    const cropId = parsed.cropId || "wheat";
    const cropMeta = CROPS_INTELLIGENCE.find((c) => c.id === cropId) || CROPS_INTELLIGENCE[0];
    const topMandiPrice = MANDIS_DATA[0].cropPrices.find((p) => p.cropId === cropId)?.modalPrice || cropMeta.currentAvgModal;

    if (isEn) {
      if (parsed.intent === "storage_query") {
        responseSpeech = `According to KrishiSetu AI intelligence, storing ${cropMeta.name} in WDRA silos can yield an extra ₹200 to ₹300 per quintal due to expected demand.`;
      } else if (parsed.intent === "buyer_query") {
        responseSpeech = `Top buyers like ITC and Reliance are offering ₹${topMandiPrice + 70} per quintal with 24-hour escrow DBT payout for ${cropMeta.name}.`;
      } else {
        responseSpeech = `Today's average modal price for ${cropMeta.name} is ₹${topMandiPrice} per quintal. AI recommends: ${cropMeta.aiRecommendation.action.replace(/_/g, " ")}.`;
      }
    } else {
      if (parsed.intent === "storage_query") {
        responseSpeech = `कृषि सेतु AI विश्लेषण के अनुसार ${cropMeta.nameHi} को वैज्ञानिक गोदाम में रखने से आगामी त्योहारी मांग के चलते प्रति क्विंटल ₹200 से ₹300 तक अतिरिक्त लाभ हो सकता है।`;
      } else if (parsed.intent === "buyer_query") {
        responseSpeech = `आपके निकटतम क्षेत्र में ${cropMeta.nameHi} के लिए ITC एवं रिलायंस जैसे सत्यापित खरीदार ₹${topMandiPrice + 70} प्रति क्विंटल की दर से 24 घंटे में एस्क्रो भुगतान का प्रस्ताव दे रहे हैं।`;
      } else {
        responseSpeech = `आज ${cropMeta.nameHi} का औसत मॉडल भाव ₹${topMandiPrice} प्रति क्विंटल है। AI का अनुमान है: ${cropMeta.aiRecommendation.reasonHi}`;
      }
    }

    // Auto-speak response
    setTimeout(() => {
      speakText(responseSpeech, currentLanguage.bcp47);
      setIsSpeaking(true);
    }, 400);
  };

  const handleToggleSpeak = () => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else if (parsedResult) {
      const cropId = parsedResult.cropId || "wheat";
      const cropMeta = CROPS_INTELLIGENCE.find((c) => c.id === cropId) || CROPS_INTELLIGENCE[0];
      const topMandiPrice = MANDIS_DATA[0].cropPrices.find((p) => p.cropId === cropId)?.modalPrice || cropMeta.currentAvgModal;
      const speech = isEn
        ? `Today's modal price for ${cropMeta.name} is ₹${topMandiPrice} per quintal.`
        : `आज ${cropMeta.nameHi} का भाव ₹${topMandiPrice} प्रति क्विंटल है।`;
      speakText(speech, currentLanguage.bcp47);
      setIsSpeaking(true);
    }
  };

  const activeCrop = parsedResult?.cropId
    ? CROPS_INTELLIGENCE.find((c) => c.id === parsedResult.cropId) || CROPS_INTELLIGENCE[0]
    : CROPS_INTELLIGENCE[0];

  const matchingBuyers = VERIFIED_BUYERS.filter((b) => b.crops.includes(activeCrop.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-emerald-100 flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-emerald-800 to-teal-800 text-white flex items-center justify-between rounded-t-3xl relative">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
              <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg sm:text-xl flex items-center gap-2">
                {t.aiAssistantTitle}
                <span className="text-xs bg-emerald-500/40 text-emerald-100 px-2 py-0.5 rounded-full border border-emerald-400/30">
                  {currentLanguage.name}
                </span>
              </h3>
              <p className="text-xs text-emerald-200">{t.voiceAssistantSubtitle}</p>
            </div>
          </div>
          <button
            onClick={() => {
              stopSpeaking();
              onClose();
            }}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-5 flex-1">
          {/* Big Interactive Mic Button */}
          <div className="text-center py-2">
            <div className="relative inline-block">
              {isListening && (
                <span className="absolute -inset-3 rounded-full bg-emerald-400/30 animate-ping" />
              )}
              <button
                onClick={isListening ? handleStopListening : handleStartListening}
                className={`relative w-20 h-20 rounded-full flex items-center justify-center text-white shadow-xl transition-all transform hover:scale-105 cursor-pointer ${
                  isListening
                    ? "bg-gradient-to-tr from-rose-600 to-red-500 ring-4 ring-rose-200"
                    : "bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 ring-4 ring-emerald-100"
                }`}
              >
                {isListening ? (
                  <MicOff className="w-9 h-9 animate-pulse" />
                ) : (
                  <Mic className="w-9 h-9" />
                )}
              </button>
            </div>

            <div className="mt-3">
              <span className={`text-sm font-bold ${isListening ? "text-rose-600 animate-pulse" : "text-emerald-900"}`}>
                {isListening
                  ? isEn
                    ? "🎙️ Listening... Please speak your query"
                    : "🎙️ सुन रहे हैं... कृपया अपनी भाषा में बोलिए"
                  : isEn
                  ? "Tap the microphone and ask your crop query"
                  : "माइक दबाएं और अपनी फसल का भाव पूछें"}
              </span>
              <p className="text-xs text-gray-500 mt-0.5">
                {isEn ? "(e.g. 'What is the price of Wheat today?')" : "(उदाहरण: 'मेरे गेहूं का आज का भाव क्या है?')"}
              </p>
            </div>
          </div>

          {/* Spoken Text Display */}
          {spokenText && (
            <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4 flex items-start justify-between gap-3">
              <div>
                <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider block mb-1">
                  🗣️ {isEn ? "Your Voice Query:" : "आपका सवाल:"}
                </span>
                <p className="text-base font-bold text-emerald-950">&ldquo;{spokenText}&rdquo;</p>
                {parsedResult?.cropName && (
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs">
                    <span className="bg-emerald-200/80 text-emerald-900 px-2 py-0.5 rounded-md font-bold">
                      🌾 {parsedResult.cropName}
                    </span>
                    <span className="bg-teal-100 text-teal-900 px-2 py-0.5 rounded-md font-bold uppercase">
                      🔍 {parsedResult.intent.replace("_", " ")}
                    </span>
                  </div>
                )}
              </div>

              <button
                onClick={handleToggleSpeak}
                className="p-2 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition cursor-pointer"
                title={isSpeaking ? "Stop Voice" : "Listen in Voice"}
              >
                {isSpeaking ? <VolumeX className="w-5 h-5 text-rose-600" /> : <Volume2 className="w-5 h-5 text-emerald-700" />}
              </button>
            </div>
          )}

          {/* Quick Voice Query Chips */}
          <div>
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-2">
              ⚡ {isEn ? "Or click a quick prompt to ask:" : "सीधे क्लिक करके भी पूछ सकते हैं:"}
            </span>
            <div className="flex flex-wrap gap-2">
              {sampleVoicePrompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSpokenText(p.text);
                    handleProcessQuery(p.text);
                  }}
                  className="text-xs font-semibold bg-gray-100 hover:bg-emerald-100 text-gray-800 hover:text-emerald-950 px-3 py-2 rounded-xl border border-gray-200 hover:border-emerald-300 transition text-left cursor-pointer"
                >
                  💬 {p.text}
                </button>
              ))}
            </div>
          </div>

          {/* Parsed AI Intelligence & Mandi Comparison Result */}
          {parsedResult && activeCrop && (
            <div className="space-y-4 pt-2 border-t border-gray-100 animate-in fade-in slide-in-from-bottom-2 duration-200">
              {/* Recommendation Card */}
              <div className="bg-gradient-to-br from-emerald-900 to-teal-950 text-white p-4 sm:p-5 rounded-2xl shadow-lg relative overflow-hidden">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-xs uppercase tracking-wider font-extrabold text-emerald-300 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    {isEn ? "AI Price Recommendation" : "AI मूल्य सलाह"}
                  </span>
                  <span className="bg-amber-400 text-amber-950 text-xs font-black px-2.5 py-1 rounded-full">
                    {activeCrop.aiRecommendation.action.replace(/_/g, " ")}
                  </span>
                </div>

                <p className="text-sm font-medium leading-relaxed text-emerald-50 mb-3">
                  {isEn ? activeCrop.aiRecommendation.reasonEn : activeCrop.aiRecommendation.reasonHi}
                </p>

                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-emerald-700/50 text-center text-xs">
                  <div className="bg-white/10 p-2 rounded-xl">
                    <div className="text-emerald-300 font-semibold">{isEn ? "Today's Avg" : "आज का औसत"}</div>
                    <div className="text-base font-black text-white">₹{activeCrop.currentAvgModal}</div>
                  </div>
                  <div className="bg-white/10 p-2 rounded-xl">
                    <div className="text-emerald-300 font-semibold">{isEn ? "7-Day Forecast" : "7-दिन अनुमान"}</div>
                    <div className="text-base font-black text-amber-300">₹{activeCrop.aiRecommendation.targetPriceProjection}</div>
                  </div>
                  <div className="bg-white/10 p-2 rounded-xl">
                    <div className="text-emerald-300 font-semibold">{isEn ? "Govt MSP" : "सरकारी MSP"}</div>
                    <div className="text-base font-black text-white">₹{activeCrop.msp}</div>
                  </div>
                </div>
              </div>

              {/* Nearby Mandi Prices Table */}
              <div className="bg-white border border-gray-200 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                    <Store className="w-4 h-4 text-emerald-600" />
                    {isEn
                      ? `Today's Prices in Nearby Mandis (${activeCrop.name})`
                      : `निकटवर्ती मंडियों में आज का भाव (${activeCrop.nameHi})`}
                  </h4>
                  <Link
                    href="/prices"
                    onClick={onClose}
                    className="text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
                  >
                    {isEn ? "View Details" : "विस्तार से देखें"} <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="space-y-2">
                  {MANDIS_DATA.slice(0, 3).map((mandi) => {
                    const priceObj = mandi.cropPrices.find((c) => c.cropId === activeCrop.id) || mandi.cropPrices[0];
                    return (
                      <div
                        key={mandi.id}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 hover:bg-emerald-50 border border-gray-100 transition"
                      >
                        <div>
                          <div className="font-bold text-sm text-gray-900">
                            {isEn ? mandi.name : mandi.nameHi}
                          </div>
                          <div className="text-xs text-gray-500">
                            {isEn ? `Distance: ${mandi.distanceKm} km • Arrival: ${priceObj.arrivalTodayQtl} qtl` : `दूरी: ${mandi.distanceKm} किमी • आवक: ${priceObj.arrivalTodayQtl} क्विंटल`}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-base font-black text-emerald-700">₹{priceObj.modalPrice}</div>
                          <div className="text-[11px] font-bold text-emerald-600">
                            (₹{priceObj.minPrice} - ₹{priceObj.maxPrice})
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Top Verified Buyers for this Crop */}
              {matchingBuyers.length > 0 && (
                <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-bold text-amber-950 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-amber-600" />
                      {isEn ? "Matching Verified Buyers" : "उपलब्ध सत्यापित खरीदार"}
                    </h4>
                    <Link
                      href="/buyers"
                      onClick={onClose}
                      className="text-xs font-bold text-amber-800 hover:underline"
                    >
                      {isEn ? "All Buyers" : "सभी खरीदार देखें"}
                    </Link>
                  </div>
                  <div className="space-y-2">
                    {matchingBuyers.slice(0, 2).map((buyer) => (
                      <div
                        key={buyer.id}
                        className="bg-white p-3 rounded-xl border border-amber-200 flex items-center justify-between gap-3 shadow-2xs"
                      >
                        <div>
                          <div className="font-bold text-sm text-gray-900 flex items-center gap-1.5">
                            {buyer.name}
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                              ✓ Verified
                            </span>
                          </div>
                          <div className="text-xs text-gray-600 mt-0.5">
                            {isEn ? `Offered: ` : `प्रस्तावित भाव: `}
                            <span className="font-bold text-emerald-700">{buyer.offeredPriceRange}</span> • {isEn ? buyer.paymentTerms : buyer.paymentTermsHi}
                          </div>
                        </div>
                        <Link
                          href={`/buyers`}
                          onClick={onClose}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition shrink-0"
                        >
                          {isEn ? "Connect" : "सौदा करें"}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-gray-50 border-t border-gray-200 rounded-b-3xl flex items-center justify-between">
          <button
            onClick={() => {
              stopSpeaking();
              onClose();
            }}
            className="text-xs font-bold text-gray-600 hover:text-gray-900 px-4 py-2 rounded-xl hover:bg-gray-200 transition cursor-pointer"
          >
            {isEn ? "Close" : "बंद करें"}
          </button>
          <div className="flex items-center gap-2">
            <Link
              href="/prices"
              onClick={onClose}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition shadow-xs"
            >
              {isEn ? "View Complete Mandi Board" : "सम्पूर्ण मंडी रिपोर्ट देखें"}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
