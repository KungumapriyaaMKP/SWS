'use client';

import { useEffect, useState } from 'react';
import gsap from 'gsap';
import { Logo } from '../navigation/Logo';

export function PageLoader() {
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setMounted(true);

    // Fast progress ticker (reaches 100% in ~400ms)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 20);

    // Safety fallback: guaranteed hide after 1 second max
    const safetyTimeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => {
      clearInterval(interval);
      clearTimeout(safetyTimeout);
    };
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        const loaderEl = document.getElementById('page-loader');
        if (loaderEl) {
          gsap.to(loaderEl, {
            opacity: 0,
            duration: 0.35,
            ease: 'power2.out',
            onComplete: () => {
              setLoading(false);
            },
          });
        } else {
          setLoading(false);
        }
      }, 80);

      return () => clearTimeout(timer);
    }
  }, [progress]);

  if (!mounted || !loading) return null;

  return (
    <div
      id="page-loader"
      className="fixed inset-0 z-[9999] bg-[#050509] flex flex-col items-center justify-center pointer-events-none transition-opacity duration-300"
    >
      <div className="flex flex-col items-center gap-6">
        <Logo size="lg" variant="light" />

        {/* Dynamic loading progress line */}
        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-purple-600 via-pink-500 to-purple-400 transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="text-xs font-mono text-purple-300 tracking-widest font-bold">{progress}%</div>
      </div>
    </div>
  );
}
