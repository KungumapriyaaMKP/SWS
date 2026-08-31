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
      const scrollWidth = target.scrollWidth - window.innerWidth + 100;

      gsap.to(target, {
        x: -scrollWidth,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: trigger,
          start: 'top top+=120',
          end: () => `+=${scrollWidth * 0.75}`,
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
    <section id="work" ref={triggerRef} className="relative py-16 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-none glass-panel border border-luxury-lavender/30 text-[11px] font-bold tracking-widest text-ebony dark:text-silk-100 uppercase mb-3 shadow-glass-silk">
              SELECTED WORK
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-ebony dark:text-silk-100 leading-tight">
              WORK THAT <span className="text-gradient-hero italic font-normal">SPEAKS FOR ITSELF.</span>
            </h2>
          </div>
          <p className="text-ebony-muted dark:text-text-secondary text-sm md:text-base max-w-md font-medium">
            Every project is built around a clear business goal—not just a beautiful interface.
          </p>
        </div>
      </div>

      {/* Track */}
      <div className="w-full overflow-hidden pb-10">
        <div
          ref={targetRef}
          className="flex flex-col lg:flex-row gap-6 px-4 md:px-8 max-w-7xl lg:max-w-none mx-auto lg:mx-0 w-full lg:w-max"
        >
          {projects.map((project) => (
            <div
              key={project.id}
              data-cursor="project"
              onClick={() => setSelectedProject(project)}
              className="w-full lg:w-[440px] xl:w-[480px] flex-shrink-0 cursor-pointer group bg-white dark:bg-[#120E1F] border-2 border-purple-900/20 dark:border-purple-400/30 p-6 rounded-none flex flex-col justify-between shadow-2xl hover:border-purple-600 transition-all duration-300 relative overflow-hidden"
            >
              {/* Top Gradient Accent */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600" />

              <div>
                {/* Visual Glass Showcase Header */}
                <div className="w-full h-36 md:h-40 rounded-none overflow-hidden mb-4 relative border border-purple-900/15 bg-gradient-to-br from-purple-100 via-pink-50 to-white dark:from-purple-950/60 dark:to-ebony flex items-center justify-center group-hover:border-purple-500 transition-colors">
                  <div className="text-center p-3 transform group-hover:scale-105 transition-transform duration-500">
                    <span className="text-[10px] font-mono tracking-widest text-purple-800 dark:text-purple-300 block mb-1 font-bold">
                      CASE STUDY
                    </span>
                    <span className="font-serif text-lg font-bold text-purple-950 dark:text-white block px-2 leading-tight">
                      {project.name}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-2 pt-1">
                  <span className="text-xs font-bold tracking-wider text-purple-900 dark:text-purple-300 uppercase">
                    {project.category}
                  </span>
                  <div className="w-7 h-7 bg-purple-100 dark:bg-white/10 text-purple-950 dark:text-purple-200 flex items-center justify-center group-hover:bg-[#3B0764] group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-serif text-2xl font-bold text-purple-950 dark:text-white mb-2.5 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                  {project.name}
                </h3>

                <p className="text-purple-900/80 dark:text-zinc-300 text-xs md:text-sm leading-relaxed mb-6 font-medium">
                  {project.description}
                </p>
              </div>

              <div className="pt-4 border-t border-purple-900/15 dark:border-white/10">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 text-[11px] font-bold text-purple-950 dark:text-purple-200 bg-purple-100/70 dark:bg-white/10 border border-purple-300/60 dark:border-white/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="w-full py-3 px-4 bg-[#3B0764] dark:bg-purple-600 hover:bg-purple-950 text-white flex items-center justify-between text-xs font-bold tracking-widest uppercase transition-all duration-300">
                  <span>View Case Study</span>
                  <ArrowUpRight className="w-4 h-4 text-pink-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
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
