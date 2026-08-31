'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CaseStudyModal, ProjectData } from './CaseStudyModal';
import { ArrowUpRight } from 'lucide-react';

const projects: ProjectData[] = [
  {
    id: 'nexus-ai',
    name: 'Nexus AI Copilot Platform',
    category: 'AI Solution & SaaS',
    description: 'Enterprise intelligence engine unifying real-time document search, automated workflow triggers, and custom LLM routing.',
    fullOverview: 'Nexus AI required an enterprise-grade platform capable of indexing millions of unstructured documents while providing instant sub-second AI answers.',
    challenge: 'High latency query pipelines and complex permissions models across multi-tenant corporate databases.',
    solution: 'Engineered a vector index architecture with Next.js App Router, WebSockets streaming, and GPU-accelerated RAG pipelines.',
    techStack: ['Next.js', 'TypeScript', 'Vector DB', 'Tailwind', 'RAG Pipeline'],
    image: '/projects/nexus.jpg',
    outcomes: ['Sub-200ms semantic search', 'Role-based access control', 'Automated document ingestion'],
  },
  {
    id: 'vortex-fintech',
    name: 'Vortex Global Wealth',
    category: 'Custom Software & Web App',
    description: 'High-frequency wealth portal displaying live portfolio analytics, automated rebalancing, and dark glass financial visuals.',
    fullOverview: 'Vortex sought a modern digital overhaul to replace legacy portals with an intuitive financial platform.',
    challenge: 'Handling real-time WebSocket ticker updates without triggering main thread UI lag or frame drops.',
    solution: 'Built a lightweight React state engine synced with HTML5 Canvas charting and micro-animations.',
    techStack: ['React', 'TypeScript', 'WebSockets', 'Canvas API', 'Tailwind'],
    image: '/projects/vortex.jpg',
    outcomes: ['Zero-lag 60fps chart rendering', 'Bank-grade AES encryption', 'Mobile responsive web app'],
  },
  {
    id: 'aura-studio',
    name: 'Aura Luxury Design System',
    category: 'Website Development & UI/UX',
    description: 'Immersive digital flagship experience for an international architectural studio featuring 3D product embeds.',
    fullOverview: 'Aura needed an Awwwards-caliber digital presence to present multi-million dollar architectural renders.',
    challenge: 'Heavy 3D asset file sizes causing page load bottlenecks on high-DPI displays.',
    solution: 'Designed a procedural Three.js glass background combined with Lenis smooth scrolling and WebP image masks.',
    techStack: ['Next.js', 'Three.js', 'GSAP', 'Lenis', 'Tailwind CSS'],
    image: '/projects/aura.jpg',
    outcomes: ['Awwwards nominated design', 'Sub-second initial paint', 'Smooth 3D interactive renders'],
  },
  {
    id: 'pulse-automate',
    name: 'Pulse Business Automation Suite',
    category: 'Business Automation',
    description: 'Centralized operational dashboard connecting CRM, invoicing, and logistics pipelines into zero-click workflows.',
    fullOverview: 'Pulse needed to eliminate manual data entry across five disparate enterprise tools.',
    challenge: 'Inconsistent REST API contracts and fragmented authentication models.',
    solution: 'Designed a unified API middleware gateway with real-time health monitoring and automated retry mechanisms.',
    techStack: ['Next.js', 'Node.js', 'GraphQL', 'Tailwind CSS'],
    image: '/projects/pulse.jpg',
    outcomes: ['85% reduction in manual data tasks', 'Real-time error notifications', 'End-to-end audit logging'],
  },
];

export function PortfolioSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const target = targetRef.current;
    const trigger = triggerRef.current;
    if (!target || !trigger) return;

    const isMobile = window.innerWidth < 1024;
    if (isMobile) return;

    const ctx = gsap.context(() => {
      const scrollWidth = target.scrollWidth - window.innerWidth + 80;

      gsap.to(target, {
        x: -scrollWidth,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: trigger,
          start: 'top top+=60',
          end: () => `+=${scrollWidth * 0.8}`,
          pin: true,
          anticipatePin: 1,
          fastScrollEnd: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
        },
      });
    }, trigger);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={triggerRef} className="relative py-24 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-purple-500/20 text-[11px] font-bold tracking-widest text-purple-800 dark:text-purple-300 uppercase mb-4 shadow-glass-light">
              SELECTED WORK
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-extrabold tracking-tight text-purple-950 dark:text-white leading-tight">
              WORK THAT <span className="text-gradient-hero">SPEAKS FOR ITSELF.</span>
            </h2>
          </div>
          <p className="text-purple-900/70 dark:text-text-secondary text-sm md:text-base max-w-md font-medium">
            Every project is built around a clear business goal—not just a beautiful interface.
          </p>
        </div>
      </div>

      {/* Track */}
      <div className="w-full overflow-hidden">
        <div
          ref={targetRef}
          className="flex flex-col lg:flex-row gap-8 px-4 md:px-8 max-w-7xl lg:max-w-none mx-auto lg:mx-0 w-full lg:w-max"
        >
          {projects.map((project) => (
            <div
              key={project.id}
              data-cursor="project"
              onClick={() => setSelectedProject(project)}
              className="w-full lg:w-[500px] xl:w-[560px] flex-shrink-0 cursor-pointer group glass-panel-interactive p-6 md:p-8 rounded-3xl flex flex-col justify-between shadow-glass-light"
            >
              <div>
                {/* Visual Glass Showcase Header */}
                <div className="w-full h-56 md:h-64 rounded-2xl overflow-hidden mb-6 relative border border-purple-500/20 bg-gradient-to-br from-purple-200/40 via-pink-100/30 to-white dark:from-purple-900/40 dark:to-bg-card flex items-center justify-center group-hover:border-pink-500/50 transition-colors">
                  <div className="text-center p-6 transform group-hover:scale-105 transition-transform duration-500">
                    <span className="text-xs font-mono tracking-widest text-purple-700 dark:text-purple-400 block mb-2 font-bold">CASE STUDY</span>
                    <span className="font-display text-2xl font-bold text-purple-950 dark:text-white block">{project.name}</span>
                  </div>
                  <div className="absolute inset-0 bg-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                </div>

                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold tracking-wider text-purple-800 dark:text-purple-400 uppercase">
                    {project.category}
                  </span>
                  <div className="w-8 h-8 rounded-full glass-panel flex items-center justify-center group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-display text-2xl font-bold text-purple-950 dark:text-white mb-3 group-hover:text-pink-600 dark:group-hover:text-purple-300 transition-colors">
                  {project.name}
                </h3>

                <p className="text-purple-900/80 dark:text-text-secondary text-sm leading-relaxed mb-6 font-medium">
                  {project.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                  {project.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-full text-[11px] font-medium text-zinc-300 bg-white/5 border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-purple-300 group-hover:text-white transition-colors">
                  <span>View Case Study</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
