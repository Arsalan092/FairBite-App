import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  ArrowRight, 
  Store, 
  ShoppingBag, 
  CheckCircle2, 
  Sparkles, 
  TrendingUp, 
  Bike, 
  DollarSign, 
  ChefHat, 
  Percent, 
  Calculator,
  ChevronRight,
  HelpCircle,
  Star,
  MapPin
} from 'lucide-react';
import { useGlobal } from '../context/GlobalContext';
import { OnboardingModal } from './OnboardingModal';
import { SignInModal } from './SignInModal';
import { SavingsCalculator } from './SavingsCalculator';

export const WebsiteHome: React.FC = () => {
  const { restaurants, setShowTransparencyModal } = useGlobal();
  const navigate = useNavigate();

  const [onboardOpen, setOnboardOpen] = useState(false);
  const [signInOpen, setSignInOpen] = useState(false);
  const [selectedReceiptItem, setSelectedReceiptItem] = useState(0);
  const [monthlySpend, setMonthlySpend] = useState(4000);
  const [restaurantRevenue, setRestaurantRevenue] = useState(250000);
  const [calcTab, setCalcTab] = useState<'customer' | 'restaurant'>('customer');

  const receiptItems = [
    { name: 'Chicken Biryani', price: 200, otherMarkup: 60 },
    { name: 'Paneer Lababdar Handi', price: 340, otherMarkup: 102 },
    { name: 'Galouti Kebab Platter', price: 380, otherMarkup: 114 },
    { name: 'Masala Dosa & Filter Coffee', price: 180, otherMarkup: 54 },
  ];

  const currentItem = receiptItems[selectedReceiptItem];

  // Calculations
  const customerMonthlySavings = Math.round(monthlySpend * 0.28);
  const customerAnnualSavings = customerMonthlySavings * 12;

  const restaurantAggregatorLoss = Math.round(restaurantRevenue * 0.28);
  const restaurantFairBitePlan = 2499;
  const restaurantMonthlyProfit = restaurantAggregatorLoss - restaurantFairBitePlan;
  const restaurantAnnualProfit = restaurantMonthlyProfit * 12;

  return (
    <div className="bg-[#F8F1E4] text-[#3B0A14]">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden border-b border-[#3B0A14]/15">
        {/* Background decorative watermark */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-[#C9A227]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-[#3B0A14]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Col: Hero Copy */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#3B0A14] text-[#F8F1E4] px-4 py-1.5 rounded-full shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#C9A227] animate-pulse" />
                <span className="text-[11px] font-black uppercase tracking-widest text-[#C9A227]">
                  Now onboarding in Jamshedpur
                </span>
              </div>

              <h1 className="font-serif font-black text-4xl sm:text-5xl lg:text-6xl text-[#3B0A14] leading-[1.1] tracking-tight">
                The extra <em className="text-[#962D3E] not-italic underline decoration-[#C9A227] decoration-wavy decoration-2">₹60</em> you're paying isn't going to the kitchen.
              </h1>

              <p className="text-base sm:text-lg text-[#6B5347] font-medium leading-relaxed max-w-2xl">
                Other apps mark up your order 25–30% to cover their commission. <b>FairBite</b> charges restaurants a flat monthly fee instead — so the price you see is the price on the menu.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => setOnboardOpen(true)}
                  className="bg-[#3B0A14] hover:bg-[#57182A] text-[#F8F1E4] px-7 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  <span>List your restaurant</span>
                  <ArrowRight size={16} className="text-[#C9A227]" />
                </button>

                <Link
                  to="/order"
                  className="bg-[#C9A227] hover:bg-[#B38F1E] text-[#3B0A14] px-7 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-md hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  <ShoppingBag size={16} />
                  <span>Order Food (Dine-in Rates)</span>
                </Link>

                <Link
                  to="/how-it-works"
                  className="px-5 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#3B0A14] hover:bg-white/60 transition-colors border border-[#3B0A14]/20"
                >
                  See how it works
                </Link>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-4 pt-8 border-t border-[#3B0A14]/10">
                <div>
                  <div className="font-serif font-black text-2xl text-[#3B0A14]">0%</div>
                  <div className="text-xs text-[#6B5347] font-medium">commission, ever</div>
                </div>
                <div>
                  <div className="font-serif font-black text-2xl text-[#3B0A14]">5+</div>
                  <div className="text-xs text-[#6B5347] font-medium">restaurants live</div>
                </div>
                <div>
                  <div className="font-serif font-black text-2xl text-[#3B0A14]">Own fleet</div>
                  <div className="text-xs text-[#6B5347] font-medium">keep delivery staff</div>
                </div>
              </div>
            </div>

            {/* Right Col: Live Dual-Receipt Comparison Box */}
            <div className="lg:col-span-5">
              <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border-2 border-[#3B0A14]/20 relative">
                {/* Item selector chips */}
                <div className="flex items-center justify-between gap-1 pb-4 mb-5 border-b border-gray-100 overflow-x-auto">
                  {receiptItems.map((item, idx) => (
                    <button
                      key={item.name}
                      onClick={() => setSelectedReceiptItem(idx)}
                      className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
                        selectedReceiptItem === idx
                          ? 'bg-[#3B0A14] text-[#F8F1E4]'
                          : 'bg-[#F8F1E4] text-[#6B5347] hover:text-[#3B0A14]'
                      }`}
                    >
                      {item.name.split(' ')[0]}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Receipt 1: Other Apps */}
                  <div className="bg-[#FAF5F5] rounded-2xl p-4 border border-red-200/80 space-y-3 relative flex flex-col justify-between">
                    <span className="text-[9px] font-black uppercase tracking-wider text-red-600 bg-red-100 px-2 py-0.5 rounded-full self-start">
                      30% MARKUP
                    </span>
                    <div>
                      <span className="text-[10px] text-[#6B5347] font-bold uppercase block">Other Apps</span>
                      <h4 className="font-serif font-bold text-xs text-[#3B0A14] truncate">{currentItem.name}</h4>
                    </div>

                    <div className="space-y-1.5 text-xs text-[#6B5347] border-t border-dashed border-red-200 pt-2 font-mono">
                      <div className="flex justify-between">
                        <span>Menu price:</span>
                        <span>₹{currentItem.price}</span>
                      </div>
                      <div className="flex justify-between text-red-700 font-bold">
                        <span>Platform fee:</span>
                        <span>+₹{currentItem.otherMarkup}</span>
                      </div>
                    </div>

                    <div className="border-t-2 border-red-300 pt-2 flex justify-between items-baseline font-bold">
                      <span className="text-xs text-[#3B0A14]">You pay:</span>
                      <span className="font-serif text-lg text-red-700 line-through">
                        ₹{currentItem.price + currentItem.otherMarkup}
                      </span>
                    </div>
                  </div>

                  {/* Receipt 2: FairBite */}
                  <div className="bg-[#F2F8F4] rounded-2xl p-4 border-2 border-[#3B8C5A] space-y-3 relative flex flex-col justify-between shadow-sm">
                    <span className="text-[9px] font-black uppercase tracking-wider text-[#3B8C5A] bg-[#3B8C5A]/15 px-2 py-0.5 rounded-full self-start">
                      SAME AS DINE-IN
                    </span>
                    <div>
                      <span className="text-[10px] text-[#3B8C5A] font-black uppercase block">FairBite</span>
                      <h4 className="font-serif font-bold text-xs text-[#3B0A14] truncate">{currentItem.name}</h4>
                    </div>

                    <div className="space-y-1.5 text-xs text-[#6B5347] border-t border-dashed border-[#3B8C5A]/30 pt-2 font-mono">
                      <div className="flex justify-between">
                        <span>Menu price:</span>
                        <span>₹{currentItem.price}</span>
                      </div>
                      <div className="flex justify-between text-[#3B8C5A] font-bold">
                        <span>Platform fee:</span>
                        <span>₹0</span>
                      </div>
                    </div>

                    <div className="border-t-2 border-[#3B8C5A] pt-2 flex justify-between items-baseline font-bold">
                      <span className="text-xs text-[#3B0A14]">You pay:</span>
                      <span className="font-serif text-2xl text-[#3B8C5A]">
                        ₹{currentItem.price}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-[#6B5347]">
                  <span className="flex items-center gap-1 text-[#3B8C5A] font-bold">
                    <CheckCircle2 size={13} /> You save ₹{currentItem.otherMarkup} on this single dish
                  </span>
                  <button
                    onClick={() => setShowTransparencyModal(true)}
                    className="font-bold text-[#3B0A14] hover:text-[#C9A227] underline cursor-pointer"
                  >
                    View audit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM SECTION */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#3B0A14]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="inline-block bg-[#C9A227]/20 text-[#3B0A14] text-[10px] uppercase font-black px-3 py-1 rounded-full tracking-widest">
              The problem
            </span>
            <h2 className="font-serif font-black text-3xl sm:text-4xl text-[#3B0A14] leading-tight">
              Delivery apps didn't just add convenience. They added a hidden bill.
            </h2>
            <p className="text-sm sm:text-base text-[#6B5347] leading-relaxed">
              A 25–30% commission has to come from somewhere — and it's almost always passed on to the customer, order after order.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#FAF5F5] rounded-3xl p-8 border border-red-100 space-y-3">
              <div className="font-serif font-black text-4xl text-red-600">25–30%</div>
              <h3 className="font-serif font-bold text-lg text-[#3B0A14]">Typical Commission</h3>
              <p className="text-xs text-[#6B5347] leading-relaxed">
                Charged per order by traditional delivery platforms, gouging kitchen profits and inflating digital menus.
              </p>
            </div>

            <div className="bg-[#FAF5F5] rounded-3xl p-8 border border-red-100 space-y-3">
              <div className="font-serif font-black text-4xl text-red-600">₹60+</div>
              <h3 className="font-serif font-bold text-lg text-[#3B0A14]">Extra Per Single Dish</h3>
              <p className="text-xs text-[#6B5347] leading-relaxed">
                Extra you can pay on a simple ₹200 order because of that middleman cut before packaging and surges.
              </p>
            </div>

            <div className="bg-[#F2F8F4] rounded-3xl p-8 border-2 border-[#3B8C5A] space-y-3 shadow-xs">
              <div className="font-serif font-black text-4xl text-[#3B8C5A]">₹0</div>
              <h3 className="font-serif font-bold text-lg text-[#3B0A14]">Markup on FairBite</h3>
              <p className="text-xs text-[#6B5347] leading-relaxed">
                Restaurants pay us a flat direct subscription, so zero extra charges are added to your food bill.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS (3 STEPS) */}
      <section className="py-16 sm:py-24 bg-[#F8F1E4] border-b border-[#3B0A14]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="inline-block bg-[#3B0A14] text-[#F8F1E4] text-[10px] uppercase font-black px-3 py-1 rounded-full tracking-widest">
              How it works
            </span>
            <h2 className="font-serif font-black text-3xl sm:text-4xl text-[#3B0A14] leading-tight">
              Three steps. No markup at any of them.
            </h2>
            <p className="text-sm sm:text-base text-[#6B5347]">
              Ordering feels exactly like the apps you already use — the difference shows up only on the bill.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-white rounded-3xl p-8 border border-[#3B0A14]/15 relative space-y-4 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between">
                <span className="font-serif font-black text-4xl text-[#C9A227]">01</span>
                <div className="w-10 h-10 rounded-full bg-[#C9A227]/20 flex items-center justify-center text-[#3B0A14]">
                  <UtensilsIcon size={20} />
                </div>
              </div>
              <h3 className="font-serif font-bold text-xl text-[#3B0A14]">Pick your restaurant</h3>
              <p className="text-xs sm:text-sm text-[#6B5347] leading-relaxed">
                Browse the exact same menu the restaurant serves at its counter in Jamshedpur — same authentic dishes, same prices.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-3xl p-8 border border-[#3B0A14]/15 relative space-y-4 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between">
                <span className="font-serif font-black text-4xl text-[#C9A227]">02</span>
                <div className="w-10 h-10 rounded-full bg-[#C9A227]/20 flex items-center justify-center text-[#3B0A14]">
                  <ShoppingBag size={20} />
                </div>
              </div>
              <h3 className="font-serif font-bold text-xl text-[#3B0A14]">Order in a tap</h3>
              <p className="text-xs sm:text-sm text-[#6B5347] leading-relaxed">
                Add items, confirm via UPI or Cash on Delivery — that's it. What's on the menu is what you pay, no surprise platform fees.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-3xl p-8 border border-[#3B0A14]/15 relative space-y-4 hover:shadow-xl transition-all">
              <div className="flex items-center justify-between">
                <span className="font-serif font-black text-4xl text-[#C9A227]">03</span>
                <div className="w-10 h-10 rounded-full bg-[#C9A227]/20 flex items-center justify-center text-[#3B0A14]">
                  <Bike size={20} />
                </div>
              </div>
              <h3 className="font-serif font-bold text-xl text-[#3B0A14]">The restaurant delivers</h3>
              <p className="text-xs sm:text-sm text-[#6B5347] leading-relaxed">
                Their own delivery team — the one they already trust and employ — brings hot food straight from their kitchen to your doorstep.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/how-it-works"
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#3B0A14] hover:text-[#C9A227] transition-colors border-b-2 border-[#C9A227] pb-0.5"
            >
              <span>Explore the complete system deep-dive</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* 4. BUILT FOR BOTH SIDES */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#3B0A14]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="inline-block bg-[#C9A227]/20 text-[#3B0A14] text-[10px] uppercase font-black px-3 py-1 rounded-full tracking-widest">
              Built for both sides
            </span>
            <h2 className="font-serif font-black text-3xl sm:text-4xl text-[#3B0A14]">
              What each side actually gets.
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* For Customers */}
            <div className="bg-[#FAF7F2] rounded-3xl p-8 sm:p-10 border border-[#3B0A14]/15 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#3B8C5A] bg-[#3B8C5A]/15 px-3 py-1 rounded-full inline-block">
                  For customers
                </span>
                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#3B0A14]">
                  Pay what the restaurant charges. Nothing more.
                </h3>
                <p className="text-xs sm:text-sm text-[#6B5347] leading-relaxed">
                  No markup, no surge pricing, no guessing what part of the bill is actually food.
                </p>

                <ul className="space-y-3 text-xs sm:text-sm text-[#3B0A14] font-medium pt-2">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-[#3B8C5A] shrink-0" />
                    <span>The exact dine-in price, every single time</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-[#3B8C5A] shrink-0" />
                    <span>Live order status directly from the kitchen</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-[#3B8C5A] shrink-0" />
                    <span>Support local Jamshedpur family restaurants</span>
                  </li>
                </ul>
              </div>

              <Link
                to="/order"
                className="bg-[#3B0A14] hover:bg-[#57182A] text-[#F8F1E4] px-6 py-3.5 rounded-full text-xs font-black uppercase tracking-widest inline-flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <span>Start ordering</span>
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* For Restaurants */}
            <div className="bg-[#FAF7F2] rounded-3xl p-8 sm:p-10 border border-[#3B0A14]/15 space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#C9A227] bg-[#3B0A14] px-3 py-1 rounded-full inline-block">
                  For restaurants
                </span>
                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#3B0A14]">
                  Keep 100% of your food sales. Pay one predictable fee.
                </h3>
                <p className="text-xs sm:text-sm text-[#6B5347] leading-relaxed">
                  No commissions that grow as you sell more. One flat subscription from ₹999/month.
                </p>

                <ul className="space-y-3 text-xs sm:text-sm text-[#3B0A14] font-medium pt-2">
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-[#C9A227] shrink-0" />
                    <span>Keep 100% of every order — ₹0 per-order cut</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-[#C9A227] shrink-0" />
                    <span>Direct customer relationship and phone numbers</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <CheckCircle2 size={16} className="text-[#C9A227] shrink-0" />
                    <span>Empower your existing staff & delivery fleet</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => setOnboardOpen(true)}
                className="bg-[#C9A227] hover:bg-[#B38F1E] text-[#3B0A14] px-6 py-3.5 rounded-full text-xs font-black uppercase tracking-widest inline-flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <span>List your restaurant</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE SAVINGS & ROI CALCULATOR */}
      <section className="py-16 sm:py-24 bg-[#F8F1E4] border-b border-[#3B0A14]/15">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SavingsCalculator />
        </div>
      </section>

      {/* 6. LIVE RESTAURANTS SHOWCASE (JAMSHEDPUR) */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#3B0A14]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="inline-block bg-[#C9A227]/20 text-[#3B0A14] text-[10px] uppercase font-black px-3 py-1 rounded-full tracking-widest mb-2">
                Live Partner Kitchens
              </span>
              <h2 className="font-serif font-black text-3xl sm:text-4xl text-[#3B0A14]">
                Jamshedpur’s Finest. Zero Surcharge.
              </h2>
            </div>
            <Link
              to="/order"
              className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#3B0A14] hover:text-[#C9A227] transition-colors"
            >
              <span>View full food menu & order</span>
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.slice(0, 3).map((r) => (
              <div 
                key={r.id} 
                className="bg-[#FAF7F2] rounded-3xl overflow-hidden border border-[#3B0A14]/15 group hover:shadow-xl transition-all flex flex-col"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={r.image}
                    alt={r.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-[#3B0A14] text-[#F8F1E4] px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-md">
                    <Star size={11} className="text-[#C9A227] fill-[#C9A227]" />
                    <span>{r.rating}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-[#C9A227] text-[#3B0A14] px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider">
                    Dine-in Parity
                  </div>
                </div>

                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-xl text-[#3B0A14]">{r.name}</h3>
                    <p className="text-xs text-[#6B5347] font-medium truncate">{r.cuisine}</p>
                    <div className="flex items-center gap-1.5 text-xs text-[#6B5347] mt-2">
                      <MapPin size={13} className="text-[#C9A227]" />
                      <span>{r.location}</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#3B0A14]/10 flex items-center justify-between">
                    <span className="text-xs font-bold text-[#3B8C5A]">
                      0% Commission Partner
                    </span>
                    <Link
                      to={`/restaurant/${r.id}`}
                      className="bg-[#3B0A14] text-[#F8F1E4] hover:bg-[#57182A] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                      View Menu
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. COMPARISON TABLE: FairBite vs Swiggy/Zomato */}
      <section className="py-16 sm:py-24 bg-[#F8F1E4] border-b border-[#3B0A14]/15">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="inline-block bg-[#3B0A14] text-[#F8F1E4] text-[10px] uppercase font-black px-3 py-1 rounded-full tracking-widest">
              Side by side
            </span>
            <h2 className="font-serif font-black text-3xl sm:text-4xl text-[#3B0A14]">
              FairBite vs Traditional Delivery Apps
            </h2>
          </div>

          <div className="bg-white rounded-3xl overflow-hidden shadow-xl border-2 border-[#3B0A14]/15">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead>
                  <tr className="bg-[#3B0A14] text-[#F8F1E4] border-b border-[#57182A]">
                    <th className="p-4 sm:p-5 font-bold uppercase tracking-wider">Factor</th>
                    <th className="p-4 sm:p-5 font-bold uppercase tracking-wider text-red-300">Swiggy / Zomato</th>
                    <th className="p-4 sm:p-5 font-bold uppercase tracking-wider text-[#C9A227]">FairBite</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium">
                  <tr>
                    <td className="p-4 sm:p-5 font-bold text-[#3B0A14]">Commission Per Order</td>
                    <td className="p-4 sm:p-5 text-red-600">25% – 32% on total bill</td>
                    <td className="p-4 sm:p-5 font-bold text-[#3B8C5A]">0% (Zero per-order fee)</td>
                  </tr>
                  <tr className="bg-[#FAF7F2]/50">
                    <td className="p-4 sm:p-5 font-bold text-[#3B0A14]">Customer Food Prices</td>
                    <td className="p-4 sm:p-5 text-red-600">Marked up by 25–30%</td>
                    <td className="p-4 sm:p-5 font-bold text-[#3B8C5A]">Exact Dine-in Counter Price</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-bold text-[#3B0A14]">Customer Phone & Data</td>
                    <td className="p-4 sm:p-5 text-red-600">Masked & retained by platform</td>
                    <td className="p-4 sm:p-5 font-bold text-[#3B8C5A]">100% Owned by Restaurant</td>
                  </tr>
                  <tr className="bg-[#FAF7F2]/50">
                    <td className="p-4 sm:p-5 font-bold text-[#3B0A14]">Delivery Fleet Control</td>
                    <td className="p-4 sm:p-5 text-[#6B5347]">Random 3rd-party gig riders</td>
                    <td className="p-4 sm:p-5 font-bold text-[#3B8C5A]">Restaurant's Own Trusted Staff</td>
                  </tr>
                  <tr>
                    <td className="p-4 sm:p-5 font-bold text-[#3B0A14]">Payment Payout Cycle</td>
                    <td className="p-4 sm:p-5 text-[#6B5347]">Weekly / Bi-weekly deductions</td>
                    <td className="p-4 sm:p-5 font-bold text-[#3B8C5A]">Instant via UPI / COD Direct</td>
                  </tr>
                  <tr className="bg-[#FAF7F2]/50">
                    <td className="p-4 sm:p-5 font-bold text-[#3B0A14]">Monthly Cost Structure</td>
                    <td className="p-4 sm:p-5 text-red-600">Uncapped (grows with sales)</td>
                    <td className="p-4 sm:p-5 font-bold text-[#3B8C5A]">Flat Predictable Fee (₹999/mo)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#3B0A14]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-14">
            <span className="inline-block bg-[#C9A227]/20 text-[#3B0A14] text-[10px] uppercase font-black px-3 py-1 rounded-full tracking-widest">
              Community voice
            </span>
            <h2 className="font-serif font-black text-3xl sm:text-4xl text-[#3B0A14]">
              Loved by Foodies & Kitchens in Jamshedpur
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#FAF7F2] p-8 rounded-3xl border border-[#3B0A14]/15 space-y-4 flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-[#3B0A14] leading-relaxed italic">
                "We were paying over ₹45,000 every single month in commission cuts to food apps. With FairBite's flat Growth plan, we retained that entire amount for our kitchen staff."
              </p>
              <div>
                <div className="font-serif font-bold text-sm text-[#3B0A14]">Chef Irfan Qureshi</div>
                <div className="text-xs text-[#6B5347]">Owner, The Mughal Suite (Bistupur)</div>
              </div>
            </div>

            <div className="bg-[#FAF7F2] p-8 rounded-3xl border border-[#3B0A14]/15 space-y-4 flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-[#3B0A14] leading-relaxed italic">
                "Ordering Biryani for my family on weekends used to cost ₹1,200 on other apps for three plates. On FairBite, the exact same order was ₹900 because there is no 30% hidden tax!"
              </p>
              <div>
                <div className="font-serif font-bold text-sm text-[#3B0A14]">Priya Sengupta</div>
                <div className="text-xs text-[#6B5347]">Foodie, Kadma Jamshedpur</div>
              </div>
            </div>

            <div className="bg-[#FAF7F2] p-8 rounded-3xl border border-[#3B0A14]/15 space-y-4 flex flex-col justify-between">
              <p className="text-xs sm:text-sm text-[#3B0A14] leading-relaxed italic">
                "Our delivery staff knows our regular customers by name. We get the money in our bank instantly through UPI without waiting for weekly aggregator payouts."
              </p>
              <div>
                <div className="font-serif font-bold text-sm text-[#3B0A14]">K. Ramanathan</div>
                <div className="text-xs text-[#6B5347]">Dosa Coffee & Co. (Sakchi)</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FINAL CALL TO ACTION */}
      <section className="py-20 bg-[#3B0A14] text-[#F8F1E4] relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <span className="inline-block bg-[#C9A227] text-[#3B0A14] text-[10px] uppercase font-black px-3 py-1 rounded-full tracking-widest">
            Join the Fair Dining Movement
          </span>
          <h2 className="font-serif font-black text-3xl sm:text-5xl leading-tight">
            Ready to stop paying the 30% middleman tax?
          </h2>
          <p className="text-sm sm:text-base text-[#F8F1E4]/80 max-w-2xl mx-auto">
            Whether you want to order food at genuine dine-in prices or list your restaurant with zero per-order commission, FairBite is built for you.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setOnboardOpen(true)}
              className="bg-[#C9A227] hover:bg-[#B38F1E] text-[#3B0A14] px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-xl hover:scale-105 cursor-pointer"
            >
              List Your Restaurant (0% Cut)
            </button>
            <Link
              to="/order"
              className="bg-white hover:bg-gray-100 text-[#3B0A14] px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all shadow-xl hover:scale-105"
            >
              Order Food Now
            </Link>
          </div>
        </div>
      </section>

      {/* Modals */}
      <OnboardingModal isOpen={onboardOpen} onClose={() => setOnboardOpen(false)} />
      <SignInModal isOpen={signInOpen} onClose={() => setSignInOpen(false)} />
    </div>
  );
};

function UtensilsIcon(props: any) {
  return (
    <svg width={props.size || 20} height={props.size || 20} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2v6a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2" />
      <path d="M15 2v14" />
      <path d="M15 20h.01" />
      <path d="M6 2v20" />
      <path d="M9 2v4a3 3 0 0 1-3 3 3 3 0 0 1-3-3V2" />
    </svg>
  );
}
