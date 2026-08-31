'use client';

import { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lightbulb, Compass, Code, Rocket, TrendingUp } from 'lucide-react';

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

  return (
    <section
      id="idea-to-impact"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center py-20 px-4 md:px-8 overflow-hidden transition-colors duration-300"
    >
      <div className="ambient-glow-1 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto w-full z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-purple-500/20 text-[11px] font-bold tracking-widest text-purple-800 dark:text-purple-300 uppercase mb-4 shadow-glass-light">
            PRODUCT EVOLUTION
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-purple-950 dark:text-white">
            FROM IDEA <span className="text-gradient-hero">TO IMPACT.</span>
          </h2>
          <p className="text-purple-900/70 dark:text-text-secondary text-sm md:text-base mt-3 font-medium">
            Watch your product transform from raw concept into a high-performance market engine.
          </p>
        </div>

        {/* Grid Layout: Stages Navigation + 3D Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left / Top Stage Selector */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {stages.map((stage) => {
              const isActive = activeStage === stage.id;
              return (
                <div
                  key={stage.id}
                  onClick={() => setActiveStage(stage.id)}
                  className={`cursor-pointer p-5 rounded-2xl transition-all duration-500 flex items-center justify-between border ${
                    isActive
                      ? 'glass-panel bg-gradient-to-r from-purple-500/15 to-pink-500/15 border-purple-500/50 shadow-rose-glow scale-[1.02]'
                      : 'glass-panel opacity-70 hover:opacity-100 hover:border-purple-500/30'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3.5 rounded-xl transition-colors ${
                        isActive ? 'bg-gradient-to-r from-purple-600 to-rose-600 text-white shadow-rose-glow' : 'bg-purple-500/10 text-purple-700 dark:text-purple-300'
                      }`}
                    >
                      {stage.icon}
                    </div>
                    <div>
                      <h4 className={`font-display text-lg font-bold ${isActive ? 'text-purple-950 dark:text-white' : 'text-purple-900/80 dark:text-zinc-300'}`}>
                        {stage.label}
                      </h4>
                      <p className="text-xs text-purple-900/60 dark:text-text-secondary font-medium">{stage.sub}</p>
                    </div>
                  </div>

                  <span
                    className={`font-mono text-xs px-2.5 py-1 rounded-full border ${
                      isActive
                        ? 'bg-rose-500/20 border-rose-400 text-rose-700 dark:text-rose-300 font-bold'
                        : 'bg-purple-500/5 border-purple-500/10 text-purple-800 dark:text-zinc-400'
                    }`}
                  >
                    STAGE 0{stage.id + 1}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Right 3D Visualizer */}
          <div className="lg:col-span-7 h-[400px] md:h-[500px] rounded-3xl glass-panel border border-white/10 relative overflow-hidden flex items-center justify-center">
            <IdeaToImpact3DCanvas activeStage={activeStage} />

            {/* Stage Indicator Overlay */}
            <div className="absolute bottom-6 left-6 right-6 px-6 py-3 rounded-xl glass-panel border border-white/10 flex items-center justify-between pointer-events-none">
              <span className="text-xs font-semibold tracking-wider text-purple-300">
                ACTIVE GEOMETRY MODEL: {stages[activeStage].label}
              </span>
              <span className="text-xs font-mono text-zinc-400">
                {activeStage + 1} / 5 STAGES
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
