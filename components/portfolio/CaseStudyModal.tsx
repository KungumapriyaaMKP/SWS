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
  outcomes: string[];
}

interface CaseStudyModalProps {
  project: ProjectData | null;
  onClose: () => void;
}

export function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-[6000] bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 md:p-8 overflow-y-auto">
      <div className="bg-bg-dark border border-white/10 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl p-6 md:p-10 my-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full glass-panel text-white hover:text-purple-400 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Category & Title */}
        <div className="mb-6">
          <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-purple-300 bg-purple-900/30 border border-purple-500/30">
            {project.category}
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-extrabold text-white mt-3">
            {project.name}
          </h2>
        </div>

        {/* Featured Image Gradient Box */}
        <div className="w-full h-64 md:h-80 rounded-2xl overflow-hidden mb-8 relative border border-white/10 bg-gradient-to-br from-purple-950/60 via-indigo-950/40 to-bg-card flex items-center justify-center">
          <div className="text-center p-8">
            <span className="text-purple-400 font-mono text-sm tracking-widest block mb-2">SYSTEM PREVIEW</span>
            <h3 className="font-display text-2xl font-bold text-white">{project.name} Digital Platform</h3>
          </div>
        </div>

        {/* Overview & Challenge */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h4 className="font-display text-lg font-bold text-white mb-2">Project Overview</h4>
            <p className="text-text-secondary text-sm leading-relaxed">{project.fullOverview}</p>
          </div>
          <div>
            <h4 className="font-display text-lg font-bold text-white mb-2">The Business Challenge</h4>
            <p className="text-text-secondary text-sm leading-relaxed">{project.challenge}</p>
          </div>
        </div>

        {/* Engineering Solution */}
        <div className="mb-8 p-6 rounded-2xl glass-panel border border-white/10">
          <h4 className="font-display text-lg font-bold text-white mb-2">Engineering & Design Solution</h4>
          <p className="text-text-secondary text-sm leading-relaxed mb-4">{project.solution}</p>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-full text-xs font-medium text-purple-300 bg-purple-950/40 border border-purple-500/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Key Deliverables */}
        <div className="mb-8">
          <h4 className="font-display text-lg font-bold text-white mb-4">Core Deliverables & Features</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {project.outcomes.map((outcome, idx) => (
              <div key={idx} className="flex items-center gap-3 p-3 rounded-xl glass-panel text-sm text-zinc-200">
                <CheckCircle2 className="w-5 h-5 text-purple-400 flex-shrink-0" />
                <span>{outcome}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Footer */}
        <div className="pt-6 border-t border-white/10 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
          >
            Close Window
          </button>

          <button
            onClick={() => {
              onClose();
              const contact = document.querySelector('#contact');
              if (contact) contact.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-2.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-indigo-600 shadow-violet-glow flex items-center gap-2"
          >
            <span>Request Similar System</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
