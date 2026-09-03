'use client';

import { useState, useRef, useEffect } from 'react';
import { Bot, MessageSquare, X, Send, Sparkles, ArrowRight, ChevronRight, RefreshCw, CheckCircle2, Phone, Mail } from 'lucide-react';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  actions?: { label: string; action: string }[];
}

const initialMessages: Message[] = [
  {
    id: '1',
    sender: 'bot',
    text: "Hello! Welcome to Sumya Web Studio.\nI'm your AI assistant. How can I help turn your idea into a high-converting digital product today?",
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    actions: [
      { label: '🔥 15% Off Offer', action: 'offer' },
      { label: '7-Day Sprint', action: 'sprint' },
      { label: 'View Our Work', action: 'work' },
      { label: 'Start a Project', action: 'contact' },
    ],
  },
];

const knowledgeBase: Record<string, { reply: string; actions?: { label: string; action: string }[] }> = {
  offer: {
    reply: "🎉 SPECIAL LIMITED TIME OFFER:\nTake FLAT 15% OFF on all web development, 3D WebGL showcases, executive portfolios, and AI automation services!\n\nWould you like to claim this offer for your project?",
    actions: [{ label: 'Claim 15% Discount', action: 'contact' }],
  },
  sprint: {
    reply: "Our 7-Day Engineering Sprint guarantees launch predictability:\n• Day 1: Discovery & Blueprinting\n• Day 2: UI/UX & High-Conversion Wireframes\n• Days 3-4: Next.js 14 & 3D WebGL Build\n• Days 5-6: Lighthouse 90+ Speed QA & Mobile Audit\n• Day 7: Global Edge CDN Deployment & Launch!",
    actions: [{ label: 'Book Sprint Blueprint', action: 'contact' }],
  },
  work: {
    reply: "Here are some of our featured live client web applications:\n1. Crumbs & Coffee: 3D artisanal coffee showcase with instant table reservations.\n2. Toppers Academy: High-conversion NEET coaching portal & admissions engine.\n3. Sri Kungumayi Traders: B2B industrial textile & quotation catalog.",
    actions: [{ label: 'Explore Showcase', action: 'portfolio' }, { label: 'Start Your Project', action: 'contact' }],
  },
  services: {
    reply: "We offer 5 core digital engineering services:\n1. High-Performance Website & App Development\n2. Executive & Personal Brand Portfolios\n3. Interactive 3D WebGL & Canvas Experiences\n4. AI Chatbots & Business Automation\n5. Custom SaaS Software & B2B Portals",
    actions: [{ label: 'Get Service Quote', action: 'contact' }],
  },
  pricing: {
    reply: "Our project investments range from ₹10,000 to ₹3,00,000+ ($120 to $3,600+) depending on scope.\n\n✨ Good news: You can claim our FLAT 15% DISCOUNT today!",
    actions: [{ label: 'Request Custom Quote', action: 'contact' }],
  },
  contactDetails: {
    reply: "You can reach the Sumya Web Studio engineering team directly via:\n• Phone / WhatsApp: +91 7867896369\n• Email: sumyawebstudio@gmail.com\n• Instagram: @sumya.web.studio\n\nWe respond to all project inquiries within 24 hours!",
    actions: [{ label: 'Open Contact Form', action: 'scrollToContact' }],
  },
  techStack: {
    reply: "We build exclusively with modern high-performance technologies:\n• Frontend: Next.js 14, React 18, TypeScript, Tailwind CSS\n• 3D & Motion: Three.js, React Three Fiber, GSAP, Framer Motion\n• Speed & SEO: SSR/SSG Edge CDN, Lighthouse 90+ Web Vitals Certified",
    actions: [{ label: 'Start Project', action: 'contact' }],
  },
  contact: {
    reply: "Awesome! You can fill out our instant project inquiry form or connect with us on WhatsApp (+91 7867896369).",
    actions: [{ label: 'Go to Contact Form', action: 'scrollToContact' }],
  },
  default: {
    reply: "Thank you for asking! Sumya Web Studio specializes in ultra-fast Next.js web applications, 3D WebGL showcases, and AI business automation.\n\nWould you like to discuss your project requirements or claim our 15% discount offer?",
    actions: [{ label: '🔥 Claim 15% Off', action: 'offer' }, { label: 'Start a Project', action: 'contact' }],
  },
};

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      scrollToBottom();
    }
  }, [isOpen, messages]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsTyping(true);

    // Precise Keyword AI Matcher
    setTimeout(() => {
      const lower = query.toLowerCase();
      let key = 'default';

      if (lower.includes('offer') || lower.includes('discount') || lower.includes('15') || lower.includes('deal') || lower.includes('sale')) {
        key = 'offer';
      } else if (lower.includes('phone') || lower.includes('number') || lower.includes('whatsapp') || lower.includes('call') || lower.includes('email') || lower.includes('mail') || lower.includes('reach') || lower.includes('location') || lower.includes('address')) {
        key = 'contactDetails';
      } else if (lower.includes('tech') || lower.includes('stack') || lower.includes('next') || lower.includes('react') || lower.includes('three') || lower.includes('webgl') || lower.includes('speed') || lower.includes('seo')) {
        key = 'techStack';
      } else if (lower.includes('sprint') || lower.includes('day') || lower.includes('fast') || lower.includes('timeline') || lower.includes('how long')) {
        key = 'sprint';
      } else if (lower.includes('work') || lower.includes('portfolio') || lower.includes('case study') || lower.includes('project') || lower.includes('client') || lower.includes('example') || lower.includes('crumbs') || lower.includes('toppers')) {
        key = 'work';
      } else if (lower.includes('service') || lower.includes('offer') || lower.includes('build') || lower.includes('what do you do')) {
        key = 'services';
      } else if (lower.includes('price') || lower.includes('cost') || lower.includes('quote') || lower.includes('rate') || lower.includes('budget') || lower.includes('how much')) {
        key = 'pricing';
      } else if (lower.includes('contact') || lower.includes('hire') || lower.includes('talk') || lower.includes('book') || lower.includes('inquir')) {
        key = 'contact';
      }

      const match = knowledgeBase[key] || knowledgeBase.default;

      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: match.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: match.actions,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleAction = (action: string) => {
    if (action === 'scrollToContact' || action === 'contact') {
      setIsOpen(false);
      const el = document.querySelector('#contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'portfolio') {
      setIsOpen(false);
      const el = document.querySelector('#work');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      handleSend(action);
    }
  };

  return (
    <>
      {/* Sleek Icon/Logo Floating Trigger Button (Compact Circular Logo on Mobile & Desktop) */}
      <div className="fixed bottom-5 right-5 z-50 flex items-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 rounded-full bg-gradient-to-r from-[#3B0764] via-[#5B1390] to-[#7E22CE] hover:from-[#4A0A7C] hover:to-[#9324C9] text-white shadow-[0_10px_30px_rgba(91,19,144,0.5)] border-2 border-purple-400/50 backdrop-blur-xl transition-all duration-300 hover:scale-110 active:scale-95 group cursor-pointer flex items-center justify-center p-0.5"
          aria-label="Toggle AI Assistant Chat"
          title="Chat with SUMYA AI"
        >
          <div className="relative w-full h-full rounded-full border-2 border-purple-200/90 overflow-hidden bg-[#E9D5FF] flex items-center justify-center">
            {isOpen ? (
              <div className="w-full h-full bg-[#3B0764] flex items-center justify-center">
                <X className="w-6 h-6 text-pink-300 group-hover:rotate-90 transition-transform" />
              </div>
            ) : (
              <img
                src="/ai-robot-avatar.jpg"
                alt="SUMYA AI Avatar"
                className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform"
              />
            )}
            {hasUnread && !isOpen && (
              <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-pink-500 border-2 border-white animate-ping" />
            )}
          </div>
        </button>
      </div>

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 md:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px] h-[520px] max-h-[80vh] rounded-2xl bg-white/95 dark:bg-[#150729]/95 backdrop-blur-2xl border border-purple-500/30 shadow-[0_25px_70px_rgba(0,0,0,0.35)] flex flex-col overflow-hidden transition-all duration-300">
          {/* Header */}
          <div className="px-5 py-4 bg-gradient-to-r from-[#2A0548] via-[#3B0764] to-[#5B1390] text-white flex items-center justify-between border-b border-purple-500/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-purple-300/50 overflow-hidden bg-purple-900 flex-shrink-0 shadow-sm">
                <img src="/ai-robot-avatar.jpg" alt="SUMYA AI" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="font-serif text-sm font-bold tracking-wide flex items-center gap-1.5">
                  SUMYA AI ASSISTANT
                </h3>
                <div className="flex items-center gap-1.5 text-[10px] text-pink-300 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online • Instant Specific Answers</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/10 text-purple-200 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-purple-50/40 dark:bg-[#100422]/60">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 text-xs md:text-sm font-medium leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-[#3B0764] to-[#5B1390] text-white rounded-2xl rounded-tr-sm border border-purple-400/30'
                      : 'bg-white dark:bg-[#230C40] text-purple-950 dark:text-zinc-100 rounded-2xl rounded-tl-sm border border-purple-900/10 dark:border-purple-500/20'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>

                  {/* Message Action Buttons */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-purple-900/10 dark:border-purple-500/20 flex flex-wrap gap-2">
                      {msg.actions.map((act, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleAction(act.action)}
                          className="px-3 py-1.5 rounded-full bg-gradient-to-r from-[#3B0764] to-[#5B1390] hover:from-[#4A0A7C] hover:to-[#6B18A5] text-white text-[11px] font-bold tracking-wider uppercase transition-all flex items-center gap-1 shadow-sm hover:scale-105 cursor-pointer"
                        >
                          <span>{act.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <span className="text-[9px] text-purple-900/50 dark:text-purple-300/50 font-mono mt-1 px-1">
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 rounded-2xl rounded-tl-sm bg-white dark:bg-[#230C40] border border-purple-900/10 w-16">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce [animation-delay:0.4s]" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-3 py-2 bg-white dark:bg-[#150729] border-t border-purple-900/10 dark:border-purple-500/20 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <button
              onClick={() => handleSend('Tell me about the 15% offer')}
              className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider bg-pink-100 dark:bg-pink-950/80 text-pink-700 dark:text-pink-300 border border-pink-300/40 rounded-full whitespace-nowrap hover:bg-pink-200 dark:hover:bg-pink-900/80 transition-colors cursor-pointer"
            >
              🔥 15% Offer
            </button>
            <button
              onClick={() => handleSend('What is your phone number and email?')}
              className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider bg-purple-100 dark:bg-purple-950/80 text-purple-950 dark:text-purple-200 border border-purple-300/40 rounded-full whitespace-nowrap hover:bg-purple-200 dark:hover:bg-purple-900/80 transition-colors cursor-pointer"
            >
              Phone & Email
            </button>
            <button
              onClick={() => handleSend('What tech stack do you use?')}
              className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider bg-purple-100 dark:bg-purple-950/80 text-purple-950 dark:text-purple-200 border border-purple-300/40 rounded-full whitespace-nowrap hover:bg-purple-200 dark:hover:bg-purple-900/80 transition-colors cursor-pointer"
            >
              Tech Stack
            </button>
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white dark:bg-[#150729] border-t border-purple-900/10 dark:border-purple-500/20 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask anything about our services, pricing, or tech..."
              className="flex-1 px-4 py-2.5 text-xs rounded-full bg-purple-50 dark:bg-[#230C40] text-purple-950 dark:text-zinc-100 border border-purple-900/15 dark:border-purple-500/30 focus:outline-none focus:border-purple-500 font-medium"
            />
            <button
              type="submit"
              className="p-2.5 rounded-full bg-gradient-to-r from-[#3B0764] to-[#6B21A8] hover:scale-105 text-white transition-all shadow-md flex items-center justify-center cursor-pointer"
              aria-label="Send Message"
            >
              <Send className="w-4 h-4 text-pink-300" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
