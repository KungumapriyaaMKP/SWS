'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { Code2, Cpu, Zap } from 'lucide-react';

interface CuteGirlHeroMascotProps {
  scrollProgress?: number;
}

export function CuteGirlHeroMascot({ scrollProgress = 0 }: CuteGirlHeroMascotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mascotRef = useRef<HTMLDivElement>(null);
  const handWaveRef = useRef<HTMLDivElement>(null);
  const speechBubbleRef = useRef<HTMLDivElement>(null);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 25;
      const y = (e.clientY / innerHeight - 0.5) * 25;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Dynamic hand waving animation loop around wrist pivot
    if (handWaveRef.current) {
      gsap.to(handWaveRef.current, {
        rotation: 22,
        transformOrigin: '75% 85%',
        duration: 0.38,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center select-none"
    >
      {/* Background Radial Purple Glow */}
      <div className="absolute w-[350px] h-[350px] md:w-[450px] md:h-[450px] rounded-full bg-gradient-to-tr from-purple-600/25 via-pink-500/20 to-indigo-500/25 blur-3xl animate-pulse pointer-events-none" />

      {/* Floating Interactive Container */}
      <div
        ref={mascotRef}
        style={{
          transform: `translate3d(${mousePos.x}px, ${mousePos.y - scrollProgress * 50}px, 0px) rotate(${mousePos.x * 0.08}deg)`,
          transition: 'transform 0.25s cubic-bezier(0.1, 0.7, 0.1, 1)',
        }}
        className="relative z-10 flex flex-col items-center justify-center max-w-[420px] lg:max-w-[480px]"
      >
        {/* Cute Developer Girl Body + Animated Waving Hand Layer */}
        <div className="relative group w-full flex items-center justify-center">
          <img
            src="/cute-girl-body-nohand.png"
            alt="Cute Developer Girl"
            className="w-full h-auto max-h-[520px] lg:max-h-[600px] object-contain group-hover:scale-[1.02] transition-transform duration-500"
          />

          {/* Animated Waving Hand Layer */}
          <div
            ref={handWaveRef}
            className="absolute left-[18%] top-[28%] w-[24%] h-[34%] pointer-events-none"
            style={{
              transformOrigin: '75% 85%',
            }}
          >
            <img
              src="/cute-girl-waving-hand.png"
              alt="Waving Hand"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
