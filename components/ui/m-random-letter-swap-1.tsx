'use client';

import { RandomLetterSwap } from '@/components/ui/random-letter-swap';

interface RandomLetterSwapNavProps {
  onNavClick?: (href: string) => void;
}

const links = [
  { label: 'Home', href: '#hero' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#work' },
  { label: 'Process', href: '#process' },
  { label: 'About', href: '#about' },
];

export default function RandomLetterSwapNav({ onNavClick }: RandomLetterSwapNavProps) {
  return (
    <div className="flex items-center justify-center">
      <nav className="flex items-center gap-8 lg:gap-10">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            onClick={(e) => {
              e.preventDefault();
              if (onNavClick) {
                onNavClick(link.href);
              } else {
                const target = document.querySelector(link.href);
                if (target) target.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="relative py-1 group"
          >
            <RandomLetterSwap
              className="cursor-pointer font-bold text-sm md:text-base tracking-wide text-ebony dark:text-zinc-200 group-hover:text-luxury-deepviolet dark:group-hover:text-white transition-colors"
              label={link.label}
              staggerDuration={0.025}
              transition={{ duration: 0.6, type: 'spring' }}
            />
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-luxury-dustyrose group-hover:w-full transition-all duration-300" />
          </a>
        ))}
      </nav>
    </div>
  );
}
