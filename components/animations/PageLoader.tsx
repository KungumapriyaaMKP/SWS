'use client';

import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { Logo } from '../navigation/Logo';

export function PageLoader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fast progress ticker (under 1 sec)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        gsap.to('#page-loader', {
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
          duration: 0.8,
          ease: 'power4.inOut',
          onComplete: () => {
            setLoading(false);
          },
        });
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [progress]);

  if (!loading) return null;

  return (
    <div
      id="page-loader"
      className="fixed inset-0 z-[9999] bg-[#050509] flex flex-col items-center justify-center pointer-events-auto"
      style={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
    >
      <div className="flex flex-col items-center gap-6">
        <Logo size="lg" />

        {/* Dynamic loading progress line */}
        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-purple-600 via-indigo-500 to-purple-400 transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="text-xs font-mono text-zinc-500 tracking-widest">{progress}%</div>
      </div>
    </div>
  );
}
