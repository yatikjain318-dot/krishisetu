import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n/context";
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
    <html lang="hi">
      <body className="min-h-screen flex flex-col bg-[#fbfdf9] text-gray-900 font-sans antialiased selection:bg-emerald-200 selection:text-emerald-900">
        <I18nProvider>
          <Navbar />
          <main className="flex-1 pb-16 lg:pb-0">{children}</main>
          <Footer />
          <MobileNavWrapper />
        </I18nProvider>
      </body>
    </html>
  );
}
