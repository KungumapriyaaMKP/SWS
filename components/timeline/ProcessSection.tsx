'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  details: string[];
}

const steps: ProcessStep[] = [
  {
    number: '01',
    title: 'DISCOVER',
    description: 'Understand the business, users and goals.',
    details: ['Stakeholder Workshops', 'Competitive Audit', 'Technical Architecture Planning'],
  },
  {
    number: '02',
    title: 'STRATEGIZE',
    description: 'Define the product structure and technology.',
    details: ['User Flow Blueprinting', 'Tech Stack Selection', 'KPI & Conversion Mapping'],
  },
  {
    number: '03',
    title: 'DESIGN',
    description: 'Create the experience and visual system.',
    details: ['Wireframing & UX Testing', 'Glassmorphism Design System', 'Interactive Micro-prototypes'],
  },
  {
    number: '04',
    title: 'DEVELOP',
    description: 'Build, integrate and test.',
    details: ['Next.js & TypeScript Codebase', '3D Scene & GSAP Integration', 'Automated Testing & QA'],
  },
  {
    number: '05',
    title: 'LAUNCH',
    description: 'Deploy, optimize and improve.',
    details: ['Global Edge Deployment', 'Lighthouse 90+ Auditing', 'Continuous Iteration & Growth'],
  },
];

export function ProcessSection() {
  const lineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const line = lineRef.current;
    if (!container || !line) return;

    const ctx = gsap.context(() => {
      // Timeline line fill animation
      gsap.to(line, {
        height: '100%',
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top center+=100',
          end: 'bottom center+=100',
          scrub: 0.5,
        },
      });

      // Individual cards animate in
      const cardEls = container.querySelectorAll('.process-card');
      cardEls.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0.3, y: 30, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            scrollTrigger: {
              trigger: card,
              start: 'top center+=150',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={containerRef} className="relative py-24 px-4 md:px-8 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto z-10">
        {/* Header */}
        <div className="mb-20 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-purple-500/20 text-[11px] font-bold tracking-widest text-purple-800 dark:text-purple-300 uppercase mb-4 shadow-glass-light">
            METHODOLOGY
          </div>
          <h2 className="font-display text-4xl md:text-6xl font-extrabold tracking-tight text-purple-950 dark:text-white">
            HOW WE <span className="text-gradient-hero">BUILD.</span>
          </h2>
          <p className="text-purple-900/70 dark:text-text-secondary text-sm md:text-base mt-3 font-medium">
            A structured 5-phase engineering workflow designed for speed, quality, and predictability.
          </p>
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Background Empty Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-white/10 -translate-x-1/2" />

          {/* Animated Glowing Progress Line */}
          <div
            ref={lineRef}
            className="absolute left-4 md:left-1/2 top-0 w-0.5 bg-gradient-to-b from-purple-500 via-indigo-500 to-purple-400 -translate-x-1/2 shadow-violet-glow"
            style={{ height: '0%' }}
          />

          {/* Timeline Cards */}
          <div className="space-y-16">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={step.number}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Node Icon/Dot */}
                  <div className="absolute left-4 md:left-1/2 top-6 -translate-x-1/2 w-8 h-8 rounded-full bg-bg-darkest border-2 border-purple-500 flex items-center justify-center shadow-violet-glow z-20">
                    <div className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse" />
                  </div>

                  {/* Card Content */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-10">
                    <div className="process-card glass-panel-interactive p-6 md:p-8 rounded-3xl relative">
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-mono text-2xl font-bold text-purple-400">
                          {step.number}
                        </span>
                        <span className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
                          PHASE {step.number}
                        </span>
                      </div>

                      <h3 className="font-display text-2xl font-bold text-white mb-2">
                        {step.title}
                      </h3>

                      <p className="text-text-secondary text-sm leading-relaxed mb-6">
                        {step.description}
                      </p>

                      <div className="space-y-2 pt-4 border-t border-white/10">
                        {step.details.map((item, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-zinc-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
