import React, { useState } from 'react';
import { 
  Calculator, 
  CheckCircle2, 
  TrendingUp, 
  DollarSign, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  ShoppingBag, 
  Store, 
  Percent, 
  Plus, 
  Minus,
  RotateCcw,
  Utensils
} from 'lucide-react';
import { OnboardingModal } from './OnboardingModal';

interface SavingsCalculatorProps {
  initialTab?: 'customer' | 'restaurant';
  showTitle?: boolean;
  className?: string;
}

export const SavingsCalculator: React.FC<SavingsCalculatorProps> = ({
  initialTab = 'customer',
  showTitle = true,
  className = ''
}) => {
  const [calcTab, setCalcTab] = useState<'customer' | 'restaurant'>(initialTab);
  const [customerMode, setCustomerMode] = useState<'spend' | 'frequency' | 'dish'>('spend');
  const [onboardOpen, setOnboardOpen] = useState(false);

  // Customer State: Mode 1 (Monthly Spend)
  const [monthlySpend, setMonthlySpend] = useState<number>(4500);

  // Customer State: Mode 2 (Order Frequency)
  const [ordersPerWeek, setOrdersPerWeek] = useState<number>(3);
  const [avgOrderAmount, setAvgOrderAmount] = useState<number>(450);

  // Customer State: Mode 3 (Dish Builder)
  const [selectedDishes, setSelectedDishes] = useState<{ [id: string]: number }>({
    'biryani': 2,
    'paneer': 1,
    'dosa': 1
  });

  const dishCatalog = [
    { id: 'biryani', name: 'Dum Chicken Biryani', counterPrice: 200, otherMarkup: 65 },
    { id: 'paneer', name: 'Paneer Butter Masala', counterPrice: 240, otherMarkup: 75 },
    { id: 'dosa', name: 'Masala Dosa + Vada', counterPrice: 150, otherMarkup: 45 },
    { id: 'kebab', name: 'Galouti Kebab (4 pcs)', counterPrice: 320, otherMarkup: 95 },
    { id: 'chowmein', name: 'Hakka Noodles & Manchurian', counterPrice: 190, otherMarkup: 60 },
  ];

  // Restaurant State
  const [restaurantRevenue, setRestaurantRevenue] = useState<number>(300000);
  const [selectedPlan, setSelectedPlan] = useState<'Starter' | 'Growth' | 'Premium'>('Growth');
  const [commissionRate, setCommissionRate] = useState<number>(28); // 28% standard

  // Customer Calculations
  let effectiveMonthlyFoodSpend = monthlySpend;
  if (customerMode === 'frequency') {
    effectiveMonthlyFoodSpend = ordersPerWeek * 4.33 * avgOrderAmount;
  } else if (customerMode === 'dish') {
    const dishOrderTotal = Object.entries(selectedDishes).reduce((total, [dishId, qty]) => {
      const dish = dishCatalog.find(d => d.id === dishId);
      const quantity = typeof qty === 'number' ? qty : Number(qty) || 0;
      return total + (dish ? dish.counterPrice * quantity : 0);
    }, 0);
    // Assume 4 times per month for custom dish basket
    effectiveMonthlyFoodSpend = Math.max(dishOrderTotal * 4, 1000);
  }

  // FairBite food spend vs other apps
  const fairBiteCustomerCost = Math.round(effectiveMonthlyFoodSpend);
  const otherAppMarkupFood = Math.round(effectiveMonthlyFoodSpend * 0.28);
  const otherAppPlatformFees = Math.round((effectiveMonthlyFoodSpend / 400) * 12); // ~₹12 platform fee per order
  const otherAppTotalCost = fairBiteCustomerCost + otherAppMarkupFood + otherAppPlatformFees;
  const customerMonthlySavings = otherAppTotalCost - fairBiteCustomerCost;
  const customerAnnualSavings = customerMonthlySavings * 12;
  const freeMealsEquivalent = Math.floor(customerAnnualSavings / 200);

  // Restaurant Calculations
  const planCosts = {
    'Starter': 999,
    'Growth': 2499,
    'Premium': 4999
  };
  const activePlanCost = planCosts[selectedPlan];
  const aggregatorCut = Math.round(restaurantRevenue * (commissionRate / 100));
  const otherHiddenDeductions = Math.round(restaurantRevenue * 0.02); // 2% payment gateway delay / masking
  const totalAggregatorLoss = aggregatorCut + otherHiddenDeductions;
  const restaurantMonthlyNetProfit = totalAggregatorLoss - activePlanCost;
  const restaurantAnnualNetProfit = restaurantMonthlyNetProfit * 12;

  // Preset Buttons Handlers
  const customerPresets = [2000, 4000, 7500, 12000, 20000];
  const restaurantPresets = [100000, 250000, 500000, 1000000, 2000000];

  const handleDishQtyChange = (dishId: string, delta: number) => {
    setSelectedDishes(prev => {
      const current = prev[dishId] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [dishId]: next };
    });
  };

  return (
    <div id="calculator-section" className={`bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-[#3B0A14]/20 ${className}`}>
      {showTitle && (
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center gap-2 bg-[#3B0A14] text-[#C9A227] text-[10px] uppercase font-black px-3.5 py-1.5 rounded-full tracking-widest">
            <Calculator size={14} />
            <span>Interactive Zero-Commission Simulator</span>
          </div>
          <h2 className="font-serif font-black text-2xl sm:text-4xl text-[#3B0A14]">
            Calculate Your Exact Savings & Retained Profit
          </h2>
          <p className="text-xs sm:text-sm text-[#6B5347] max-w-xl mx-auto font-medium">
            Test real numbers with dynamic controls, dish baskets, and direct commission breakdown for Jamshedpur.
          </p>
        </div>
      )}

      {/* Main Tab Switcher */}
      <div className="grid grid-cols-2 gap-2 p-1.5 bg-[#FAF7F2] rounded-2xl max-w-md mx-auto mb-8 border border-[#3B0A14]/15">
        <button
          id="btn-calc-customer"
          onClick={() => setCalcTab('customer')}
          className={`py-3 px-4 text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
            calcTab === 'customer'
              ? 'bg-[#3B0A14] text-[#F8F1E4] shadow-md scale-102'
              : 'text-[#6B5347] hover:text-[#3B0A14] hover:bg-white/60'
          }`}
        >
          <ShoppingBag size={15} className={calcTab === 'customer' ? 'text-[#C9A227]' : ''} />
          <span>For Diners / Foodies</span>
        </button>
        <button
          id="btn-calc-restaurant"
          onClick={() => setCalcTab('restaurant')}
          className={`py-3 px-4 text-xs font-black uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 ${
            calcTab === 'restaurant'
              ? 'bg-[#3B0A14] text-[#F8F1E4] shadow-md scale-102'
              : 'text-[#6B5347] hover:text-[#3B0A14] hover:bg-white/60'
          }`}
        >
          <Store size={15} className={calcTab === 'restaurant' ? 'text-[#C9A227]' : ''} />
          <span>For Kitchen Owners</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* 1. DINER / CUSTOMER CALCULATOR TAB                      */}
      {/* ======================================================== */}
      {calcTab === 'customer' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Sub-modes */}
          <div className="flex flex-wrap items-center justify-center gap-2 pb-2">
            <button
              onClick={() => setCustomerMode('spend')}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                customerMode === 'spend'
                  ? 'bg-[#C9A227] text-[#3B0A14] shadow-sm font-black'
                  : 'bg-gray-100 text-[#6B5347] hover:bg-gray-200'
              }`}
            >
              Mode 1: Monthly Spend Slider
            </button>
            <button
              onClick={() => setCustomerMode('frequency')}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                customerMode === 'frequency'
                  ? 'bg-[#C9A227] text-[#3B0A14] shadow-sm font-black'
                  : 'bg-gray-100 text-[#6B5347] hover:bg-gray-200'
              }`}
            >
              Mode 2: Weekly Orders
            </button>
            <button
              onClick={() => setCustomerMode('dish')}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                customerMode === 'dish'
                  ? 'bg-[#C9A227] text-[#3B0A14] shadow-sm font-black'
                  : 'bg-gray-100 text-[#6B5347] hover:bg-gray-200'
              }`}
            >
              Mode 3: Dish Basket Builder
            </button>
          </div>

          {/* Sub-Mode 1: Direct Monthly Spend */}
          {customerMode === 'spend' && (
            <div className="bg-[#FAF7F2] p-6 sm:p-7 rounded-3xl border border-[#3B0A14]/15 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <label htmlFor="customer-spend-input" className="text-xs font-bold uppercase tracking-wider text-[#3B0A14] block">
                    Your Approximate Monthly Online Food Spend:
                  </label>
                  <span className="text-[11px] text-[#6B5347]">
                    Adjust slider or type your custom amount below
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-serif font-black text-2xl text-[#3B0A14]">₹</span>
                  <input
                    id="customer-spend-input"
                    type="number"
                    min={500}
                    max={50000}
                    step={100}
                    value={monthlySpend}
                    onChange={(e) => setMonthlySpend(Math.max(0, Number(e.target.value)))}
                    className="w-32 font-serif font-black text-2xl text-[#3B0A14] bg-white border border-[#3B0A14]/20 rounded-xl px-3 py-1.5 text-right focus:outline-hidden focus:ring-2 focus:ring-[#C9A227]"
                  />
                </div>
              </div>

              {/* Slider */}
              <div className="space-y-2">
                <input
                  id="customer-spend-slider"
                  type="range"
                  min={1000}
                  max={25000}
                  step={500}
                  value={monthlySpend}
                  onChange={(e) => setMonthlySpend(Number(e.target.value))}
                  className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#3B0A14]"
                />
                <div className="flex justify-between text-[11px] text-[#6B5347] font-mono">
                  <span>₹1,000</span>
                  <span>₹6,000</span>
                  <span>₹12,500</span>
                  <span>₹25,000+</span>
                </div>
              </div>

              {/* Quick Presets */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[10px] font-bold uppercase text-[#6B5347] mr-1">Quick Select:</span>
                {customerPresets.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setMonthlySpend(preset)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      monthlySpend === preset
                        ? 'bg-[#3B0A14] text-[#F8F1E4]'
                        : 'bg-white text-[#3B0A14] border border-[#3B0A14]/20 hover:bg-[#3B0A14]/5'
                    }`}
                  >
                    ₹{preset.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sub-Mode 2: Weekly Orders Frequency */}
          {customerMode === 'frequency' && (
            <div className="bg-[#FAF7F2] p-6 sm:p-7 rounded-3xl border border-[#3B0A14]/15 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Orders per week */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#3B0A14]">
                      Orders Per Week:
                    </label>
                    <span className="font-serif font-black text-xl text-[#3B0A14]">
                      {ordersPerWeek} orders
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={14}
                    step={1}
                    value={ordersPerWeek}
                    onChange={(e) => setOrdersPerWeek(Number(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#3B0A14]"
                  />
                  <div className="flex justify-between text-[10px] text-[#6B5347] font-mono">
                    <span>1/wk</span>
                    <span>3/wk</span>
                    <span>7/wk (Daily)</span>
                    <span>14/wk</span>
                  </div>
                </div>

                {/* Avg bill per order */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold uppercase tracking-wider text-[#3B0A14]">
                      Average Bill Per Order:
                    </label>
                    <span className="font-serif font-black text-xl text-[#3B0A14]">
                      ₹{avgOrderAmount}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={200}
                    max={2500}
                    step={50}
                    value={avgOrderAmount}
                    onChange={(e) => setAvgOrderAmount(Number(e.target.value))}
                    className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#3B0A14]"
                  />
                  <div className="flex justify-between text-[10px] text-[#6B5347] font-mono">
                    <span>₹200 (Snack)</span>
                    <span>₹500 (Meal for 2)</span>
                    <span>₹1,500 (Family)</span>
                    <span>₹2,500</span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-3.5 rounded-2xl border border-[#3B0A14]/10 text-xs font-medium text-[#3B0A14] flex items-center justify-between">
                <span>Calculated Monthly Base Food Total:</span>
                <span className="font-serif font-bold text-base text-[#3B0A14]">
                  ₹{Math.round(effectiveMonthlyFoodSpend).toLocaleString('en-IN')} / month
                </span>
              </div>
            </div>
          )}

          {/* Sub-Mode 3: Dish Basket Builder */}
          {customerMode === 'dish' && (
            <div className="bg-[#FAF7F2] p-6 sm:p-7 rounded-3xl border border-[#3B0A14]/15 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#3B0A14]">
                  Select dishes in your regular weekly family order:
                </span>
                <button
                  onClick={() => setSelectedDishes({ 'biryani': 2, 'paneer': 1, 'dosa': 1 })}
                  className="text-[11px] text-[#6B5347] hover:text-[#3B0A14] flex items-center gap-1 underline cursor-pointer"
                >
                  <RotateCcw size={12} />
                  <span>Reset basket</span>
                </button>
              </div>

              <div className="space-y-2.5">
                {dishCatalog.map((dish) => {
                  const qty = selectedDishes[dish.id] || 0;
                  return (
                    <div
                      key={dish.id}
                      className="bg-white p-3.5 rounded-2xl border border-[#3B0A14]/10 flex items-center justify-between gap-3 shadow-xs"
                    >
                      <div className="space-y-0.5">
                        <h4 className="font-serif font-bold text-sm text-[#3B0A14]">{dish.name}</h4>
                        <div className="text-[11px] text-[#6B5347]">
                          Counter Rate: <b className="text-[#3B0A14]">₹{dish.counterPrice}</b> • Other Apps: <span className="line-through text-red-600">₹{dish.counterPrice + dish.otherMarkup}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleDishQtyChange(dish.id, -1)}
                          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-[#3B0A14] flex items-center justify-center cursor-pointer transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="font-serif font-black text-base text-[#3B0A14] w-5 text-center">
                          {qty}
                        </span>
                        <button
                          onClick={() => handleDishQtyChange(dish.id, 1)}
                          className="w-8 h-8 rounded-full bg-[#3B0A14] hover:bg-[#57182A] text-[#F8F1E4] flex items-center justify-center cursor-pointer transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Results Comparison Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Box 1: Other Apps Cost */}
            <div className="bg-red-50/70 p-6 rounded-3xl border border-red-200 space-y-3">
              <span className="text-[10px] uppercase font-black tracking-widest text-red-600 bg-red-100 px-3 py-1 rounded-full inline-block">
                On Aggregator Apps (Swiggy / Zomato)
              </span>
              <div className="font-serif font-black text-3xl sm:text-4xl text-red-700">
                ₹{otherAppTotalCost.toLocaleString('en-IN')} <span className="text-sm font-sans font-medium text-red-600">/mo</span>
              </div>

              <div className="space-y-1.5 text-xs text-[#6B5347] border-t border-dashed border-red-200 pt-3 font-mono">
                <div className="flex justify-between">
                  <span>Exact Counter Food Total:</span>
                  <span>₹{fairBiteCustomerCost.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-red-600 font-bold">
                  <span>+ 28% Hidden Menu Markup:</span>
                  <span>+₹{otherAppMarkupFood.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-red-600">
                  <span>+ Platform & Surge Fees:</span>
                  <span>+₹{otherAppPlatformFees.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Box 2: FairBite Cost & Savings */}
            <div className="bg-[#F2F8F4] p-6 rounded-3xl border-2 border-[#3B8C5A] space-y-3 relative shadow-md">
              <span className="text-[10px] uppercase font-black tracking-widest text-[#3B8C5A] bg-[#3B8C5A]/15 px-3 py-1 rounded-full inline-block">
                On FairBite (0% Commission)
              </span>
              <div className="font-serif font-black text-3xl sm:text-4xl text-[#3B8C5A]">
                ₹{fairBiteCustomerCost.toLocaleString('en-IN')} <span className="text-sm font-sans font-medium text-[#3B8C5A]">/mo</span>
              </div>

              <div className="space-y-1.5 text-xs text-[#3B0A14] border-t border-dashed border-[#3B8C5A]/30 pt-3 font-mono font-medium">
                <div className="flex justify-between">
                  <span>Net Monthly Savings:</span>
                  <span className="text-[#3B8C5A] font-bold">+₹{customerMonthlySavings.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Annual In-Pocket Savings:</span>
                  <span className="text-[#3B8C5A] font-black text-sm">+₹{customerAnnualSavings.toLocaleString('en-IN')} /yr</span>
                </div>
              </div>

              <div className="bg-white/80 p-3 rounded-xl border border-[#3B8C5A]/20 text-xs text-[#3B8C5A] font-bold flex items-center gap-2 mt-2">
                <Sparkles size={16} className="shrink-0" />
                <span>That’s equal to {freeMealsEquivalent}+ completely FREE Handi Biryani meals every year!</span>
              </div>
            </div>
          </div>

          {/* Action CTA */}
          <div className="text-center pt-2">
            <a
              href="/order"
              className="bg-[#3B0A14] hover:bg-[#57182A] text-[#F8F1E4] px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest inline-flex items-center gap-2 shadow-xl hover:scale-105 transition-all"
            >
              <span>Order Food at Exact Dine-In Rates</span>
              <ArrowRight size={16} className="text-[#C9A227]" />
            </a>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. RESTAURANT OWNER PROFIT SIMULATOR TAB                */}
      {/* ======================================================== */}
      {calcTab === 'restaurant' && (
        <div className="space-y-8 animate-in fade-in duration-300">
          {/* Revenue Controls */}
          <div className="bg-[#FAF7F2] p-6 sm:p-7 rounded-3xl border border-[#3B0A14]/15 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <label htmlFor="restaurant-revenue-input" className="text-xs font-bold uppercase tracking-wider text-[#3B0A14] block">
                  Your Current Monthly Online Delivery Sales:
                </label>
                <span className="text-[11px] text-[#6B5347]">
                  What you generate through Swiggy / Zomato / direct online orders
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-black text-2xl text-[#3B0A14]">₹</span>
                <input
                  id="restaurant-revenue-input"
                  type="number"
                  min={20000}
                  max={5000000}
                  step={10000}
                  value={restaurantRevenue}
                  onChange={(e) => setRestaurantRevenue(Math.max(0, Number(e.target.value)))}
                  className="w-36 font-serif font-black text-2xl text-[#3B0A14] bg-white border border-[#3B0A14]/20 rounded-xl px-3 py-1.5 text-right focus:outline-hidden focus:ring-2 focus:ring-[#C9A227]"
                />
              </div>
            </div>

            {/* Slider */}
            <div className="space-y-2">
              <input
                id="restaurant-revenue-slider"
                type="range"
                min={50000}
                max={1500000}
                step={25000}
                value={restaurantRevenue}
                onChange={(e) => setRestaurantRevenue(Number(e.target.value))}
                className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#C9A227]"
              />
              <div className="flex justify-between text-[11px] text-[#6B5347] font-mono">
                <span>₹50,000</span>
                <span>₹3,00,000</span>
                <span>₹7,50,000</span>
                <span>₹15,00,000+</span>
              </div>
            </div>

            {/* Revenue Presets */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-[10px] font-bold uppercase text-[#6B5347] mr-1">Quick Revenue Select:</span>
              {restaurantPresets.map((preset) => (
                <button
                  key={preset}
                  onClick={() => setRestaurantRevenue(preset)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    restaurantRevenue === preset
                      ? 'bg-[#3B0A14] text-[#F8F1E4]'
                      : 'bg-white text-[#3B0A14] border border-[#3B0A14]/20 hover:bg-[#3B0A14]/5'
                  }`}
                >
                  ₹{(preset / 100000).toFixed(preset % 100000 === 0 ? 0 : 1)} Lakh
                </button>
              ))}
            </div>

            {/* Plan Selector & Commission Rate */}
            <div className="pt-4 border-t border-[#3B0A14]/10 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(['Starter', 'Growth', 'Premium'] as const).map((plan) => (
                <button
                  key={plan}
                  onClick={() => setSelectedPlan(plan)}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    selectedPlan === plan
                      ? 'bg-[#3B0A14] text-[#F8F1E4] border-[#C9A227] shadow-md'
                      : 'bg-white text-[#3B0A14] border-gray-200 hover:border-[#3B0A14]/40'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-serif font-bold text-sm">{plan}</span>
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                      selectedPlan === plan ? 'bg-[#C9A227] text-[#3B0A14]' : 'bg-gray-100 text-[#6B5347]'
                    }`}>
                      ₹{planCosts[plan]}/mo
                    </span>
                  </div>
                  <p className={`text-[11px] mt-1 ${selectedPlan === plan ? 'text-white/80' : 'text-[#6B5347]'}`}>
                    {plan === 'Starter' ? 'Up to 150 orders' : plan === 'Growth' ? 'Unlimited orders (Best)' : 'Multi-outlet chain'}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Restaurant Output Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Aggregator Loss Card */}
            <div className="bg-red-50 p-6 rounded-3xl border border-red-200 space-y-3">
              <span className="text-[10px] uppercase font-black tracking-widest text-red-600 bg-red-100 px-3 py-1 rounded-full inline-block">
                What Aggregators Currently Take (28%)
              </span>
              <div className="font-serif font-black text-3xl sm:text-4xl text-red-700">
                -₹{totalAggregatorLoss.toLocaleString('en-IN')} <span className="text-sm font-sans font-medium text-red-600">/mo</span>
              </div>
              <p className="text-xs text-red-600 leading-relaxed font-medium">
                That is ₹{(totalAggregatorLoss * 12).toLocaleString('en-IN')} taken out of your kitchen every single year in commissions and hidden fees!
              </p>
              <div className="text-[11px] text-[#6B5347] pt-2 border-t border-dashed border-red-200 font-mono">
                28% Commission: -₹{aggregatorCut.toLocaleString('en-IN')}<br />
                Settlement & Masking: -₹{otherHiddenDeductions.toLocaleString('en-IN')}
              </div>
            </div>

            {/* FairBite Profit Retention Card */}
            <div className="bg-[#F2F8F4] p-6 rounded-3xl border-2 border-[#3B8C5A] space-y-3 shadow-md">
              <span className="text-[10px] uppercase font-black tracking-widest text-[#3B8C5A] bg-[#3B8C5A]/15 px-3 py-1 rounded-full inline-block">
                Net Profit Retained on FairBite ({selectedPlan} Plan)
              </span>
              <div className="font-serif font-black text-3xl sm:text-4xl text-[#3B8C5A]">
                +₹{restaurantMonthlyNetProfit.toLocaleString('en-IN')} <span className="text-sm font-sans font-medium text-[#3B8C5A]">/mo</span>
              </div>
              <div className="font-serif font-bold text-lg text-[#3B0A14]">
                = +₹{restaurantAnnualNetProfit.toLocaleString('en-IN')} / year Extra Profit!
              </div>
              <p className="text-xs text-[#3B8C5A] font-bold leading-relaxed">
                ✓ FairBite fee: Only ₹{activePlanCost}/mo flat. 100% of your remaining food sales stays in your bank account.
              </p>
            </div>
          </div>

          {/* Action CTA */}
          <div className="text-center pt-2">
            <button
              onClick={() => setOnboardOpen(true)}
              className="bg-[#C9A227] hover:bg-[#B38F1E] text-[#3B0A14] px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest inline-flex items-center gap-2 shadow-xl hover:scale-105 transition-all cursor-pointer"
            >
              <span>Apply to Keep 100% of Your Sales ({selectedPlan} Plan)</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      <OnboardingModal 
        isOpen={onboardOpen} 
        onClose={() => setOnboardOpen(false)} 
        initialPlan={selectedPlan}
      />
    </div>
  );
};
