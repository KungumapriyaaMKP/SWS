'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShieldCheck, Layers, Sparkles, Handshake } from 'lucide-react';

interface StackCardItem {
  number: string;
  title: string;
  quote: string;
  description: string;
  icon: React.ReactNode;
  accentGradient: string;
}

const stackCards: StackCardItem[] = [
  {
    number: '01',
    title: 'BUSINESS FIRST',
    quote: "“We don't build technology for the sake of technology.”",
    description: 'Every line of code, architecture decision, and UX detail is aligned directly with revenue, conversion, and market growth.',
    icon: <ShieldCheck className="w-7 h-7 text-purple-600 dark:text-purple-300" />,
    accentGradient: 'from-purple-600 via-pink-600 to-rose-600',
  },
  {
    number: '02',
    title: 'BUILT TO SCALE',
    quote: '“Architecture designed for where your business is going.”',
    description: 'Clean modular codebases built with modern cloud-native backend APIs and micro-animations designed to handle scale effortlessly.',
    icon: <Layers className="w-7 h-7 text-indigo-600 dark:text-indigo-300" />,
    accentGradient: 'from-indigo-600 via-purple-600 to-pink-600',
  },
  {
    number: '03',
    title: 'DESIGN + ENGINEERING',
    quote: '“Beautiful interfaces backed by solid engineering.”',
    description: 'We eliminate the gap between design and engineering. You get Awwwards-grade visuals powered by rock-solid system architecture.',
    icon: <Sparkles className="w-7 h-7 text-pink-600 dark:text-purple-300" />,
    accentGradient: 'from-pink-600 via-rose-600 to-purple-600',
  },
  {
    number: '04',
    title: 'EVERY STAGE SUPPORT',
    quote: '“Our hands-on engineering support is right beside you at every stage of your product building.”',
    description: 'From Day 1 discovery, UI wireframing, and 3D full-stack build to post-launch scaling—our senior team guides, supports, and refines your product at every step of the journey.',
    icon: <Handshake className="w-7 h-7 text-rose-600 dark:text-rose-300" />,
    accentGradient: 'from-purple-700 via-indigo-600 to-pink-600',
  },
];

export function WhySumyaSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const cards = container.querySelectorAll('.stack-card-item');

      cards.forEach((card, index) => {
        if (index < cards.length - 1) {
          gsap.to(card, {
            scale: 0.93 + index * 0.015,
            opacity: 0.75,
            ease: 'none',
            scrollTrigger: {
              trigger: cards[index + 1],
              start: 'top center+=120',
              end: 'top center-=20',
              scrub: true,
            },
          });
        }
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section id="why-sumya" ref={containerRef} className="relative py-28 px-4 md:px-8 transition-colors duration-300">
      <div className="ambient-glow-2 top-10 right-10" />

      <div className="max-w-4xl mx-auto z-10">
        {/* Header */}
        <div className="mb-20 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-purple-500/20 text-[11px] font-bold tracking-widest text-purple-800 dark:text-purple-300 uppercase mb-4 shadow-glass-light">
            OUR DIFFERENCE
          </div>
          <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tight text-purple-950 dark:text-white">
            WHY <span className="text-gradient-hero italic font-normal">SUMYA?</span>
          </h2>
          <p className="text-purple-900/70 dark:text-text-secondary text-sm md:text-base mt-3 font-medium">
            Engineered for ambitious companies that demand high performance, clear messaging, and technical precision.
          </p>
        </div>

        {/* Stacked Cards Container */}
        <div className="relative space-y-12 pb-24">
          {stackCards.map((card, index) => (
            <div
              key={card.number}
              style={{ top: `${110 + index * 28}px` }}
              className="stack-card-item sticky rounded-3xl p-8 md:p-12 bg-white/95 dark:bg-[#120B24]/95 border border-purple-900/10 dark:border-purple-500/20 shadow-[0_20px_60px_-15px_rgba(59,7,100,0.08)] backdrop-blur-xl transition-transform duration-300 overflow-hidden"
            >
              {/* Top Accent Gradient Bar */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${card.accentGradient}`} />

              <div className="flex items-center justify-between gap-6 mb-6">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#3B0764] via-purple-700 to-pink-600 dark:from-purple-300 dark:via-pink-300 dark:to-pink-400">
                    {card.number}
                  </span>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-purple-950 dark:text-white">
                    {card.title}
                  </h3>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-950/80 dark:to-purple-900/50 border border-purple-200 dark:border-purple-500/30 flex items-center justify-center shadow-sm flex-shrink-0">
                  {card.icon}
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-pink-600 dark:text-pink-300 font-serif font-bold text-base md:text-lg italic">
                  {card.quote}
                </p>

                <p className="text-purple-900/80 dark:text-zinc-300 text-sm md:text-base leading-relaxed font-medium">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
