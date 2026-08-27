"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Language, SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from "./languages";
import { getTranslation, TranslationSchema } from "./translations";

export type UserRole =
  | "FARMER"
  | "FPO"
  | "BUYER"
  | "TRANSPORTER"
  | "WAREHOUSE"
  | "INSPECTOR"
  | "ADMIN";

interface I18nContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: TranslationSchema;
  currentLanguage: Language;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  unreadNotifications: number;
  setUnreadNotifications: React.Dispatch<React.SetStateAction<number>>;
  playChime: () => void;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<string>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("krishisetu_language");
        if (saved && SUPPORTED_LANGUAGES.some((l) => l.code === saved)) {
          return saved;
        }
      } catch {
        // ignore
      }
    }
    return DEFAULT_LANGUAGE;
  });

  const [userRole, setUserRoleState] = useState<UserRole>(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("krishisetu_role") as UserRole;
        const validRoles: UserRole[] = ["FARMER", "FPO", "BUYER", "TRANSPORTER", "WAREHOUSE", "INSPECTOR", "ADMIN"];
        if (validRoles.includes(saved)) {
          return saved;
        }
      } catch {
        // ignore
      }
    }
    return "FARMER";
  });

  const [unreadNotifications, setUnreadNotifications] = useState<number>(3);

  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("krishisetu_language", lang);
      } catch {
        // ignore
      }
    }
  };

  const setUserRole = (role: UserRole) => {
    setUserRoleState(role);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("krishisetu_role", role);
      } catch {
        // ignore
      }
    }
  };

  const playChime = () => {
    if (typeof window !== "undefined" && "AudioContext" in window) {
      try {
        const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12); // A5
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      } catch {
        // audio fail silent
      }
    }
  };

  const currentLanguage =
    SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  const t = getTranslation(language);

  return (
    <I18nContext.Provider
      value={{
        language,
        setLanguage,
        t,
        currentLanguage,
        userRole,
        setUserRole,
        unreadNotifications,
        setUnreadNotifications,
        playChime,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}

