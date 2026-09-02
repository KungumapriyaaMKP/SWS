'use client';

import { useState, useRef, useEffect } from 'react';
import { Bot, MessageSquare, X, Send, Sparkles, ArrowRight, RefreshCw, CheckCircle2 } from 'lucide-react';

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
    text: "Hello! Welcome to Sumya Web Studio. ✦\nI'm your AI assistant. How can I help turn your idea into a high-converting digital product today?",
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    actions: [
      { label: '⚡ 7-Day Sprint Details', action: 'sprint' },
      { label: '💼 View Our Work', action: 'work' },
      { label: '🚀 Start a Project', action: 'contact' },
    ],
  },
];

const knowledgeBase: Record<string, { reply: string; actions?: { label: string; action: string }[] }> = {
  sprint: {
    reply: "Our 7-Day Engineering Sprint guarantees launch predictability:\n• Day 1: Discover & Blueprint\n• Day 2: UI/UX & Wireframing\n• Days 3-4: Next.js & 3D WebGL Build\n• Days 5-6: QA & Lighthouse 90+\n• Day 7: Global Edge Deployment!",
    actions: [{ label: '📅 Book Sprint Discovery', action: 'contact' }],
  },
  work: {
    reply: "We build premium WebGL 3D sites, executive portfolios, custom SaaS applications, and AI integrations. Check out our interactive showcase above!",
    actions: [{ label: '✨ View Portfolio', action: 'portfolio' }],
  },
  services: {
    reply: "We offer 5 core digital engineering services:\n1. 3D WebGL & Web Architecture\n2. AI & Business Automation\n3. Executive & Brand Portfolios\n4. Custom SaaS & Software\n5. High-Conversion UI/UX Systems",
    actions: [{ label: '🚀 Start a Project', action: 'contact' }],
  },
  pricing: {
    reply: "We structure pricing based on your project goals with fixed 7-day sprint delivery. Tell us about your project requirements and we'll provide a clear, transparent blueprint!",
    actions: [{ label: '💬 Request Proposal', action: 'contact' }],
  },
  contact: {
    reply: "Awesome! Scroll down to our contact form or click below to start a conversation with our engineering team directly.",
    actions: [{ label: '📬 Go to Contact Form', action: 'scrollToContact' }],
  },
  default: {
    reply: "Thank you for asking! Our engineering team specializes in ultra-fast Next.js builds, 3D WebGL experiences, and AI solutions. Would you like to schedule a discovery call or discuss a project?",
    actions: [{ label: '🚀 Start a Project', action: 'contact' }, { label: '⚡ Learn About Sprints', action: 'sprint' }],
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

    // AI Matcher
    setTimeout(() => {
      const lower = query.toLowerCase();
      let key = 'default';
      if (lower.includes('sprint') || lower.includes('day') || lower.includes('fast') || lower.includes('how long')) key = 'sprint';
      else if (lower.includes('work') || lower.includes('portfolio') || lower.includes('case study') || lower.includes('project')) key = 'work';
      else if (lower.includes('service') || lower.includes('offer') || lower.includes('build') || lower.includes('what do you do')) key = 'services';
      else if (lower.includes('price') || lower.includes('cost') || lower.includes('quote') || lower.includes('rate')) key = 'pricing';
      else if (lower.includes('contact') || lower.includes('hire') || lower.includes('email') || lower.includes('talk') || lower.includes('book')) key = 'contact';

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
    }, 700);
  };

  const handleAction = (action: string) => {
    if (action === 'scrollToContact' || action === 'contact') {
      setIsOpen(false);
      const el = document.querySelector('#contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'portfolio') {
      setIsOpen(false);
      const el = document.querySelector('#portfolio');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      handleSend(action);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="hidden md:flex items-center gap-2 px-4 py-2.5 rounded-none bg-[#3B0764] hover:bg-[#2A0548] text-white text-xs font-extrabold tracking-wide shadow-2xl border-2 border-purple-400/40 transition-all duration-300 animate-pulse cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-pink-300" />
            <span>Need Help? Chat with AI</span>
          </button>
        )}

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-14 h-14 rounded-none bg-[#3B0764] hover:bg-[#2A0548] text-white flex items-center justify-center shadow-2xl border-2 border-purple-400/40 transition-all duration-300 group cursor-pointer"
          aria-label="Toggle Chatbot"
        >
          {isOpen ? (
            <X className="w-6 h-6 text-pink-300 transition-transform group-hover:rotate-90" />
          ) : (
            <>
              <Bot className="w-7 h-7 text-pink-300 transition-transform group-hover:scale-110" />
              {hasUnread && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-none bg-pink-500 border-2 border-white text-[9px] font-black flex items-center justify-center animate-bounce">
                  1
                </span>
              )}
            </>
          )}
        </button>
      </div>

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 md:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px] h-[520px] max-h-[80vh] rounded-none bg-white dark:bg-[#18082D] border-2 border-purple-900/20 dark:border-purple-500/40 shadow-2xl flex flex-col overflow-hidden transition-all duration-300">
          {/* Header */}
          <div className="px-5 py-4 bg-[#3B0764] text-white flex items-center justify-between border-b border-purple-500/30">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-none bg-purple-950 border border-purple-400/40 flex items-center justify-center shadow-inner">
                <Bot className="w-5 h-5 text-pink-300" />
              </div>
              <div>
                <h3 className="font-serif text-sm font-bold tracking-wide flex items-center gap-1.5">
                  SUMYA AI ASSISTANT
                </h3>
                <div className="flex items-center gap-1.5 text-[10px] text-pink-300 font-mono">
                  <span className="w-2 h-2 rounded-none bg-emerald-400 animate-pulse" />
                  <span>Online • Instant Reply</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-none hover:bg-white/10 text-purple-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-purple-50/50 dark:bg-[#130326]/60">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3.5 rounded-none text-xs md:text-sm font-medium leading-relaxed shadow-sm ${
                    msg.sender === 'user'
                      ? 'bg-[#3B0764] text-white border border-purple-500/30'
                      : 'bg-white dark:bg-[#250C44] text-purple-950 dark:text-zinc-100 border border-purple-900/10 dark:border-purple-500/20'
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
                          className="px-2.5 py-1 rounded-none bg-[#3B0764] hover:bg-[#2A0548] text-white text-[11px] font-bold tracking-wider uppercase transition-all flex items-center gap-1 shadow-sm"
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
              <div className="flex items-center gap-1.5 p-3 rounded-none bg-white dark:bg-[#250C44] border border-purple-900/10 w-16">
                <span className="w-1.5 h-1.5 rounded-none bg-purple-600 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-none bg-pink-500 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-none bg-purple-400 animate-bounce [animation-delay:0.4s]" />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-3 py-2 bg-white dark:bg-[#18082D] border-t border-purple-900/10 dark:border-purple-500/20 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <button
              onClick={() => handleSend('What services do you offer?')}
              className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-purple-100 dark:bg-purple-950/60 text-purple-950 dark:text-purple-200 border border-purple-300/40 rounded-none whitespace-nowrap hover:bg-purple-200 transition-colors"
            >
              ⚡ Services
            </button>
            <button
              onClick={() => handleSend('How fast can you launch?')}
              className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-purple-100 dark:bg-purple-950/60 text-purple-950 dark:text-purple-200 border border-purple-300/40 rounded-none whitespace-nowrap hover:bg-purple-200 transition-colors"
            >
              ⏱ 7-Day Sprint
            </button>
            <button
              onClick={() => handleSend('How do I start a project?')}
              className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-purple-100 dark:bg-purple-950/60 text-purple-950 dark:text-purple-200 border border-purple-300/40 rounded-none whitespace-nowrap hover:bg-purple-200 transition-colors"
            >
              🚀 Start Project
            </button>
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white dark:bg-[#18082D] border-t border-purple-900/10 dark:border-purple-500/20 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask anything about our studio..."
              className="flex-1 px-3 py-2 text-xs rounded-none bg-purple-50 dark:bg-[#250C44] text-purple-950 dark:text-zinc-100 border border-purple-900/15 dark:border-purple-500/30 focus:outline-none focus:border-purple-600 font-medium"
            />
            <button
              type="submit"
              className="p-2 rounded-none bg-[#3B0764] hover:bg-[#2A0548] text-white transition-colors shadow-sm"
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
