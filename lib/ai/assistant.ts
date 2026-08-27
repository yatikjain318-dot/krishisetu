export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  mediaUrl?: string;
  mediaType?: "IMAGE" | "VIDEO";
  timestamp?: string;
}

export async function generateAgriAssistantResponse(
  messages: ChatMessage[],
  language: string = "hi"
): Promise<string> {
  const latestMessage = messages[messages.length - 1]?.content || "";
  const geminiApiKey = process.env.GEMINI_API_KEY;

  if (geminiApiKey) {
    try {
      const systemContext = `You are KrishiSetu AI (कृषि सेतु AI), a wise, helpful, practical agricultural expert and digital companion for Indian farmers.
Language: Answer clearly in the language code '${language}'. If the question is in Hindi/Punjabi/Gujarati/etc., reply fluently in that language and script.
Style:
- Keep answers practical, farmer-friendly, step-by-step, and easy to understand.
- Provide both organic/natural remedies (देसी उपाय) and approved chemical solutions with correct dosages.
- Always be encouraging, respectful and supportive (e.g. किसान भाई / Farmer friend).
- If appropriate, summarize key action in 1-2 bullet points for quick reading.`;

      const contents = [
        { role: "user", parts: [{ text: systemContext }] },
        ...messages.map((m) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }],
        })),
      ];

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ contents }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text;
      }
    } catch (err) {
      console.warn("Gemini chat API fallback:", err);
    }
  }

  // Fallback intelligent agricultural replies based on keywords
  const query = latestMessage.toLowerCase();

  if (query.includes("गेहूं") || query.includes("wheat") || query.includes("पीली") || query.includes("yellow")) {
    if (language === "en") {
      return `🌾 **Advisory for Yellowing in Wheat Crop:**
1. **Check for Yellow Rust (Puccinia):** Check under the leaves for yellow powder. If found, spray Propiconazole 25% EC @ 200 ml/acre in 200L water.
2. **Zinc or Nitrogen Deficiency:** If lower leaves are yellow, spray Zinc Sulphate (21%) @ 1 kg + Urea 1 kg in 100 liters of water.
3. **Moisture Management:** Ensure the soil is moist but not waterlogged.
*Call Kisan Helpline 1800-180-1551 for free on-call verification.*`;
    }
    return `🌾 **गेहूं की फसल पीली पड़ने पर समाधान:**
1. **पीला रतुआ जांचें:** पत्तियों को हाथ लगाकर देखें, यदि हल्दी जैसा पीला पाउडर लगे तो यह पीला रतुआ है। तुरंत **टिल्ट (Propiconazole 25% EC)** 200 मिली प्रति एकड़ 200 लीटर पानी में मिलाकर स्प्रे करें।
2. **नाइट्रोजन या जिंक की कमी:** यदि सिर्फ पत्तियां पीली हैं, तो **जिंक सल्फेट (21%) 1 किग्रा + यूरिया 1 किग्रा** प्रति 100 लीटर पानी में मिलाकर छिड़काव करें।
3. **सिंचाई प्रबंधन:** खेत में पानी ज्यादा देर तक न ठहरने दें।
*अधिक जानकारी के लिए किसान कॉल सेंटर 1800-180-1551 पर संपर्क करें।*`;
  }

  if (query.includes("सरसों") || query.includes("mustard") || query.includes("माहू") || query.includes("aphid")) {
    if (language === "en") {
      return `🌱 **Mustard Aphid (Mahu) Control:**
1. **Organic Solution:** Spray Neem Oil (1500 PPM) @ 5 ml per liter of water with 1 ml liquid soap in late afternoon.
2. **Chemical Spray:** If infestation is heavy, spray Thiamethoxam 25% WG @ 80g or Imidacloprid 17.8% SL @ 50 ml per acre.
3. **Traps:** Install 8-10 Yellow Sticky Traps per acre to trap flying aphids.`;
    }
    return `🌱 **सरसों में माहू (चेपा) की रोकथाम:**
1. **देसी / जैविक उपाय:** 5 मिली नीम तेल (1500 PPM) प्रति लीटर पानी में थोड़ा साबुन का घोल मिलाकर शाम को छिड़कें।
2. **रासायनिक उपाय:** यदि प्रकोप अधिक हो, तो **थायमेथोक्सम 25% WG** 80 ग्राम या **इमिडाक्लोप्रिड 17.8% SL** 50 मिली प्रति एकड़ 150 लीटर पानी में मिलाकर स्प्रे करें।
3. **पीले ट्रैप:** खेत में 8-10 पीले चिपचिपे ट्रैप लगाएं।`;
  }

  if (query.includes("धान") || query.includes("paddy") || query.includes("rice") || query.includes("खाद")) {
    if (language === "en") {
      return `🌾 **Fertilizer & Care during Paddy Panicle Emergence:**
1. Apply 0:52:34 (Monopotassium Phosphate) @ 1 kg/acre foliar spray for robust grain filling.
2. If Sheath Blight or Stem Borer is noticed, apply Cartap Hydrochloride 4G @ 7.5 kg/acre.
3. Keep 2-3 cm water level in the field till milking stage.`;
    }
    return `🌾 **धान में बाली निकलते समय आवश्यक खाद व देखभाल:**
1. **पोषक तत्व:** 0:52:34 (मोनो पोटेशियम फॉस्फेट) 1 किग्रा प्रति एकड़ का पर्णीय छिड़काव करें जिससे दानों का भराव चमकदार और वजनदार हो।
2. **कीट रोकथाम:** यदि तना छेदक या भूरा फुदका दिखे तो कार्टाप हाइड्रोक्लोराइड 4G @ 7.5 किग्रा/एकड़ का उपयोग करें।
3. **पानी:** बाली बनने से लेकर दाना पकने तक खेत में 2-3 सेमी नमी बनाए रखें।`;
  }

  // Default response
  if (language === "en") {
    return `🌾 **KrishiSetu AI Advisory:**
Thank you for your question! For optimal crop health:
1. Ensure balanced fertilization (NPK) according to soil test results.
2. Upload a close-up photo of affected crop leaves in the "Check Crop" section for an instant AI disease diagnosis.
3. Feel free to ask more specific questions or use the microphone button to speak directly!`;
  }

  return `🌾 **KrishiSetu AI किसान साथी की सलाह:**
आपके सवाल के लिए धन्यवाद! 
1. अपनी फसल की सटीक जांच के लिए **"📷 फसल जांचें"** बटन दबाकर पत्तियों की फोटो डालें।
2. संतुलित खाद (NPK + सूक्ष्म पोषक तत्व) का ही उपयोग करें।
3. आप माइक (🎤) बटन दबाकर बोलकर भी कोई भी सवाल पूछ सकते हैं। हम हर कदम पर आपके साथ हैं!`;
}
