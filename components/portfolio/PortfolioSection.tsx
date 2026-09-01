'use client';

import { useState } from 'react';
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
];

export function PortfolioSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  return (
    <section id="work" className="relative py-20 px-4 md:px-8 bg-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-luxury-lavender/30 text-[11px] font-bold tracking-widest text-[#3B0764] uppercase mb-3 shadow-sm">
              SELECTED WORK
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-purple-950 leading-tight">
              WORK THAT <span className="text-gradient-hero italic font-normal">SPEAKS FOR ITSELF.</span>
            </h2>
          </div>
          <p className="text-purple-900/70 text-xs md:text-sm max-w-md font-medium">
            Every project is built around a clear business goal, not just a beautiful interface.
          </p>
        </div>
      </div>

      {/* 3-Column Responsive Portfolio Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div
            key={project.id}
            data-cursor="project"
            onClick={() => setSelectedProject(project)}
            className="cursor-pointer group bg-white border border-purple-900/15 rounded-3xl p-6 flex flex-col justify-between shadow-xl hover:shadow-2xl hover:border-purple-600/40 transition-all duration-300 relative overflow-hidden"
          >
            <div>
              {/* Screenshot Display Box */}
              <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden mb-5 relative border border-purple-900/10 bg-purple-950/5">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95 group-hover:opacity-100"
                />
                <div className="absolute top-3 right-3 px-3 py-1 bg-[#3B0764] text-white text-[9px] font-bold tracking-widest uppercase rounded-full shadow-lg border border-purple-400/30">
                  LIVE PROJECT
                </div>
              </div>

              {/* Category Pill */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-extrabold tracking-wider text-[#3B0764] uppercase px-3 py-1 rounded-full bg-purple-100/70 border border-purple-300/40">
                  {project.category}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="font-serif text-2xl font-bold text-purple-950 mb-2 group-hover:text-purple-700 transition-colors">
                {project.name}
              </h3>

              <p className="text-purple-900/80 text-xs md:text-sm leading-relaxed mb-6 font-medium">
                {project.description}
              </p>
            </div>

            {/* Action Footer */}
            <div className="pt-4 border-t border-purple-900/10">
              {/* Subtle Refined Action Link */}
              <div className="w-full py-2.5 px-4 bg-[#3B0764] group-hover:bg-purple-950 rounded-2xl text-white flex items-center justify-between text-xs font-bold tracking-wider uppercase transition-all duration-300 shadow-md">
                <span>View Case Study</span>
                <ArrowUpRight className="w-4 h-4 text-pink-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Case Study Modal */}
      <CaseStudyModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
