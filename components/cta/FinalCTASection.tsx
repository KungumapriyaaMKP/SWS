'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMagneticButton } from '@/hooks/useMagneticButton';
import { ArrowRight, MessageSquare, Volume2, VolumeX } from 'lucide-react';


export function FinalCTASection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [assembleProgress, setAssembleProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const primaryBtnRef = useMagneticButton<HTMLButtonElement>(0.35);
  const secondaryBtnRef = useMagneticButton<HTMLButtonElement>(0.3);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top bottom-=100',
        end: 'bottom bottom',
        onUpdate: (self) => {
          setAssembleProgress(self.progress);
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const toggleAudio = () => {
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
      if (!nextMuted) {
        videoRef.current.play().catch(() => {});
      }
    }
  };

  const scrollToContact = () => {
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={containerRef} className="relative py-28 px-4 md:px-8 overflow-hidden transition-colors duration-300">
      <div className="ambient-glow-1 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        {/* Left CTA Text */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-none glass-panel border border-purple-500/20 text-[11px] font-bold tracking-widest text-purple-800 dark:text-purple-300 uppercase shadow-glass-light">
            LET&apos;S COLLABORATE
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-purple-950 dark:text-white leading-tight">
            HAVE AN IDEA? <br />
            <span className="text-gradient-hero italic font-normal">LET&apos;S BUILD IT.</span>
          </h2>

          <p className="text-purple-900/80 dark:text-[#A1A1AA] text-base sm:text-lg max-w-xl leading-relaxed font-medium">
            Tell us what you&apos;re building. We&apos;ll help turn it into a digital product people want to use.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              ref={primaryBtnRef}
              data-cursor="cta"
              onClick={scrollToContact}
              className="group relative px-8 py-4 rounded-none text-xs font-bold tracking-widest uppercase text-white bg-[#3B0764] hover:bg-[#2A0548] shadow-lg transition-all duration-300 flex items-center gap-3 overflow-hidden"
            >
              <span className="relative z-10">START A PROJECT</span>
              <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <button
              ref={secondaryBtnRef}
              onClick={scrollToContact}
              className="px-7 py-4 rounded-none text-xs font-bold tracking-widest uppercase text-purple-950 dark:text-zinc-200 glass-panel hover:glass-panel-interactive border border-purple-500/20 hover:border-pink-500/40 transition-all duration-300 flex items-center gap-2 shadow-glass-light"
            >
              <span>LET&apos;S TALK</span>
              <MessageSquare className="w-4 h-4 text-pink-500" />
            </button>
          </div>
        </div>

        {/* Right Video Player with Audio Controls */}
        <div className="lg:col-span-5 relative flex items-center justify-center w-full py-2 group">
          <div className="relative flex items-center justify-center max-w-[280px] sm:max-w-[340px] lg:max-w-[360px]">
            <video
              ref={videoRef}
              src="/mascot-video.mp4"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              onClick={toggleAudio}
              className="w-full h-auto max-h-[340px] sm:max-h-[400px] object-contain mix-blend-multiply cursor-pointer transition-all duration-300"
            />

            {/* Sound Toggle Button Badge */}
            <button
              onClick={toggleAudio}
              className="absolute bottom-2 right-2 z-30 px-3 py-1.5 rounded-none bg-[#3B0764] text-white text-[10px] sm:text-[11px] font-extrabold tracking-wider uppercase flex items-center gap-1.5 border border-purple-400/40 shadow-2xl hover:bg-pink-600 transition-all cursor-pointer"
              aria-label="Toggle Audio"
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-pink-400" />
                  <span>UNMUTE AUDIO</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span>AUDIO ON 🔊</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
