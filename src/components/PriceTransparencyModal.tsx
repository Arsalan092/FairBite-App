import React, { useState } from 'react';
import { X, ShieldCheck, TrendingDown, ArrowRight, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useGlobal } from '../context/GlobalContext';

export const PriceTransparencyModal: React.FC = () => {
  const { showTransparencyModal, setShowTransparencyModal } = useGlobal();
  const [orderValue, setOrderValue] = useState<number>(650);
  const [ordersPerMonth, setOrdersPerMonth] = useState<number>(6);

  if (!showTransparencyModal) return null;

  // Traditional Aggregator vs FairBite calculation
  // Aggregators: Restaurants inflate menu prices by ~25% to cover 28-30% commissions + packing ₹35 + platform fee ₹10 + inflated delivery ₹45
  const aggregatorMenuPrice = Math.round(orderValue * 1.25);
  const aggregatorPlatformFee = 10;
  const aggregatorPackingFee = 35;
  const aggregatorDelivery = 45;
  const aggregatorTax = Math.round(aggregatorMenuPrice * 0.05);
  const aggregatorTotal = aggregatorMenuPrice + aggregatorPlatformFee + aggregatorPackingFee + aggregatorDelivery + aggregatorTax;

  // FairBite: Exact dine-in menu price, ₹0 platform fee, actual packaging at cost (₹15), flat transparent delivery (₹25), exact 5% GST
  const fairbiteMenuPrice = orderValue;
  const fairbitePlatformFee = 0;
  const fairbitePackingFee = 15;
  const fairbiteDelivery = 25;
  const fairbiteTax = Math.round(fairbiteMenuPrice * 0.05);
  const fairbiteTotal = fairbiteMenuPrice + fairbitePlatformFee + fairbitePackingFee + fairbiteDelivery + fairbiteTax;

  const perOrderCustomerSaving = aggregatorTotal - fairbiteTotal;
  const annualCustomerSaving = perOrderCustomerSaving * ordersPerMonth * 12;

  // Restaurant perspective: on traditional aggregators, they lose ~28% cut per order
  const traditionalCommissionLostPerOrder = Math.round(orderValue * 0.28);
  const annualRestaurantCommissionLost = traditionalCommissionLostPerOrder * 350 * 12; // based on 350 orders/mo

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-3xl bg-[#F8F1E4] rounded-3xl shadow-2xl border border-[#3B0A14]/20 overflow-hidden text-[#3B0A14] my-8"
        >
          {/* Header */}
          <div className="bg-[#3B0A14] text-[#F8F1E4] p-6 sm:p-8 relative border-b border-[#57182A]">
            <button
              onClick={() => setShowTransparencyModal(false)}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#C9A227] font-serif italic text-xs">
                Zero Commission Economics
              </span>
              <span className="text-[10px] text-white/60 font-mono">/ Transparency Audit</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-black uppercase tracking-tight text-[#F8F1E4] mb-2">
              Why Traditional Food Apps Cost 25–35% More
            </h2>
            <p className="text-[#F8F1E4]/80 text-xs sm:text-sm max-w-xl font-medium leading-relaxed">
              Traditional aggregators take a 28–32% cut from local kitchens. To survive, restaurants inflate their digital menus. FairBite eliminates commissions with flat transparent subscriptions.
            </p>
          </div>

          {/* Calculator Controls */}
          <div className="p-6 sm:p-8 space-y-6">
            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#3B0A14]/15 shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <label className="text-xs font-bold uppercase tracking-wider text-[#6B5347]">
                  Simulate Dine-in Food Bill
                </label>
                <span className="font-serif font-black text-2xl text-[#3B0A14]">₹{orderValue}</span>
              </div>
              <input
                type="range"
                min="200"
                max="2500"
                step="50"
                value={orderValue}
                onChange={(e) => setOrderValue(Number(e.target.value))}
                className="w-full h-2 bg-[#F8F1E4] rounded-lg appearance-none cursor-pointer accent-[#C9A227]"
              />
              <div className="flex justify-between text-[10px] text-[#6B5347] font-bold uppercase tracking-wider mt-2">
                <span>₹200 (Snack)</span>
                <span>₹650 (Meal for 2)</span>
                <span>₹1,500 (Family Feast)</span>
                <span>₹2,500</span>
              </div>
            </div>

            {/* Side by side comparison */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Traditional Aggregators */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#3B0A14]/15 relative">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#3B0A14]/10">
                  <div className="flex items-center gap-2">
                    <AlertTriangle size={16} className="text-red-700" />
                    <h3 className="font-serif font-bold text-sm uppercase text-[#3B0A14]">Other Apps</h3>
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-wider bg-red-100 text-red-800 px-2 py-0.5 rounded-full">
                    +28% Hidden Cut
                  </span>
                </div>

                <div className="space-y-2 text-xs text-[#6B5347]">
                  <div className="flex justify-between">
                    <span>Inflated Menu Price (+25%)</span>
                    <span className="font-serif font-bold text-[#3B0A14]">₹{aggregatorMenuPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Platform Service Tariff</span>
                    <span className="font-serif font-bold text-[#3B0A14]">₹{aggregatorPlatformFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Inflated Packaging</span>
                    <span className="font-serif font-bold text-[#3B0A14]">₹{aggregatorPackingFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Surge Delivery Fee</span>
                    <span className="font-serif font-bold text-[#3B0A14]">₹{aggregatorDelivery}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (5% on markup)</span>
                    <span className="font-serif font-bold text-[#3B0A14]">₹{aggregatorTax}</span>
                  </div>
                  <div className="border-t border-[#3B0A14]/10 pt-3 flex justify-between items-center">
                    <span className="font-black uppercase tracking-wider text-xs text-[#3B0A14]">Total You Pay</span>
                    <span className="font-serif font-black text-lg text-red-800 line-through">
                      ₹{aggregatorTotal}
                    </span>
                  </div>
                </div>
              </div>

              {/* FairBite Zero Commission */}
              <div className="bg-[#3B0A14] text-[#F8F1E4] rounded-3xl p-5 sm:p-6 border-2 border-[#C9A227] shadow-lg relative">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#57182A]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={18} className="text-[#C9A227]" />
                    <h3 className="font-serif font-black text-sm uppercase text-[#F8F1E4]">FairBite</h3>
                  </div>
                  <span className="bg-[#3B8C5A] text-white text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">
                    Dine-in Direct
                  </span>
                </div>

                <div className="space-y-2 text-xs text-[#F8F1E4]/80">
                  <div className="flex justify-between">
                    <span className="font-semibold text-white">Real Dine-in Menu Price</span>
                    <span className="font-serif font-bold text-white">₹{fairbiteMenuPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>FairBite Platform Fee</span>
                    <span className="font-bold text-[#3B8C5A] bg-[#3B8C5A]/20 px-2 py-0.5 rounded-full">₹0 (0%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Packaging (At Cost)</span>
                    <span className="font-serif font-bold text-white">₹{fairbitePackingFee}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Direct Delivery Fee</span>
                    <span className="font-serif font-bold text-white">₹{fairbiteDelivery}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (5%)</span>
                    <span className="font-serif font-bold text-white">₹{fairbiteTax}</span>
                  </div>
                  <div className="border-t border-[#57182A] pt-3 flex justify-between items-center">
                    <span className="font-black uppercase tracking-wider text-xs text-[#C9A227]">Total You Pay</span>
                    <span className="font-serif font-black text-2xl text-[#C9A227]">
                      ₹{fairbiteTotal}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Savings Callout Box */}
            <div className="bg-[#3B0A14] text-[#F8F1E4] p-5 sm:p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-[#57182A]">
              <div>
                <p className="text-[9px] uppercase font-bold text-[#C9A227] tracking-widest">
                  Customer Direct Advantage
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="font-serif font-black text-2xl sm:text-3xl text-[#C9A227]">
                    ₹{perOrderCustomerSaving} Saved
                  </span>
                  <span className="bg-[#3B8C5A] text-white text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                    {Math.round((perOrderCustomerSaving / aggregatorTotal) * 100)}% Cheaper
                  </span>
                </div>
                <p className="text-xs text-[#F8F1E4]/70 mt-1 font-medium">
                  Ordering {ordersPerMonth} times/month saves you ~₹{annualCustomerSaving.toLocaleString()} annually.
                </p>
              </div>

              <button
                onClick={() => setShowTransparencyModal(false)}
                className="w-full sm:w-auto bg-[#C9A227] hover:bg-[#B08D20] text-[#3B0A14] font-black px-8 py-3.5 rounded-full text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md cursor-pointer shrink-0"
              >
                <span>Order Dine-in Direct</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
