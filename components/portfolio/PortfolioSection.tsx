'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CaseStudyModal, ProjectData } from './CaseStudyModal';
import { ArrowUpRight } from 'lucide-react';

const projects: ProjectData[] = [
  {
    id: 'crumbs-and-coffee',
    name: 'Crumbs & Coffee',
    category: '3D WebGL & Artisanal Café',
    description: 'Immersive 3D artisanal coffee flagship featuring floating coffee bean particle physics and table reservations.',
    fullOverview: 'Crumbs & Coffee required a luxurious 3D digital flagship site to showcase their artisanal coffee roastery, interactive menu, and table reservation booking engine.',
    challenge: 'Rendering high-fidelity 3D coffee models and floating bean particle physics while maintaining 60fps performance on mobile browsers.',
    solution: 'Engineered a WebGL 3D Canvas scene with procedural lighting, smooth inertia scrolling, and an instant table reservation engine.',
    techStack: ['3D WebGL', 'React', 'GSAP', 'Tailwind', 'Netlify'],
    image: '/crumbs-and-coffee.png',
    liveUrl: 'https://crumbsandcoffee.netlify.app/',
    outcomes: ['60fps WebGL particle animation', 'Instant table reservation engine', 'Deployed live on Netlify'],
  },
  {
    id: 'toppers-academy',
    name: 'Toppers Academy',
    category: 'Educational Institute Platform',
    description: 'High-conversion educational portal & NEET Coaching platform featuring online admissions and student results engine.',
    fullOverview: 'Toppers Academy required a comprehensive digital portal to highlight their NEET State 1st Rank achievements, course offerings, student Mind Dynamics coaching, and online admission enquiry system.',
    challenge: 'Presenting dense academic curriculum data, student achievements, and course enrollment flows with sub-second page performance.',
    solution: 'Engineered a modern web portal with streamlined navigation, structured course cards, testimonials slider, and automated enquiry routing.',
    techStack: ['Web Platform', 'React', 'Tailwind', 'WhatsApp API'],
    image: '/toppers-academy.png',
    liveUrl: 'https://www.toppersacademytup.com/',
    outcomes: ['State 1st Rank showcase platform', 'Instant enquiry lead capture', 'Responsive mobile interface'],
  },
  {
    id: 'sri-kungumayi-traders',
    name: 'Sri Kungumayi Traders',
    category: 'Textile & Industrial B2B Portal',
    description: 'B2B digital flagship for premium textile accessories, precision packaging, and industrial yarn supply with instant quotation engine.',
    fullOverview: 'Sri Kungumayi Traders required an industrial-grade B2B web portal to showcase their extensive textile yarn supplies, paper cones, precision packaging materials, and custom quotation requests.',
    challenge: 'Structuring multi-category industrial product catalogs and facilitating high-volume B2B quote inquiries across India.',
    solution: 'Designed a clean, modern digital catalog with interactive product filtering, pan-India supply metrics, and direct Get a Quote lead routing.',
    techStack: ['B2B Web Portal', 'React', 'Tailwind', 'Netlify'],
    image: '/sri-kungumayi-traders.png',
    liveUrl: 'https://srikungumayitraders.netlify.app/',
    outcomes: ['Interactive product catalog', 'Pan-India B2B quote pipeline', 'Deployed live on Netlify'],
  },
  {
    id: 'nexus-ai',
    name: 'Nexus AI Copilot Platform',
    category: 'AI Solution & SaaS',
    description: 'Enterprise intelligence engine unifying real-time document search, automated workflow triggers, and custom LLM routing.',
    fullOverview: 'Nexus AI required an enterprise-grade platform capable of indexing millions of unstructured documents while providing instant sub-second AI answers.',
    challenge: 'High latency query pipelines and complex permissions models across multi-tenant corporate databases.',
    solution: 'Engineered a vector index architecture with Next.js App Router, WebSockets streaming, and GPU-accelerated RAG pipelines.',
    techStack: ['Next.js', 'TypeScript', 'Vector DB', 'RAG Pipeline'],
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
    techStack: ['React', 'TypeScript', 'WebSockets', 'Canvas API'],
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
    techStack: ['Next.js', 'Three.js', 'GSAP', 'Lenis'],
    image: '/projects/aura.jpg',
    outcomes: ['Awwwards nominated design', 'Sub-second initial paint', 'Smooth 3D interactive renders'],
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
          start: 'top top+=80',
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
    <section id="work" ref={triggerRef} className="relative pt-24 pb-12 overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-none glass-panel border border-luxury-lavender/30 text-[11px] font-bold tracking-widest text-ebony dark:text-silk-100 uppercase mb-2 shadow-glass-silk">
              SELECTED WORK
            </div>
            <h2 className="font-serif text-2xl md:text-4xl font-bold tracking-tight text-ebony dark:text-silk-100 leading-tight">
              WORK THAT <span className="text-gradient-hero italic font-normal">SPEAKS FOR ITSELF.</span>
            </h2>
          </div>
          <p className="text-ebony-muted dark:text-text-secondary text-xs md:text-sm max-w-md font-medium">
            Every project is built around a clear business goal—not just a beautiful interface.
          </p>
        </div>
      </div>

      {/* Track */}
      <div className="w-full overflow-hidden pb-12 pt-1">
        <div
          ref={targetRef}
          className="flex flex-col lg:flex-row gap-6 px-4 md:px-8 max-w-7xl lg:max-w-none mx-auto lg:mx-0 w-full lg:w-max"
        >
          {projects.map((project) => (
            <div
              key={project.id}
              data-cursor="project"
              onClick={() => setSelectedProject(project)}
              className="w-full lg:w-[400px] xl:w-[440px] flex-shrink-0 cursor-pointer group bg-white dark:bg-[#120E1F] border-2 border-purple-900/20 dark:border-purple-400/30 p-5 md:p-6 rounded-none flex flex-col justify-between shadow-2xl hover:border-purple-600 transition-all duration-300 relative overflow-hidden"
            >
              {/* Top Gradient Accent */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600" />

              <div>
                <div className="flex items-center justify-between mb-3 pt-1">
                  <span className="text-[11px] font-extrabold tracking-wider text-purple-900 dark:text-purple-300 uppercase">
                    {project.category}
                  </span>
                  <div className="w-7 h-7 bg-purple-100 dark:bg-white/10 text-purple-950 dark:text-purple-200 flex items-center justify-center group-hover:bg-[#3B0764] group-hover:text-white transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="font-serif text-xl md:text-2xl font-bold text-purple-950 dark:text-white mb-2.5 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                  {project.name}
                </h3>

                <p className="text-purple-900/80 dark:text-zinc-300 text-xs leading-relaxed mb-4 font-medium">
                  {project.description}
                </p>
              </div>

              <div className="pt-4 border-t border-purple-900/15 dark:border-white/10">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 text-[10px] font-bold text-purple-950 dark:text-purple-200 bg-purple-100/70 dark:bg-white/10 border border-purple-300/60 dark:border-white/20"
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
