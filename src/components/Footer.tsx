import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  Mail, 
  Store, 
  ArrowUpRight, 
  Heart,
  CheckCircle2,
  Clock,
  ShoppingBag
} from 'lucide-react';
import { FairBiteLogo } from './FairBiteLogo';
import { useGlobal } from '../context/GlobalContext';

export const Footer: React.FC = () => {
  const { setShowTransparencyModal, switchRole } = useGlobal();

  return (
    <footer className="bg-[#3B0A14] text-[#F8F1E4] border-t-2 border-[#C9A227]/40 pt-16 pb-12 mt-20 relative overflow-hidden">
      {/* Decorative subtle texture */}
      <div className="absolute inset-0 bg-[radial-gradient(#C9A227_1px,transparent_1px)] [background-size:24px_24px] opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#57182A]">
          {/* Col 1 & 2: Brand Manifesto */}
          <div className="lg:col-span-2 space-y-4">
            <FairBiteLogo size="lg" variant="light" showSubtitle={true} />
            <p className="text-xs text-[#F8F1E4]/80 leading-relaxed max-w-sm font-medium pt-2">
              Jamshedpur’s first direct dining delivery platform engineered to eliminate exploitative 28% aggregator cuts. We protect independent culinary craftsmen and assure 100% dine-in rate parity for every citizen.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={() => setShowTransparencyModal(true)}
                className="bg-[#C9A227] text-[#3B0A14] px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider hover:bg-amber-400 transition-colors shadow flex items-center gap-1.5 cursor-pointer"
              >
                <ShieldCheck size={14} />
                <span>0% Commission Charter</span>
              </button>

              <Link
                to="/order"
                className="bg-white/10 hover:bg-white/20 text-[#F8F1E4] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors flex items-center gap-1.5"
              >
                <ShoppingBag size={14} />
                <span>Live Menu</span>
              </Link>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-3">
            <h4 className="font-serif font-black text-sm uppercase tracking-wider text-[#C9A227]">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-[#F8F1E4]/80 font-medium">
              <li>
                <Link to="/how-it-works" className="hover:text-[#C9A227] transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/for-restaurants" className="hover:text-[#C9A227] transition-colors">
                  For Restaurants
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-[#C9A227] transition-colors">
                  About FairBite
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-[#C9A227] transition-colors">
                  Subscription Pricing
                </Link>
              </li>
              <li>
                <Link to="/calculator" className="hover:text-[#C9A227] transition-colors font-bold text-[#C9A227]">
                  Savings Calculator
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-[#C9A227] transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-[#C9A227] transition-colors">
                  Contact & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: For Kitchens & Portals */}
          <div className="space-y-3">
            <h4 className="font-serif font-black text-sm uppercase tracking-wider text-[#C9A227]">
              Portals & Apps
            </h4>
            <ul className="space-y-2 text-xs text-[#F8F1E4]/80 font-medium">
              <li>
                <Link to="/order" className="hover:text-[#C9A227] transition-colors flex items-center gap-1">
                  <span>Customer Ordering App</span>
                  <ArrowUpRight size={12} className="text-[#C9A227]" />
                </Link>
              </li>
              <li>
                <Link 
                  to="/business" 
                  onClick={() => switchRole('restaurant')}
                  className="hover:text-[#C9A227] transition-colors flex items-center gap-1"
                >
                  <span>Kitchen POS Terminal</span>
                  <ArrowUpRight size={12} className="text-[#C9A227]" />
                </Link>
              </li>
              <li>
                <Link 
                  to="/admin" 
                  onClick={() => switchRole('admin')} 
                  className="hover:text-[#C9A227] transition-colors flex items-center gap-1"
                >
                  <span>City Admin Dashboard</span>
                  <ArrowUpRight size={12} className="text-[#C9A227]" />
                </Link>
              </li>
              <li>
                <span className="text-[#F8F1E4]/50">
                  Live: Bistupur • Sakchi • Kadma
                </span>
              </li>
            </ul>
          </div>

          {/* Col 5: Jamshedpur City Hub */}
          <div className="space-y-3">
            <h4 className="font-serif font-black text-sm uppercase tracking-wider text-[#C9A227]">
              Jamshedpur Hub
            </h4>
            <div className="space-y-2.5 text-xs text-[#F8F1E4]/80">
              <div className="flex items-start gap-2">
                <MapPin size={14} className="text-[#C9A227] shrink-0 mt-0.5" />
                <span>Boulevard Complex, Main Road, Bistupur, Jamshedpur, Jharkhand 831001</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-[#C9A227] shrink-0" />
                <span>+91 657 242 8890</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={14} className="text-[#C9A227] shrink-0" />
                <span>Dispatch Support: 11:00 AM - 11:30 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Guarantee Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#F8F1E4]/60 font-medium">
          <p>© {new Date().getFullYear()} FairBite Technologies Inc. Built strictly with 0% hidden fee guarantee in Jamshedpur.</p>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-white/90">
              <CheckCircle2 size={14} className="text-[#3B8C5A]" /> Direct Kitchen Settlement Active
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
