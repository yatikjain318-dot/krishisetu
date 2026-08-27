"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useI18n } from "@/lib/i18n/context";
import { Home, TrendingUp, ShieldCheck, Sprout, Handshake, Bot, Warehouse, Truck } from "lucide-react";

interface MobileNavProps {
  onOpenVoiceQuery: () => void;
}

export function MobileNav({ onOpenVoiceQuery }: MobileNavProps) {
  const pathname = usePathname();
  const { t } = useI18n();

  const items = [
    { href: "/", label: t.navHome, icon: Home },
    { href: "/prices", label: t.navPrices, icon: TrendingUp },
    { href: "/buyers", label: t.navBuyers, icon: ShieldCheck },
    { href: "/my-crops", label: t.navMyCrops, icon: Sprout },
    { href: "/offers", label: t.navOffers, icon: Handshake },
    { href: "/storage", label: t.navStorage, icon: Warehouse },
    { href: "/transport", label: t.navTransport, icon: Truck },
    { href: "/assistant", label: t.navAssistant, icon: Bot },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-emerald-200 shadow-2xl safe-area-pb">
      <div className="flex items-center justify-around px-1 py-1.5 overflow-x-auto no-scrollbar">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition min-w-[54px] shrink-0 ${
                isActive
                  ? "text-emerald-700 font-extrabold bg-emerald-50"
                  : "text-gray-600 hover:text-emerald-800 font-medium"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-emerald-600 scale-110" : "text-gray-500"}`} />
              <span className="text-[10px] mt-0.5 tracking-tight truncate max-w-[56px] text-center">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
