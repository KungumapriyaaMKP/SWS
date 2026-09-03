'use client';

import { useState } from 'react';
import { CaseStudyModal, ProjectData } from './CaseStudyModal';
import { ArrowUpRight, ExternalLink, Sparkles } from 'lucide-react';

const projects: ProjectData[] = [
  {
    id: 'crumbs-and-coffee',
    name: 'Crumbs & Coffee',
    category: 'Interactive 3D Web Application',
    description: 'Immersive artisanal coffee flagship featuring interactive 3D coffee bean showcases and instant table reservations.',
    fullOverview: 'Crumbs & Coffee required a luxurious digital flagship site to showcase their artisanal coffee roastery, interactive menu, and table reservation booking engine.',
    challenge: 'Rendering high-fidelity 3D coffee visualizers while maintaining sub-second performance on mobile browsers.',
    solution: 'Engineered an interactive 3D WebGL experience with procedural lighting, smooth inertia scrolling, and an instant table reservation engine.',
    techStack: ['3D Interactive Showcase', 'Table Booking Engine', 'Digital Menu', 'Ultra-Fast Performance'],
    image: '/crumbs-and-coffee.png',
    liveUrl: 'https://crumbsandcoffee.netlify.app/',
    outcomes: ['Interactive 3D particle showcase', 'Instant table reservation engine', 'Deployed live on global CDN'],
  },
  {
    id: 'toppers-academy',
    name: 'Toppers Academy',
    category: 'Educational Institute Platform',
    description: 'High-conversion educational portal & NEET Coaching platform featuring online admissions and student results engine.',
    fullOverview: 'Toppers Academy required a comprehensive digital portal to highlight their NEET State 1st Rank achievements, course offerings, student Mind Dynamics coaching, and online admission enquiry system.',
    challenge: 'Presenting dense academic curriculum data, student achievements, and course enrollment flows with sub-second page performance.',
    solution: 'Engineered a modern web portal with streamlined navigation, structured course cards, testimonials slider, and automated enquiry routing.',
    techStack: ['Online Admissions Portal', 'Course Directory', 'Instant Lead Capture', 'Student Success Showcase'],
    image: '/toppers-academy.png',
    liveUrl: 'https://www.toppersacademytup.com/',
    outcomes: ['State 1st Rank showcase platform', 'Instant enquiry lead capture', 'Responsive mobile interface'],
  },
  {
    id: 'sri-kungumayi-traders',
    name: 'Sri Kungumayi Traders',
    category: 'Industrial B2B Portal',
    description: 'B2B digital flagship for premium textile accessories, precision packaging, and industrial yarn supply with instant quotation engine.',
    fullOverview: 'Sri Kungumayi Traders required an industrial-grade B2B web portal to showcase their extensive textile yarn supplies, paper cones, precision packaging materials, and custom quotation requests.',
    challenge: 'Structuring multi-category industrial product catalogs and facilitating high-volume B2B quote inquiries across India.',
    solution: 'Designed a clean, modern digital catalog with interactive product filtering, pan-India supply metrics, and direct Get a Quote lead routing.',
    techStack: ['Industrial Product Catalog', 'Pan-India Quote Engine', 'B2B Client Portal', 'Instant Inquiry Sync'],
    image: '/sri-kungumayi-traders.png',
    liveUrl: 'https://srikungumayitraders.netlify.app/',
    outcomes: ['Interactive product catalog', 'Pan-India B2B quote pipeline', 'Deployed live on global CDN'],
  },
];

export function PortfolioSection() {
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);

  const handleLiveLaunch = (e: React.MouseEvent, url?: string) => {
    e.stopPropagation();
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="work" className="relative py-24 px-4 md:px-8 bg-white dark:bg-[#0A0810] transition-colors duration-300 scroll-mt-24">
      <div className="max-w-7xl mx-auto mb-16">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-none glass-panel border border-luxury-lavender/40 text-[11px] font-bold tracking-widest text-[#3B0764] dark:text-purple-300 uppercase mb-4 shadow-sm">
              <span>SELECTED SHOWCASE</span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-purple-950 dark:text-white leading-tight">
              WORK THAT <span className="text-gradient-hero italic font-normal">SPEAKS FOR ITSELF.</span>
            </h2>
          </div>
          <p className="text-purple-900/80 dark:text-zinc-300 text-sm md:text-base max-w-lg font-medium leading-relaxed">
            Click any project card to open full case studies or launch the live deployed web applications instantly.
          </p>
        </div>
      </div>

      {/* Vertical Stacked Projects Layout */}
      <div className="max-w-7xl mx-auto space-y-12 md:space-y-16">
        {projects.map((project, index) => (
          <div
            key={project.id}
            data-cursor="project"
            onClick={() => setSelectedProject(project)}
            className="cursor-pointer group bg-gradient-to-b from-white via-purple-50/20 to-white dark:from-[#130E26] dark:via-[#0F0A20] dark:to-[#0A0714] border border-purple-900/10 dark:border-purple-500/20 rounded-none p-6 md:p-10 flex flex-col lg:flex-row items-center gap-8 lg:gap-12 shadow-[0_15px_45px_-10px_rgba(59,7,100,0.06)] hover:shadow-[0_25px_60px_-15px_rgba(59,7,100,0.16)] hover:border-pink-500/50 hover:-translate-y-1 transition-all duration-500 relative overflow-hidden"
          >
            {/* Image Showcase (Left side on desktop) */}
            <div className="w-full lg:w-1/2 rounded-none overflow-hidden relative border border-purple-900/10 dark:border-purple-500/20 bg-[#090613] group/img flex-shrink-0 p-2 flex items-center justify-center min-h-[260px] md:min-h-[340px]">
              <img
                src={project.image}
                alt={project.name}
                className="w-full h-auto max-h-[380px] object-contain rounded-none group-hover:scale-105 transition-transform duration-500"
              />

              {/* Pulsing Live Dot */}
              <div className="absolute top-4 left-4 px-3 py-1 bg-black/75 backdrop-blur-md text-white text-[9px] font-bold tracking-widest uppercase rounded-none border border-white/20 flex items-center gap-1.5 shadow-lg z-10">
                <span className="w-2 h-2 rounded-none bg-emerald-400 animate-ping" />
                <span>LIVE PROJECT</span>
              </div>

              {/* Hover Overlay Link */}
              <div
                onClick={(e) => handleLiveLaunch(e, project.liveUrl)}
                className="absolute inset-0 bg-[#3B0764]/75 backdrop-blur-sm opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4 text-center z-20"
              >
                <span className="px-6 py-3 rounded-none bg-white text-[#3B0764] text-xs font-extrabold tracking-wider uppercase shadow-2xl flex items-center gap-2 hover:scale-105 transition-transform">
                  <span>Launch Live Site</span>
                  <ExternalLink className="w-4 h-4" />
                </span>
              </div>
            </div>

            {/* Project Details (Right side on desktop) */}
            <div className="w-full lg:w-1/2 flex flex-col justify-between space-y-6">
              <div>
                {/* Header Category & Project Number */}
                <div className="flex items-start sm:items-center justify-between gap-3 mb-3">
                  <span className="text-[10px] sm:text-[11px] font-extrabold tracking-wider uppercase text-pink-600 dark:text-pink-400 px-3 py-1.5 rounded-none bg-pink-100/70 dark:bg-pink-950/50 border border-pink-200 dark:border-pink-500/30 leading-snug">
                    {project.category}
                  </span>
                  <span className="font-serif text-sm sm:text-base md:text-lg font-extrabold text-purple-950 dark:text-purple-200 tracking-wider shrink-0 whitespace-nowrap pt-0.5 sm:pt-0">
                    0{index + 1} / 0{projects.length}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-serif text-3xl md:text-4xl font-bold text-purple-950 dark:text-white mb-3 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                  {project.name}
                </h3>

                {/* Description */}
                <p className="text-purple-900/80 dark:text-zinc-300 text-sm md:text-base leading-relaxed mb-6 font-medium">
                  {project.description}
                </p>

                {/* Tech Stack Badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-semibold text-purple-900 dark:text-purple-200 bg-purple-100/70 dark:bg-purple-900/30 border border-purple-200/80 dark:border-purple-500/30 px-3.5 py-1.5 rounded-none"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-purple-900/10 dark:border-white/10 flex items-center">
                <button
                  onClick={(e) => handleLiveLaunch(e, project.liveUrl)}
                  className="w-full sm:w-auto py-3.5 px-8 bg-gradient-to-r from-[#3B0764] to-purple-800 hover:from-purple-900 hover:to-purple-950 text-white rounded-none text-xs font-extrabold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2.5 shadow-md group/btn"
                >
                  <span>Launch Live Website</span>
                  <ExternalLink className="w-4 h-4 text-pink-300 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </button>
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
