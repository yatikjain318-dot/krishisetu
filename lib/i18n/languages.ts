export interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  bcp47: string; // for Web Speech API recognition & synthesis
  region: string;
}

export const SUPPORTED_LANGUAGES: Language[] = [
  { code: "en", name: "English", nativeName: "English", flag: "🌐", bcp47: "en-IN", region: "All India / Business" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳", bcp47: "hi-IN", region: "North & Central India" },
  { code: "raj", name: "Rajasthani", nativeName: "राजस्थानी", flag: "🐪", bcp47: "hi-IN", region: "Rajasthan" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", flag: "🌾", bcp47: "pa-IN", region: "Punjab & Haryana" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી", flag: "🦁", bcp47: "gu-IN", region: "Gujarat" },
  { code: "mr", name: "Marathi", nativeName: "मराठी", flag: "🚩", bcp47: "mr-IN", region: "Maharashtra" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", flag: "🐅", bcp47: "bn-IN", region: "West Bengal & Tripura" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", flag: "🌱", bcp47: "te-IN", region: "Andhra & Telangana" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", flag: "🛕", bcp47: "ta-IN", region: "Tamil Nadu" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ", flag: "🐘", bcp47: "kn-IN", region: "Karnataka" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം", flag: "🌴", bcp47: "ml-IN", region: "Kerala" },
  { code: "or", name: "Odia", nativeName: "ଓଡ଼ିଆ", flag: "🌊", bcp47: "or-IN", region: "Odisha" },
];

export const DEFAULT_LANGUAGE = "en";
