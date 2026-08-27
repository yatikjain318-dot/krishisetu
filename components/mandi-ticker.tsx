"use client";

import React, { useMemo } from "react";
import { TrendingUp, PhoneCall } from "lucide-react";
import { MANDIS_DATA } from "@/lib/data/mock-data";

export interface TickerItem {
  id: string;
  cropName: string;
  location: string;
  price: number;
  unit: string;
  changePercent: number; // positive or negative
}

export function MandiTicker() {
  // Generate synced ticker items from MANDIS_DATA
  const tickerItems: TickerItem[] = useMemo(() => {
    const items: TickerItem[] = [];

    // Curated key commodities
    const curated: TickerItem[] = [
      { id: "c1", cropName: "Wheat (Sharbati Gold)", location: "Karnal APMC", price: 4200, unit: "q", changePercent: 5.2 },
      { id: "c2", cropName: "Mustard (42% Oil)", location: "Alwar APMC", price: 5980, unit: "q", changePercent: 3.1 },
      { id: "c3", cropName: "Basmati 1121 Paddy", location: "Khanna APMC", price: 4180, unit: "q", changePercent: 2.4 },
      { id: "c4", cropName: "Red Onion (Nashik Quality)", location: "Lasalgaon APMC", price: 1850, unit: "q", changePercent: -2.8 },
      { id: "c5", cropName: "Organic Tomato", location: "Kolar APMC", price: 3200, unit: "q", changePercent: -1.5 },
      { id: "c6", cropName: "Jeera / Cumin (Unjha Super)", location: "Unjha APMC", price: 26500, unit: "q", changePercent: 5.6 },
      { id: "c7", cropName: "Soybean (Yellow)", location: "Indore APMC", price: 4820, unit: "q", changePercent: 3.5 },
      { id: "c8", cropName: "Cotton (Long Staple)", location: "Rajkot APMC", price: 7450, unit: "q", changePercent: -0.9 },
      { id: "c9", cropName: "Turmeric / Haldi (Finger)", location: "Nizamabad APMC", price: 14200, unit: "q", changePercent: 6.1 },
      { id: "c10", cropName: "Desi Chana (Gram)", location: "Bikaner APMC", price: 6240, unit: "q", changePercent: 1.8 },
    ];

    items.push(...curated);

    // Extract from all Mandis
    MANDIS_DATA.forEach((mandi) => {
      mandi.cropPrices.forEach((cp, idx) => {
        const change = typeof cp.changePercent === "number" ? cp.changePercent : (idx % 2 === 0 ? 2.8 : -1.4);
        items.push({
          id: `${mandi.id}-${cp.cropName}-${idx}`,
          cropName: cp.cropName,
          location: `${mandi.name} APMC`,
          price: cp.modalPrice,
          unit: "q",
          changePercent: Number(change.toFixed(1)),
        });
      });
    });

    return items;
  }, []);

  return (
    <aside
      aria-label="Live Mandi Rates Ticker"
      className="w-full bg-[#0a0a0a] text-gray-200 border-b border-emerald-950/80 sticky top-0 z-50 h-9 sm:h-10 flex items-center shadow-md select-none overflow-hidden"
    >
      {/* 1. Far Left Fixed Badge */}
      <div className="shrink-0 h-full flex items-center pl-2.5 sm:pl-4 pr-3 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a] to-transparent z-20">
        <span className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] sm:text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm shadow-emerald-500/20 border border-emerald-400/30 whitespace-nowrap">
          <TrendingUp className="w-3 h-3 text-emerald-100 animate-pulse" />
          <span>LIVE MANDI RATES</span>
        </span>
      </div>

      {/* 2. Middle Continuous Infinite Auto-Scrolling Marquee (35s Speed) */}
      <div className="flex-1 overflow-hidden relative flex items-center h-full">
        <div
          className="animate-ticker-marquee flex items-center whitespace-nowrap will-change-transform"
          style={{ animation: "ticker-marquee 35s linear infinite" }}
        >
          {/* First sequence */}
          {tickerItems.map((item, idx) => {
            const isPositive = item.changePercent >= 0;
            return (
              <div
                key={`item-1-${item.id}-${idx}`}
                className="inline-flex items-center text-[11px] sm:text-[12.5px] font-medium px-3 sm:px-4"
              >
                <span className="text-gray-300 font-semibold">{item.cropName}</span>
                <span className="text-gray-500 text-[10px] sm:text-[11px] ml-1">({item.location}):</span>
                <span className="text-white font-mono font-bold ml-1.5">
                  ₹{item.price.toLocaleString("en-IN")}/{item.unit}
                </span>

                <span
                  className={`ml-1.5 font-bold font-mono text-[10px] sm:text-[11px] flex items-center gap-0.5 ${
                    isPositive ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  <span>{isPositive ? "▲" : "▼"}</span>
                  <span>
                    {isPositive ? `+${item.changePercent}%` : `${item.changePercent}%`}
                  </span>
                </span>

                {/* Vertical bar divider */}
                <span className="ml-3 sm:ml-4 text-gray-700 font-normal">|</span>
              </div>
            );
          })}

          {/* Second duplicate sequence for seamless 100% infinite right-to-left loop */}
          {tickerItems.map((item, idx) => {
            const isPositive = item.changePercent >= 0;
            return (
              <div
                key={`item-2-${item.id}-${idx}`}
                className="inline-flex items-center text-[11px] sm:text-[12.5px] font-medium px-3 sm:px-4"
              >
                <span className="text-gray-300 font-semibold">{item.cropName}</span>
                <span className="text-gray-500 text-[10px] sm:text-[11px] ml-1">({item.location}):</span>
                <span className="text-white font-mono font-bold ml-1.5">
                  ₹{item.price.toLocaleString("en-IN")}/{item.unit}
                </span>

                <span
                  className={`ml-1.5 font-bold font-mono text-[10px] sm:text-[11px] flex items-center gap-0.5 ${
                    isPositive ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  <span>{isPositive ? "▲" : "▼"}</span>
                  <span>
                    {isPositive ? `+${item.changePercent}%` : `${item.changePercent}%`}
                  </span>
                </span>

                {/* Vertical bar divider */}
                <span className="ml-3 sm:ml-4 text-gray-700 font-normal">|</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Far Right Fixed Helpline Snippet */}
      <div className="hidden md:flex shrink-0 h-full items-center pl-3 pr-3 sm:pr-4 bg-gradient-to-l from-[#0a0a0a] via-[#0a0a0a] to-transparent z-20 border-l border-white/5">
        <a
          href="tel:18001801551"
          className="inline-flex items-center gap-1.5 text-[11px] font-medium text-gray-400 hover:text-emerald-300 transition whitespace-nowrap"
          title="Kisan Call Center Helpline (Toll Free)"
        >
          <PhoneCall className="w-3.5 h-3.5 text-emerald-500" />
          <span>
            Kisan Helpline: <strong className="text-gray-200">1800-180-1551</strong>
          </span>
        </a>
      </div>
    </aside>
  );
}
