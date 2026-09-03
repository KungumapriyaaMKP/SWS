'use client';

import { useState } from 'react';
import { Sparkles, X, ArrowRight, Flame } from 'lucide-react';

interface AnnouncementBarProps {
  onDismiss?: () => void;
}

export function AnnouncementBar({ onDismiss }: AnnouncementBarProps) {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const handleClaimOffer = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const offerMessage = "FLAT 15% OFF ON ALL SERVICES — LIMITED TIME OFFER GOING ON";

  return (
    <div className="relative z-[5001] w-full bg-gradient-to-r from-[#3B0764] via-purple-900 to-[#1D0636] border-b border-purple-400/30 text-white py-2 px-3 overflow-hidden select-none shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Infinite Running Marquee Ticker */}
        <div
          onClick={handleClaimOffer}
          className="flex-1 overflow-hidden cursor-pointer group"
          title="Click to claim 15% off project inquiry"
        >
          <div className="animate-marquee flex items-center whitespace-nowrap gap-12 font-mono text-[10px] sm:text-xs font-extrabold tracking-widest uppercase">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-none bg-pink-500 text-white font-extrabold text-[9px] shadow-sm">
                  <Flame className="w-3 h-3 animate-pulse" />
                  <span>SPECIAL OFFER</span>
                </span>
                <span className="text-zinc-100 group-hover:text-pink-300 transition-colors">
                  {offerMessage}
                </span>
                <span className="inline-flex items-center gap-1 text-pink-400 font-extrabold underline decoration-pink-400/50 underline-offset-2">
                  <span>CLAIM DISCOUNT NOW</span>
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Optional Dismiss Close Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setDismissed(true);
            if (onDismiss) onDismiss();
          }}
          className="p-1 rounded-none hover:bg-white/10 text-purple-300 hover:text-white transition-colors focus:outline-none flex-shrink-0"
          aria-label="Dismiss offer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
