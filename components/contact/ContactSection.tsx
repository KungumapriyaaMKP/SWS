'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Mail, CheckCircle2, ArrowRight, Instagram, ChevronRight, User, Briefcase, MessageSquare, Lock, Sparkles, ChevronDown, Check, Phone, Linkedin } from 'lucide-react';

interface CustomDropdownProps {
  label: string;
  placeholder: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}

function CustomDropdown({ label, placeholder, value, options, onChange }: CustomDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-xs font-extrabold tracking-wider text-purple-950 dark:text-zinc-300 mb-2 uppercase">
        {label}
      </label>

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3.5 rounded-none bg-[#F9FAFB] dark:bg-white/5 border border-[#E5E7EB] dark:border-white/10 text-purple-950 dark:text-white flex items-center justify-between transition-all duration-200 text-xs font-semibold focus:outline-none focus:border-purple-600 focus:bg-white cursor-pointer"
      >
        <span className={value ? 'text-purple-950 dark:text-white font-bold' : 'text-gray-400 dark:text-zinc-500'}>
          {value || placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-purple-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1 z-50 bg-white dark:bg-[#1A112E] border border-purple-200 dark:border-purple-500/40 rounded-none shadow-2xl overflow-hidden max-h-60 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="py-1">
            {options.map((opt) => (
              <button
                type="button"
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
                className={`w-full px-4 py-3 text-left text-xs font-semibold transition-colors flex items-center justify-between cursor-pointer ${
                  value === opt
                    ? 'bg-purple-100/70 dark:bg-purple-900/50 text-purple-900 dark:text-purple-300 font-bold'
                    : 'text-purple-950 dark:text-zinc-200 hover:bg-purple-50 dark:hover:bg-white/10'
                }`}
              >
                <span>{opt}</span>
                {value === opt && <Check className="w-4 h-4 text-purple-600 dark:text-purple-400" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    serviceType: '',
    budget: '',
    timeline: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const message = `Hello Sumya Web Studio! I would like to inquire about a project:\n\n` +
      `• Name: ${formData.name}\n` +
      `• Company: ${formData.company || 'N/A'}\n` +
      `• Service: ${formData.serviceType || 'General Inquiry'}\n` +
      `• Budget: ${formData.budget || 'Not specified'}\n` +
      `• Timeline: ${formData.timeline || 'Not specified'}`;

    const whatsappUrl = `https://wa.me/917867896369?text=${encodeURIComponent(message)}`;

    setTimeout(() => {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }, 600);

    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        company: '',
        serviceType: '',
        budget: '',
        timeline: '',
      });
    }, 6000);
  };

  const serviceOptions = [
    'Website Development',
    'Personal & Executive Portfolios',
    'Web Applications',
    'AI Solutions',
    'Custom Software & ERP Systems',
    'UI/UX Design',
    'Business Automation',
    'E-Commerce & Storefronts',
    '3D WebGL & Interactive',
    'Mobile App Development',
    'Brand Strategy & Identity',
  ];

  const budgetOptions = [
    '₹10,000 - ₹25,000 ($120 - $300)',
    '₹25,000 - ₹50,000 ($300 - $600)',
    '₹50,000 - ₹1,50,000 ($600 - $1.8k)',
    '₹1,50,000 - ₹3,00,000 ($1.8k - $3.6k)',
    '₹3,00,000+ ($3.6k+)',
  ];
  const timelineOptions = ['1-2 Weeks', '2-4 Weeks', '1-2 Months', '3+ Months'];

  return (
    <section id="contact" className="relative py-28 px-4 md:px-8 overflow-hidden transition-colors duration-300 scroll-mt-24">
      <div className="ambient-glow-2 top-0 left-10" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start z-10">
        {/* Left Info Column */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-none glass-panel border border-purple-500/20 text-[11px] font-bold tracking-widest text-purple-800 dark:text-purple-300 uppercase mb-4 shadow-glass-light">
              <Sparkles className="w-3.5 h-3.5 text-pink-500" />
              <span>LET&apos;S CONNECT</span>
            </div>

            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-purple-950 dark:text-white leading-[1.1]">
              LET&apos;S BUILD <br />
              <span className="text-gradient-hero italic font-normal">SOMETHING AMAZING TOGETHER.</span>
            </h2>
          </div>

          {/* Contact Info Cards */}
          <div className="space-y-4 pt-2">
            {/* Card 1: Email */}
            <a
              href="mailto:sumyawebstudio@gmail.com"
              className="flex items-center justify-between p-4.5 rounded-none bg-white/90 dark:bg-[#130E26]/90 border border-purple-900/10 dark:border-purple-500/20 shadow-sm hover:shadow-xl hover:border-purple-500/50 hover:-translate-y-0.5 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-none bg-purple-100 dark:bg-purple-900/50 border border-purple-200 dark:border-purple-500/30 flex items-center justify-center text-purple-600 dark:text-purple-300 flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-black tracking-wider text-purple-900/60 dark:text-purple-300/70 block uppercase">
                    EMAIL US
                  </span>
                  <span className="text-xs md:text-sm font-bold text-purple-950 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    sumyawebstudio@gmail.com
                  </span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Card 2: Phone */}
            <a
              href="tel:7867896369"
              className="flex items-center justify-between p-4.5 rounded-none bg-white/90 dark:bg-[#130E26]/90 border border-purple-900/10 dark:border-purple-500/20 shadow-sm hover:shadow-xl hover:border-purple-500/50 hover:-translate-y-0.5 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-none bg-emerald-100 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-black tracking-wider text-emerald-900/60 dark:text-emerald-300/70 block uppercase">
                    CALL OR WHATSAPP
                  </span>
                  <span className="text-xs md:text-sm font-bold text-purple-950 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    +91 7867896369
                  </span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-emerald-400 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Card 3: Instagram */}
            <a
              href="https://www.instagram.com/sumya.web.studio?igsi=ejlhYzg2dWliaDh4&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4.5 rounded-none bg-white/90 dark:bg-[#130E26]/90 border border-purple-900/10 dark:border-purple-500/20 shadow-sm hover:shadow-xl hover:border-pink-500/50 hover:-translate-y-0.5 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-none bg-pink-100 dark:bg-pink-950/50 border border-pink-200 dark:border-pink-500/30 flex items-center justify-center text-pink-600 dark:text-pink-400 flex-shrink-0">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-black tracking-wider text-pink-900/60 dark:text-pink-300/70 block uppercase">
                    INSTAGRAM
                  </span>
                  <span className="text-xs md:text-sm font-bold text-purple-950 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                    @sumya.web.studio
                  </span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-pink-400 group-hover:translate-x-1 transition-transform" />
            </a>

            {/* Card 4: LinkedIn */}
            <a
              href="https://www.linkedin.com/in/sumya-web-studio-undefined-0961aa434/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4.5 rounded-none bg-white/90 dark:bg-[#130E26]/90 border border-purple-900/10 dark:border-purple-500/20 shadow-sm hover:shadow-xl hover:border-blue-500/50 hover:-translate-y-0.5 transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-none bg-blue-100 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-500/30 flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-black tracking-wider text-blue-900/60 dark:text-blue-300/70 block uppercase">
                    LINKEDIN
                  </span>
                  <span className="text-xs md:text-sm font-bold text-purple-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    Sumya Web Studio
                  </span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-blue-400 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Bottom Left Paper Plane & Note - PERFECTLY ALIGNED SINGLE LINE */}
          <div className="pt-4 flex items-center gap-3 text-purple-700 dark:text-purple-300 group">
            <Send className="w-6 h-6 animate-paper-plane-fly text-purple-600 dark:text-purple-400 flex-shrink-0 drop-shadow-md" />
            <span className="font-serif font-bold text-sm sm:text-base whitespace-nowrap text-purple-950 dark:text-purple-300">
              We can&apos;t wait to work with you!
            </span>
          </div>
        </div>

        {/* Right White Card Form - SHARP EDGES */}
        <div className="lg:col-span-7">
          <div className="bg-white dark:bg-[#120B24] p-8 md:p-10 rounded-none border border-purple-900/10 dark:border-purple-500/25 shadow-[0_20px_60px_-15px_rgba(59,7,100,0.08)] relative">
            {submitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-none bg-purple-600/20 border-2 border-purple-500 flex items-center justify-center mx-auto text-purple-600 dark:text-purple-300">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-3xl font-bold text-purple-950 dark:text-white">Project Inquiry Received!</h3>
                <p className="text-purple-900/80 dark:text-zinc-300 text-sm max-w-md mx-auto font-medium">
                  Thank you for reaching out to Sumya Web Studio. Our technical team will review your project details and reply within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Form Header */}
                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-purple-900/10 dark:border-white/10">
                  <div className="w-12 h-12 rounded-none bg-purple-100 dark:bg-purple-900/50 border border-purple-200 dark:border-purple-500/30 flex items-center justify-center text-purple-600 dark:text-purple-300 shadow-sm flex-shrink-0">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl md:text-3xl font-bold text-purple-950 dark:text-white">
                      Send us a message
                    </h3>
                  </div>
                </div>

                {/* Grid Inputs: Name & Company Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-extrabold tracking-wider text-purple-950 dark:text-zinc-300 mb-2 uppercase">
                      YOUR NAME *
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-3.5 w-4 h-4 text-purple-500/70" />
                      <input
                        type="text"
                        required
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-11 pr-4 py-3.5 rounded-none bg-[#F9FAFB] dark:bg-white/5 border border-[#E5E7EB] dark:border-white/10 text-purple-950 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500 focus:outline-none focus:border-purple-600 focus:bg-white transition-colors text-xs font-semibold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-extrabold tracking-wider text-purple-950 dark:text-zinc-300 mb-2 uppercase">
                      COMPANY NAME
                    </label>
                    <div className="relative">
                      <Briefcase className="absolute left-4 top-3.5 w-4 h-4 text-purple-500/70" />
                      <input
                        type="text"
                        placeholder="Enter your company name"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full pl-11 pr-4 py-3.5 rounded-none bg-[#F9FAFB] dark:bg-white/5 border border-[#E5E7EB] dark:border-white/10 text-purple-950 dark:text-white placeholder-gray-400 dark:placeholder-zinc-500 focus:outline-none focus:border-purple-600 focus:bg-white transition-colors text-xs font-semibold"
                      />
                    </div>
                  </div>
                </div>

                {/* Custom Dropdown: Service Type */}
                <CustomDropdown
                  label="WHAT ARE YOU LOOKING TO BUILD? *"
                  placeholder="Select a service"
                  value={formData.serviceType}
                  options={serviceOptions}
                  onChange={(val) => setFormData({ ...formData, serviceType: val })}
                />

                {/* 2-Column Custom Dropdowns: Budget & Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <CustomDropdown
                    label="ESTIMATED BUDGET"
                    placeholder="Select your budget range"
                    value={formData.budget}
                    options={budgetOptions}
                    onChange={(val) => setFormData({ ...formData, budget: val })}
                  />

                  <CustomDropdown
                    label="PROJECT TIMELINE"
                    placeholder="Select timeline"
                    value={formData.timeline}
                    options={timelineOptions}
                    onChange={(val) => setFormData({ ...formData, timeline: val })}
                  />
                </div>

                {/* Submit Button - SHARP EDGES */}
                <button
                  type="submit"
                  className="w-full py-4 rounded-none text-xs font-extrabold tracking-widest uppercase text-white bg-gradient-to-r from-[#3B0764] via-purple-700 to-indigo-700 hover:from-purple-900 hover:to-indigo-800 shadow-xl transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>SEND PROJECT ENQUIRY</span>
                  <ArrowRight className="w-4 h-4 text-pink-300 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Security Footer Note */}
                <div className="flex items-center justify-center gap-2 pt-2 text-xs font-medium text-purple-900/60 dark:text-zinc-400">
                  <Lock className="w-3.5 h-3.5 text-purple-500" />
                  <span>Your information is 100% secure and confidential.</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
