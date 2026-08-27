import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding KrishiSetu AI database...");

  // 1. Seed Users
  const farmerUser = await prisma.user.upsert({
    where: { phone: "9876543210" },
    update: {},
    create: {
      id: "user_farmer_demo",
      name: "रामेश्वर जी (किसान)",
      phone: "9876543210",
      email: "rameshwar.kisan@krishisetu.ai",
      role: "FARMER",
      language: "hi",
      location: "करनाल, हरियाणा (Karnal, Haryana)",
      farmSizeAcres: 4.5,
    },
  });

  const adminUser = await prisma.user.upsert({
    where: { email: "admin@krishisetu.ai" },
    update: {},
    create: {
      id: "user_admin_demo",
      name: "डॉ. शर्मा (कृषि विज्ञान अधिकारी)",
      phone: "9988776655",
      email: "admin@krishisetu.ai",
      role: "ADMIN",
      language: "hi",
      location: "कृषि विज्ञान केंद्र, नई दिल्ली",
    },
  });

  // 2. Seed 1-Year Farmer Packs (NO monthly subscriptions)
  const basicPack = await prisma.farmerPack.upsert({
    where: { slug: "basic" },
    update: {
      price: 199,
      validityDays: 365,
    },
    create: {
      id: "pack_basic",
      slug: "basic",
      name: "Basic Farmer Access",
      nameHi: "बेसिक किसान पैक",
      description: "Essential crop photo diagnosis and marketplace access for small farmers.",
      descriptionHi: "छोटे किसानों के लिए जरूरी फसल फोटो जांच और कृषि बाजार की सुविधा।",
      price: 199, // ₹199 / year
      validityDays: 365,
      videoUploadAllowed: false,
      maxDiagnosesPerYear: 30,
      expertAssistance: false,
      prioritySupport: false,
      advancedMonitoring: false,
      isActive: true,
      isPopular: false,
    },
  });

  const smartPack = await prisma.farmerPack.upsert({
    where: { slug: "smart" },
    update: {
      price: 499,
      validityDays: 365,
    },
    create: {
      id: "pack_smart",
      slug: "smart",
      name: "Smart Farmer Access",
      nameHi: "स्मार्ट किसान पैक",
      description: "Photo & video analysis, advanced AI doctor, crop health history, and priority support.",
      descriptionHi: "फोटो व वीडियो जांच, उन्नत AI फसल डॉक्टर, स्वास्थ्य इतिहास और प्राथमिकता सहायता।",
      price: 499, // ₹499 / year
      validityDays: 365,
      videoUploadAllowed: true,
      maxDiagnosesPerYear: 100,
      expertAssistance: false,
      prioritySupport: true,
      advancedMonitoring: true,
      isActive: true,
      isPopular: true,
    },
  });

  const premiumPack = await prisma.farmerPack.upsert({
    where: { slug: "premium" },
    update: {
      price: 999,
      validityDays: 365,
    },
    create: {
      id: "pack_premium",
      slug: "premium",
      name: "Premium Farmer Access",
      nameHi: "प्रीमियम किसान पैक",
      description: "Unlimited AI usage, agronomist tele-consultation, video diagnostics, and field monitoring.",
      descriptionHi: "असीमित AI उपयोग, कृषि वैज्ञानिक टेली-परामर्श, वीडियो जांच एवं सेटेलाइट फील्ड मॉनिटरिंग।",
      price: 999, // ₹999 / year
      validityDays: 365,
      videoUploadAllowed: true,
      maxDiagnosesPerYear: 999,
      expertAssistance: true,
      prioritySupport: true,
      advancedMonitoring: true,
      isActive: true,
      isPopular: false,
    },
  });

  // 3. Seed active 1-year access for demo farmer
  const now = new Date();
  const oneYearLater = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000);

  await prisma.userPackAccess.upsert({
    where: { paymentId: "pay_demo_active_001" },
    update: {},
    create: {
      id: "access_demo_001",
      userId: farmerUser.id,
      packId: smartPack.id,
      status: "ACTIVE",
      amountPaid: 499,
      startDate: now,
      expiryDate: oneYearLater,
      paymentId: "pay_demo_active_001",
    },
  });

  await prisma.payment.upsert({
    where: { razorpayOrderId: "order_demo_initial" },
    update: {},
    create: {
      id: "pay_initial_001",
      userId: farmerUser.id,
      packId: smartPack.id,
      amount: 499,
      currency: "INR",
      razorpayOrderId: "order_demo_initial",
      razorpayPaymentId: "pay_demo_active_001",
      razorpaySignature: "sig_verified_demo",
      status: "SUCCESS",
      paymentMethod: "UPI (Google Pay / PhonePe)",
      createdAt: now,
    },
  });

  // 4. Seed Crops and AI Diagnoses
  const crop1 = await prisma.crop.create({
    data: {
      userId: farmerUser.id,
      cropType: "wheat",
      cropTypeName: "गेहूं (Wheat - HD 2967)",
      variety: "HD-2967 (उन्नत)",
      sowingDate: "15 नवंबर 2025",
      location: "करनाल, ब्लॉक-2",
      problemDescription: "पत्तियों के बीच में हल्का पीलापन और हल्दी जैसे धब्बे नजर आ रहे हैं।",
      media: {
        create: [
          {
            mediaType: "IMAGE",
            fileUrl: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&auto=format&fit=crop&q=80",
            fileName: "wheat_leaf_rust.jpg",
          },
        ],
      },
      diagnoses: {
        create: [
          {
            cropHealth: "MODERATE",
            healthStatusText: "🟡 सामान्य से थोड़ी कमजोर — पीला रतुआ के शुरुआती लक्षण",
            diseaseName: "पीला रतुआ (Yellow Stripe Rust)",
            pestName: "गेहूं का माहू (Aphids)",
            deficiency: "जिंक एवं नाइट्रोजन की आंशिक कमी",
            symptoms: "पत्तियों पर पीली समानांतर धारियां और हल्का फंगल पाउडर। प्रकाश संश्लेषण में कमी देखी गई।",
            advisory: "खेत की नियमित निगरानी करें और अत्यधिक यूरिया के प्रयोग से बचें। 15 दिन बाद दोबारा जांचें।",
            actionPlan: JSON.stringify([
              "1. खेत की सुबह के समय निगरानी करें और पीले पाउडर वाले पौधों को चिह्नित करें।",
              "2. खेत में अत्यधिक यूरिया का प्रयोग न करें, इससे रोग तेजी से फैलता है।",
              "3. हल्की सिंचाई करें ताकि खेत में पानी का जमाव न हो।",
              "4. अनुमोदित कवकनाशी का आवश्यकतानुसार छिड़काव करें।"
            ]),
            organicTreatment: "खट्टी छाछ (5 लीटर) + हींग (50 ग्राम) 150 लीटर पानी में मिलाकर स्प्रे करें अथवा ट्राइकोडर्मा 2.5 ग्राम/लीटर छिड़कें।",
            chemicalTreatment: "प्रोपिकोनाजोल 25% EC (टिल्ट) @ 200 मिली प्रति 200 लीटर पानी प्रति एकड़ छिड़काव करें।",
            prevention: "बीज उपचार हमेशा प्रमाणित कवकनाशी से करें और प्रमाणित रोगरोधी किस्में लगाएं।",
            severityScore: 36,
            confidenceScore: 96,
            language: "hi",
          },
        ],
      },
    },
  });

  const crop2 = await prisma.crop.create({
    data: {
      userId: farmerUser.id,
      cropType: "mustard",
      cropTypeName: "सरसों (Mustard - RH 749)",
      variety: "RH-749",
      sowingDate: "20 अक्टूबर 2025",
      location: "करनाल, उत्तरी प्रभाग",
      problemDescription: "फूल आने वाले तने पर हरे-काले कीड़े चिपके हुए हैं।",
      media: {
        create: [
          {
            mediaType: "IMAGE",
            fileUrl: "https://images.unsplash.com/photo-1508873696983-2df5293cb32b?w=800&auto=format&fit=crop&q=80",
            fileName: "mustard_aphids.jpg",
          },
        ],
      },
      diagnoses: {
        create: [
          {
            cropHealth: "MODERATE",
            healthStatusText: "🟡 माहू कीट (चेपा) का मध्यम प्रकोप",
            diseaseName: "सफेद रोली (White Rust)",
            pestName: "सरसों का माहू (Lipaphis erysimi)",
            deficiency: "सल्फर की आवश्यकता",
            symptoms: "फूल वाले भाग पर माहू कीटों का झुंड, चिपचिपा स्राव जिससे फफूंद पनपने का खतरा।",
            advisory: "पीले स्टिकी ट्रैप लगाएं और शाम के समय नीम तेल का छिड़काव करें।",
            actionPlan: JSON.stringify([
              "1. प्रभावित शाखाओं को तोड़कर खेत से दूर नष्ट करें।",
              "2. 10 पीले चिपचिपे कार्ड प्रति एकड़ लगाएं।",
              "3. नीम तेल का तत्काल छिड़काव करें।"
            ]),
            organicTreatment: "नीम तेल (1500 PPM) 5 मिली प्रति लीटर पानी + थोड़ा साबुन घोलकर शाम को छिड़कें।",
            chemicalTreatment: "थायमेथोक्सम 25% WG 80 ग्राम प्रति 150 लीटर पानी प्रति एकड़ स्प्रे करें।",
            prevention: "अगेती बुवाई करें और खेत में 20 किग्रा सल्फर प्रति एकड़ डालें।",
            severityScore: 40,
            confidenceScore: 94,
            language: "hi",
          },
        ],
      },
    },
  });

  // 5. Seed Marketplace Products
  const products = [
    {
      name: "HD-3086 Certified Wheat Seeds (40 kg)",
      nameHi: "HD-3086 प्रमाणित गेहूं बीज (40 किग्रा बैग)",
      category: "seeds",
      categoryHi: "बीज",
      price: 1450,
      unit: "per 40kg bag",
      unitHi: "प्रति 40 किग्रा बैग",
      imageUrl: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80",
      description: "High yielding, yellow rust resistant certified seed certified by National Seeds Corporation.",
      descriptionHi: "राष्ट्रीय बीज निगम द्वारा प्रमाणित, पीला रतुआ प्रतिरोधी, 22-24 क्विंटल प्रति एकड़ पैदावार।",
      sellerName: "हरियाणा बीज उत्पादक संघ",
      sellerPhone: "+91 98120 44556",
      sellerLocation: "करनाल, हरियाणा",
      isOrganic: false,
      inStock: true,
      rating: 4.9,
    },
    {
      name: "Bio-Neem Organic Pest Repellent (1500 PPM, 1L)",
      nameHi: "बायो-नीम 100% प्राकृतिक कीटनाशक (1500 PPM, 1 लीटर)",
      category: "organic",
      categoryHi: "जैविक उत्पाद",
      price: 420,
      unit: "per 1L bottle",
      unitHi: "प्रति 1 लीटर बोतल",
      imageUrl: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=80",
      description: "Cold-pressed pure neem kernel oil effective against aphids, thrips, whiteflies, and caterpillars.",
      descriptionHi: "शुद्ध नीम बीज से निर्मित, माहू, सफेद मक्खी और सुंडी के खिलाफ अत्यंत असरदार और सुरक्षित।",
      sellerName: "किसान जैविक ग्राम उद्योग",
      sellerPhone: "+91 94160 88776",
      sellerLocation: "हिसार, हरियाणा",
      isOrganic: true,
      inStock: true,
      rating: 4.8,
    },
    {
      name: "Zinc Sulphate Heptahydrate 21% (5 kg)",
      nameHi: "जिंक सल्फेट 21% कृषि ग्रेड (5 किग्रा)",
      category: "fertilizers",
      categoryHi: "खाद एवं उर्वरक",
      price: 320,
      unit: "per 5kg pack",
      unitHi: "प्रति 5 किग्रा पैक",
      imageUrl: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=600&auto=format&fit=crop&q=80",
      description: "High purity micronutrient fertilizer to cure chlorosis and khaira disease in cereal crops.",
      descriptionHi: "गेहूं और धान में पत्तियों के पीलेपन व खैरा रोग को ठीक करने वाला उच्च शुद्धता वाला जिंक।",
      sellerName: "इफको किसान सेवा केंद्र",
      sellerPhone: "+91 1800 103 1967",
      sellerLocation: "कुरुक्षेत्र, हरियाणा",
      isOrganic: false,
      inStock: true,
      rating: 4.7,
    },
    {
      name: "16L 12V Battery Knapsack Sprayer",
      nameHi: "16 लीटर 12V बैटरी वाला नैपसैक स्प्रेयर",
      category: "equipment",
      categoryHi: "कृषि उपकरण",
      price: 2499,
      unit: "per unit",
      unitHi: "प्रति पीस",
      imageUrl: "https://images.unsplash.com/photo-1589923188900-85dae523342b?w=600&auto=format&fit=crop&q=80",
      description: "Heavy duty battery sprayer with double motor, pressure regulator, and telescopic brass lance.",
      descriptionHi: "डबल मोटर और 12V बैटरी से लैस स्प्रेयर, 1 बार चार्ज में 25-30 टंकी स्प्रे करने की क्षमता।",
      sellerName: "एग्रो शक्ति टूल्स प्रा. लि.",
      sellerPhone: "+91 98960 11223",
      sellerLocation: "लुधियाना, पंजाब",
      isOrganic: false,
      inStock: true,
      rating: 4.9,
    },
    {
      name: "Drip Irrigation Kit (1 Acre Complete Set)",
      nameHi: "ड्रिप सिंचाई किट (1 एकड़ पूरा सेट)",
      category: "irrigation",
      categoryHi: "सिंचाई उपकरण",
      price: 8900,
      unit: "per 1 acre kit",
      unitHi: "प्रति एकड़ किट",
      imageUrl: "https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=600&auto=format&fit=crop&q=80",
      description: "Complete inline drip kit with screen filter, main line, lateral pipes and drippers for 1 acre.",
      descriptionHi: "60% पानी की बचत करने वाला पूरा ड्रिप सेट, फिल्टर, मुख्य पाइप और ड्रिपर्स के साथ।",
      sellerName: "जैन इरिगेशन डीलर्स",
      sellerPhone: "+91 97290 33445",
      sellerLocation: "पानीपत, हरियाणा",
      isOrganic: false,
      inStock: true,
      rating: 4.8,
    },
    {
      name: "Pure Vermicompost (Kechua Khad - 50 kg)",
      nameHi: "शुद्ध केंचुआ खाद / वर्मीकम्पोस्ट (50 किग्रा)",
      category: "organic",
      categoryHi: "जैविक उत्पाद",
      price: 450,
      unit: "per 50kg bag",
      unitHi: "प्रति 50 किग्रा बोरी",
      imageUrl: "https://images.unsplash.com/photo-1585336261026-775c7425f95b?w=600&auto=format&fit=crop&q=80",
      description: "100% decomposed organic earthworm compost rich in humus, beneficial microbes, and carbon.",
      descriptionHi: "मिट्टी की उर्वरा शक्ति और जल धारण क्षमता बढ़ाने वाली 100% प्राकृतिक जैविक केंचुआ खाद।",
      sellerName: "धरती अमृत जैविक फार्म",
      sellerPhone: "+91 98135 66778",
      sellerLocation: "अंबाला, हरियाणा",
      isOrganic: true,
      inStock: true,
      rating: 5.0,
    },
  ];

  for (const prod of products) {
    await prisma.marketplaceProduct.create({
      data: prod,
    });
  }

  console.log("Database seeded successfully with Users, 1-Year Packs, Diagnoses, and Marketplace Products!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
