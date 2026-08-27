import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n/context";
import { MandiTicker } from "@/components/mandi-ticker";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { MobileNavWrapper } from "@/components/mobile-nav-wrapper";

export const metadata: Metadata = {
  title: "KrishiSetu (कृषिसेतु) — Multilingual Farmer Market Intelligence & Buyer Platform",
  description:
    "Connecting Indian farmers & FPOs to verified institutional buyers, live mandi prices, AI price intelligence, logistics tracking, storage ROI calculator, and transparent escrow payments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-[#fbfdf9] text-gray-900 font-sans antialiased selection:bg-emerald-200 selection:text-emerald-900">
        <I18nProvider>
          {/* 1. Live Mandi Rates Top Auto-Scrolling Ticker Bar */}
          <MandiTicker />

          {/* 2. Main Navigation Bar */}
          <Navbar />

          {/* 3. Page Content */}
          <main className="flex-1 pb-16 lg:pb-0">{children}</main>

          {/* 4. Footer */}
          <Footer />

          {/* 5. Mobile Navigation Bar */}
          <MobileNavWrapper />
        </I18nProvider>
      </body>
    </html>
  );
}
