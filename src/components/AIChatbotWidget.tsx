import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  User, 
  Sparkles, 
  ShieldCheck, 
  Percent, 
  Store, 
  ArrowRight,
  Calculator,
  HelpCircle
} from 'lucide-react';
import { useGlobal } from '../context/GlobalContext';

interface Message {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  quickActions?: { label: string; action: string }[];
}

export const AIChatbotWidget: React.FC = () => {
  const { setShowTransparencyModal, restaurants } = useGlobal();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'ai',
      text: 'Namaste! 🙏 I am the FairBite AI Concierge. How can I help you today? I can explain how FairBite saves 25–30% on food orders, calculate your savings, help list your restaurant, or answer questions.',
      timestamp: 'Just now',
      quickActions: [
        { label: '💰 How much do I save?', action: 'savings' },
        { label: '🏪 List my restaurant', action: 'onboard' },
        { label: '🛵 Who delivers the food?', action: 'delivery' },
        { label: '📍 Is this in Jamshedpur?', action: 'jamshedpur' },
      ]
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input.trim();
    if (!query) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let replyText = '';
      let actions: { label: string; action: string }[] | undefined;

      const lower = query.toLowerCase();

      if (lower.includes('saving') || lower.includes('save') || lower.includes('calculate') || lower.includes('price') || lower.includes('markup')) {
        replyText = 'On traditional apps like Swiggy and Zomato, a 25–30% commission is secretly marked up onto menu prices. For example, a ₹200 Chicken Biryani costs ₹260 on other apps. On FairBite, you pay exactly ₹200 (dine-in counter rate) with ₹0 markup!';
        actions = [
          { label: '🔍 View Price Comparison Proof', action: 'open_proof' },
          { label: '🍽️ Explore Live Restaurants', action: 'order' }
        ];
      } else if (lower.includes('list') || lower.includes('restaurant') || lower.includes('partner') || lower.includes('onboard') || lower.includes('plan') || lower.includes('subscription')) {
        replyText = 'Restaurants pay ZERO commission per order on FairBite. Instead, you choose a flat monthly subscription:\n• Starter (₹999/mo) — up to 150 orders\n• Growth (₹2,499/mo) — Unlimited orders\n• Premium (₹4,999/mo) — Multi-outlet\nYou keep 100% of your customer bills directly!';
        actions = [
          { label: '📋 View All Pricing Plans', action: 'pricing' },
          { label: '📝 List Your Restaurant Form', action: 'onboard_modal' }
        ];
      } else if (lower.includes('deliver') || lower.includes('fleet') || lower.includes('boy') || lower.includes('rider')) {
        replyText = 'FairBite empowers local restaurants to use their own trusted delivery staff, or coordinate with trusted local delivery partners in Jamshedpur. This gives restaurants full control over food quality, delivery speed, and customer experience without third-party delivery delays.';
      } else if (lower.includes('jamshedpur') || lower.includes('city') || lower.includes('location') || lower.includes('area')) {
        replyText = 'FairBite is actively onboarding restaurants across Jamshedpur! We are live in Bistupur, Sakchi, Kadma, Sonari, Telco, and Golmuri. Over 5 leading local culinary kitchens are already live.';
        actions = [
          { label: '🍛 See Jamshedpur Restaurants', action: 'order' }
        ];
      } else if (lower.includes('menu') || lower.includes('food') || lower.includes('order') || lower.includes('biryani')) {
        replyText = 'We have top Jamshedpur favorites like The Mughal Suite, Dosa Coffee & Co., Royal Awadh Handi, Sweet Bengal, and Chai & Chaat Co. All at exact dine-in rates!';
        actions = [
          { label: '🛒 Start Food Order', action: 'order' }
        ];
      } else {
        replyText = `Thank you for your question! FairBite is built on the principle of 0% per-order commission — restaurants pay a flat monthly fee, and customers enjoy real dine-in rates without middleman surcharges. Would you like to explore the menu, check restaurant plans, or calculate your bill savings?`;
        actions = [
          { label: '💰 Check Price Savings', action: 'savings' },
          { label: '🏪 Restaurant Subscription', action: 'pricing' },
          { label: '🍛 Order Food', action: 'order' }
        ];
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickActions: actions
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleActionClick = (action: string) => {
    if (action === 'open_proof') {
      setShowTransparencyModal(true);
    } else if (action === 'savings') {
      handleSend('How much money do customers save on FairBite?');
    } else if (action === 'onboard' || action === 'onboard_modal') {
      window.location.href = '/for-restaurants';
    } else if (action === 'pricing') {
      window.location.href = '/pricing';
    } else if (action === 'order') {
      window.location.href = '/order';
    } else if (action === 'delivery') {
      handleSend('How does delivery and fleet work?');
    } else if (action === 'jamshedpur') {
      handleSend('Is FairBite available in Jamshedpur?');
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed bottom-6 right-6 z-40">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group bg-[#3B0A14] hover:bg-[#57182A] text-[#F8F1E4] p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl border-2 border-[#C9A227] flex items-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            aria-label="Open FairBite AI Assistant"
          >
            <div className="relative">
              <Bot size={22} className="text-[#C9A227]" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#3B8C5A] rounded-full ring-2 ring-[#3B0A14] animate-pulse" />
            </div>
            <div className="hidden sm:block text-left">
              <span className="block text-[9px] uppercase font-black tracking-widest text-[#C9A227] leading-none">
                AI Concierge
              </span>
              <span className="text-xs font-bold leading-none">Ask FairBite</span>
            </div>
          </button>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-4 sm:right-6 z-50 w-[92vw] sm:w-96 bg-[#F8F1E4] text-[#3B0A14] rounded-3xl shadow-2xl border-2 border-[#3B0A14]/25 overflow-hidden flex flex-col h-[520px] max-h-[85vh] animate-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-[#3B0A14] text-[#F8F1E4] p-4 flex items-center justify-between border-b-2 border-[#C9A227]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#C9A227] text-[#3B0A14] flex items-center justify-center font-bold shadow-xs">
                <Bot size={20} />
              </div>
              <div>
                <h4 className="font-serif font-black text-sm leading-tight flex items-center gap-1.5">
                  <span>FairBite AI Concierge</span>
                  <Sparkles size={13} className="text-[#C9A227]" />
                </h4>
                <p className="text-[10px] text-[#F8F1E4]/70 font-medium">
                  Instant help • 0% Commission Guide
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/10 text-[#F8F1E4] transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs bg-[#F8F1E4]">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-6 h-6 rounded-full bg-[#3B0A14] text-[#C9A227] flex items-center justify-center shrink-0 mt-1">
                    <Bot size={13} />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl p-3 shadow-xs ${
                    m.sender === 'user'
                      ? 'bg-[#3B0A14] text-[#F8F1E4] rounded-tr-xs'
                      : 'bg-white text-[#3B0A14] border border-[#3B0A14]/15 rounded-tl-xs'
                  }`}
                >
                  <p className="whitespace-pre-line leading-relaxed font-medium">{m.text}</p>
                  <span className={`block text-[9px] mt-1.5 text-right font-mono ${
                    m.sender === 'user' ? 'text-[#F8F1E4]/60' : 'text-[#6B5347]/60'
                  }`}>
                    {m.timestamp}
                  </span>

                  {/* Quick Action Chips */}
                  {m.quickActions && m.quickActions.length > 0 && (
                    <div className="mt-2.5 pt-2 border-t border-gray-100 flex flex-wrap gap-1.5">
                      {m.quickActions.map((qa, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleActionClick(qa.action)}
                          className="bg-[#F8F1E4] hover:bg-[#C9A227]/20 border border-[#3B0A14]/20 hover:border-[#C9A227] text-[#3B0A14] px-2.5 py-1 rounded-full text-[10px] font-bold transition-all cursor-pointer"
                        >
                          {qa.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-2.5 justify-start">
                <div className="w-6 h-6 rounded-full bg-[#3B0A14] text-[#C9A227] flex items-center justify-center shrink-0">
                  <Bot size={13} />
                </div>
                <div className="bg-white border border-[#3B0A14]/15 rounded-2xl p-3 rounded-tl-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#C9A227] rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-[#C9A227] rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-[#C9A227] rounded-full animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-[#3B0A14]/15 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about savings, restaurants, or plans..."
              className="flex-1 bg-[#F8F1E4] border border-[#3B0A14]/20 rounded-full px-4 py-2 text-xs font-medium focus:outline-hidden focus:border-[#C9A227]"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="bg-[#3B0A14] hover:bg-[#57182A] text-[#F8F1E4] p-2 rounded-full transition-colors disabled:opacity-40 cursor-pointer"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
