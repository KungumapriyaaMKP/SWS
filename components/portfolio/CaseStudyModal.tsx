'use client';

import { X, ExternalLink, CheckCircle2 } from 'lucide-react';

export interface ProjectData {
  id: string;
  name: string;
  category: string;
  description: string;
  fullOverview: string;
  challenge: string;
  solution: string;
  techStack: string[];
  image: string;
  liveUrl?: string;
  outcomes: string[];
  impactBadge?: string;
  roiMetric?: string;
}

interface CaseStudyModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[6000] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 overflow-y-auto">
      <div className="bg-bg-dark border border-white/10 rounded-none max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl p-6 md:p-10 my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2.5 bg-[#3B0764] hover:bg-pink-600 border-2 border-purple-400/50 text-white transition-all duration-300 shadow-2xl group z-50 flex items-center justify-center cursor-pointer rounded-none"
          aria-label="Close modal"
        >
          <X className="w-6 h-6 text-white group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* Category & Title */}
        <div className="mb-6">
          <span className="px-3 py-1 rounded-none text-xs font-semibold tracking-wider text-purple-300 bg-purple-900/30 border border-purple-500/30">
            {project.category}
          </span>
          <h2 className="font-serif font-bold text-3xl md:text-5xl font-extrabold text-white mt-3">
            {project.name}
          </h2>
        </div>

        {/* Featured Image Showcase Box */}
        <div className="w-full h-64 md:h-80 rounded-none overflow-hidden mb-8 relative border border-white/10 bg-black flex items-center justify-center">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-full object-cover opacity-90"
          />
        </div>

        {/* Overview & Challenge */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h4 className="font-serif font-bold text-lg font-bold text-white mb-2">Project Overview</h4>
            <p className="text-zinc-200 font-medium text-sm md:text-base leading-relaxed">{project.fullOverview}</p>
          </div>
          <div>
            <h4 className="font-serif font-bold text-lg font-bold text-white mb-2">The Business Challenge</h4>
            <p className="text-zinc-200 font-medium text-sm md:text-base leading-relaxed">{project.challenge}</p>
          </div>
        </div>

        {/* Engineering Solution */}
        <div className="mb-8 p-6 rounded-none bg-white/5 border border-white/10">
          <h4 className="font-serif font-bold text-lg font-bold text-white mb-2">Engineering & Design Solution</h4>
          <p className="text-zinc-200 font-medium text-sm md:text-base leading-relaxed">{project.solution}</p>
        </div>

        {/* Key Deliverables */}
        <div className="mb-8">
          <h4 className="font-serif font-bold text-lg font-bold text-white mb-4">Core Deliverables & Features</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {project.outcomes.map((outcome, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3.5 rounded-none bg-white/5 border border-white/10 text-sm font-semibold text-white">
                <CheckCircle2 className="w-5 h-5 text-pink-400 flex-shrink-0" />
                <span>{outcome}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Footer */}
        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-none text-xs font-semibold text-zinc-400 hover:text-white transition-colors border border-white/10"
          >
            Close Window
          </button>

          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-none text-xs font-bold text-purple-950 bg-white hover:bg-zinc-200 transition-colors flex items-center gap-2 shadow-lg"
              >
                <span>Visit Live Site</span>
                <ExternalLink className="w-4 h-4 text-purple-950" />
              </a>
            )}

            <button
              onClick={() => {
                onClose();
                const contact = document.querySelector('#contact');
                if (contact) contact.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-2.5 rounded-none text-xs font-bold text-white bg-[#3B0764] hover:bg-purple-950 flex items-center gap-2"
            >
              <span>Request Similar Project</span>
              <ExternalLink className="w-4 h-4 text-pink-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
