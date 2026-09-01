'use client';

import { ShieldCheck, Layers, Sparkles, Handshake } from 'lucide-react';

interface ValueCardProps {
  number: string;
  title: string;
  quote: string;
  description: string;
  icon: React.ReactNode;
}

const valueCards: ValueCardProps[] = [
  {
    number: '01',
    title: 'BUSINESS FIRST',
    quote: "“We don't build technology for the sake of technology.”",
    description: 'Every line of code, architecture decision, and UX detail is aligned directly with revenue, conversion, and market growth.',
    icon: <ShieldCheck className="w-7 h-7 text-purple-400" />,
  },
  {
    number: '02',
    title: 'BUILT TO SCALE',
    quote: '“Architecture designed for where your business is going.”',
    description: 'Clean modular codebases built with Next.js, cloud-native backend APIs, and micro-animations designed to handle scale effortlessly.',
    icon: <Layers className="w-7 h-7 text-indigo-400" />,
  },
  {
    number: '03',
    title: 'DESIGN + ENGINEERING',
    quote: '“Beautiful interfaces backed by solid engineering.”',
    description: 'We eliminate the gap between design and engineering. You get Awwwards-grade visuals powered by rock-solid TypeScript architecture.',
    icon: <Sparkles className="w-7 h-7 text-purple-300" />,
  },
  {
    number: '04',
    title: 'EVERY STAGE SUPPORT',
    quote: '“Our hands-on engineering support is right beside you at every stage of your product building.”',
    description: 'From Day 1 discovery, UI wireframing, and 3D full-stack build to post-launch scaling—our senior team guides, supports, and refines your product at every step of the journey.',
    icon: <Handshake className="w-7 h-7 text-indigo-300" />,
  },
];

export function WhySumyaSection() {
  return (
    <section id="why-sumya" className="relative py-24 px-4 md:px-8 overflow-hidden transition-colors duration-300">
      <div className="ambient-glow-2 top-10 right-10" />

      <div className="max-w-7xl mx-auto z-10">
        {/* Header */}
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-purple-500/20 text-[11px] font-bold tracking-widest text-purple-800 dark:text-purple-300 uppercase mb-4 shadow-glass-light">
            OUR DIFFERENCE
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-purple-950 dark:text-white">
            WHY <span className="text-gradient-hero">SUMYA?</span>
          </h2>
          <p className="text-purple-900/70 dark:text-text-secondary text-sm md:text-base mt-3 font-medium">
            Engineered for ambitious companies that demand high performance, clear messaging, and technical precision.
          </p>
        </div>

        {/* 4 Glass Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {valueCards.map((card) => (
            <div
              key={card.number}
              className="glass-panel-interactive p-8 md:p-10 rounded-3xl relative flex flex-col justify-between group shadow-glass-light"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-4xl font-extrabold text-purple-600 dark:text-purple-400">
                    {card.number}
                  </span>
                  <div className="p-3.5 rounded-2xl bg-purple-500/10 dark:bg-white/5 border border-purple-500/20 group-hover:border-pink-500/40 transition-colors">
                    {card.icon}
                  </div>
                </div>

                <h3 className="font-display text-2xl font-bold text-purple-950 dark:text-white mb-3 group-hover:text-pink-600 dark:group-hover:text-purple-300 transition-colors">
                  {card.title}
                </h3>

                <p className="text-pink-600 dark:text-rose-300 font-semibold text-sm italic mb-4">
                  {card.quote}
                </p>

                <p className="text-purple-900/80 dark:text-text-secondary text-sm md:text-base leading-relaxed font-medium">
                  {card.description}
                </p>
              </div>

              {/* Bottom Subtle Glowing Line */}
              <div className="w-full h-1 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent mt-8 group-hover:via-purple-500/80 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
