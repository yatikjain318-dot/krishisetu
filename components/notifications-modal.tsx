"use client";

import React, { useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { Bell, X, CheckCheck, TrendingUp, ShieldCheck, CreditCard, Warehouse, Truck, AlertTriangle } from "lucide-react";
import Link from "next/link";

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NotificationItem {
  id: string;
  type: "PRICE_SPIKE" | "BUYER_DEMAND" | "PAYMENT_RECEIVED" | "STORAGE_ALERT" | "TRANSPORT_UPDATE";
  title: string;
  message: string;
  time: string;
  unread: boolean;
  actionUrl: string;
}

export function NotificationsModal({ isOpen, onClose }: NotificationsModalProps) {
  const { t, setUnreadNotifications, playChime } = useI18n();

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "notif-1",
      type: "PRICE_SPIKE",
      title: "गेहूं के भाव में ₹60/क्विंटल की तेजी",
      message: "जयपुर सूरजपोल मंडी में गेहूं का मॉडल भाव ₹2,650 पहुंचा। ITC ने खरीद दर बढ़ाई है।",
      time: "10 मिनट पहले",
      unread: true,
      actionUrl: "/prices",
    },
    {
      id: "notif-2",
      type: "BUYER_DEMAND",
      title: "रिलायंस रिटेल को 500 क्विंटल सरसों की तत्काल आवश्यकता",
      message: "₹5,950/क्विंटल की पेशकश। 24 घंटे में खेत से सीधा उठाव व तत्काल भुगतान।",
      time: "45 मिनट पहले",
      unread: true,
      actionUrl: "/buyers",
    },
    {
      id: "notif-3",
      type: "PAYMENT_RECEIVED",
      title: "एस्क्रो भुगतान ₹1,20,600 आपके खाते में क्रेडिट हुआ",
      message: "लॉट LOT-WHT-2026-8912 का अंतिम भुगतान बैंक UTR YESB000284918239 द्वारा जमा किया गया।",
      time: "2 घंटे पहले",
      unread: true,
      actionUrl: "/transactions",
    },
    {
      id: "notif-4",
      type: "STORAGE_ALERT",
      title: "चौमूं साइलो में 5000 बोरी खाली क्षमता उपलब्ध",
      message: "WDRA मान्यता प्राप्त गोदाम में मात्र ₹11/बोरी/माह पर भंडारण उपलब्ध। 75% ऋण सुविधा।",
      time: "5 घंटे पहले",
      unread: false,
      actionUrl: "/storage",
    },
    {
      id: "notif-5",
      type: "TRANSPORT_UPDATE",
      title: "वाहन RJ 14 GB 4521 खरीददार हब के लिए रवाना",
      message: "चालक सोहन लाल यादव ने माल लोड किया। अनुमानित डिलीवरी दोपहर 2:45 बजे।",
      time: "कल",
      unread: false,
      actionUrl: "/transport",
    },
  ]);

  if (!isOpen) return null;

  const handleMarkAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
    setUnreadNotifications(0);
    playChime();
  };

  const getIcon = (type: NotificationItem["type"]) => {
    switch (type) {
      case "PRICE_SPIKE":
        return <TrendingUp className="w-5 h-5 text-emerald-600" />;
      case "BUYER_DEMAND":
        return <ShieldCheck className="w-5 h-5 text-amber-600" />;
      case "PAYMENT_RECEIVED":
        return <CreditCard className="w-5 h-5 text-blue-600" />;
      case "STORAGE_ALERT":
        return <Warehouse className="w-5 h-5 text-purple-600" />;
      case "TRANSPORT_UPDATE":
        return <Truck className="w-5 h-5 text-indigo-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-emerald-100 flex flex-col max-h-[85vh] overflow-hidden">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-emerald-800 to-teal-800 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
              <Bell className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg">{t.notificationsTitle}</h3>
              <p className="text-xs text-emerald-200">ताजा मंडी भाव, खरीदार ऑफर व भुगतान अलर्ट</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Toolbar */}
        <div className="px-5 py-2.5 bg-gray-50 border-b border-gray-200 flex items-center justify-between text-xs font-semibold">
          <span className="text-gray-500">
            {notifications.filter((n) => n.unread).length} नई सूचनाएं
          </span>
          <button
            onClick={handleMarkAllAsRead}
            className="text-emerald-700 hover:text-emerald-900 flex items-center gap-1 font-bold cursor-pointer"
          >
            <CheckCheck className="w-4 h-4" /> {t.markAllRead}
          </button>
        </div>

        {/* Notifications List */}
        <div className="p-4 space-y-2.5 overflow-y-auto flex-1 divide-y divide-gray-100">
          {notifications.map((item) => (
            <Link
              key={item.id}
              href={item.actionUrl}
              onClick={onClose}
              className={`block p-3 rounded-2xl transition pt-3 first:pt-0 ${
                item.unread
                  ? "bg-emerald-50/70 border border-emerald-200/80 shadow-2xs"
                  : "hover:bg-gray-50 border border-transparent"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-white shadow-2xs border border-gray-100 shrink-0">
                  {getIcon(item.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-gray-900 truncate">{item.title}</h4>
                    {item.unread && (
                      <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2 leading-relaxed">
                    {item.message}
                  </p>
                  <span className="text-[10px] text-gray-400 font-medium block mt-1.5">
                    ⏱️ {item.time}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 bg-gray-50 border-t border-gray-200 text-center">
          <button
            onClick={onClose}
            className="text-xs font-bold text-gray-700 hover:text-gray-950 px-4 py-1.5 rounded-lg hover:bg-gray-200 transition cursor-pointer"
          >
            बंद करें (Close)
          </button>
        </div>
      </div>
    </div>
  );
}
