'use client';

import { useState } from 'react';
import { Send, Mail, MapPin, CheckCircle2, ArrowRight } from 'lucide-react';
import { RatingInteraction } from '@/components/ui/emoji-rating';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    serviceType: 'Website Development',
    budget: '$10k - $25k',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        serviceType: 'Website Development',
        budget: '$10k - $25k',
        message: '',
      });
    }, 4000);
  };

  const serviceOptions = [
    'Website Development',
    'Personal & Executive Portfolios',
    'Web Applications',
    'AI Solutions',
    'Custom Software',
    'UI/UX Design',
    'Business Automation',
  ];

  const budgetOptions = ['$5k - $10k', '$10k - $25k', '$25k - $50k', '$50k+'];

  return (
    <section id="contact" className="relative py-24 px-4 md:px-8 overflow-hidden transition-colors duration-300">
      <div className="ambient-glow-2 top-0 left-10" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 z-10">
        {/* Left Info Column */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel border border-purple-500/20 text-[11px] font-bold tracking-widest text-purple-800 dark:text-purple-300 uppercase mb-4 shadow-glass-light">
              START A CONVERSATION
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-purple-950 dark:text-white leading-tight">
              LET&apos;S BUILD YOUR <span className="text-gradient-hero">NEXT PRODUCT.</span>
            </h2>
            <p className="text-purple-900/70 dark:text-text-secondary text-sm md:text-base mt-4 leading-relaxed font-medium">
              Have a project in mind or need technical guidance? Fill out the form or reach out directly. We respond within 24 hours.
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-4 p-4 rounded-2xl glass-panel border border-purple-500/15 shadow-glass-light">
              <div className="p-3 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-700 dark:text-purple-300">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-purple-900/60 dark:text-text-secondary block font-semibold">Direct Email</span>
                <a
                  href="mailto:hello@sumyawebstudio.com"
                  className="text-sm font-bold text-purple-950 dark:text-white hover:text-pink-600 dark:hover:text-purple-400 transition-colors"
                >
                  hello@sumyawebstudio.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl glass-panel border border-white/5">
              <div className="p-3 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-300">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs text-text-secondary block">Studio Presence</span>
                <span className="text-sm font-semibold text-white">Global Remote Studio</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Glass Contact Form */}
        <div className="lg:col-span-7">
          <div className="glass-panel p-8 md:p-10 rounded-3xl border border-white/10 relative">
            {submitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-purple-600/30 border border-purple-400 flex items-center justify-center mx-auto text-purple-300">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white">Project Inquiry Received!</h3>
                <p className="text-text-secondary text-sm max-w-md mx-auto">
                  Thank you for reaching out to Sumya Web Studio. Our technical lead will review your details and reply shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-semibold tracking-wider text-zinc-300 mb-2 uppercase">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Alex Rivera"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold tracking-wider text-zinc-300 mb-2 uppercase">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition-colors text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold tracking-wider text-zinc-300 mb-2 uppercase">
                    Company Name
                  </label>
                  <input
                    type="text"
                    placeholder="Acme Inc."
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition-colors text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold tracking-wider text-zinc-300 mb-2 uppercase">
                    What are you looking to build?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {serviceOptions.map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setFormData({ ...formData, serviceType: opt })}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                          formData.serviceType === opt
                            ? 'bg-purple-600 text-white border-purple-400'
                            : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold tracking-wider text-zinc-300 mb-2 uppercase">
                    Estimated Budget
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {budgetOptions.map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setFormData({ ...formData, budget: opt })}
                        className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                          formData.budget === opt
                            ? 'bg-indigo-600 text-white border-indigo-400'
                            : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold tracking-wider text-zinc-300 mb-2 uppercase">
                    Project Details & Goals *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your project vision, target timeline, and core requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500 transition-colors text-sm resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl text-sm font-semibold tracking-wider text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 shadow-violet-glow hover:shadow-violet-glow-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>SEND PROJECT ENQUIRY</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
