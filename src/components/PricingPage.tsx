import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  HelpCircle, 
  ShieldCheck,
  Percent,
  TrendingUp,
  X
} from 'lucide-react';
import { OnboardingModal } from './OnboardingModal';

export const PricingPage: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');
  const [onboardOpen, setOnboardOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'Starter' | 'Growth' | 'Premium'>('Growth');

  const handleChoosePlan = (plan: 'Starter' | 'Growth' | 'Premium') => {
    setSelectedPlan(plan);
    setOnboardOpen(true);
  };

  return (
    <div className="bg-[#F8F1E4] text-[#3B0A14]">
      {/* Header */}
      <section className="py-16 sm:py-24 bg-[#3B0A14] text-[#F8F1E4] relative overflow-hidden border-b-2 border-[#C9A227]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <span className="inline-block bg-[#C9A227] text-[#3B0A14] text-[10px] uppercase font-black px-3 py-1 rounded-full tracking-widest">
            Pricing for Restaurants
          </span>
          <h1 className="font-serif font-black text-4xl sm:text-5xl lg:text-6xl leading-tight">
            One flat fee. No per-order cut, ever.
          </h1>
          <p className="text-base sm:text-lg text-[#F8F1E4]/80 max-w-2xl mx-auto font-medium">
            Compare that to the 25–30% traditional apps take out of every single order you make.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <span className={`text-xs font-bold uppercase tracking-wider ${billingCycle === 'monthly' ? 'text-[#C9A227]' : 'text-white/70'}`}>
              Monthly Billing
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'annual' : 'monthly')}
              className="w-14 h-8 bg-white/20 rounded-full p-1 transition-colors relative cursor-pointer"
            >
              <div className={`w-6 h-6 bg-[#C9A227] rounded-full transition-transform duration-200 ${billingCycle === 'annual' ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
            <div className="flex items-center gap-1.5">
              <span className={`text-xs font-bold uppercase tracking-wider ${billingCycle === 'annual' ? 'text-[#C9A227]' : 'text-white/70'}`}>
                Annual Billing
              </span>
              <span className="bg-[#3B8C5A] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-full">
                Get 2 Months Free
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Plan 1: Starter */}
          <div className="bg-white rounded-3xl p-8 border-2 border-[#3B0A14]/15 space-y-6 flex flex-col justify-between hover:shadow-xl transition-all">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-serif font-black text-2xl text-[#3B0A14]">Starter</h3>
                <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-gray-100 text-[#6B5347]">
                  Single Outlet
                </span>
              </div>
              <p className="text-xs text-[#6B5347]">
                For single-outlet restaurants testing online orders in Jamshedpur.
              </p>
              <div className="pt-2">
                <div className="font-serif font-black text-4xl text-[#3B0A14]">
                  {billingCycle === 'monthly' ? '₹999' : '₹9,990'}
                  <span className="text-sm font-sans font-medium text-[#6B5347]">
                    {billingCycle === 'monthly' ? '/month' : '/year'}
                  </span>
                </div>
                <div className="text-[11px] text-[#3B8C5A] font-bold mt-1">
                  0% Commission on all orders
                </div>
              </div>

              <ul className="space-y-3 text-xs text-[#3B0A14] font-medium pt-4 border-t border-gray-100">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#3B8C5A] shrink-0" />
                  <span>Listed on the FairBite app</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#3B8C5A] shrink-0" />
                  <span>Up to 150 orders / month</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#3B8C5A] shrink-0" />
                  <span>Use your own delivery agents</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#3B8C5A] shrink-0" />
                  <span>Direct UPI & Cash settlements</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#3B8C5A] shrink-0" />
                  <span>Standard email & phone support</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleChoosePlan('Starter')}
              className="w-full bg-[#FAF7F2] hover:bg-[#3B0A14] hover:text-[#F8F1E4] text-[#3B0A14] border-2 border-[#3B0A14] py-3.5 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-xs"
            >
              Get Started with Starter
            </button>
          </div>

          {/* Plan 2: Growth (MOST POPULAR) */}
          <div className="bg-[#3B0A14] text-[#F8F1E4] rounded-3xl p-8 sm:p-9 border-2 border-[#C9A227] space-y-6 flex flex-col justify-between shadow-2xl relative lg:-translate-y-4">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#C9A227] text-[#3B0A14] text-[10px] font-black uppercase px-4 py-1 rounded-full tracking-widest shadow-md">
              MOST POPULAR
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex justify-between items-center">
                <h3 className="font-serif font-black text-2xl text-[#F8F1E4]">Growth</h3>
                <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-[#C9A227] text-[#3B0A14]">
                  Best Value
                </span>
              </div>
              <p className="text-xs text-[#F8F1E4]/80">
                For busy restaurants with steady daily takeaway & home orders.
              </p>
              <div className="pt-2">
                <div className="font-serif font-black text-4xl text-[#C9A227]">
                  {billingCycle === 'monthly' ? '₹2,499' : '₹24,990'}
                  <span className="text-sm font-sans font-medium text-[#F8F1E4]/70">
                    {billingCycle === 'monthly' ? '/month' : '/year'}
                  </span>
                </div>
                <div className="text-[11px] text-[#3B8C5A] font-bold mt-1 bg-white/10 px-2.5 py-0.5 rounded-full inline-block">
                  Unlimited orders • 0% Commission
                </div>
              </div>

              <ul className="space-y-3 text-xs text-[#F8F1E4]/90 font-medium pt-4 border-t border-white/15">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#C9A227] shrink-0" />
                  <span><b>Everything in Starter</b></span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#C9A227] shrink-0" />
                  <span><b>Unlimited orders</b> with zero cap</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#C9A227] shrink-0" />
                  <span>Priority search listing placement</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#C9A227] shrink-0" />
                  <span>Dedicated WhatsApp Priority Support</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#C9A227] shrink-0" />
                  <span>Monthly sales & customer retention reports</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#C9A227] shrink-0" />
                  <span>Free kitchen POS tablet app configuration</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleChoosePlan('Growth')}
              className="w-full bg-[#C9A227] hover:bg-[#B38F1E] text-[#3B0A14] py-4 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-xl hover:scale-105"
            >
              Get Started with Growth
            </button>
          </div>

          {/* Plan 3: Premium */}
          <div className="bg-white rounded-3xl p-8 border-2 border-[#3B0A14]/15 space-y-6 flex flex-col justify-between hover:shadow-xl transition-all">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-serif font-black text-2xl text-[#3B0A14]">Premium</h3>
                <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-full bg-gray-100 text-[#6B5347]">
                  Chains & Brands
                </span>
              </div>
              <p className="text-xs text-[#6B5347]">
                For multi-outlet chains, cloud kitchens, and high-volume brands.
              </p>
              <div className="pt-2">
                <div className="font-serif font-black text-4xl text-[#3B0A14]">
                  {billingCycle === 'monthly' ? '₹4,999' : '₹49,990'}
                  <span className="text-sm font-sans font-medium text-[#6B5347]">
                    {billingCycle === 'monthly' ? '/month' : '/year'}
                  </span>
                </div>
                <div className="text-[11px] text-[#3B8C5A] font-bold mt-1">
                  Multi-outlet management included
                </div>
              </div>

              <ul className="space-y-3 text-xs text-[#3B0A14] font-medium pt-4 border-t border-gray-100">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#3B8C5A] shrink-0" />
                  <span><b>Everything in Growth</b></span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#3B8C5A] shrink-0" />
                  <span>Multiple branch / outlet management</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#3B8C5A] shrink-0" />
                  <span>Dedicated Jamshedpur account manager</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#3B8C5A] shrink-0" />
                  <span>Featured marquee banner on FairBite homepage</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-[#3B8C5A] shrink-0" />
                  <span>Custom loyalty campaigns & promo engine</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleChoosePlan('Premium')}
              className="w-full bg-[#FAF7F2] hover:bg-[#3B0A14] hover:text-[#F8F1E4] text-[#3B0A14] border-2 border-[#3B0A14] py-3.5 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-xs"
            >
              Get Started with Premium
            </button>
          </div>
        </div>
      </section>

      {/* Feature Comparison Matrix */}
      <section className="py-16 sm:py-24 bg-white border-t border-b border-[#3B0A14]/15">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <span className="bg-[#3B0A14] text-[#F8F1E4] text-[10px] uppercase font-black px-3 py-1 rounded-full tracking-widest inline-block">
              Detailed Plan Matrix
            </span>
            <h2 className="font-serif font-black text-3xl sm:text-4xl text-[#3B0A14]">
              Compare Plan Features
            </h2>
          </div>

          <div className="bg-[#FAF7F2] rounded-3xl overflow-hidden border border-[#3B0A14]/15 shadow-md">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#3B0A14] text-[#F8F1E4] border-b border-[#57182A]">
                    <th className="p-4 sm:p-5 font-bold uppercase tracking-wider">Features</th>
                    <th className="p-4 sm:p-5 font-bold uppercase tracking-wider text-center">Starter</th>
                    <th className="p-4 sm:p-5 font-bold uppercase tracking-wider text-[#C9A227] text-center">Growth</th>
                    <th className="p-4 sm:p-5 font-bold uppercase tracking-wider text-center">Premium</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 font-medium text-[#3B0A14]">
                  <tr>
                    <td className="p-4 sm:p-5 font-bold">Commission per order</td>
                    <td className="p-4 sm:p-5 text-center text-[#3B8C5A] font-bold">0%</td>
                    <td className="p-4 sm:p-5 text-center text-[#3B8C5A] font-bold">0%</td>
                    <td className="p-4 sm:p-5 text-center text-[#3B8C5A] font-bold">0%</td>
                  </tr>
                  <tr className="bg-white/60">
                    <td className="p-4 sm:p-5 font-bold">Monthly order limit</td>
                    <td className="p-4 sm:p-5 text-center">150 orders</td>
                    <td className="p-4 sm:p-5 text-center text-[#3B8C5A] font-bold">Unlimited</td>
                    <td className="p-4 sm:p-5 text-center text-[#3B8C5A] font-bold">Unlimited</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-bold">Delivery fleet</td>
                    <td className="p-4 sm:p-5 text-center">Own staff</td>
                    <td className="p-4 sm:p-5 text-center">Own staff</td>
                    <td className="p-4 sm:p-5 text-center">Own staff</td>
                  </tr>
                  <tr className="bg-white/60">
                    <td className="p-4 sm:p-5 font-bold">Customer data access</td>
                    <td className="p-4 sm:p-5 text-center text-[#3B8C5A]">✓ Full</td>
                    <td className="p-4 sm:p-5 text-center text-[#3B8C5A]">✓ Full</td>
                    <td className="p-4 sm:p-5 text-center text-[#3B8C5A]">✓ Full</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-bold">Support channel</td>
                    <td className="p-4 sm:p-5 text-center">Email</td>
                    <td className="p-4 sm:p-5 text-center font-bold text-[#C9A227]">WhatsApp Priority</td>
                    <td className="p-4 sm:p-5 text-center font-bold text-[#3B0A14]">Dedicated Manager</td>
                  </tr>
                  <tr className="bg-white/60">
                    <td className="p-4 sm:p-5 font-bold">Multiple outlets</td>
                    <td className="p-4 sm:p-5 text-center text-gray-400">✕</td>
                    <td className="p-4 sm:p-5 text-center text-gray-400">✕</td>
                    <td className="p-4 sm:p-5 text-center text-[#3B8C5A] font-bold">✓ Included</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing FAQs */}
      <section className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="bg-[#C9A227]/20 text-[#3B0A14] text-[10px] uppercase font-black px-3 py-1 rounded-full tracking-widest inline-block">
            Frequently Asked Questions
          </span>
          <h2 className="font-serif font-black text-3xl text-[#3B0A14]">
            Restaurant Pricing FAQ
          </h2>
        </div>

        <div className="space-y-4">
          <div className="bg-white p-6 rounded-3xl border border-[#3B0A14]/15 space-y-2">
            <h4 className="font-serif font-bold text-base text-[#3B0A14]">Are there really zero per-order commissions?</h4>
            <p className="text-xs sm:text-sm text-[#6B5347] leading-relaxed">
              Yes! 100% strictly zero. Whether you sell ₹10,000 or ₹10,00,000 of food this month, you only pay your flat subscription fee. All customer money goes directly to you.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#3B0A14]/15 space-y-2">
            <h4 className="font-serif font-bold text-base text-[#3B0A14]">Can I upgrade or cancel my plan anytime?</h4>
            <p className="text-xs sm:text-sm text-[#6B5347] leading-relaxed">
              Yes. There are no lock-ins or contracts. You can upgrade from Starter to Growth as your orders increase, or cancel anytime with one click.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-[#3B0A14]/15 space-y-2">
            <h4 className="font-serif font-bold text-base text-[#3B0A14]">How do customer payments reach my restaurant?</h4>
            <p className="text-xs sm:text-sm text-[#6B5347] leading-relaxed">
              Customers scan your restaurant's direct UPI QR code or pay via Cash on Delivery. FairBite does not hold or delay your earnings.
            </p>
          </div>
        </div>
      </section>

      <OnboardingModal 
        isOpen={onboardOpen} 
        onClose={() => setOnboardOpen(false)} 
        initialPlan={selectedPlan}
      />
    </div>
  );
};
