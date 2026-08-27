import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Percent, 
  TrendingUp, 
  Layers, 
  Store 
} from 'lucide-react';
import { useGlobal } from '../context/GlobalContext';
import { SUBSCRIPTION_PLANS } from '../data/mockData';

export const SubscriptionView: React.FC = () => {
  const navigate = useNavigate();
  const { selectedRestaurant, updateSubscription, showToast } = useGlobal();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [salesSlider, setSalesSlider] = useState<number>(250000);

  const currentPlan = selectedRestaurant?.subscription || 'Growth';

  // Savings simulation at current sales level
  const traditionalAggregatorCut = Math.round(salesSlider * 0.28);
  const fairbiteCost = 2499;
  const netMonthlyPreserved = traditionalAggregatorCut - fairbiteCost;
  const netAnnualPreserved = netMonthlyPreserved * 12;

  const handleSelectPlan = (planName: 'Starter' | 'Growth' | 'Premium') => {
    if (selectedRestaurant) {
      updateSubscription(selectedRestaurant.id, planName);
    } else {
      showToast(`Activated ${planName} Plan!`, 'success');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F1E4] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 bg-[#3B0A14] text-[#C9A227] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-[#C9A227]/30 shadow">
            <Percent size={14} className="text-[#C9A227]" />
            Zero Commission Model for Kitchens
          </div>

          <h1 className="font-serif font-black text-3xl sm:text-5xl text-[#3B0A14] tracking-tight uppercase">
            Stop giving away 28% of your kitchen's hard work.
          </h1>

          <p className="text-sm sm:text-base text-[#6B5347] font-medium leading-relaxed max-w-2xl mx-auto">
            One flat transparent subscription. <strong className="text-[#3B0A14]">0% per-order commission forever.</strong> Retain 100% of your diner check and build long-term local wealth.
          </p>

          {/* Billing cycle toggle */}
          <div className="pt-2 flex items-center justify-center gap-3">
            <span className={`text-xs font-bold uppercase tracking-wider ${billingCycle === 'monthly' ? 'text-[#3B0A14]' : 'text-[#6B5347]'}`}>
              Monthly Billing
            </span>

            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              className="relative w-14 h-7 bg-[#3B0A14] rounded-full p-1 transition-colors cursor-pointer border border-[#C9A227]/40"
            >
              <div
                className={`w-5 h-5 bg-[#C9A227] rounded-full shadow transform transition-transform ${
                  billingCycle === 'annual' ? 'translate-x-7' : 'translate-x-0'
                }`}
              />
            </button>

            <span className={`text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${billingCycle === 'annual' ? 'text-[#3B0A14]' : 'text-[#6B5347]'}`}>
              <span>Annual Billing</span>
              <span className="bg-[#3B8C5A] text-white text-[9px] px-2 py-0.5 rounded-full font-black tracking-wider">
                SAVE 20%
              </span>
            </span>
          </div>
        </div>

        {/* Subscription Plan Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {SUBSCRIPTION_PLANS.map((plan) => {
            const isSelected = currentPlan.toLowerCase() === plan.id;
            const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between bg-white rounded-3xl p-8 border transition-all shadow-md ${
                  plan.recommended
                    ? 'border-[#C9A227] shadow-2xl scale-102 lg:-translate-y-2'
                    : 'border-[#3B0A14]/15 hover:border-[#C9A227]/60'
                }`}
              >
                {/* Recommended Badge */}
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#C9A227] text-[#3B0A14] px-5 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow border border-[#3B0A14]/20">
                    {plan.badge || 'Recommended for High Growth'}
                  </div>
                )}

                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif font-black text-2xl text-[#3B0A14] uppercase tracking-tight">
                      {plan.name}
                    </h3>
                    {isSelected && (
                      <span className="bg-[#3B8C5A]/10 text-[#3B8C5A] text-[9px] font-mono font-black uppercase px-2 py-0.5 rounded-full border border-[#3B8C5A]/30">
                        Current Plan
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#6B5347] font-medium mb-6 min-h-[36px]">
                    {plan.description}
                  </p>

                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="font-serif font-black text-4xl text-[#3B0A14]">
                      ₹{price.toLocaleString()}
                    </span>
                    <span className="text-xs text-[#6B5347] font-serif italic">/ month</span>
                  </div>
                  <p className="text-[10px] text-[#3B8C5A] font-extrabold uppercase tracking-wider mb-6 font-mono">
                    {plan.ordersCap} • 0% Commission
                  </p>

                  {/* Feature Checklist */}
                  <div className="space-y-3 pt-4 border-t border-[#3B0A14]/10 mb-8">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-[#3B0A14] font-medium">
                        <CheckCircle2 size={16} className="text-[#3B8C5A] shrink-0 mt-0.5" />
                        <span className="leading-tight">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Plan Action Button */}
                <button
                  onClick={() => handleSelectPlan(plan.name as 'Starter' | 'Growth' | 'Premium')}
                  className={`w-full py-3.5 rounded-full font-bold text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    plan.recommended
                      ? 'bg-[#3B0A14] text-[#C9A227] hover:bg-[#57182A] shadow-lg'
                      : isSelected
                      ? 'bg-[#F8F1E4] text-[#3B0A14] border border-[#3B0A14]/20'
                      : 'bg-[#F8F1E4] hover:bg-[#3B0A14] hover:text-[#F8F1E4] text-[#3B0A14] border border-[#C9A227]/40'
                  }`}
                >
                  <span>{isSelected ? 'Active Plan' : `Activate ${plan.name}`}</span>
                  <ArrowRight size={14} className={plan.recommended ? 'text-[#C9A227]' : ''} />
                </button>
              </div>
            );
          })}
        </div>

        {/* Interactive Savings Calculator for Restaurant Owners */}
        <div className="bg-[#3B0A14] text-[#F8F1E4] rounded-3xl p-6 sm:p-10 shadow-2xl border border-[#C9A227]/40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="bg-[#C9A227] text-[#3B0A14] text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full">
                Profit Retention Calculator
              </span>
              <h2 className="font-serif font-black text-2xl sm:text-3xl mt-3 text-[#F8F1E4]">
                Calculate your monthly direct savings
              </h2>
              <p className="text-xs text-[#E8C468]/80 mt-1 leading-relaxed">
                Move the slider to match your kitchen's estimated monthly delivery sales volume.
              </p>

              <div className="mt-6 bg-[#57182A] p-5 rounded-2xl border border-[#C9A227]/20">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold text-[#E8C468]">Monthly Online Sales</span>
                  <span className="font-serif font-black text-xl text-white">
                    ₹{salesSlider.toLocaleString()}
                  </span>
                </div>
                <input
                  type="range"
                  min="50000"
                  max="1000000"
                  step="25000"
                  value={salesSlider}
                  onChange={(e) => setSalesSlider(Number(e.target.value))}
                  className="w-full h-2 bg-[#3B0A14] rounded-lg appearance-none cursor-pointer accent-[#C9A227]"
                />
                <div className="flex justify-between text-[10px] text-[#E8C468]/60 mt-1">
                  <span>₹50K</span>
                  <span>₹2.5L</span>
                  <span>₹5L</span>
                  <span>₹10 Lakhs</span>
                </div>
              </div>
            </div>

            {/* Side-by-side Result */}
            <div className="bg-[#57182A] p-6 rounded-3xl border border-[#C9A227]/30 space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-[#3B0A14]">
                <span className="text-xs text-white/70">Traditional Aggregator 28% Cut</span>
                <span className="font-serif font-black text-lg text-red-400">
                  -₹{traditionalAggregatorCut.toLocaleString()} / mo
                </span>
              </div>

              <div className="flex justify-between items-center pb-3 border-b border-[#3B0A14]">
                <span className="text-xs text-white/70">FairBite Growth Flat Plan</span>
                <span className="font-serif font-black text-lg text-[#E8C468]">
                  -₹{fairbiteCost.toLocaleString()} / mo
                </span>
              </div>

              <div className="pt-2">
                <p className="text-[10px] font-black uppercase text-[#3B8C5A] tracking-wider">
                  Net Extra Profit Retained in your Kitchen
                </p>
                <p className="font-serif font-black text-3xl sm:text-4xl text-[#3B8C5A] mt-0.5">
                  +₹{netMonthlyPreserved.toLocaleString()}{' '}
                  <span className="text-xs text-white/60 font-sans font-bold">/ month</span>
                </p>
                <p className="text-xs text-[#E8C468] font-bold mt-1">
                  (That is ₹{netAnnualPreserved.toLocaleString()} in extra profit each year!)
                </p>
              </div>

              <button
                onClick={() => navigate('/business')}
                className="w-full mt-2 bg-[#C9A227] hover:bg-[#B08D20] text-[#3B0A14] py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Go to Kitchen POS
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
