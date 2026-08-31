'use client';

import { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMagneticButton } from '@/hooks/useMagneticButton';
import { ArrowRight, ArrowDown, Star } from 'lucide-react';

const Hero3DCanvas = dynamic(
  () => import('./Hero3DCanvas').then((mod) => mod.Hero3DCanvas),
  { ssr: false }
);

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const trustBadgeRef = useRef<HTMLDivElement>(null);
  
  const [scrollProgress, setScrollProgress] = useState(0);

  const primaryBtnRef = useMagneticButton<HTMLButtonElement>(0.35);
  const secondaryBtnRef = useMagneticButton<HTMLButtonElement>(0.3);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    // Check if touch device / mobile
    const isMobile = window.innerWidth < 768;
    if (isMobile) return; // Keep simple scroll on mobile

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
          },
        },
      });

      // 0% -> 20%: Headline moves upward
      tl.to(headlineRef.current, { y: -40, opacity: 0.8, duration: 0.2 }, 0);

      // 20% -> 40%: CTA fades slightly
      tl.to(ctaGroupRef.current, { opacity: 0.6, y: -20, duration: 0.2 }, 0.2);

      // 40% -> 70%: Subtext & trust badge translate
      tl.to(subtextRef.current, { opacity: 0.5, y: -30, duration: 0.3 }, 0.3);
      tl.to(trustBadgeRef.current, { opacity: 0.3, duration: 0.3 }, 0.4);
    }, container);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-28 pb-12 transition-colors duration-300"
    >
      {/* Background ambient lighting */}
      <div className="ambient-glow-1 top-10 -left-20" />
      <div className="ambient-glow-2 bottom-10 right-0" />

      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        {/* Left Side Content */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6">

          {/* Main Headline */}
          <h1
            ref={headlineRef}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-ebony dark:text-silk-100 leading-[1.08]"
          >
            WE BUILD DIGITAL EXPERIENCES THAT{' '}
            <span className="text-gradient-hero inline-block italic font-normal">GROW BUSINESSES.</span>
          </h1>

          {/* Supporting Text */}
          <p
            ref={subtextRef}
            className="text-base sm:text-lg text-ebony-muted dark:text-text-secondary max-w-xl font-normal leading-relaxed"
          >
            Websites, executive portfolios, AI solutions and custom software engineered to turn ambitious ideas into powerful digital products.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaGroupRef} className="flex flex-wrap items-center gap-4 pt-2">
            <button
              ref={primaryBtnRef}
              data-cursor="cta"
              onClick={() => scrollToSection('#contact')}
              className="group relative px-8 py-4 rounded-full text-xs font-bold tracking-widest uppercase text-white bg-gradient-to-r from-luxury-deepviolet via-luxury-dustyrose to-luxury-lavender shadow-rose-subtle hover:shadow-luxury-glow transition-all duration-300 flex items-center gap-3 overflow-hidden"
            >
              <span className="relative z-10">Start a Project</span>
              <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-gradient-to-r from-luxury-dustyrose to-luxury-deepviolet opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            <button
              ref={secondaryBtnRef}
              onClick={() => scrollToSection('#work')}
              className="px-7 py-4 rounded-full text-xs font-bold tracking-widest uppercase text-ebony dark:text-silk-100 glass-panel hover:glass-panel-interactive border border-luxury-lavender/30 transition-all duration-300 flex items-center gap-2 shadow-glass-silk"
            >
              <span>Explore Our Work</span>
              <ArrowDown className="w-4 h-4 text-luxury-dustyrose" />
            </button>
          </div>

          {/* Verified Trust Line */}
          <div ref={trustBadgeRef} className="pt-6 flex items-center gap-3 border-t border-luxury-lavender/15 w-full max-w-md">
            <div className="flex items-center text-luxury-gold gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-luxury-gold text-luxury-gold" />
              ))}
            </div>
            <span className="text-xs text-ebony-muted dark:text-text-secondary font-medium tracking-wide">
              Trusted by ambitious businesses worldwide
            </span>
          </div>
        </div>

        {/* Right Side 3D Scene */}
        <div className="lg:col-span-5 w-full h-[450px] md:h-[550px] lg:h-[650px] relative">
          <Hero3DCanvas scrollProgress={scrollProgress} />
        </div>
      </div>
    </section>
  );
}
