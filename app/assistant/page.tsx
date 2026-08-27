"use client";

import React from "react";
import { useI18n } from "@/lib/i18n/context";
import { VoiceAssistant } from "@/components/voice-assistant";
import { Bot, Mic, Sparkles, ShieldCheck, HeartHandshake } from "lucide-react";

export default function AssistantPage() {
  const { t } = useI18n();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-widest px-3.5 py-1.5 rounded-full">
          <Bot className="w-3.5 h-3.5 text-emerald-600" />
          <span>डिजिटल कृषि वैज्ञानिक (Agri AI Assistant)</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-gray-900">
          {t.aiAssistantTitle}
        </h1>
        <p className="text-sm sm:text-base text-gray-600 font-medium">
          {t.voiceAssistantSubtitle}
        </p>
      </div>

      {/* Voice & Text Chat Assistant Interface */}
      <VoiceAssistant />

      {/* Voice Guide Banner */}
      <div className="max-w-4xl mx-auto bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-amber-500/10 rounded-3xl p-6 border border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-black shrink-0 shadow-md shadow-amber-500/20">
            <Mic className="w-6 h-6" />
          </div>
          <div>
            <h4 className="text-sm font-black text-gray-900">
              टाइप करने में परेशानी? माइक (🎤) दबाकर बोलें!
            </h4>
            <p className="text-xs text-gray-600">
              अपनी क्षेत्रीय भाषा में सवाल पूछें। AI आपकी आवाज सुनकर उसी भाषा में जवाब देगा और पढ़कर भी सुनाएगा।
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-emerald-800 font-bold bg-white px-3 py-1.5 rounded-xl border border-emerald-200 shadow-2xs">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>100% भारतीय कृषि सत्यापित</span>
        </div>
      </div>
    </div>
  );
}
