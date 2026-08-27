import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  MapPin, 
  User, 
  ShoppingBag, 
  Star, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  Filter, 
  ArrowRight, 
  ChevronDown,
  Plus,
  Flame,
  CheckCircle,
  Truck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useGlobal } from '../context/GlobalContext';

const ADDRESS_OPTIONS = [
  '12-A, South Park, Bistupur, Jamshedpur',
  'Flat 302, Ashiana Gardens, Sonari, Jamshedpur',
  'Bungalow 4, Inner Circle Road, Circuit House, Jamshedpur',
  'Shop 14, Boulevard Complex, Sakchi Market, Jamshedpur',
  'Road 7, Kadma West, Jamshedpur'
];

const CustomerAppPriceComparison: React.FC = () => {
  const [orderValue, setOrderValue] = useState<number>(650);

  const aggregatorMenuPrice = Math.round(orderValue * 1.25);
  const aggregatorPlatformFee = 10;
  const aggregatorPackingFee = 35;
  const aggregatorDelivery = 45;
  const aggregatorTax = Math.round(aggregatorMenuPrice * 0.05);
  const aggregatorTotal = aggregatorMenuPrice + aggregatorPlatformFee + aggregatorPackingFee + aggregatorDelivery + aggregatorTax;

  const fairbiteMenuPrice = orderValue;
  const fairbitePlatformFee = 0;
  const fairbitePackingFee = 15;
  const fairbiteDelivery = 25;
  const fairbiteTax = Math.round(fairbiteMenuPrice * 0.05);
  const fairbiteTotal = fairbiteMenuPrice + fairbitePlatformFee + fairbitePackingFee + fairbiteDelivery + fairbiteTax;

  const perOrderSaving = aggregatorTotal - fairbiteTotal;
  const annualSaving = perOrderSaving * 6 * 12; // 6 orders per month

  return (
    <div className="space-y-6">
      {/* Slider */}
      <div className="bg-[#FAF7F2] p-5 sm:p-6 rounded-2xl border border-[#3B0A14]/15">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <label className="text-xs font-bold uppercase tracking-wider text-[#3B0A14]">
            Simulate Your Dine-In Order Value:
          </label>
          <span className="font-serif font-black text-2xl text-[#3B0A14]">
            ₹{orderValue}
          </span>
        </div>
        <input
          type="range"
          min="200"
          max="2500"
          step="50"
          value={orderValue}
          onChange={(e) => setOrderValue(Number(e.target.value))}
          className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#3B0A14]"
        />
        <div className="flex justify-between text-[10px] text-[#6B5347] font-bold uppercase tracking-wider mt-2">
          <span>₹200 (Snack)</span>
          <span>₹650 (Meal for 2)</span>
          <span>₹1,500 (Family Feast)</span>
          <span>₹2,500</span>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Other Apps */}
        <div className="bg-red-50/70 p-5 rounded-2xl border border-red-200 space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-red-200">
            <span className="text-[10px] uppercase font-black tracking-widest text-red-600 bg-red-100 px-2.5 py-0.5 rounded-full">
              On Swiggy / Zomato
            </span>
            <span className="text-[10px] font-bold text-red-700">+25-30% Markups</span>
          </div>

          <div className="space-y-1.5 text-xs text-[#6B5347] font-mono">
            <div className="flex justify-between">
              <span>Inflated Menu Price:</span>
              <span className="text-red-700 font-bold">₹{aggregatorMenuPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Platform + Surge + Packing:</span>
              <span>₹{aggregatorPlatformFee + aggregatorPackingFee + aggregatorDelivery}</span>
            </div>
            <div className="flex justify-between">
              <span>GST:</span>
              <span>₹{aggregatorTax}</span>
            </div>
            <div className="border-t border-dashed border-red-200 pt-2 flex justify-between items-center text-sm font-bold text-red-700">
              <span>Total Bill:</span>
              <span className="line-through text-base">₹{aggregatorTotal}</span>
            </div>
          </div>
        </div>

        {/* FairBite Direct */}
        <div className="bg-[#F2F8F4] p-5 rounded-2xl border-2 border-[#3B8C5A] space-y-3 shadow-xs">
          <div className="flex items-center justify-between pb-2 border-b border-[#3B8C5A]/30">
            <span className="text-[10px] uppercase font-black tracking-widest text-[#3B8C5A] bg-[#3B8C5A]/15 px-2.5 py-0.5 rounded-full">
              On FairBite (0% Commission)
            </span>
            <span className="text-[10px] font-bold text-[#3B8C5A]">Exact Dine-In</span>
          </div>

          <div className="space-y-1.5 text-xs text-[#3B0A14] font-mono font-medium">
            <div className="flex justify-between">
              <span>Original Counter Menu:</span>
              <span className="font-bold text-[#3B0A14]">₹{fairbiteMenuPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Flat Rider Delivery & Packing:</span>
              <span>₹{fairbitePackingFee + fairbiteDelivery} (₹0 Platform Fee)</span>
            </div>
            <div className="flex justify-between">
              <span>GST:</span>
              <span>₹{fairbiteTax}</span>
            </div>
            <div className="border-t border-dashed border-[#3B8C5A]/30 pt-2 flex justify-between items-center text-sm font-black text-[#3B8C5A]">
              <span>FairBite Bill:</span>
              <span className="text-xl">₹{fairbiteTotal}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Summary strip */}
      <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#C9A227]/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#3B8C5A] text-white flex items-center justify-center font-bold">
            ₹
          </div>
          <div>
            <span className="font-bold text-[#3B0A14] block">You Save ₹{perOrderSaving} on this single order!</span>
            <span className="text-[11px] text-[#6B5347]">Equal to ~₹{annualSaving.toLocaleString('en-IN')}/year retained in your family pocket.</span>
          </div>
        </div>

        <div className="text-[10px] uppercase font-black tracking-wider bg-[#3B0A14] text-[#C9A227] px-3 py-1.5 rounded-full">
          100% Guaranteed Exact Menu
        </div>
      </div>
    </div>
  );
};

export const CustomerHome: React.FC = () => {
  const navigate = useNavigate();
  const { 
    restaurants, 
    cart, 
    addToCart, 
    deliveryAddress, 
    setDeliveryAddress, 
    setShowTransparencyModal,
    orders 
  } = useGlobal();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [vegOnly, setVegOnly] = useState(false);
  const [showAddressDropdown, setShowAddressDropdown] = useState(false);

  // Active orders tracking check
  const activeOrder = orders.find(o => o.status !== 'delivered' && o.status !== 'cancelled');

  const categories = ['All', 'North Indian', 'South Indian', 'Pan-Asian', 'Italian', 'Pure Veg', 'Top Rated'];

  // Filter restaurants
  const filteredRestaurants = restaurants.filter(res => {
    // Search query matching restaurant name, cuisine, or dish names
    const matchesSearch = 
      res.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
      res.menu.some(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    if (vegOnly) {
      const hasVegItems = res.menu.some(m => m.veg);
      if (!hasVegItems) return false;
    }

    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Pure Veg') return res.menu.every(m => m.veg) || res.cuisine.toLowerCase().includes('south indian');
    if (selectedCategory === 'Top Rated') return res.rating >= 4.6;
    return res.cuisine.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  const totalCartCount = cart.items.reduce((acc, curr) => acc + curr.quantity, 0);

  return (
    <div className="pb-32 min-h-screen bg-[#F8F1E4] text-[#3B0A14]">
      {/* Top Location & Search Bar */}
      <div className="border-b border-[#3B0A14]/10 bg-[#F8F1E4] px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Location dropdown */}
          <div className="relative w-full md:w-auto flex items-center gap-3">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-[#C9A227] shrink-0" />
              <div className="text-left">
                <span className="text-[9px] font-bold text-[#6B5347] uppercase tracking-widest block leading-none">
                  Delivery Destination
                </span>
                <button
                  onClick={() => setShowAddressDropdown(!showAddressDropdown)}
                  className="flex items-center gap-1 font-bold text-xs sm:text-sm text-[#3B0A14] hover:text-[#C9A227] transition-colors cursor-pointer"
                >
                  <span className="truncate max-w-[220px] sm:max-w-xs">{deliveryAddress}</span>
                  <ChevronDown size={14} className="text-[#C9A227]" />
                </button>
              </div>
            </div>

            {/* Address dropdown menu */}
            {showAddressDropdown && (
              <div className="absolute top-full left-0 mt-2 w-72 sm:w-80 bg-[#F8F1E4] text-[#3B0A14] rounded-2xl shadow-2xl p-2 z-50 border border-[#3B0A14]/20">
                <p className="text-[9px] font-black uppercase tracking-widest text-[#6B5347] px-3 py-1.5 border-b border-[#3B0A14]/10">
                  Select Verified Jamshedpur Area
                </p>
                <div className="pt-1">
                  {ADDRESS_OPTIONS.map((addr, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setDeliveryAddress(addr);
                        setShowAddressDropdown(false);
                      }}
                      className={`w-full text-left p-2.5 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                        deliveryAddress === addr ? 'bg-[#3B0A14] text-[#F8F1E4] font-bold' : 'hover:bg-white text-[#3B0A14]'
                      }`}
                    >
                      <span className="truncate">{addr}</span>
                      {deliveryAddress === addr && <span className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick Search */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#3B0A14]/40" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes, kitchens or cuisines..."
              className="w-full bg-white border border-[#3B0A14]/20 rounded-full py-2 pl-9 pr-8 text-xs text-[#3B0A14] placeholder:text-[#6B5347]/60 focus:outline-none focus:ring-2 focus:ring-[#C9A227] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[#3B0A14] font-bold uppercase"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Active Order Banner if running */}
        {activeOrder && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={() => navigate(`/track/${activeOrder.id}`)}
            className="mt-6 bg-[#3B0A14] text-[#F8F1E4] p-4 sm:p-5 rounded-3xl shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer hover:bg-[#240610] transition-all border-2 border-[#C9A227] ring-4 ring-[#C9A227]/20"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-[#C9A227] text-[#3B0A14] flex items-center justify-center shrink-0 font-bold shadow-md">
                <Truck size={22} className="animate-bounce" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-[#3B8C5A] text-white text-[9px] font-black uppercase px-2.5 py-0.5 rounded-full tracking-widest animate-pulse">
                    Live Dispatch Active
                  </span>
                  <span className="font-mono text-xs text-[#E8C468] font-black">
                    #{activeOrder.id}
                  </span>
                </div>
                <h4 className="font-serif font-black text-lg text-white mt-0.5">
                  {activeOrder.restaurantName} ({activeOrder.items.length} items)
                </h4>
                <p className="text-xs text-[#F8F1E4]/90 font-medium">
                  Status:{' '}
                  <span className="font-bold text-[#E8C468]">
                    {activeOrder.status === 'placed' && '⏳ Order Placed • Sent directly to kitchen POS'}
                    {activeOrder.status === 'accepted' && '👨‍🍳 Kitchen Accepted! Chef is prepping ingredients'}
                    {activeOrder.status === 'preparing' && '🔥 Cooking & Packaging in Kitchen'}
                    {activeOrder.status === 'out_for_delivery' && '🛵 Rider Out for Delivery with Thermal Bag'}
                    {activeOrder.status === 'delivered' && '✅ Delivered • Enjoy your meal!'}
                  </span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-[#C9A227] hover:bg-[#E8C468] text-[#3B0A14] px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all shadow shrink-0 self-stretch sm:self-auto justify-center">
              <span>Track Live Order</span>
              <ArrowRight size={15} />
            </div>
          </motion.div>
        )}

        {/* EDITORIAL HERO SECTION */}
        <section className="pt-6 sm:pt-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Col: The Editorial Manifesto */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <span className="text-[#C9A227] font-serif italic text-lg sm:text-xl mb-2 block">
                01. The Mission
              </span>
              
              <h2 className="text-5xl sm:text-7xl lg:text-[76px] font-serif leading-[0.92] font-black uppercase mb-6 sm:mb-8 text-[#3B0A14] tracking-tight">
                Pure<br/>
                Flavors.<br/>
                <span className="text-transparent stroke-editorial">Zero</span><br/>
                Markup.
              </h2>

              <p className="text-base sm:text-lg leading-relaxed mb-8 max-w-lg text-[#6B5347] font-medium">
                Pay exactly what the restaurant charges at dine-in. No hidden commissions, no inflated aggregator tariffs. Pure culinary artistry delivered directly in Jamshedpur.
              </p>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <button
                  onClick={() => {
                    const el = document.getElementById('explore-kitchens');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-[#3B0A14] text-[#F8F1E4] px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold uppercase tracking-widest text-xs sm:text-sm hover:bg-[#57182A] shadow-xl transition-transform active:scale-95 cursor-pointer"
                >
                  Explore Menus
                </button>

                <button
                  onClick={() => setShowTransparencyModal(true)}
                  className="flex items-center gap-3 group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-full border border-[#3B0A14]/30 flex items-center justify-center text-lg text-[#3B0A14] group-hover:border-[#C9A227] group-hover:bg-[#C9A227] group-hover:text-[#3B0A14] transition-all">
                    <ArrowRight size={18} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#3B0A14] group-hover:text-[#C9A227] transition-colors">
                    Price Proof
                  </span>
                </button>
              </div>
            </div>

            {/* Right Col: Editorial Featured Kitchen Spread */}
            <div className="lg:col-span-5 relative mt-4 lg:mt-0">
              {/* Dark Burgundy Editorial Frame */}
              <div className="bg-[#3B0A14] rounded-[36px] sm:rounded-[44px] p-6 sm:p-8 text-[#F8F1E4] shadow-2xl relative overflow-hidden border border-[#57182A]">
                {/* Background image & gradient overlay */}
                <div className="relative h-72 sm:h-84 rounded-3xl overflow-hidden mb-6 shadow-inner border border-[#C9A227]/20">
                  <img
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80"
                    alt="Featured Restaurant"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover contrast-[105%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#3B0A14] via-transparent to-black/30" />
                  
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#F8F1E4]/90 backdrop-blur-xs text-[#3B0A14] text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow">
                      Curated Kitchen
                    </span>
                  </div>
                </div>

                {/* Info and Rating */}
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-[#C9A227] font-serif italic text-sm block">
                      Featured Kitchen
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif font-black uppercase text-[#F8F1E4]">
                      The Mughal Suite
                    </h3>
                    <p className="text-xs text-[#F8F1E4]/70 font-medium mt-1">
                      Awadhi & Mughlai Specialties • Bistupur
                    </p>
                  </div>

                  <div className="bg-[#F8F1E4] text-[#3B0A14] p-3 rounded-2xl text-center shrink-0 border border-[#C9A227]/30 shadow-md">
                    <span className="text-base sm:text-lg font-black block leading-none">4.9</span>
                    <span className="text-[9px] font-extrabold uppercase text-[#6B5347] tracking-wider">Rating</span>
                  </div>
                </div>

                {/* Tilted Gold Price Guard Badge */}
                <div className="mt-6 bg-[#C9A227] p-5 sm:p-6 text-[#3B0A14] rounded-3xl shadow-xl border border-amber-200/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[9px] font-black uppercase tracking-widest bg-[#3B0A14] text-[#E8C468] px-2.5 py-0.5 rounded-full">
                      Price Guard
                    </span>
                    <span className="text-[10px] font-extrabold text-[#3B0A14]">
                      FairBite Promise
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs font-bold border-b border-[#3B0A14]/20 pb-2 mb-2">
                    <span className="text-[#3B0A14]/80">Aggregator Bill</span>
                    <span className="line-through text-neutral-800">₹545.00</span>
                  </div>

                  <div className="flex items-center justify-between font-serif font-black text-sm sm:text-base">
                    <span>FairBite Dine-In Rate</span>
                    <span className="text-lg sm:text-xl text-[#3B0A14]">₹420.00</span>
                  </div>
                  <p className="text-[10px] font-extrabold text-[#3B8C5A] mt-1 text-right">
                    You save ₹125 (23%) on this dish alone
                  </p>

                  <div className="mt-4 pt-3 border-t border-[#3B0A14]/20 flex items-center gap-2">
                    <button
                      onClick={() => {
                        const mughal = restaurants.find(r => r.id === 'r1') || restaurants[0];
                        const biryani = mughal?.menu.find(m => m.id === 'm1') || mughal?.menu[0];
                        if (mughal && biryani) {
                          addToCart(mughal, biryani);
                        }
                      }}
                      className="flex-1 bg-[#3B0A14] text-[#F8F1E4] hover:bg-[#57182A] py-2.5 px-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-transform active:scale-95 cursor-pointer shadow"
                    >
                      <Plus size={14} className="text-[#C9A227]" />
                      <span>Quick Add Dum Biryani</span>
                    </button>

                    <button
                      onClick={() => navigate('/restaurant/r1')}
                      className="bg-white/80 hover:bg-white text-[#3B0A14] py-2.5 px-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1 transition-colors cursor-pointer"
                    >
                      <span>Menu</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* IN-APP DIRECT PRICE COMPARISON SLIDER */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 border border-[#3B0A14]/15 shadow-sm">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-[#3B0A14]/10">
            <div>
              <span className="text-[#C9A227] font-serif italic text-sm block">
                Live Price Difference
              </span>
              <h3 className="font-serif font-black text-2xl sm:text-3xl text-[#3B0A14] uppercase">
                FairBite vs Other Apps Calculator
              </h3>
              <p className="text-xs text-[#6B5347] font-medium mt-1">
                Drag the order value slider to see how much commission markup you save on this order.
              </p>
            </div>

            <button
              onClick={() => setShowTransparencyModal(true)}
              className="bg-[#3B0A14] hover:bg-[#57182A] text-[#F8F1E4] px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow transition-all"
            >
              <ShieldCheck size={15} className="text-[#C9A227]" />
              <span>Full Receipt Breakdown</span>
            </button>
          </div>

          <div className="pt-6">
            <CustomerAppPriceComparison />
          </div>
        </section>

        {/* RESTAURANT DISCOVERY SECTION */}
        <section id="explore-kitchens" className="space-y-6 pt-2">
          {/* Header & Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#3B0A14]/10">
            <div>
              <span className="text-[#C9A227] font-serif italic text-base block">
                02. Direct Kitchen Directory
              </span>
              <h3 className="font-serif font-black text-3xl uppercase text-[#3B0A14]">
                Authentic Menus ({filteredRestaurants.length})
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setVegOnly(!vegOnly)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all border cursor-pointer ${
                  vegOnly
                    ? 'bg-green-800 text-white border-green-800 shadow-sm'
                    : 'bg-white text-[#6B5347] border-[#3B0A14]/20 hover:border-green-700'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-green-500" />
                <span>Pure Veg Only</span>
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#3B0A14] text-[#F8F1E4] shadow-md'
                    : 'bg-white text-[#6B5347] border border-[#3B0A14]/15 hover:border-[#C9A227]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Restaurants Grid */}
          {filteredRestaurants.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-[#3B0A14]/15 p-8">
              <Search size={44} className="mx-auto text-[#C9A227] mb-4" />
              <h3 className="font-serif font-black text-2xl text-[#3B0A14] mb-1">
                No Kitchens Match This Filter
              </h3>
              <p className="text-xs text-[#6B5347] mb-6">
                Try searching for something else like "Mughal", "Dosa", "Biryani" or reset filters.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setVegOnly(false);
                }}
                className="bg-[#3B0A14] text-[#F8F1E4] px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRestaurants.map((res) => (
                <motion.div
                  key={res.id}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => navigate(`/restaurant/${res.id}`)}
                  className="group bg-white rounded-3xl overflow-hidden border border-[#3B0A14]/15 shadow-sm hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    {/* Image & Badges */}
                    <div className="relative h-56 overflow-hidden bg-[#3B0A14]">
                      <img
                        src={res.image}
                        alt={res.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                      {/* Delivery Time Badge */}
                      <div className="absolute top-4 left-4 bg-[#3B0A14] text-[#F8F1E4] px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-md flex items-center gap-1 border border-[#C9A227]/40">
                        <Clock size={11} className="text-[#C9A227]" />
                        <span>{res.deliveryTime}</span>
                      </div>

                      {/* Dine-in price guarantee badge */}
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                        <div className="bg-[#F8F1E4]/95 backdrop-blur-xs px-3 py-1 rounded-full border border-[#C9A227]/50 flex items-center gap-1.5 shadow-md">
                          <ShieldCheck size={13} className="text-[#C9A227]" />
                          <span className="text-[9px] uppercase tracking-widest font-black text-[#3B0A14]">
                            Same as Dine-in
                          </span>
                        </div>

                        {res.featured && (
                          <div className="bg-[#C9A227] text-[#3B0A14] px-3 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow">
                            Curated
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-1">
                        <h4 className="font-serif font-black text-2xl text-[#3B0A14] group-hover:text-[#57182A] transition-colors leading-tight">
                          {res.name}
                        </h4>
                        <div className="flex items-center gap-1 bg-[#F8F1E4] px-2.5 py-1 rounded-xl border border-[#3B0A14]/10 shrink-0">
                          <Star size={13} className="text-[#C9A227] fill-[#C9A227]" />
                          <span className="text-xs font-black text-[#3B0A14]">{res.rating}</span>
                        </div>
                      </div>

                      <p className="text-xs text-[#6B5347] font-medium mb-3 line-clamp-1">
                        {res.cuisine} • {res.location}
                      </p>

                      {/* Popular Dish Preview Quick Add */}
                      <div className="mt-4 pt-3 border-t border-[#3B0A14]/10">
                        <p className="text-[9px] font-black uppercase text-[#6B5347] tracking-widest mb-2.5">
                          Direct Kitchen Price Samples
                        </p>
                        {res.menu.slice(0, 2).map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center justify-between py-1.5 text-xs"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="flex items-center gap-1.5 max-w-[70%]">
                              <span
                                className={`w-2 h-2 rounded-full shrink-0 ${
                                  item.veg ? 'bg-green-600' : 'bg-red-600'
                                }`}
                              />
                              <span className="font-semibold text-[#3B0A14] truncate">{item.name}</span>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="font-serif font-black text-[#3B0A14]">₹{item.price}</span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  addToCart(res, item);
                                }}
                                className="bg-[#F8F1E4] hover:bg-[#3B0A14] hover:text-[#F8F1E4] text-[#3B0A14] font-bold p-1 rounded-lg transition-colors cursor-pointer border border-[#3B0A14]/15"
                                title="Add to cart"
                              >
                                <Plus size={13} />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer link */}
                  <div className="px-6 pb-6 pt-1">
                    <div className="w-full py-3 rounded-full bg-[#F8F1E4] group-hover:bg-[#3B0A14] group-hover:text-[#F8F1E4] text-[#3B0A14] text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-colors border border-[#3B0A14]/15">
                      <span>View Menu ({res.menu.length} Items)</span>
                      <ArrowRight size={14} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Floating Bottom Cart Bar for Customer */}
      <AnimatePresence>
        {totalCartCount > 0 && cart.restaurant && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="fixed bottom-6 left-4 right-4 max-w-lg mx-auto z-40"
          >
            <div
              onClick={() => navigate('/cart')}
              className="bg-[#3B0A14] text-[#F8F1E4] p-4 rounded-3xl shadow-2xl flex items-center justify-between border-2 border-[#C9A227] cursor-pointer hover:bg-[#240610] transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#C9A227] text-[#3B0A14] flex items-center justify-center font-black text-sm">
                  {totalCartCount}
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-[#E8C468]">
                    Direct From {cart.restaurant.name}
                  </p>
                  <p className="font-serif font-black text-lg">
                    ₹{cart.subtotal}{' '}
                    <span className="text-[10px] font-normal text-white/70">
                      (0% Commission)
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-[#C9A227] text-[#3B0A14] px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-widest shadow">
                <span>View Bag</span>
                <ArrowRight size={14} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
