import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Heart, 
  Sparkles, 
  Store, 
  ShoppingBag, 
  CheckCircle2, 
  MapPin,
  ArrowRight,
  ChefHat,
  Users
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-[#F8F1E4] text-[#3B0A14]">
      {/* Hero Header */}
      <section className="py-16 sm:py-24 bg-[#3B0A14] text-[#F8F1E4] relative overflow-hidden border-b-2 border-[#C9A227]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <span className="inline-block bg-[#C9A227] text-[#3B0A14] text-[10px] uppercase font-black px-3 py-1 rounded-full tracking-widest">
            The FairBite Manifesto
          </span>
          <h1 className="font-serif font-black text-4xl sm:text-5xl lg:text-6xl leading-tight">
            Restoring Fairness to Every Plate in Jamshedpur.
          </h1>
          <p className="text-base sm:text-lg text-[#F8F1E4]/80 max-w-2xl mx-auto font-medium leading-relaxed">
            We started FairBite because the middleman economy was slowly choking our favorite local kitchens while adding a hidden 30% tax to every family meal.
          </p>
        </div>
      </section>

      {/* Story Narrative */}
      <section className="py-16 sm:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border-2 border-[#3B0A14]/15 space-y-6">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#C9A227]">
            <MapPin size={16} />
            <span>Born in the Steel City • Jamshedpur</span>
          </div>

          <h2 className="font-serif font-black text-2xl sm:text-3xl text-[#3B0A14] leading-snug">
            Food is about culture, craft, and trust — not 30% algorithmic tolls.
          </h2>

          <div className="space-y-4 text-xs sm:text-sm text-[#6B5347] leading-relaxed font-medium">
            <p>
              For decades, the vibrant culinary streets of <b>Bistupur, Sakchi, Kadma, and Sonari</b> were built on trust. Master cooks perfected their Awadhi handi biryanis, crispy masala dosas, and slow-churned sweets.
            </p>
            <p>
              When massive venture-backed delivery platforms arrived, they promised convenience. But in exchange, they began taking <b>25% to 32% out of every single plate</b>. To survive, restaurant owners had to mark up their online menus or compromise ingredient quality. Customers were left wondering why a ₹200 dish cost ₹260 before packing charges and arbitrary surges.
            </p>
            <p>
              <b>FairBite changes the rules completely.</b>
            </p>
            <p>
              We replaced greedy per-order commissions with a clean, flat software subscription. Restaurants keep 100% of their food revenue and maintain their own trusted delivery staff. Customers pay the exact counter price they would see if they were sitting in the dining room.
            </p>
          </div>
        </div>

        {/* 4 Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-[#FAF7F2] p-8 rounded-3xl border border-[#3B0A14]/15 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#3B0A14] text-[#C9A227] flex items-center justify-center font-bold">
              01
            </div>
            <h3 className="font-serif font-bold text-xl text-[#3B0A14]">0% Per-Order Cut</h3>
            <p className="text-xs text-[#6B5347] leading-relaxed">
              We never take a bite out of kitchen profits. Software should be a predictable utility, not a toll booth.
            </p>
          </div>

          <div className="bg-[#FAF7F2] p-8 rounded-3xl border border-[#3B0A14]/15 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#3B0A14] text-[#C9A227] flex items-center justify-center font-bold">
              02
            </div>
            <h3 className="font-serif font-bold text-xl text-[#3B0A14]">Exact Dine-In Parity</h3>
            <p className="text-xs text-[#6B5347] leading-relaxed">
              Every dish on FairBite costs the exact same as the physical restaurant counter. Zero hidden markup.
            </p>
          </div>

          <div className="bg-[#FAF7F2] p-8 rounded-3xl border border-[#3B0A14]/15 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#3B0A14] text-[#C9A227] flex items-center justify-center font-bold">
              03
            </div>
            <h3 className="font-serif font-bold text-xl text-[#3B0A14]">Fleet Dignity</h3>
            <p className="text-xs text-[#6B5347] leading-relaxed">
              We empower restaurants to employ, train, and support their own delivery boys with stable, dignified wages.
            </p>
          </div>

          <div className="bg-[#FAF7F2] p-8 rounded-3xl border border-[#3B0A14]/15 space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#3B0A14] text-[#C9A227] flex items-center justify-center font-bold">
              04
            </div>
            <h3 className="font-serif font-bold text-xl text-[#3B0A14]">Community First</h3>
            <p className="text-xs text-[#6B5347] leading-relaxed">
              Money spent on food stays in our city’s local economy, supporting local kitchens and families.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#3B0A14] text-[#F8F1E4] rounded-3xl p-8 sm:p-10 text-center space-y-4">
          <h3 className="font-serif font-black text-2xl sm:text-3xl">Be Part of the Solution</h3>
          <p className="text-xs sm:text-sm text-[#F8F1E4]/80 max-w-lg mx-auto">
            Order your next meal on FairBite to support local kitchens, or list your food business with zero commission today.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to="/order"
              className="bg-[#C9A227] hover:bg-[#B38F1E] text-[#3B0A14] px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest transition-all"
            >
              Order Food
            </Link>
            <Link
              to="/for-restaurants"
              className="bg-white hover:bg-gray-100 text-[#3B0A14] px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest transition-all"
            >
              For Restaurants
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
