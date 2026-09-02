'use client';

import { useRef } from 'react';
import { Globe, Briefcase, Cpu, Code2, Layout, Zap, ArrowUpRight, CheckCircle2, ShoppingBag, Sparkles, Smartphone, Palette, Building2, LineChart } from 'lucide-react';


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
    icon: <Globe className="w-7 h-7 text-purple-600 dark:text-purple-300" />,
    tags: ['Custom Web Design', 'Ultra-Fast Loading', 'SEO & Search Optimized', 'Mobile & Tablet Ready', 'Easy Content Manager'],
    highlights: ['Sub-second page loads', 'SEO & Web Vitals optimized', 'Responsive across all devices'],
    gradient: 'from-purple-500/10 via-pink-500/5 to-transparent',
  },
  {
    id: 'portfolios',
    number: '02',
    title: 'PORTFOLIO DEVELOPMENT',
    description: 'High-impact personal & executive portfolio websites crafted to build authority, showcase achievements, and secure deals.',
    icon: <Briefcase className="w-7 h-7 text-pink-600 dark:text-pink-300" />,
    tags: ['Personal Brand Identity', 'Interactive Case Studies', 'Client Lead Capture', 'Custom Domain & Email'],
    highlights: ['Tailored executive storytelling', 'Awwwards-grade visuals', 'Instant lead inquiry capture'],
    gradient: 'from-pink-500/10 via-purple-500/5 to-transparent',
  },
  {
    id: 'ai-solutions',
    number: '03',
    title: 'AI SOLUTIONS',
    description: 'Intelligent AI agents and custom RAG systems that automate complex business tasks and unlock growth.',
    icon: <Cpu className="w-7 h-7 text-indigo-600 dark:text-indigo-300" />,
    tags: ['24/7 AI Customer Assistant', 'Automated Lead Support', 'Smart Knowledge Search', 'Business Intelligence'],
    highlights: ['24/7 automated support', 'Private data security', 'Seamless API connection'],
    gradient: 'from-indigo-500/10 via-purple-500/5 to-transparent',
  },
  {
    id: 'custom-software',
    number: '04',
    title: 'CUSTOM SOFTWARE',
    description: 'Scalable SaaS platforms and custom web applications tailored around your company’s unique workflow.',
    icon: <Code2 className="w-7 h-7 text-purple-600 dark:text-purple-300" />,
    tags: ['Custom Web Application', 'Secure Client Dashboard', 'Automated Workflows', 'Scalable Cloud Portal'],
    highlights: ['Modular clean code', 'Enterprise security', 'Built for high scale'],
    gradient: 'from-rose-500/10 via-pink-500/5 to-transparent',
  },
  {
    id: 'ui-ux',
    number: '05',
    title: 'UI/UX DESIGN',
    description: 'User-centered product design that turns complex software features into simple, intuitive user journeys.',
    icon: <Layout className="w-7 h-7 text-emerald-600 dark:text-emerald-300" />,
    tags: ['User-Friendly Layouts', 'Interactive Prototypes', 'Modern Luxury Aesthetic', 'Seamless User Experience'],
    highlights: ['Pixel-perfect components', 'Accessible UI standards', 'High conversion UX'],
    gradient: 'from-emerald-500/10 via-teal-500/5 to-transparent',
  },
  {
    id: 'automation',
    number: '06',
    title: 'BUSINESS AUTOMATION',
    description: 'Connect your favorite tools, eliminate repetitive manual data entry, and accelerate operational output.',
    icon: <Zap className="w-7 h-7 text-amber-600 dark:text-amber-300" />,
    tags: ['Zero Manual Data Entry', 'App & CRM Integration', 'Automated Invoicing', 'Instant Team Alerts'],
    highlights: ['Zero manual data entry', 'Real-time alert logging', 'Cross-platform sync'],
    gradient: 'from-amber-500/10 via-orange-500/5 to-transparent',
  },
  {
    id: 'ecommerce',
    number: '07',
    title: 'E-COMMERCE & STOREFRONTS',
    description: 'High-converting custom online stores with 3D product visualizers, instant checkout, and automated inventory sync.',
    icon: <ShoppingBag className="w-7 h-7 text-violet-600 dark:text-violet-300" />,
    tags: ['Instant Checkout Flow', 'Secure Payment Gateway', 'Interactive 3D Preview', 'Inventory Sync', 'High Conversion Store'],
    highlights: ['High conversion checkout flow', '3D interactive product previews', 'Global multi-currency support'],
    gradient: 'from-violet-500/10 via-purple-500/5 to-transparent',
  },
  {
    id: 'webgl-3d',
    number: '08',
    title: '3D WEBGL & INTERACTIVE',
    description: 'Immersive Three.js & WebGL spatial experiences that captivate users with 3D interactive models and Awwwards-grade graphics.',
    icon: <Sparkles className="w-7 h-7 text-cyan-600 dark:text-cyan-300" />,
    tags: ['3D Product Showcases', 'Interactive Brand Effects', 'Smooth Scroll Animations', 'Immersive Digital Experience'],
    highlights: ['60fps smooth 3D canvas rendering', 'Immersive spatial brand storytelling', 'Cross-browser & mobile optimized'],
    gradient: 'from-cyan-500/10 via-blue-500/5 to-transparent',
  },
  {
    id: 'mobile-apps',
    number: '09',
    title: 'MOBILE APP DEVELOPMENT',
    description: 'Native iOS and Android mobile applications engineered for high performance, fluid gesture controls, and offline readiness.',
    icon: <Smartphone className="w-7 h-7 text-fuchsia-600 dark:text-fuchsia-300" />,
    tags: ['iOS & Android Apps', 'Instant Push Notifications', 'Offline Support', 'App Store & Play Store Launch'],
    highlights: ['Sub-second app responsiveness', 'Cross-platform single codebase', 'App Store & Play Store approval'],
    gradient: 'from-fuchsia-500/10 via-pink-500/5 to-transparent',
  },
  {
    id: 'brand-strategy',
    number: '10',
    title: 'BRAND STRATEGY & IDENTITY',
    description: 'Comprehensive brand identity design, logo systems, typography guidelines, and digital brand collateral built for authority.',
    icon: <Palette className="w-7 h-7 text-rose-600 dark:text-rose-300" />,
    tags: ['Custom Logo & Icon Kit', 'Brand Color & Typography', 'Social Media Kits', 'Brand Guidelines'],
    highlights: ['Cohesive premium brand system', 'Vector logo & icon asset kits', 'Scalable design guidelines'],
    gradient: 'from-rose-500/10 via-amber-500/5 to-transparent',
  },
  {
    id: 'erp-systems',
    number: '11',
    title: 'ERP & ENTERPRISE SYSTEMS',
    description: 'Custom Enterprise Resource Planning (ERP) software connecting inventory, financial ledgers, HR, supply chain, and operations into a single real-time dashboard.',
    icon: <Building2 className="w-7 h-7 text-blue-600 dark:text-blue-300" />,
    tags: ['Unified Operations Dashboard', 'Automated Inventory & Billing', 'HR & Payroll Modules', 'Real-Time Enterprise Analytics', 'Custom Workflows & Reporting'],
    highlights: ['Centralized multi-department data hub', 'Role-based access & security control', 'Automated business reporting & sync'],
    gradient: 'from-blue-500/10 via-indigo-500/5 to-transparent',
  },
  {
    id: 'digital-marketing-seo',
    number: '12',
    title: 'DIGITAL MARKETING & SEO',
    description: 'Data-driven Search Engine Optimization (SEO), conversion rate optimization, and growth strategy engineered to rank high and maximize organic revenue.',
    icon: <LineChart className="w-7 h-7 text-emerald-600 dark:text-emerald-300" />,
    tags: ['SEO & Search Engine Ranking', 'Conversion Rate Optimization', 'Organic Lead Pipeline', 'Performance Analytics', 'Growth Marketing Strategy'],
    highlights: ['Top Search Engine ranking strategy', 'Data-driven conversion optimization', 'Real-time performance analytics & insights'],
    gradient: 'from-emerald-500/10 via-teal-500/5 to-transparent',
  },
];

export function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

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
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-none glass-panel border border-luxury-lavender/30 text-[11px] font-bold tracking-widest text-ebony dark:text-silk-100 uppercase mb-4 shadow-glass-silk">
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
              className="service-bento-card relative flex flex-col justify-between p-8 md:p-10 rounded-none bg-gradient-to-b from-white/95 via-purple-50/30 to-white/90 dark:from-[#130E26]/90 dark:via-[#110A22]/90 dark:to-[#0A0714]/90 border border-purple-900/10 dark:border-purple-500/20 shadow-[0_15px_45px_-10px_rgba(59,7,100,0.06)] hover:shadow-[0_25px_60px_-15px_rgba(59,7,100,0.16)] hover:border-purple-500/50 transition-all duration-500 group overflow-hidden hover:-translate-y-1.5"
            >
              {/* Ambient Corner Glow Effect */}
              <div className={`absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br ${service.gradient} rounded-none blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`} />

              <div className="relative z-10 space-y-6">
                {/* Header Row: Number */}
                <div className="flex items-center justify-between">
                  <span className="font-serif text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#3B0764] via-purple-700 to-pink-600 dark:from-purple-300 dark:via-pink-300 dark:to-pink-400">
                    {service.number}
                  </span>
                </div>

                {/* Title & Description */}
                <div>
                  <h3 className="font-serif text-2xl md:text-3xl font-bold text-purple-950 dark:text-white mb-3 group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-purple-900/80 dark:text-zinc-300 text-sm md:text-base leading-relaxed font-medium">
                    {service.description}
                  </p>
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {service.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-semibold text-[#3B0764] dark:text-purple-200 bg-purple-100/70 dark:bg-purple-900/30 border border-purple-200/80 dark:border-purple-500/30 px-3.5 py-1.5 rounded-none backdrop-blur-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Key Benefits Checklist */}
                <div className="space-y-2.5 pt-3 border-t border-purple-900/10 dark:border-white/10">
                  {service.highlights.map((highlight, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs md:text-sm font-semibold text-purple-950 dark:text-zinc-200">
                      <div className="w-4 h-4 rounded-none bg-pink-500/15 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-3.5 h-3.5 text-pink-600 dark:text-pink-400" />
                      </div>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Action Button */}
              <div className="relative z-10 pt-6 mt-6">
                <button
                  onClick={() => handleInquiry(service.title)}
                  className="w-full py-3.5 px-6 rounded-none bg-[#3B0764] dark:bg-purple-600 hover:bg-purple-950 dark:hover:bg-purple-700 text-white flex items-center justify-between text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md group/btn hover:shadow-xl hover:shadow-purple-900/20 cursor-pointer"
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
