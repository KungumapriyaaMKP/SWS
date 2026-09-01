'use client';

import { ArrowRight, CheckCircle } from 'lucide-react';

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

          <p className="text-purple-900/80 dark:text-text-secondary text-base md:text-lg leading-relaxed font-medium">
            Sumya Web Studio is a specialized digital product engineering firm. We combine high-end creative direction with deep software engineering to build websites, AI solutions, and custom software that drive measurable business growth.
          </p>

          <p className="text-purple-900/70 dark:text-text-secondary text-sm md:text-base leading-relaxed">
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

          <div className="pt-4">
            <button
              onClick={() => {
                const contact = document.querySelector('#contact');
                if (contact) contact.scrollIntoView({ behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold text-white bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 transition-colors"
            >
              <span>Meet the Studio</span>
              <ArrowRight className="w-4 h-4 text-purple-300" />
            </button>
          </div>
        </div>

        {/* Right Glass Graphic Display with Official Logo */}
        <div className="lg:col-span-5 relative">
          <div className="w-full min-h-[380px] rounded-3xl bg-white border border-purple-900/15 p-8 flex flex-col justify-between relative overflow-hidden shadow-xl hover:border-purple-600/40 transition-all duration-300">
            {/* Top Bar with Logo */}
            <div className="flex items-center justify-between border-b border-purple-900/10 pb-4">
              <div className="flex items-center gap-3">
                <img
                  src="/logo.png"
                  alt="Sumya Web Studio Logo"
                  className="h-10 w-auto object-contain"
                />
                <span className="font-mono text-xs font-bold text-purple-950 tracking-wider">
                  STUDIO MANIFESTO
                </span>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-pink-500 animate-pulse" />
            </div>

            {/* Center Lotus Emblem Watermark & Manifesto Quote */}
            <div className="my-6 relative z-10 flex flex-col items-center text-center">
              <img
                src="/logo.png"
                alt="Sumya Lotus Emblem"
                className="w-20 md:w-24 h-auto object-contain mb-4 opacity-90"
              />

              <blockquote className="font-serif text-lg md:text-xl font-bold text-purple-950 leading-relaxed italic max-w-sm">
                “We build software that works. We turn ideas into products. Designed for people. Engineered for growth.”
              </blockquote>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-xs font-mono font-bold text-purple-900/60 border-t border-purple-900/10 pt-4">
              <span>SUMYA WEB STUDIO</span>
              <span>EST. 2026</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
