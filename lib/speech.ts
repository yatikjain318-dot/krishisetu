// Web Speech API Voice Recognition (STT) & Synthesis (TTS) Helper

export interface SpeechRecognitionResultHandler {
  onResult: (text: string) => void;
  onError?: (error: unknown) => void;
  onEnd?: () => void;
}

interface IWindowWithSpeech extends Window {
  SpeechRecognition?: any;
  webkitSpeechRecognition?: any;
}

export function startSpeechRecognition(
  langBcp47: string,
  handlers: SpeechRecognitionResultHandler
): { stop: () => void } | null {
  if (typeof window === "undefined") return null;

  const win = window as unknown as IWindowWithSpeech;
  const SpeechRecognition = win.SpeechRecognition || win.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    console.warn("Web Speech API is not supported in this browser.");
    return null;
  }

  try {
    const recognition = new SpeechRecognition();
    recognition.lang = langBcp47 || "hi-IN";
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: {
      resultIndex: number;
      results: { length: number; [index: number]: { isFinal: boolean; [index: number]: { transcript: string } } };
    }) => {
      let finalTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        finalTranscript += event.results[i][0].transcript;
      }
      if (finalTranscript) {
        handlers.onResult(finalTranscript);
      }
    };

    recognition.onerror = (event: { error: unknown }) => {
      console.error("Speech recognition error:", event.error);
      if (handlers.onError) handlers.onError(event.error);
    };

    recognition.onend = () => {
      if (handlers.onEnd) handlers.onEnd();
    };

    recognition.start();

    return {
      stop: () => {
        try {
          recognition.stop();
        } catch {
          // ignore
        }
      },
    };
  } catch (err) {
    console.error("Failed to start speech recognition:", err);
    return null;
  }
}

export function speakText(text: string, langBcp47: string = "hi-IN"): void {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    console.warn("SpeechSynthesis not supported in this browser.");
    return;
  }

  try {
    window.speechSynthesis.cancel();

    const cleanText = text
      .replace(/[*_#`~>]/g, "")
      .replace(/[\u{1F300}-\u{1F9FF}]/gu, "")
      .trim();

    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = langBcp47 || "hi-IN";
    utterance.rate = 0.92;
    utterance.pitch = 1.0;

    const setVoiceAndSpeak = () => {
      const voices = window.speechSynthesis.getVoices();
      const prefix = (langBcp47 || "hi").slice(0, 2);
      const matchingVoice =
        voices.find((v) => v.lang.toLowerCase() === langBcp47.toLowerCase()) ||
        voices.find((v) => v.lang.toLowerCase().startsWith(prefix)) ||
        voices.find((v) => v.lang.includes("IN") || v.lang.includes("hi"));
      
      if (matchingVoice) {
        utterance.voice = matchingVoice;
      }
      window.speechSynthesis.speak(utterance);
    };

    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = () => {
        setVoiceAndSpeak();
      };
    } else {
      setVoiceAndSpeak();
    }
  } catch (err) {
    console.error("Speech synthesis failed:", err);
  }
}

export function stopSpeaking(): void {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

/**
 * Intelligent parser for voice-based mandi price & agricultural queries
 * e.g. "Mere gehu ka aaj ka bhav kya hai?", "sarson ka bhav batao", "what is wheat price in jaipur?"
 */
export interface ParsedVoiceQuery {
  rawText: string;
  cropId?: string;
  cropName?: string;
  intent: "price_query" | "storage_query" | "buyer_query" | "quality_query" | "general";
  mandiLocation?: string;
}

export function parseFarmerVoiceQuery(text: string): ParsedVoiceQuery {
  const lower = text.toLowerCase().trim();

  // Crop keywords mapping
  const cropMap: { [key: string]: { id: string; name: string } } = {
    gehu: { id: "wheat", name: "Wheat (गेहूं)" },
    gehun: { id: "wheat", name: "Wheat (गेहूं)" },
    wheat: { id: "wheat", name: "Wheat (गेहूं)" },
    kanak: { id: "wheat", name: "Wheat (ਕਣਕ)" },
    sarson: { id: "mustard", name: "Mustard (सरसों)" },
    mustard: { id: "mustard", name: "Mustard (सरसों)" },
    raya: { id: "mustard", name: "Mustard (राया)" },
    kapas: { id: "cotton", name: "Cotton (कपास)" },
    cotton: { id: "cotton", name: "Cotton (कपास)" },
    narma: { id: "cotton", name: "Cotton (नरमा)" },
    soybean: { id: "soybean", name: "Soybean (सोयाबीन)" },
    soya: { id: "soybean", name: "Soybean (सोयाबीन)" },
    dhan: { id: "paddy", name: "Paddy (धान)" },
    rice: { id: "paddy", name: "Paddy (चावल/धान)" },
    chawal: { id: "paddy", name: "Paddy (धान)" },
    basmati: { id: "paddy", name: "Basmati Paddy (बासमती धान)" },
    makka: { id: "maize", name: "Maize (मक्का)" },
    maize: { id: "maize", name: "Maize (मक्का)" },
    corn: { id: "maize", name: "Maize (मक्का)" },
    chana: { id: "chana", name: "Gram / Chana (चना)" },
    gram: { id: "chana", name: "Gram / Chana (चना)" },
    pyaz: { id: "onion", name: "Onion (प्याज)" },
    kanda: { id: "onion", name: "Onion (कांदा)" },
    onion: { id: "onion", name: "Onion (प्याज)" },
    aloo: { id: "potato", name: "Potato (आलू)" },
    batata: { id: "potato", name: "Potato (बटाटा)" },
    potato: { id: "potato", name: "Potato (आलू)" },
    tamatar: { id: "tomato", name: "Tomato (टमाटर)" },
    tomato: { id: "tomato", name: "Tomato (टमाटर)" },
    jeera: { id: "cumin", name: "Cumin / Jeera (जीरा)" },
    cumin: { id: "cumin", name: "Cumin / Jeera (जीरा)" },
  };

  let foundCrop: { id: string; name: string } | undefined;
  for (const [key, val] of Object.entries(cropMap)) {
    if (lower.includes(key)) {
      foundCrop = val;
      break;
    }
  }

  // Detect Intent
  let intent: ParsedVoiceQuery["intent"] = "price_query";
  if (lower.includes("store") || lower.includes("godam") || lower.includes("storage") || lower.includes("rok ke")) {
    intent = "storage_query";
  } else if (lower.includes("buyer") || lower.includes("kharidar") || lower.includes("company") || lower.includes("bechna")) {
    intent = "buyer_query";
  } else if (lower.includes("quality") || lower.includes("grade") || lower.includes("nami") || lower.includes("moisture")) {
    intent = "quality_query";
  } else if (lower.includes("bhav") || lower.includes("price") || lower.includes("rate") || lower.includes("mandi") || lower.includes("daam")) {
    intent = "price_query";
  }

  // Detect Mandi location mention
  const locations = ["jaipur", "ajmer", "kota", "delhi", "azadpur", "indore", "neemuch", "unnao", "nashik", "khanna", "guntur", "unjha", "bikaner", "alwar"];
  const foundLoc = locations.find((l) => lower.includes(l));

  return {
    rawText: text,
    cropId: foundCrop?.id,
    cropName: foundCrop?.name,
    intent,
    mandiLocation: foundLoc ? foundLoc.charAt(0).toUpperCase() + foundLoc.slice(1) : undefined,
  };
}

