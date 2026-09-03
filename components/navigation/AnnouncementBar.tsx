'use client';

import { useState } from 'react';
import { X, ArrowRight, Flame } from 'lucide-react';

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

  const offerItems = [
    "FLAT 15% OFF ON ALL SERVICES — LIMITED TIME OFFER GOING ON",
    "FLAT 15% OFF ON ALL SERVICES — LIMITED TIME OFFER GOING ON",
    "FLAT 15% OFF ON ALL SERVICES — LIMITED TIME OFFER GOING ON",
  ];

  const renderOfferTrack = () => (
    <div className="flex shrink-0 items-center gap-8 pr-8">
      {offerItems.map((text, idx) => (
        <div key={idx} className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-none bg-pink-500 text-white font-extrabold text-[9px] shadow-sm">
            <Flame className="w-3 h-3 animate-pulse" />
            <span>SPECIAL OFFER</span>
          </span>
          <span className="text-zinc-100 group-hover:text-pink-300 transition-colors">
            {text}
          </span>
          <span className="inline-flex items-center gap-1 text-pink-400 font-extrabold underline decoration-pink-400/50 underline-offset-2">
            <span>CLAIM DISCOUNT NOW</span>
            <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="relative z-[5001] w-full max-w-full bg-gradient-to-r from-[#3B0764] via-purple-900 to-[#1D0636] border-b border-purple-400/30 text-white py-2 overflow-hidden select-none shadow-md">
      <div className="w-full flex items-center justify-between relative">
        {/* Full-width Seamless 360 Running Ticker */}
        <div
          onClick={handleClaimOffer}
          className="w-full overflow-hidden cursor-pointer group flex items-center"
          title="Click to claim 15% off project inquiry"
        >
          <div className="flex w-full overflow-hidden">
            <div className="animate-marquee flex shrink-0 items-center whitespace-nowrap font-mono text-[10px] sm:text-xs font-extrabold tracking-widest uppercase group-hover:[animation-play-state:paused]">
              {renderOfferTrack()}
            </div>
            <div className="animate-marquee flex shrink-0 items-center whitespace-nowrap font-mono text-[10px] sm:text-xs font-extrabold tracking-widest uppercase group-hover:[animation-play-state:paused]" aria-hidden="true">
              {renderOfferTrack()}
            </div>
          </div>
        </div>

        {/* Dismiss Close Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setDismissed(true);
            if (onDismiss) onDismiss();
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 bg-purple-950/80 hover:bg-white/20 text-purple-200 hover:text-white transition-colors focus:outline-none flex-shrink-0 z-10 border border-purple-500/30"
          aria-label="Dismiss offer"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
