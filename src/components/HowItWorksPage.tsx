import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, 
  ArrowRight, 
  Store, 
  ShoppingBag, 
  Bike, 
  ShieldCheck, 
  Clock, 
  ChefHat, 
  Receipt,
  Sparkles,
  Smartphone,
  CreditCard,
  Percent
} from 'lucide-react';
import { OnboardingModal } from './OnboardingModal';

export const HowItWorksPage: React.FC = () => {
  const [onboardOpen, setOnboardOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'customer' | 'restaurant'>('customer');

  return (
    <div className="bg-[#F8F1E4] text-[#3B0A14]">
      {/* Header Banner */}
      <section className="py-16 sm:py-24 bg-[#3B0A14] text-[#F8F1E4] relative overflow-hidden border-b-2 border-[#C9A227]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-4">
          <span className="inline-block bg-[#C9A227] text-[#3B0A14] text-[10px] uppercase font-black px-3 py-1 rounded-full tracking-widest">
            The Zero-Commission Architecture
          </span>
          <h1 className="font-serif font-black text-4xl sm:text-5xl lg:text-6xl leading-tight">
            How FairBite Works
          </h1>
          <p className="text-base sm:text-lg text-[#F8F1E4]/80 max-w-2xl mx-auto font-medium">
            A radical departure from exploitative aggregator algorithms. Transparent dine-in pricing for foodies, flat predictable subscriptions for kitchens.
          </p>

          {/* Toggle Tab */}
          <div className="pt-6">
            <div className="inline-flex p-1.5 bg-white/10 rounded-2xl border border-white/20">
              <button
                onClick={() => setActiveTab('customer')}
                className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'customer'
                    ? 'bg-[#C9A227] text-[#3B0A14] shadow-md'
                    : 'text-[#F8F1E4] hover:text-white'
                }`}
              >
                Customer Flow
              </button>
              <button
                onClick={() => setActiveTab('restaurant')}
                className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'restaurant'
                    ? 'bg-[#C9A227] text-[#3B0A14] shadow-md'
                    : 'text-[#F8F1E4] hover:text-white'
                }`}
              >
                Restaurant Flow
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Process Timeline */}
      <section className="py-16 sm:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {activeTab === 'customer' ? (
          <div className="space-y-16">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C9A227]">
                Customer Journey
              </span>
              <h2 className="font-serif font-black text-3xl sm:text-4xl text-[#3B0A14]">
                From Cravings to Doorstep at Dine-In Prices
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Step 1 */}
              <div className="bg-white rounded-3xl p-8 border-2 border-[#3B0A14]/15 relative space-y-5 shadow-lg">
                <div className="w-12 h-12 rounded-2xl bg-[#3B0A14] text-[#C9A227] flex items-center justify-center font-serif font-black text-xl shadow-md">
                  1
                </div>
                <h3 className="font-serif font-bold text-2xl text-[#3B0A14]">
                  Browse & Discover
                </h3>
                <p className="text-xs sm:text-sm text-[#6B5347] leading-relaxed">
                  Open the FairBite app or website and select your favorite restaurant in Jamshedpur. Every price you see is verified against the restaurant's physical counter menu.
                </p>
                <div className="bg-[#FAF7F2] p-3.5 rounded-2xl text-xs font-mono text-[#3B0A14] border border-[#3B0A14]/10">
                  Biryani menu rate: ₹200<br />
                  FairBite markup: <b className="text-[#3B8C5A]">₹0</b>
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-white rounded-3xl p-8 border-2 border-[#3B0A14]/15 relative space-y-5 shadow-lg">
                <div className="w-12 h-12 rounded-2xl bg-[#3B0A14] text-[#C9A227] flex items-center justify-center font-serif font-black text-xl shadow-md">
                  2
                </div>
                <h3 className="font-serif font-bold text-2xl text-[#3B0A14]">
                  Checkout Direct
                </h3>
                <p className="text-xs sm:text-sm text-[#6B5347] leading-relaxed">
                  Pay directly to the restaurant via UPI (PhonePe, GPay, Paytm) or Cash on Delivery. There are no platform surge fees, handling charges, or convenience tolls.
                </p>
                <div className="bg-[#FAF7F2] p-3.5 rounded-2xl text-xs font-mono text-[#3B0A14] border border-[#3B0A14]/10">
                  Payment routing: Direct to Restaurant<br />
                  Settlement: <b className="text-[#3B8C5A]">Instant</b>
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-white rounded-3xl p-8 border-2 border-[#3B0A14]/15 relative space-y-5 shadow-lg">
                <div className="w-12 h-12 rounded-2xl bg-[#3B0A14] text-[#C9A227] flex items-center justify-center font-serif font-black text-xl shadow-md">
                  3
                </div>
                <h3 className="font-serif font-bold text-2xl text-[#3B0A14]">
                  Kitchen Fleet Delivers
                </h3>
                <p className="text-xs sm:text-sm text-[#6B5347] leading-relaxed">
                  The restaurant prepares your food and dispatches their own delivery team. Track live dispatch status on our radar and receive your food piping hot.
                </p>
                <div className="bg-[#FAF7F2] p-3.5 rounded-2xl text-xs font-mono text-[#3B0A14] border border-[#3B0A14]/10">
                  Rider: Trusted Kitchen Staff<br />
                  Quality: <b className="text-[#3B8C5A]">Guaranteed Fresh</b>
                </div>
              </div>
            </div>

            <div className="text-center pt-4">
              <Link
                to="/order"
                className="bg-[#3B0A14] hover:bg-[#57182A] text-[#F8F1E4] px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest inline-flex items-center gap-2 shadow-xl hover:scale-105 transition-all"
              >
                <span>Try Ordering on FairBite</span>
                <ArrowRight size={16} className="text-[#C9A227]" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-16">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C9A227]">
                Restaurant Kitchen Journey
              </span>
              <h2 className="font-serif font-black text-3xl sm:text-4xl text-[#3B0A14]">
                How Kitchens Save ₹50,000+ Every Month
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Step 1 */}
              <div className="bg-white rounded-3xl p-8 border-2 border-[#3B0A14]/15 relative space-y-5 shadow-lg">
                <div className="w-12 h-12 rounded-2xl bg-[#C9A227] text-[#3B0A14] flex items-center justify-center font-serif font-black text-xl shadow-md">
                  1
                </div>
                <h3 className="font-serif font-bold text-2xl text-[#3B0A14]">
                  Quick Digitisation
                </h3>
                <p className="text-xs sm:text-sm text-[#6B5347] leading-relaxed">
                  Our local Jamshedpur onboarding rep visits your kitchen, digitises your counter menu at exact dine-in rates, and activates your merchant POS dashboard in 24 hours.
                </p>
                <div className="bg-[#FAF7F2] p-3.5 rounded-2xl text-xs font-mono text-[#3B0A14] border border-[#3B0A14]/10">
                  Onboarding: Free local setup<br />
                  Menu listing: 100% accurate
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-white rounded-3xl p-8 border-2 border-[#3B0A14]/15 relative space-y-5 shadow-lg">
                <div className="w-12 h-12 rounded-2xl bg-[#C9A227] text-[#3B0A14] flex items-center justify-center font-serif font-black text-xl shadow-md">
                  2
                </div>
                <h3 className="font-serif font-bold text-2xl text-[#3B0A14]">
                  Instant KOT & Direct Cash
                </h3>
                <p className="text-xs sm:text-sm text-[#6B5347] leading-relaxed">
                  Incoming orders ping directly on your Kitchen Order Ticket (KOT) terminal. Money from UPI goes straight to your business bank account with zero deductions.
                </p>
                <div className="bg-[#FAF7F2] p-3.5 rounded-2xl text-xs font-mono text-[#3B0A14] border border-[#3B0A14]/10">
                  Commission per order: <b className="text-[#3B8C5A]">₹0</b><br />
                  Customer phone: Full visibility
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-white rounded-3xl p-8 border-2 border-[#3B0A14]/15 relative space-y-5 shadow-lg">
                <div className="w-12 h-12 rounded-2xl bg-[#C9A227] text-[#3B0A14] flex items-center justify-center font-serif font-black text-xl shadow-md">
                  3
                </div>
                <h3 className="font-serif font-bold text-2xl text-[#3B0A14]">
                  Dispatch & Retain
                </h3>
                <p className="text-xs sm:text-sm text-[#6B5347] leading-relaxed">
                  Assign orders to your in-house delivery boys. Build lifelong relationships with neighborhood diners who re-order directly through your verified digital storefront.
                </p>
                <div className="bg-[#FAF7F2] p-3.5 rounded-2xl text-xs font-mono text-[#3B0A14] border border-[#3B0A14]/10">
                  Customer loyalty: 100% yours<br />
                  Predictable billing: ₹999/mo
                </div>
              </div>
            </div>

            <div className="text-center pt-4">
              <button
                onClick={() => setOnboardOpen(true)}
                className="bg-[#C9A227] hover:bg-[#B38F1E] text-[#3B0A14] px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest inline-flex items-center gap-2 shadow-xl hover:scale-105 transition-all cursor-pointer"
              >
                <span>Apply to List Your Restaurant</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Comparison Deep-dive */}
      <section className="py-16 sm:py-24 bg-white border-t border-[#3B0A14]/15">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <span className="bg-[#3B0A14] text-[#C9A227] text-[10px] uppercase font-black px-3 py-1 rounded-full tracking-widest inline-block">
              Radical Transparency
            </span>
            <h2 className="font-serif font-black text-3xl sm:text-4xl text-[#3B0A14]">
              Where Does Your Money Actually Go?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#FAF5F5] rounded-3xl p-8 border border-red-200 space-y-4">
              <h3 className="font-serif font-bold text-xl text-red-700">The Traditional Aggregator Model</h3>
              <ul className="space-y-3 text-xs sm:text-sm text-[#6B5347]">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✕</span>
                  <span>Charges restaurant 28% commission on food total.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✕</span>
                  <span>Forces restaurant to hike prices online by 30%.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✕</span>
                  <span>Adds platform fee, delivery surge, handling charge.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold">✕</span>
                  <span>Masks customer numbers and withholds weekly payouts.</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#F2F8F4] rounded-3xl p-8 border-2 border-[#3B8C5A] space-y-4">
              <h3 className="font-serif font-bold text-xl text-[#3B8C5A]">The FairBite Direct Model</h3>
              <ul className="space-y-3 text-xs sm:text-sm text-[#3B0A14] font-medium">
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-[#3B8C5A] shrink-0 mt-0.5" />
                  <span>0% commission on all orders. Restaurant keeps 100%.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-[#3B8C5A] shrink-0 mt-0.5" />
                  <span>Exact counter dine-in rates for every customer.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-[#3B8C5A] shrink-0 mt-0.5" />
                  <span>Direct UPI payments to kitchen bank account.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-[#3B8C5A] shrink-0 mt-0.5" />
                  <span>Fixed flat subscription from ₹999/month.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <OnboardingModal isOpen={onboardOpen} onClose={() => setOnboardOpen(false)} />
    </div>
  );
};
