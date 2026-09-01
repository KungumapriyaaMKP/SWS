'use client';

import { CheckCircle } from 'lucide-react';

export function AboutSection() {
  return (
    <section id="about" className="relative py-24 px-4 md:px-8 overflow-hidden transition-colors duration-300">
      <div className="ambient-glow-1 bottom-10 left-10" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        {/* Left Column Text */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-purple-500/20 text-[11px] font-bold tracking-widest text-purple-800 dark:text-purple-300 uppercase shadow-glass-light">
            ABOUT SUMYA
          </div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-purple-950 dark:text-white leading-tight">
            SMALL STUDIO.{' '}
            <span className="text-gradient-hero inline-block">BIG DIGITAL THINKING.</span>
          </h2>

          <p className="font-serif text-lg md:text-xl text-purple-950 leading-relaxed font-bold">
            Sumya Web Studio is a specialized digital product engineering firm. We combine high-end creative direction with deep software engineering to build websites, AI solutions, and custom software that drive measurable business growth.
          </p>

          <p className="font-sans text-base md:text-lg text-zinc-700 leading-relaxed font-medium">
            By keeping our team compact and elite, we eliminate agency bureaucracy. You work directly with senior product designers and software architects dedicated to turning complex problems into elegant, fast, and scalable digital products.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            {[
              'Direct access to senior engineers',
              'AI & custom software specialists',
              'Fast 4-to-8 week delivery cycles',
              '100% clean TypeScript codebases',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-xl glass-panel border border-purple-500/10 shadow-glass-light">
                <CheckCircle className="w-5 h-5 text-rose-500 flex-shrink-0" />
                <span className="text-xs font-bold text-purple-950 dark:text-zinc-200">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Graphic Display - Big Logo & Quote */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center text-center p-6 md:p-8">
          <img
            src="/logo.png"
            alt="Sumya Web Studio Logo"
            className="w-48 md:w-60 h-auto object-contain mb-6 hover:scale-105 transition-transform duration-500"
          />

          <blockquote className="font-serif text-lg md:text-xl font-bold text-purple-950 leading-relaxed italic max-w-md">
            “Our support doesn’t start at launch or end at delivery. We stand beside you at every single stage of building your product, ensuring your vision succeeds.”
          </blockquote>
        </div>
      </div>
    </section>
  );
}
