"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n, UserRole } from "@/lib/i18n/context";
import { LanguageSelector } from "./language-selector";
import { NotificationsModal } from "./notifications-modal";
import { VoiceMarketQueryModal } from "./voice-market-query-modal";
import {
  Sprout,
  TrendingUp,
  ShieldCheck,
  Handshake,
  CreditCard,
  Warehouse,
  Truck,
  Camera,
  AlertTriangle,
  Users,
  Bot,
  FileCheck,
  Shield,
  PhoneCall,
  Bell,
  Mic,
  Menu,
  X,
  ChevronDown,
  UserCheck,
} from "lucide-react";

export function Navbar() {
  const { t, language, userRole, setUserRole, unreadNotifications, playChime } = useI18n();
  const pathname = usePathname();
  const isEn = language === "en";

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [voiceQueryOpen, setVoiceQueryOpen] = useState(false);

  const rolesConfig: { id: UserRole; label: string; badge: string; icon: string }[] = [
    { id: "FARMER", label: t.roleFarmer, badge: isEn ? "Farmer" : "किसान", icon: "👨🌾" },
    { id: "FPO", label: t.roleFPO, badge: isEn ? "FPO" : "एफपीओ", icon: "👥" },
    { id: "BUYER", label: t.roleBuyer, badge: isEn ? "Buyer" : "खरीदार", icon: "🏭" },
    { id: "TRANSPORTER", label: t.roleTransporter, badge: isEn ? "Logistics" : "ट्रांसपोर्टर", icon: "🚚" },
    { id: "WAREHOUSE", label: t.roleWarehouse, badge: isEn ? "Warehouse" : "गोदाम", icon: "🏬" },
    { id: "INSPECTOR", label: t.roleInspector, badge: isEn ? "Assayer" : "लैब", icon: "🔬" },
    { id: "ADMIN", label: t.roleAdmin, badge: isEn ? "Admin" : "एडमिन", icon: "👨💼" },
  ];

  const currentRoleObj = rolesConfig.find((r) => r.id === userRole) || rolesConfig[0];

  const primaryNavLinks = [
    { href: "/prices", label: t.navPrices, icon: TrendingUp },
    { href: "/buyers", label: t.navBuyers, icon: ShieldCheck },
    { href: "/my-crops", label: t.navMyCrops, icon: Sprout },
    { href: "/offers", label: t.navOffers, icon: Handshake },
    { href: "/storage", label: t.navStorage, icon: Warehouse },
    { href: "/transport", label: t.navTransport, icon: Truck },
    { href: "/quality", label: t.navQuality, icon: Camera },
    { href: "/fpo", label: t.navFPO, icon: Users },
    { href: "/transactions", label: t.navTransactions, icon: CreditCard },
    { href: "/disputes", label: t.navDisputes, icon: AlertTriangle },
    { href: "/assistant", label: t.navAssistant, icon: Bot },
    { href: "/transparency", label: t.navTransparency, icon: FileCheck },
  ];

  if (userRole === "ADMIN") {
    primaryNavLinks.push({ href: "/admin", label: t.navAdmin, icon: Shield });
  }

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-2xs">
        {/* Top utility bar: Helpline & Role Switcher */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-950 to-teal-950 text-white text-xs px-4 py-1.5 flex items-center justify-between border-b border-emerald-800/40">
          <div className="flex items-center gap-3">
            <a
              href="tel:18001801551"
              className="flex items-center gap-1.5 text-emerald-200 hover:text-white transition font-semibold"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
              <span>{t.callHelpline}:</span>
              <span className="font-bold text-amber-300">{t.kisanCallCenter}</span>
            </a>
            <span className="hidden md:inline text-emerald-700">|</span>
            <span className="hidden md:inline text-emerald-300">
              {isEn
                ? "🇮🇳 Govt of India & WDRA Accredited Transparent Agri Marketplace"
                : "🇮🇳 भारत सरकार व WDRA मान्यता प्राप्त पारदर्शी डिजिटल कृषि मंडी"}
            </span>
          </div>

          {/* Persona Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className="flex items-center gap-1.5 bg-emerald-800/80 hover:bg-emerald-700 px-2.5 py-1 rounded-lg text-emerald-100 text-xs font-bold transition border border-emerald-600/50 cursor-pointer"
            >
              <span>{currentRoleObj.icon}</span>
              <span className="hidden sm:inline">
                {currentRoleObj.badge} {isEn ? "Mode" : "मोड"}
              </span>
              <ChevronDown className="w-3 h-3 text-emerald-300" />
            </button>

            {roleMenuOpen && (
              <>
                <div className="fixed inset-0 z-50" onClick={() => setRoleMenuOpen(false)} />
                <div className="absolute right-0 mt-1 w-64 rounded-2xl bg-white text-gray-900 shadow-2xl ring-1 ring-black/10 z-50 p-2 divide-y divide-gray-100">
                  <div className="px-3 py-1.5 text-[11px] font-bold text-gray-400 uppercase">
                    👥 {isEn ? "Switch User Role" : "उपयोगकर्ता भूमिका बदलें"}
                  </div>
                  <div className="py-1 space-y-0.5">
                    {rolesConfig.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => {
                          setUserRole(r.id);
                          setRoleMenuOpen(false);
                          playChime();
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs font-semibold transition cursor-pointer ${
                          userRole === r.id
                            ? "bg-emerald-600 text-white font-bold"
                            : "hover:bg-emerald-50 text-gray-800"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">{r.icon}</span>
                          <span>{r.label}</span>
                        </div>
                        {userRole === r.id && <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded">Active</span>}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Main Navbar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            {/* Logo & Brand */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 flex items-center justify-center text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition transform">
                <Sprout className="w-6 h-6" />
              </div>
              <div>
                <div className="text-xl font-black tracking-tight text-emerald-950 flex items-center gap-1.5">
                  KrishiSetu
                  <span className="text-[10px] uppercase font-bold tracking-wider bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-md border border-emerald-300">
                    {isEn ? "Marketplace" : "कृषिसेतु"}
                  </span>
                </div>
                <p className="text-[11px] text-emerald-700 font-medium hidden sm:block">
                  {t.brandTagline}
                </p>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center gap-1">
              {primaryNavLinks.slice(0, 7).map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold transition ${
                      isActive
                        ? "bg-emerald-100 text-emerald-950"
                        : "text-gray-700 hover:bg-emerald-50 hover:text-emerald-900"
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 text-emerald-600" />
                    {link.label}
                  </Link>
                );
              })}

              {/* More Dropdown for additional tools */}
              <div className="relative group">
                <button className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-bold text-gray-700 hover:bg-emerald-50 cursor-pointer">
                  <span>{isEn ? "More Tools" : "अधिक (More)"}</span>
                  <ChevronDown className="w-3 h-3 text-gray-500" />
                </button>
                <div className="absolute right-0 mt-1 w-52 rounded-2xl bg-white shadow-2xl ring-1 ring-black/10 z-50 p-2 hidden group-hover:block space-y-1">
                  {primaryNavLinks.slice(7).map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition ${
                          isActive ? "bg-emerald-100 text-emerald-950 font-bold" : "text-gray-700 hover:bg-emerald-50"
                        }`}
                      >
                        <Icon className="w-4 h-4 text-emerald-600" />
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </nav>

            {/* Right Action Icons: Voice Search, Notifications, Language */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              {/* Voice Query Button */}
              <button
                onClick={() => setVoiceQueryOpen(true)}
                className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-3 py-2 rounded-xl text-xs font-black shadow-md shadow-emerald-600/20 transition transform hover:scale-105 cursor-pointer"
                title={isEn ? "Voice Price Search" : "बोलकर भाव पूछें"}
              >
                <Mic className="w-4 h-4 animate-pulse" />
                <span className="hidden sm:inline">
                  {isEn ? "Voice Search" : "बोलकर पूछें"}
                </span>
              </button>

              {/* Notifications Button */}
              <button
                onClick={() => setNotificationsOpen(true)}
                className="relative p-2 rounded-xl bg-gray-100 hover:bg-emerald-50 text-gray-700 hover:text-emerald-900 transition cursor-pointer"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5 text-gray-700" />
                {unreadNotifications > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-600 text-white text-[10px] font-black flex items-center justify-center animate-bounce">
                    {unreadNotifications}
                  </span>
                )}
              </button>

              {/* 12-Language Selector */}
              <LanguageSelector />

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="xl:hidden p-2 rounded-xl text-gray-700 hover:bg-emerald-50 focus:outline-none"
                aria-label="Open Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Full Menu Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-emerald-200 px-4 pt-2 pb-6 space-y-2 shadow-2xl animate-in slide-in-from-top duration-200 max-h-[80vh] overflow-y-auto">
            <div className="bg-emerald-50 p-3 rounded-2xl mb-2 flex items-center justify-between border border-emerald-200">
              <div className="flex items-center gap-2">
                <span className="text-xl">{currentRoleObj.icon}</span>
                <div>
                  <div className="text-xs font-extrabold text-emerald-950">
                    {isEn ? "Active Role:" : "सक्रिय भूमिका:"} {currentRoleObj.label}
                  </div>
                  <div className="text-[11px] text-emerald-700">
                    {isEn ? "Transparent Agri Market Network" : "पारदर्शी डिजिटल कृषि बाजार"}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              {primaryNavLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold transition ${
                      isActive
                        ? "bg-emerald-600 text-white"
                        : "text-gray-800 hover:bg-emerald-50 bg-gray-50"
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-emerald-600"}`} />
                    <span className="truncate">{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Global Modals */}
      <NotificationsModal
        isOpen={notificationsOpen}
        onClose={() => setNotificationsOpen(false)}
      />
      <VoiceMarketQueryModal
        isOpen={voiceQueryOpen}
        onClose={() => setVoiceQueryOpen(false)}
      />
    </>
  );
}
