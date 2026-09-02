'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

interface ProcessStep {
  number: string;
  dayTag: string;
  title: string;
  description: string;
  details: string[];
}

const steps: ProcessStep[] = [
  {
    number: '01',
    dayTag: 'DAY 1',
    title: 'DISCOVER & BLUEPRINT',
    description: 'Understand business goals, target audience, and technical scope.',
    details: ['Stakeholder Alignment Workshop', 'Competitive Audit & Positioning', 'Technical Architecture & Sitemap'],
  },
  {
    number: '02',
    dayTag: 'DAY 2',
    title: 'UI/UX & WIREFRAMING',
    description: 'Design user journeys and high-converting glass visual layouts.',
    details: ['High-Conversion Wireframing', 'Typography & Brand Color System', 'Interactive User Flow Prototype'],
  },
  {
    number: '03',
    dayTag: 'DAYS 3 - 4',
    title: '3D & FULL-STACK BUILD',
    description: 'High-speed Next.js, 3D WebGL asset integration, and micro-interactions.',
    details: ['High-Performance Web Architecture', '3D Interactive Model Integration', 'Smooth Micro-Animations'],
  },
  {
    number: '04',
    dayTag: 'DAYS 5 - 6',
    title: 'QA, SPEED & LIGHTHOUSE 90+',
    description: 'Rigorous speed optimization, mobile responsiveness, and SEO tuning.',
    details: ['Sub-Second Load Speed Tuning', 'Cross-Browser & Mobile QA Audit', 'SEO Metadata & OpenGraph Ingestion'],
  },
  {
    number: '05',
    dayTag: 'DAY 7',
    title: 'GO LIVE & HANDOFF',
    description: 'Deploy to global CDN network and execute official project launch.',
    details: ['Global Edge CDN Deployment', 'Lighthouse 90+ Certification', 'Complete Handoff & Launch Support'],
  },
];

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top center+=100',
        end: 'bottom center+=100',
        scrub: 0.3,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const lineFillPercent = Math.min(100, Math.max(0, scrollProgress * 100));

  return (
    <section id="process" ref={containerRef} className="relative py-24 px-4 md:px-8 bg-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto z-10">
        {/* Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          {/* Highlight Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-none bg-[#3B0764] text-white text-xs font-bold tracking-widest uppercase mb-4 shadow-lg border border-purple-400/30">
            <span>⚡ DELIVERED WITHIN 7 DAYS</span>
          </div>

          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-purple-950">
            HOW WE <span className="text-gradient-hero italic font-normal">BUILD.</span>
          </h2>

          <p className="text-purple-900/70 text-xs md:text-sm mt-3 font-medium max-w-xl mx-auto">
            A structured 7-day engineering sprint designed for high speed, premium quality, and guaranteed launch predictability.
          </p>
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Background Empty Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1.5 bg-purple-900/10 -translate-x-1/2 rounded-none" />

          {/* Dynamic Traveling Beam Line */}
          <div
            className="absolute left-4 md:left-1/2 top-0 w-1 bg-gradient-to-b from-[#3B0764] via-purple-600 to-pink-500 -translate-x-1/2 rounded-none shadow-md transition-all duration-150 ease-out"
            style={{ height: `${lineFillPercent}%` }}
          />

          {/* Sleek Traveling Indicator Badge */}
          <div
            className="absolute left-4 md:left-1/2 -translate-x-1/2 w-7 h-7 rounded-none bg-[#3B0764] border-2 border-pink-400 text-white flex items-center justify-center shadow-lg shadow-purple-950/40 z-30 transition-all duration-150 ease-out"
            style={{ top: `calc(${lineFillPercent}% - 14px)` }}
          >
            <ChevronDown className="w-4 h-4 text-pink-300 animate-pulse" />
          </div>

          {/* Timeline Cards */}
          <div className="space-y-12">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              const isPassed = lineFillPercent >= (idx / (steps.length - 1)) * 90;

              return (
                <div
                  key={step.number}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Node Icon/Dot */}
                  <div
                    className={`absolute left-4 md:left-1/2 top-8 -translate-x-1/2 w-8 h-8 rounded-none border-2 transition-all duration-300 flex items-center justify-center z-20 ${
                      isPassed
                        ? 'bg-[#3B0764] border-pink-500 scale-110 shadow-lg shadow-purple-900/30'
                        : 'bg-purple-100 border-purple-300 text-purple-900'
                    }`}
                  >
                    <div
                      className={`w-2.5 h-2.5 rounded-none transition-colors duration-300 ${
                        isPassed ? 'bg-pink-400 animate-pulse' : 'bg-purple-400'
                      }`}
                    />
                  </div>

                  {/* Card Content */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                    <div
                      className={`process-card bg-white border p-6 md:p-8 rounded-none relative shadow-xl transition-all duration-300 ${
                        isPassed
                          ? 'border-purple-600 shadow-2xl scale-[1.01]'
                          : 'border-purple-900/15 hover:border-purple-600/40'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-mono text-sm font-extrabold tracking-wider text-white bg-[#3B0764] px-3 py-1 rounded-none shadow-sm">
                          {step.dayTag}
                        </span>
                        <span className="text-[11px] font-extrabold tracking-wider text-purple-900/60 uppercase font-mono">
                          PHASE {step.number}
                        </span>
                      </div>

                      <h3 className="font-serif text-xl md:text-2xl font-bold text-purple-950 mb-2">
                        {step.title}
                      </h3>

                      <p className="text-purple-900/80 text-xs md:text-sm leading-relaxed mb-5 font-medium">
                        {step.description}
                      </p>

                      <div className="space-y-2 pt-4 border-t border-purple-900/10">
                        {step.details.map((item, i) => (
                          <div key={i} className="flex items-center gap-2.5 text-xs text-purple-950 font-medium">
                            <span
                              className={`w-1.5 h-1.5 rounded-none ${
                                isPassed ? 'bg-pink-500' : 'bg-[#3B0764]'
                              }`}
                            />
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
