'use client';

import { useState } from 'react';
import { HelpCircle, ChevronDown, Sparkles, MessageSquare, ArrowRight } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    category: 'Engineering & Delivery',
    question: 'What is the 7-Day Engineering Sprint model?',
    answer:
      'Our 7-Day Engineering Sprint is a structured production workflow engineered for speed and precision. We complete Discovery on Day 1, UI/UX Wireframing on Day 2, Full-Stack Build on Days 3-4, Lighthouse 90+ QA on Days 5-6, and Global Edge CDN Deployment on Day 7.',
  },
  {
    category: 'Capabilities',
    question: 'What types of digital products does Sumya Web Studio build?',
    answer:
      'We engineer high-performance Next.js websites, executive & personal brand portfolios, 3D WebGL interactive showcases, AI chatbots & automation solutions, custom SaaS software platforms, and high-conversion e-commerce storefronts.',
  },
  {
    category: 'Performance',
    question: 'How do you ensure sub-second page performance and top SEO rankings?',
    answer:
      'We build exclusively with Next.js 14 Server-Side Rendering (SSR), static site generation (SSG), automated WebP/AVIF image optimization, code splitting, and global CDN edge distribution to achieve Google Lighthouse 90+ Web Vitals scores.',
  },
  {
    category: 'AI & Automation',
    question: 'How can AI solutions benefit my business?',
    answer:
      'Custom AI solutions (like 24/7 client support bots, automated lead qualification, and RAG knowledge engines) eliminate repetitive manual inquiries, reduce support costs, and capture client leads around the clock.',
  },
  {
    category: 'Project Pricing & Process',
    question: 'How do project inquiries, pricing, and onboarding work?',
    answer:
      'You can submit your project requirements via our contact form or call/WhatsApp +91 7867896369. We review your scope, outline a transparent 7-day engineering blueprint, and begin immediate discovery upon alignment.',
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-24 px-4 md:px-8 bg-white dark:bg-[#0A0810] transition-colors duration-300">
      <div className="ambient-glow-1 top-10 right-10" />

      <div className="max-w-5xl mx-auto z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-none glass-panel border border-luxury-lavender/40 text-[11px] font-bold tracking-widest text-[#3B0764] dark:text-purple-300 uppercase mb-4 shadow-sm">
            <HelpCircle className="w-3.5 h-3.5 text-pink-500" />
            <span>ANSWER ENGINE & FREQUENTLY ASKED QUESTIONS</span>
          </div>
          <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tight text-purple-950 dark:text-white">
            EVERYTHING YOU NEED <span className="text-gradient-hero italic font-normal">TO KNOW.</span>
          </h2>
          <p className="text-purple-900/80 dark:text-zinc-300 text-sm md:text-base mt-3 font-medium">
            Clear, transparent answers about our engineering sprints, 3D WebGL architecture, AI solutions, and project delivery.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqData.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="rounded-none bg-gradient-to-b from-white via-purple-50/20 to-white dark:from-[#130E26] dark:via-[#0F0A20] dark:to-[#0A0714] border border-purple-900/10 dark:border-purple-500/20 shadow-sm transition-all duration-300 overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 md:p-8 text-left flex items-center justify-between gap-6 cursor-pointer focus:outline-none"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-black tracking-wider text-pink-600 dark:text-pink-400 uppercase px-3 py-1 bg-pink-100/70 dark:bg-pink-950/50 border border-pink-200 dark:border-pink-500/30 hidden sm:inline-block">
                      {faq.category}
                    </span>
                    <h3 className="font-serif text-lg md:text-xl font-bold text-purple-950 dark:text-white">
                      {faq.question}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-purple-600 dark:text-purple-300 flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-pink-500' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 md:px-8 md:pb-8 pt-0 border-t border-purple-900/10 dark:border-white/10 mt-2">
                    <p className="text-purple-900/80 dark:text-zinc-300 text-sm md:text-base leading-relaxed font-medium pt-4">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom Contact CTA Box */}
        <div className="mt-12 p-6 md:p-8 rounded-none bg-purple-900/5 dark:bg-purple-950/30 border border-purple-900/10 dark:border-purple-500/20 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-none bg-purple-600/15 border border-purple-500/30 flex items-center justify-center text-purple-600 dark:text-purple-300 flex-shrink-0">
              <MessageSquare className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg font-bold text-purple-950 dark:text-white">Have a specific technical question?</h4>
              <p className="text-xs md:text-sm text-purple-900/70 dark:text-zinc-400 font-medium">
                Our engineering team is ready to guide you through your exact project requirements.
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="px-6 py-3 rounded-none text-xs font-extrabold tracking-wider uppercase text-white bg-gradient-to-r from-[#3B0764] via-purple-700 to-indigo-700 hover:from-purple-900 hover:to-indigo-800 shadow-md flex items-center gap-2 whitespace-nowrap"
          >
            <span>Ask Us Directly</span>
            <ArrowRight className="w-4 h-4 text-pink-300" />
          </a>
        </div>
      </div>
    </section>
  );
}
