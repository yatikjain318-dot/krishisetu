"use client";

import React, { useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { SUPPORTED_LANGUAGES } from "@/lib/i18n/languages";
import { Globe, Check, ChevronDown, Search } from "lucide-react";

export function LanguageSelector() {
  const { language, setLanguage, currentLanguage } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredLanguages = SUPPORTED_LANGUAGES.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.nativeName.toLowerCase().includes(search.toLowerCase()) ||
      l.region.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-emerald-950 bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 rounded-xl transition shadow-xs cursor-pointer"
        aria-label="Select Language"
      >
        <Globe className="w-4 h-4 text-emerald-700 shrink-0" />
        <span className="text-sm sm:text-base">{currentLanguage.flag}</span>
        <span className="font-bold text-emerald-900 hidden sm:inline">{currentLanguage.nativeName}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-emerald-700 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => {
              setIsOpen(false);
              setSearch("");
            }}
          />
          <div className="absolute right-0 mt-2 w-72 sm:w-80 origin-top-right rounded-2xl bg-white shadow-2xl ring-1 ring-black/10 focus:outline-none z-50 p-2 divide-y divide-gray-100 animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="p-2">
              <div className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>🌐 12 भारतीय भाषाएं / 12 Indian Languages</span>
              </div>
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="भाषा खोजें / Search language..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900"
                  autoFocus
                />
              </div>
            </div>

            <div className="py-1 grid grid-cols-1 gap-1 max-h-80 overflow-y-auto">
              {filteredLanguages.map((lang) => {
                const isSelected = lang.code === language;
                return (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsOpen(false);
                      setSearch("");
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-sm font-medium transition cursor-pointer ${
                      isSelected
                        ? "bg-emerald-600 text-white font-bold shadow-xs"
                        : "text-gray-800 hover:bg-emerald-50 hover:text-emerald-950"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl shrink-0">{lang.flag}</span>
                      <div>
                        <div className="leading-snug font-bold text-sm">{lang.nativeName}</div>
                        <div className={`text-[11px] ${isSelected ? "text-emerald-100" : "text-gray-500"}`}>
                          {lang.name} • <span className="opacity-80">{lang.region}</span>
                        </div>
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-white shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
