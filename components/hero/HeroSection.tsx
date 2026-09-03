'use client';

import { useRef, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMagneticButton } from '@/hooks/useMagneticButton';
import { ArrowRight, ArrowDown } from 'lucide-react';

const Hero3DCanvas = dynamic(
  () => import('./Hero3DCanvas').then((mod) => ({ default: mod.Hero3DCanvas })),
  {
    ssr: false,
    loading: () => <div className="w-full h-full min-h-[300px] bg-transparent" />,
  }
);

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const trustedByRef = useRef<HTMLDivElement>(null);
  
  const [scrollProgress, setScrollProgress] = useState(0);

  const primaryBtnRef = useMagneticButton<HTMLButtonElement>(0.35);
  const secondaryBtnRef = useMagneticButton<HTMLButtonElement>(0.3);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    // Check if touch device / mobile
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      if (!isMobile) {
        // Entrance animation on load (from left to right)
        gsap.fromTo(
          '.hero-line',
          { x: -80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            delay: 0.1,
          }
        );

        if (subtextRef.current) {
          gsap.fromTo(
            subtextRef.current,
            { x: -60, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              delay: 0.45,
            }
          );
        }

        if (ctaGroupRef.current) {
          gsap.fromTo(
            ctaGroupRef.current,
            { x: -50, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.7,
              ease: 'power3.out',
              delay: 0.6,
            }
          );
        }

        if (trustedByRef.current) {
          gsap.fromTo(
            trustedByRef.current,
            { x: -30, opacity: 0 },
            {
              x: 0,
              opacity: 1,
              duration: 0.7,
              ease: 'power3.out',
              delay: 0.75,
            }
          );
        }
      }

      // 3D Canvas ScrollProgress tracking ONLY (no opacity fading)
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.5,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });
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
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-28 pb-8 transition-colors duration-300"
    >
      {/* Background ambient lighting */}
      <div className="ambient-glow-1 top-10 -left-20" />
      <div className="ambient-glow-2 bottom-10 right-0" />

      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        {/* Left Side Content */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-5">

          {/* Main Headline */}
          <h1
            ref={headlineRef}
            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-ebony dark:text-silk-100 leading-[1.08]"
          >
            <span className="block overflow-hidden">
              <span className="hero-line block">WE BUILD DIGITAL{' '}</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line block">EXPERIENCES THAT{' '}</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line block text-gradient-hero italic font-normal">GROW BUSINESSES.</span>
            </span>
          </h1>

          {/* Supporting Text */}
          <p
            ref={subtextRef}
            className="text-base sm:text-lg text-ebony-muted dark:text-text-secondary max-w-xl font-normal leading-relaxed"
          >
            Websites, executive portfolios, AI solutions and custom software engineered to turn ambitious ideas into powerful digital products.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaGroupRef} className="flex flex-wrap items-center gap-4 pt-1">
            <button
              ref={primaryBtnRef}
              data-cursor="cta"
              onClick={() => scrollToSection('#contact')}
              className="group relative px-8 py-3.5 rounded-none text-xs font-bold tracking-widest uppercase text-white bg-[#3B0764] hover:bg-[#2A0548] shadow-lg transition-all duration-300 flex items-center gap-3 overflow-hidden cursor-pointer"
            >
              <span className="relative z-10">Start a Project</span>
              <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            <button
              ref={secondaryBtnRef}
              onClick={() => scrollToSection('#work')}
              className="px-7 py-3.5 rounded-none text-xs font-bold tracking-widest uppercase text-ebony dark:text-silk-100 glass-panel hover:glass-panel-interactive border border-luxury-lavender/30 transition-all duration-300 flex items-center gap-2 shadow-glass-silk cursor-pointer"
            >
              <span>Explore Our Work</span>
              <ArrowDown className="w-4 h-4 text-luxury-dustyrose" />
            </button>
          </div>

          {/* TRUSTED BY : Client Logos Strip (Always visible on initial load) */}
          <div ref={trustedByRef} className="pt-3 w-full">
            <span className="text-xs font-black tracking-widest text-purple-950/80 dark:text-purple-300/90 uppercase font-mono block mb-3">
              TRUSTED BY :
            </span>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              {/* Logo 1: Toppers Academy */}
              <a
                href="https://www.toppersacademytup.com/"
                target="_blank"
                rel="noopener noreferrer"
                title="Visit Toppers Academy"
                className="h-14 sm:h-16 flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
              >
                <img
                  src="/images/clients/toppers-academy.png"
                  alt="Toppers Academy"
                  loading="eager"
                  // @ts-ignore
                  fetchPriority="high"
                  decoding="async"
                  className="h-10 sm:h-13 w-auto object-contain"
                />
              </a>

              {/* Logo 2: Sri Kungumayi Traders */}
              <a
                href="https://srikungumayitraders.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                title="Visit Sri Kungumayi Traders"
                className="h-14 sm:h-16 flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
              >
                <img
                  src="/images/clients/sri-kungumayi.png"
                  alt="Sri Kungumayi Traders"
                  loading="eager"
                  // @ts-ignore
                  fetchPriority="high"
                  decoding="async"
                  className="h-10 sm:h-13 w-auto object-contain"
                />
              </a>

              {/* Logo 3: C&C (Crumbs & Coffee) */}
              <a
                href="https://crumbsandcoffee.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                title="Visit Crumbs & Coffee"
                className="h-14 sm:h-16 flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
              >
                <img
                  src="/images/clients/cnc.png"
                  alt="Crumbs & Coffee"
                  loading="eager"
                  // @ts-ignore
                  fetchPriority="high"
                  decoding="async"
                  className="h-10 sm:h-13 w-auto object-contain"
                />
              </a>
            </div>
          </div>

        </div>

        {/* Right Side 3D Laptop Interactive Canvas */}
        <div className="lg:col-span-5 w-full h-[320px] sm:h-[400px] md:h-[500px] lg:h-[580px] relative">
          <Hero3DCanvas scrollProgress={scrollProgress} />
        </div>
      </div>
    </section>
  );
}
