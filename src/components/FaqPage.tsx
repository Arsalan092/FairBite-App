import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  ChevronDown, 
  HelpCircle, 
  Store, 
  ShoppingBag, 
  Bike, 
  CreditCard,
  ArrowRight
} from 'lucide-react';
import { OnboardingModal } from './OnboardingModal';

interface FAQItem {
  question: string;
  answer: string;
  category: 'customers' | 'restaurants' | 'delivery' | 'pricing';
}

export const FaqPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'customers' | 'restaurants' | 'delivery' | 'pricing'>('all');
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0);
  const [onboardOpen, setOnboardOpen] = useState(false);

  const faqs: FAQItem[] = [
    {
      category: 'customers',
      question: 'Why are food prices on FairBite cheaper than Swiggy and Zomato?',
      answer: 'Traditional apps charge restaurants a 25–30% commission per order. To cover this cut, restaurants are forced to inflate their online menu prices by 30%. On FairBite, restaurants pay a flat monthly subscription with 0% per-order commission, so they list their exact dine-in counter menu prices with zero markup.'
    },
    {
      category: 'customers',
      question: 'Are there any hidden platform fees or surge charges at checkout?',
      answer: 'None whatsoever. What you see on the menu is what you pay. There are no artificial platform convenience fees, rainy day surges, or processing charges.'
    },
    {
      category: 'customers',
      question: 'How do I pay for my order?',
      answer: 'You can pay directly to the restaurant via UPI (Google Pay, PhonePe, Paytm, BHIM) or choose Cash on Delivery upon receiving your meal.'
    },
    {
      category: 'restaurants',
      question: 'How does FairBite charge restaurants if there is 0% commission?',
      answer: 'FairBite operates on a transparent SaaS subscription model starting at ₹999/month (Starter) and ₹2,499/month (Growth with unlimited orders). We treat food ordering software as a utility, not an arbitrary 30% toll.'
    },
    {
      category: 'restaurants',
      question: 'Do I get access to customer phone numbers and data?',
      answer: 'Yes, 100%! Unlike aggregators who mask customer information to keep customers dependent on their platform, FairBite gives you complete visibility of customer names, delivery addresses, and phone numbers to foster direct brand loyalty.'
    },
    {
      category: 'delivery',
      question: 'Who delivers the food to the customer?',
      answer: 'Orders are delivered by the restaurant’s own trusted delivery team, or coordinated with reliable local delivery runners. This ensures food arrives fresh, intact, and well-handled without waiting for third-party riders to arrive.'
    },
    {
      category: 'pricing',
      question: 'Can I cancel my restaurant subscription at any time?',
      answer: 'Yes, absolutely. FairBite has zero lock-in contracts. You can switch plans or cancel anytime with a single click from your merchant dashboard.'
    },
    {
      category: 'pricing',
      question: 'Is there any onboarding or setup fee for new restaurants in Jamshedpur?',
      answer: 'No. Our local representative visits your restaurant in Jamshedpur, photographs your physical menu, digitises your items, and configures your order tablet completely free of charge.'
    }
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#F8F1E4] text-[#3B0A14]">
      {/* Hero Header */}
      <section className="py-16 sm:py-24 bg-[#3B0A14] text-[#F8F1E4] relative overflow-hidden border-b-2 border-[#C9A227]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <span className="inline-block bg-[#C9A227] text-[#3B0A14] text-[10px] uppercase font-black px-3 py-1 rounded-full tracking-widest">
            Help Center & FAQ
          </span>
          <h1 className="font-serif font-black text-4xl sm:text-5xl lg:text-6xl leading-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-base sm:text-lg text-[#F8F1E4]/80 max-w-2xl mx-auto font-medium">
            Everything you need to know about 0% commission food ordering, dine-in rate parity, and restaurant subscriptions.
          </p>

          {/* Search bar */}
          <div className="pt-4 max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-3.5 text-[#3B0A14]/60" size={18} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search questions (e.g. commission, payments, delivery)..."
              className="w-full bg-white text-[#3B0A14] rounded-full pl-12 pr-6 py-3.5 text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-[#C9A227] shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Categories & FAQ Accordions */}
      <section className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {[
            { id: 'all', label: 'All Questions' },
            { id: 'customers', label: 'For Diners' },
            { id: 'restaurants', label: 'For Restaurants' },
            { id: 'delivery', label: 'Fleet & Delivery' },
            { id: 'pricing', label: 'Pricing & Billing' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#3B0A14] text-[#F8F1E4] shadow-md'
                  : 'bg-white text-[#6B5347] hover:bg-white/80 border border-[#3B0A14]/15'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-[#3B0A14]/15 p-8">
              <p className="text-sm text-[#6B5347] font-medium">
                No matching questions found for "{searchTerm}".
              </p>
              <button
                onClick={() => { setSearchTerm(''); setActiveCategory('all'); }}
                className="mt-3 text-xs font-bold text-[#C9A227] underline cursor-pointer"
              >
                Clear filters
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isExpanded = expandedIdx === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl border border-[#3B0A14]/15 overflow-hidden transition-all shadow-xs"
                >
                  <button
                    onClick={() => setExpandedIdx(isExpanded ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                  >
                    <span className="font-serif font-bold text-base sm:text-lg text-[#3B0A14]">
                      {faq.question}
                    </span>
                    <ChevronDown
                      size={20}
                      className={`text-[#C9A227] shrink-0 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isExpanded && (
                    <div className="px-6 pb-6 text-xs sm:text-sm text-[#6B5347] leading-relaxed border-t border-gray-100 pt-4 font-medium">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Still have questions banner */}
        <div className="bg-[#FAF7F2] rounded-3xl p-8 border border-[#3B0A14]/15 text-center space-y-3 mt-12">
          <h3 className="font-serif font-bold text-xl text-[#3B0A14]">Still have questions?</h3>
          <p className="text-xs sm:text-sm text-[#6B5347] max-w-md mx-auto">
            Our local Jamshedpur support team is happy to chat via WhatsApp or phone.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link
              to="/contact"
              className="bg-[#3B0A14] text-[#F8F1E4] px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider hover:bg-[#57182A] transition-all"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>

      <OnboardingModal isOpen={onboardOpen} onClose={() => setOnboardOpen(false)} />
    </div>
  );
};
