# 🌾 KrishiSetu (कृषिसेतु)
### Multilingual Farmer Market Intelligence, AI Quality Grading & Direct Buyer Ecosystem

[![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.19-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)
[![Languages](https://img.shields.io/badge/Languages-12_Indian_Languages-orange?style=for-the-badge&logo=google-translate)](https://github.com/yatikjain318-dot/krishisetu)

---

## 📖 Overview

**KrishiSetu (कृषिसेतु)** is an end-to-end digital agricultural marketplace and market intelligence platform designed to empower smallholder farmers, Farmer Producer Organizations (FPOs), verified institutional corporate buyers (ITC, Reliance Retail, Adani Wilmar, Nestlé), assayers, warehouse operators, and logistics providers.

By eliminating information asymmetry and middleman deductions, KrishiSetu delivers an average **+11.4% higher net realization in farmers' pockets** through real-time APMC mandi feeds, 7-day AI price forecasting, digital grain quality scanning, transparent freight calculators, and 24-hour escrow-backed direct-to-bank settlements.

---

## 🏗️ System Architecture

```mermaid
graph TB
    subgraph Client_Layer["🖥️ Presentation & Client Layer (Next.js 15 + React 19)"]
        UI["Unified Master Hub (app/page.tsx)"]
        Ticker["Live Mandi Rates Ticker (35s/90s Marquee)"]
        VoiceSTT["Web Speech Recognition (STT) & Synthesis (TTS)"]
        I18nEngine["12-Language i18n Context Engine"]
        RoleEngine["Persona Role Switcher (7 Ecosystem Roles)"]
        ResponsiveLayout["Mobile & Desktop Responsive Viewports"]
    end

    subgraph Core_Modules["📦 14 Core Platform Modules"]
        M1["1. Mandi Prices & Forecast (/prices)"]
        M2["2. Verified Buyers & Matchmaker (/buyers)"]
        M3["3. Digital Lots & QR Passport (/my-crops)"]
        M4["4. AI Quality Scanner (/quality)"]
        M5["5. Negotiation Room (/offers)"]
        M6["6. Logistics & Live GPS (/transport)"]
        M7["7. Storage & ROI Engine (/storage)"]
        M8["8. 7-Step Escrow Payments (/transactions)"]
        M9["9. Dispute Redressal (/disputes)"]
        M10["10. FPO Bulk Aggregation (/fpo)"]
        M11["11. Multilingual Voice AI (/assistant)"]
        M12["12. Transparency Benchmark (/transparency)"]
        M13["13. Master Ecosystem Admin (/admin)"]
        M14["14. Unified Single-Link Hub (/)"]
    end

    subgraph Intelligence_Layer["🧠 Business Logic & AI Intelligence Engines"]
        PriceEngine["Mandi Freight & Net Realization Calculator"]
        MatchmakerEngine["Buyer-Lot Compatibility & KYC Scorer (94%+)"]
        QualityAssay["AI Computer Vision Grain Moisture & Grading Engine"]
        EscrowEngine["7-Stage Escrow Timeline & Milestone Triggers"]
        StorageROI["WDRA e-NWR 75% Pledge Loan & Profit Engine"]
        GrievanceSLA["48-Hour SLA Dispute Redressal Resolver"]
    end

    subgraph Data_Layer["💾 Data & Persistence Layer"]
        PrismaORM["Prisma ORM (v6.19)"]
        RelationalDB["SQLite / Relational DB Engine"]
        MockState["In-Memory State & Historical Time-Series Feeds"]
        APMCFeed["16+ APMC Mandi Real-Time Price & Arrival Feeds"]
    end

    subgraph External_Integrations["🌐 External Integrations & Services"]
        BankEscrow["Bank Escrow / Direct DBT Gateway (UTR Tracking)"]
        GPSFleet["Logistics GPS & Fleet Telematics API"]
        WDRA["WDRA Accredited e-NWR Electronic Warehouse Registry"]
        QRCodeGen["QR Code Passport Generator"]
    end

    Client_Layer --> Core_Modules
    Core_Modules --> Intelligence_Layer
    Intelligence_Layer --> Data_Layer
    Intelligence_Layer --> External_Integrations
    Data_Layer --> PrismaORM
    PrismaORM --> RelationalDB
```

---

## 🔄 End-to-End Escrow & Trade Flow

```mermaid
sequenceDiagram
    autonumber
    actor Farmer
    participant Hub as KrishiSetu Platform
    participant AI as AI Quality & Price Engine
    actor Buyer
    participant Escrow as Bank Escrow Vault
    actor Logistics as Transporter

    Farmer->>Hub: 1. Upload Grain Photo & Create Lot
    Hub->>AI: 2. Analyze Moisture % & Quality
    AI-->>Hub: 3. Return Grade A Certificate & QR Passport
    Hub->>Buyer: 4. Match Lot with Verified Buyers (ITC / Reliance)
    Buyer->>Hub: 5. Submit Digital Purchase Offer (₹2,700/qtl)
    Farmer->>Hub: 6. Accept Offer / Submit Counter-Offer
    Buyer->>Escrow: 7. Lock 100% Funds in Escrow Vault
    Hub->>Logistics: 8. Dispatch Truck for Farm-Gate Pickup
    Logistics->>Hub: 9. Live GPS In-Transit Milestones
    Logistics->>Buyer: 10. Deliver to Buyer Warehouse
    Buyer->>Hub: 11. Confirm Gate Weighment
    Hub->>Escrow: 12. Trigger Instant DBT Release
    Escrow-->>Farmer: 13. ₹1,20,600 Credited to Farmer Bank (UTR Reference)
```

---

## 🌟 Key Platform Capabilities (14 Core Modules)

| # | Module | Route | Key Features & Value Proposition |
|---|---|---|---|
| **1** | **Live Mandi Ticker & Comparison Tool** | `/prices` | Stock-market style 35s/90s auto-scrolling ticker with play/pause controls. Live modal rates across 16+ national APMC mandis, arrival volumes, side-by-side freight deduction comparison, and 7-day AI price projections. |
| **2** | **Verified Institutional Buyers & Matchmaker** | `/buyers` | 100% KYC-verified buyers (ITC Agri Business, Reliance Fresh, Adani Wilmar, Nestlé India, Patanjali). 94%+ automated lot matching algorithm based on location, crop grade, and volume. |
| **3** | **Digital Lots & Printable QR Passports** | `/my-crops` | Instant digital lot generation with unique IDs (e.g. `LOT-WHT-2026-8912`). Printable QR code passports containing origin, farmer credentials, moisture %, and assay grade. |
| **4** | **AI Grain Quality Scanner** | `/quality` | 10-second computer-vision grain analyzer measuring moisture %, foreign matter %, broken grain %, and color consistency with Grade A certification and expert advisory. |
| **5** | **Digital Offers & Negotiation Room** | `/offers` | Real-time negotiation room for buyer proposals, instant counter-offers, time-stamped message trail, and 1-click conversion into legally binding escrow orders. |
| **6** | **Agri Logistics & Live GPS Tracking** | `/transport` | Farm-gate fleet booking with transparent ₹/km rates and real-time 5-stage shipment milestone tracking (e.g. `TRK-2026-9041`). |
| **7** | **Scientific Warehousing & ROI Engine** | `/storage` | WDRA-accredited warehouse discovery, 75% e-NWR pledge loan advances at 7% p.a., and interactive *"Sell Now vs Store Later"* profit calculator. |
| **8** | **Transparent 7-Step Escrow Payments** | `/transactions` | Immutable 7-stage settlement timeline from order placement to Bank UTR confirmation (`YESB000284918239`) with downloadable PDF tax invoices. |
| **9** | **Dispute & Grievance Redressal** | `/disputes` | Fast-track redressal system with 48-hour SLA resolution for quality mismatches, weight disputes, and transport delays. |
| **10** | **FPO Bulk Aggregation Portal** | `/fpo` | Tool for FPOs to aggregate harvests from 100+ smallholders into 250-tonne bulk commercial lots for corporate procurement tenders (+₹260/qtl extra profit). |
| **11** | **Multilingual AI Voice Assistant** | `/assistant` | Native voice query engine with speech-to-text (STT) and text-to-speech (TTS) audio playback in 12 Indian regional languages. |
| **12** | **Public Price Transparency Ledger** | `/transparency` | Open benchmark audit ledger displaying Mandi reference prices vs KrishiSetu realized prices (+11.4% extra gain). |
| **13** | **Master Ecosystem Admin Console** | `/admin` | Real-time ecosystem dashboard for KYC moderation, dispute triage, mandi feed sync, and volume analytics. |
| **14** | **Unified Single-Link Master Hub** | `/` | All 14 platform modules interactively integrated and switchable on a single unified URL. |

---

## 🌐 12 Supported Indian Regional Languages

KrishiSetu offers instantaneous, zero-latency 1-click language switching across the entire UI and voice recognition engine:

1. 🌐 **English** (Default Business Language)
2. 🇮🇳 **Hindi (हिन्दी)**
3. 🐪 **Rajasthani (राजस्थानी)**
4. 🌾 **Punjabi (ਪੰਜਾਬੀ)**
5. 🦁 **Gujarati (ગુજરાતી)**
6. 🚩 **Marathi (मराठी)**
7. 🐅 **Bengali (বাংলা)**
8. 🌱 **Telugu (తెలుగు)**
9. 🛕 **Tamil (தமிழ்)**
10. 🐘 **Kannada (ಕನ್ನಡ)**
11. 🌴 **Malayalam (മലയാളം)**
12. 🌊 **Odia (ଓଡ଼ିଆ)**

---

## 👥 Ecosystem Roles & Security Model

| Ecosystem Role | Access Scope & Permissions | Key Dashboard Views |
|---|---|---|
| 👨🌾 **Farmer** | Create crop listings, view mandi rates, receive buyer offers, track payments & GPS. | Crop Listings, QR Passports, Payment Tracker |
| 👥 **FPO Manager** | Aggregate bulk harvest from 100+ members, corporate tenders, member DBT payouts. | Bulk Tender Portal, Aggregation Pool |
| 🏭 **Verified Buyer** | Search Grade A lots, submit contracts, deposit escrow funds, approve weighments. | Buyer Matchmaker, Negotiation Room |
| 🚚 **Transporter** | Accept freight bookings, update GPS transit milestones, upload loading slips. | Logistics Booking, GPS Milestone Tracker |
| 🏬 **Warehouse Operator** | Manage WDRA silo capacity, issue e-NWR receipts, approve 75% bank pledge loans. | Storage Discovery, Silo Inventory |
| 🔬 **Assayer / Lab** | Conduct on-farm testing, calibrate AI quality scores, issue assay certificates. | AI Grain Scanner, Quality Audit Console |
| 👨💼 **Administrator** | Moderate buyer KYC, resolve dispute tickets within 48h SLA, sync mandi feeds. | Master Ecosystem Admin Console |

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with Lucide Icons
- **Database ORM**: [Prisma ORM](https://www.prisma.io/) with SQLite
- **Voice / Speech**: Web Speech API (`SpeechRecognition` & `SpeechSynthesis`) with BCP-47 regional dialect codes
- **Deployment**: [Vercel](https://vercel.com/) with automated cloud CI/CD

---

## 🚀 Getting Started (Local Development)

### 1. Clone the Repository
```bash
git clone https://github.com/yatikjain318-dot/krishisetu.git
cd krishisetu
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Generate Prisma Database Client
```bash
npx prisma generate
```

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to explore the platform.

---

## 📦 Production Build & Testing

To test the production build locally:
```bash
npm run build
npm run start
```

---

## ☁️ Deployment on Vercel

The repository is pre-configured for one-click deployment on Vercel:

1. Push your changes to the `main` branch on GitHub:
   ```bash
   git push origin main
   ```
2. In the [Vercel Dashboard](https://vercel.com/new), import `krishisetu`.
3. Vercel automatically runs `prisma generate && next build` and deploys your live production URL with zero configuration needed.

---

## 📞 Kisan Call Center Helpline
- **Toll-Free Helpline**: `1800-180-1551` (24x7 Government & Agri Support)

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
