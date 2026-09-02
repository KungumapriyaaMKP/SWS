'use client';

import { ShieldCheck, Code, Globe, Cpu, Server, Terminal } from 'lucide-react';

interface MetricItem {
  value: string;
  label: string;
  sub: string;
}

const metrics: MetricItem[] = [
  { value: '99.8%', label: 'Lighthouse Performance Goal', sub: 'GPU & Edge Optimized' },
  { value: '100%', label: 'Full-Stack Architecture Coverage', sub: 'Production Grade Standards' },
  { value: '24/7', label: 'Continuous System Reliability', sub: 'Cloud & API Monitoring' },
  { value: '0.2s', label: 'Average Interaction Latency', sub: 'Ultra Fast Load Times' },
];

const capabilities = [
  { name: 'Web Applications', icon: <Globe className="w-6 h-6 text-luxury-deepviolet dark:text-purple-300" /> },
  { name: 'AI & LLM Workflows', icon: <Cpu className="w-6 h-6 text-luxury-dustyrose dark:text-pink-300" /> },
  { name: 'Custom Software', icon: <Terminal className="w-6 h-6 text-luxury-deepviolet dark:text-purple-300" /> },
  { name: 'Cloud & API Gateways', icon: <Server className="w-6 h-6 text-luxury-sage dark:text-emerald-300" /> },
  { name: 'Awwwards Design Systems', icon: <Code className="w-6 h-6 text-luxury-dustyrose dark:text-pink-300" /> },
  { name: 'Enterprise Automation', icon: <ShieldCheck className="w-6 h-6 text-luxury-gold dark:text-amber-300" /> },
];

export function SocialProofSection() {
  return (
    <section className="relative py-20 px-4 md:px-8 border-y border-luxury-lavender/15 transition-colors duration-300">
      <div className="max-w-7xl mx-auto z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-serif text-2xl md:text-4xl font-bold text-ebony dark:text-silk-100">
            BUILT FOR AMBITIOUS BUSINESSES.
          </h2>
          <p className="text-ebony-muted dark:text-text-secondary text-sm md:text-base mt-2 font-medium">
            Engineered using modern web standards and verified technical benchmarks.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {metrics.map((metric, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 rounded-none text-center border border-luxury-lavender/25 hover:border-luxury-dustyrose/50 transition-colors shadow-glass-silk"
            >
              <div className="font-serif text-3xl md:text-5xl font-bold text-gradient-hero mb-2">
                {metric.value}
              </div>
              <div className="text-sm font-bold text-ebony dark:text-silk-100 mb-1">{metric.label}</div>
              <div className="text-xs text-ebony-muted dark:text-text-secondary font-medium">{metric.sub}</div>
            </div>
          ))}
        </div>

        {/* Capabilities Matrix (Dynamic Horizontal Marquee Ticker) */}
        <div className="p-8 rounded-none glass-panel border border-luxury-lavender/25 shadow-glass-silk bg-white/80 dark:bg-ebony-light/80 overflow-hidden relative">
          <div className="text-xs font-bold tracking-widest text-ebony dark:text-silk-100 uppercase mb-8 text-center">
            CORE TECHNOLOGIES & DOMAIN CAPABILITIES
          </div>

          <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="flex gap-4 animate-marquee py-2">
              {[...capabilities, ...capabilities, ...capabilities].map((cap, i) => (
                <div
                  key={i}
                  className="w-48 sm:w-56 p-5 rounded-none glass-panel border border-luxury-lavender/25 flex flex-col items-center justify-center text-center gap-3 hover:border-luxury-dustyrose/50 transition-all bg-white dark:bg-ebony/90 shadow-xs flex-shrink-0 cursor-pointer hover:scale-105"
                >
                  {cap.icon}
                  <span className="text-xs font-bold text-ebony dark:text-silk-100 leading-snug whitespace-nowrap">
                    {cap.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
