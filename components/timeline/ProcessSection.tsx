'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
    details: ['Next.js App Router Architecture', '3D Model & WebGL Canvas Integration', 'GSAP Smooth Micro-Animations'],
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
    <section id="process" ref={containerRef} className="relative py-24 px-4 md:px-8 bg-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto z-10">
        {/* Header */}
        <div className="mb-16 text-center max-w-3xl mx-auto">
          {/* Highlight Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3B0764] text-white text-xs font-bold tracking-widest uppercase mb-4 shadow-lg border border-purple-400/30">
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
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-purple-900/10 -translate-x-1/2 rounded-full" />

          {/* Animated Glowing Progress Line */}
          <div
            ref={lineRef}
            className="absolute left-4 md:left-1/2 top-0 w-1 bg-gradient-to-b from-purple-600 via-pink-600 to-rose-600 -translate-x-1/2 rounded-full shadow-md"
            style={{ height: '0%' }}
          />

          {/* Timeline Cards */}
          <div className="space-y-12">
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
                  <div className="absolute left-4 md:left-1/2 top-8 -translate-x-1/2 w-8 h-8 rounded-full bg-[#3B0764] border-2 border-white text-white flex items-center justify-center shadow-lg z-20">
                    <div className="w-2.5 h-2.5 rounded-full bg-pink-400 animate-pulse" />
                  </div>

                  {/* Card Content */}
                  <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-8">
                    <div className="process-card bg-white border border-purple-900/15 p-6 md:p-8 rounded-3xl relative shadow-xl hover:border-purple-600/40 transition-all duration-300">
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-mono text-sm font-extrabold tracking-wider text-white bg-[#3B0764] px-3 py-1 rounded-full shadow-sm">
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
                            <span className="w-1.5 h-1.5 rounded-full bg-[#3B0764]" />
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
