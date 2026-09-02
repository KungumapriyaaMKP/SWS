'use client';

import Image from 'next/image';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'light';
}

export function Logo({ className = '', showText = true, size = 'md', variant = 'default' }: LogoProps) {
  const containerSizes = {
    sm: 'h-10 w-10 p-1',
    md: 'h-12 w-12 p-1.5',
    lg: 'h-20 w-20 p-2',
  };

  return (
    <div className={`flex items-center gap-3.5 ${className}`}>
      {/* Square Edged Brand Mark */}
      <div
        className={`${containerSizes[size]} ${
          variant === 'light'
            ? 'bg-[#1D0636] border border-purple-500/40'
            : 'bg-[#F3EBF9] border border-purple-900/20'
        } rounded-none shadow-sm flex items-center justify-center shrink-0`}
      >
        <Image
          src="/logo.png"
          alt="Sumya Web Studio Logo"
          width={180}
          height={180}
          className={`h-full w-full object-contain filter ${
            variant === 'light' ? 'brightness-200 contrast-200' : 'contrast-125 brightness-90'
          }`}
          priority
        />
      </div>

      {showText && (
        <div className="flex flex-col">
          <span
            className={`font-serif text-xl md:text-2xl font-bold tracking-wide leading-none ${
              variant === 'light'
                ? 'text-white drop-shadow-md'
                : 'text-purple-950 dark:text-silk-100'
            }`}
          >
            SUMYA
          </span>
          <span
            className={`text-[9px] md:text-[10px] tracking-[0.3em] font-bold uppercase mt-1 ${
              variant === 'light'
                ? 'text-purple-300'
                : 'text-purple-700 dark:text-luxury-dustyrose'
            }`}
          >
            WEB STUDIO
          </span>
        </div>
      )}
    </div>
  );
}
