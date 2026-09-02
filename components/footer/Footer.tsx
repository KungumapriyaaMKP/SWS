'use client';

import { ArrowUp, Instagram, Mail, Linkedin, Phone } from 'lucide-react';
import { Logo } from '../navigation/Logo';
import { RatingInteraction } from '@/components/ui/emoji-rating';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const productLinks = [
    { label: 'Web Development', href: '#services' },
    { label: 'Executive Portfolios', href: '#work' },
    { label: 'AI & Automation', href: '#services' },
    { label: 'Custom Software', href: '#services' },
  ];

  const companyLinks = [
    { label: 'About Us', href: '#about' },
    { label: 'Process', href: '#process' },
    { label: 'Privacy Policy', href: '#hero' },
    { label: 'Terms of Services', href: '#hero' },
  ];

  const resourceLinks = [
    { label: 'Selected Showcase', href: '#work' },
    { label: 'Product Evolution', href: '#idea-to-impact' },
    { label: 'Capabilities Matrix', href: '#services' },
    { label: 'Start a Project', href: '#contact' },
  ];

  const socialLinks = [
    {
      label: 'Instagram',
      href: 'https://www.instagram.com/sumya.web.studio?igsi=ejlhYzg2dWliaDh4&utm_source=qr',
      icon: Instagram,
    },
    {
      label: 'Email Us',
      href: 'mailto:sumyawebstudio@gmail.com',
      icon: Mail,
    },
    {
      label: 'LinkedIn',
      href: '#contact',
      icon: Linkedin,
    },
    {
      label: 'Contact Us',
      href: '#contact',
      icon: Phone,
    },
  ];

  return (
    <footer className="relative bg-[#07050E] text-white pt-16 pb-12 px-4 md:px-8 border-t border-white/10 transition-colors duration-300">
      {/* Top Ambient Glow Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

      {/* Interactive Rate Us Feedback Widget */}
      <div className="max-w-7xl mx-auto mb-16 pb-12 border-b border-white/10 flex flex-col items-center justify-center">
        <RatingInteraction />
      </div>

      {/* 4 Column Footer Grid (Matching User Screenshot Layout) */}
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-16">
        {/* Column 1: Product */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold tracking-wider text-purple-200 uppercase font-sans">
            Product
          </h4>
          <ul className="space-y-2.5 text-xs font-medium text-zinc-400">
            {productLinks.map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.href}
                  className="hover:text-purple-300 transition-colors duration-200 block"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 2: Company */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold tracking-wider text-purple-200 uppercase font-sans">
            Company
          </h4>
          <ul className="space-y-2.5 text-xs font-medium text-zinc-400">
            {companyLinks.map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.href}
                  className="hover:text-purple-300 transition-colors duration-200 block"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Resources */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold tracking-wider text-purple-200 uppercase font-sans">
            Resources
          </h4>
          <ul className="space-y-2.5 text-xs font-medium text-zinc-400">
            {resourceLinks.map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.href}
                  className="hover:text-purple-300 transition-colors duration-200 block"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Social Links */}
        <div className="space-y-4">
          <h4 className="text-sm font-bold tracking-wider text-purple-200 uppercase font-sans">
            Social Links
          </h4>
          <ul className="space-y-2.5 text-xs font-medium text-zinc-400">
            {socialLinks.map((link, idx) => {
              const Icon = link.icon;
              return (
                <li key={idx}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : '_self'}
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-pink-400 transition-colors duration-200"
                  >
                    <Icon className="w-4 h-4 text-purple-400" />
                    <span>{link.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Bottom Copyright & Logo Strip */}
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <Logo size="sm" />
          <span className="text-xs text-zinc-500 font-medium">
            © {new Date().getFullYear()} Sumya Web Studio. All rights reserved.
          </span>
        </div>

        <button
          onClick={scrollToTop}
          className="p-3 rounded-none bg-purple-950/60 border border-purple-500/30 text-purple-300 hover:bg-purple-600 hover:text-white transition-all cursor-pointer shadow-md flex items-center gap-2 text-xs font-bold uppercase tracking-widest"
          aria-label="Back to top"
        >
          <span>Top</span>
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
    </footer>
  );
}
