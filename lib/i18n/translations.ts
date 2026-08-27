// Multilingual Translations Schema & Dictionaries for KrishiSetu (12 Indian Languages)

export interface TranslationSchema {
  // Brand & Navigation
  brandName: string;
  brandTagline: string;
  navHome: string;
  navPrices: string;
  navBuyers: string;
  navMyCrops: string;
  navOffers: string;
  navTransactions: string;
  navStorage: string;
  navTransport: string;
  navQuality: string;
  navDisputes: string;
  navFPO: string;
  navAssistant: string;
  navTransparency: string;
  navAdmin: string;
  selectLanguage: string;
  callHelpline: string;
  kisanCallCenter: string;
  voiceSearch: string;
  switchRole: string;
  roleFarmer: string;
  roleFPO: string;
  roleBuyer: string;
  roleTransporter: string;
  roleWarehouse: string;
  roleInspector: string;
  roleAdmin: string;

  // Hero & Homepage
  heroTitle: string;
  heroSubtitle: string;
  heroSearchPlaceholder: string;
  heroVoiceBtn: string;
  heroQuickCropPrices: string;
  statVolume: string;
  statFarmers: string;
  statExtraGain: string;
  statZeroCommission: string;
  tilePricesTitle: string;
  tilePricesDesc: string;
  tileBuyersTitle: string;
  tileBuyersDesc: string;
  tileSellCropTitle: string;
  tileSellCropDesc: string;
  tileQualityTitle: string;
  tileQualityDesc: string;
  tileStorageTitle: string;
  tileStorageDesc: string;
  tileTransportTitle: string;
  tileTransportDesc: string;
  tileFpoTitle: string;
  tileFpoDesc: string;
  tileAssistantTitle: string;
  tileAssistantDesc: string;

  // Today's Mandi Prices
  todayMandiPrices: string;
  compareMarkets: string;
  minPrice: string;
  maxPrice: string;
  modalPrice: string;
  arrivalVolume: string;
  distanceFromFarmer: string;
  priceTrend: string;
  filterByCrop: string;
  filterByState: string;
  allCrops: string;
  allStates: string;
  aiPriceIntelligence: string;
  sevenDayTrend: string;
  thirtyDayTrend: string;
  demandLevel: string;
  aiRecommendationTitle: string;
  recSellNow: string;
  recWaitDays: string;
  recConsiderNearby: string;
  recConsiderStorage: string;
  aiEstimatesDisclaimer: string;
  compareMandisTitle: string;
  netInHandRealization: string;
  freightDeduction: string;

  // Verified Buyers & Matching
  verifiedBuyerMarketplace: string;
  verifiedBadge: string;
  categoryFilter: string;
  minRating: string;
  paymentTermsFilter: string;
  bestMatchesForYou: string;
  matchScore: string;
  cropRequired: string;
  quantityRequired: string;
  priceOffered: string;
  viewProfile: string;
  sendLot: string;
  requestQuote: string;
  disputeRate: string;
  completedTrades: string;
  escrowProtected: string;

  // Digital Lot Creation & My Crops
  createDigitalLot: string;
  lotCode: string;
  cropVariety: string;
  quantityQtl: string;
  harvestDate: string;
  expectedSellingDate: string;
  moisturePercent: string;
  qualityGrade: string;
  foreignMatter: string;
  brokenGrain: string;
  expectedPrice: string;
  minReservePrice: string;
  certifications: string;
  uploadPhotos: string;
  uploadVideos: string;
  submitLot: string;
  lotCreatedSuccess: string;
  viewQRCode: string;
  activeLots: string;
  offersReceived: string;

  // Digital Quality Grading
  digitalQualityGrading: string;
  aiGrainScanner: string;
  uploadGrainPhoto: string;
  scanProduce: string;
  preliminaryQualityReport: string;
  gradeA: string;
  gradeB: string;
  gradeC: string;
  moistureScore: string;
  purityScore: string;
  bookAssayer: string;
  gradingDisclaimer: string;

  // Offers & Negotiation
  digitalOffersTitle: string;
  offerDetails: string;
  offeredPrice: string;
  counterOffer: string;
  acceptOffer: string;
  rejectOffer: string;
  makeCounterOffer: string;
  enterCounterPrice: string;
  counterNote: string;
  negotiationHistory: string;
  offerAcceptedSuccess: string;
  offerCounteredSuccess: string;

  // Logistics & Transport
  logisticsTitle: string;
  bookTransport: string;
  truckType: string;
  capacity: string;
  ratePerKm: string;
  estimatedFreight: string;
  trackShipmentTitle: string;
  liveMilestones: string;
  driverDetails: string;
  currentLocation: string;

  // Storage & Warehouse (Sell vs Store)
  storageTitle: string;
  nearbyWarehouses: string;
  wdraAccredited: string;
  availableCapacity: string;
  ratePerMonth: string;
  pledgeLoanEligible: string;
  sellVsStoreCalculator: string;
  currentPrice: string;
  futureProjectedPrice: string;
  storageCost: string;
  projectedGain: string;
  storeRecommendation: string;

  // Transparent Payments
  transparentPaymentsTitle: string;
  transactionTimeline: string;
  offerAcceptedStage: string;
  orderConfirmedStage: string;
  pickedUpStage: string;
  deliveredStage: string;
  qualityVerifiedStage: string;
  paymentInitiatedStage: string;
  paymentReceivedStage: string;
  utrNumber: string;
  downloadReceipt: string;

  // Disputes & Grievances
  disputesTitle: string;
  raiseGrievance: string;
  grievanceId: string;
  complaintCategory: string;
  paymentDelay: string;
  qualityDispute: string;
  quantityMismatch: string;
  transportDamage: string;
  contractViolation: string;
  evidenceUpload: string;
  grievanceStatus: string;
  underReview: string;
  resolutionProposed: string;
  caseResolved: string;

  // FPO Aggregation
  fpoTitle: string;
  aggregateProduce: string;
  memberFarmersCount: string;
  totalBulkLot: string;
  bulkBuyersTender: string;
  fpoProfitBoost: string;
  disbursePayouts: string;

  // AI Assistant
  aiAssistantTitle: string;
  voiceAssistantSubtitle: string;
  askVoiceQuery: string;
  listeningVoice: string;
  speakAnswer: string;
  voiceSuggestions: string;

  // Notifications
  notificationsTitle: string;
  markAllRead: string;
  priceAlerts: string;
  buyerDemandAlerts: string;
  paymentAlerts: string;

  // Admin
  adminTitle: string;
  totalTradingVolume: string;
  kycApprovals: string;
  manageMandis: string;
  moderateDisputes: string;
  verifyBuyer: string;
}

// -------------------------------------------------------------
// 1. HINDI (हिन्दी)
// -------------------------------------------------------------
const hi: TranslationSchema = {
  brandName: "कृषिसेतु",
  brandTagline: "स्मार्ट मंडी भाव, सत्यापित खरीदार एवं निष्पक्ष सौदा",
  navHome: "होम",
  navPrices: "मंडी भाव",
  navBuyers: "सत्यापित खरीदार",
  navMyCrops: "मेरी फसल / लॉट",
  navOffers: "सौदा व मोलभाव",
  navTransactions: "भुगतान व रसीदें",
  navStorage: "गोदाम एवं कोल्ड स्टोरेज",
  navTransport: "परिवहन व ट्रैकिंग",
  navQuality: "AI गुणवत्ता जांच",
  navDisputes: "शिकायत व निवारण",
  navFPO: "एफपीओ हब",
  navAssistant: "AI कृषि मित्र",
  navTransparency: "पारदर्शिता लेजर",
  navAdmin: "व्यवस्थापक (Admin)",
  selectLanguage: "भाषा चुनें",
  callHelpline: "किसान हेल्पलाइन",
  kisanCallCenter: "टोल फ्री 1800-180-1551",
  voiceSearch: "बोलकर खोजें...",
  switchRole: "भूमिका बदलें",
  roleFarmer: "👨🌾 किसान (Farmer)",
  roleFPO: "👥 एफपीओ (FPO)",
  roleBuyer: "🏭 सत्यापित खरीदार (Buyer)",
  roleTransporter: "🚚 ट्रांसपोर्टर (Logistics)",
  roleWarehouse: "🏬 गोदाम संचालक (Warehouse)",
  roleInspector: "🔬 गुणवत्ता परीक्षक (Assayer)",
  roleAdmin: "👨💼 एडमिन (Admin)",

  heroTitle: "आज आपकी फसल का क्या भाव है?",
  heroSubtitle: "निकटवर्ती मंडियों के भाव तुलना करें, 100+ बड़े सत्यापित खरीदारों से सीधे जुड़ें एवं 24 घंटे में एस्क्रो सुरक्षित भुगतान पाएं।",
  heroSearchPlaceholder: "फसल खोजें (जैसे गेहूं, सरसों, सोयाबीन, कपास, प्याज)...",
  heroVoiceBtn: "बोलकर पूछें",
  heroQuickCropPrices: "आज के प्रमुख मंडी भाव",
  statVolume: "₹48.6 करोड़ कुल व्यापार",
  statFarmers: "18,400+ सत्यापित किसान व एफपीओ",
  statExtraGain: "+11.4% अधिक मूल्य प्राप्ति",
  statZeroCommission: "0% बिचौलिया कमीशन",
  tilePricesTitle: "मंडी भाव व AI भविष्यवाणी",
  tilePricesDesc: "आस-पास की मंडियों के ताजा भाव, आवक और 7-दिन का सटीक AI अनुमान।",
  tileBuyersTitle: "सत्यापित खरीदार मार्केट",
  tileBuyersDesc: "ITC, रिलायंस, अडानी, पतंजलि जैसे बड़े खरीदारों को अपनी फसल बेचें।",
  tileSellCropTitle: "डिजिटल लॉट बनाएं",
  tileSellCropDesc: "अपनी फसल का फोटो-वीडियो अपलोड कर डिजिटल लॉट बनाएं और QR कोड पाएं।",
  tileQualityTitle: "AI क्वालिटी स्कैनर",
  tileQualityDesc: "मोबाइल फोटो से नमी, दाने का आकार व ग्रेड A/B की प्रारंभिक जांच करें।",
  tileStorageTitle: "गोदाम खोजें व ROI कैलकुलेटर",
  tileStorageDesc: "आज बेचें या गोदाम में रखकर बाद में बेचें? लाभ-हानि का सीधा हिसाब।",
  tileTransportTitle: "वाहन बुक करें व लाइव ट्रैक",
  tileTransportDesc: "छोटा हाथी से लेकर 14-फीट ट्रक तुरंत बुक करें और जीपीएस से ट्रैक करें।",
  tileFpoTitle: "FPO थोक एग्रीगेशन",
  tileFpoDesc: "100 किसानों की उपज जोड़कर 250 टन का बल्क लॉट बनाएं और उच्चतम दर पाएं।",
  tileAssistantTitle: "आवाज से पूछें (AI असिस्टेंट)",
  tileAssistantDesc: "अपनी भाषा में बोलें: 'मेरे गेहूं का आज का भाव क्या है?' और तुरंत जवाब पाएं।",

  todayMandiPrices: "आज के मंडी भाव",
  compareMarkets: "मंडियों की तुलना करें",
  minPrice: "न्यूनतम",
  maxPrice: "अधिकतम",
  modalPrice: "मॉडल भाव",
  arrivalVolume: "आज की आवक (क्विंटल)",
  distanceFromFarmer: "दूरी",
  priceTrend: "भाव रुझान",
  filterByCrop: "फसल चुनें",
  filterByState: "राज्य चुनें",
  allCrops: "सभी फसलें",
  allStates: "सभी राज्य",
  aiPriceIntelligence: "AI मूल्य सूझबूझ व सलाह",
  sevenDayTrend: "7 दिन का बदलाव",
  thirtyDayTrend: "30 दिन का बदलाव",
  demandLevel: "खरीदार मांग",
  aiRecommendationTitle: "AI स्पष्ट अनुशंसा",
  recSellNow: "तुरंत बेचें (Sell Now)",
  recWaitDays: "5-7 दिन रुकें (Wait 5-7 Days)",
  recConsiderNearby: "पास की मंडी में बेचें (Consider Nearby Market)",
  recConsiderStorage: "गोदाम में रखें (Consider Storage)",
  aiEstimatesDisclaimer: "* AI अनुमान ऐतिहासिक आंकड़ों व बाजार मांग पर आधारित हैं, यह गारंटीकृत मूल्य नहीं है।",
  compareMandisTitle: "मंडियों का वास्तविक मुनाफा तुलना",
  netInHandRealization: "हाथ में शुद्ध मुनाफा",
  freightDeduction: "परिवहन खर्च कटौती",

  verifiedBuyerMarketplace: "सत्यापित खरीदार मार्केटप्लेस",
  verifiedBadge: "सत्यापित खरीदार (Verified Buyer)",
  categoryFilter: "खरीदार श्रेणी",
  minRating: "न्यूनतम रेटिंग",
  paymentTermsFilter: "भुगतान शर्तें",
  bestMatchesForYou: "आपके लिए सर्वश्रेष्ठ AI मैच",
  matchScore: "मैच प्रतिशत",
  cropRequired: "मांग",
  quantityRequired: "आवश्यक मात्रा",
  priceOffered: "प्रस्तावित भाव",
  viewProfile: "प्रोफ़ाइल देखें",
  sendLot: "लॉट भेजें",
  requestQuote: "भाव मांगें",
  disputeRate: "विवाद दर",
  completedTrades: "सफल सौदे",
  escrowProtected: "एस्क्रो सुरक्षित",

  createDigitalLot: "नया डिजिटल लॉट बनाएं",
  lotCode: "लॉट आईडी",
  cropVariety: "फसल एवं किस्म",
  quantityQtl: "मात्रा (क्विंटल में)",
  harvestDate: "कटाई की तिथि",
  expectedSellingDate: "विक्रय की अनुमानित तिथि",
  moisturePercent: "नमी (%)",
  qualityGrade: "गुणवत्ता ग्रेड",
  foreignMatter: "कचरा / फॉरेन मैटर (%)",
  brokenGrain: "टूटा दाना (%)",
  expectedPrice: "अपेक्षित भाव (₹/क्विंटल)",
  minReservePrice: "न्यूनतम स्वीकार्य भाव (₹)",
  certifications: "प्रमाणपत्र / जैविक विवरण",
  uploadPhotos: "फसल के फोटो अपलोड करें",
  uploadVideos: "वीडियो (वैकल्पिक)",
  submitLot: "लॉट प्रकाशित करें",
  lotCreatedSuccess: "डिजिटल लॉट सफलतापूर्वक बनाया गया!",
  viewQRCode: "QR कोड देखें",
  activeLots: "सक्रिय लॉट्स",
  offersReceived: "प्राप्त प्रस्ताव",

  digitalQualityGrading: "डिजिटल गुणवत्ता ग्रेडिंग",
  aiGrainScanner: "AI कैमरा ग्रेन स्कैनर",
  uploadGrainPhoto: "अनाज/फसल का स्पष्ट फोटो अपलोड करें",
  scanProduce: "AI से जांच करें",
  preliminaryQualityReport: "प्रारंभिक गुणवत्ता रिपोर्ट",
  gradeA: "ग्रेड A (प्रीमियम गुणवत्ता)",
  gradeB: "ग्रेड B (एफएक्यू मानक)",
  gradeC: "ग्रेड C (औसत गुणवत्ता)",
  moistureScore: "अनुमानित नमी",
  purityScore: "शुद्धता स्कोर",
  bookAssayer: "भौतिक लैब जांच बुक करें",
  gradingDisclaimer: "यह AI आधारित प्रारंभिक अनुमान है। अंतिम ग्रेडिंग अधिकृत लैब या मंडी में मान्य होगी।",

  digitalOffersTitle: "डिजिटल ऑफर्स व मोलभाव कक्ष",
  offerDetails: "प्रस्ताव विवरण",
  offeredPrice: "प्रस्तावित मूल्य",
  counterOffer: "काउंटर ऑफर दें",
  acceptOffer: "सौदा स्वीकार करें",
  rejectOffer: "अस्वीकार करें",
  makeCounterOffer: "नया भाव प्रस्ताव भेजें",
  enterCounterPrice: "अपना काउंटर भाव (₹/क्विंटल)",
  counterNote: "खरीदार को संदेश (जैसे: 'खेत से उठाव आवश्यक है')",
  negotiationHistory: "बातचीत व मोलभाव इतिहास",
  offerAcceptedSuccess: "सौदा स्वीकार कर लिया गया! एस्क्रो सुरक्षित ऑर्डर बन चुका है।",
  offerCounteredSuccess: "काउंटर ऑफर खरीदार को भेज दिया गया है।",

  logisticsTitle: "परिवहन व्यवस्था व बुकिंग",
  bookTransport: "वाहन बुक करें",
  truckType: "वाहन प्रकार",
  capacity: "क्षमता",
  ratePerKm: "किमी दर",
  estimatedFreight: "अनुमानित भाड़ा",
  trackShipmentTitle: "लाइव खेप ट्रैकिंग (GPS)",
  liveMilestones: "सफर के चरण",
  driverDetails: "चालक विवरण",
  currentLocation: "वर्तमान स्थिति",

  storageTitle: "गोदाम व कोल्ड स्टोरेज खोज",
  nearbyWarehouses: "आसपास के वैज्ञानिक गोदाम",
  wdraAccredited: "WDRA मान्यता प्राप्त (e-NWR रसीद पर 75% ऋण उपलब्ध)",
  availableCapacity: "उपलब्ध क्षमता",
  ratePerMonth: "किराया / बोरी / माह",
  pledgeLoanEligible: "ऋण सुविधा योग्य",
  sellVsStoreCalculator: "कैलकुलेटर: आज बेचें बनाम स्टोर कर बाद में बेचें",
  currentPrice: "आज का मंडी भाव",
  futureProjectedPrice: "अनुमानित भावी भाव",
  storageCost: "कुल स्टोरेज व ब्याज खर्च",
  projectedGain: "स्टोर करने पर शुद्ध अतिरिक्त मुनाफा",
  storeRecommendation: "कैलकुलेटर अनुशंसा",

  transparentPaymentsTitle: "पारदर्शी 7-चरणीय भुगतान ट्रैकर",
  transactionTimeline: "लेनदेन प्रगति समयरेखा",
  offerAcceptedStage: "1. ऑफर स्वीकार हुआ",
  orderConfirmedStage: "2. एस्क्रो में राशि जमा",
  pickedUpStage: "3. खेत से फसल रवाना",
  deliveredStage: "4. खरीदार हब पर डिलीवरी",
  qualityVerifiedStage: "5. गुणवत्ता सत्यापन पूर्ण",
  paymentInitiatedStage: "6. भुगतान जारी किया गया",
  paymentReceivedStage: "7. किसान के खाते में जमा",
  utrNumber: "बैंक UTR संदर्भ संख्या",
  downloadReceipt: "सौदा रसीद डाउनलोड करें",

  disputesTitle: "विवाद व शिकायत निवारण प्रणाली",
  raiseGrievance: "नई शिकायत दर्ज करें",
  grievanceId: "शिकायत आईडी",
  complaintCategory: "शिकायत का विषय",
  paymentDelay: "भुगतान में विलंब",
  qualityDispute: "गुणवत्ता पर विवाद",
  quantityMismatch: "वजन में अंतर",
  transportDamage: "परिवहन में नुकसान",
  contractViolation: "अनुबंध का उल्लंघन",
  evidenceUpload: "सबूत अपलोड करें (कांटा पर्ची / रसीद / फोटो)",
  grievanceStatus: "शिकायत की स्थिति",
  underReview: "अधिकारी द्वारा समीक्षा जारी",
  resolutionProposed: "समाधान प्रस्तावित",
  caseResolved: "शिकायत का पूर्ण निवारण",

  fpoTitle: "एफपीओ (FPO) थोक एग्रीगेशन पोर्टल",
  aggregateProduce: "सदस्य किसानों की उपज जोड़ें",
  memberFarmersCount: "कुल जुड़े किसान",
  totalBulkLot: "कुल थोक लॉट मात्रा",
  bulkBuyersTender: "संस्थागत खरीदार टेंडर",
  fpoProfitBoost: "थोक बिक्री से अतिरिक्त मुनाफा",
  disbursePayouts: "किसानों को भुगतान वितरण",

  aiAssistantTitle: "बहुभाषी AI कृषि व मंडी मित्र",
  voiceAssistantSubtitle: "अपनी बोली में पूछें या टाइप करें - मंडी भाव, खरीदार, स्टोरेज व गुणवत्ता से जुड़े सवाल",
  askVoiceQuery: "माइक दबाकर बोलें",
  listeningVoice: "सुन रहे हैं... बोलिए",
  speakAnswer: "आवाज में सुनें",
  voiceSuggestions: "किसान अक्सर ये पूछते हैं:",

  notificationsTitle: "स्मार्ट मंडी सूचनाएं",
  markAllRead: "सभी पढ़ी हुई मार्क करें",
  priceAlerts: "भाव उछाल सूचनाएं",
  buyerDemandAlerts: "खरीदार मांग अलर्ट",
  paymentAlerts: "भुगतान सूचनाएं",

  adminTitle: "कृषिसेतु मास्टर एडमिन कंसोल",
  totalTradingVolume: "कुल व्यापार मूल्य",
  kycApprovals: "खरीदार व ट्रांसपोर्टर KYC सत्यापन",
  manageMandis: "मंडी भाव प्रबंधन",
  moderateDisputes: "विवाद मध्यस्थता",
  verifyBuyer: "सत्यापित करें",
};

// -------------------------------------------------------------
// 2. ENGLISH
// -------------------------------------------------------------
const en: TranslationSchema = {
  brandName: "KrishiSetu",
  brandTagline: "Smart Mandi Intelligence, Verified Buyers & Fair Transactions",
  navHome: "Home",
  navPrices: "Mandi Prices",
  navBuyers: "Verified Buyers",
  navMyCrops: "My Crops / Lots",
  navOffers: "Offers & Negotiation",
  navTransactions: "Payments & Ledger",
  navStorage: "Warehouses & Storage",
  navTransport: "Logistics & Fleet",
  navQuality: "AI Quality Scan",
  navDisputes: "Dispute Redressal",
  navFPO: "FPO Hub",
  navAssistant: "AI Market Assistant",
  navTransparency: "Transparency Ledger",
  navAdmin: "Admin Console",
  selectLanguage: "Select Language",
  callHelpline: "Kisan Helpline",
  kisanCallCenter: "Toll Free 1800-180-1551",
  voiceSearch: "Speak to search...",
  switchRole: "Switch Role",
  roleFarmer: "👨🌾 Farmer",
  roleFPO: "👥 FPO Leader",
  roleBuyer: "🏭 Verified Buyer",
  roleTransporter: "🚚 Logistics Provider",
  roleWarehouse: "🏬 Warehouse Operator",
  roleInspector: "🔬 Quality Assayer",
  roleAdmin: "👨💼 Platform Admin",

  heroTitle: "What is your crop's market price today?",
  heroSubtitle: "Compare nearby mandis, connect with 100+ verified corporate & institutional buyers, and get guaranteed 24-hour escrow-backed payments.",
  heroSearchPlaceholder: "Search crops (e.g. Wheat, Mustard, Soybean, Cotton, Onion)...",
  heroVoiceBtn: "Voice Search",
  heroQuickCropPrices: "Today's Benchmark Mandi Rates",
  statVolume: "₹48.6 Cr Traded",
  statFarmers: "18,400+ Farmers & FPOs",
  statExtraGain: "+11.4% Better Realization",
  statZeroCommission: "0% Middleman Cut",
  tilePricesTitle: "Mandi Rates & AI Forecast",
  tilePricesDesc: "Live nearby mandi modal prices, arrival volumes, and 7-day AI forecasts.",
  tileBuyersTitle: "Verified Buyers Marketplace",
  tileBuyersDesc: "Directly sell produce to ITC, Reliance Retail, Adani Wilmar, Patanjali.",
  tileSellCropTitle: "Create Digital Lots",
  tileSellCropDesc: "List harvest with photos, moisture %, reserve price, and get digital QR passport.",
  tileQualityTitle: "AI Quality Scanner",
  tileQualityDesc: "Scan grain photos to get instant preliminary Grade A/B/C and moisture analysis.",
  tileStorageTitle: "Warehouse & ROI Calculator",
  tileStorageDesc: "Sell Now vs Store & Sell Later calculator factoring in WDRA warehouse fees.",
  tileTransportTitle: "Book Transport & Live GPS",
  tileTransportDesc: "Book Tata Ace to 14ft trucks with transparent ₹/km rates and live tracking.",
  tileFpoTitle: "FPO Bulk Aggregation",
  tileFpoDesc: "Aggregate 100 farmers' output into 250-tonne bulk commercial lots for top pricing.",
  tileAssistantTitle: "Voice AI Agricultural Assistant",
  tileAssistantDesc: "Ask naturally in your language: 'What is today's wheat price?' and get voice answers.",

  todayMandiPrices: "Today's Mandi Prices",
  compareMarkets: "Compare Markets Side-by-Side",
  minPrice: "Min Price",
  maxPrice: "Max Price",
  modalPrice: "Modal Price",
  arrivalVolume: "Today's Arrivals (Qtl)",
  distanceFromFarmer: "Distance",
  priceTrend: "Price Trend",
  filterByCrop: "Filter by Crop",
  filterByState: "Filter by State",
  allCrops: "All Crops",
  allStates: "All States",
  aiPriceIntelligence: "AI Price Intelligence & Recommendations",
  sevenDayTrend: "7-Day Trend",
  thirtyDayTrend: "30-Day Trend",
  demandLevel: "Buyer Demand",
  aiRecommendationTitle: "Actionable AI Recommendation",
  recSellNow: "Sell Now",
  recWaitDays: "Wait 5–7 Days",
  recConsiderNearby: "Consider Nearby Market",
  recConsiderStorage: "Consider Storage",
  aiEstimatesDisclaimer: "* AI predictions are indicative estimates based on arrivals and historical patterns, not guaranteed prices.",
  compareMandisTitle: "Net Realization Mandi Comparison",
  netInHandRealization: "Net In-Hand Realization",
  freightDeduction: "Freight Cost Deduction",

  verifiedBuyerMarketplace: "Verified Buyer Marketplace",
  verifiedBadge: "Verified Buyer",
  categoryFilter: "Buyer Category",
  minRating: "Minimum Rating",
  paymentTermsFilter: "Payment Terms",
  bestMatchesForYou: "Best AI Matches For You",
  matchScore: "Match Score",
  cropRequired: "Crop Demanded",
  quantityRequired: "Required Quantity",
  priceOffered: "Offered Price",
  viewProfile: "View Profile",
  sendLot: "Send Lot",
  requestQuote: "Request Quote",
  disputeRate: "Dispute Rate",
  completedTrades: "Completed Trades",
  escrowProtected: "Escrow Protected",

  createDigitalLot: "Create New Digital Lot",
  lotCode: "Lot ID",
  cropVariety: "Crop & Variety",
  quantityQtl: "Quantity (Quintals)",
  harvestDate: "Harvest Date",
  expectedSellingDate: "Expected Selling Date",
  moisturePercent: "Moisture (%)",
  qualityGrade: "Quality Grade",
  foreignMatter: "Foreign Matter (%)",
  brokenGrain: "Broken Grains (%)",
  expectedPrice: "Target Price (₹/Qtl)",
  minReservePrice: "Minimum Reserve Price (₹)",
  certifications: "Certifications / Organic Info",
  uploadPhotos: "Upload Produce Photos",
  uploadVideos: "Upload Video (Optional)",
  submitLot: "Publish Digital Lot",
  lotCreatedSuccess: "Digital Lot Created Successfully!",
  viewQRCode: "View QR Passport",
  activeLots: "Active Lots",
  offersReceived: "Offers Received",

  digitalQualityGrading: "Digital Quality Grading",
  aiGrainScanner: "AI Camera Grain Scanner",
  uploadGrainPhoto: "Upload High-Resolution Grain Photo",
  scanProduce: "Run AI Analysis",
  preliminaryQualityReport: "Preliminary Quality Report",
  gradeA: "Grade A (Premium Quality)",
  gradeB: "Grade B (FAQ Standard)",
  gradeC: "Grade C (Average Quality)",
  moistureScore: "Estimated Moisture",
  purityScore: "Purity Index",
  bookAssayer: "Book On-Farm Assaying Lab",
  gradingDisclaimer: "Preliminary AI estimate. Official certification provided at accredited assaying centers.",

  digitalOffersTitle: "Digital Offers & Live Negotiation Room",
  offerDetails: "Offer Specifications",
  offeredPrice: "Offered Price",
  counterOffer: "Counter Offer",
  acceptOffer: "Accept Offer",
  rejectOffer: "Decline Offer",
  makeCounterOffer: "Submit Counter Offer",
  enterCounterPrice: "Your Counter Price (₹/Qtl)",
  counterNote: "Note to Buyer (e.g. 'Farm pickup required')",
  negotiationHistory: "Negotiation Audit Trail",
  offerAcceptedSuccess: "Offer accepted! Escrow funded order generated.",
  offerCounteredSuccess: "Counter offer transmitted to buyer.",

  logisticsTitle: "Logistics Coordination & Fleet",
  bookTransport: "Book Transport Vehicle",
  truckType: "Vehicle Type",
  capacity: "Capacity",
  ratePerKm: "Rate / Km",
  estimatedFreight: "Estimated Freight",
  trackShipmentTitle: "Live Shipment GPS Tracker",
  liveMilestones: "Journey Milestones",
  driverDetails: "Driver Details",
  currentLocation: "Current Waypoint",

  storageTitle: "Warehouse & Cold Storage Discovery",
  nearbyWarehouses: "Nearby Scientific Warehouses",
  wdraAccredited: "WDRA Accredited (75% Pledge Loan via e-NWR)",
  availableCapacity: "Available Capacity",
  ratePerMonth: "Rate / Bag / Month",
  pledgeLoanEligible: "Pledge Loan Eligible",
  sellVsStoreCalculator: "ROI Calculator: Sell Now vs Store & Sell Later",
  currentPrice: "Current Mandi Price",
  futureProjectedPrice: "Future Projected Price",
  storageCost: "Total Storage & Interest Cost",
  projectedGain: "Net Added Profit by Storing",
  storeRecommendation: "Engine Recommendation",

  transparentPaymentsTitle: "Transparent 7-Stage Payment Tracker",
  transactionTimeline: "Transaction Progression Timeline",
  offerAcceptedStage: "1. Offer Accepted",
  orderConfirmedStage: "2. Escrow Funded",
  pickedUpStage: "3. Produce Dispatched",
  deliveredStage: "4. Delivered at Hub",
  qualityVerifiedStage: "5. Quality Assayed",
  paymentInitiatedStage: "6. Payment Initiated",
  paymentReceivedStage: "7. Credited to Farmer",
  utrNumber: "Bank UTR Ref No.",
  downloadReceipt: "Download Trade Invoice",

  disputesTitle: "Dispute & Grievance Redressal",
  raiseGrievance: "File New Grievance",
  grievanceId: "Grievance ID",
  complaintCategory: "Grievance Category",
  paymentDelay: "Payment Settlement Delay",
  qualityDispute: "Quality Downgrade Dispute",
  quantityMismatch: "Weighbridge Discrepancy",
  transportDamage: "In-Transit Damage",
  contractViolation: "Breach of Agreement",
  evidenceUpload: "Upload Evidence (Weighbridge slip, Photos, Lab Cert)",
  grievanceStatus: "Resolution Status",
  underReview: "Under Review by Platform Officer",
  resolutionProposed: "Resolution Proposed",
  caseResolved: "Dispute Resolved & Closed",

  fpoTitle: "FPO Commercial Aggregation Portal",
  aggregateProduce: "Aggregate Member Harvests",
  memberFarmersCount: "Member Farmers",
  totalBulkLot: "Total Bulk Lot Volume",
  bulkBuyersTender: "Institutional Buyer Tenders",
  fpoProfitBoost: "Bulk Collective Profit Margin",
  disbursePayouts: "Disburse Member Payouts",

  aiAssistantTitle: "Multilingual AI Agricultural Market Assistant",
  voiceAssistantSubtitle: "Speak or type in your language — ask about mandi rates, buyer quotes, storage gains, or crop quality standards",
  askVoiceQuery: "Tap Mic to Speak",
  listeningVoice: "Listening... speak now",
  speakAnswer: "Read Aloud",
  voiceSuggestions: "Common Farmer Voice Queries:",

  notificationsTitle: "Smart Market Alerts",
  markAllRead: "Mark All Read",
  priceAlerts: "Price Surge Alerts",
  buyerDemandAlerts: "Buyer Demand Alerts",
  paymentAlerts: "Payment Alerts",

  adminTitle: "KrishiSetu Master Ecosystem Console",
  totalTradingVolume: "Gross Traded Volume",
  kycApprovals: "Buyer & Logistics KYC Approvals",
  manageMandis: "Mandi Price Feeds",
  moderateDisputes: "Dispute Mediation Console",
  verifyBuyer: "Verify Entity",
};

// -------------------------------------------------------------
// 3. RAJASTHANI (राजस्थानी)
// -------------------------------------------------------------
const raj: TranslationSchema = {
  ...hi,
  brandTagline: "म्हारा किसान भाईयां रो चोखो भाव अर सच्चा खरीददार",
  navHome: "घर (होम)",
  navPrices: "मंडी रो भाव",
  navBuyers: "सच्चा खरीददार",
  navMyCrops: "म्हारी फसल",
  navOffers: "सौदा अर मोलभाव",
  heroTitle: "आज आपरी फसल रो कांई भाव है?",
  heroSubtitle: "आस-पास री मंडियां रा भाव जाचो, बड़ा खरीददारां ने सीधी फसल बेचो अर 24 घंटा में बैंक में पूरा रुपिया पाओ।",
  heroSearchPlaceholder: "फसल रो नाम लिखो (गेहूं, सरसों, चना, ग्वार)...",
  heroVoiceBtn: "बोल’र पूछो",
  todayMandiPrices: "आज रा मंडी भाव",
  recSellNow: "अबे ही बेच दो (Sell Now)",
  recWaitDays: "5-7 दिन रुको (Wait 5-7 Days)",
  recConsiderNearby: "पास री मंडी में ले जाओ",
  recConsiderStorage: "गोदाम में रखो",
  voiceSuggestions: "किसान भाई आ बात घणी पूछे:",
};

// -------------------------------------------------------------
// 4. PUNJABI (ਪੰਜਾਬੀ)
// -------------------------------------------------------------
const pa: TranslationSchema = {
  ...en,
  brandName: "ਕ੍ਰਿਸ਼ੀਸੇਤੂ",
  brandTagline: "ਸਮਾਰਟ ਮੰਡੀ ਭਾਅ, ਪ੍ਰਮਾਣਿਤ ਖਰੀਦਦਾਰ ਅਤੇ ਪਾਰਦਰਸ਼ੀ ਵਪਾਰ",
  navHome: "ਮੁੱਖ ਪੰਨਾ",
  navPrices: "ਮੰਡੀ ਦੇ ਭਾਅ",
  navBuyers: "ਪ੍ਰਮਾਣਿਤ ਖਰੀਦਦਾਰ",
  navMyCrops: "ਮੇਰੀ ਫ਼ਸਲ",
  navOffers: "ਸੌਦਾ ਤੇ ਗੱਲਬਾਤ",
  navTransactions: "ਭੁਗਤਾਨ ਤੇ ਰਸੀਦਾਂ",
  navStorage: "ਗੁਦਾਮ ਅਤੇ ਸਟੋਰੇਜ",
  navTransport: "ਟਰਾਂਸਪੋਰਟ",
  navQuality: "AI ਕੁਆਲਿਟੀ ਜਾਂਚ",
  navDisputes: "ਸ਼ਿਕਾਇਤ ਨਿਵਾਰਨ",
  navFPO: "FPO ਹੱਬ",
  navAssistant: "AI ਖੇਤੀ ਸਹਾਇਕ",
  heroTitle: "ਅੱਜ ਤੁਹਾਡੀ ਫ਼ਸਲ ਦਾ ਕੀ ਭਾਅ ਹੈ?",
  heroSubtitle: "ਨੇੜਲੀਆਂ ਮੰਡੀਆਂ ਦੇ ਭਾਅ ਮਿਲਾਓ, ਵੱਡੇ ਖਰੀਦਦਾਰਾਂ ਨਾਲ ਸਿੱਧਾ ਜੁੜੋ ਅਤੇ 24 ਘੰਟਿਆਂ ਵਿੱਚ ਸੁਰੱਖਿਅਤ ਪੇਮੈਂਟ ਪਾਓ।",
  heroSearchPlaceholder: "ਫ਼ਸਲ ਲੱਭੋ (ਕਣਕ, ਝੋਨਾ, ਸਰ੍ਹੋਂ, ਨਰਮਾ)...",
  heroVoiceBtn: "ਬੋਲ ਕੇ ਪੁੱਛੋ",
  todayMandiPrices: "ਅੱਜ ਦੇ ਮੰਡੀ ਭਾਅ",
  minPrice: "ਘੱਟੋ-ਘੱਟ",
  maxPrice: "ਵੱਧ ਤੋਂ ਵੱਧ",
  modalPrice: "ਮਾਡਲ ਭਾਅ",
  recSellNow: "ਹੁਣੇ ਵੇਚੋ (Sell Now)",
  recWaitDays: "5-7 ਦਿਨ ਰੁਕੋ (Wait 5-7 Days)",
  recConsiderStorage: "ਗੁਦਾਮ ਵਿੱਚ ਰੱਖੋ",
};

// -------------------------------------------------------------
// 5. GUJARATI (ગુજરાતી)
// -------------------------------------------------------------
const gu: TranslationSchema = {
  ...en,
  brandName: "કૃષિસેતુ",
  brandTagline: "સ્માર્ટ માર્કેટ યાર્ડ ભાવ, ચકાસાયેલ વેપારીઓ અને સુરક્ષિત સોદા",
  navHome: "હોમ",
  navPrices: "માર્કેટ યાર્ડ ભાવ",
  navBuyers: "ચકાસાયેલ ખરીદદાર",
  navMyCrops: "મારા પાક",
  navOffers: "ઓફર અને વાટાઘાટ",
  navTransactions: "ચુકવણી અને રસીદો",
  navStorage: "ગોડાઉન અને કોલ્ડ સ્ટોરેજ",
  navTransport: "ટ્રાન્સપોર્ટ",
  navQuality: "AI ગુણવત્તા તપાસ",
  heroTitle: "આજે તમારા પાકનો શું ભાવ છે?",
  heroSubtitle: "નજીકના માર્કેટ યાર્ડના ભાવો સરખાવો, 100+ મોટા ખરીદદારો સાથે સીધા વેપાર કરો અને 24 કલાકમાં ગેરંટીડ પેમેન્ટ મેળવો.",
  heroSearchPlaceholder: "પાક શોધો (ઘઉં, કપાસ, રાયડો, મગફળી, જીરું)...",
  heroVoiceBtn: "બોલીને શોધો",
  todayMandiPrices: "આજના માર્કેટ યાર્ડ ભાવ",
  recSellNow: "અત્યારે જ વેચો (Sell Now)",
  recWaitDays: "5-7 દિવસ રાહ જુઓ (Wait 5-7 Days)",
  recConsiderNearby: "નજીકના યાર્ડમાં વેચો",
};

// -------------------------------------------------------------
// 6. MARATHI (मराठी)
// -------------------------------------------------------------
const mr: TranslationSchema = {
  ...en,
  brandName: "कृषीसेतू",
  brandTagline: "स्मार्ट कृषी बाजारभाव, पडताळलेले खरेदीदार व सुरक्षित व्यवहार",
  navHome: "मुख्यपृष्ठ",
  navPrices: "बाजार समिती भाव",
  navBuyers: "पडताळलेले खरेदीदार",
  navMyCrops: "माझे पीक / लॉट",
  navOffers: "ऑफर आणि घासाघिस",
  navTransactions: "पेमेंट व पावत्या",
  navStorage: "गोदाम व शीतगृह",
  navTransport: "वाहतूक व ट्रॅकिंग",
  navQuality: "AI गुणवत्ता तपासणी",
  heroTitle: "आज तुमच्या शेतमालाचा काय भाव आहे?",
  heroSubtitle: "जवळपासच्या कृषी उत्पन्न बाजार समित्यांचे भाव तपासा, थेट मोठ्या कंपन्यांना विका व २४ तासांत खात्यात पैसे मिळवा.",
  heroSearchPlaceholder: "पीक शोधा (गहू, सोयाबीन, कापूस, कांदा, तूर)...",
  heroVoiceBtn: "बोलून विचारा",
  todayMandiPrices: "आजचे बाजारभाव",
  recSellNow: "आत्ताच विका (Sell Now)",
  recWaitDays: "५-७ दिवस थांबा (Wait 5-7 Days)",
  recConsiderNearby: "जवळच्या बाजारात विका",
  recConsiderStorage: "गोदामात साठवा",
};

// -------------------------------------------------------------
// 7. BENGALI (বাংলা)
// -------------------------------------------------------------
const bn: TranslationSchema = {
  ...en,
  brandName: "কৃষিসেতু",
  brandTagline: "স্মার্ট মান্ডি দর, যাচাইকৃত ক্রেতা ও ন্যায্য লেনদেন",
  navHome: "হোম",
  navPrices: "বাজার দর",
  navBuyers: "যাচাইকৃত ক্রেতা",
  navMyCrops: "আমার ফসল",
  navOffers: "দরদাম ও অফার",
  navTransactions: "লেনদেন ও পেমেন্ট",
  navStorage: "গুদাম ও কোল্ড স্টোরেজ",
  navTransport: "পরিবহন",
  navQuality: "AI গুণমান পরীক্ষা",
  heroTitle: "আজ আপনার ফসলের দাম কত?",
  heroSubtitle: "কাছের মান্ডির দাম তুলনা করুন, নামী ক্রেতাদের সাথে সরাসরি যুক্ত হন এবং ২৪ ঘণ্টার মধ্যে সরাসরি পেমেন্ট পান।",
  heroSearchPlaceholder: "ফসল খুঁজুন (ধান, গম, সরিষা, আলু, পাট)...",
  heroVoiceBtn: "কথা বলে খুঁজুন",
  todayMandiPrices: "আজকের বাজার দর",
  recSellNow: "এখনই বিক্রি করুন (Sell Now)",
  recWaitDays: "৫-৭ দিন অপেক্ষা করুন",
};

// -------------------------------------------------------------
// 8. TELUGU (తెలుగు)
// -------------------------------------------------------------
const te: TranslationSchema = {
  ...en,
  brandName: "కృషిసేతు",
  brandTagline: "స్మార్ట్ మార్కెట్ ధరలు, ధృవీకరించబడిన కొనుగోలుదారులు",
  navHome: "హోమ్",
  navPrices: "మార్కెట్ ధరలు",
  navBuyers: "కొనుగోలుదారులు",
  navMyCrops: "నా పంటలు",
  navOffers: "ఆఫర్లు & బేరసారాలు",
  navTransactions: "చెల్లింపులు",
  navStorage: "గిడ్డంగులు & స్టోరేజ్",
  navTransport: "రవాణా & ట్రాకింగ్",
  navQuality: "AI నాణ్యత పరీక్ష",
  heroTitle: "ఈరోజు మీ పంట ధర ఎంత?",
  heroSubtitle: "సమీప మార్కెట్ ధరలను సరిపోల్చండి, ధృవీకరించబడిన కొనుగోలుదారులతో నేరుగా వ్యాపారం చేయండి.",
  heroSearchPlaceholder: "పంటను శోధించండి (వరి, మిర్చి, పత్తి, వేరుశనగ)...",
  heroVoiceBtn: "మాట్లాడి వెతకండి",
  todayMandiPrices: "నేటి మార్కెట్ ధరలు",
  recSellNow: "ఇప్పుడే అమ్మండి (Sell Now)",
  recWaitDays: "5-7 రోజులు వేచి ఉండండి",
};

// -------------------------------------------------------------
// 9. TAMIL (தமிழ்)
// -------------------------------------------------------------
const ta: TranslationSchema = {
  ...en,
  brandName: "கிருஷிசேது",
  brandTagline: "ஸ்மார்ட் மண்டி விலை, சரிபார்க்கப்பட்ட வாங்குபவர்கள்",
  navHome: "முகப்பு",
  navPrices: "சந்தை விலைகள்",
  navBuyers: "வாங்குபவர்கள்",
  navMyCrops: "என் பயிர்கள்",
  navOffers: "பேரம் & சலுகைகள்",
  navTransactions: "பரிவர்த்தனை & ரசீது",
  navStorage: "சேமிப்புக் கிடங்கு",
  navTransport: "போக்குவரத்து",
  navQuality: "AI தரப் பரிசோதனை",
  heroTitle: "இன்று உங்கள் பயிரின் விலை என்ன?",
  heroSubtitle: "அருகிலுள்ள சந்தை விலைகளை ஒப்பிடுங்கள், சரிபார்க்கப்பட்ட நிறுவனங்களுக்கு நேரடியாக விற்பனை செய்யுங்கள்.",
  heroSearchPlaceholder: "பயிர்களைத் தேடுங்கள் (நெல், பருத்தி, மக்காச்சோளம், மஞ்சள்)...",
  heroVoiceBtn: "பேசித் தேடுங்கள்",
  todayMandiPrices: "இன்றைய சந்தை விலைகள்",
  recSellNow: "இப்போதே விற்கவும் (Sell Now)",
  recWaitDays: "5-7 நாட்கள் காத்திருக்கவும்",
};

// -------------------------------------------------------------
// 10. KANNADA (ಕನ್ನಡ)
// -------------------------------------------------------------
const kn: TranslationSchema = {
  ...en,
  brandName: "ಕೃಷಿಸೇತು",
  brandTagline: "ಸ್ಮಾರ್ಟ್ ಮಾರುಕಟ್ಟೆ ದರ, ಪರಿಶೀಲಿಸಿದ ಖರೀದಿದಾರರು",
  navHome: "ಮುಖಪುಟ",
  navPrices: "ಮಾರುಕಟ್ಟೆ ದರಗಳು",
  navBuyers: "ಖರೀದಿದಾರರು",
  navMyCrops: "ನನ್ನ ಬೆಳೆಗಳು",
  navOffers: "ಆಫರ್‌ಗಳು & ಚೌಕಾಸಿ",
  navTransactions: "ಪಾವತಿಗಳು",
  navStorage: "ಗೋದಾಮು & ಶೇಖರಣೆ",
  navTransport: "ಸಾರಿಗೆ",
  navQuality: "AI ಗುಣಮಟ್ಟ ತಪಾಸಣೆ",
  heroTitle: "ಇಂದು ನಿಮ್ಮ ಬೆಳೆಯ ಮಾರುಕಟ್ಟೆ ಬೆಲೆ ಎಷ್ಟು?",
  heroSubtitle: "ಹತ್ತಿರದ ಮಂಡಿ ದರಗಳನ್ನು ಹೋಲಿಕೆ ಮಾಡಿ, ಪರಿಶೀಲಿಸಿದ ಖರೀದಿದಾರರಿಗೆ ನೇರವಾಗಿ ಮಾರಿ 24 ಗಂಟೆಗಳಲ್ಲಿ ಹಣ ಪಡೆಯಿರಿ.",
  heroSearchPlaceholder: "ಬೆಳೆ ಹುಡುಕಿ (ಭತ್ತ, ರಾಗಿ, ಹತ್ತಿ, ಮೆಕ್ಕೆಜೋಳ)...",
  heroVoiceBtn: "ಮಾತನಾಡಿ ಹುಡುಕಿ",
  todayMandiPrices: "ಇಂದಿನ ಮಾರುಕಟ್ಟೆ ದರಗಳು",
  recSellNow: "ಈಗಲೇ ಮಾರಿ (Sell Now)",
  recWaitDays: "5-7 ದಿನ ಕಾಯಿರಿ",
};

// -------------------------------------------------------------
// 11. MALAYALAM (മലയാളം)
// -------------------------------------------------------------
const ml: TranslationSchema = {
  ...en,
  brandName: "കൃഷിസേതു",
  brandTagline: "സ്മാർട്ട് മാർക്കറ്റ് നിരക്കുകൾ, പരിശോധിച്ച വാങ്ങലുകാർ",
  navHome: "ഹോം",
  navPrices: "വിപണി വിലകൾ",
  navBuyers: "വാങ്ങുന്നവർ",
  navMyCrops: "എന്റെ വിളകൾ",
  navOffers: "ഓഫറുകൾ",
  navTransactions: "പേയ്‌മെന്റുകൾ",
  navStorage: "വെയർഹൗസ്",
  navTransport: "ഗതാഗതം",
  navQuality: "AI ഗുണനിലവാര പരിശോധന",
  heroTitle: "ഇന്ന് നിങ്ങളുടെ വിളയുടെ വില എന്താണ്?",
  heroSubtitle: "സമീപത്തെ മാർക്കറ്റ് വിലകൾ താരതമ്യം ചെയ്യുക, വിശ്വസനീയമായ കമ്പനികൾക്ക് നേരിട്ട് വിൽക്കുക.",
  heroSearchPlaceholder: "വിളകൾ തിരയുക (നെല്ല്, കുരുമുളക്, ഏലം, തെങ്ങ്)...",
  heroVoiceBtn: "സംസാരിച്ചു തിരയുക",
  todayMandiPrices: "ഇന്നത്തെ വിപണി വിലകൾ",
  recSellNow: "ഇപ്പോൾ തന്നെ വിൽക്കുക (Sell Now)",
  recWaitDays: "5-7 ദിവസം കാത്തിരിക്കുക",
};

// -------------------------------------------------------------
// 12. ODIA (ଓଡ଼ିଆ)
// -------------------------------------------------------------
const or: TranslationSchema = {
  ...en,
  brandName: "କୃଷିସେତୁ",
  brandTagline: "ସ୍ମାର୍ଟ ମଣ୍ଡି ଦର, ଯାଞ୍ଚ ହୋଇଥିବା କ୍ରେତା ଓ ସୁରକ୍ଷିତ କାରବାର",
  navHome: "ମୁଖ୍ୟ ପୃଷ୍ଠା",
  navPrices: "ମଣ୍ଡି ଦର",
  navBuyers: "ଯାଞ୍ଚ ହୋଇଥିବା କ୍ରେତା",
  navMyCrops: "ମୋର ଫସଲ",
  navOffers: "ଅଫର ଓ ଦରଦାମ",
  navTransactions: "ପେମେଣ୍ଟ ଓ ରସିଦ",
  navStorage: "ଗୋଦାମ ଓ କୋଲ୍ଡ ଷ୍ଟୋରେଜ",
  navTransport: "ପରିବହନ",
  navQuality: "AI ଗୁଣବତ୍ତା ଯାଞ୍ଚ",
  heroTitle: "ଆଜି ଆପଣଙ୍କ ଫସଲର ଦର କେତେ?",
  heroSubtitle: "ନିକଟସ୍ଥ ମଣ୍ଡି ଦର ତୁଳନା କରନ୍ତୁ, ବଡ଼ କ୍ରେତାଙ୍କ ସହ ସିଧା ଯୋଡ଼ି ହୁଅନ୍ତୁ ଏବଂ ୨୪ ଘଣ୍ଟାରେ ସୁରକ୍ଷିତ ପେମେଣ୍ଟ ପାଆନ୍ତୁ।",
  heroSearchPlaceholder: "ଫସଲ ଖୋଜନ୍ତୁ (ଧାନ, ଗହମ, ସୋରିଷ, ମକା)...",
  heroVoiceBtn: "କହିକି ଖୋଜନ୍ତୁ",
  todayMandiPrices: "ଆଜିର ମଣ୍ଡି ଦର",
  recSellNow: "ବର୍ତ୍ତମାନ ବିକ୍ରି କରନ୍ତୁ (Sell Now)",
  recWaitDays: "୫-୭ ଦିନ ଅପେକ୍ଷା କରନ୍ତୁ",
};

export const TRANSLATIONS: Record<string, TranslationSchema> = {
  hi,
  en,
  raj,
  pa,
  gu,
  mr,
  bn,
  te,
  ta,
  kn,
  ml,
  or,
};

export function getTranslation(langCode: string): TranslationSchema {
  return TRANSLATIONS[langCode] || TRANSLATIONS.hi || TRANSLATIONS.en;
}
