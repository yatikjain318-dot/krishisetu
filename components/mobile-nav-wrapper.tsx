"use client";

import React, { useState } from "react";
import { MobileNav } from "./mobile-nav";
import { VoiceMarketQueryModal } from "./voice-market-query-modal";

export function MobileNavWrapper() {
  const [voiceOpen, setVoiceOpen] = useState(false);

  return (
    <>
      <MobileNav onOpenVoiceQuery={() => setVoiceOpen(true)} />
      <VoiceMarketQueryModal isOpen={voiceOpen} onClose={() => setVoiceOpen(false)} />
    </>
  );
}
