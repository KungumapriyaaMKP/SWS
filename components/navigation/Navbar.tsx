'use client';

import { useState, useEffect } from 'react';
import { useMagneticButton } from '@/hooks/useMagneticButton';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Logo } from './Logo';
import RandomLetterSwapNav from '@/components/ui/m-random-letter-swap-1';
import { AnnouncementBar } from './AnnouncementBar';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hasAnnouncement, setHasAnnouncement] = useState(true);
  const btnRef = useMagneticButton<HTMLButtonElement>(0.3);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#work' },
    { label: 'Process', href: '#process' },
    { label: 'About', href: '#about' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[5000] flex flex-col">
        {hasAnnouncement && (
          <AnnouncementBar onDismiss={() => setHasAnnouncement(false)} />
        )}
        <header
          className={`transition-all duration-500 py-3.5 px-4 md:px-8 ${
            scrolled
              ? 'glass-navbar py-3 shadow-glass-card'
              : 'bg-transparent'
          }`}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => handleSmoothScroll(e, '#hero')}
              className="group focus:outline-none"
            >
              <Logo size="sm" />
            </a>

            {/* Desktop Nav Links using RandomLetterSwapNav */}
            <div className="hidden md:block px-8 py-3 rounded-none glass-panel border border-luxury-lavender/25 shadow-glass-silk">
              <RandomLetterSwapNav
                onNavClick={(href) => {
                  const target = document.querySelector(href);
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }}
              />
            </div>

            {/* Right Controls: Desktop CTA */}
            <div className="hidden md:flex items-center gap-4">
              <button
                ref={btnRef}
                data-cursor="cta"
                onClick={(e) => {
                  const target = document.querySelector('#contact');
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }}
                className="group relative px-7 py-3 rounded-none text-xs font-bold tracking-widest uppercase text-white bg-[#3B0764] hover:bg-purple-950 shadow-md transition-all duration-300 flex items-center gap-2 overflow-hidden cursor-pointer"
              >
                <span className="relative z-10">Start a Project</span>
                <ArrowRight className="w-3.5 h-3.5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>

            {/* Mobile Right Controls */}
            <div className="md:hidden flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-none glass-panel text-purple-950 dark:text-white focus:outline-none cursor-pointer"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 text-purple-600" /> : <Menu className="w-6 h-6 text-purple-950 dark:text-white" />}
              </button>
            </div>
          </div>
        </header>
      </div>

      {/* Fullscreen Mobile Glass Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[4999] bg-[#050509]/95 backdrop-blur-2xl flex flex-col justify-center px-8 py-12 md:hidden">
          <div className="flex flex-col gap-6 text-center">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                className="text-2xl font-display font-bold text-zinc-200 hover:text-purple-400 transition-colors"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-8 border-t border-white/10 flex justify-center">
              <button
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  const target = document.querySelector('#contact');
                  if (target) target.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full max-w-xs py-4 rounded-none text-xs font-bold tracking-widest uppercase text-white bg-[#3B0764] hover:bg-purple-950 shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
