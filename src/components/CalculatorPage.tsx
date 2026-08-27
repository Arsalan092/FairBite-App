import React from 'react';
import { SavingsCalculator } from './SavingsCalculator';
import { ShieldCheck, TrendingUp, Sparkles } from 'lucide-react';

export const CalculatorPage: React.FC = () => {
  return (
    <div className="bg-[#F8F1E4] min-h-screen text-[#3B0A14]">
      {/* Header */}
      <section className="py-16 sm:py-20 bg-[#3B0A14] text-[#F8F1E4] border-b-2 border-[#C9A227] text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-4">
          <span className="inline-block bg-[#C9A227] text-[#3B0A14] text-[10px] uppercase font-black px-3.5 py-1.5 rounded-full tracking-widest">
            100% Verified Transparency Math
          </span>
          <h1 className="font-serif font-black text-3xl sm:text-5xl text-white">
            Savings & Profit Retention Calculator
          </h1>
          <p className="text-sm sm:text-base text-[#F8F1E4]/80 max-w-2xl mx-auto">
            Calculate exact savings for diners and retained profits for local restaurants in Jamshedpur by eliminating the 28% aggregator middleman cut.
          </p>
        </div>
      </section>

      {/* Main Interactive Calculator Area */}
      <section className="py-12 sm:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SavingsCalculator initialTab="customer" showTitle={false} />
      </section>
    </div>
  );
};
