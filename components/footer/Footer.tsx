'use client';

import { ArrowUp } from 'lucide-react';
import { Logo } from '../navigation/Logo';
import { RatingInteraction } from '@/components/ui/emoji-rating';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#work' },
    { label: 'Process', href: '#process' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="relative bg-bg-darkest text-white pt-16 pb-12 px-4 md:px-8 border-t border-white/5">
      {/* Animated Top Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

      {/* Interactive Rate Us Feedback Widget */}
      <div className="max-w-7xl mx-auto mb-12 pb-10 border-b border-white/10 flex flex-col items-center justify-center">
        <RatingInteraction />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <Logo size="md" />
          <p className="text-xs text-text-secondary mt-3 max-w-xs">
            Building digital experiences for ambitious businesses.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 text-xs text-zinc-400">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="hover:text-purple-300 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Scroll To Top Button */}
        <button
          onClick={scrollToTop}
          className="p-3 rounded-full glass-panel hover:glass-panel-interactive border border-white/10 text-white transition-colors"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5 text-purple-400" />
        </button>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
        <span>© {new Date().getFullYear()} Sumya Web Studio. All rights reserved.</span>
        <div className="flex items-center gap-6">
          <a href="#hero" className="hover:text-zinc-300 transition-colors">Privacy Policy</a>
          <a href="#hero" className="hover:text-zinc-300 transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
