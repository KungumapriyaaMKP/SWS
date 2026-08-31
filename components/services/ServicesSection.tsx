'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Globe, Briefcase, Cpu, Code2, Layout, Zap, ArrowUpRight, CheckCircle2 } from 'lucide-react';

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
  highlights: string[];
  gradient: string;
}

const services: ServiceItem[] = [
  {
    id: 'web-dev',
    number: '01',
    title: 'WEBSITE DEVELOPMENT',
    description: 'High-performance websites engineered to captivate visitors, rank high, and maximize conversion rates.',
    icon: <Globe className="w-7 h-7 text-luxury-lavender dark:text-purple-300" />,
    tags: ['Next.js App Router', 'TypeScript', 'Tailwind CSS', 'GSAP Animations', 'Headless CMS'],
    highlights: ['Sub-second page loads', 'SEO & Web Vitals optimized', 'Responsive across all devices'],
    gradient: 'from-purple-500/10 via-pink-500/5 to-transparent',
  },
  {
    id: 'portfolios',
    number: '02',
    title: 'PORTFOLIO DEVELOPMENT',
    description: 'High-impact personal & executive portfolio websites crafted to build authority, showcase achievements, and secure deals.',
    icon: <Briefcase className="w-7 h-7 text-luxury-dustyrose dark:text-pink-300" />,
    tags: ['Executive Branding', 'Interactive Case Studies', '3D Visual Embeds', 'Custom Domain Setup'],
    highlights: ['Tailored executive storytelling', 'Awwwards-grade visuals', 'Instant lead inquiry capture'],
    gradient: 'from-pink-500/10 via-purple-500/5 to-transparent',
  },
  {
    id: 'ai-solutions',
    number: '03',
    title: 'AI SOLUTIONS',
    description: 'Intelligent AI agents and custom RAG systems that automate complex business tasks and unlock growth.',
    icon: <Cpu className="w-7 h-7 text-luxury-deepviolet dark:text-indigo-300" />,
    tags: ['Custom LLM Integration', 'AI Customer Agents', 'Document RAG Engines', 'Predictive Analytics'],
    highlights: ['24/7 automated support', 'Private data security', 'Seamless API connection'],
    gradient: 'from-indigo-500/10 via-purple-500/5 to-transparent',
  },
  {
    id: 'custom-software',
    number: '04',
    title: 'CUSTOM SOFTWARE',
    description: 'Scalable SaaS platforms and custom web applications tailored around your company’s unique workflow.',
    icon: <Code2 className="w-7 h-7 text-luxury-dustyrose dark:text-purple-300" />,
    tags: ['Full-Stack SaaS', 'Cloud Microservices', 'API Architecture', 'Database Optimization'],
    highlights: ['Modular clean code', 'Enterprise security', 'Built for high scale'],
    gradient: 'from-rose-500/10 via-pink-500/5 to-transparent',
  },
  {
    id: 'ui-ux',
    number: '05',
    title: 'UI/UX DESIGN',
    description: 'User-centered product design that turns complex software features into simple, intuitive user journeys.',
    icon: <Layout className="w-7 h-7 text-luxury-sage dark:text-emerald-300" />,
    tags: ['Product Strategy', 'Design Systems', 'Figma Prototypes', 'User Testing'],
    highlights: ['Pixel-perfect components', 'Accessible UI standards', 'High conversion UX'],
    gradient: 'from-emerald-500/10 via-teal-500/5 to-transparent',
  },
  {
    id: 'automation',
    number: '06',
    title: 'BUSINESS AUTOMATION',
    description: 'Connect your favorite tools, eliminate repetitive manual data entry, and accelerate operational output.',
    icon: <Zap className="w-7 h-7 text-luxury-gold dark:text-amber-300" />,
    tags: ['Workflow Pipelines', 'Webhook Integrations', 'CRM & Billing Sync', 'Error Resilience'],
    highlights: ['Zero manual data entry', 'Real-time alert logging', 'Cross-platform sync'],
    gradient: 'from-amber-500/10 via-orange-500/5 to-transparent',
  },
];

export function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const cards = container.querySelectorAll('.service-bento-card');
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            delay: (index % 2) * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top bottom-=80',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const handleInquiry = (serviceTitle: string) => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="services" ref={containerRef} className="relative py-28 px-4 md:px-8 overflow-hidden transition-colors duration-300">
      {/* Background Glows */}
      <div className="ambient-glow-1 top-20 right-10" />
      <div className="ambient-glow-2 bottom-20 left-10" />

      <div className="max-w-7xl mx-auto z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-luxury-lavender/30 text-[11px] font-bold tracking-widest text-ebony dark:text-silk-100 uppercase mb-4 shadow-glass-silk">
              OUR CAPABILITIES
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ebony dark:text-silk-100 leading-tight">
              WE TURN IDEAS INTO <br />
              <span className="text-gradient-hero italic font-normal">DIGITAL PRODUCTS.</span>
            </h2>
          </div>
          <p className="text-ebony-muted dark:text-text-secondary text-base md:text-lg max-w-lg font-medium leading-relaxed">
            Full-cycle engineering, strategic design, and custom digital products crafted to move your business forward.
          </p>
        </div>

        {/* Bento Grid Layout (2 Columns on Desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="service-bento-card relative flex flex-col justify-between p-8 md:p-10 bg-white dark:bg-[#120E1F] border-2 border-purple-900/20 dark:border-purple-400/30 shadow-2xl hover:shadow-purple-900/10 hover:border-purple-600 transition-all duration-300 group overflow-hidden"
            >
              {/* Top Accent Stripe */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600" />

              <div className="relative z-10 space-y-6">
                {/* Header Row */}
                <div className="flex items-center justify-between pt-2">
                  <span className="font-serif text-4xl font-bold text-purple-950 dark:text-purple-300">
                    {service.number}
                  </span>
                  <div className="p-3.5 bg-purple-50 dark:bg-white/5 border border-purple-200 dark:border-purple-500/30 text-purple-900 dark:text-purple-300 shadow-sm">
                    {service.icon}
                  </div>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-purple-950 dark:text-white mb-3 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-purple-900/80 dark:text-zinc-300 text-sm md:text-base leading-relaxed font-medium">
                    {service.description}
                  </p>
                </div>

                {/* Key Benefits Checklist */}
                <div className="space-y-2.5 pt-2">
                  {service.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs font-bold text-purple-950 dark:text-zinc-200">
                      <CheckCircle2 className="w-4 h-4 text-pink-600 dark:text-pink-400 flex-shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Tags & Action */}
              <div className="relative z-10 pt-8 mt-6 border-t border-purple-900/15 dark:border-white/10">
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 text-xs font-bold text-purple-950 dark:text-purple-200 bg-purple-100/70 dark:bg-white/10 border border-purple-300/60 dark:border-white/20 shadow-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <button
                  onClick={() => handleInquiry(service.title)}
                  className="w-full py-3.5 px-6 bg-[#3B0764] dark:bg-purple-600 hover:bg-purple-950 dark:hover:bg-purple-700 text-white flex items-center justify-between text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md group/btn"
                >
                  <span>Start {service.title}</span>
                  <ArrowUpRight className="w-4 h-4 text-pink-300 transition-transform duration-300 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
