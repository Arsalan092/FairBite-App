import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Store, 
  CheckCircle2, 
  ArrowRight, 
  TrendingUp, 
  DollarSign, 
  ShieldCheck, 
  Sparkles, 
  Bike, 
  ChefHat, 
  Users, 
  BarChart3,
  Percent
} from 'lucide-react';
import { OnboardingModal } from './OnboardingModal';
import { SavingsCalculator } from './SavingsCalculator';

export const ForRestaurantsPage: React.FC = () => {
  const [onboardOpen, setOnboardOpen] = useState(false);
  const [revenue, setRevenue] = useState(300000);

  const aggregatorCut = Math.round(revenue * 0.28);
  const fairbitePlan = 2499;
  const annualSaved = (aggregatorCut - fairbitePlan) * 12;

  return (
    <div className="bg-[#F8F1E4] text-[#3B0A14]">
      {/* Hero Header */}
      <section className="py-16 sm:py-24 bg-[#3B0A14] text-[#F8F1E4] relative overflow-hidden border-b-2 border-[#C9A227]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <span className="inline-block bg-[#C9A227] text-[#3B0A14] text-[10px] uppercase font-black px-3 py-1 rounded-full tracking-widest">
            For Restaurant Owners in Jamshedpur
          </span>
          <h1 className="font-serif font-black text-4xl sm:text-5xl lg:text-6xl leading-tight">
            Stop Giving 28% of Your Hard-Earned Food Sales to Delivery Apps.
          </h1>
          <p className="text-base sm:text-lg text-[#F8F1E4]/80 max-w-2xl mx-auto font-medium">
            FairBite is the zero-commission restaurant network. List your menu, receive direct customer orders, and pay one flat monthly fee starting at ₹999.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setOnboardOpen(true)}
              className="bg-[#C9A227] hover:bg-[#B38F1E] text-[#3B0A14] px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-xl hover:scale-105 cursor-pointer flex items-center gap-2"
            >
              <span>List Your Restaurant Now</span>
              <ArrowRight size={16} />
            </button>
            <Link
              to="/pricing"
              className="bg-white/10 hover:bg-white/20 text-[#F8F1E4] border border-white/30 px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all"
            >
              View Flat Subscription Plans
            </Link>
          </div>
        </div>
      </section>

      {/* The Math & Profit Retention */}
      <section className="py-16 sm:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SavingsCalculator initialTab="restaurant" />
      </section>

      {/* 4 Pillars for Restaurants */}
      <section className="py-16 sm:py-24 bg-white border-t border-b border-[#3B0A14]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="bg-[#C9A227]/20 text-[#3B0A14] text-[10px] uppercase font-black px-3 py-1 rounded-full tracking-widest inline-block">
              The FairBite Advantage
            </span>
            <h2 className="font-serif font-black text-3xl sm:text-4xl text-[#3B0A14]">
              Why Jamshedpur Kitchens Are Switching
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-[#FAF7F2] p-8 rounded-3xl border border-[#3B0A14]/15 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#3B0A14] text-[#C9A227] flex items-center justify-center">
                <Percent size={24} />
              </div>
              <h3 className="font-serif font-bold text-xl text-[#3B0A14]">0% Commission</h3>
              <p className="text-xs sm:text-sm text-[#6B5347] leading-relaxed">
                We never take a cut of your dishes. When a customer orders ₹500 of Biryani, you receive the full ₹500.
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-8 rounded-3xl border border-[#3B0A14]/15 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#3B0A14] text-[#C9A227] flex items-center justify-center">
                <Users size={24} />
              </div>
              <h3 className="font-serif font-bold text-xl text-[#3B0A14]">Customer Ownership</h3>
              <p className="text-xs sm:text-sm text-[#6B5347] leading-relaxed">
                You get full visibility of customer names, addresses, and phone numbers to build loyal recurring relationships.
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-8 rounded-3xl border border-[#3B0A14]/15 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#3B0A14] text-[#C9A227] flex items-center justify-center">
                <Bike size={24} />
              </div>
              <h3 className="font-serif font-bold text-xl text-[#3B0A14]">Fleet Empowerment</h3>
              <p className="text-xs sm:text-sm text-[#6B5347] leading-relaxed">
                Use your existing delivery staff. Keep them active and employed throughout the day while ensuring high food hygiene.
              </p>
            </div>

            <div className="bg-[#FAF7F2] p-8 rounded-3xl border border-[#3B0A14]/15 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#3B0A14] text-[#C9A227] flex items-center justify-center">
                <DollarSign size={24} />
              </div>
              <h3 className="font-serif font-bold text-xl text-[#3B0A14]">Instant Settlements</h3>
              <p className="text-xs sm:text-sm text-[#6B5347] leading-relaxed">
                UPI payments go straight to your UPI ID/Bank account with zero delay. Cash is collected directly at delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Onboarding Roadmap */}
      <section className="py-16 sm:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="bg-[#3B0A14] text-[#F8F1E4] text-[10px] uppercase font-black px-3 py-1 rounded-full tracking-widest inline-block">
            Easy 3-Step Setup
          </span>
          <h2 className="font-serif font-black text-3xl sm:text-4xl text-[#3B0A14]">
            How Onboarding Works
          </h2>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#3B0A14]/15 flex items-start gap-6 shadow-md">
            <span className="font-serif font-black text-3xl text-[#C9A227] shrink-0">01</span>
            <div className="space-y-1">
              <h4 className="font-serif font-bold text-xl text-[#3B0A14]">Submit Application</h4>
              <p className="text-xs sm:text-sm text-[#6B5347]">
                Fill out our quick 2-minute form with your restaurant name, area in Jamshedpur, and chosen plan.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#3B0A14]/15 flex items-start gap-6 shadow-md">
            <span className="font-serif font-black text-3xl text-[#C9A227] shrink-0">02</span>
            <div className="space-y-1">
              <h4 className="font-serif font-bold text-xl text-[#3B0A14]">Local Representative Visit</h4>
              <p className="text-xs sm:text-sm text-[#6B5347]">
                Our local team in Jamshedpur visits your counter, photographs your menu, and configures your live POS tablet.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#3B0A14]/15 flex items-start gap-6 shadow-md">
            <span className="font-serif font-black text-3xl text-[#C9A227] shrink-0">03</span>
            <div className="space-y-1">
              <h4 className="font-serif font-bold text-xl text-[#3B0A14]">Start Receiving 100% Retained Orders</h4>
              <p className="text-xs sm:text-sm text-[#6B5347]">
                Go live to thousands of local diners who love paying genuine dine-in prices!
              </p>
            </div>
          </div>
        </div>

        <div className="text-center pt-6">
          <button
            onClick={() => setOnboardOpen(true)}
            className="bg-[#3B0A14] hover:bg-[#57182A] text-[#F8F1E4] px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-xl hover:scale-105 cursor-pointer"
          >
            Apply to Join the FairBite Partner Network
          </button>
        </div>
      </section>

      <OnboardingModal isOpen={onboardOpen} onClose={() => setOnboardOpen(false)} />
    </div>
  );
};
