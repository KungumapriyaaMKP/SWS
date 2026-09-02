'use client';

import { Lightbulb, Compass, Code, Rocket, TrendingUp } from 'lucide-react';
import RadialOrbitalTimeline, { TimelineItem } from '@/components/ui/radial-orbital-timeline';

const timelineData: TimelineItem[] = [
  {
    id: 1,
    title: "IDEA",
    date: "Stage 01",
    content: "Conceptualizing market demand, product vision, and core technical requirements.",
    category: "Ideation",
    icon: Lightbulb,
    relatedIds: [2],
    status: "completed",
    energy: 100,
  },
  {
    id: 2,
    title: "DESIGN",
    date: "Stage 02",
    content: "Sculpting seamless UX, luxury visual design system, and interactive wireframes.",
    category: "Design",
    icon: Compass,
    relatedIds: [1, 3],
    status: "completed",
    energy: 90,
  },
  {
    id: 3,
    title: "BUILD",
    date: "Stage 03",
    content: "High-performance Next.js full-stack development & 3D WebGL architecture.",
    category: "Engineering",
    icon: Code,
    relatedIds: [2, 4],
    status: "in-progress",
    energy: 75,
  },
  {
    id: 4,
    title: "LAUNCH",
    date: "Stage 04",
    content: "Optimized global CDN deployment, SEO verification, and sub-second page performance.",
    category: "Deployment",
    icon: Rocket,
    relatedIds: [3, 5],
    status: "pending",
    energy: 40,
  },
  {
    id: 5,
    title: "GROW",
    date: "Stage 05",
    content: "Iterative scaling, AI workflow automation, analytics tracking, and continuous evolution.",
    category: "Scaling",
    icon: TrendingUp,
    relatedIds: [4],
    status: "pending",
    energy: 20,
  },
];

export function IdeaToImpactSection() {
  return (
    <section
      id="idea-to-impact"
      className="relative min-h-screen flex flex-col justify-center py-16 px-4 md:px-8 overflow-hidden transition-colors duration-300"
    >
      <div className="ambient-glow-1 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-7xl mx-auto w-full z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-none glass-panel border border-luxury-lavender/30 text-[11px] font-bold tracking-widest text-ebony dark:text-silk-100 uppercase mb-4 shadow-glass-silk">
            PRODUCT EVOLUTION
          </div>
          <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tight text-ebony dark:text-silk-100">
            FROM IDEA <span className="text-gradient-hero italic font-normal">TO IMPACT.</span>
          </h2>
          <p className="text-ebony-muted dark:text-text-secondary text-sm md:text-base mt-3 font-medium">
            Click any orbital node to explore the interactive stages of your digital product transformation.
          </p>
        </div>

        {/* 3D Radial Orbital Interactive Timeline */}
        <div className="w-full relative">
          <RadialOrbitalTimeline timelineData={timelineData} />
        </div>
      </div>
    </section>
  );
}
