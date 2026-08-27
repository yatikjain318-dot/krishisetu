"use client";

import React, { useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { TRANSACTIONS_DATA, TransactionRecord } from "@/lib/data/mock-data";
import {
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Download,
  Clock,
  ArrowRight,
  TrendingUp,
  FileText,
  DollarSign,
} from "lucide-react";

export default function TransactionsPage() {
  const { t, playChime } = useI18n();

  const [transactions, setTransactions] = useState<TransactionRecord[]>(TRANSACTIONS_DATA);
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  const totalTraded = transactions.reduce((acc, t) => acc + t.totalAmount, 0);
  const totalExtraGain = transactions.reduce((acc, t) => acc + t.extraRealization, 0);

  const handleDownloadInvoice = (txnCode: string) => {
    playChime();
    setDownloadToast(`लेनदेन ${txnCode} की डिजिटल GST/मंडी रसीद डाउनलोड हो गई है!`);
    setTimeout(() => setDownloadToast(null), 3500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-gray-900 flex items-center gap-2">
              <CreditCard className="w-8 h-8 text-emerald-600" />
              {t.transparentPaymentsTitle}
            </h1>
            <span className="bg-emerald-100 text-emerald-900 text-xs font-black px-2.5 py-0.5 rounded-full border border-emerald-300">
              100% Escrow Backed
            </span>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            प्रत्येक सौदे की पारदर्शी 7-चरणीय भुगतान प्रगति, बैंक यूटीआर संदर्भ और आधिकारिक डिजिटल रसीदें
          </p>
        </div>
      </div>

      {downloadToast && (
        <div className="p-4 bg-emerald-100 border border-emerald-300 text-emerald-950 font-bold text-sm rounded-2xl flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
          {downloadToast}
        </div>
      )}

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-xs">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
            कुल संपन्न व्यापार (Total Settlement):
          </span>
          <div className="text-2xl font-black text-gray-900 font-mono mt-1">
            ₹{totalTraded.toLocaleString("en-IN")}
          </div>
        </div>

        <div className="bg-emerald-50 p-5 rounded-3xl border border-emerald-200 shadow-xs">
          <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block">
            मंडी से कुल अतिरिक्त मुनाफा (Extra Gain):
          </span>
          <div className="text-2xl font-black text-emerald-800 font-mono mt-1">
            + ₹{totalExtraGain.toLocaleString("en-IN")}
          </div>
        </div>

        <div className="bg-blue-50 p-5 rounded-3xl border border-blue-200 shadow-xs">
          <span className="text-xs font-bold text-blue-800 uppercase tracking-wider block">
            औसत भुगतान निपटान समय:
          </span>
          <div className="text-2xl font-black text-blue-950 font-mono mt-1">
            2.4 घंटे <span className="text-xs font-normal text-blue-800">(डिलीवरी के बाद)</span>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="space-y-6">
        {transactions.map((txn) => (
          <div
            key={txn.id}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 hover:border-emerald-500 shadow-sm space-y-6"
          >
            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs bg-gray-100 text-gray-800 px-2.5 py-0.5 rounded-md">
                    {txn.txnCode}
                  </span>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    भुगतान पूर्ण (Paid)
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-gray-900 mt-1">
                  {txn.crop} — {txn.quantityQtl} क्विंटल (खरीदार: {txn.buyerName})
                </h3>
              </div>

              <div className="text-right">
                <span className="text-xs text-gray-500 font-bold block">कुल भुगतान राशि:</span>
                <span className="text-2xl font-black text-emerald-700">
                  ₹{txn.totalAmount.toLocaleString("en-IN")}
                </span>
                <span className="text-[11px] text-emerald-600 block font-bold">
                  (₹{txn.agreedPricePerQtl}/qtl vs मंडी ₹{txn.mandiBenchmarkPrice})
                </span>
              </div>
            </div>

            {/* Transaction Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-gray-50 p-4 rounded-2xl border border-gray-200">
              <div>
                <span className="text-gray-500 font-semibold block">सहमति भाव:</span>
                <span className="font-black text-gray-900 text-sm">₹{txn.agreedPricePerQtl}/qtl</span>
              </div>
              <div>
                <span className="text-gray-500 font-semibold block">मंडी बेंचमार्क भाव:</span>
                <span className="font-bold text-gray-700 text-sm">₹{txn.mandiBenchmarkPrice}/qtl</span>
              </div>
              <div>
                <span className="text-emerald-800 font-bold block">सीधा अतिरिक्त लाभ:</span>
                <span className="font-black text-emerald-700 text-sm">
                  + ₹{txn.extraRealization.toLocaleString("en-IN")}
                </span>
              </div>
              <div>
                <span className="text-gray-500 font-semibold block">बैंक UTR संदर्भ:</span>
                <span className="font-mono font-bold text-gray-900 truncate block">
                  {txn.utrNumber}
                </span>
              </div>
            </div>

            {/* 7-Stage Progress Timeline */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold text-gray-700 uppercase tracking-wider">
                ⏳ पारदर्शी 7-चरणीय समयरेखा (7-Stage Timeline):
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 text-xs">
                {txn.timeline.map((step, si) => (
                  <div
                    key={si}
                    className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 flex items-start gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-emerald-950">{step.stage}</div>
                      <span className="text-[10px] text-emerald-700 block font-mono">{step.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Invoice Download Action */}
            <div className="pt-2 flex items-center justify-between">
              <span className="text-xs text-gray-500">
                लेनदेन तिथि: <strong>{txn.date}</strong>
              </span>

              <button
                onClick={() => handleDownloadInvoice(txn.txnCode)}
                className="px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 font-bold text-xs rounded-xl transition flex items-center gap-1.5 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-emerald-700" />
                {t.downloadReceipt} (PDF रसीद)
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
