'use client';

import Image from 'next/image';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ className = '', showText = true, size = 'md' }: LogoProps) {
  const imageSizes = {
    sm: 'h-10 w-auto',
    md: 'h-12 w-auto',
    lg: 'h-20 w-auto',
  };

  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      {/* Pristine Lotus Brand Mark Container */}
      <div className="relative rounded-2xl overflow-hidden glass-panel p-1.5 border border-luxury-lavender/20 flex items-center justify-center bg-white/80 dark:bg-ebony-light/80 shadow-glass-silk transition-all duration-300">
        <Image
          src="/logo.png"
          alt="Sumya Web Studio Logo"
          width={180}
          height={180}
          className={`${imageSizes[size]} object-contain`}
          priority
        />
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="font-serif text-xl md:text-2xl font-bold tracking-wide text-ebony dark:text-silk-100 leading-none">
            SUMYA
          </span>
          <span className="text-[9px] md:text-[10px] tracking-[0.3em] text-luxury-lavender dark:text-luxury-dustyrose font-semibold uppercase mt-0.5">
            WEB STUDIO
          </span>
        </div>
      )}
    </div>
  );
}
