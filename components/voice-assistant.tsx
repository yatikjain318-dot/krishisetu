"use client";

import React, { useState, useRef, useEffect } from "react";
import { useI18n } from "@/lib/i18n/context";
import {
  Mic,
  MicOff,
  Send,
  Volume2,
  VolumeX,
  Paperclip,
  Bot,
  User,
  Sparkles,
  Loader2,
  Image as ImageIcon,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { startSpeechRecognition, speakText, stopSpeaking, parseFarmerVoiceQuery } from "@/lib/speech";
import { MANDIS_DATA, CROPS_INTELLIGENCE, VERIFIED_BUYERS } from "@/lib/data/mock-data";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  mediaUrl?: string;
  timestamp: string;
}

export function VoiceAssistant() {
  const { t, currentLanguage, language, playChime } = useI18n();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "msg_init_1",
      role: "assistant",
      content:
        language === "en"
          ? "Namaste! I am your KrishiSetu AI Market & Farm Intelligence Assistant. You can speak or type in any of the 12 Indian languages to get instant answers about mandi prices, buyers, storage gains, or crop quality."
          : "नमस्ते किसान भाई! मैं आपका कृषिसेतु AI मंडी व फसल सलाहकार हूँ। आप अपनी बोली में बोलकर या लिखकर पूछ सकते हैं — जैसे 'मेरे गेहूं का आज का भाव क्या है?', 'सरसों कहाँ बेचें?', या 'स्टोरेज का फायदा' आदि।",
      timestamp: "अभी",
    },
  ]);

  const [inputQuery, setInputQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [attachedMedia, setAttachedMedia] = useState<string | null>(null);

  const speechControllerRef = useRef<{ stop: () => void } | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const suggestedQueries = [
    "मेरे पास 20 क्विंटल सरसों है, कहाँ बेचना बेस्ट रहेगा?",
    "आज मेरे पास कौनसे खरीदार सबसे अच्छे भाव दे रहे हैं?",
    "अगर मैं गेहूं 10 दिन स्टोर करूँ तो क्या फायदा हो सकता है?",
    "मेरी फसल के लिए Grade A क्वालिटी मानक क्या होने चाहिए?",
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleVoiceToggle = () => {
    if (isListening) {
      speechControllerRef.current?.stop();
      setIsListening(false);
      return;
    }

    playChime();
    setIsListening(true);
    const controller = startSpeechRecognition(currentLanguage.bcp47, {
      onResult: (transcript: string) => {
        setInputQuery(transcript);
      },
      onError: (err) => {
        console.error(err);
        setIsListening(false);
      },
      onEnd: () => {
        setIsListening(false);
      },
    });

    if (controller) {
      speechControllerRef.current = controller;
    } else {
      setTimeout(() => {
        setInputQuery("मेरे पास 20 क्विंटल सरसों है, कहाँ बेचना बेस्ट रहेगा?");
        setIsListening(false);
      }, 1500);
    }
  };

  const generateLocalAIResponse = (query: string): string => {
    const parsed = parseFarmerVoiceQuery(query);
    const cropId = parsed.cropId || "wheat";
    const crop = CROPS_INTELLIGENCE.find((c) => c.id === cropId) || CROPS_INTELLIGENCE[0];
    const topMandi = MANDIS_DATA[0];

    if (query.includes("20") || query.includes("sarson") || query.includes("सरसों") || query.includes("कहाँ बेचना")) {
      return `🌾 **सरसों (20 क्विंटल) विक्रय विश्लेषण:**\n\n1. **सर्वोत्तम खरीदार:** Adani Wilmar (Fortune) एवं ITC Alwar Hub ₹5,980/क्विंटल का भाव दे रहे हैं जो आपकी स्थानीय मंडी (₹5,690) से प्रति क्विंटल **₹290 अधिक** है।\n2. **सीधा खेत से उठाव:** 20 क्विंटल पर ₹5,800 का शुद्ध अतिरिक्त मुनाफा होगा।\n3. **एस्क्रो सुरक्षा:** माल लोड होते ही राशि एस्क्रो में सुरक्षित हो जाएगी एवं 24 घंटे में सीधे बैंक में क्रेडिट होगी।`;
    }

    if (query.includes("खरीदार") || query.includes("buyer") || query.includes("अच्छे price")) {
      return `🏭 **आज के शीर्ष सत्यापित खरीदार (Top Verified Buyers):**\n\n• **ITC Agri Business Division:** गेहूं ₹2,720/क्विंटल, सरसों ₹5,920/क्विंटल (24-घंटे एस्क्रो DBT)\n• **Reliance Retail Agri:** गेहूं ₹2,750/क्विंटल, धान ₹4,100/क्विंटल (48-घंटे भुगतान)\n• **Adani Wilmar Ltd.:** सरसों (42% तेल) ₹5,980/क्विंटल\n• **Mother Dairy Safal:** प्याज ₹1,910/क्विंटल (उसी दिन तत्काल UPI)`;
    }

    if (query.includes("10 दिन") || query.includes("store") || query.includes("स्टोर") || query.includes("फायदा")) {
      return `🏬 **गेहूं 10-15 दिन स्टोर करने का AI विश्लेषण:**\n\n• वर्तमान भाव: ₹2,650/क्विंटल\n• 10-15 दिन बाद अनुमानित भाव: ₹2,760/क्विंटल (+₹110)\n• वैज्ञानिक साइलो स्टोरेज खर्च: मात्र ₹11/बोरी (₹22/क्विंटल)\n• **शुद्ध अतिरिक्त लाभ:** प्रति क्विंटल लगभग **₹88 का शुद्ध मुनाफा**!\n• साथ ही आप e-NWR रसीद पर 75% तात्कालिक बैंक ऋण भी प्राप्त कर सकते हैं।`;
    }

    if (query.includes("Grade A") || query.includes("क्वालिटी") || query.includes("quality")) {
      return `🔬 **Grade A (प्रीमियम) गुणवत्ता के मानक:**\n\n1. **नमी (Moisture):** 11.5% से कम होनी चाहिए।\n2. **कचरा / फॉरेन मैटर:** 0.5% से कम।\n3. **टूटा दाना (Broken):** 1.0% से कम।\n4. **दाने की चमक:** समान रंग व एकरूप आकार।\n\nआप हमारे **AI क्वालिटी स्कैनर** से मोबाइल फोटो लेकर 10 सेकंड में अपनी फसल का ग्रेड प्रमाणपत्र चेक कर सकते हैं!`;
    }

    return `🌾 **कृषिसेतु AI विश्लेषण (${crop.nameHi}):**\n\n• आज का औसत मॉडल भाव: ₹${crop.currentAvgModal}/क्विंटल\n• AI फैसला: **${crop.aiRecommendation.action.replace(/_/g, " ")}**\n• कारण: ${crop.aiRecommendation.reasonHi}\n• सरकारी MSP: ₹${crop.msp}/क्विंटल`;
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputQuery;
    if (!query.trim() && !attachedMedia) return;

    const newId = `msg_usr_${Math.random().toString(36).substring(2, 9)}`;
    const currentTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    const userMsg: Message = {
      id: newId,
      role: "user",
      content: query,
      mediaUrl: attachedMedia || undefined,
      timestamp: currentTime,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setAttachedMedia(null);
    setIsLoading(true);

    try {
      // Fast intelligent response with fallbacks
      const localReply = generateLocalAIResponse(query);

      setTimeout(() => {
        const botId = `msg_bot_${Math.random().toString(36).substring(2, 9)}`;
        const botMsg: Message = {
          id: botId,
          role: "assistant",
          content: localReply,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        };

        setMessages((prev) => [...prev, botMsg]);
        setIsLoading(false);

        speakText(localReply, currentLanguage.bcp47);
        setIsSpeaking(true);
      }, 700);
    } catch (err) {
      console.error(err);
      setIsLoading(false);
    }
  };

  const handleReadAloud = (text: string) => {
    if (isSpeaking) {
      stopSpeaking();
      setIsSpeaking(false);
    } else {
      speakText(text, currentLanguage.bcp47);
      setIsSpeaking(true);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-emerald-100 shadow-xl overflow-hidden flex flex-col h-[650px] max-w-4xl mx-auto">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 text-white p-4 sm:p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-300">
            <Bot className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg sm:text-xl font-black text-white">
                {t.aiAssistantTitle}
              </h3>
              <span className="bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                ऑनलाइन • 12 भाषाएं
              </span>
            </div>
            <p className="text-xs text-emerald-200">
              {currentLanguage.nativeName} ({currentLanguage.name}) भाषा सक्रिय
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            stopSpeaking();
            setIsSpeaking(false);
          }}
          className={`p-2 rounded-xl transition cursor-pointer ${
            isSpeaking ? "bg-amber-500 text-white" : "bg-emerald-800 text-emerald-200"
          }`}
          title="आवाज बंद करें"
        >
          {isSpeaking ? <Volume2 className="w-5 h-5 animate-pulse" /> : <VolumeX className="w-5 h-5" />}
        </button>
      </div>

      {/* Suggested Questions */}
      <div className="bg-emerald-50/70 p-3 border-b border-emerald-100 flex items-center gap-2 overflow-x-auto text-xs no-scrollbar">
        <span className="font-bold text-emerald-900 shrink-0 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          {t.voiceSuggestions}
        </span>
        {suggestedQueries.map((sq, i) => (
          <button
            key={i}
            onClick={() => handleSendMessage(sq)}
            className="shrink-0 bg-white hover:bg-emerald-100 border border-emerald-300 text-emerald-900 px-3 py-1.5 rounded-xl font-semibold transition text-left cursor-pointer"
          >
            {sq}
          </button>
        ))}
      </div>

      {/* Messages List */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-gray-50/40">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${
              msg.role === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white shadow-xs ${
                msg.role === "user" ? "bg-teal-700" : "bg-emerald-600"
              }`}
            >
              {msg.role === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
            </div>

            <div
              className={`max-w-[82%] sm:max-w-[75%] rounded-3xl p-4 sm:p-5 shadow-xs space-y-2 ${
                msg.role === "user"
                  ? "bg-gradient-to-tr from-teal-700 to-emerald-700 text-white rounded-tr-xs"
                  : "bg-white text-gray-900 border border-emerald-100 rounded-tl-xs"
              }`}
            >
              <div className="text-sm font-medium leading-relaxed whitespace-pre-line">
                {msg.content}
              </div>

              <div className="flex items-center justify-between gap-2 pt-1 border-t border-black/5 text-[10px] opacity-75">
                <span>{msg.timestamp}</span>
                {msg.role === "assistant" && (
                  <button
                    onClick={() => handleReadAloud(msg.content)}
                    className="flex items-center gap-1 text-emerald-800 hover:text-emerald-950 font-bold bg-emerald-50 px-2 py-0.5 rounded-md cursor-pointer"
                  >
                    <Volume2 className="w-3 h-3" />
                    <span>{t.speakAnswer}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div className="bg-white p-4 rounded-3xl rounded-tl-xs border border-emerald-100 shadow-xs flex items-center gap-2 text-xs text-gray-600 font-semibold">
              <Loader2 className="w-4 h-4 text-emerald-600 animate-spin" />
              <span>AI मंडी व गुणवत्ता विश्लेषण कर रहा है...</span>
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Bar */}
      <div className="p-3 sm:p-4 bg-white border-t border-emerald-100 flex items-center gap-2">
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendMessage();
          }}
          placeholder={isListening ? "🎙️ सुन रहे हैं... कृपया बोलिए" : "अपनी भाषा में सवाल पूछें..."}
          className={`flex-1 p-3.5 rounded-2xl text-sm font-medium border focus:outline-none transition ${
            isListening
              ? "bg-red-50 border-red-400 ring-2 ring-red-400 text-red-900 animate-pulse"
              : "bg-gray-50 border-gray-200 focus:border-emerald-500 focus:bg-white"
          }`}
        />

        {/* Voice Button */}
        <button
          type="button"
          onClick={handleVoiceToggle}
          className={`p-3.5 rounded-2xl font-bold transition flex items-center gap-1.5 shadow-md cursor-pointer ${
            isListening
              ? "bg-red-600 hover:bg-red-700 text-white animate-bounce"
              : "bg-amber-500 hover:bg-amber-600 text-white"
          }`}
          title="बोलकर पूछें"
        >
          {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          <span className="hidden sm:inline text-xs font-black">बोलकर पूछें</span>
        </button>

        {/* Send Button */}
        <button
          type="button"
          disabled={!inputQuery.trim()}
          onClick={() => handleSendMessage()}
          className="p-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition disabled:opacity-40 shadow-md cursor-pointer"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
