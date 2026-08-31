'use client';

import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lightbulb, Compass, Code, Rocket, TrendingUp, ArrowDown, ChevronRight } from 'lucide-react';

const IdeaToImpact3DCanvas = dynamic(
  () => import('./IdeaToImpact3DCanvas').then((mod) => mod.IdeaToImpact3DCanvas),
  { ssr: false }
);

interface StageItem {
  id: number;
  label: string;
  sub: string;
  icon: React.ReactNode;
}

const stages: StageItem[] = [
  { id: 0, label: 'IDEA', sub: 'Conceptualizing market demand & vision', icon: <Lightbulb className="w-5 h-5" /> },
  { id: 1, label: 'DESIGN', sub: 'Sculpting seamless UX & glass system', icon: <Compass className="w-5 h-5" /> },
  { id: 2, label: 'BUILD', sub: 'High-performance Next.js & 3D architecture', icon: <Code className="w-5 h-5" /> },
  { id: 3, label: 'LAUNCH', sub: 'Optimized deployment & global CDN delivery', icon: <Rocket className="w-5 h-5" /> },
  { id: 4, label: 'GROW', sub: 'Iterative scaling & AI workflow automation', icon: <TrendingUp className="w-5 h-5" /> },
];

export function IdeaToImpactSection() {
  const [activeStage, setActiveStage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top center+=100',
        end: 'bottom center-=100',
        scrub: 0.3,
        onUpdate: (self) => {
          const index = Math.min(Math.floor(self.progress * 5), 4);
          setActiveStage(index);
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  // Compute percentage height for the passing arrow on the connector line (0% to 100%)
  const arrowPositionPercent = (activeStage / 4) * 100;

  return (
    <section
      id="idea-to-impact"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center py-24 px-4 md:px-8 overflow-hidden transition-colors duration-300"
    >
      <div className="ambient-glow-1 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto w-full z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-none glass-panel border border-luxury-lavender/30 text-[11px] font-bold tracking-widest text-ebony dark:text-silk-100 uppercase mb-4 shadow-glass-silk">
            PRODUCT EVOLUTION
          </div>
          <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tight text-ebony dark:text-silk-100">
            FROM IDEA <span className="text-gradient-hero italic font-normal">TO IMPACT.</span>
          </h2>
          <p className="text-ebony-muted dark:text-text-secondary text-sm md:text-base mt-3 font-medium">
            Watch your product transform from raw concept into a high-performance market engine.
          </p>
        </div>

        {/* Grid Layout: Dynamic Connector Track + Stages Navigation + 3D Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Stages List with Dynamic Passing Arrow Track */}
          <div className="lg:col-span-6 relative pl-8 md:pl-10">
            {/* Dynamic Vertical Connector Rail */}
            <div className="absolute left-3.5 md:left-4 top-6 bottom-6 w-1 bg-purple-900/15 dark:bg-white/10 rounded-full overflow-hidden">
              {/* Active Animated Energy Beam */}
              <div
                className="w-full bg-gradient-to-b from-purple-600 via-pink-600 to-rose-600 transition-all duration-500 ease-out"
                style={{ height: `${arrowPositionPercent}%` }}
              />
            </div>

            {/* Dynamic Passing Arrow Head Indicator */}
            <div
              className="absolute left-1 md:left-1.5 w-6 h-6 rounded-full bg-[#3B0764] dark:bg-purple-500 border-2 border-white dark:border-ebony text-white flex items-center justify-center shadow-lg transition-all duration-500 ease-out z-20"
              style={{ top: `calc(${arrowPositionPercent}% * 0.85 + 16px)` }}
            >
              <ArrowDown className="w-3.5 h-3.5 animate-bounce text-pink-300" />
            </div>

            {/* Stage Boxes */}
            <div className="flex flex-col gap-5">
              {stages.map((stage, idx) => {
                const isActive = activeStage === stage.id;
                const isPassed = activeStage >= stage.id;

                return (
                  <div
                    key={stage.id}
                    onClick={() => setActiveStage(stage.id)}
                    className={`cursor-pointer p-6 rounded-none transition-all duration-300 flex items-center justify-between border-2 relative overflow-hidden group ${
                      isActive
                        ? 'bg-white dark:bg-[#120E1F] border-purple-600 dark:border-purple-400 shadow-2xl scale-[1.02]'
                        : isPassed
                        ? 'bg-white/90 dark:bg-ebony-light/80 border-purple-900/25 dark:border-purple-500/20 shadow-md'
                        : 'bg-white/70 dark:bg-ebony-light/40 border-purple-900/10 dark:border-white/5 opacity-70 hover:opacity-100'
                    }`}
                  >
                    {/* Left Active Accent Bar */}
                    {isActive && (
                      <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-gradient-to-b from-purple-600 to-rose-600" />
                    )}

                    <div className="flex items-center gap-4">
                      {/* Icon */}
                      <div
                        className={`p-3.5 rounded-none transition-all duration-300 ${
                          isActive
                            ? 'bg-[#3B0764] text-white shadow-md'
                            : 'bg-purple-100 dark:bg-white/10 text-purple-950 dark:text-purple-300'
                        }`}
                      >
                        {stage.icon}
                      </div>

                      {/* Label & Subtitle */}
                      <div>
                        <div className="flex items-center gap-2">
                          <h4
                            className={`font-serif text-xl font-bold ${
                              isActive ? 'text-purple-950 dark:text-white' : 'text-purple-900/80 dark:text-zinc-300'
                            }`}
                          >
                            {stage.label}
                          </h4>
                          {isActive && (
                            <ChevronRight className="w-4 h-4 text-pink-600 dark:text-pink-400 animate-pulse" />
                          )}
                        </div>
                        <p className="text-xs text-purple-900/70 dark:text-zinc-400 font-medium mt-0.5">
                          {stage.sub}
                        </p>
                      </div>
                    </div>

                    {/* Stage Number Badge */}
                    <span
                      className={`font-mono text-xs px-3 py-1.5 font-bold tracking-wider rounded-none border transition-colors ${
                        isActive
                          ? 'bg-purple-950 text-white border-purple-800'
                          : 'bg-purple-100/70 dark:bg-white/10 text-purple-950 dark:text-purple-200 border-purple-300/60 dark:border-white/20'
                      }`}
                    >
                      STAGE 0{stage.id + 1}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right 3D Visualizer */}
          <div className="lg:col-span-6 h-[420px] md:h-[520px] rounded-none bg-white dark:bg-[#120E1F] border-2 border-purple-900/20 dark:border-purple-400/30 shadow-2xl relative overflow-hidden flex items-center justify-center">
            <IdeaToImpact3DCanvas activeStage={activeStage} />

            {/* Stage Indicator Overlay */}
            <div className="absolute bottom-6 left-6 right-6 px-6 py-3.5 rounded-none bg-white/90 dark:bg-ebony/90 border border-purple-900/20 flex items-center justify-between pointer-events-none shadow-md backdrop-blur-md">
              <span className="text-xs font-bold tracking-widest text-purple-950 dark:text-purple-300 uppercase">
                ACTIVE STAGE: {stages[activeStage].label}
              </span>
              <span className="text-xs font-mono font-bold text-purple-900 dark:text-zinc-300">
                {activeStage + 1} / 5 STAGES
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
