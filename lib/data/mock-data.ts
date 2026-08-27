// Comprehensive Mock Database & State Engine for KrishiSetu Market Intelligence Platform

export interface MandiCropPrice {
  cropId: string;
  cropName: string;
  cropNameHi: string;
  variety: string;
  minPrice: number;
  maxPrice: number;
  modalPrice: number;
  yesterdayModal: number;
  changePercent: number;
  arrivalTodayQtl: number;
  trend: "up" | "down" | "stable";
  qualityRequirement: string;
}

export interface Mandi {
  id: string;
  name: string;
  nameHi: string;
  state: string;
  district: string;
  distanceKm: number;
  transportCostPerQtl: number;
  timings: string;
  arrivalVolumeQtl: number;
  buyerCount: number;
  contact: string;
  lat: number;
  lng: number;
  cropPrices: MandiCropPrice[];
}

export interface CropIntelligence {
  id: string;
  name: string;
  nameHi: string;
  varietyList: string[];
  currentAvgModal: number;
  sevenDayTrendPercent: number;
  thirtyDayTrendPercent: number;
  demandLevel: "HIGH" | "MEDIUM" | "MODERATE";
  msp: number;
  arrivalSeason: string;
  aiRecommendation: {
    action: "SELL_NOW" | "WAIT_5_7_DAYS" | "CONSIDER_NEARBY_MARKET" | "CONSIDER_STORAGE";
    confidence: number;
    reasonHi: string;
    reasonEn: string;
    targetPriceProjection: number;
    expectedRiseDays: number;
  };
  chartData: { date: string; price: number; projected?: boolean }[];
}

export interface VerifiedBuyer {
  id: string;
  name: string;
  badge: "Verified Platinum" | "Verified Gold" | "Verified Silver";
  category:
    | "Food Processing"
    | "Exporter"
    | "Retail Chain"
    | "Hotel / Institutional"
    | "Wholesaler"
    | "Agri-Processing Unit"
    | "Govt Procurement";
  categoryHi: string;
  crops: string[];
  cropNamesHi: string[];
  requiredQtyTons: number;
  minPurchaseQtl: number;
  offeredPriceRange: string;
  offeredPriceAvg: number;
  paymentTerms: string;
  paymentTermsHi: string;
  escrowProtected: boolean;
  location: string;
  distanceKm: number;
  rating: number;
  ratingCount: number;
  disputeRate: string;
  completedTrades: number;
  kycStatus: "VERIFIED" | "PENDING";
  gstin: string;
  fssai: string;
  contactPhone: string;
  contactEmail: string;
  preferredGrade: string;
  matchScore: number;
  matchFactors: { label: string; score: number }[];
}

export interface DigitalLot {
  id: string;
  lotCode: string;
  farmerId: string;
  farmerName: string;
  farmerPhone: string;
  farmerLocation: string;
  cropId: string;
  cropName: string;
  variety: string;
  quantityQtl: number;
  harvestDate: string;
  expectedSellingDate: string;
  moisturePercent: number;
  qualityGrade: "Grade A" | "Grade B (FAQ)" | "Grade C";
  foreignMatterPercent: number;
  brokenPercent: number;
  expectedPrice: number;
  minReservePrice: number;
  certifications: string[];
  photos: string[];
  videos?: string[];
  status: "ACTIVE" | "OFFER_RECEIVED" | "SOLD" | "STORED";
  createdAt: string;
  aiGradingScore?: number;
}

export interface DigitalOffer {
  id: string;
  lotId: string;
  lotCode: string;
  buyerId: string;
  buyerName: string;
  buyerRating: number;
  cropName: string;
  offeredPrice: number;
  quantityQtl: number;
  totalValue: number;
  pickupOrDelivery: "FARM_PICKUP" | "MANDI_DELIVERY";
  paymentTerms: string;
  offerStatus: "PENDING" | "COUNTERED" | "ACCEPTED" | "REJECTED";
  expiresInHours: number;
  negotiationHistory: {
    sender: "BUYER" | "FARMER";
    price: number;
    note: string;
    timestamp: string;
  }[];
}

export interface Transporter {
  id: string;
  name: string;
  driverName: string;
  vehicleType: string;
  capacityTons: number;
  baseRatePerKm: number;
  ratePerQtl: number;
  currentLocation: string;
  rating: number;
  phone: string;
  verified: boolean;
}

export interface ShipmentTracker {
  id: string;
  shipmentCode: string;
  lotCode: string;
  cropName: string;
  quantityQtl: number;
  transporterName: string;
  vehicleNumber: string;
  driverPhone: string;
  status: "IN_TRANSIT" | "DELIVERED" | "PICKUP_SCHEDULED";
  from: string;
  to: string;
  estimatedArrival: string;
  currentMilestoneIndex: number;
  milestones: { title: string; time: string; done: boolean }[];
}

export interface Warehouse {
  id: string;
  name: string;
  type: string;
  typeHi: string;
  location: string;
  distanceKm: number;
  totalCapacityBags: number;
  availableCapacityBags: number;
  ratePerBagPerMonth: number;
  insuranceCovered: boolean;
  eNWRSupport: boolean;
  contact: string;
  rating: number;
}

export interface TransactionRecord {
  id: string;
  txnCode: string;
  lotCode: string;
  farmerName: string;
  buyerName: string;
  crop: string;
  quantityQtl: number;
  agreedPricePerQtl: number;
  totalAmount: number;
  mandiBenchmarkPrice: number;
  extraRealization: number;
  status: "ESCROW_PAID" | "IN_TRANSIT" | "QUALITY_VERIFIED" | "PAYMENT_INITIATED" | "COMPLETED";
  utrNumber: string;
  date: string;
  timeline: { stage: string; done: boolean; time: string }[];
}

export interface GrievanceCase {
  id: string;
  grievanceId: string;
  lotCode: string;
  complainantName: string;
  complainantRole: "FARMER" | "BUYER" | "FPO";
  againstParty: string;
  category: "PAYMENT_DELAY" | "QUALITY_DISPUTE" | "QUANTITY_MISMATCH" | "TRANSPORT_DAMAGE" | "CONTRACT_VIOLATION";
  categoryHi: string;
  title: string;
  description: string;
  status: "SUBMITTED" | "UNDER_REVIEW" | "EVIDENCE_REQUESTED" | "RESOLUTION_PROPOSED" | "RESOLVED";
  statusHi: string;
  evidenceFiles: string[];
  resolutionNote?: string;
  createdAt: string;
  steps: { stage: string; done: boolean; date: string }[];
}

export interface FPOAggregation {
  id: string;
  fpoName: string;
  crop: string;
  totalAggregatedQtl: number;
  memberFarmersCount: number;
  targetBuyer: string;
  offeredPrice: number;
  localMandiBenchmark: number;
  totalFpoExtraProfit: number;
  status: "OPEN_AGGREGATION" | "TENDER_AWARDED" | "DISPATCHED" | "PAYOUTS_DISTRIBUTED";
  members: { farmerName: string; village: string; quantityQtl: number; payout: number; status: string }[];
}

// -------------------------------------------------------------
// SEED DATA
// -------------------------------------------------------------

export const MANDIS_DATA: Mandi[] = [
  {
    id: "jaipur-apmc",
    name: "Jaipur Surajpole Mandi",
    nameHi: "जयपुर सूरजपोल मंडी",
    state: "Rajasthan",
    district: "Jaipur",
    distanceKm: 18,
    transportCostPerQtl: 35,
    timings: "05:00 AM - 02:30 PM",
    arrivalVolumeQtl: 8400,
    buyerCount: 120,
    contact: "+91 141 2348911",
    lat: 26.9124,
    lng: 75.7873,
    cropPrices: [
      {
        cropId: "wheat",
        cropName: "Wheat (Sharbati & Lokwan)",
        cropNameHi: "गेहूं (शरबती / लोकवन)",
        variety: "Lokwan / Mill Quality",
        minPrice: 2420,
        maxPrice: 2780,
        modalPrice: 2650,
        yesterdayModal: 2590,
        changePercent: 2.3,
        arrivalTodayQtl: 3200,
        trend: "up",
        qualityRequirement: "Moisture < 12%, Foreign Matter < 1%",
      },
      {
        cropId: "mustard",
        cropName: "Mustard (Pusa Bold)",
        cropNameHi: "सरसों (पूसा बोल्ड)",
        variety: "42% Oil Content",
        minPrice: 5450,
        maxPrice: 5950,
        modalPrice: 5820,
        yesterdayModal: 5760,
        changePercent: 1.0,
        arrivalTodayQtl: 2100,
        trend: "up",
        qualityRequirement: "Oil > 40%, Moisture < 8%",
      },
      {
        cropId: "chana",
        cropName: "Gram / Chana",
        cropNameHi: "चना (देसी)",
        variety: "Desi Bold",
        minPrice: 5600,
        maxPrice: 6200,
        modalPrice: 5980,
        yesterdayModal: 6020,
        changePercent: -0.6,
        arrivalTodayQtl: 850,
        trend: "down",
        qualityRequirement: "FAQ Grade, Moisture < 10%",
      },
      {
        cropId: "onion",
        cropName: "Onion (Nashik Red)",
        cropNameHi: "प्याज (लाल)",
        variety: "Medium Red",
        minPrice: 1400,
        maxPrice: 1950,
        modalPrice: 1750,
        yesterdayModal: 1680,
        changePercent: 4.1,
        arrivalTodayQtl: 1400,
        trend: "up",
        qualityRequirement: "Dry Skin, Medium-Large Bulb",
      },
    ],
  },
  {
    id: "ajmer-mandi",
    name: "Ajmer Krishi Upaj Mandi",
    nameHi: "अजमेर कृषि उपज मंडी",
    state: "Rajasthan",
    district: "Ajmer",
    distanceKm: 32,
    transportCostPerQtl: 55,
    timings: "06:00 AM - 01:00 PM",
    arrivalVolumeQtl: 4200,
    buyerCount: 65,
    contact: "+91 145 2623100",
    lat: 26.4499,
    lng: 74.6399,
    cropPrices: [
      {
        cropId: "wheat",
        cropName: "Wheat",
        cropNameHi: "गेहूं",
        variety: "Desi Sharbati",
        minPrice: 2350,
        maxPrice: 2680,
        modalPrice: 2520,
        yesterdayModal: 2510,
        changePercent: 0.4,
        arrivalTodayQtl: 1800,
        trend: "stable",
        qualityRequirement: "Clean Grain, Moisture < 12%",
      },
      {
        cropId: "mustard",
        cropName: "Mustard",
        cropNameHi: "सरसों",
        variety: "Black Mustard",
        minPrice: 5300,
        maxPrice: 5800,
        modalPrice: 5690,
        yesterdayModal: 5650,
        changePercent: 0.7,
        arrivalTodayQtl: 1200,
        trend: "up",
        qualityRequirement: "Moisture < 9%",
      },
      {
        cropId: "chana",
        cropName: "Gram / Chana",
        cropNameHi: "चना",
        variety: "Desi",
        minPrice: 5500,
        maxPrice: 6050,
        modalPrice: 5850,
        yesterdayModal: 5890,
        changePercent: -0.7,
        arrivalTodayQtl: 600,
        trend: "down",
        qualityRequirement: "FAQ Grade",
      },
    ],
  },
  {
    id: "kota-mandi",
    name: "Kota Bhamashah Mandi",
    nameHi: "कोटा भामाशाह कृषि मंडी",
    state: "Rajasthan",
    district: "Kota",
    distanceKm: 95,
    transportCostPerQtl: 110,
    timings: "05:00 AM - 04:00 PM",
    arrivalVolumeQtl: 16500,
    buyerCount: 240,
    contact: "+91 744 2481020",
    lat: 25.2138,
    lng: 75.8648,
    cropPrices: [
      {
        cropId: "wheat",
        cropName: "Wheat",
        cropNameHi: "गेहूं",
        variety: "Lokwan Grade-1",
        minPrice: 2480,
        maxPrice: 2820,
        modalPrice: 2710,
        yesterdayModal: 2640,
        changePercent: 2.6,
        arrivalTodayQtl: 6800,
        trend: "up",
        qualityRequirement: "Lustrous grain, Moisture < 11.5%",
      },
      {
        cropId: "soybean",
        cropName: "Soybean (Yellow)",
        cropNameHi: "सोयाबीन (पीला)",
        variety: "JS 335 / Yellow",
        minPrice: 4400,
        maxPrice: 4890,
        modalPrice: 4720,
        yesterdayModal: 4650,
        changePercent: 1.5,
        arrivalTodayQtl: 4200,
        trend: "up",
        qualityRequirement: "Moisture < 10%, Foreign matter < 2%",
      },
      {
        cropId: "mustard",
        cropName: "Mustard",
        cropNameHi: "सरसों",
        variety: "42% Oil Pusa",
        minPrice: 5600,
        maxPrice: 6050,
        modalPrice: 5910,
        yesterdayModal: 5880,
        changePercent: 0.5,
        arrivalTodayQtl: 3100,
        trend: "up",
        qualityRequirement: "High oil content",
      },
    ],
  },
  {
    id: "neemuch-mandi",
    name: "Neemuch Mandi (MP)",
    nameHi: "नीमच कृषि उपज मंडी (म.प्र.)",
    state: "Madhya Pradesh",
    district: "Neemuch",
    distanceKm: 140,
    transportCostPerQtl: 145,
    timings: "06:00 AM - 03:00 PM",
    arrivalVolumeQtl: 12000,
    buyerCount: 180,
    contact: "+91 7423 220019",
    lat: 24.4735,
    lng: 74.8724,
    cropPrices: [
      {
        cropId: "soybean",
        cropName: "Soybean",
        cropNameHi: "सोयाबीन",
        variety: "Grade-A Yellow",
        minPrice: 4480,
        maxPrice: 4950,
        modalPrice: 4780,
        yesterdayModal: 4710,
        changePercent: 1.5,
        arrivalTodayQtl: 5100,
        trend: "up",
        qualityRequirement: "Yellow, Clean",
      },
      {
        cropId: "mustard",
        cropName: "Mustard",
        cropNameHi: "सरसों",
        variety: "Bold Black",
        minPrice: 5550,
        maxPrice: 5980,
        modalPrice: 5880,
        yesterdayModal: 5840,
        changePercent: 0.7,
        arrivalTodayQtl: 2800,
        trend: "up",
        qualityRequirement: "Oil > 41%",
      },
    ],
  },
  {
    id: "azadpur-delhi",
    name: "Delhi Azadpur Mandi",
    nameHi: "दिल्ली आज़ादपुर राष्ट्रीय मंडी",
    state: "Delhi",
    district: "North Delhi",
    distanceKm: 240,
    transportCostPerQtl: 210,
    timings: "03:00 AM - 06:00 PM",
    arrivalVolumeQtl: 45000,
    buyerCount: 950,
    contact: "+91 11 27691234",
    lat: 28.7159,
    lng: 77.1775,
    cropPrices: [
      {
        cropId: "onion",
        cropName: "Onion",
        cropNameHi: "प्याज",
        variety: "Red Grade-1",
        minPrice: 1650,
        maxPrice: 2250,
        modalPrice: 2050,
        yesterdayModal: 1920,
        changePercent: 6.7,
        arrivalTodayQtl: 12000,
        trend: "up",
        qualityRequirement: "Sorted, No Sprouting",
      },
      {
        cropId: "potato",
        cropName: "Potato (Kufri Jyoti)",
        cropNameHi: "आलू (कुफरी ज्योति)",
        variety: "Jyoti Large",
        minPrice: 1100,
        maxPrice: 1550,
        modalPrice: 1380,
        yesterdayModal: 1360,
        changePercent: 1.5,
        arrivalTodayQtl: 9500,
        trend: "up",
        qualityRequirement: "Clean, > 45mm diameter",
      },
      {
        cropId: "tomato",
        cropName: "Tomato (Hybrid)",
        cropNameHi: "टमाटर (हाइब्रिड)",
        variety: "Firm Red",
        minPrice: 1800,
        maxPrice: 2800,
        modalPrice: 2400,
        yesterdayModal: 2250,
        changePercent: 6.6,
        arrivalTodayQtl: 7800,
        trend: "up",
        qualityRequirement: "Semi-ripe / Ripe firm",
      },
    ],
  },
  {
    id: "khanna-punjab",
    name: "Khanna Grain Market",
    nameHi: "खन्ना एशिया की सबसे बड़ी अनाज मंडी (पंजाब)",
    state: "Punjab",
    district: "Ludhiana",
    distanceKm: 310,
    transportCostPerQtl: 260,
    timings: "05:00 AM - 05:00 PM",
    arrivalVolumeQtl: 38000,
    buyerCount: 450,
    contact: "+91 1628 223400",
    lat: 30.7073,
    lng: 76.2163,
    cropPrices: [
      {
        cropId: "paddy",
        cropName: "Basmati Paddy 1121",
        cropNameHi: "बासमती धान 1121",
        variety: "Pusa 1121",
        minPrice: 3600,
        maxPrice: 4250,
        modalPrice: 4050,
        yesterdayModal: 3980,
        changePercent: 1.8,
        arrivalTodayQtl: 14500,
        trend: "up",
        qualityRequirement: "Moisture < 14%, Long Grain",
      },
      {
        cropId: "wheat",
        cropName: "Wheat",
        cropNameHi: "गेहूं",
        variety: "HD-2967 / HD-3086",
        minPrice: 2450,
        maxPrice: 2750,
        modalPrice: 2620,
        yesterdayModal: 2600,
        changePercent: 0.8,
        arrivalTodayQtl: 18000,
        trend: "up",
        qualityRequirement: "FAQ / Mill Grade",
      },
    ],
  },
];

export const CROPS_INTELLIGENCE: CropIntelligence[] = [
  {
    id: "wheat",
    name: "Wheat",
    nameHi: "गेहूं (Wheat)",
    varietyList: ["Lokwan", "Sharbati", "HD-2967", "HD-3086", "Desi"],
    currentAvgModal: 2650,
    sevenDayTrendPercent: 5.8,
    thirtyDayTrendPercent: 11.2,
    demandLevel: "HIGH",
    msp: 2425,
    arrivalSeason: "Peak Harvest (Rabi)",
    aiRecommendation: {
      action: "WAIT_5_7_DAYS",
      confidence: 91,
      reasonHi:
        "पिछले 7 दिनों में प्रमुख मंडियों में गेहूं के भाव 5.8% बढ़े हैं। निजी आटा मिलों और निर्यातकों की मांग तेज है और आवक स्थिर है। 5-7 दिन रुकने से प्रति क्विंटल ₹80-120 अतिरिक्त मिलने का अनुमान है।",
      reasonEn:
        "Wheat prices in major mandis have risen by 5.8% over the past 7 days. Private flour mills and bulk buyers have high demand. Holding for 5–7 days is estimated to yield ₹80–120/quintal more.",
      targetPriceProjection: 2760,
      expectedRiseDays: 6,
    },
    chartData: [
      { date: "01 Aug", price: 2380 },
      { date: "05 Aug", price: 2410 },
      { date: "10 Aug", price: 2460 },
      { date: "15 Aug", price: 2510 },
      { date: "20 Aug", price: 2580 },
      { date: "25 Aug", price: 2620 },
      { date: "Today", price: 2650 },
      { date: "+3 Days", price: 2710, projected: true },
      { date: "+7 Days", price: 2765, projected: true },
      { date: "+14 Days", price: 2810, projected: true },
    ],
  },
  {
    id: "mustard",
    name: "Mustard",
    nameHi: "सरसों (Mustard)",
    varietyList: ["Pusa Bold", "Giriraj", "Black Mustard", "Yellow Sarson"],
    currentAvgModal: 5820,
    sevenDayTrendPercent: 3.2,
    thirtyDayTrendPercent: 8.4,
    demandLevel: "HIGH",
    msp: 5650,
    arrivalSeason: "Post-Harvest Storage Phase",
    aiRecommendation: {
      action: "CONSIDER_STORAGE",
      confidence: 88,
      reasonHi:
        "त्योहारी सीजन के कारण सरसों तेल मिलों की मांग अगले 30-45 दिनों में उच्चतम स्तर पर पहुंचेगी। सरकारी मान्यता प्राप्त WDRA गोदाम में रखने पर प्रति माह ₹250-350/क्विंटल शुद्ध लाभ संभव है।",
      reasonEn:
        "Upcoming festive demand for mustard oil is projected to peak within 30-45 days. Storing in WDRA accredited warehouse could unlock net gains of ₹250-350/quintal after storage charges.",
      targetPriceProjection: 6250,
      expectedRiseDays: 30,
    },
    chartData: [
      { date: "01 Aug", price: 5350 },
      { date: "08 Aug", price: 5490 },
      { date: "15 Aug", price: 5640 },
      { date: "22 Aug", price: 5740 },
      { date: "Today", price: 5820 },
      { date: "+7 Days", price: 5940, projected: true },
      { date: "+14 Days", price: 6080, projected: true },
      { date: "+30 Days", price: 6280, projected: true },
    ],
  },
  {
    id: "cotton",
    name: "Cotton",
    nameHi: "कपास / नरमा (Cotton)",
    varietyList: ["Bt Cotton", "Shankar-6", "Bunny", "DCH-32"],
    currentAvgModal: 7450,
    sevenDayTrendPercent: -1.2,
    thirtyDayTrendPercent: 4.1,
    demandLevel: "MEDIUM",
    msp: 7120,
    arrivalSeason: "Early Arrivals",
    aiRecommendation: {
      action: "SELL_NOW",
      confidence: 86,
      reasonHi:
        "अंतर्राष्ट्रीय कॉटन वायदा में नरमी और नई फसल की भारी आवक शुरू होने से अगले सप्ताह भाव स्थिर या थोड़े कम हो सकते हैं। वर्तमान ₹7,450/क्विंटल भाव पर तुरंत बेचना सुरक्षित रहेगा।",
      reasonEn:
        "Global cotton futures softening and heavy new harvest arrivals starting next week may cap prices. Selling at current level of ₹7,450/qtl provides optimal risk-adjusted realization.",
      targetPriceProjection: 7400,
      expectedRiseDays: 0,
    },
    chartData: [
      { date: "01 Aug", price: 7180 },
      { date: "10 Aug", price: 7350 },
      { date: "18 Aug", price: 7520 },
      { date: "24 Aug", price: 7490 },
      { date: "Today", price: 7450 },
      { date: "+7 Days", price: 7380, projected: true },
      { date: "+14 Days", price: 7320, projected: true },
    ],
  },
  {
    id: "soybean",
    name: "Soybean",
    nameHi: "सोयाबीन (Soybean)",
    varietyList: ["JS 335", "JS 9560", "Yellow Soybean", "Organic"],
    currentAvgModal: 4720,
    sevenDayTrendPercent: 2.9,
    thirtyDayTrendPercent: 6.5,
    demandLevel: "HIGH",
    msp: 4600,
    arrivalSeason: "Pre-Harvest Spot Demand",
    aiRecommendation: {
      action: "CONSIDER_NEARBY_MARKET",
      confidence: 93,
      reasonHi:
        "कोटा और नीमच मंडियों में सोयाबीन के भाव आपकी स्थानीय मंडी से ₹180-220 अधिक चल रहे हैं। परिवहन खर्च काटने के बाद भी आपको प्रति क्विंटल ₹90 का सीधा लाभ मिलेगा।",
      reasonEn:
        "Soybean rates at Kota & Neemuch are running ₹180-220/qtl higher than local market. Even after freight, net in-hand realization is ₹90/qtl higher.",
      targetPriceProjection: 4890,
      expectedRiseDays: 5,
    },
    chartData: [
      { date: "01 Aug", price: 4420 },
      { date: "10 Aug", price: 4510 },
      { date: "18 Aug", price: 4630 },
      { date: "24 Aug", price: 4680 },
      { date: "Today", price: 4720 },
      { date: "+7 Days", price: 4850, projected: true },
      { date: "+14 Days", price: 4940, projected: true },
    ],
  },
  {
    id: "paddy",
    name: "Basmati Paddy",
    nameHi: "बासमती धान (Paddy)",
    varietyList: ["Pusa 1121", "Pusa 1509", "1718", "Sharbati Paddy", "Parmal"],
    currentAvgModal: 4050,
    sevenDayTrendPercent: 4.5,
    thirtyDayTrendPercent: 14.0,
    demandLevel: "HIGH",
    msp: 2300,
    arrivalSeason: "Export Demand Peak",
    aiRecommendation: {
      action: "WAIT_5_7_DAYS",
      confidence: 94,
      reasonHi:
        "मध्य पूर्व देशों से बासमती चावल के बड़े निर्यात ऑर्डर मिलने से राइस मिलर्स आक्रामक खरीद कर रहे हैं। भाव अगले 7-10 दिनों में ₹4,200 पार करने की पूरी संभावना है।",
      reasonEn:
        "Fresh export orders from Middle East have driven heavy miller procurement. Basmati rates are poised to test ₹4,200+/qtl over the next 7-10 days.",
      targetPriceProjection: 4220,
      expectedRiseDays: 7,
    },
    chartData: [
      { date: "01 Aug", price: 3550 },
      { date: "10 Aug", price: 3720 },
      { date: "18 Aug", price: 3880 },
      { date: "24 Aug", price: 3980 },
      { date: "Today", price: 4050 },
      { date: "+7 Days", price: 4210, projected: true },
      { date: "+14 Days", price: 4340, projected: true },
    ],
  },
  {
    id: "onion",
    name: "Onion",
    nameHi: "प्याज (Onion)",
    varietyList: ["Nashik Red", "Garwa", "White Onion", "Maharani"],
    currentAvgModal: 1750,
    sevenDayTrendPercent: 8.2,
    thirtyDayTrendPercent: 22.5,
    demandLevel: "HIGH",
    msp: 0,
    arrivalSeason: "Storage Stocks Released",
    aiRecommendation: {
      action: "SELL_NOW",
      confidence: 89,
      reasonHi:
        "प्याज के भाव पिछले महीने से 22% ऊपर हैं। दक्षिण भारत की नई खरीफ फसल अगले 10 दिनों में मंडियों में आने वाली है जिससे भाव गिर सकते हैं। अभी बेचना सबसे फायदेमंद है।",
      reasonEn:
        "Onion prices are already up 22% month-on-month. Early Southern Kharif arrivals will start entering within 10 days, likely cooling prices. Sell immediately.",
      targetPriceProjection: 1750,
      expectedRiseDays: 0,
    },
    chartData: [
      { date: "01 Aug", price: 1420 },
      { date: "10 Aug", price: 1510 },
      { date: "18 Aug", price: 1620 },
      { date: "24 Aug", price: 1710 },
      { date: "Today", price: 1750 },
      { date: "+7 Days", price: 1680, projected: true },
      { date: "+14 Days", price: 1550, projected: true },
    ],
  },
];

export const VERIFIED_BUYERS: VerifiedBuyer[] = [
  {
    id: "buyer-itc",
    name: "ITC Agri Business Division (e-Choupal)",
    badge: "Verified Platinum",
    category: "Food Processing",
    categoryHi: "खाद्य प्रसंस्करण उद्योग (Food Processor)",
    crops: ["wheat", "soybean", "mustard"],
    cropNamesHi: ["गेहूं (Sharbati)", "सोयाबीन", "सरसों"],
    requiredQtyTons: 1200,
    minPurchaseQtl: 30,
    offeredPriceRange: "₹2,680 - ₹2,780 / क्विंटल",
    offeredPriceAvg: 2720,
    paymentTerms: "Within 24 Hours via Escrow / Direct DBT",
    paymentTermsHi: "24 घंटे में सीधे बैंक खाते में (एस्क्रो सुरक्षित)",
    escrowProtected: true,
    location: "ITC Bindayaka Procurement Hub, Jaipur (38 km)",
    distanceKm: 38,
    rating: 4.95,
    ratingCount: 380,
    disputeRate: "0.0%",
    completedTrades: 1240,
    kycStatus: "VERIFIED",
    gstin: "08AAACI1681G1ZM",
    fssai: "10012011000188",
    contactPhone: "+91 141 2788900",
    contactEmail: "sourcing.jaipur@itc.in",
    preferredGrade: "Grade A (Sharbati / Lokwan, Moisture < 11.5%)",
    matchScore: 96,
    matchFactors: [
      { label: "Crop & Variety Match", score: 98 },
      { label: "Price Realization (+₹70 over mandi)", score: 95 },
      { label: "Distance & Freight Cost", score: 92 },
      { label: "Escrow Payment Reliability", score: 100 },
    ],
  },
  {
    id: "buyer-reliance",
    name: "Reliance Retail Agri Sourcing",
    badge: "Verified Platinum",
    category: "Retail Chain",
    categoryHi: "संगठित खुदरा श्रृंखला (Retail Chain)",
    crops: ["wheat", "paddy", "onion", "potato", "tomato"],
    cropNamesHi: ["गेहूं", "बासमती धान", "प्याज", "आलू", "टमाटर"],
    requiredQtyTons: 2500,
    minPurchaseQtl: 20,
    offeredPriceRange: "₹2,720 - ₹2,800 / क्विंटल (Wheat)",
    offeredPriceAvg: 2750,
    paymentTerms: "Direct Bank Transfer within 48 Hours",
    paymentTermsHi: "48 घंटे में बैंक ट्रांसफर",
    escrowProtected: true,
    location: "Reliance Fresh Distribution Center, Sitapura, Jaipur (28 km)",
    distanceKm: 28,
    rating: 4.9,
    ratingCount: 512,
    disputeRate: "0.2%",
    completedTrades: 2180,
    kycStatus: "VERIFIED",
    gstin: "08AABCR2418N1ZU",
    fssai: "10014013000789",
    contactPhone: "+91 141 4901200",
    contactEmail: "agri.procure@ril.com",
    preferredGrade: "Grade A Uniform, Zero Pest Infestation",
    matchScore: 94,
    matchFactors: [
      { label: "Proximity & Fast Pickup", score: 96 },
      { label: "Bulk Quantity Absorption", score: 95 },
      { label: "Premium Pricing", score: 94 },
      { label: "Verified Buyer Trust", score: 98 },
    ],
  },
  {
    id: "buyer-daawat",
    name: "LT Foods Ltd. (Daawat Basmati Rice)",
    badge: "Verified Platinum",
    category: "Exporter",
    categoryHi: "अग्रणी चावल निर्यातक (Rice Exporter)",
    crops: ["paddy"],
    cropNamesHi: ["बासमती धान 1121", "1509", "1718"],
    requiredQtyTons: 5000,
    minPurchaseQtl: 50,
    offeredPriceRange: "₹4,150 - ₹4,300 / क्विंटल",
    offeredPriceAvg: 4220,
    paymentTerms: "Instant Digital Escrow Settlement on Lab Assay",
    paymentTermsHi: "लैब रिपोर्ट आते ही डिजिटल एस्क्रो भुगतान",
    escrowProtected: true,
    location: "Daawat Grain Terminal, Sonepat / Punjab Hub",
    distanceKm: 210,
    rating: 4.98,
    ratingCount: 640,
    disputeRate: "0.0%",
    completedTrades: 3890,
    kycStatus: "VERIFIED",
    gstin: "06AAACL0401E1Z0",
    fssai: "10012064000084",
    contactPhone: "+91 124 4567890",
    contactEmail: "farmer.procurement@ltgroup.in",
    preferredGrade: "Pusa 1121 / 1509, Length > 8.3mm",
    matchScore: 95,
    matchFactors: [
      { label: "Highest Market Price", score: 99 },
      { label: "Lab Assayed Transparency", score: 96 },
      { label: "Instant Payment Track", score: 98 },
      { label: "Export Grade Premium", score: 94 },
    ],
  },
  {
    id: "buyer-fortune",
    name: "Adani Wilmar Ltd. (Fortune Oils)",
    badge: "Verified Gold",
    category: "Agri-Processing Unit",
    categoryHi: "खाद्य तेल शोधन इकाई (Oilseed Processor)",
    crops: ["mustard", "soybean", "cotton"],
    cropNamesHi: ["सरसों", "सोयाबीन", "कपास"],
    requiredQtyTons: 3500,
    minPurchaseQtl: 40,
    offeredPriceRange: "₹5,900 - ₹6,050 / क्विंटल (Mustard 42%)",
    offeredPriceAvg: 5980,
    paymentTerms: "Direct DBT within 24 Hours",
    paymentTermsHi: "24 घंटे के भीतर डीबीटी भुगतान",
    escrowProtected: true,
    location: "Adani Wilmar Alwar Processing Plant (85 km)",
    distanceKm: 85,
    rating: 4.88,
    ratingCount: 295,
    disputeRate: "0.1%",
    completedTrades: 980,
    kycStatus: "VERIFIED",
    gstin: "08AACCA1100F1ZY",
    fssai: "10013012000244",
    contactPhone: "+91 144 2884100",
    contactEmail: "alwar.sourcing@adaniwilmar.in",
    preferredGrade: "Mustard Oil > 41.5%, Soybean Moisture < 9.5%",
    matchScore: 92,
    matchFactors: [
      { label: "Oil Content Bonus", score: 96 },
      { label: "Transparent Weighbridge", score: 95 },
      { label: "Fast Unloading", score: 90 },
      { label: "Stable Corporate Buyer", score: 98 },
    ],
  },
  {
    id: "buyer-patanjali",
    name: "Patanjali Ayurved Agri Processing",
    badge: "Verified Gold",
    category: "Food Processing",
    categoryHi: "आयुर्वेदिक व जैविक खाद्य निर्माता",
    crops: ["wheat", "mustard", "chana"],
    cropNamesHi: ["जैविक गेहूं", "सरसों", "देसी चना"],
    requiredQtyTons: 1500,
    minPurchaseQtl: 25,
    offeredPriceRange: "₹2,750 - ₹2,900 / क्विंटल (Organic / Desi)",
    offeredPriceAvg: 2820,
    paymentTerms: "Within 48 Hours via RTGS / NEFT",
    paymentTermsHi: "48 घंटे में आरटीजीएस भुगतान",
    escrowProtected: true,
    location: "Patanjali Food Park, Haridwar / Rajasthan Hub (110 km)",
    distanceKm: 110,
    rating: 4.82,
    ratingCount: 210,
    disputeRate: "0.3%",
    completedTrades: 640,
    kycStatus: "VERIFIED",
    gstin: "05AAACP2309L1Z8",
    fssai: "10014012000266",
    contactPhone: "+91 1334 266100",
    contactEmail: "agri.procure@patanjaliayurved.org",
    preferredGrade: "Pesticide Residue Free / Desi Varieties",
    matchScore: 89,
    matchFactors: [
      { label: "Organic Bonus Premium", score: 96 },
      { label: "Consistent Demand", score: 88 },
      { label: "Fair Weight Certification", score: 92 },
      { label: "Direct Farmer Connect", score: 90 },
    ],
  },
  {
    id: "buyer-motherdairy",
    name: "Mother Dairy Safal F&V Sourcing",
    badge: "Verified Gold",
    category: "Retail Chain",
    categoryHi: "सफल फल एवं सब्जी खरीद (Safal)",
    crops: ["onion", "potato", "tomato"],
    cropNamesHi: ["प्याज", "आलू", "टमाटर"],
    requiredQtyTons: 800,
    minPurchaseQtl: 15,
    offeredPriceRange: "₹1,850 - ₹1,980 / क्विंटल (Onion)",
    offeredPriceAvg: 1910,
    paymentTerms: "Same-Day Instant UPI / Escrow",
    paymentTermsHi: "उसी दिन तत्काल यूपीआई / एस्क्रो भुगतान",
    escrowProtected: true,
    location: "Safal Regional Sourcing Hub, Jaipur (22 km)",
    distanceKm: 22,
    rating: 4.91,
    ratingCount: 420,
    disputeRate: "0.0%",
    completedTrades: 1850,
    kycStatus: "VERIFIED",
    gstin: "07AAACM4821D1ZN",
    fssai: "10012011000211",
    contactPhone: "+91 141 2678901",
    contactEmail: "safal.sourcing@motherdairy.com",
    preferredGrade: "Sorted Size, Clean, Grade A",
    matchScore: 97,
    matchFactors: [
      { label: "Closest Distance (22 km)", score: 98 },
      { label: "Same Day Payout", score: 100 },
      { label: "Daily Fresh Demand", score: 95 },
      { label: "Zero Middleman Cut", score: 96 },
    ],
  },
  {
    id: "buyer-nafed",
    name: "Government NAFED / FCI Procurement Center",
    badge: "Verified Platinum",
    category: "Govt Procurement",
    categoryHi: "सरकारी खरीद केंद्र (MSP Procurement)",
    crops: ["wheat", "mustard", "chana", "paddy"],
    cropNamesHi: ["गेहूं", "सरसों", "चना", "धान"],
    requiredQtyTons: 50000,
    minPurchaseQtl: 10,
    offeredPriceRange: "₹2,425 / क्विंटल (MSP Assured)",
    offeredPriceAvg: 2425,
    paymentTerms: "Direct DBT into Aadhaar Linked Bank Account within 72h",
    paymentTermsHi: "आधार लिंक्ड खाते में 72 घंटे में सीधा डीबीटी",
    escrowProtected: true,
    location: "Chomu Krishi Upaj Mandi Sub-Center (6 km)",
    distanceKm: 6,
    rating: 4.75,
    ratingCount: 1400,
    disputeRate: "0.4%",
    completedTrades: 9200,
    kycStatus: "VERIFIED",
    gstin: "07AAACN0023K1ZT",
    fssai: "Govt Mandated",
    contactPhone: "1800 180 1551",
    contactEmail: "msp.procure@nafed-india.com",
    preferredGrade: "FAQ Standards (Moisture < 12%, Foreign Matter < 0.75%)",
    matchScore: 88,
    matchFactors: [
      { label: "Guaranteed Government MSP", score: 100 },
      { label: "Very Close Center (6 km)", score: 98 },
      { label: "Direct Aadhaar DBT", score: 92 },
      { label: "Strict FAQ Moisture Check", score: 82 },
    ],
  },
];

export const INITIAL_LOTS: DigitalLot[] = [
  {
    id: "lot-1",
    lotCode: "LOT-WHT-2026-8912",
    farmerId: "user-1",
    farmerName: "Rameshwar Gurjar",
    farmerPhone: "+91 98291 33451",
    farmerLocation: "Village Morija, Chomu, Jaipur (Rajasthan)",
    cropId: "wheat",
    cropName: "Wheat (Sharbati Gold)",
    variety: "Sharbati Lokwan",
    quantityQtl: 45,
    harvestDate: "2026-08-15",
    expectedSellingDate: "2026-08-28",
    moisturePercent: 11.2,
    qualityGrade: "Grade A",
    foreignMatterPercent: 0.4,
    brokenPercent: 1.1,
    expectedPrice: 2700,
    minReservePrice: 2580,
    certifications: ["AGMARK Grade-1", "Soil Health Card Verified"],
    photos: [
      "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=80",
    ],
    status: "OFFER_RECEIVED",
    createdAt: "2026-08-24T09:30:00Z",
    aiGradingScore: 95,
  },
  {
    id: "lot-2",
    lotCode: "LOT-MST-2026-4410",
    farmerId: "user-1",
    farmerName: "Rameshwar Gurjar",
    farmerPhone: "+91 98291 33451",
    farmerLocation: "Village Morija, Chomu, Jaipur (Rajasthan)",
    cropId: "mustard",
    cropName: "Mustard (Pusa Bold)",
    variety: "Pusa Bold 42%",
    quantityQtl: 28,
    harvestDate: "2026-08-10",
    expectedSellingDate: "2026-08-30",
    moisturePercent: 7.8,
    qualityGrade: "Grade A",
    foreignMatterPercent: 0.6,
    brokenPercent: 0.8,
    expectedPrice: 5950,
    minReservePrice: 5750,
    certifications: ["Lab Oil Content 42.4%"],
    photos: [
      "https://images.unsplash.com/photo-1508873696983-2df5293cb32f?w=800&auto=format&fit=crop&q=80",
    ],
    status: "ACTIVE",
    createdAt: "2026-08-22T14:15:00Z",
    aiGradingScore: 92,
  },
  {
    id: "lot-3",
    lotCode: "LOT-CHNA-2026-1029",
    farmerId: "user-1",
    farmerName: "Rameshwar Gurjar",
    farmerPhone: "+91 98291 33451",
    farmerLocation: "Village Morija, Chomu, Jaipur (Rajasthan)",
    cropId: "chana",
    cropName: "Gram / Chana",
    variety: "Desi Bold",
    quantityQtl: 18,
    harvestDate: "2026-08-05",
    expectedSellingDate: "2026-09-05",
    moisturePercent: 9.4,
    qualityGrade: "Grade B (FAQ)",
    foreignMatterPercent: 1.2,
    brokenPercent: 2.1,
    expectedPrice: 6100,
    minReservePrice: 5850,
    certifications: ["Standard FAQ"],
    photos: [
      "https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=800&auto=format&fit=crop&q=80",
    ],
    status: "STORED",
    createdAt: "2026-08-18T11:00:00Z",
    aiGradingScore: 86,
  },
];

export const INITIAL_OFFERS: DigitalOffer[] = [
  {
    id: "offer-1",
    lotId: "lot-1",
    lotCode: "LOT-WHT-2026-8912",
    buyerId: "buyer-itc",
    buyerName: "ITC Agri Business Division",
    buyerRating: 4.95,
    cropName: "Wheat (Sharbati Gold)",
    offeredPrice: 2680,
    quantityQtl: 45,
    totalValue: 120600,
    pickupOrDelivery: "FARM_PICKUP",
    paymentTerms: "24-Hour Escrow (Instant transfer post pickup)",
    offerStatus: "PENDING",
    expiresInHours: 14,
    negotiationHistory: [
      {
        sender: "BUYER",
        price: 2680,
        note: "We can arrange farm pickup tomorrow morning. Grade A quality assured price.",
        timestamp: "2026-08-27 10:15 AM",
      },
    ],
  },
  {
    id: "offer-2",
    lotId: "lot-1",
    lotCode: "LOT-WHT-2026-8912",
    buyerId: "buyer-reliance",
    buyerName: "Reliance Retail Agri Sourcing",
    buyerRating: 4.9,
    cropName: "Wheat (Sharbati Gold)",
    offeredPrice: 2720,
    quantityQtl: 45,
    totalValue: 122400,
    pickupOrDelivery: "MANDI_DELIVERY",
    paymentTerms: "48-Hour Bank DBT upon Sitapura Hub delivery",
    offerStatus: "COUNTERED",
    expiresInHours: 20,
    negotiationHistory: [
      {
        sender: "BUYER",
        price: 2660,
        note: "Offer for delivery at Sitapura hub.",
        timestamp: "2026-08-26 03:00 PM",
      },
      {
        sender: "FARMER",
        price: 2750,
        note: "Transport cost is ₹70/qtl. Can accept ₹2,750.",
        timestamp: "2026-08-26 05:20 PM",
      },
      {
        sender: "BUYER",
        price: 2720,
        note: "Revised final counter offer ₹2,720/qtl.",
        timestamp: "2026-08-27 09:30 AM",
      },
    ],
  },
];

export const TRANSPORTERS_DATA: Transporter[] = [
  {
    id: "trans-1",
    name: "Kisan Express Rural Logistics",
    driverName: "Sohan Lal Yadav",
    vehicleType: "Tata 407 (3.5 Ton / 35 Qtl)",
    capacityTons: 3.5,
    baseRatePerKm: 28,
    ratePerQtl: 40,
    currentLocation: "Chomu Bypass (4 km away)",
    rating: 4.9,
    phone: "+91 94140 22910",
    verified: true,
  },
  {
    id: "trans-2",
    name: "Rajasthan Agro Freight Carriers",
    driverName: "Mukesh Gurjar",
    vehicleType: "Eicher 14-Ft (7 Ton / 70 Qtl)",
    capacityTons: 7.0,
    baseRatePerKm: 38,
    ratePerQtl: 48,
    currentLocation: "Jaipur Transport Nagar (16 km away)",
    rating: 4.85,
    phone: "+91 98290 88712",
    verified: true,
  },
  {
    id: "trans-3",
    name: "Shekhawati Heavy Agro Transport",
    driverName: "Balveer Singh",
    vehicleType: "Tata 1613 6-Tyre (10 Ton / 100 Qtl)",
    capacityTons: 10.0,
    baseRatePerKm: 48,
    ratePerQtl: 55,
    currentLocation: "Reengus Hub (22 km away)",
    rating: 4.78,
    phone: "+91 94133 44550",
    verified: true,
  },
  {
    id: "trans-4",
    name: "Safal Cold Reefer Fleet",
    driverName: "Dharmendra Saini",
    vehicleType: "Insulated Cold Van (4 Ton)",
    capacityTons: 4.0,
    baseRatePerKm: 42,
    ratePerQtl: 60,
    currentLocation: "VKI Industrial Area, Jaipur (14 km)",
    rating: 4.92,
    phone: "+91 98282 11990",
    verified: true,
  },
];

export const ACTIVE_SHIPMENTS: ShipmentTracker[] = [
  {
    id: "ship-1",
    shipmentCode: "TRK-2026-9041",
    lotCode: "LOT-WHT-2026-8912",
    cropName: "Wheat (Sharbati Gold)",
    quantityQtl: 45,
    transporterName: "Kisan Express Logistics",
    vehicleNumber: "RJ 14 GB 4521",
    driverPhone: "+91 94140 22910",
    status: "IN_TRANSIT",
    from: "Morija Village, Chomu",
    to: "ITC Bindayaka Procurement Hub, Jaipur",
    estimatedArrival: "02:45 PM Today",
    currentMilestoneIndex: 2,
    milestones: [
      { title: "Transport Booked & Driver Assigned", time: "08:30 AM", done: true },
      { title: "Vehicle Arrived at Farm & Produce Loaded", time: "10:15 AM", done: true },
      { title: "In Transit (En route via Jaipur-Sikar Highway)", time: "11:45 AM", done: true },
      { title: "Arrival at Buyer Hub & Weighbridge Check", time: "Est. 01:30 PM", done: false },
      { title: "Assaying, Unloading & Instant Payout Release", time: "Est. 02:45 PM", done: false },
    ],
  },
];

export const WAREHOUSES_DATA: Warehouse[] = [
  {
    id: "wh-1",
    name: "Chomu Central WDRA Grain Warehouse",
    type: "WDRA Accredited Scientific Silo",
    typeHi: "डब्ल्यूडीआरए मान्यता प्राप्त साइंटिफिक गोदाम",
    location: "Sikar Road, Chomu Industrial Area",
    distanceKm: 8,
    totalCapacityBags: 60000,
    availableCapacityBags: 22400,
    ratePerBagPerMonth: 11,
    insuranceCovered: true,
    eNWRSupport: true,
    contact: "+91 1423 228900",
    rating: 4.9,
  },
  {
    id: "wh-2",
    name: "Rajasthan State Warehousing Corp (RSWC) Hub",
    type: "Govt SWC Warehouse",
    typeHi: "राजस्थान राज्य भंडारण निगम (सरकारी गोदाम)",
    location: "Ajmer Road, Jaipur",
    distanceKm: 24,
    totalCapacityBags: 120000,
    availableCapacityBags: 41000,
    ratePerBagPerMonth: 9.5,
    insuranceCovered: true,
    eNWRSupport: true,
    contact: "+91 141 2740200",
    rating: 4.85,
  },
  {
    id: "wh-3",
    name: "Marwar High-Tech Agri Cold Storage",
    type: "Cold Storage for Potato / Onion / Spices",
    typeHi: "आलू, प्याज व मसालों हेतु आधुनिक कोल्ड स्टोरेज",
    location: "VKI Area, Jaipur",
    distanceKm: 16,
    totalCapacityBags: 45000,
    availableCapacityBags: 12800,
    ratePerBagPerMonth: 28,
    insuranceCovered: true,
    eNWRSupport: true,
    contact: "+91 141 2338190",
    rating: 4.92,
  },
  {
    id: "wh-4",
    name: "Shekhawati FPO Village Storage Hub",
    type: "FPO Community Solar Storage",
    typeHi: "एफपीओ सौर ऊर्जा संचालित सामुदायिक भंडार",
    location: "Reengus Village Hub",
    distanceKm: 18,
    totalCapacityBags: 15000,
    availableCapacityBags: 6200,
    ratePerBagPerMonth: 8,
    insuranceCovered: true,
    eNWRSupport: false,
    contact: "+91 98299 44321",
    rating: 4.78,
  },
];

export const TRANSACTIONS_DATA: TransactionRecord[] = [
  {
    id: "txn-1",
    txnCode: "TXN-2026-7841",
    lotCode: "LOT-WHT-2026-8912",
    farmerName: "Rameshwar Gurjar",
    buyerName: "ITC Agri Business Division",
    crop: "Wheat (Sharbati Gold)",
    quantityQtl: 45,
    agreedPricePerQtl: 2680,
    totalAmount: 120600,
    mandiBenchmarkPrice: 2520,
    extraRealization: 7200,
    status: "ESCROW_PAID",
    utrNumber: "YESB000284918239",
    date: "27 Aug 2026",
    timeline: [
      { stage: "Digital Offer Accepted", done: true, time: "26 Aug, 10:30 AM" },
      { stage: "Order Confirmed & Escrow Funded (₹1,20,600)", done: true, time: "26 Aug, 11:00 AM" },
      { stage: "Produce Picked Up from Farm", done: true, time: "27 Aug, 10:15 AM" },
      { stage: "Delivered to ITC Hub", done: true, time: "27 Aug, 01:30 PM" },
      { stage: "Quality Verified (Grade A, Moisture 11.2%)", done: true, time: "27 Aug, 02:00 PM" },
      { stage: "Payment Initiated via Escrow", done: true, time: "27 Aug, 02:15 PM" },
      { stage: "Payment Credited to Farmer Bank Account", done: true, time: "27 Aug, 02:22 PM" },
    ],
  },
  {
    id: "txn-2",
    txnCode: "TXN-2026-6519",
    lotCode: "LOT-MST-2026-3108",
    farmerName: "Kailash Choudhary",
    buyerName: "Adani Wilmar Ltd. (Fortune)",
    crop: "Mustard (Pusa Bold 42%)",
    quantityQtl: 60,
    agreedPricePerQtl: 5920,
    totalAmount: 355200,
    mandiBenchmarkPrice: 5690,
    extraRealization: 13800,
    status: "COMPLETED",
    utrNumber: "HDFC000194827102",
    date: "24 Aug 2026",
    timeline: [
      { stage: "Digital Offer Accepted", done: true, time: "23 Aug, 09:00 AM" },
      { stage: "Order Confirmed & Escrow Funded", done: true, time: "23 Aug, 09:45 AM" },
      { stage: "Produce Picked Up from Farm", done: true, time: "24 Aug, 08:30 AM" },
      { stage: "Delivered & Assayed (42.2% Oil)", done: true, time: "24 Aug, 12:10 PM" },
      { stage: "Full Payment Credited", done: true, time: "24 Aug, 12:45 PM" },
    ],
  },
  {
    id: "txn-3",
    txnCode: "TXN-2026-5190",
    lotCode: "LOT-ONN-2026-1184",
    farmerName: "Mukesh Saini",
    buyerName: "Mother Dairy Safal",
    crop: "Onion (Nashik Red)",
    quantityQtl: 35,
    agreedPricePerQtl: 1920,
    totalAmount: 67200,
    mandiBenchmarkPrice: 1750,
    extraRealization: 5950,
    status: "COMPLETED",
    utrNumber: "SBIN000492817456",
    date: "22 Aug 2026",
    timeline: [
      { stage: "Offer Accepted", done: true, time: "22 Aug, 07:30 AM" },
      { stage: "Pickup & Hub Delivery", done: true, time: "22 Aug, 11:00 AM" },
      { stage: "Quality Verified & UPI Settlement", done: true, time: "22 Aug, 11:35 AM" },
    ],
  },
];

export const GRIEVANCES_DATA: GrievanceCase[] = [
  {
    id: "grv-1",
    grievanceId: "GRV-2026-042",
    lotCode: "LOT-MST-2026-4410",
    complainantName: "Suresh Patel",
    complainantRole: "FARMER",
    againstParty: "Shree Shyam Agro Traders",
    category: "PAYMENT_DELAY",
    categoryHi: "भुगतान में देरी (Payment Delay)",
    title: "Delay in 24h Escrow Release post delivery",
    description:
      "Produce of 30 qtl mustard delivered on 24 Aug. Assaying was Grade A (42% oil), but buyer representative delayed releasing the final settlement OTP.",
    status: "RESOLUTION_PROPOSED",
    statusHi: "समाधान प्रस्तावित (Resolution Proposed)",
    evidenceFiles: ["weighbridge_slip_092.pdf", "lab_quality_cert.jpg"],
    resolutionNote:
      "Platform Dispute Mediator verified weighbridge slip and laboratory assay report. Automatic escrow payout of ₹1,78,500 has been triggered directly to the farmer bank account (YESB...3351) with a ₹500 penalty imposed on the buyer.",
    createdAt: "2026-08-25",
    steps: [
      { stage: "Grievance Submitted with Evidence", done: true, date: "25 Aug, 11:00 AM" },
      { stage: "Assigned to KrishiSetu Dispute Officer", done: true, date: "25 Aug, 02:30 PM" },
      { stage: "Weighbridge & Lab Evidence Verified", done: true, date: "26 Aug, 10:15 AM" },
      { stage: "Resolution Proposed & Escrow Released", done: true, date: "27 Aug, 09:45 AM" },
      { stage: "Farmer Confirmed & Case Closed", done: false, date: "Pending Farmer Acceptance" },
    ],
  },
  {
    id: "grv-2",
    grievanceId: "GRV-2026-039",
    lotCode: "LOT-WHT-2026-7721",
    complainantName: "Vikram Singh",
    complainantRole: "FARMER",
    againstParty: "Apex Logistics Carriers",
    category: "TRANSPORT_DAMAGE",
    categoryHi: "परिवहन में क्षति (Transit Damage)",
    title: "Tarp torn during rain causing 2 bags moisture damage",
    description: "During transit, driver did not secure waterproof tarp properly in sudden drizzle.",
    status: "RESOLVED",
    statusHi: "सफलतापूर्वक हल (Resolved)",
    evidenceFiles: ["damaged_bags_photo.jpg", "consignment_note.pdf"],
    resolutionNote: "Transporter insurance compensated ₹5,400 for damaged bags within 48 hours.",
    createdAt: "2026-08-20",
    steps: [
      { stage: "Grievance Submitted", done: true, date: "20 Aug" },
      { stage: "Evidence Verified", done: true, date: "21 Aug" },
      { stage: "Insurance Claim Settled & Credited", done: true, date: "22 Aug" },
      { stage: "Case Closed", done: true, date: "22 Aug" },
    ],
  },
];

export const FPO_DATA: FPOAggregation[] = [
  {
    id: "fpo-1",
    fpoName: "Shekhawati Kisan Producer Co. Ltd. (FPO)",
    crop: "Wheat (Lokwan / Sharbati)",
    totalAggregatedQtl: 2500, // 250 Tonnes
    memberFarmersCount: 104,
    targetBuyer: "Reliance Retail & ITC Agri Combined Tender",
    offeredPrice: 2740,
    localMandiBenchmark: 2480,
    totalFpoExtraProfit: 650000,
    status: "TENDER_AWARDED",
    members: [
      { farmerName: "Rameshwar Gurjar", village: "Morija", quantityQtl: 45, payout: 123300, status: "DISBURSED" },
      { farmerName: "Ramchandra Sharma", village: "Chomu", quantityQtl: 35, payout: 95900, status: "DISBURSED" },
      { farmerName: "Kailash Choudhary", village: "Hathod", quantityQtl: 60, payout: 164400, status: "PROCESSING" },
      { farmerName: "Mangi Lal Yadav", village: "Kukas", quantityQtl: 50, payout: 137000, status: "PROCESSING" },
      { farmerName: "Sitaram Verma", village: "Bilochi", quantityQtl: 40, payout: 109600, status: "QUEUED" },
      { farmerName: "Bhagirath Jat", village: "Samod", quantityQtl: 55, payout: 150700, status: "QUEUED" },
      { farmerName: "Gopal Saini", village: "Achrol", quantityQtl: 30, payout: 82200, status: "QUEUED" },
    ],
  },
  {
    id: "fpo-2",
    fpoName: "Malwa Bio-Agri Farmers Producer Collective",
    crop: "Mustard (Pusa Bold 42% Oil)",
    totalAggregatedQtl: 1800, // 180 Tonnes
    memberFarmersCount: 78,
    targetBuyer: "Adani Wilmar Fortune Bulk Tender",
    offeredPrice: 5980,
    localMandiBenchmark: 5680,
    totalFpoExtraProfit: 540000,
    status: "OPEN_AGGREGATION",
    members: [
      { farmerName: "Devendra Patel", village: "Neemuch", quantityQtl: 45, payout: 269100, status: "PLEDGED" },
      { farmerName: "Radheshyam Jat", village: "Mandsaur", quantityQtl: 50, payout: 299000, status: "PLEDGED" },
      { farmerName: "Om Prakash Sharma", village: "Jawad", quantityQtl: 35, payout: 209300, status: "PLEDGED" },
    ],
  },
];
