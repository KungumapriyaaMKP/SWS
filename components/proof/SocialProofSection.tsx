'use client';

import { ShieldCheck, Code, Globe, Cpu, Server, Terminal } from 'lucide-react';

interface MetricItem {
  value: string;
  label: string;
  sub: string;
}

const metrics: MetricItem[] = [
  { value: '99.8%', label: 'Lighthouse Performance Goal', sub: 'GPU & Edge Optimized' },
  { value: '100%', label: 'TypeScript & Next.js Coverage', sub: 'Production Grade Code' },
  { value: '24/7', label: 'Continuous System Reliability', sub: 'Cloud & API Monitoring' },
  { value: '0.2s', label: 'Average Interaction Latency', sub: 'Ultra Fast Load Times' },
];

const capabilities = [
  { name: 'Web Applications', icon: <Globe className="w-5 h-5 text-purple-400" /> },
  { name: 'AI & LLM Workflows', icon: <Cpu className="w-5 h-5 text-indigo-400" /> },
  { name: 'Custom Software', icon: <Terminal className="w-5 h-5 text-purple-300" /> },
  { name: 'Cloud & API Gateways', icon: <Server className="w-5 h-5 text-indigo-300" /> },
  { name: 'Awwwards Design Systems', icon: <Code className="w-5 h-5 text-purple-400" /> },
  { name: 'Enterprise Automation', icon: <ShieldCheck className="w-5 h-5 text-indigo-400" /> },
];

export function SocialProofSection() {
  return (
    <section className="relative py-20 px-4 md:px-8 border-y border-purple-500/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="font-display text-2xl md:text-4xl font-extrabold text-purple-950 dark:text-white">
            BUILT FOR AMBITIOUS BUSINESSES.
          </h2>
          <p className="text-purple-900/70 dark:text-text-secondary text-sm md:text-base mt-2 font-medium">
            Engineered using modern web standards and verified technical benchmarks.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {metrics.map((metric, idx) => (
            <div
              key={idx}
              className="glass-panel p-6 rounded-2xl text-center border border-purple-500/15 hover:border-pink-500/30 transition-colors shadow-glass-light"
            >
              <div className="font-display text-3xl md:text-5xl font-extrabold text-gradient-hero mb-2">
                {metric.value}
              </div>
              <div className="text-sm font-bold text-purple-950 dark:text-white mb-1">{metric.label}</div>
              <div className="text-xs text-purple-900/70 dark:text-text-secondary font-medium">{metric.sub}</div>
            </div>
          ))}
        </div>

        {/* Capabilities Matrix */}
        <div className="p-8 rounded-3xl glass-panel border border-purple-500/15 shadow-glass-light">
          <div className="text-xs font-bold tracking-widest text-purple-800 dark:text-purple-300 uppercase mb-6 text-center">
            CORE TECHNOLOGIES & DOMAIN CAPABILITIES
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {capabilities.map((cap, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-white/3 border border-white/5 flex flex-col items-center justify-center text-center gap-2 hover:bg-white/6 hover:border-purple-500/30 transition-all"
              >
                {cap.icon}
                <span className="text-xs font-semibold text-zinc-200">{cap.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
