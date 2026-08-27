import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  ShieldCheck, 
  Store, 
  LayoutDashboard, 
  Sparkles, 
  Percent, 
  User, 
  Receipt,
  Layers,
  ArrowRight,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';
import { useGlobal } from '../context/GlobalContext';
import { FairBiteLogo } from './FairBiteLogo';
import { OnboardingModal } from './OnboardingModal';
import { SignInModal } from './SignInModal';
import { CustomerOrdersModal } from './CustomerOrdersModal';
import { Package } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, switchRole, cart, setShowTransparencyModal, orders, deliveryAddress } = useGlobal();
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [onboardModalOpen, setOnboardModalOpen] = useState(false);
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const [ordersModalOpen, setOrdersModalOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  const totalCartItems = cart.items.reduce((acc, curr) => acc + curr.quantity, 0);
  const activeOrdersCount = orders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled').length;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { label: 'Explore Food', path: '/' },
    { label: 'For Restaurants', path: '/for-restaurants' },
    { label: 'Pricing', path: '/pricing' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#F8F1E4] text-[#3B0A14] border-b border-[#3B0A14]/15 shadow-xs transition-colors">
        {/* Top Editorial Value Strip */}
        <div className="bg-[#3B0A14] text-[#F8F1E4] text-xs font-medium py-1.5 px-4 sm:px-8 flex items-center justify-between border-b border-[#57182A]">
          <div className="flex items-center gap-2 max-w-2xl mx-auto md:mx-0 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="bg-[#C9A227] text-[#3B0A14] text-[9px] uppercase font-black px-2 py-0.5 rounded-full tracking-widest">
              Dine-In Pricing
            </span>
            <span className="text-[11px] font-medium tracking-wide text-[#F8F1E4]/90">
              Jamshedpur Direct Kitchens • <span className="text-[#C9A227] font-bold">0% Aggregator Commission</span> • Exact Menu Rates
            </span>
          </div>
          <button
            onClick={() => setShowTransparencyModal(true)}
            className="hidden md:flex items-center gap-1.5 text-[11px] text-[#C9A227] hover:text-white uppercase tracking-wider font-bold transition-colors cursor-pointer"
          >
            <ShieldCheck size={13} className="text-[#C9A227]" />
            <span>0% Commission Charter</span>
          </button>
        </div>

        {/* Main Editorial Nav */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Identity */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center group">
              <FairBiteLogo size="md" variant="dark" showSubtitle={true} />
            </Link>
          </div>

          {/* Desktop Main Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-xs font-bold uppercase tracking-wider transition-all pb-1 ${
                    isActive
                      ? 'text-[#3B0A14] border-b-2 border-[#C9A227] font-black'
                      : 'text-[#6B5347] hover:text-[#3B0A14]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* Direct Link to Live Food Ordering App */}
            <Link
              to="/"
              className={`hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all shadow-xs ${
                location.pathname === '/' || location.pathname.startsWith('/order') || location.pathname.startsWith('/restaurant')
                  ? 'bg-[#C9A227] text-[#3B0A14]'
                  : 'bg-[#3B0A14] hover:bg-[#57182A] text-[#F8F1E4]'
              }`}
            >
              <ShoppingBag size={14} />
              <span>Order Food</span>
            </Link>

            {/* My Orders / Live Tracking Button */}
            <button
              onClick={() => setOrdersModalOpen(true)}
              className={`flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all cursor-pointer border ${
                activeOrdersCount > 0
                  ? 'bg-[#3B8C5A] text-white border-[#3B8C5A] shadow-md animate-pulse'
                  : 'bg-white hover:bg-[#FAF7F2] text-[#3B0A14] border-[#3B0A14]/20'
              }`}
              title="View your orders and live tracking"
            >
              <Package size={14} className={activeOrdersCount > 0 ? 'text-white' : 'text-[#C9A227]'} />
              <span className="hidden sm:inline">My Orders</span>
              {orders.length > 0 && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                  activeOrdersCount > 0 ? 'bg-white text-[#3B8C5A]' : 'bg-[#3B0A14]/10 text-[#3B0A14]'
                }`}>
                  {orders.length}
                </span>
              )}
            </button>

            {/* List your restaurant CTA */}
            <button
              onClick={() => setOnboardModalOpen(true)}
              className="bg-[#C9A227] hover:bg-[#B38F1E] text-[#3B0A14] px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all shadow-xs hover:scale-105 active:scale-95 cursor-pointer hidden md:flex items-center gap-1"
            >
              <span>List restaurant</span>
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => navigate('/cart')}
              className="relative bg-[#3B0A14] hover:bg-[#57182A] text-[#F8F1E4] p-2.5 sm:p-3 rounded-full font-bold flex items-center justify-center transition-all cursor-pointer shadow-md active:scale-95"
              aria-label="View shopping bag"
            >
              <ShoppingBag size={17} />
              {totalCartItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C9A227] text-[#3B0A14] text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-black shadow-xs">
                  {totalCartItems}
                </span>
              )}
            </button>

            {/* Persona Switcher Menu */}
            <div 
              ref={profileRef} 
              className="relative hidden sm:block"
              onMouseEnter={() => setProfileOpen(true)}
              onMouseLeave={() => setProfileOpen(false)}
            >
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-1.5 pl-2 pr-2.5 py-1.5 border border-[#3B0A14]/30 rounded-full text-xs font-black uppercase text-[#3B0A14] hover:bg-[#3B0A14] hover:text-[#F8F1E4] transition-colors cursor-pointer"
                title="Switch active user persona"
              >
                <div className="w-5 h-5 rounded-full bg-[#3B0A14] text-[#F8F1E4] flex items-center justify-center text-[9px] font-bold">
                  {user.role === 'customer' ? 'C' : user.role === 'restaurant' ? 'K' : 'A'}
                </div>
                <span className="text-[10px] tracking-wider hidden xl:inline">
                  {user.role === 'customer' ? 'Customer' : user.role === 'restaurant' ? 'POS' : 'Admin'}
                </span>
                <ChevronDown size={11} className={`transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-full pt-1.5 w-56 z-50">
                  <div className="bg-[#F8F1E4] text-[#3B0A14] rounded-2xl shadow-2xl border border-[#3B0A14]/20 p-2 animate-in fade-in slide-in-from-top-1">
                    <div className="px-3 py-1.5 border-b border-[#3B0A14]/10">
                      <p className="text-[9px] font-black uppercase text-[#6B5347] tracking-widest">
                        Persona Switcher
                      </p>
                      <p className="font-serif font-bold text-xs text-[#3B0A14] truncate">{user.name}</p>
                    </div>
                    <div className="pt-1.5 space-y-1">
                      <button
                        onClick={() => {
                          switchRole('customer');
                          setProfileOpen(false);
                          navigate('/order');
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider flex items-center justify-between transition-colors cursor-pointer ${
                          user.role === 'customer' ? 'bg-[#3B0A14] text-[#F8F1E4]' : 'hover:bg-white text-[#3B0A14]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <User size={13} className={user.role === 'customer' ? 'text-[#C9A227]' : 'text-[#6B5347]'} />
                          <span>Customer App</span>
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          switchRole('restaurant');
                          setProfileOpen(false);
                          navigate('/business');
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider flex items-center justify-between transition-colors cursor-pointer ${
                          user.role === 'restaurant' ? 'bg-[#3B0A14] text-[#F8F1E4]' : 'hover:bg-white text-[#3B0A14]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Store size={13} className={user.role === 'restaurant' ? 'text-[#C9A227]' : 'text-[#6B5347]'} />
                          <span>Kitchen POS</span>
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          switchRole('admin');
                          setProfileOpen(false);
                          navigate('/admin');
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-[11px] font-bold uppercase tracking-wider flex items-center justify-between transition-colors cursor-pointer ${
                          user.role === 'admin' ? 'bg-[#3B0A14] text-[#F8F1E4]' : 'hover:bg-white text-[#3B0A14]'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <LayoutDashboard size={13} className={user.role === 'admin' ? 'text-[#C9A227]' : 'text-[#6B5347]'} />
                          <span>Admin Portal</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-[#3B0A14] hover:bg-white/50 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Flyout Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#F8F1E4] border-b-2 border-[#3B0A14]/20 px-6 py-6 space-y-4 animate-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-sm font-bold uppercase tracking-wider py-1.5 ${
                    location.pathname === link.path ? 'text-[#3B0A14] font-black underline' : 'text-[#6B5347]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className="pt-4 border-t border-[#3B0A14]/15 flex flex-col gap-3">
              <Link
                to="/order"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full bg-[#3B0A14] text-[#F8F1E4] text-center py-3 rounded-full text-xs font-black uppercase tracking-wider shadow-md"
              >
                Order Food (Dine-in Menu)
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setOnboardModalOpen(true);
                }}
                className="w-full bg-[#C9A227] text-[#3B0A14] text-center py-3 rounded-full text-xs font-black uppercase tracking-wider shadow-md cursor-pointer"
              >
                List your restaurant
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setSignInModalOpen(true);
                }}
                className="w-full text-center py-2 text-xs font-bold uppercase text-[#6B5347] cursor-pointer"
              >
                Sign In
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Global Modals */}
      <OnboardingModal isOpen={onboardModalOpen} onClose={() => setOnboardModalOpen(false)} />
      <SignInModal isOpen={signInModalOpen} onClose={() => setSignInModalOpen(false)} />
      <CustomerOrdersModal isOpen={ordersModalOpen} onClose={() => setOrdersModalOpen(false)} />
    </>
  );
};
